# design-sync notes — @colliery-io/aurora-dark

This repo IS the Aurora Dark design system (extracted from cloacina/ui). It builds a real library and syncs to the Claude Design project. cloacina is a *consumer*.

## Source shape & build
- **Package shape, normal mode** (NOT synth-entry): the converter bundles the built `dist/index.js` and reads the real `dist/index.d.ts`. No `srcDir`, no `@cloacina/ui` symlink hack — `--entry ./dist/index.js` anchors PKG_DIR via package.json walk-up.
- Build before syncing: `npm run build` (`cfg.buildCmd`) → tsup emits `dist/index.js` + `dist/index.d.ts`, then `scripts/build-css.mjs` concatenates `dist/aurora.css` (IBM Plex `@font-face` + Mantine `styles.css` + `src/theme.css`).
- Converter run (from repo root):
  ```sh
  node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./dist/index.js --out ./ds-bundle
  node .ds-sync/package-validate.mjs ./ds-bundle
  ```

## Provider & CSS
- `cfg.provider` = `MantineProvider` (theme `$ref` → the lib's `theme` export, `forceColorScheme: dark`). Both `MantineProvider` and `theme` are exported from `index.ts`, so they land on `window.AuroraDS` — no `extraEntries` needed. No QueryClientProvider (none of the 16 components use react-query).
- `cfg.cssEntry` = `dist/aurora.css` — the one self-contained stylesheet (fonts + Mantine + tokens), appended into the bundle CSS closure.

## Dark-stage rule (authoring previews)
- Aurora is dark-only; the preview harness renders cards on **white**. Every preview cell wraps content in `<Stage>` (from `./_stage`, opaque `#0e1116`) so dark-scheme components (e.g. `ErrorState`'s `Alert`) stay legible.

## ErrorState is decoupled from the SDK
- `classifyError` (src/errors.ts) is **duck-typed**: any error with a numeric `status` classifies by HTTP status (no `instanceof CloacinaApiError`, no `@cloacina/client` dependency). Previews construct plain `{status, code, message}` objects — no cross-bundle identity issue.

## Component surface (the 16)
- Primitives: Pill, BrandMark, Panel, Dot, PageHeader, Chip. States: Loading, Empty, ErrorState. Badges: StatusBadge, BuildStatusBadge, GraphHealth. Graph ops (prop-driven): DegradedBanner, ReactorReadiness, AccumulatorTable. Plus RunCircles.
- `graph.tsx` is the **split** of cloacina's `graph-ops.tsx`: only the 3 hook-free components were extracted. `GraphStatusStrip`/`FireActivity`/`RecentFires` were left behind (they need `useReactorFires`→`useAuth`+react-query, i.e. app/auth context).
- `AccumulatorTable` was simplified to drop `useGraphThroughput` (a throughput rate now comes from `events_total`), so the whole library is hook-free except `activity.ts`'s exported `useGraphThroughput` util.

## Known render warns (triaged — not new)
- `[TOKENS_MISSING]` Mantine runtime CSS vars (`--mantine-*`, `--affix-*`, `--app-shell-*`): injected at render time by the provider, not in static CSS. Non-blocking.
- `AccumulatorTable` uses `cfg.overrides.AccumulatorTable.cardMode: "column"` (wide table → one story per row).

## Re-sync risks
- `src/fonts.css` pins gstatic woff2 URLs (IBM Plex v20). If fonts stop loading, re-fetch the Google Fonts CSS2 for the families/weights and replace.
- This project (`09dbc6cf-…`) previously held cloacina's full 44-component sync; syncing from THIS repo reconciles it down to the 16 library components (the 28 app-coupled floor cards are intentionally dropped — they live in cloacina, not the design system).
- cloacina migration (importing these from `@colliery-io/aurora-dark` and deleting its local copies) is a separate follow-up; until then the component source is duplicated between the two repos.
