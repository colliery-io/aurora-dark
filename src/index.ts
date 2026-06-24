/*
 *  Copyright 2025-2026 Colliery Software
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  @colliery-io/aurora-dark — public surface. Import the global stylesheet once
 *  at your app root: `import "@colliery-io/aurora-dark/aurora.css"`, and wrap the
 *  tree in `<MantineProvider theme={theme} forceColorScheme="dark">`.
 */

// Theme + design tokens
export { theme } from "./theme";
export * from "./tokens";
export * from "./status";
export * from "./vocab";
export * from "./activity";
export * from "./errors";

// Primitives + components
export * from "./primitives";
export * from "./states";
export { StatusBadge } from "./StatusBadge";
export { BuildStatusBadge } from "./BuildStatusBadge";
export { GraphHealth, healthState } from "./GraphHealth";
export { RunCircles, type RunDot } from "./RunCircles";
export * from "./graph";

// Re-export the provider so consumers (and the design-sync harness) get the
// dark-locked Mantine provider from the design system itself.
export { MantineProvider } from "@mantine/core";
