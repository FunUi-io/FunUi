// videoFunctions.tsx
import { MutableRefObject } from 'react';

export const formatTime = (time: number): string => {
  if (isNaN(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const getBufferedPercent = (
  videoRef: MutableRefObject<HTMLVideoElement | null>,
  duration: number
): number => {
  const video = videoRef.current;
  if (!video || video.buffered.length === 0) return 0;
  const end = video.buffered.end(video.buffered.length - 1);
  return (end / duration) * 100;
};
