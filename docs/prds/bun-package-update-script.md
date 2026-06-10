# PRD: Bun Package Update Automation Script

**Status:** Draft  
**Date:** 2026-06-10  
**Project:** rykabogados.cl

---

## 1. Executive Summary

A TypeScript script (`scripts/update-packages.ts`) that automates dependency maintenance using `bun outdated`. It auto-applies safe minor and patch updates, flags major version bumps as requiring manual review, and prints a console summary of all actions taken. A `--dry-run` flag enables preview mode without making changes.

---

## 2. Problem Statement

This project has 35+ dependencies (production + dev). Keeping them up to date is a recurring maintenance chore that requires manually running `bun outdated`, deciding which updates are safe, editing `package.json`, and re-running `bun install`. The process is tedious, error-prone, and often deferred — leading to larger, riskier batches of updates.

Minor and patch updates follow semver guarantees (no breaking changes), making them safe to auto-apply. Major updates, however, may include breaking API changes and require human judgment. The script codifies this distinction.

---

## 3. Objectives

1. Reduce time spent on routine dependency maintenance to under 30 seconds per run.
2. Auto-apply all minor and patch updates with zero manual intervention.
3. Surface major version updates clearly so a developer can make an informed decision.
4. Support safe preview via `--dry-run` before committing to changes.
5. Leave `package.json` and `bun.lock` in a valid, installable state after every run.

---

## 4. User Stories

**As a developer maintaining this project:**
- I want to run `bun run update-packages` and have all safe updates applied automatically, so I don't have to edit `package.json` by hand.
- I want to see a clear list of packages that need manual attention (major updates), so I can decide whether to upgrade them now or later.
- I want a `--dry-run` mode so I can preview what would change before actually modifying anything.

**As a developer doing a CI/CD check:**
- I want to run `bun run update-packages --dry-run` in a pipeline to detect stale dependencies without mutating the working tree.

---

## 5. Functional Requirements

### 5.1 Package Discovery
- FR-01: Run `bun outdated` and parse its output to build a list of all outdated packages with their current version, wanted version, and latest version.
- FR-02: Classify each package into one of three update categories:
  - **patch** — only the patch segment changed (e.g. `1.2.3 → 1.2.4`)
  - **minor** — minor segment changed, major is the same (e.g. `1.2.x → 1.3.0`)
  - **major** — major segment changed (e.g. `1.x.x → 2.0.0`)
- FR-03: Packages with no available update must be silently ignored.

### 5.2 Auto-Update (minor + patch)
- FR-04: For every patch and minor update, rewrite the version string in `package.json` to the latest available version, preserving any existing range prefix (`^`, `~`, exact).
- FR-05: After all version strings are updated, run `bun install` once to apply changes and regenerate the lockfile.
- FR-06: If `bun install` exits with a non-zero code, print the error and exit with code 1.

### 5.3 Major Update Flagging
- FR-07: Do NOT modify `package.json` for packages that require a major update.
- FR-08: Collect all major-update packages and print a formatted summary table to stdout after the run, including:
  - Package name
  - Current version (as in `package.json`)
  - Latest available version
  - Whether it is a `dependency` or `devDependency`

### 5.4 Dry-Run Mode
- FR-09: When invoked with `--dry-run`, the script must not write any files or run `bun install`.
- FR-10: In dry-run mode, print a preview table showing which packages *would* be auto-updated and which *would* be flagged, then exit 0.

### 5.5 Output / Reporting
- FR-11: Print a concise run summary to stdout:
  - Count of packages auto-updated (minor + patch)
  - Count of packages flagged for manual review (major)
  - Count of packages already up to date
- FR-12: The major-update table must be printed whether or not any auto-updates were applied, so it is always visible.
- FR-13: In dry-run mode, prefix all output with a `[DRY RUN]` label.

---

## 6. Non-Functional Requirements

- **NFR-01 Runtime:** Written in TypeScript and executed with `bun run scripts/update-packages.ts` — no compilation step, no additional runtime.
- **NFR-02 No extra dependencies:** Must use only Node/Bun built-ins (`child_process` / `Bun.spawnSync`, `fs`, `path`). No third-party libraries.
- **NFR-03 Idempotency:** Running the script twice in a row (without new upstream releases) must produce no changes on the second run.
- **NFR-04 Exit codes:** Exit 0 on success (including "nothing to update"), exit 1 on any error (install failure, parse failure).
- **NFR-05 Speed:** The script itself (excluding `bun install` time) must complete in under 2 seconds.
- **NFR-06 Workspace safety:** The script operates only on the root `package.json`. It does not traverse workspaces (this project is not a monorepo).

---

## 7. Success Metrics

| Metric | Target |
|---|---|
| Time to run full auto-update cycle | < 30 seconds end-to-end |
| Correct version classification accuracy | 100% — no minor/patch misclassified as major or vice versa |
| Zero regressions to `package.json` format | `bun install` succeeds after every non-dry run |
| Dry-run produces no file mutations | Verified by `git diff` showing no changes |

---

## 8. Assumptions & Constraints

- `bun` is installed and on `$PATH` in the environment where the script runs.
- `bun outdated` output format is stable enough to parse reliably (structured output or parseable text).
- The project uses a single `package.json` at the root (no workspace packages).
- Version strings in `package.json` use standard semver with optional `^` or `~` prefixes.
- The developer reviews flagged major updates manually before upgrading — the script does not attempt to run tests or validate compatibility.

---

## 9. Out of Scope

- Running tests after updates to verify nothing broke.
- Auto-committing or staging changes in git.
- Generating a markdown report file (console output only).
- Handling monorepo workspaces or nested `package.json` files.
- Filtering packages by name or category (e.g. "only update devDependencies").
- Integrating with CI/CD pipelines (the script can be called from CI, but no CI config is part of this PRD).
- Changelog lookups or release note fetching for flagged packages.

---

## 10. Technical Constraints

| Constraint | Detail |
|---|---|
| Runtime | Bun (≥ 1.x) |
| Language | TypeScript (strict mode) |
| Package manager | `bun` — no npm/yarn/pnpm commands |
| Script entry | `scripts/update-packages.ts` |
| Invocation | `bun run update-packages` (registered in `package.json` scripts) |
| Target file | Root `package.json` only |
| External tools called | `bun outdated`, `bun install` (via `Bun.spawnSync` or `child_process.execSync`) |

---

## Appendix: Proposed Console Output Format

```
Running bun outdated...

Auto-updating 8 packages (minor/patch):
  lucide-react          1.16.0  →  1.17.0  (patch)
  tailwind-merge        3.5.1   →  3.6.0   (minor)
  ...

Running bun install...
✓ Lockfile updated.

──────────────────────────────────────────────
 MANUAL REVIEW REQUIRED — Major updates (3)
──────────────────────────────────────────────
 Package          Current   Latest   Type
 next             15.x.x    16.x.x   dependency
 react            18.x.x    19.x.x   dependency
 drizzle-orm      0.x.x     1.x.x    dependency
──────────────────────────────────────────────

Done. 8 auto-updated · 3 flagged · 12 already up to date.
```
