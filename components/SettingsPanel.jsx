"use client";

import { useEffect, useRef, useState } from "react";
import { FORMATS, splitMs, toMs } from "@/lib/time";
import { FONTS } from "@/lib/fonts";
import styles from "./SettingsPanel.module.css";

const MODES = [
  { value: "countdown", label: "Countdown" },
  { value: "countup", label: "Count up" },
];

const FINISH_MODES = [
  { value: "stop", label: "Stop" },
  { value: "repeat", label: "Repeat" },
];

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const PRESETS = [
  { label: "1 min", ms: 60_000 },
  { label: "5 min", ms: 5 * 60_000 },
  { label: "10 min", ms: 10 * 60_000 },
  { label: "20 min", ms: 20 * 60_000 },
];

function Segmented({ options, value, onChange }) {
  return (
    <div className={styles.segmented}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`${styles.segBtn} ${value === o.value ? styles.segActive : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function CogIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function SettingsPanel({ settings, onChange, duration, onDurationChange }) {
  const [open, setOpen] = useState(true);
  const panelRef = useRef(null);
  const parts = splitMs(duration);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <aside ref={panelRef} className={`${styles.panel} ${open ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.toggle}
        aria-label={open ? "Close settings" : "Open settings"}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <XIcon /> : <CogIcon />}
      </button>

      {open && (
        <div className={styles.body}>
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Timer</span>

            <div className={styles.field}>
              <span>Mode</span>
              <Segmented
                options={MODES}
                value={settings.mode}
                onChange={(value) => onChange({ mode: value })}
              />
            </div>

            {settings.mode === "countdown" && (
              <>
                <div className={styles.field}>
                  <span>Duration</span>
                  <div className={styles.presets}>
                    {PRESETS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        className={`${styles.preset} ${duration === p.ms ? styles.presetActive : ""}`}
                        onClick={() => onDurationChange(p.ms)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.field}>
                  <span>Custom duration</span>
                  <div className={styles.custom}>
                    <label>
                      H
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={parts.h}
                        onChange={(e) =>
                          onDurationChange(
                            toMs({ ...splitMs(duration), h: Number(e.target.value) || 0 })
                          )
                        }
                      />
                    </label>
                    <label>
                      M
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={parts.m}
                        onChange={(e) =>
                          onDurationChange(
                            toMs({ ...splitMs(duration), m: Number(e.target.value) || 0 })
                          )
                        }
                      />
                    </label>
                    <label>
                      S
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={parts.s}
                        onChange={(e) =>
                          onDurationChange(
                            toMs({ ...splitMs(duration), s: Number(e.target.value) || 0 })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className={styles.field}>
                  <span>When time ends</span>
                  <Segmented
                    options={FINISH_MODES}
                    value={settings.onFinish}
                    onChange={(value) => onChange({ onFinish: value })}
                  />
                </div>
              </>
            )}
          </div>

          <div className={styles.section}>
            <span className={styles.sectionTitle}>Appearance</span>

            <div className={styles.field}>
              <span>Font</span>
              <select
                value={settings.font}
                onChange={(e) => onChange({ font: e.target.value })}
              >
                {FONTS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <span>
                Font size <em>{settings.fontSize}rem</em>
              </span>
              <input
                type="range"
                min="3"
                max="16"
                step="0.5"
                value={settings.fontSize}
                onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
              />
            </div>

            <div className={styles.field}>
              <span>Time format</span>
              <select
                value={settings.format}
                onChange={(e) => onChange({ format: e.target.value })}
              >
                {FORMATS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <span>Theme</span>
              <Segmented
                options={THEMES}
                value={settings.theme}
                onChange={(value) => onChange({ theme: value })}
              />
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionTitle}>Developer</span>
            <div className={styles.field}>
              <label className={styles.switchRow}>
                <span>Next.js dev tools</span>
                <input
                  type="checkbox"
                  className={styles.switch}
                  checked={settings.dev}
                  onChange={(e) => onChange({ dev: e.target.checked })}
                />
              </label>
              <p className={styles.hint}>
                Shows the Next.js button (bottom-left) with accessibility checks and app issues.
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}