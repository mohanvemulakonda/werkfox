'use client';

import React, { useState } from 'react';
import { useCookieConsent, CookiePreferences } from '../lib/cookie-consent-context';
import Link from 'next/link';

export default function CookieBanner() {
  const {
    hasConsent,
    showBanner,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings,
    closeSettings,
    showSettings,
  } = useCookieConsent();

  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);

  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'essential') return; // Essential cookies cannot be toggled
    setLocalPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSavePreferences = () => {
    savePreferences(localPreferences);
  };

  // Cookie Settings Button (shown after consent is given)
  if (hasConsent && !showSettings) {
    return (
      <button
        onClick={openSettings}
        className="fixed bottom-4 left-4 z-50 bg-white border border-gray-900 text-gray-900 px-8 py-3 shadow-lg hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center gap-2 font-inter text-sm tracking-wide"
        aria-label="Cookie Settings"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Cookie Settings
      </button>
    );
  }

  // Settings Modal
  if (showSettings) {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
          onClick={closeSettings}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
            {/* Header */}
            <div className="sticky top-0 bg-[#2563EB] text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-open-sans mb-1">Cookie Settings</h2>
                  <p className="text-blue-100 text-sm font-inter">Manage your cookie preferences</p>
                </div>
                <button
                  onClick={closeSettings}
                  className="text-white hover:bg-white/20 p-2 transition-colors"
                  aria-label="Close settings"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <p className="text-gray-600 font-inter text-sm">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                You can choose which types of cookies you want to accept. Essential cookies cannot be disabled as they are
                necessary for the website to function properly.
              </p>

              {/* Cookie Categories */}
              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="border border-gray-200 p-4 bg-blue-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 font-open-sans">Essential Cookies</h3>
                        <span className="px-2 py-1 bg-blue-100 text-[#2563EB] text-xs font-semibold">Required</span>
                      </div>
                      <p className="text-sm text-gray-600 font-inter">
                        These cookies are necessary for the website to function and cannot be disabled. They include session management,
                        security features, and basic functionality.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="w-14 h-8 bg-[#2563EB] flex items-center justify-end px-1 cursor-not-allowed opacity-75">
                        <div className="w-6 h-6 bg-white shadow-md" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 p-4 hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 font-open-sans mb-2">Analytics Cookies</h3>
                      <p className="text-sm text-gray-600 font-inter">
                        Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                        This helps us improve our website performance and user experience.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handleToggle('analytics')}
                        className={`w-14 h-8 transition-all duration-300 flex items-center px-1 ${
                          localPreferences.analytics
                            ? 'bg-[#2563EB] justify-end'
                            : 'bg-gray-300 justify-start'
                        }`}
                        aria-label="Toggle analytics cookies"
                      >
                        <div className="w-6 h-6 bg-white shadow-md" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 p-4 hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 font-open-sans mb-2">Marketing Cookies</h3>
                      <p className="text-sm text-gray-600 font-inter">
                        Used to track visitors across websites to display relevant advertisements. These cookies help us show you
                        personalized content and measure the effectiveness of our marketing campaigns.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handleToggle('marketing')}
                        className={`w-14 h-8 transition-all duration-300 flex items-center px-1 ${
                          localPreferences.marketing
                            ? 'bg-[#2563EB] justify-end'
                            : 'bg-gray-300 justify-start'
                        }`}
                        aria-label="Toggle marketing cookies"
                      >
                        <div className="w-6 h-6 bg-white shadow-md" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="border border-gray-200 p-4 hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 font-open-sans mb-2">Preference Cookies</h3>
                      <p className="text-sm text-gray-600 font-inter">
                        Enable the website to remember your choices (such as language, region, or display preferences) to provide
                        a more personalized experience tailored to your needs.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handleToggle('preferences')}
                        className={`w-14 h-8 transition-all duration-300 flex items-center px-1 ${
                          localPreferences.preferences
                            ? 'bg-[#2563EB] justify-end'
                            : 'bg-gray-300 justify-start'
                        }`}
                        aria-label="Toggle preference cookies"
                      >
                        <div className="w-6 h-6 bg-white shadow-md" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                <Link
                  href="/privacy-policy"
                  className="text-[#2563EB] hover:text-[#1e40af] text-sm font-semibold font-inter underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/cookie-policy"
                  className="text-[#2563EB] hover:text-[#1e40af] text-sm font-semibold font-inter underline"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={rejectAll}
                  className="flex-1 bg-gray-900 text-white px-8 py-3 text-sm tracking-wide hover:bg-[#2563EB] transition-all duration-300 font-inter"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 border border-gray-900 text-gray-900 px-8 py-3 text-sm tracking-wide hover:bg-gray-900 hover:text-white transition-all font-inter"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-[#2563EB] text-white px-8 py-3 text-sm tracking-wide hover:bg-gray-900 transition-all duration-300 font-inter"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main Banner (shown on first visit)
  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
      {/* Banner */}
      <div className="bg-white border-t-[3px] border-[#2563EB] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Icon and Content */}
            <div className="flex-1 flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#2563EB] flex items-center justify-center relative">
                  <svg className="w-7 h-7 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#2563EB] animate-pulse"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-open-sans tracking-tight">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600 font-inter leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                  By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or learn more
                  in our{' '}
                  <Link href="/privacy-policy" className="text-[#2563EB] hover:text-gray-900 font-semibold underline decoration-2 underline-offset-2 transition-colors">
                    Privacy Policy
                  </Link>
                  {' '}and{' '}
                  <Link href="/cookie-policy" className="text-[#2563EB] hover:text-gray-900 font-semibold underline decoration-2 underline-offset-2 transition-colors">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0 lg:min-w-max">
              <button
                onClick={openSettings}
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 text-sm font-medium tracking-wide hover:border-gray-900 hover:text-gray-900 transition-all font-inter whitespace-nowrap group"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Customize
                </span>
              </button>
              <button
                onClick={rejectAll}
                className="bg-gray-100 text-gray-900 px-6 py-3 text-sm font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all duration-300 font-inter whitespace-nowrap"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="bg-[#2563EB] text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-gray-900 transition-all duration-300 font-inter whitespace-nowrap shadow-lg hover:shadow-xl"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
