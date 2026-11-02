import { useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck, ShieldOff, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  CARRIERS,
  DATA_FREE_BANNER_TEXT,
  DATA_FREE_DEFAULT,
  DATA_FREE_OFF_TEXT,
  DATA_FREE_STORAGE_KEY,
  DATA_FREE_WARNING,
  ZERO_RATED_LABEL,
  parseDataFreeMode,
  serializeDataFreeMode,
} from "@/lib/data-free";

/**
 * Global header banner: zero-rated data-free status with a working toggle.
 * Rendered once in the root layout so it appears on every page.
 */
export function DataFreeBanner() {
  const [on, setOn] = useState<boolean>(DATA_FREE_DEFAULT);
  const [warningDismissed, setWarningDismissed] = useState(false);

  // Browser storage is only readable after hydration.
  useEffect(() => {
    try {
      setOn(parseDataFreeMode(window.localStorage.getItem(DATA_FREE_STORAGE_KEY)));
    } catch {
      /* storage unavailable: keep the default */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(DATA_FREE_STORAGE_KEY, serializeDataFreeMode(on));
    } catch {
      /* storage unavailable */
    }
  }, [on]);

  const handleToggle = (next: boolean) => {
    setOn(next);
    if (!next) setWarningDismissed(false);
  };

  return (
    <header
      role="region"
      aria-label="Data-free mode"
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        on ? "datafree-plate" : "datafree-plate-warn",
      )}
    >
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-3 pt-2.5 pb-1 sm:px-5">
        <span
          className={cn(
            "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
            on ? "zero-rated-ring" : "datafree-warn-ring",
          )}
        >
          {on ? (
            <span className="zero-rated-halo absolute inset-0 animate-ping rounded-full" aria-hidden />
          ) : null}
          {on ? (
            <ShieldCheck className="zero-rated-shield relative h-5 w-5" aria-hidden />
          ) : (
            <ShieldOff className="datafree-warn-icon relative h-5 w-5" aria-hidden />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[0.78rem] leading-tight font-semibold tracking-wide text-foreground sm:text-sm">
            {on ? DATA_FREE_BANNER_TEXT : DATA_FREE_OFF_TEXT}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-1">
            {CARRIERS.map((carrier) => (
              <span
                key={carrier}
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[0.55rem] font-bold tracking-wider uppercase",
                  on ? "zero-rated-chip" : "datafree-warn-chip",
                )}
              >
                {carrier}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={cn(
              "text-[0.6rem] font-bold tracking-widest uppercase",
              on ? "zero-rated-text" : "datafree-warn-text",
            )}
          >
            {on ? "On" : "Off"}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label="Toggle data-free mode"
            onClick={() => handleToggle(!on)}
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              on ? "zero-rated-track" : "datafree-warn-track",
            )}
          >
            <span
              className={cn(
                "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all duration-200",
                on ? "left-6 zero-rated-knob" : "left-1 datafree-warn-knob",
              )}
              aria-hidden
            />
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl px-3 pb-2.5 sm:px-5">
        {on ? (
          <p className="zero-rated-pill flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
            <ShieldCheck className="zero-rated-shield h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>{ZERO_RATED_LABEL}</span>
          </p>
        ) : warningDismissed ? null : (
          <div
            role="alert"
            className="datafree-warn-strip flex items-start gap-2 rounded-md px-2 py-1.5 text-[0.7rem] leading-snug"
          >
            <ShieldAlert className="datafree-warn-icon mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="datafree-warn-text flex-1">{DATA_FREE_WARNING}</span>
            <button
              type="button"
              onClick={() => setWarningDismissed(true)}
              aria-label="Dismiss data warning"
              className="datafree-warn-text rounded p-0.5 transition-opacity hover:opacity-70"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
