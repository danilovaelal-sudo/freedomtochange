import { describe, expect, it } from "vitest";
import viteConfig from "../../vite.config";

describe("vite base path", () => {
  it("uses the root base path for production builds on the custom domain", () => {
    const config =
      typeof viteConfig === "function" ? viteConfig({ mode: "production", command: "build" }) : viteConfig;

    expect(config.base).toBe("/");
  });
});
