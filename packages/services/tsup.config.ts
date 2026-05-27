import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "user/index.ts",
    "form/index.ts",
    "form-field/index.ts",
    "form-submission/index.ts",
    "oauth/index.ts",
  ],
  format: ["cjs"],
  dts: false,
  external: ["@repo/database", "@repo/logger", "@repo/trpc", "jsonwebtoken", "bcryptjs"],
  clean: true,
});
