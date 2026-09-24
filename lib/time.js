export const FORMATS = [
  { value: "hms", label: "HH:MM:SS" },
  { value: "mmss", label: "MM:SS" },
  { value: "ms", label: "M:SS" },
];

export const pad = (n) => String(n).padStart(2, "0");

export function formatTime(totalMs, format = "hms", showMilli = false) {
  const abs = Math.max(0, Math.floor(totalMs));
  const h = Math.floor(abs / 3_600_000);
  const m = Math.floor((abs % 3_600_000) / 60_000);
  const s = Math.floor((abs % 60_000) / 1000);
  const centi = Math.floor((abs % 1000) / 10);

  let out;
  if (format === "mmss") {
    out = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  } else if (format === "ms") {
    out = h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
  } else {
    out = `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  if (showMilli) out += `.${pad(centi)}`;
  return out;
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