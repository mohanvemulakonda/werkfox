'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface CookieConsentContextType {
  hasConsent: boolean;
  showBanner: boolean;
  preferences: CookiePreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  openSettings: () => void;
  closeSettings: () => void;
  showSettings: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = 'livato-cookie-consent';
const PREFERENCES_KEY = 'livato-cookie-preferences';

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [hasConsent, setHasConsent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, non-toggleable
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Load saved preferences on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedConsent = localStorage.getItem(STORAGE_KEY);
      const savedPreferences = localStorage.getItem(PREFERENCES_KEY);

      if (savedConsent === 'true') {
        setHasConsent(true);
        setShowBanner(false);

        if (savedPreferences) {
          try {
            const parsedPrefs = JSON.parse(savedPreferences);
            setPreferences({ ...parsedPrefs, essential: true }); // Ensure essential is always true
          } catch (e) {
            console.error('Failed to parse cookie preferences:', e);
          }
        }
      } else {
        // Show banner after a short delay for better UX
        setTimeout(() => setShowBanner(true), 1000);
      }
    }
  }, []);

  const saveConsentData = (prefs: CookiePreferences) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
      setPreferences(prefs);
      setHasConsent(true);
      setShowBanner(false);
      setShowSettings(false);

      // Trigger analytics initialization if analytics are enabled
      if (prefs.analytics && typeof window !== 'undefined') {
        // @ts-ignore
        if (window.gtag) {
          // @ts-ignore
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
          });
        }
      }
    }
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveConsentData(allAccepted);
  };

  const rejectAll = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    saveConsentData(onlyEssential);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    saveConsentData({ ...prefs, essential: true }); // Ensure essential is always true
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        hasConsent,
        showBanner,
        preferences,
        acceptAll,
        rejectAll,
        savePreferences,
        openSettings,
        closeSettings,
        showSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}
