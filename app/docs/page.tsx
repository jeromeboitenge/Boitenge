'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function DocsPage() {
  const [bundleLoaded, setBundleLoaded] = useState(false);
  const [presetLoaded, setPresetLoaded] = useState(false);

  useEffect(() => {
    if (!bundleLoaded || !presetLoaded) return;

    const SwaggerUI = (window as any).SwaggerUIBundle;
    const SwaggerUIStandalonePreset = (window as any).SwaggerUIStandalonePreset;

    if (!SwaggerUI || !SwaggerUIStandalonePreset) return;

    SwaggerUI({
      dom_id: '#swagger-ui',
      url: '/api/swagger.json',
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
      layout: 'BaseLayout',
    });
  }, [bundleLoaded, presetLoaded]);

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText px-4 py-16 sm:px-6 lg:px-8">
      <Script
        src="https://unpkg.com/swagger-ui-dist@4/swagger-ui-bundle.js"
        strategy="afterInteractive"
        onLoad={() => setBundleLoaded(true)}
      />
      <Script
        src="https://unpkg.com/swagger-ui-dist@4/swagger-ui-standalone-preset.js"
        strategy="afterInteractive"
        onLoad={() => setPresetLoaded(true)}
      />
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4/swagger-ui.css" />
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
        <div id="swagger-ui" className="min-h-[80vh]" />
      </div>
    </div>
  );
}
