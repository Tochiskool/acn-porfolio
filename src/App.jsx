import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

import AppContent from './pages/AppContent/AppContent';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import CookieConsent from './components/CookieConsent/CookieConsent';

import {
  getAnalyticsConsent,
  loadAnalytics,
  trackPageView,
} from './utils/analytics';

// Tracks page navigation after analytics consent.
const AnalyticsTracker = ({ consentAccepted }) => {
  const location = useLocation();

  useEffect(() => {
    // Never track without visitor consent.
    if (!consentAccepted) return;

    let cancelled = false;

    const path = location.pathname + location.search + location.hash;

    // Load GA4 and record the current route.
    loadAnalytics().then((loaded) => {
      if (!cancelled && loaded) {
        trackPageView(path);
      }
    });

    // Prevent stale asynchronous callbacks.
    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.search, location.hash, consentAccepted]);

  return null;
};

const App = () => {
  // Initialize consent from localStorage.
  const [consentAccepted, setConsentAccepted] = useState(
    () => getAnalyticsConsent() === 'accepted'
  );

  return (
    <BrowserRouter>
      {/* Google Analytics route tracking */}
      <AnalyticsTracker consentAccepted={consentAccepted} />

      {/* Existing portfolio application */}
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>

      {/* Cookie consent management */}
      <CookieConsent onConsentChange={setConsentAccepted} />
    </BrowserRouter>
  );
};

export default App;
