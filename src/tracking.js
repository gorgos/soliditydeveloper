import "autotrack/lib/plugins/url-change-tracker";

const googleScript = document.createElement("script");
googleScript.setAttribute("async", true);
googleScript.setAttribute(
  "src",
  "https://www.google-analytics.com/analytics.js"
);
document.head.appendChild(googleScript);

const gtmScript = document.createElement("script");
gtmScript.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TPGJ3Z4');`;
document.head.appendChild(gtmScript);
