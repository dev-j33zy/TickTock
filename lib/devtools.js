"use client";

export function syncDevIndicator(enabled) {
  if (process.env.NODE_ENV !== "development" || typeof window === "undefined") return;
  void fetch("/__nextjs_devtools_config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ disableDevIndicator: !enabled }),
    keepalive: true,
  }).catch(() => {});
}