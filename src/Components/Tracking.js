import * as React from "react";
import { Helmet } from "react-helmet-async";

export function Tracking() {
  const [_, setTrackingEnabled] = React.useState(false);
  // const { cookieConsentChoice } = useCookieConsent();

  React.useEffect(() => {
    setTrackingEnabled(true);
  }, []);

  return (
    <Helmet>
      <script async src="/tracking.js" />
    </Helmet>
  );
}
