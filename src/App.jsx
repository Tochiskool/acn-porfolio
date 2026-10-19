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

const AnalyticsTracker = ({ consentAccepted }) => {
  const location = useLocation();

  useEffect(() => {
    if (!consentAccepted) return;

    let cancelled = false;

    const path = location.pathname + location.search + location.hash;

    loadAnalytics().then((loaded) => {
      if (!cancelled && loaded) {
        trackPageView(path);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.search, location.hash, consentAccepted]);

  return null;
};

const App = () => {
  const [consentAccepted, setConsentAccepted] = useState(
    () => getAnalyticsConsent() === 'accepted'
  );

  return (
    <BrowserRouter>
      <AnalyticsTracker consentAccepted={consentAccepted} />

      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>

      <CookieConsent onConsentChange={setConsentAccepted} />
    </BrowserRouter>
  );
};

export default App;
