"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "cookie-consent";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

function getStoredPreferences(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function savePreferences(prefs: Omit<CookiePreferences, "timestamp">) {
  const data: CookiePreferences = {
    ...prefs,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("cookie-consent-updated"));
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-5.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const isClient = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!isClient) return null;

  return <InnerCookieConsent />;
}

function InnerCookieConsent() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !getStoredPreferences();
  });
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(() => {
    const stored = getStoredPreferences();
    return stored ? stored.analytics : true;
  });
  const [marketing, setMarketing] = useState(() => {
    const stored = getStoredPreferences();
    return stored ? stored.marketing : false;
  });

  // Listen for footer "open cookie settings" event
  useEffect(() => {
    const handleOpen = () => {
      const stored = getStoredPreferences();
      if (stored) {
        setAnalytics(stored.analytics);
        setMarketing(stored.marketing);
      }
      setIsVisible(true);
      setShowSettings(true);
    };
    window.addEventListener("open-cookie-settings", handleOpen);
    return () => window.removeEventListener("open-cookie-settings", handleOpen);
  }, []);

  const acceptAll = useCallback(() => {
    setAnalytics(true);
    setMarketing(true);
    savePreferences({ analytics: true, marketing: true });
    setIsVisible(false);
    setShowSettings(false);
  }, []);

  const saveIndividual = useCallback(() => {
    savePreferences({ analytics, marketing });
    setIsVisible(false);
    setShowSettings(false);
  }, [analytics, marketing]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-60 flex justify-end p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-2.5 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] md:p-4">
        {/* Header with close button */}
        <div className="relative pr-10">
          <p className="text-sm leading-relaxed text-gray-700 md:text-base">
            Wir verwenden Cookies auf unserer Website. Einige von ihnen sind essenziell, um die
            Funktionalität der Website zu gewährleisten, während andere uns helfen, die Zugriffe auf
            unsere Website zu analysieren. Personenbezogene Daten können verarbeitet werden (z. B.
            IP-Adressen), z. B. für Anzeigen- und Inhaltsmessung. Wählen Sie aus, welche Cookies Sie
            zulassen:
          </p>
          <button
            onClick={saveIndividual}
            className="absolute -top-1 right-0 rounded-sm p-1 text-gray-500 transition-colors hover:text-gray-900"
            aria-label="Schließen"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Settings toggles */}
        {showSettings && (
          <div className="mt-6 flex flex-col gap-2">
            {/* Essential cookies - always active */}
            <div className="bg-gray-light flex items-center justify-between rounded-xl px-5 py-4">
              <span className="text-sm font-medium md:text-base">
                Technisch notwendige Cookies (immer aktiv)
              </span>
              <span className="text-brand text-sm font-semibold">Always active</span>
            </div>

            {/* Analytics cookies */}
            <div className="bg-gray-light flex items-center justify-between rounded-xl px-5 py-4">
              <span className="text-sm font-medium md:text-base">
                Analyse-Cookies (Google Analytics 4)
              </span>
              <Toggle checked={analytics} onChange={setAnalytics} />
            </div>

            {/* Marketing cookies */}
            <div className="bg-gray-light flex items-center justify-between rounded-xl px-5 py-4">
              <span className="text-sm font-medium md:text-base">Marketing</span>
              <Toggle checked={marketing} onChange={setMarketing} />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={acceptAll}
            className="bg-brand hover:bg-brand/90 cursor-pointer rounded-2xl px-6 py-4 text-sm font-semibold text-nowrap text-white transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={saveIndividual}
            className="bg-gray-light cursor-pointer rounded-2xl px-6 py-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Individuelle Einstellungen speichern
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-gray-light cursor-pointer rounded-2xl px-6 py-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            {showSettings ? "Einstellungen ausblenden" : "Einstellungen anzeigen"}
          </button>
        </div>

        {/* Links */}
        <div className="mt-4 flex justify-center gap-6">
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-500 underline transition-colors hover:text-gray-700"
          >
            Cookie Policy
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-500 underline transition-colors hover:text-gray-700"
          >
            Privacy Statement
          </Link>
        </div>
      </div>
    </div>
  );
}

export { getStoredPreferences, STORAGE_KEY };
