import { useEffect, useState } from 'react';

import {
  getAnalyticsConsent,
  saveAnalyticsConsent,
  withdrawAnalyticsConsent,
} from '../../utils/analytics';

import './CookieConsent.css';

const CookieConsent = ({ onConsentChange }) => {
  // Read the visitor's previously saved preference.
  const [consent, setConsent] = useState(getAnalyticsConsent);

  // Controls whether the banner is visible.
  const [showBanner, setShowBanner] = useState(
    () => getAnalyticsConsent() === null
  );

  useEffect(() => {
    // Allow the footer to reopen cookie preferences.
    const openPreferences = () => setShowBanner(true);

    window.addEventListener('open-cookie-preferences', openPreferences);

    return () => {
      window.removeEventListener('open-cookie-preferences', openPreferences);
    };
  }, []);

  const chooseConsent = (accepted) => {
    if (accepted) {
      saveAnalyticsConsent(true);
    } else {
      // Also handles withdrawal of previous consent.
      withdrawAnalyticsConsent();
    }

    setConsent(accepted ? 'accepted' : 'rejected');
    setShowBanner(false);

    // Notify App.jsx so tracking responds to the choice.
    onConsentChange(accepted);
  };

  if (!showBanner) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-label="Analytics cookie preferences"
      aria-modal="false"
    >
      <p>
        We use optional analytics cookies to understand how visitors interact
        with this portfolio. You can accept or reject analytics tracking and
        change your choice at any time.
      </p>

      <div className="cookie-actions">
        <button type="button" onClick={() => chooseConsent(false)}>
          Reject
        </button>

        <button type="button" onClick={() => chooseConsent(true)}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;

// import { useState } from 'react';
// import {
//   getAnalyticsConsent,
//   saveAnalyticsConsent,
// } from '../../utils/analytics';

// import './CookieConsent.css';

// const CookieConsent = ({ onConsentChange }) => {
//   const [consent, setConsent] = useState(getAnalyticsConsent);

//   //   const [showSettings, setShowSettings] = useState(false);

//   const chooseConsent = (accepted) => {
//     saveAnalyticsConsent(accepted);
//     setConsent(accepted ? 'accepted' : 'rejected');
//     // setShowSettings(false);
//     onConsentChange(accepted);
//   };

//   return (
//     <>
//       {/* {(consent === null || showSettings) && ( */}
//       {consent === null && (
//         <div
//           className="cookie-banner"
//           role="dialog"
//           aria-label="Analytics cookie preferences"
//         >
//           <p>
//             We use optional analytics cookies to understand how visitors
//             interact with this portfolio. You can accept or reject analytics
//             tracking.
//           </p>

//           <div className="cookie-actions">
//             <button onClick={() => chooseConsent(false)}>Reject</button>

//             <button onClick={() => chooseConsent(true)}>Accept</button>
//           </div>
//         </div>
//       )}

//       {/* {consent !== null && !showSettings && (
//         <button
//           className="cookie-settings"
//           onClick={() => setShowSettings(true)}
//           aria-label="Change cookie preferences"
//         >
//           Cookie settings
//         </button>
//       )} */}
//     </>
//   );
// };

// export default CookieConsent;
