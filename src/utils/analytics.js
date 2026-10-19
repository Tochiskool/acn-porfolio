const MEASUREMENT_ID = 'G-H6FVRCH6KL';
const CONSENT_KEY = 'portfolio_analytics_consent';

let analyticsPromise = null;

// Retrieve the visitor's saved consent preference.
export const getAnalyticsConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

// Save the visitor's consent decision.
export const saveAnalyticsConsent = (accepted) => {
  try {
    localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'rejected');
  } catch {
    // Some browsers restrict localStorage.
  }
};

// Remove Google Analytics cookies belonging to this site.
const clearAnalyticsCookies = () => {
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));

  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // Cover the current host and common parent-domain scopes.
  const domains = [''];

  for (let i = 0; i < parts.length - 1; i++) {
    domains.push(parts.slice(i).join('.'));
  }

  cookieNames.forEach((name) => {
    domains.forEach((domain) => {
      const domainPart = domain ? `; domain=${domain}` : '';

      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}`;
    });
  });
};

// Withdraw consent and disable subsequent GA measurement.
export const withdrawAnalyticsConsent = () => {
  saveAnalyticsConsent(false);

  window[`ga-disable-${MEASUREMENT_ID}`] = true;

  // Tell the loaded Google tag that analytics is denied.
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    });
  }

  clearAnalyticsCookies();
};

// Load the Google Analytics script only after consent.
export const loadAnalytics = () => {
  if (getAnalyticsConsent() !== 'accepted') {
    return Promise.resolve(false);
  }

  window[`ga-disable-${MEASUREMENT_ID}`] = false;

  if (analyticsPromise) return analyticsPromise;

  analyticsPromise = new Promise((resolve, reject) => {
    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    // Establish consent before configuring the tag.
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    window.gtag('js', new Date());

    // Disable automatic page views.
    // React Router will send them manually.
    window.gtag('config', MEASUREMENT_ID, {
      send_page_view: false,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

    script.onload = () => resolve(true);

    script.onerror = () => {
      reject(new Error('Google Analytics failed to load'));
    };

    document.head.appendChild(script);
  }).catch((error) => {
    analyticsPromise = null;
    console.error(error);
    return false;
  });

  return analyticsPromise;
};

// Track page navigation.
export const trackPageView = (path) => {
  if (
    getAnalyticsConsent() !== 'accepted' ||
    typeof window.gtag !== 'function'
  ) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
};

// Track custom interactions, such as CV downloads.
export const trackEvent = (eventName, parameters = {}) => {
  if (
    getAnalyticsConsent() !== 'accepted' ||
    typeof window.gtag !== 'function'
  ) {
    return;
  }

  window.gtag('event', eventName, parameters);
};
