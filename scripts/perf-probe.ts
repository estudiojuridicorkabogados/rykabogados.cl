#!/usr/bin/env bun
/**
 * A repeatable local Core Web Vitals probe, for answering "did that change
 * cost anything" without deploying first.
 *
 * Built for phase 3: the Consent Mode defaults ship as an inline script in the
 * root layout, and an inline script in the body is the one thing on this site
 * that is genuinely render-blocking. That is a claim worth measuring rather
 * than asserting, and worth being able to re-measure whenever the snippet
 * grows.
 *
 * Method, matching docs/lcp-performance-plan.md so the numbers are comparable:
 * Chrome for Testing driven over CDP, 4x CPU throttling, Slow 4G, cold cache,
 * against `next start`. Each run is a fresh tab with a fresh profile.
 *
 *   bun run perf:probe -- --label before            # on main
 *   bun run perf:probe -- --label after             # on the branch
 *   bun run perf:probe -- --compare before after
 *
 * READ THIS BEFORE QUOTING A NUMBER. Loopback reproduces neither production's
 * bandwidth contention nor its HTTP/2 multiplexing — `next start` serves over
 * HTTP/1.1 — so absolute LCP here is not production's LCP. The existing perf
 * work measured the same build at 1260ms locally and 2656ms live. What IS
 * transferable is the delta between two builds on this harness, TBT, the long
 * task list, and the HTML transfer size. Those are what the comparison prints
 * first.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawn, type ChildProcess } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const BASE_URL = process.env.PERF_BASE_URL ?? "http://localhost:3000";
const OUT_DIR = ".perf";
const DEFAULT_RUNS = 7;

/** The pages that matter: an organic landing page and a paid one. */
const DEFAULT_PATHS = ["/", "/habla-con-nosotros/trabajadores"];

const CPU_THROTTLE = 4;
const SLOW_4G = {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
};

/* -------------------------------------------------------------------------- */
/* Chrome                                                                      */
/* -------------------------------------------------------------------------- */

function findChrome(): string {
  const cache = join(homedir(), "Library/Caches/ms-playwright");
  const candidates = [
    join(
      cache,
      "chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
    ),
    join(
      cache,
      "chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
    ),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];

  const found = candidates.find((path) => existsSync(path));
  if (!found) {
    throw new Error(
      "No Chrome found. Run `bunx agent-browser install` to fetch one."
    );
  }
  return found;
}

interface Chrome {
  process: ChildProcess;
  port: number;
}

async function launchChrome(): Promise<Chrome> {
  const port = 9222 + Math.floor(Math.random() * 500);
  const profile = join("/tmp", `rk-perf-${Date.now()}`);

  const process_ = spawn(
    findChrome(),
    [
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "--headless=new",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-background-networking",
      "--force-device-scale-factor=1",
    ],
    { stdio: "ignore" }
  );

  // Poll the DevTools endpoint rather than sleeping a guessed interval.
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return { process: process_, port };
    } catch {
      // Not up yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  process_.kill();
  throw new Error("Chrome did not expose a DevTools endpoint in 10s");
}

/* -------------------------------------------------------------------------- */
/* A minimal CDP client                                                        */
/* -------------------------------------------------------------------------- */

class Cdp {
  private socket: WebSocket;
  private nextId = 1;
  private pending = new Map<
    number,
    { resolve: (value: unknown) => void; reject: (reason: Error) => void }
  >();

  private constructor(socket: WebSocket) {
    this.socket = socket;
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      const waiter = this.pending.get(message.id);
      if (!waiter) return;
      this.pending.delete(message.id);
      if (message.error) {
        waiter.reject(new Error(JSON.stringify(message.error)));
      } else {
        waiter.resolve(message.result);
      }
    });
  }

  static async connect(url: string): Promise<Cdp> {
    const socket = new WebSocket(url);
    await new Promise<void>((resolve, reject) => {
      socket.addEventListener("open", () => resolve());
      socket.addEventListener("error", () => reject(new Error(`CDP: ${url}`)));
    });
    return new Cdp(socket);
  }

  send<T = Record<string, unknown>>(
    method: string,
    params: Record<string, unknown> = {},
    sessionId?: string
  ): Promise<T> {
    const id = this.nextId++;
    const payload: Record<string, unknown> = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;

    return new Promise<T>((resolve, reject) => {
      this.pending.set(id, {
        resolve: resolve as (value: unknown) => void,
        reject,
      });
      this.socket.send(JSON.stringify(payload));
    });
  }

  close(): void {
    this.socket.close();
  }
}

/* -------------------------------------------------------------------------- */
/* The measurement, as it runs in the page                                     */
/* -------------------------------------------------------------------------- */

/**
 * Installed before any document script, so the observers are in place before
 * the very first paint and before the consent snippet runs.
 *
 * TBT is computed the way Lighthouse computes it: every task over 50ms
 * contributes its excess, counted from First Contentful Paint. A task under
 * 50ms contributes nothing at all, which is the reason a sub-millisecond
 * inline script cannot move TBT no matter how often it runs — it is its own
 * task, and it never reaches the threshold. Measuring it anyway is the point:
 * that reasoning is only worth as much as the number that confirms it.
 */
const COLLECTOR = `
(() => {
  window.__perf = { longTasks: [], lcp: 0, fcp: 0, scriptDuration: 0 };

  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.__perf.longTasks.push({ start: entry.startTime, duration: entry.duration });
    }
  }).observe({ type: "longtask", buffered: true });

  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    window.__perf.lcp = entries[entries.length - 1].startTime;
  }).observe({ type: "largest-contentful-paint", buffered: true });

  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-contentful-paint") window.__perf.fcp = entry.startTime;
    }
  }).observe({ type: "paint", buffered: true });
})();
`;

const READ_RESULTS = `
(() => {
  const perf = window.__perf;
  const navigation = performance.getEntriesByType("navigation")[0];

  const fcp = perf.fcp;
  const tbt = perf.longTasks
    .filter((task) => task.start + task.duration > fcp)
    .reduce((total, task) => total + Math.max(0, task.duration - 50), 0);

  return JSON.stringify({
    fcp,
    lcp: perf.lcp,
    tbt,
    longTaskCount: perf.longTasks.length,
    longestTask: perf.longTasks.reduce((max, t) => Math.max(max, t.duration), 0),
    domContentLoaded: navigation ? navigation.domContentLoadedEventEnd : 0,
    htmlTransferBytes: navigation ? navigation.transferSize : 0,
    htmlDecodedBytes: navigation ? navigation.decodedBodySize : 0,
    consentDefaultIndex: (window.dataLayer || []).findIndex(
      (entry) => entry && entry[0] === "consent" && entry[1] === "default"
    ),
  });
})();
`;

interface Sample {
  fcp: number;
  lcp: number;
  tbt: number;
  longTaskCount: number;
  longestTask: number;
  domContentLoaded: number;
  htmlTransferBytes: number;
  htmlDecodedBytes: number;
  consentDefaultIndex: number;
}

async function measure(chrome: Chrome, url: string): Promise<Sample> {
  const version = await (
    await fetch(`http://127.0.0.1:${chrome.port}/json/version`)
  ).json();

  const browser = await Cdp.connect(version.webSocketDebuggerUrl);

  const { targetId } = await browser.send<{ targetId: string }>(
    "Target.createTarget",
    { url: "about:blank" }
  );
  const { sessionId } = await browser.send<{ sessionId: string }>(
    "Target.attachToTarget",
    { targetId, flatten: true }
  );

  await browser.send("Page.enable", {}, sessionId);
  await browser.send("Runtime.enable", {}, sessionId);
  await browser.send("Network.enable", {}, sessionId);
  await browser.send("Network.setCacheDisabled", { cacheDisabled: true }, sessionId);
  await browser.send("Network.emulateNetworkConditions", SLOW_4G, sessionId);
  await browser.send(
    "Emulation.setCPUThrottlingRate",
    { rate: CPU_THROTTLE },
    sessionId
  );
  await browser.send(
    "Page.addScriptToEvaluateOnNewDocument",
    { source: COLLECTOR },
    sessionId
  );

  await browser.send("Page.navigate", { url }, sessionId);

  // Long enough for LCP to settle and for the GTM deferral's 3500ms backstop
  // to have fired, since that is the main-thread cost worth seeing.
  await new Promise((resolve) => setTimeout(resolve, 6000));

  const { result } = await browser.send<{ result: { value: string } }>(
    "Runtime.evaluate",
    { expression: READ_RESULTS, returnByValue: true, awaitPromise: false },
    sessionId
  );

  await browser.send("Target.closeTarget", { targetId });
  browser.close();

  return JSON.parse(result.value) as Sample;
}

/* -------------------------------------------------------------------------- */
/* Reporting                                                                   */
/* -------------------------------------------------------------------------- */

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

type PathReport = Record<keyof Sample, number> & { samples: number };
type Report = Record<string, PathReport>;

function summarise(samples: Sample[]): PathReport {
  const keys = Object.keys(samples[0]) as (keyof Sample)[];
  const summary = {} as PathReport;
  for (const key of keys) {
    summary[key] = Math.round(median(samples.map((s) => s[key])) * 100) / 100;
  }
  summary.samples = samples.length;
  return summary;
}

function row(label: string, before: number, after: number, unit: string): string {
  const delta = after - before;
  const sign = delta > 0 ? "+" : "";
  const percent =
    before === 0 ? "" : ` (${sign}${((delta / before) * 100).toFixed(1)}%)`;
  return `  ${label.padEnd(22)} ${String(before).padStart(9)} ${String(after).padStart(9)} ${(sign + delta.toFixed(2) + unit + percent).padStart(20)}`;
}

async function compare(beforeLabel: string, afterLabel: string) {
  const before = JSON.parse(
    await readFile(join(OUT_DIR, `${beforeLabel}.json`), "utf8")
  ) as Report;
  const after = JSON.parse(
    await readFile(join(OUT_DIR, `${afterLabel}.json`), "utf8")
  ) as Report;

  for (const path of Object.keys(after)) {
    if (!before[path]) continue;
    const b = before[path];
    const a = after[path];

    console.log(`\n${path}`);
    console.log(
      `  ${"".padEnd(22)} ${beforeLabel.padStart(9)} ${afterLabel.padStart(9)}`
    );
    console.log("  --- transferable ---");
    console.log(row("TBT", b.tbt, a.tbt, "ms"));
    console.log(row("longest task", b.longestTask, a.longestTask, "ms"));
    console.log(row("long tasks", b.longTaskCount, a.longTaskCount, ""));
    console.log(row("HTML transfer", b.htmlTransferBytes, a.htmlTransferBytes, "B"));
    console.log(row("HTML decoded", b.htmlDecodedBytes, a.htmlDecodedBytes, "B"));
    console.log("  --- loopback only, do not quote ---");
    console.log(row("FCP", b.fcp, a.fcp, "ms"));
    console.log(row("LCP", b.lcp, a.lcp, "ms"));
    console.log(row("DCL", b.domContentLoaded, a.domContentLoaded, "ms"));
    console.log(
      `\n  consent default at dataLayer index: ${beforeLabel} ${b.consentDefaultIndex}, ${afterLabel} ${a.consentDefaultIndex}  (-1 = absent, 0 = first)`
    );
  }
  console.log(
    "\nAbsolute LCP on loopback is not production's LCP — see the header of this file.\n"
  );
}

/* -------------------------------------------------------------------------- */

async function main() {
  const args = process.argv.slice(2);

  const compareAt = args.indexOf("--compare");
  if (compareAt !== -1) {
    await compare(args[compareAt + 1], args[compareAt + 2]);
    return;
  }

  const labelAt = args.indexOf("--label");
  const label = labelAt === -1 ? "run" : args[labelAt + 1];
  const runsAt = args.indexOf("--runs");
  const runs = runsAt === -1 ? DEFAULT_RUNS : Number(args[runsAt + 1]);
  const pathAt = args.indexOf("--path");
  const paths = pathAt === -1 ? DEFAULT_PATHS : [args[pathAt + 1]];

  const probe = await fetch(BASE_URL).catch(() => null);
  if (!probe?.ok) {
    console.error(
      `Nothing answering on ${BASE_URL}. Start it first:\n  bun run build && bun run start\n\n` +
        "Use `next start`, not `next dev` — dev compiles routes on demand, which\n" +
        "hides main-thread costs that production shows."
    );
    process.exit(1);
  }

  const chrome = await launchChrome();
  const report: Report = {};

  try {
    for (const path of paths) {
      const samples: Sample[] = [];
      for (let run = 0; run < runs; run++) {
        const sample = await measure(chrome, `${BASE_URL}${path}`);
        samples.push(sample);
        process.stdout.write(
          `  ${path} run ${run + 1}/${runs}  TBT ${sample.tbt.toFixed(0)}ms  LCP ${sample.lcp.toFixed(0)}ms\n`
        );
      }
      report[path] = summarise(samples);
    }
  } finally {
    chrome.process.kill();
  }

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(
    join(OUT_DIR, `${label}.json`),
    JSON.stringify(report, null, 2)
  );

  console.log(`\nMedian of ${runs} runs, written to ${OUT_DIR}/${label}.json:`);
  console.log(JSON.stringify(report, null, 2));
}

await main();
