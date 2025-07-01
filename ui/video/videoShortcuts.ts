// videoShortcuts.ts
export const handleKeyDown = (
  e: KeyboardEvent,
  isPlaying: boolean,
  playVideo: () => void,
  pauseVideo: () => void
) => {
  if (e.key === ' ') {
    e.preventDefault();
    isPlaying ? pauseVideo() : playVideo();
  }
};
