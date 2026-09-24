"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/lib/time";
import { FONTS } from "@/lib/fonts";
import { usePersistedState } from "@/lib/storage";
import { syncDevIndicator } from "@/lib/devtools";
import SettingsPanel from "@/components/SettingsPanel";
import styles from "./TimerApp.module.css";

const DEFAULT_SETTINGS = {
  mode: "countdown",
  onFinish: "stop",
  font: "inter",
  fontSize: 7,
  format: "hms",
  theme: "light",
  dev: false,
};

const DEFAULT_SESSION = {
  duration: 5 * 60_000,
  accumulated: 0,
  startedAt: null,
};

const STORAGE_SETTINGS = "timer.settings";
const STORAGE_SESSION = "timer.session";

function playAlarm() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  ctx.resume();
  [0, 0.25, 0.5, 0.75].forEach((offset) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = ctx.currentTime + offset;
    osc.type = "sine";
    osc.frequency.value = offset % 0.5 === 0 ? 880 : 1046;
    gain.gain.setValueAtTime(0.25, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.2);
  });
}

export default function TimerApp() {
  const [settings, setSettings] = usePersistedState(STORAGE_SETTINGS, DEFAULT_SETTINGS);
  const [session, setSession] = usePersistedState(STORAGE_SESSION, DEFAULT_SESSION);
  const [now, setNow] = useState(0);

  const mode = settings.mode;
  const onFinish = settings.onFinish;
  const duration = session.duration;
  const accumulated = session.accumulated;
  const startedAt = session.startedAt;
  const isRunning = startedAt !== null;
  const finished = mode === "countdown" && !isRunning && accumulated >= duration && duration > 0;

  const liveMs = isRunning ? Math.max(0, now - startedAt) : 0;
  const displayMs =
    mode === "countdown"
      ? Math.max(0, duration - accumulated - liveMs)
      : accumulated + liveMs;

  const displayText = formatTime(
    mode === "countdown" ? Math.ceil(displayMs / 1000) : Math.floor(displayMs / 1000),
    settings.format
  );

  const progress =
    mode === "countdown" && duration > 0
      ? Math.min(1, Math.max(0, (duration - displayMs) / duration))
      : 0;

  useEffect(() => {
    syncDevIndicator(settings.dev);
  }, [settings.dev]);

  useEffect(() => {
    const activeFont = FONTS.find((f) => f.value === settings.font) || FONTS[0];
    document.documentElement.style.setProperty("--display-font", activeFont.cssVar);
    document.documentElement.style.setProperty("--display-size", `${settings.fontSize}rem`);
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings]);

  useEffect(() => {
    if (startedAt === null) return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (mode === "countdown") {
        const remaining = duration - accumulated - (t - startedAt);
        if (remaining <= 0) {
          if (onFinish === "repeat") {
            setSession((s) => ({ ...s, accumulated: 0, startedAt: t }));
          } else {
            setSession((s) => ({ ...s, startedAt: null, accumulated: s.duration }));
            playAlarm();
          }
        }
      }
    }, 100);
    return () => clearInterval(id);
  }, [startedAt, mode, duration, accumulated, onFinish, setSession]);

  function handleStart() {
    const t = Date.now();
    setNow(t);
    setSession((s) => {
      const remaining = mode === "countdown" ? Math.max(0, s.duration - s.accumulated) : 0;
      return { ...s, accumulated: remaining <= 0 ? 0 : s.accumulated, startedAt: t };
    });
  }

  function handlePause() {
    const t = Date.now();
    setNow(t);
    setSession((s) => {
      if (s.startedAt === null) return s;
      const elapsed = s.accumulated + (t - s.startedAt);
      return {
        ...s,
        accumulated: mode === "countdown" ? Math.min(s.duration, elapsed) : elapsed,
        startedAt: null,
      };
    });
  }

  function handleReset() {
    setNow(0);
    setSession((s) => ({ ...s, accumulated: 0, startedAt: null }));
  }

  function updateDuration(nextMs) {
    setNow(0);
    setSession((s) => ({ ...s, duration: nextMs, accumulated: 0, startedAt: null }));
  }

  function handleSettingsChange(patch) {
    if (patch.mode && patch.mode !== mode) {
      handleReset();
    }
    setSettings((prev) => ({ ...prev, ...patch }));
  }

  const startLabel =
    finished ? "Start" : startedAt === null && accumulated > 0 ? "Resume" : "Start";

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <span className={styles.brand}>Ticktock</span>
      </header>

      <main className={styles.main}>
        <div className={styles.clock}>
          <div className={styles.time} data-finish={finished}>
            {displayText}
          </div>
          <div className={styles.progressWrap}>
            <div className={styles.progress} style={{ width: `${progress * 100}%` }} />
          </div>
        </div>

        <div className={styles.controls}>
          {isRunning ? (
            <button type="button" className={styles.pauseBtn} onClick={handlePause}>
              Pause
            </button>
          ) : (
            <button type="button" className={styles.startBtn} onClick={handleStart}>
              {startLabel}
            </button>
          )}
          <button type="button" className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
        </div>

        </main>

      <SettingsPanel
        settings={settings}
        onChange={handleSettingsChange}
        duration={duration}
        onDurationChange={updateDuration}
      />
    </div>
  );
}