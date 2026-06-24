# Aurora Dark — how to build with this system

Aurora Dark (`@colliery-io/aurora-dark`) is the **dark-only** design system for Cloacina control-plane UIs. It is a hybrid of **Mantine 7** components and a small set of **Aurora primitives**, all styled from one **CSS custom-property token set**. Build dark, cold, dense, monospace-for-identifiers.

## Wrapping & setup (required)

Import the stylesheet once at the app root and wrap the tree in the dark-locked provider — Mantine components render unstyled or throw without it:

```jsx
import "@colliery-io/aurora-dark/aurora.css";
import { MantineProvider, theme } from "@colliery-io/aurora-dark";

<MantineProvider theme={theme} forceColorScheme="dark">
  {/* your screen */}
</MantineProvider>
```

The system is permanently dark (`forceColorScheme="dark"`); never build a light variant. `aurora.css` carries the IBM Plex `@font-face` rules, Mantine's component styles, and the Aurora tokens.

## The styling idiom

Two layers, used together:

1. **Aurora design tokens — CSS custom properties** (from `aurora.css`, applied via inline `style` or your own CSS). The primary vocabulary:
   - Surfaces: `var(--bg)` #0e1116 · `var(--panel)` #161a21 · `var(--panel-2)` · `var(--inset)` · `var(--border)` · `var(--border-soft)`
   - Text: `var(--fg)` #e6e9ee · `var(--fg-2)` · `var(--muted)` · `var(--faint)`
   - Accents/status: `var(--ice)` #7fb2ff (primary) · `var(--teal)` · `var(--violet)` · `var(--gold)` · `var(--ok)` #4bd07f · `var(--bad)` #f06464
2. **Mantine props** for built-in components (`<Button color="ice">`, `<Alert color="bad">`, `c="dimmed"`, `size="sm"`). The Mantine palette mirrors the same hexes, so `color="ice"` matches `var(--ice)`.

Helpers exported for token lookups: `statusColor(status)`, `healthColor(state)`, `pillBg(hex)`, `TOKEN`, `explainToken(token)`.

**Type:** `'IBM Plex Sans'` for UI; `'IBM Plex Mono'` (the `MONO` export) for IDs, codes, numbers, timestamps, captions.

## Components (prefer these over rebuilding chrome)

- **`Panel`** `{title, caption?, right?, children}` — the standard card surface. **`PageHeader`** `{title, sub?, right?}`. **`BrandMark`** `{size?}`.
- **`Pill`** `{color, children}` — kind/status tag. **`StatusBadge`** `{status}` / **`BuildStatusBadge`** `{status}` — pre-colored status pills. **`GraphHealth`** `{value}` — defensive health badge. **`Dot`** `{color, glow?, size?}`. **`Chip`** `{label, count?, active, onClick}`.
- **State views:** **`Loading`** `{label?}`, **`Empty`** `{message}`, **`ErrorState`** `{error, onRetry?}` (classifies an error by `status`/kind and renders the right title + retry).
- **Graph ops:** **`RunCircles`** `{runs}` (per-state run counts), **`DegradedBanner`** `{accumulators}`, **`ReactorReadiness`** `{reactor, reactionMode, inputStrategy, accumulators, lastFiredAt}`, **`AccumulatorTable`** `{accumulators, onInject?}`.

## Where the truth lives

The bound stylesheet `_ds/<folder>/styles.css` → `aurora.css` holds every `--*` token and the component styles — read it before inventing colors or spacing. Each component's exact API is in its `<Name>.d.ts`; usage in `<Name>.prompt.md`.

## One idiomatic snippet

```jsx
<MantineProvider theme={theme} forceColorScheme="dark">
  <div style={{ background: "var(--bg)", padding: 24, fontFamily: "'IBM Plex Sans', sans-serif" }}>
    <PageHeader title="Executions" sub="public · last 24h" right={<BrandMark size={20} />} />
    <Panel title="Recent runs" caption="3 active" style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 12.5, color: "var(--fg-2)" }}>
        <span>exec_7f3a91</span>
        <StatusBadge status="running" />
      </div>
    </Panel>
  </div>
</MantineProvider>
```
