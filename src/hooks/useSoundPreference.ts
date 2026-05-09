import { useEffect, useState } from "react";

const KEY = "myboost.soundEnabled";
const EVENT = "myboost:sound-pref-changed";

type SoundPrefEvent = CustomEvent<{ enabled: boolean }>;

export function isSoundEnabled() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(KEY) !== "false";
}

export function setSoundEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, enabled ? "true" : "false");
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { enabled } }));
}

export function useSoundPreference(): [boolean, (next: boolean) => void] {
  const [enabled, setEnabled] = useState<boolean>(isSoundEnabled);

  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as SoundPrefEvent).detail;
      if (detail) setEnabled(detail.enabled);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setEnabled(isSoundEnabled());
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return [enabled, (next: boolean) => setSoundEnabled(next)];
}
