# Aurora Dark — Leptos design pack (`aurora-leptos`)

Colliery's **general dark design system for [Leptos](https://leptos.dev)** —
the Aurora Dark identity (tokens, components, data-display widgets, stylesheet)
as a reusable Rust/WASM crate. It's the core that control-plane apps (cloacina
included) are built from; app-specific vocab, colors, and branding are supplied
as data, not shipped.

## When to use this
Reach for `aurora-leptos` when you're building a **dark, control-plane / dashboard
Leptos UI** for a Colliery project and want the chrome handled: design tokens, the
full primitive set (layout, inputs, overlays, tables), async-state components
(`Loading`/`Empty`/`ErrorState`), data-display widgets (status pills, freshness
meters, readiness panels), and graph/DAG drawing — so you build screens, not a
component library. You supply the meaning (state→color/label maps, copy, branding)
as data. **Not** the right fit for light-themed UIs, non-Leptos stacks, or a
general public-facing marketing site. See
[`aurora-leptos/PATTERNS.md`](./aurora-leptos/PATTERNS.md) for which component to
reach for, task by task.

## Layout
```
rust/                  # cargo workspace
  aurora-leptos/       # ★ the design-system crate (the deliverable)
    src/
      lib.rs           #   public API: components, tokens, AURORA_CSS / <AuroraStyles/>
      components.rs    #   core components (primitives)
      tokens.rs        #   semantic tokens + error classification
      widgets.rs       #   generic data-display widgets (Meter, Banner, …)
    style/             #   framework-agnostic stylesheet, shipped with the crate
      tokens.css       #     Aurora Dark tokens (colors, spacing, radii, type scale)
      components.css   #     every component's static chrome
      fonts.css        #     IBM Plex @font-face
    PATTERNS.md        #   usage guide — when to reach for each component
  leptos-gallery/      # example app rendering every component/widget
  INVENTORY.md         # component inventory
```

**New here?** Read `aurora-leptos/PATTERNS.md` — a pick-by-intent usage guide for
people and AI agents.

## Consume it

Distributed as a **git dependency** (no registry publish needed). Cargo finds the
crate in this repo's subdirectory automatically.

```toml
[dependencies]
# Components + tokens. Pin an immutable rev (or tag) for reproducible builds.
aurora-leptos = { git = "https://github.com/colliery-io/aurora-dark", rev = "<commit-sha>" }
leptos = { version = "0.8", features = ["csr"] }   # match 0.8.x; binary picks the renderer

# Emit the stylesheet at build time. default-features=false → leptos is NOT
# compiled for the host, so this stays a fast, tiny build-dep.
[build-dependencies]
aurora-leptos = { git = "https://github.com/colliery-io/aurora-dark", rev = "<commit-sha>", default-features = false }
```

```rust
// build.rs — materialise the stylesheet into the project (gitignore it).
fn main() {
    aurora_leptos::write_css(std::path::Path::new("style")).unwrap();  // -> style/aurora.css
}
```

```html
<!-- index.html (trunk): a real, render-blocking stylesheet — no flash -->
<link data-trunk rel="css" href="style/aurora.css" />
```
(cargo-leptos: point `[package.metadata.leptos] style-file = "style/aurora.css"` at it.)

```rust
use aurora_leptos::{components::*, widgets::*, graph::*, tokens::token};
// build your UI; styling comes from the linked stylesheet.
```

**Why the build step.** As a git/registry dep the crate's `style/*.css` lives in
cargo's checkout cache, so you can't `<link>` it directly. `write_css` copies the
bundled stylesheet into your project at build time; linking it in `<head>` is
render-blocking, so there's **no flash of unstyled content** (important under
SSR/hydration). Fonts load from Google Fonts at runtime — self-host if you ship
fully offline.

**Runtime fallback (CSR-only, simplest).** Skip `build.rs` and render
`<AuroraStyles/>` once at the app root — it `include_str!`s the CSS into the wasm
and injects it at runtime (zero asset wiring, but a possible first-paint flash).

Prefer `rev`/`tag` over `branch`. See `aurora-leptos/PATTERNS.md` for which
component to use, and `aurora-leptos/README.md` for the API.

## Build & run the gallery
```
cd leptos-gallery && trunk serve --open       # dev
cd leptos-gallery && trunk build --release     # ship
```

## Design principle
The **styling layer is plain CSS** (owned by `aurora-leptos/style/`) and the
**pure logic is plain Rust** (`tokens.rs`). Components are thin Leptos wrappers
over that — and apps supply their own state labels/colors/branding as data, so
the pack stays generic.
