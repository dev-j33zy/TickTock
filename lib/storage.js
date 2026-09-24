"use client";

import { useCallback, useSyncExternalStore } from "react";

const subscribers = new Set();
const cache = new Map();

function notify() {
  subscribers.forEach((cb) => cb());
}

function handleStorageEvent(event) {
  if (event.key !== null) notify();
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", handleStorageEvent);
}

function subscribe(cb) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

function safeParse(raw, fallback) {
  if (raw === null) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed === undefined || parsed === null ? fallback : parsed;
  } catch {
    return fallback;
  }
}

export function usePersistedState(key, fallback) {
  const subscribeStable = useCallback((cb) => subscribe(cb), []);

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key);
    if (!cache.has(key) || cache.get(key).raw !== raw) {
      cache.set(key, { raw, value: safeParse(raw, fallback) });
    }
    return cache.get(key).value;
  }, [key, fallback]);

  const getServerSnapshot = useCallback(() => fallback, [fallback]);

  const value = useSyncExternalStore(subscribeStable, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (updater) => {
      const prev = getSnapshot();
      const next = typeof updater === "function" ? updater(prev) : updater;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore quota / private mode errors
      }
      notify();
    },
    [key, getSnapshot]
  );

  return [value, setValue];
}