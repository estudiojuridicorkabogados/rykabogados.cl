/**
 * Walks one booking form and asserts the tracking signals actually fire.
 *
 * This exists because tracking dies quietly. Nothing renders differently when
 * an event stops being pushed, no test fails, and the first sign is a funnel
 * that has been empty for three weeks. A refactor that moves a handler or
 * drops a prop is exactly the kind of change that does it, and exactly the
 * kind nobody thinks to re-verify by hand.
 *
 * Reads window.dataLayer rather than the UI: the dataLayer is the contract
 * between the site and Tag Manager, so it is the thing worth asserting on.
 *
 *   bun run test:tracking
 *   bun run test:tracking https://rykabogados-git-my-branch.vercel.app
 *
 * Against a preview deployment it still passes — the pushes happen regardless
 * of where the container decides to send them, and the pushes are what this
 * checks.
 *
 * Whether those pushes reach Google Ads depends on the container's
 * non-production exception, which until 22 September 2026 did not actually
 * block anything (it was a Page View trigger, and exceptions only block on
 * the event they fire on). Until it is rebuilt and verified, assume a run of
 * this script against any host counts one WhatsApp conversion in Ads and
 * writes one row to the live Sheet. See docs/tracking-plan.md, phase 1.
 *
 * To run it without touching Ads, point it at a container that does not
 * exist — the pushes still happen and are still what this asserts on:
 *
 *   NEXT_PUBLIC_GTM_ID=GTM-NOTREAL bun run build && bun run start
 *
 * The Sheet row is separate and still written; its URL is not configurable.
 */

const BASE_URL = process.argv[2] ?? "http://localhost:3000";
const SESSION = "rk-tracking-smoke";



interface DataLayerEvent {
  event: string;
  page_type?: string;
  form_name?: string;
  location?: string;
  error_fields?: string;
  step?: number;
  percent_scrolled?: number;
}

async function agentBrowser(args: string[], stdin?: string): Promise<string> {
  const proc = Bun.spawn(
    ["bunx", "agent-browser", "--session", SESSION, "--restore", ...args],
    { stdin: stdin ? new TextEncoder().encode(stdin) : "ignore", stdout: "pipe", stderr: "pipe" }
  );

  const [stdout, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    proc.exited,
  ]);

  if (exitCode !== 0) {
    const stderr = await new Response(proc.stderr).text();
    throw new Error(`agent-browser ${args[0]} failed:\n${stderr || stdout}`);
  }

  return stdout;
}

/**
 * Clicks a control by its role and accessible name, via the snapshot.
 *
 * Not by CSS class — those are Tailwind utilities that a restyle rewrites —
 * and not by text search, which happily matches the "Próximos pasos" heading
 * further down the page. The accessible name is what a screen reader would
 * announce, so it is both stable and the right thing to be targeting.
 */
async function clickByName(role: string, name: string): Promise<void> {
  const snapshot = await agentBrowser(["snapshot", "-i", "-c"]);

  const line = snapshot
    .split("\n")
    .find((row) => row.includes(`${role} "${name}"`) && row.includes("ref="));

  const ref = line?.match(/ref=(e\d+)/)?.[1];

  if (!ref) {
    throw new Error(`No ${role} named "${name}" on the page`);
  }

  await agentBrowser(["click", `@${ref}`]);
}

/**
 * Runs JS in the page and parses what it returned.
 *
 * Two unwraps, not one: the script hands back a JSON string, and the CLI
 * prints that string JSON-quoted on the last line, under its own status line.
 */
async function evaluate<T>(script: string): Promise<T> {
  const raw = await agentBrowser(["eval", "--stdin"], script);
  const lastLine = raw.trim().split("\n").at(-1) ?? "";

  return JSON.parse(JSON.parse(lastLine)) as T;
}

const readSignals = () =>
  evaluate<DataLayerEvent[]>(
    `(() => JSON.stringify((window.dataLayer||[])
       .filter(e => e && typeof e.event === "string" && e.event.startsWith("rk_"))))()`
  );

const failures: string[] = [];

function expectSignal(
  signals: DataLayerEvent[],
  event: string,
  matches: Partial<DataLayerEvent> = {}
) {
  const found = signals.filter(
    (signal) =>
      signal.event === event &&
      Object.entries(matches).every(
        ([key, value]) => signal[key as keyof DataLayerEvent] === value
      )
  );

  const described = Object.keys(matches).length
    ? `${event} ${JSON.stringify(matches)}`
    : event;

  if (found.length === 0) {
    failures.push(`missing: ${described}`);
    console.error(`  ✗ ${described}`);
    return;
  }

  if (found.length > 1) {
    failures.push(`fired ${found.length}x: ${described}`);
    console.error(`  ✗ ${described} — fired ${found.length} times, expected once`);
    return;
  }

  console.log(`  ✓ ${described}`);
}

/**
 * Asserts the consent default is in the dataLayer and is the first thing in
 * it, ahead of any rk_* event.
 *
 * Reads positions rather than contents: what the default says is covered by
 * src/lib/utils/__tests__/consent.test.ts, which can check all four
 * combinations without a browser. What only a browser can tell us is whether
 * it actually got there first on a real page load.
 */
async function expectConsentDefaultsFirst(): Promise<void> {
  const order = await evaluate<{ consent: number; firstRk: number }>(
    `(() => JSON.stringify({
       consent: (window.dataLayer||[]).findIndex(
         e => e && e[0] === "consent" && e[1] === "default"),
       firstRk: (window.dataLayer||[]).findIndex(
         e => e && typeof e.event === "string" && e.event.startsWith("rk_")),
     }))()`
  );

  if (order.consent === -1) {
    failures.push("missing: consent default");
    console.error("  ✗ consent default never pushed");
    return;
  }

  if (order.consent !== 0) {
    failures.push(`consent default at index ${order.consent}, expected 0`);
    console.error(`  ✗ consent default at index ${order.consent}, expected 0`);
    return;
  }

  if (order.firstRk !== -1 && order.firstRk < order.consent) {
    failures.push("an rk_* event was pushed before the consent default");
    console.error("  ✗ an rk_* event beat the consent default");
    return;
  }

  console.log("  ✓ consent default first in the dataLayer");
}

/** Accepts everything, and checks Google was actually told. */
async function acceptCookies(): Promise<void> {
  // text-transform: uppercase applies to the accessible name, so the button
  // answers to "ACEPTAR TODAS" rather than the text in the source.
  await clickByName("button", "ACEPTAR TODAS");
  await Bun.sleep(500);

  const update = await evaluate<Record<string, string> | null>(
    `(() => JSON.stringify(((window.dataLayer||[]).find(
       e => e && e[0] === "consent" && e[1] === "update") || [])[2] || null))()`
  );

  if (update?.ad_storage !== "granted" || update.analytics_storage !== "granted") {
    failures.push("consent update did not grant after accepting");
    console.error(`  ✗ consent update was ${JSON.stringify(update)}`);
    return;
  }

  console.log("  ✓ consent update granted all four types");
}

async function main() {
  console.log(`Tracking smoke test against ${BASE_URL}\n`);

  await agentBrowser(["open", `${BASE_URL}/habla-con-nosotros/trabajadores`]);
  await agentBrowser(["wait", "--load", "networkidle"]);

  console.log("Arriving on the trabajadores landing page:");
  expectSignal(await readSignals(), "rk_page_view", {
    page_type: "landing_trabajadores",
  });

  // Consent Mode, before the visitor has answered anything.
  //
  // Ordering is the whole risk of the consent work: GTM replays the dataLayer
  // in order rather than reading it as state, and a type it has not been told
  // about behaves as granted. So it is not enough that the default is present
  // — it has to be first, ahead of the page view just asserted above. That is
  // why it ships as an inline script in the root layout, and this is what
  // notices if it ever stops being one.
  console.log("\nConsent Mode defaults:");
  await expectConsentDefaultsFirst();

  // Answer the banner before touching the form. It is fixed to the bottom of
  // the viewport at z-50 and will sit over anything down there, so a run that
  // skipped this would fail on a click with no obvious reason why. Accepting
  // is also the path most visitors take, which makes it the right one to
  // measure the funnel on.
  console.log("\nAccepting cookies:");
  await acceptCookies();

  // Scroll to the form: rk_form_view, and scroll marks along the way.
  await evaluate(
    `(() => { document.getElementById("reserva-form-section").scrollIntoView(); return JSON.stringify("ok"); })()`
  );
  await Bun.sleep(500);

  console.log("\nScrolling to the booking form:");
  expectSignal(await readSignals(), "rk_form_view", {
    form_name: "trabajadores",
  });

  // Press "Próximo" with nothing selected: a start and a validation error
  // naming both empty fields.
  //
  // A real click, dispatched through the browser, rather than element.click()
  // in the page. rk_form_start hangs off pointerdown and focus, and a
  // synthetic click fires neither — the first version of this script passed
  // every other assertion and reported that signal missing when it was
  // working perfectly. If the test cannot tell a real click from a scripted
  // one, it is not testing what a visitor does.
  await clickByName("button", "PRÓXIMO");
  await Bun.sleep(1200);

  console.log("\nPressing Próximo with nothing selected:");
  const afterInvalid = await readSignals();
  expectSignal(afterInvalid, "rk_form_start", { form_name: "trabajadores" });
  expectSignal(afterInvalid, "rk_form_error", {
    form_name: "trabajadores",
    error_fields: "timeSlot,date",
  });

  // Pick the first available day and time, then advance for real.
  await agentBrowser([
    "click",
    "#reserva-form .react-calendar__tile:not([disabled])",
  ]);
  await Bun.sleep(400);
  // The radios are sr-only, so the label is the thing a visitor actually hits.
  await agentBrowser(["click", "#reserva-form label"]);
  await Bun.sleep(400);
  await clickByName("button", "PRÓXIMO");
  await Bun.sleep(1200);

  console.log("\nCompleting step 1:");
  expectSignal(await readSignals(), "rk_form_step", {
    form_name: "trabajadores",
    step: 1,
  });

  // The WhatsApp conversion, with the placement label that tells a tap in the
  // hero apart from one won from the chatbot.
  await evaluate(
    `(() => {
       document.addEventListener("click", e => e.preventDefault(), true);
       document.querySelector('a[href*="api.whatsapp.com"]').click();
       return JSON.stringify("clicked");
     })()`
  );
  await Bun.sleep(400);

  console.log("\nClicking the hero WhatsApp button:");
  expectSignal(await readSignals(), "rk_conv_whatsapp", { location: "hero" });

  await agentBrowser(["close"]);

  console.log("");

  if (failures.length > 0) {
    console.error(`${failures.length} tracking signal(s) wrong:`);
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exit(1);
  }

  console.log("All tracking signals fired as expected.");
}

await main();
