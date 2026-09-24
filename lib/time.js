export const FORMATS = [
  { value: "hms", label: "HH:MM:SS" },
  { value: "mmss", label: "MM:SS" },
  { value: "ms", label: "M:SS" },
];

export const pad = (n) => String(n).padStart(2, "0");

export function formatTime(totalSec, format = "hms") {
  const abs = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;

  if (format === "mmss") {
    if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
    return `${pad(m)}:${pad(s)}`;
  }
  if (format === "ms") {
    if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
    return `${m}:${pad(s)}`;
  }
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function toMs({ h = 0, m = 0, s = 0 }) {
  return ((h * 60 + m) * 60 + s) * 1000;
}

export function splitMs(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    h: Math.floor(total / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}