"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const STORAGE_KEY = "cookie-consent";

interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
}

function getConsent(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

export default function AnalyticsScripts() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    setConsent(getConsent());

    const handleUpdate = () => setConsent(getConsent());
    window.addEventListener("cookie-consent-updated", handleUpdate);
    return () => window.removeEventListener("cookie-consent-updated", handleUpdate);
  }, []);

  if (!consent) return null;

  return (
    <>
      {/* Analytics: Yandex Metrika + Google Ads */}
      {consent.analytics && (
        <>
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(91677080, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `}
          </Script>

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-11223285171"
            strategy="afterInteractive"
          />
          <Script id="google-ads" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11223285171');
            `}
          </Script>
        </>
      )}

      {/* Marketing: Meta Pixel */}
      {consent.marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1611727633594481');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
