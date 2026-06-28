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
# Pin to an immutable commit (recommended for shipped software):
aurora-leptos = { git = "https://github.com/colliery-io/aurora-dark", rev = "<commit-sha>" }
# ...or a release tag once cut:           tag = "aurora-leptos-v0.1.0"
# ...or, inside this monorepo:            path = "rust/aurora-leptos"

# Your binary selects the renderer; match the leptos minor (0.8.x):
leptos = { version = "0.8", features = ["csr"] }
```

```rust
use aurora_leptos::{AuroraStyles, components::*, widgets::*, graph::*, tokens::token};

#[component]
fn App() -> impl IntoView {
    view! {
        <AuroraStyles/>            // bakes the stylesheet into the wasm (see below)
        <PageHeader title="My app" sub="…"/>
        <Button>"Run"</Button>
    }
}
```

**Stylesheet delivery (the one gotcha).** When consumed as a git/registry dep you
can't reliably `<link>` the crate's `style/*.css` — they live in cargo's checkout
cache. Instead render **`<AuroraStyles/>`** once at the root: it `include_str!`s the
full stylesheet into your binary, so styling travels with the compiled artifact and
needs no asset wiring. (`<link>`-ing the files is only convenient in a path/monorepo
setup; the `AURORA_CSS` const is also exposed if you want to inject it yourself.)
Fonts load from Google Fonts at runtime — self-host them if you ship fully offline.

Prefer `rev`/`tag` over `branch` for reproducible builds. See
`aurora-leptos/PATTERNS.md` for which component to use, and `aurora-leptos/README.md`
for the API.

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
