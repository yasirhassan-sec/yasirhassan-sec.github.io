/* Privacy-friendly analytics via GoatCounter (no cookies, no personal data).
   Set GOATCOUNTER_CODE to your site code from goatcounter.com to switch it on.
   It only runs on the live domain, so local testing is never counted. */
(() => {
  'use strict';
  const GOATCOUNTER_CODE = '';
  const LIVE_HOSTS = ['yasirhassan.tech', 'www.yasirhassan.tech'];

  if (!GOATCOUNTER_CODE || !LIVE_HOSTS.includes(location.hostname)) return;

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
  document.head.appendChild(s);
})();
