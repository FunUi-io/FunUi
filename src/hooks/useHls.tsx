// hooks/useHls.ts
import { useEffect } from 'react';
import Hls from 'hls.js';

interface UseHlsOptions {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string;
  autoPlay?: boolean;
  onLoaded?: () => void;
}

export function useHls({ videoRef, src, autoPlay, onLoaded }: UseHlsOptions) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls: Hls | null = null;
    const isHls = src.endsWith('.m3u8');

    const setup = async () => {
      if (isHls && Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          onLoaded?.();
          if (autoPlay) {
            video
              .play()
              .then(() => console.log('HLS auto-play success'))
              .catch((err) => console.warn('HLS auto-play error:', err));
          }
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS.js error:', data);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;

        video.onloadedmetadata = () => {
          onLoaded?.();
          if (autoPlay) {
            video
              .play()
              .then(() => console.log('Native HLS auto-play success'))
              .catch((err) => console.warn('Native HLS auto-play error:', err));
          }
        };
      } else {
        video.src = src;
        onLoaded?.();
        if (autoPlay) {
          video
            .play()
            .then(() => console.log('MP4 auto-play success'))
            .catch((err) => console.warn('MP4 auto-play error:', err));
        }
      }
    };

    setup();

    return () => {
      if (hls) hls.destroy();
    };
  }, [videoRef, src, autoPlay, onLoaded]);
}
