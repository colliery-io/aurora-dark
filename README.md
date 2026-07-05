# Aurora Dark — Leptos design pack (`colliery-io-aurora`)

[![crates.io](https://img.shields.io/crates/v/colliery-io-aurora.svg)](https://crates.io/crates/colliery-io-aurora)
[![docs.rs](https://docs.rs/colliery-io-aurora/badge.svg)](https://docs.rs/colliery-io-aurora)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)

Colliery's **general dark design system for [Leptos](https://leptos.dev)** —
the Aurora Dark identity (tokens, components, data-display widgets, stylesheet)
as a reusable Rust/WASM crate. It's the core that control-plane apps (cloacina
included) are built from; app-specific vocab, colors, and branding are supplied
as data, not shipped.

## When to use this
Reach for `colliery-io-aurora` when you're building a **dark, control-plane / dashboard
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
aurora-leptos/       # ★ the design-system crate (published as colliery-io-aurora)
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

Published on crates.io as **`colliery-io-aurora`** (org-prefixed so we don't claim
generic names in the flat crates.io namespace); the library is still imported as
`aurora_leptos`.

```toml
[dependencies]
colliery-io-aurora = "0.1"
leptos = { version = "0.8", features = ["csr"] }   # match 0.8.x; binary picks the renderer
```

Or as a git dependency (Cargo finds the crate in this repo's subdir):

```toml
[dependencies]
colliery-io-aurora = { git = "https://github.com/colliery-io/aurora-dark", rev = "<commit-sha>" }
```
```rust
use aurora_leptos::{components::*, widgets::*, graph::*, tokens::token};
```

### Styling — pick one
The stylesheet ships inside the crate, so you either inject it at runtime or
materialise it as a file at build time. `write_css`/the `aurora-css` helper are
**leptos-free** (`default-features = false`), so the build step never compiles
leptos for the host.

- **Runtime (simplest, any toolchain).** Render `<AuroraStyles/>` once at the app
  root — it `include_str!`s the CSS into the wasm and injects a `<style>`. Zero
  build config; trade-off is a possible first-paint flash (matters most under SSR).

- **Linked stylesheet, no flash — trunk.** A `<head>` `<link>` is render-blocking
  (no flash), but trunk validates assets *before* building, so a `build.rs` can't
  emit the file in time. Generate it in a **`pre_build` hook** instead:
  ```toml
  # Trunk.toml — install the helper once:
  #   cargo install colliery-io-aurora --no-default-features --features bin
  [[hooks]]
  stage = "pre_build"
  command = "aurora-css"
  command_arguments = ["style"]      # writes style/aurora.css
  ```
  ```html
  <link data-trunk rel="css" href="style/aurora.css" />
  ```
  (In a workspace that *contains* the crate, skip the install and run it via
  `cargo run -p colliery-io-aurora … --bin aurora-css` — see
  `leptos-gallery/Trunk.toml`, which dogfoods exactly this.)

- **Linked stylesheet — cargo-leptos.** It builds the crate before processing
  styles, so `aurora_leptos::write_css(...)` from a `build.rs` works there; point
  `[package.metadata.leptos] style-file` at the output.

Fonts load from Google Fonts at runtime — self-host if you ship fully offline.
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

## Releasing
Bump `version` in `aurora-leptos/Cargo.toml`, then push a semver tag
(`git tag v0.x.y && git push --tags`) — CI publishes the crate to crates.io
(`.github/workflows/publish.yml`).

## License
[Apache-2.0](./LICENSE)
