import { describe, expect, it } from "vitest";

import {
  CARRIERS,
  DATA_FREE_BANNER_TEXT,
  DATA_FREE_DEFAULT,
  DATA_FREE_STORAGE_KEY,
  DATA_FREE_WARNING,
  ZERO_RATED_LABEL,
  parseDataFreeMode,
  serializeDataFreeMode,
} from "@/lib/data-free";

describe("data-free mode banner", () => {
  it("shows the exact banner copy with all four carriers", () => {
    expect(DATA_FREE_BANNER_TEXT).toBe(
      "Data-Free Mode Active (Vodacom, MTN, Telkom, Cell C)",
    );
    expect([...CARRIERS]).toEqual(["Vodacom", "MTN", "Telkom", "Cell C"]);
  });

  it("warns that personal mobile data is being consumed when switched off", () => {
    expect(DATA_FREE_WARNING).toBe(
      "Warning: App is now consuming your personal mobile data.",
    );
  });

  it("labels the secure zero-rated state", () => {
    expect(ZERO_RATED_LABEL).toBe("Zero-Rated Connection Secure");
  });

  it("defaults to on and restores the stored choice", () => {
    expect(DATA_FREE_DEFAULT).toBe(true);
    expect(DATA_FREE_STORAGE_KEY).toBe("wrcan.data-free-mode");
    expect(parseDataFreeMode(null)).toBe(true);
    expect(parseDataFreeMode("true")).toBe(true);
    expect(parseDataFreeMode("false")).toBe(false);
    expect(parseDataFreeMode("banana")).toBe(true);
    expect(serializeDataFreeMode(false)).toBe("false");
    expect(parseDataFreeMode(serializeDataFreeMode(false))).toBe(false);
  });
});
