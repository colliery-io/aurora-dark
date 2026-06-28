# aurora-leptos

**Colliery's general dark design system for [Leptos](https://leptos.dev).** Aurora
Dark — semantic tokens, a complete set of UI components + data-display widgets, and
the stylesheet — the **core that control-plane apps are built from** (cloacina
included). Everything is first-class core; nothing is a gated optional add-on. Only
genuinely app-specific surfaces (e.g. cloacina's DAG/graph + node views) are built
downstream from these primitives.

```toml
[dependencies]
aurora-leptos = { path = "../aurora-leptos" }            # or a version once published
leptos = { version = "0.8", features = ["csr"] }         # the binary picks the renderer
```

```rust
use aurora_leptos::{AuroraStyles, components::*, tokens::token};
use leptos::prelude::*;

#[component]
fn App() -> impl IntoView {
    view! {
        <AuroraStyles/>                       // or <link> the style/*.css files
        <PageHeader title="My App" sub="leptos · wasm"/>
        <Button>"Run"</Button>
        <StatusBadge status="running"/>
        <Pill color=token::ICE>"tag"</Pill>
    }
}
```

## Generic core (always available)
- **Layout** — `Box` · `Group` · `Stack` · `SimpleGrid` · `Grid`/`GridCol` ·
  `Divider` · `AppShell`.
- **Typography** — `Text` (+ `mono`) · `Code` · `Anchor` · `List`/`ListItem`.
- **Inputs** — `Button` · `ActionIcon` · `TextInput` · `Textarea` · `PasswordInput` ·
  `NumberInput` · `Select` · `Switch` · `SegmentedControl` · `CopyButton`.
- **Data / overlay** — `Table` · `Tooltip` · `Modal` · `Menu`/`MenuItem` · `Alert` ·
  `Loader`.
- **Aurora** — `Pill` · `StatusBadge` · `Dot` · `Panel` · `PageHeader` · `Chip` ·
  `Loading` · `Empty` · `ErrorState`.
- **tokens** — semantic palette (`token::*`), `status_color`, `pill_bg`, and
  `classify` over an `ApiError`. Pure, framework-agnostic Rust.

## Widgets (`widgets`, also core)
Generic, higher-level data-display building blocks. Vocabulary is generic dataflow
— a **node** processes when its **inputs** are ready:
`Meter` · `Banner` · `StateCounts` · `HealthPill` · `BuildStatusBadge` ·
`NodeReadiness` · `InputTable` · `StaleInputsBanner`, plus the `Input` model and
`format_ago`/`is_stale`/`freshness_pct` helpers. **Apps supply their own state
labels, colors, tooltips, and branding as data** — the pack ships no app vocab,
palette, or logo. App-specific views (e.g. cloacina's reactors→nodes,
accumulators→inputs, and its DAG/graph + node views) are built downstream from
these. See `../leptos-gallery` for a worked example.

## Styling: two ways
1. **Linked stylesheet (recommended — no flash).** Add `aurora-leptos` to
   `[build-dependencies]` with `default-features = false` and emit the CSS in
   `build.rs`, then `<link>` it (render-blocking, so no FOUC):
   ```rust
   // build.rs
   fn main() { aurora_leptos::write_css(std::path::Path::new("style")).unwrap(); }
   ```
   ```html
   <link data-trunk rel="css" href="style/aurora.css" />
   ```
   (In a path/monorepo setup you can instead link the crate's `style/*.css` directly.)
2. **Runtime injection (CSR-only, simplest):** drop `<AuroraStyles/>` once at the
   app root (or use the `AURORA_CSS` const) — injects at runtime, possible flash.

**When to use what:** see [`PATTERNS.md`](./PATTERNS.md) — a usage guide (for people
and AI agents) with a pick-by-intent table and how to choose between similar pieces.

See `../leptos-gallery` for a working example rendering every component and widget.

## Status
Component coverage is **complete** — primitives + widgets (see `../INVENTORY.md`),
exercised in `../leptos-gallery`. The standard for Colliery Leptos UIs.
