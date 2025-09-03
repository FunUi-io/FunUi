// videoShortcuts.ts
export const handleKeyDown = (
  e: KeyboardEvent,
  isPlaying: boolean,
  playVideo: () => void,
  pauseVideo: () => void ,
  spacebarPlay?: boolean
) => {
  if (e.key === ' ' && spacebarPlay) {
    e.preventDefault();
    isPlaying ? pauseVideo() : playVideo();
  }
};
