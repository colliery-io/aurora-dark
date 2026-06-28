//! # Aurora Dark — Colliery's Leptos design system
//!
//! A general dark design system for Leptos, reused across Colliery projects. It
//! is the **core that control-plane apps (cloacina included) are built from** —
//! everything below is first-class core, not an optional add-on:
//!
//! - **Components** ([`components`]) — the full Mantine-primitive + Aurora surface:
//!   layout (Box/Group/Stack/SimpleGrid/Grid/AppShell), inputs (Button/TextInput/
//!   Textarea/PasswordInput/NumberInput/Select/Switch/SegmentedControl/CopyButton/
//!   ActionIcon), data + overlay (Table/Tooltip/Modal/Menu/Alert/Loader), and the
//!   Aurora pieces (Pill/StatusBadge/Dot/Panel/PageHeader/Chip/Loading/Empty/
//!   ErrorState).
//! - **Widgets** ([`widgets`]) — generic data-display building blocks: `Meter`,
//!   `Banner`, `StateCounts`, `HealthPill`, `BuildStatusBadge`, `NodeReadiness`,
//!   `InputTable`, `StaleInputsBanner`, plus the `Input` model and
//!   `format_ago`/`is_stale`/`freshness_pct` helpers. Apps supply their own state
//!   labels/colors as data — no built-in vocab or branding.
//! - **Graph** ([`graph`]) — generic graph/DAG drawing primitives: `GraphNode`,
//!   `GraphEdge`, a dependency-free layered layout, and an SVG `Graph` component.
//! - **Tokens + pure logic** ([`tokens`]) — semantic palette, `status_color`,
//!   `pill_bg`, and `ApiError` error classification. Framework-agnostic Rust.
//!
//! Genuinely app-specific surfaces (e.g. cloacina's DAG/graph + node views) are
//! built downstream from these primitives, not shipped here.
//!
//! ## Stylesheet
//! The recommended path is a **real `<link>`ed stylesheet** (render-blocking → no
//! flash of unstyled content). Since the CSS ships inside this crate, emit it into
//! your project at build time from `build.rs`, then link it:
//!
//! ```ignore
//! // build.rs  (aurora-leptos in [build-dependencies], default-features = false)
//! fn main() {
//!     aurora_leptos::write_css(std::path::Path::new("style")).unwrap();
//! }
//! // index.html:  <link data-trunk rel="css" href="style/aurora.css" />
//! ```
//!
//! For quick/CSR-only setups you can instead inject at runtime with
//! [`AuroraStyles`] (or the [`AURORA_CSS`] const), at the cost of a possible
//! first-paint flash.
//!
//! ```ignore
//! use aurora_leptos::{components::*, tokens::token};
//! view! { <Button>"Run"</Button> <Pill color=token::ICE>"tag"</Pill> }
//! ```

// Pure logic (no renderer) — always available.
pub mod tokens;
pub use tokens::*;

// UI surface — requires the `components` feature (the default).
#[cfg(feature = "components")]
pub mod components;
#[cfg(feature = "components")]
pub mod graph;
#[cfg(feature = "components")]
pub mod widgets;
#[cfg(feature = "components")]
pub use components::*;
#[cfg(feature = "components")]
pub use graph::*;
#[cfg(feature = "components")]
pub use widgets::*;

// ---- Stylesheet (available with or without the `components` feature) ----

/// The full Aurora Dark stylesheet (IBM Plex `@font-face` + tokens + component
/// chrome), concatenated at compile time.
pub const AURORA_CSS: &str = concat!(
    include_str!("../style/fonts.css"),
    "\n",
    include_str!("../style/tokens.css"),
    "\n",
    include_str!("../style/components.css"),
);

/// Just the design tokens (CSS custom properties + scales).
pub const TOKENS_CSS: &str = include_str!("../style/tokens.css");
/// Just the component chrome (depends on the token custom properties).
pub const COMPONENTS_CSS: &str = include_str!("../style/components.css");
/// Just the IBM Plex `@font-face` declarations.
pub const FONTS_CSS: &str = include_str!("../style/fonts.css");

/// Writes the full stylesheet to `dir/aurora.css` and returns the path. Call from
/// a consumer's `build.rs` (with `default-features = false`, so leptos isn't built
/// for the host) to ship Aurora Dark as a normal, render-blocking stylesheet.
pub fn write_css(dir: &std::path::Path) -> std::io::Result<std::path::PathBuf> {
    std::fs::create_dir_all(dir)?;
    let path = dir.join("aurora.css");
    std::fs::write(&path, AURORA_CSS)?;
    Ok(path)
}

/// Injects the complete stylesheet as an inline `<style>` (runtime fallback for
/// CSR-only setups). Prefer a build-time `<link>` (see [`write_css`]) to avoid a
/// first-paint flash.
#[cfg(feature = "components")]
mod styles {
    use super::AURORA_CSS;
    use leptos::prelude::*;

    #[component]
    pub fn AuroraStyles() -> impl IntoView {
        view! { <style>{AURORA_CSS}</style> }
    }
}
#[cfg(feature = "components")]
pub use styles::AuroraStyles;
