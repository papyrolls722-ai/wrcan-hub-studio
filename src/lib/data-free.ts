/**
 * Data-free (zero-rated) mode: banner copy and the device-local choice.
 *
 * The toggle is a mock of a zero-rated mobile partnership: the choice is kept
 * on this device only, so no table or server call is involved.
 */

export const DATA_FREE_STORAGE_KEY = "wrcan.data-free-mode";

/** Zero-rated by default: the app assumes free access unless the user opts out. */
export const DATA_FREE_DEFAULT = true;

export const CARRIERS = ["Vodacom", "MTN", "Telkom", "Cell C"] as const;

export const DATA_FREE_BANNER_TEXT =
  "Data-Free Mode Active (Vodacom, MTN, Telkom, Cell C)";

export const DATA_FREE_OFF_TEXT = "Data-Free Mode Off";

export const DATA_FREE_WARNING =
  "Warning: App is now consuming your personal mobile data.";

export const ZERO_RATED_LABEL = "Zero-Rated Connection Secure";

export function parseDataFreeMode(raw: string | null): boolean {
  if (raw === "false") return false;
  if (raw === "true") return true;
  return DATA_FREE_DEFAULT;
}

export function serializeDataFreeMode(value: boolean): string {
  return value ? "true" : "false";
}
