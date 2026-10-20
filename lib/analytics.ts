import { sendGAEvent } from "@next/third-parties/google";

type EventParams = Record<string, string | number | boolean>;

/** Safe GA4 event helper: never throws, no-ops on the server. */
export function track(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  try {
    sendGAEvent("event", name, params);
  } catch {
    // analytics must never break the UI
  }
}