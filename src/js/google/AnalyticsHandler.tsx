'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type AnalyticsHandlerProps = {
  id: string;
};

export default function AnalyticsHandler({ id }: AnalyticsHandlerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + '?' + searchParams.toString();

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', id, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, id]);

  return null;
}
