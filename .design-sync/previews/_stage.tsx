/*
 *  Shared dark "stage" for Aurora Dark preview cards. Aurora is a dark-only DS
 *  (the app runs forceColorScheme="dark"); components use translucent
 *  dark-scheme surfaces and light text, which wash out on the preview harness's
 *  white card background. Wrapping each cell in this opaque --bg stage renders
 *  them on the surface they were designed for — matching the real product.
 *
 *  Not a component (no PascalCase default), so the converter never emits a card
 *  for it; previews import it relatively.
 */
import type { ReactNode } from "react";

export const Stage = ({ children, pad = 24 }: { children: ReactNode; pad?: number }) => (
  <div
    style={{
      background: "#0e1116",
      padding: pad,
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      color: "#e6e9ee",
    }}
  >
    {children}
  </div>
);
