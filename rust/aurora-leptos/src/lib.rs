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
//! - **Tokens + pure logic** ([`tokens`]) — semantic palette, `status_color`,
//!   `pill_bg`, and `ApiError` error classification. Framework-agnostic Rust.
//!
//! Genuinely app-specific surfaces (e.g. cloacina's DAG/graph + node views) are
//! built downstream from these primitives, not shipped here.
//! - **Stylesheet** — the framework-agnostic CSS, available two ways:
//!   1. `<link>` the files under this crate's `style/` directory (best for a
//!      build pipeline like trunk — no FOUT), or
//!   2. inject at runtime via the [`AuroraStyles`] component or the [`AURORA_CSS`]
//!      const (for consumers without a CSS build step).
//!
//! ```ignore
//! use aurora_leptos::{AuroraStyles, components::*, tokens::token};
//! view! {
//!     <AuroraStyles/>                 // or <link> the style/*.css files
//!     <Button>"Run"</Button>
//!     <Pill color=token::ICE>"accumulator"</Pill>
//! }
//! ```

pub mod components;
pub mod tokens;
pub mod widgets;

// Flat re-exports for ergonomic `use aurora_leptos::*;`.
pub use components::*;
pub use tokens::*;
pub use widgets::*;

use leptos::prelude::*;

/// The full Aurora Dark stylesheet (IBM Plex `@font-face` + tokens + component
/// chrome), concatenated at compile time. Inject once at your app root.
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

/// Injects the complete Aurora Dark stylesheet as an inline `<style>`. Drop once
/// at the app root. Prefer `<link>`-ing the `style/*.css` files when you have a
/// build pipeline (avoids a flash of unstyled fonts); use this otherwise.
#[component]
pub fn AuroraStyles() -> impl IntoView {
    view! { <style>{AURORA_CSS}</style> }
}
