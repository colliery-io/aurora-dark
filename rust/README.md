# Aurora Dark — Leptos design pack (`aurora-leptos`)

Colliery's **general dark design system for [Leptos](https://leptos.dev)** —
the Aurora Dark identity (tokens, components, data-display widgets, stylesheet)
as a reusable Rust/WASM crate. It's the core that control-plane apps (cloacina
included) are built from; app-specific vocab, colors, and branding are supplied
as data, not shipped.

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
  leptos-gallery/      # example app rendering every component/widget
  INVENTORY.md         # component inventory
```

## Consume it
```toml
[dependencies]
aurora-leptos = { path = "../aurora-leptos" }
leptos = { version = "0.8", features = ["csr"] }   # the binary picks the renderer
```
```rust
use aurora_leptos::{components::*, tokens::token};
// <link> aurora-leptos/style/*.css, or drop <AuroraStyles/> at the app root.
```
See `aurora-leptos/README.md` for the full API.

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
