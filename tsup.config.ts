import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  // Provided by the host app — never bundled into the library.
  external: ["react", "react-dom", "react/jsx-runtime", "@mantine/core"],
});
