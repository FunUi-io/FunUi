'use client';
import React, { Suspense } from 'react';
import Script from 'next/script';
import AnalyticsHandler from './AnalyticsHandler';

type AnalyticsProps = {
  id: string;
};

export default function Analytics({ id }: AnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}');
          `,
        }}
      />
      <Suspense fallback={null}>
        <AnalyticsHandler id={id} />
      </Suspense>
    </>
  );
}
