'use client'
import React, { lazy, Suspense } from 'react';

const Video = lazy(() => import('next-video'));

interface SimpleVideoProps {
  /** HLS (.m3u8) or processed next-video source */
  src: string;

  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  style?: React.CSSProperties;
  className?: string;
  funcss?: string;

  /** Optional: cap max resolution (e.g. 1080) */
  maxResolution?: 360 | 480 | 720 | 1080 | 1440 | 2160;
  
  /** Optional: custom loading component */
  loadingComponent?: React.ReactNode;
}

const SimpleVideo: React.FC<SimpleVideoProps> = ({
  src,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  className = '',
  funcss,
  style = {},
  maxResolution,
  loadingComponent,
}) => {
  return (
    <div>
      <Suspense fallback={loadingComponent || <div className="video-loading">Loading video...</div>}>
        <Video
          src={src}
          style={{...style}}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          className={`${className} ${funcss}`}
          preload="metadata"
          {...(maxResolution && {
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
          })}
        />
      </Suspense>
    </div>
  );
};

export default SimpleVideo;

// 'use client';
// import React, { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
// import { 
//   PiCornersOut, PiPlay, PiPause, PiSpeakerHigh, PiSpeakerSlash, PiSpeakerNone
// } from 'react-icons/pi';
// import { TfiControlBackward, TfiControlForward, TfiDownload } from "react-icons/tfi";
// import Text from '../text/Text';
// import RowFlex from '../specials/RowFlex';
// import ToolTip from '../tooltip/ToolTip';
// import Circle from '../specials/Circle';
// import { formatTime } from './videoFunctions';
// import { getDynamicIcon } from '../../utils/getDynamicIcon';

// // Import Video.js
// import videojs from 'video.js';
// // import 'video.js/dist/video-js.css';

// // Type declarations
// declare global {
//   interface Window {
//     videojs: typeof videojs;
//   }
// }

// // Custom handleKeyDown function
// const handleKeyDown = (e: KeyboardEvent, isPlaying: boolean, playVideo: () => void, pauseVideo: () => void, spacebarPlay: boolean = true) => {
//   const target = e.target as HTMLElement;
//   const isInput = target.tagName === 'INPUT' || 
//                   target.tagName === 'TEXTAREA' || 
//                   target.isContentEditable;
  
//   if (e.code === 'Space' && isInput) {
//     return;
//   }
  
//   if (spacebarPlay && e.code === 'Space') {
//     e.preventDefault();
//     isPlaying ? pauseVideo() : playVideo();
//   }
// };

// // Configuration hook
// const useComponentConfiguration = (componentName: string, variant: string = '') => {
//   const getComponentConfig = () => {
//     const baseConfig = {
//       Video: {
//         default: {
//           showControls: true,
//           showPlayPause: true,
//           showProgress: true,
//           showVolume: true,
//           showTime: true,
//           showFullscreen: true,
//           showDownload: false,
//           showSeekButtons: false,
//           spacebarPlay: true,
//           autoPlay: false,
//           loop: false,
//           muted: false,
//           seekAmount: 10,
//           hideControlsDelay: 3000,
//           preload: 'metadata',
//           preloadStrategy: 'moderate',
//           bufferThreshold: 10,
//           funcss: '',
//           containerCss: '',
//           videoCss: '',
//           controlsCss: '',
//           progressCss: '',
//           progressBarCss: '',
//           timeCss: '',
//           playCss: '',
//           pauseCss: '',
//           volumeCss: '',
//           fullscreenCss: '',
//           downloadCss: '',
//           rewindCss: '',
//           forwardCss: '',
//           buttonCss: '',
//           volumeStyle: 'slider',
//           useVideoJs: true, // New option for Video.js
//           videojsOptions: {}, // Video.js specific options
//         },
//         minimal: {
//           showControls: true,
//           showPlayPause: true,
//           showProgress: true,
//           showVolume: false,
//           showTime: true,
//           showFullscreen: true,
//           showDownload: false,
//           showSeekButtons: false,
//           controlsCss: 'minimal-controls',
//           buttonCss: 'minimal-btn',
//           volumeStyle: 'hover',
//           useVideoJs: true,
//         },
//         embedded: {
//           showControls: false,
//           autoPlay: true,
//           muted: true,
//           loop: true,
//           containerCss: 'embedded-video',
//           useVideoJs: true,
//         },
//         fullFeatured: {
//           showControls: true,
//           showPlayPause: true,
//           showProgress: true,
//           showVolume: true,
//           showTime: true,
//           showFullscreen: true,
//           showDownload: true,
//           showSeekButtons: true,
//           controlsCss: 'full-featured-controls',
//           buttonCss: 'featured-btn',
//           volumeStyle: 'slider',
//           useVideoJs: true,
//         },
//         theater: {
//           showControls: true,
//           containerCss: 'theater-mode',
//           videoCss: 'theater-video',
//           controlsCss: 'theater-controls',
//           fullscreenCss: 'theater-fullscreen',
//           volumeStyle: 'slider',
//           useVideoJs: true,
//         },
//         youtube: {
//           showControls: true,
//           showPlayPause: true,
//           showProgress: true,
//           showVolume: true,
//           showTime: true,
//           showFullscreen: true,
//           showDownload: false,
//           showSeekButtons: false,
//           controlsCss: 'youtube-controls',
//           buttonCss: 'youtube-btn',
//           volumeStyle: 'hover',
//           hideControlsDelay: 2000,
//           useVideoJs: true,
//         },
//         optimized: {
//           preloadStrategy: 'aggressive',
//           bufferThreshold: 15,
//           videoCss: 'gpu-accelerated',
//           useVideoJs: true,
//           videojsOptions: {
//             html5: {
//               vhs: {
//                 overrideNative: true,
//                 enableLowInitialPlaylist: true,
//                 smoothQualityChange: true,
//               },
//             },
//           },
//         }
//       }
//     };

//     return baseConfig[componentName as keyof typeof baseConfig] || {};
//   };

//   const mergeWithLocal = (localProps: any) => {
//     const config = getComponentConfig();
//     const variantConfig = variant && config[variant as keyof typeof config] ? config[variant as keyof typeof config] : {};
//     const defaultConfig = config.default || {};
    
//     const mergedProps = {
//       ...defaultConfig,
//       ...variantConfig,
//       ...localProps,
//     };

//     return {
//       props: mergedProps,
//       variantConfig,
//       defaultConfig,
//     };
//   };

//   return {
//     mergeWithLocal,
//     getComponentConfig,
//   };
// };

// interface VideoProps {
//   src: string;
//   poster?: string;
//   onDuration?: (duration: number) => void;
//   onEnded?: () => void;
//   isPause?: boolean;
//   spacebarPlay?: boolean;
//   className?: string;
//   autoPlay?: boolean;
  
//   // Controls visibility
//   showControls?: boolean;
//   showPlayPause?: boolean;
//   showProgress?: boolean;
//   showVolume?: boolean;
//   showTime?: boolean;
//   showFullscreen?: boolean;
//   showDownload?: boolean;
//   showSeekButtons?: boolean;
  
//   // Custom icons
//   playIcon?: string | ReactNode;
//   pauseIcon?: string | ReactNode;
//   fullscreenIcon?: string | ReactNode;
//   downloadIcon?: string | ReactNode;
//   volumeIcon?: string | ReactNode;
//   muteIcon?: string | ReactNode;
//   rewindIcon?: string | ReactNode;
//   forwardIcon?: string | ReactNode;
  
//   // Behavior
//   hideControlsDelay?: number;
//   loop?: boolean;
//   muted?: boolean;
//   seekAmount?: number;
//   preload?: 'none' | 'metadata' | 'auto';
//   preloadStrategy?: 'conservative' | 'moderate' | 'aggressive';
//   bufferThreshold?: number;
  
//   // Custom CSS classes
//   funcss?: string;
//   containerCss?: string;
//   videoCss?: string;
//   controlsCss?: string;
//   progressCss?: string;
//   progressBarCss?: string;
//   timeCss?: string;
//   playCss?: string;
//   pauseCss?: string;
//   volumeCss?: string;
//   fullscreenCss?: string;
//   downloadCss?: string;
//   rewindCss?: string;
//   forwardCss?: string;
//   buttonCss?: string;
//   style?: React.CSSProperties;

//   // Volume display style
//   volumeStyle?: 'slider' | 'compact' | 'hover';

//   // Video.js specific
//   useVideoJs?: boolean;
//   videojsOptions?: any;

//   // Variant support
//   variant?: string;
// }

// // Video.js player wrapper component
// interface VideoJSPlayerProps {
//   src: string;
//   poster?: string;
//   options?: any;
//   onReady: (player: any) => void;
//   onDuration?: (duration: number) => void;
//   onEnded?: () => void;
//   onTimeUpdate?: (time: number) => void;
//   onPlay?: () => void;
//   onPause?: () => void;
//   onSeeked?: () => void;
//   onWaiting?: () => void;
//   onCanPlay?: () => void;
// }

// const VideoJSPlayer: React.FC<VideoJSPlayerProps> = React.memo(({
//   src,
//   poster,
//   options,
//   onReady,
//   onDuration,
//   onEnded,
//   onTimeUpdate,
//   onPlay,
//   onPause,
//   onSeeked,
//   onWaiting,
//   onCanPlay,
// }) => {
//   const videoRef = useRef<HTMLDivElement>(null);
//   const playerRef = useRef<any>(null);

//   useEffect(() => {
//     if (!videojs || !videoRef.current || playerRef.current) return;

//     const videoElement = document.createElement('video-js');
//     videoElement.className = 'video-js vjs-fluid';
//     videoRef.current.appendChild(videoElement);

//     const player = videojs(videoElement, {
//       controls: false,
//       autoplay: options?.autoplay || false,
//       preload: options?.preload || 'metadata',
//       fluid: true,
//       responsive: true,
//       poster,
//       sources: [{ src, type: getVideoType(src) }],
//       html5: {
//         vhs: {
//           overrideNative: true,
//           enableLowInitialPlaylist: true,
//           smoothQualityChange: true,
//         },
//         nativeAudioTracks: false,
//         nativeVideoTracks: false,
//       },
//       playbackRates: [0.5, 1, 1.5, 2],
//       ...options,
//     });

//     playerRef.current = player;

//     // Event listeners
//     const handleLoadedMetadata = () => {
//       onDuration?.(player.duration() || 0);
//     };

//     const handleTimeUpdate = () => {
//       onTimeUpdate?.(player.currentTime() || 0);
//     };

//     const handlePlay = () => {
//       onPlay?.();
//     };

//     const handlePause = () => {
//       onPause?.();
//     };

//     const handleEnded = () => {
//       onEnded?.();
//     };

//     const handleSeeked = () => {
//       onSeeked?.();
//     };

//     const handleWaiting = () => {
//       onWaiting?.();
//     };

//     const handleCanPlay = () => {
//       onCanPlay?.();
//     };

//     player.on('loadedmetadata', handleLoadedMetadata);
//     player.on('timeupdate', handleTimeUpdate);
//     player.on('play', handlePlay);
//     player.on('pause', handlePause);
//     player.on('ended', handleEnded);
//     player.on('seeked', handleSeeked);
//     player.on('waiting', handleWaiting);
//     player.on('canplay', handleCanPlay);

//     player.ready(() => {
//       onReady(player);
//     });

//     return () => {
//       player.off('loadedmetadata', handleLoadedMetadata);
//       player.off('timeupdate', handleTimeUpdate);
//       player.off('play', handlePlay);
//       player.off('pause', handlePause);
//       player.off('ended', handleEnded);
//       player.off('seeked', handleSeeked);
//       player.off('waiting', handleWaiting);
//       player.off('canplay', handleCanPlay);

//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, []);

//   // Update source when it changes
//   useEffect(() => {
//     if (playerRef.current) {
//       playerRef.current.src({ src, type: getVideoType(src) });
//     }
//   }, [src]);

//   return <div ref={videoRef} className="videojs-wrapper w-full h-full" />;
// });

// VideoJSPlayer.displayName = 'VideoJSPlayer';

// // Helper to determine video type
// const getVideoType = (src: string): string => {
//   const extension = src.split('.').pop()?.toLowerCase();
//   switch (extension) {
//     case 'm3u8':
//       return 'application/x-mpegURL';
//     case 'mpd':
//       return 'application/dash+xml';
//     case 'webm':
//       return 'video/webm';
//     case 'ogg':
//     case 'ogv':
//       return 'video/ogg';
//     default:
//       return 'video/mp4';
//   }
// };

// // Download helper function
// const downloadVideo = (url: string, filename?: string) => {
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = filename || url.split('/').pop() || 'video.mp4';
//   link.target = '_blank';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// export default function Video({
//   src,
//   poster,
//   onDuration,
//   onEnded,
//   isPause,
//   spacebarPlay,
//   className = '',
//   autoPlay,
//   showControls,
//   showPlayPause,
//   showProgress,
//   showVolume,
//   showTime,
//   showFullscreen,
//   showDownload,
//   showSeekButtons,
//   playIcon,
//   pauseIcon,
//   fullscreenIcon,
//   downloadIcon,
//   volumeIcon,
//   muteIcon,
//   rewindIcon,
//   forwardIcon,
//   hideControlsDelay,
//   loop,
//   muted,
//   seekAmount,
//   preload,
//   preloadStrategy,
//   bufferThreshold,
//   funcss = '',
//   containerCss = '',
//   videoCss = '',
//   controlsCss = '',
//   progressCss = '',
//   progressBarCss = '',
//   timeCss = '',
//   playCss = '',
//   pauseCss = '',
//   volumeCss = '',
//   fullscreenCss = '',
//   downloadCss = '',
//   rewindCss = '',
//   forwardCss = '',
//   buttonCss = '',
//   volumeStyle = 'slider',
//   useVideoJs = true,
//   videojsOptions = {},
//   style,
//   variant = '',
//   ...rest
// }: VideoProps) {
//   const { mergeWithLocal } = useComponentConfiguration('Video', variant);

//   // Create local props object
//   const localProps = {
//     src,
//     poster,
//     onDuration,
//     onEnded,
//     isPause,
//     spacebarPlay,
//     className,
//     autoPlay,
//     showControls,
//     showPlayPause,
//     showProgress,
//     showVolume,
//     showTime,
//     showFullscreen,
//     showDownload,
//     showSeekButtons,
//     playIcon,
//     pauseIcon,
//     fullscreenIcon,
//     downloadIcon,
//     volumeIcon,
//     muteIcon,
//     rewindIcon,
//     forwardIcon,
//     hideControlsDelay,
//     loop,
//     muted,
//     seekAmount,
//     preload,
//     preloadStrategy,
//     bufferThreshold,
//     funcss,
//     containerCss,
//     videoCss,
//     controlsCss,
//     progressCss,
//     progressBarCss,
//     timeCss,
//     playCss,
//     pauseCss,
//     volumeCss,
//     fullscreenCss,
//     downloadCss,
//     rewindCss,
//     forwardCss,
//     buttonCss,
//     volumeStyle,
//     useVideoJs,
//     videojsOptions,
//     style,
//     ...rest,
//   };

//   // Merge with config
//   const { props: mergedProps } = mergeWithLocal(localProps);

//   // Extract final values
//   const final = {
//     src: mergedProps.src,
//     poster: mergedProps.poster,
//     onDuration: mergedProps.onDuration,
//     onEnded: mergedProps.onEnded,
//     isPause: mergedProps.isPause,
//     spacebarPlay: mergedProps.spacebarPlay ?? true,
//     className: mergedProps.className ?? '',
//     autoPlay: mergedProps.autoPlay ?? false,
//     showControls: mergedProps.showControls ?? true,
//     showPlayPause: mergedProps.showPlayPause ?? true,
//     showProgress: mergedProps.showProgress ?? true,
//     showVolume: mergedProps.showVolume ?? true,
//     showTime: mergedProps.showTime ?? true,
//     showFullscreen: mergedProps.showFullscreen ?? true,
//     showDownload: mergedProps.showDownload ?? false,
//     showSeekButtons: mergedProps.showSeekButtons ?? false,
//     playIcon: mergedProps.playIcon,
//     pauseIcon: mergedProps.pauseIcon,
//     fullscreenIcon: mergedProps.fullscreenIcon,
//     downloadIcon: mergedProps.downloadIcon,
//     volumeIcon: mergedProps.volumeIcon,
//     muteIcon: mergedProps.muteIcon,
//     rewindIcon: mergedProps.rewindIcon,
//     forwardIcon: mergedProps.forwardIcon,
//     hideControlsDelay: mergedProps.hideControlsDelay ?? 3000,
//     loop: mergedProps.loop ?? false,
//     muted: mergedProps.muted ?? false,
//     seekAmount: mergedProps.seekAmount ?? 10,
//     preload: mergedProps.preload ?? 'metadata',
//     preloadStrategy: mergedProps.preloadStrategy ?? 'moderate',
//     bufferThreshold: mergedProps.bufferThreshold ?? 10,
//     funcss: mergedProps.funcss ?? '',
//     containerCss: mergedProps.containerCss ?? '',
//     videoCss: mergedProps.videoCss ?? '',
//     controlsCss: mergedProps.controlsCss ?? '',
//     progressCss: mergedProps.progressCss ?? '',
//     progressBarCss: mergedProps.progressBarCss ?? '',
//     timeCss: mergedProps.timeCss ?? '',
//     playCss: mergedProps.playCss ?? '',
//     pauseCss: mergedProps.pauseCss ?? '',
//     volumeCss: mergedProps.volumeCss ?? '',
//     fullscreenCss: mergedProps.fullscreenCss ?? '',
//     downloadCss: mergedProps.downloadCss ?? '',
//     rewindCss: mergedProps.rewindCss ?? '',
//     forwardCss: mergedProps.forwardCss ?? '',
//     buttonCss: mergedProps.buttonCss ?? '',
//     volumeStyle: mergedProps.volumeStyle ?? 'slider',
//     useVideoJs: mergedProps.useVideoJs ?? true,
//     videojsOptions: mergedProps.videojsOptions ?? {},
//   };

//   // Refs
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const playerRef = useRef<any>(null);
//   const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const seekTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const lastUpdateRef = useRef<number>(0);
//   const throttleDelay = 100;

//   // State
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [displayTime, setDisplayTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(final.muted ? 0 : 1);
//   const [isMuted, setIsMuted] = useState(final.muted);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [showControlsState, setShowControlsState] = useState(false);
//   const [hasStarted, setHasStarted] = useState(false);
//   const [isHoveringProgress, setIsHoveringProgress] = useState(false);
//   const [isHoveringVolume, setIsHoveringVolume] = useState(false);
//   const [showVolumeSlider, setShowVolumeSlider] = useState(false);
//   const [isBuffering, setIsBuffering] = useState(false);
//   const [isSeeking, setIsSeeking] = useState(false);

//   // Dynamic icon states
//   const [dynamicPlayIcon, setDynamicPlayIcon] = useState<ReactNode>(null);
//   const [dynamicPauseIcon, setDynamicPauseIcon] = useState<ReactNode>(null);
//   const [dynamicFullscreenIcon, setDynamicFullscreenIcon] = useState<ReactNode>(null);
//   const [dynamicDownloadIcon, setDynamicDownloadIcon] = useState<ReactNode>(null);
//   const [dynamicVolumeIcon, setDynamicVolumeIcon] = useState<ReactNode>(null);
//   const [dynamicMuteIcon, setDynamicMuteIcon] = useState<ReactNode>(null);
//   const [dynamicRewindIcon, setDynamicRewindIcon] = useState<ReactNode>(null);
//   const [dynamicForwardIcon, setDynamicForwardIcon] = useState<ReactNode>(null);

//   // Helper function to load dynamic icons
//   const loadDynamicIcon = async (iconProp: string | ReactNode | undefined, setter: (icon: ReactNode) => void, defaultIcon: ReactNode) => {
//     if (!iconProp) {
//       setter(defaultIcon);
//       return;
//     }

//     if (typeof iconProp === 'string') {
//       const iconNode = await getDynamicIcon(iconProp);
//       setter(iconNode || defaultIcon);
//     } else {
//       setter(iconProp);
//     }
//   };

//   // Load all dynamic icons
//   useEffect(() => {
//     const loadIcons = async () => {
//       await Promise.all([
//         loadDynamicIcon(final.playIcon, setDynamicPlayIcon, <PiPlay size={20} />),
//         loadDynamicIcon(final.pauseIcon, setDynamicPauseIcon, <PiPause size={20} />),
//         loadDynamicIcon(final.fullscreenIcon, setDynamicFullscreenIcon, <PiCornersOut size={18} />),
//         loadDynamicIcon(final.downloadIcon, setDynamicDownloadIcon, <TfiDownload size={16} />),
//         loadDynamicIcon(final.volumeIcon, setDynamicVolumeIcon, <PiSpeakerHigh size={18} />),
//         loadDynamicIcon(final.muteIcon, setDynamicMuteIcon, <PiSpeakerSlash size={18} />),
//         loadDynamicIcon(final.rewindIcon, setDynamicRewindIcon, <TfiControlBackward size={16} />),
//         loadDynamicIcon(final.forwardIcon, setDynamicForwardIcon, <TfiControlForward size={16} />),
//       ]);
//     };

//     loadIcons();
//   }, [
//     final.playIcon, final.pauseIcon, final.fullscreenIcon, final.downloadIcon, 
//     final.volumeIcon, final.muteIcon, final.rewindIcon, final.forwardIcon
//   ]);

//   // Video.js ready handler
//   const handleVideoReady = useCallback((player: any) => {
//     playerRef.current = player;
    
//     // Set initial state
//     player.volume(volume);
//     player.muted(isMuted);
//     player.loop(final.loop);
    
//     if (final.autoPlay) {
//       setTimeout(() => {
//         player.play().then(() => {
//           setIsPlaying(true);
//           setHasStarted(true);
//         }).catch(console.error);
//       }, 100);
//     }
//   }, [final.autoPlay, final.loop, volume, isMuted]);

//   // Video.js event handlers
//   const handleVideoJsTimeUpdate = useCallback((time: number) => {
//     const now = Date.now();
//     if (now - lastUpdateRef.current > throttleDelay) {
//       setCurrentTime(time);
//       setDisplayTime(time);
//       lastUpdateRef.current = now;
//     }
//   }, []);

//   const handleVideoJsDuration = useCallback((dur: number) => {
//     setDuration(dur);
//     final.onDuration?.(dur);
//   }, [final.onDuration]);

//   const handleVideoJsPlay = useCallback(() => {
//     setIsPlaying(true);
//     setHasStarted(true);
//   }, []);

//   const handleVideoJsPause = useCallback(() => {
//     setIsPlaying(false);
//   }, []);

//   const handleVideoJsEnded = useCallback(() => {
//     setIsPlaying(false);
//     final.onEnded?.();
//   }, [final.onEnded]);

//   const handleVideoJsSeeked = useCallback(() => {
//     setIsSeeking(false);
//   }, []);

//   // Native video handlers (fallback)
//   const handleLoadedMetadata = useCallback(() => {
//     const video = videoRef.current;
//     if (video) {
//       setDuration(video.duration || 0);
//       final.onDuration?.(video.duration);

//       if (final.autoPlay) {
//         video.muted = true;
//         video.play().then(() => {
//           setIsPlaying(true);
//           setHasStarted(true);
//         }).catch(console.error);
//       }
//     }
//   }, [final.onDuration, final.autoPlay]);

//   const handleTimeUpdate = useCallback(() => {
//     const now = Date.now();
//     if (now - lastUpdateRef.current > throttleDelay) {
//       const video = videoRef.current;
//       if (video && !isSeeking) {
//         setCurrentTime(video.currentTime);
//         setDisplayTime(video.currentTime);
//         lastUpdateRef.current = now;
//       }
//     }
//   }, [isSeeking]);

//   const handleWaiting = useCallback(() => setIsBuffering(true), []);
//   const handleCanPlay = useCallback(() => setIsBuffering(false), []);
//   const handlePlaying = useCallback(() => setIsBuffering(false), []);
//   const handleSeeked = useCallback(() => setIsSeeking(false), []);

//   const handleVideoEnd = useCallback(() => {
//     setIsPlaying(false);
//     final.onEnded?.();
//     if (final.loop) {
//       if (final.useVideoJs && playerRef.current) {
//         playerRef.current.currentTime(0);
//         playVideo();
//       } else if (videoRef.current) {
//         videoRef.current.currentTime = 0;
//         playVideo();
//       }
//     }
//   }, [final.loop, final.onEnded, final.useVideoJs]);

//   // Play/Pause functionality
//   const playVideo = useCallback(() => {
//     if (final.useVideoJs && playerRef.current) {
//       playerRef.current.play().then(() => {
//         setIsPlaying(true);
//         setHasStarted(true);
//       }).catch(console.error);
//     } else if (videoRef.current) {
//       if (videoRef.current.currentTime === videoRef.current.duration) {
//         videoRef.current.currentTime = 0;
//       }
//       videoRef.current.play().then(() => {
//         setIsPlaying(true);
//         setHasStarted(true);
//       }).catch(console.error);
//     }
//   }, [final.useVideoJs]);

//   const pauseVideo = useCallback(() => {
//     if (final.useVideoJs && playerRef.current) {
//       playerRef.current.pause();
//       setIsPlaying(false);
//     } else if (videoRef.current && !videoRef.current.paused) {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     }
//   }, [final.useVideoJs]);

//   const handlePlayPauseToggle = useCallback(() => {
//     isPlaying ? pauseVideo() : playVideo();
//   }, [isPlaying, pauseVideo, playVideo]);

//   // Click handlers for different video areas
//   const handleVideoClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
//     const container = containerRef.current;
//     if (!container) return;

//     const rect = container.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const width = rect.width;
    
//     const leftArea = width * 0.3;
//     const rightArea = width * 0.7;

//     if (clickX < leftArea) {
//       handleSeek(-final.seekAmount);
//     } else if (clickX > rightArea) {
//       handleSeek(final.seekAmount);
//     } else {
//       handlePlayPauseToggle();
//     }
//   }, [final.seekAmount, handlePlayPauseToggle]);

//   // Seek functionality
//   const handleSeek = useCallback((seconds: number) => {
//     if (final.useVideoJs && playerRef.current) {
//       const newTime = Math.max(0, Math.min(playerRef.current.currentTime() + seconds, duration));
//       setIsSeeking(true);
//       playerRef.current.currentTime(newTime);
//       setCurrentTime(newTime);
//       setDisplayTime(newTime);
      
//       if (seekTimerRef.current) {
//         clearTimeout(seekTimerRef.current);
//       }
//       seekTimerRef.current = setTimeout(() => {
//         setIsSeeking(false);
//       }, 100);
//     } else if (videoRef.current) {
//       const newTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
//       setIsSeeking(true);
//       videoRef.current.currentTime = newTime;
//       setCurrentTime(newTime);
//       setDisplayTime(newTime);
      
//       if (seekTimerRef.current) {
//         clearTimeout(seekTimerRef.current);
//       }
//       seekTimerRef.current = setTimeout(() => {
//         setIsSeeking(false);
//       }, 100);
//     }
//   }, [duration, final.useVideoJs]);

//   const handleRewind = useCallback(() => handleSeek(-final.seekAmount), [handleSeek, final.seekAmount]);
//   const handleForward = useCallback(() => handleSeek(final.seekAmount), [handleSeek, final.seekAmount]);

//   // Fullscreen functionality
//   const handleToggleFullScreen = useCallback(() => {
//     const element = containerRef.current;
//     if (!element) return;
    
//     if (!document.fullscreenElement) {
//       element.requestFullscreen?.();
//     } else {
//       document.exitFullscreen?.();
//     }
//   }, []);

//   // Download functionality
//   const handleDownload = useCallback(() => {
//     downloadVideo(final.src);
//   }, [final.src]);

//   // Volume functionality
//   const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     setIsMuted(newVolume === 0);
    
//     if (final.useVideoJs && playerRef.current) {
//       playerRef.current.volume(newVolume);
//       playerRef.current.muted(newVolume === 0);
//     } else if (videoRef.current) {
//       videoRef.current.volume = newVolume;
//       videoRef.current.muted = newVolume === 0;
//     }
//   }, [final.useVideoJs]);

//   const handleToggleMute = useCallback(() => {
//     const newMuted = !isMuted;
//     setIsMuted(newMuted);
    
//     if (final.useVideoJs && playerRef.current) {
//       playerRef.current.muted(newMuted);
//       if (!newMuted) {
//         const newVolume = 1;
//         setVolume(newVolume);
//         playerRef.current.volume(newVolume);
//       } else {
//         setVolume(0);
//       }
//     } else if (videoRef.current) {
//       videoRef.current.muted = newMuted;
//       if (!newMuted) {
//         videoRef.current.volume = 1;
//         setVolume(1);
//       } else {
//         setVolume(0);
//       }
//     }
//   }, [isMuted, final.useVideoJs]);

//   // Progress functionality
//   const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTime = parseFloat(e.target.value);
//     setCurrentTime(newTime);
//     setDisplayTime(newTime);
    
//     if (final.useVideoJs && playerRef.current) {
//       setIsSeeking(true);
//       playerRef.current.currentTime(newTime);
      
//       if (seekTimerRef.current) {
//         clearTimeout(seekTimerRef.current);
//       }
//       seekTimerRef.current = setTimeout(() => {
//         setIsSeeking(false);
//       }, 100);
//     } else if (videoRef.current) {
//       setIsSeeking(true);
//       videoRef.current.currentTime = newTime;
      
//       if (seekTimerRef.current) {
//         clearTimeout(seekTimerRef.current);
//       }
//       seekTimerRef.current = setTimeout(() => {
//         setIsSeeking(false);
//       }, 100);
//     }
//   }, [final.useVideoJs]);

//   // Effects
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => 
//       handleKeyDown(e, isPlaying, playVideo, pauseVideo, final.spacebarPlay);
//     document.addEventListener('keydown', handleKey);
//     return () => document.removeEventListener('keydown', handleKey);
//   }, [isPlaying, playVideo, pauseVideo, final.spacebarPlay]);

//   useEffect(() => {
//     if (final.isPause) pauseVideo();
//   }, [final.isPause, pauseVideo]);

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullScreen(!!document.fullscreenElement);
//     };
//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
//   }, []);

//   // Controls visibility with hover
//   useEffect(() => {
//     let timer: NodeJS.Timeout;
    
//     const show = () => {
//       setShowControlsState(true);
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         setShowControlsState(false);
//         setShowVolumeSlider(false);
//       }, final.hideControlsDelay);
//     };

//     const hide = () => {
//       setShowControlsState(false);
//       setShowVolumeSlider(false);
//     };

//     const container = containerRef.current;
//     if (container && final.showControls) {
//       container.addEventListener('mouseenter', show);
//       container.addEventListener('mouseleave', hide);
//       container.addEventListener('mousemove', show);
//     }

//     return () => {
//       if (container) {
//         container.removeEventListener('mouseenter', show);
//         container.removeEventListener('mouseleave', hide);
//         container.removeEventListener('mousemove', show);
//       }
//       clearTimeout(timer);
//     };
//   }, [final.showControls, final.hideControlsDelay]);

//   // Clean up timers
//   useEffect(() => {
//     return () => {
//       if (hideControlsTimerRef.current) {
//         clearTimeout(hideControlsTimerRef.current);
//       }
//       if (seekTimerRef.current) {
//         clearTimeout(seekTimerRef.current);
//       }
//     };
//   }, []);

//   // Helper function to render icon
//   const renderIcon = useCallback((icon: ReactNode, defaultSize: number = 16) => {
//     if (!icon) return null;
    
//     if (React.isValidElement(icon)) {
//       return React.cloneElement(icon, { 
//         size: (icon.props as any).size || defaultSize 
//       } as any);
//     }
    
//     return icon;
//   }, []);

//   // Get volume icon based on volume level
//   const getVolumeIcon = useCallback(() => {
//     if (isMuted || volume === 0) {
//       return renderIcon(dynamicMuteIcon, 18);
//     } else if (volume < 0.5) {
//       return <PiSpeakerNone size={18} />;
//     } else {
//       return renderIcon(dynamicVolumeIcon, 18);
//     }
//   }, [isMuted, volume, renderIcon, dynamicMuteIcon, dynamicVolumeIcon]);

//   // Progress Bar Component
//   const ProgressBar = () => (
//     <div className="progress-container">
//       <div className="progress-wrapper">
//         <input
//           type="range"
//           min={0}
//           max={duration}
//           value={currentTime}
//           onChange={handleProgressChange}
//           className={`video-progress ${final.progressCss}`}
//           style={{
//             '--progress-percent': `${(displayTime / duration) * 100}%`,
//           } as React.CSSProperties}
//           onMouseEnter={() => setIsHoveringProgress(true)}
//           onMouseLeave={() => setIsHoveringProgress(false)}
//         />
//       </div>
//     </div>
//   );

//   // Volume Control Component with different styles
//   const VolumeControl = () => {
//     if (final.volumeStyle === 'hover') {
//       return (
//         <div className="volume-control-wrapper relative">
//           <ToolTip tip="top" message={isMuted ? "Unmute" : "Mute"}>
//             <div 
//               onClick={handleToggleMute}
//               onMouseEnter={() => setShowVolumeSlider(true)}
//               className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
              
//             >
//               {getVolumeIcon()}
//             </div>
//           </ToolTip>
          
//           {showVolumeSlider && (
//             <div 
//               className="volume-slider-wrapper absolute bottom-full left-0 mb-2 p-2 bg-black bg-opacity-80 rounded-lg backdrop-blur-sm"
//               onMouseEnter={() => setShowVolumeSlider(true)}
//               onMouseLeave={() => setShowVolumeSlider(false)}
//             >
//               <input
//                 type="range"
//                 min={0}
//                 max={1}
//                 step={0.01}
//                 value={volume}
//                 onChange={handleVolumeChange}
//                 className="volume-slider vertical"
//                 style={{
//                   '--volume-percent': `${volume * 100}%`,
//                 } as React.CSSProperties}
//               />
//             </div>
//           )}
//         </div>
//       );
//     }

//     if (final.volumeStyle === 'compact') {
//       return (
//         <div className="volume-control-wrapper">
//           <ToolTip tip="top" message={isMuted ? "Unmute" : "Mute"}>
//             <div 
//               onClick={handleToggleMute}
//               className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
//             >
//               {getVolumeIcon()}
//             </div>
//           </ToolTip>
//         </div>
//       );
//     }

//     // Default slider style
//     return (
//       <div className="volume-control-wrapper">
//         <ToolTip tip="top" message={isMuted ? "Unmute" : "Mute"}>
//           <div 
//             onClick={handleToggleMute}
//             className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
//           >
//             {getVolumeIcon()}
//           </div>
//         </ToolTip>
        
//         <div className="volume-slider-wrapper">
//           <input
//             type="range"
//             min={0}
//             max={1}
//             step={0.01}
//             value={volume}
//             onChange={handleVolumeChange}
//             className="volume-slider"
//             style={{
//               '--volume-percent': `${volume * 100}%`,
//             } as React.CSSProperties}
//           />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div 
//       ref={containerRef}
//       className={`video_container fit ${final.funcss} ${final.containerCss} ${final.className}`}
//       style={{ 
//         contain: 'content',
//         willChange: 'transform',
//         ...style 
//       }}
//       onClick={handleVideoClick}
//     >
//       {/* Poster */}
//       {final.poster && !hasStarted && !isPlaying && (
//         <div
//           style={{ backgroundImage: `url(${final.poster})` }}
//           className="video_poster"
//         />
//       )}

//       {/* Video.js Player or Native Video */}
//       {final.useVideoJs ? (
//         <VideoJSPlayer
//           src={final.src}
//           poster={final.poster}
//           options={{
//             autoplay: final.autoPlay,
//             loop: final.loop,
//             muted: final.muted,
//             preload: final.preload,
//             ...final.videojsOptions,
//           }}
//           onReady={handleVideoReady}
//           onDuration={handleVideoJsDuration}
//           onEnded={handleVideoJsEnded}
//           onTimeUpdate={handleVideoJsTimeUpdate}
//           onPlay={handleVideoJsPlay}
//           onPause={handleVideoJsPause}
//           onSeeked={handleVideoJsSeeked}
//           onWaiting={() => setIsBuffering(true)}
//           onCanPlay={() => setIsBuffering(false)}
//         />
//       ) : (
//         <video
//           ref={videoRef}
//           preload={final.preload}
//           autoPlay={final.autoPlay}
//           style={{
//             transform: 'translateZ(0)',
//             backfaceVisibility: 'hidden',
//             ...style
//           }}
//           src={final.src}
//           className={`video_player fit min-w-200 ${final.videoCss} gpu-accelerated`}
//           onLoadedMetadata={handleLoadedMetadata}
//           onTimeUpdate={handleTimeUpdate}
//           onWaiting={handleWaiting}
//           onCanPlay={handleCanPlay}
//           onPlaying={handlePlaying}
//           onSeeked={handleSeeked}
//           onEnded={handleVideoEnd}
//           playsInline
//           controls={false}
//           loop={final.loop}
//           muted={final.muted}
//           crossOrigin="anonymous"
//         />
//       )}

//       {/* Buffering Indicator */}
//       {isBuffering && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
//           <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//         </div>
//       )}

//       {/* Controls Overlay */}
//       {final.showControls && (
//         <div 
//           className={`video_controls ${final.controlsCss} ${
//             showControlsState ? 'show_controls' : 'hide_controls'
//           }`}
//         >
//           {/* Bottom Controls Row */}
//           <RowFlex 
//             gap={1} 
//             justify="space-between" 
//             alignItems="center"
//             className="controls-row"
//           >
//             {/* Left Controls */}
//             <RowFlex gap={0.5} alignItems="center" funcss='videoLeftContainer'>
//               {/* Play/Pause */}
//               {final.showPlayPause && (
//                 <ToolTip tip="top" message={isPlaying ? "Pause" : "Play"}>
//                   <div 
//                     onClick={handlePlayPauseToggle}
//                     className={`${final.buttonCss} ${isPlaying ? final.pauseCss : final.playCss} pointer`}
//                   >
//                     {isPlaying 
//                       ? renderIcon(dynamicPauseIcon, 20)
//                       : renderIcon(dynamicPlayIcon, 20)
//                     }
//                   </div>
//                 </ToolTip>
//               )}

//               {/* Seek Buttons */}
//               {final.showSeekButtons && (
//                 <>
//                   <ToolTip tip="top" message={`${final.seekAmount}s Back`}>
//                     <div
//                       onClick={handleRewind}
//                       className={`${final.buttonCss} ${final.rewindCss} pointer`}
//                     >
//                       {renderIcon(dynamicRewindIcon, 16)}
//                     </div>
//                   </ToolTip>

//                   <ToolTip tip="top" message={`${final.seekAmount}s Forward`}>
//                     <div 
//                       onClick={handleForward}
//                       className={`${final.buttonCss} ${final.forwardCss} pointer`}
//                     >
//                       {renderIcon(dynamicForwardIcon, 16)}
//                     </div>
//                   </ToolTip>
//                 </>
//               )}

//               {/* Volume Control */}
//               {final.showVolume && <VolumeControl />}

//               {/* Time Display */}
//               {final.showTime && (
//                 <div className={`video_time ${final.timeCss}`}>
//                   <Text 
//                     text={`${formatTime(displayTime)} / ${formatTime(duration)}`} 
//                     size="xs" 
//                   />
//                 </div>
//               )}
//             </RowFlex>
//             <div className="col w-full ">
//               <div className='videoProgressContainer'>
//                 {final.showProgress && <ProgressBar />}
//               </div>
//             </div>

//             {/* Right Controls */}
//             <RowFlex gap={0.3} funcss='videoRightContainer'>
//               {/* Fullscreen */}
//               {final.showFullscreen && (
//                 <ToolTip tip="top" message="Fullscreen">
//                   <div 
//                     onClick={handleToggleFullScreen}
//                     className={`${final.buttonCss} ${final.fullscreenCss} pointer`}
//                   >
//                     {renderIcon(dynamicFullscreenIcon, 18)}
//                   </div>
//                 </ToolTip>
//               )}

//               {/* Download */}
//               {final.showDownload && (
//                 <ToolTip tip="top" message="Download">
//                   <div 
//                     onClick={handleDownload}
//                     className={`${final.buttonCss} ${final.downloadCss} pointer`}
//                   >
//                     {renderIcon(dynamicDownloadIcon, 16)}
//                   </div>
//                 </ToolTip>
//               )}
//             </RowFlex>
//           </RowFlex>
//         </div>
//       )}

//       {/* Big Play Button */}
//       {!hasStarted && final.showControls && (
//         <div 
//           onClick={handlePlayPauseToggle}
//           className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 group cursor-pointer"
//         >
//           <Circle 
//           size={3}
//           >
//             <PiPlay size={32} className="text-white ml-1" />
//           </Circle>
//         </div>
//       )}
//     </div>
//   );
// }



// // 'use client';
// // import React, { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
// // import { 
// //   PiCornersOut, PiPlay, PiPause, PiSpeakerHigh, PiSpeakerSlash, PiSpeakerNone
// // } from 'react-icons/pi';
// // import { TfiControlBackward, TfiControlForward, TfiDownload } from "react-icons/tfi";
// // import Text from '../text/Text';
// // import RowFlex from '../specials/RowFlex';
// // import ToolTip from '../tooltip/ToolTip';
// // import Circle from '../specials/Circle';
// // import { formatTime } from './videoFunctions';

// // // Import Video.js
// // import videojs from 'video.js';
// // import 'video.js/dist/video-js.css';

// // // Type declarations for Video.js
// // declare global {
// //   interface Window {
// //     videojs: typeof videojs;
// //   }
// // }

// // // Custom handleKeyDown function
// // const handleKeyDown = (e: KeyboardEvent, isPlaying: boolean, playVideo: () => void, pauseVideo: () => void, spacebarPlay: boolean = true) => {
// //   const target = e.target as HTMLElement;
// //   const isInput = target.tagName === 'INPUT' || 
// //                   target.tagName === 'TEXTAREA' || 
// //                   target.isContentEditable;
  
// //   if (e.code === 'Space' && isInput) {
// //     return;
// //   }
  
// //   if (spacebarPlay && e.code === 'Space') {
// //     e.preventDefault();
// //     isPlaying ? pauseVideo() : playVideo();
// //   }
// // };

// // // Configuration hook
// // const useComponentConfiguration = (componentName: string, variant: string = '') => {
// //   const getComponentConfig = () => {
// //     const baseConfig = {
// //       Video: {
// //         default: {
// //           showControls: true,
// //           showPlayPause: true,
// //           showProgress: true,
// //           showVolume: true,
// //           showTime: true,
// //           showFullscreen: true,
// //           showDownload: false,
// //           showSeekButtons: false,
// //           spacebarPlay: true,
// //           autoPlay: false,
// //           loop: false,
// //           muted: false,
// //           seekAmount: 10,
// //           hideControlsDelay: 3000,
// //           preload: 'metadata',
// //           preloadStrategy: 'moderate',
// //           bufferThreshold: 10,
// //           funcss: '',
// //           containerCss: '',
// //           videoCss: '',
// //           controlsCss: '',
// //           progressCss: '',
// //           progressBarCss: '',
// //           timeCss: '',
// //           playCss: '',
// //           pauseCss: '',
// //           volumeCss: '',
// //           fullscreenCss: '',
// //           downloadCss: '',
// //           rewindCss: '',
// //           forwardCss: '',
// //           buttonCss: '',
// //           volumeStyle: 'slider',
// //           useVideoJs: true,
// //         },
// //         minimal: {
// //           showControls: true,
// //           showPlayPause: true,
// //           showProgress: true,
// //           showVolume: false,
// //           showTime: true,
// //           showFullscreen: true,
// //           showDownload: false,
// //           showSeekButtons: false,
// //           controlsCss: 'minimal-controls',
// //           buttonCss: 'minimal-btn',
// //           volumeStyle: 'hover',
// //           useVideoJs: true,
// //         },
// //         embedded: {
// //           showControls: false,
// //           autoPlay: true,
// //           muted: true,
// //           loop: true,
// //           containerCss: 'embedded-video',
// //           useVideoJs: true,
// //         },
// //         fullFeatured: {
// //           showControls: true,
// //           showPlayPause: true,
// //           showProgress: true,
// //           showVolume: true,
// //           showTime: true,
// //           showFullscreen: true,
// //           showDownload: true,
// //           showSeekButtons: true,
// //           controlsCss: 'full-featured-controls',
// //           buttonCss: 'featured-btn',
// //           volumeStyle: 'slider',
// //           useVideoJs: true,
// //         },
// //         theater: {
// //           showControls: true,
// //           containerCss: 'theater-mode',
// //           videoCss: 'theater-video',
// //           controlsCss: 'theater-controls',
// //           fullscreenCss: 'theater-fullscreen',
// //           volumeStyle: 'slider',
// //           useVideoJs: true,
// //         },
// //         youtube: {
// //           showControls: true,
// //           showPlayPause: true,
// //           showProgress: true,
// //           showVolume: true,
// //           showTime: true,
// //           showFullscreen: true,
// //           showDownload: false,
// //           showSeekButtons: false,
// //           controlsCss: 'youtube-controls',
// //           buttonCss: 'youtube-btn',
// //           volumeStyle: 'hover',
// //           hideControlsDelay: 2000,
// //           useVideoJs: true,
// //         },
// //         optimized: {
// //           preloadStrategy: 'aggressive',
// //           bufferThreshold: 15,
// //           videoCss: 'gpu-accelerated',
// //           useVideoJs: true,
// //         }
// //       }
// //     };

// //     return baseConfig[componentName as keyof typeof baseConfig] || {};
// //   };

// //   const mergeWithLocal = (localProps: any) => {
// //     const config = getComponentConfig();
// //     const variantConfig = variant && config[variant as keyof typeof config] ? config[variant as keyof typeof config] : {};
// //     const defaultConfig = config.default || {};
    
// //     const mergedProps = {
// //       ...defaultConfig,
// //       ...variantConfig,
// //       ...localProps,
// //     };

// //     return {
// //       props: mergedProps,
// //       variantConfig,
// //       defaultConfig,
// //     };
// //   };

// //   return {
// //     mergeWithLocal,
// //     getComponentConfig,
// //   };
// // };

// // interface VideoProps {
// //   src: string;
// //   poster?: string;
// //   onDuration?: (duration: number) => void;
// //   onEnded?: () => void;
// //   isPause?: boolean;
// //   spacebarPlay?: boolean;
// //   className?: string;
// //   autoPlay?: boolean;
  
// //   // Controls visibility
// //   showControls?: boolean;
// //   showPlayPause?: boolean;
// //   showProgress?: boolean;
// //   showVolume?: boolean;
// //   showTime?: boolean;
// //   showFullscreen?: boolean;
// //   showDownload?: boolean;
// //   showSeekButtons?: boolean;
  
// //   // Custom icons
// //   playIcon?: string | ReactNode;
// //   pauseIcon?: string | ReactNode;
// //   fullscreenIcon?: string | ReactNode;
// //   downloadIcon?: string | ReactNode;
// //   volumeIcon?: string | ReactNode;
// //   muteIcon?: string | ReactNode;
// //   rewindIcon?: string | ReactNode;
// //   forwardIcon?: string | ReactNode;
  
// //   // Behavior
// //   hideControlsDelay?: number;
// //   loop?: boolean;
// //   muted?: boolean;
// //   seekAmount?: number;
// //   preload?: 'none' | 'metadata' | 'auto';
// //   preloadStrategy?: 'conservative' | 'moderate' | 'aggressive';
// //   bufferThreshold?: number;
  
// //   // Custom CSS classes
// //   funcss?: string;
// //   containerCss?: string;
// //   videoCss?: string;
// //   controlsCss?: string;
// //   progressCss?: string;
// //   progressBarCss?: string;
// //   timeCss?: string;
// //   playCss?: string;
// //   pauseCss?: string;
// //   volumeCss?: string;
// //   fullscreenCss?: string;
// //   downloadCss?: string;
// //   rewindCss?: string;
// //   forwardCss?: string;
// //   buttonCss?: string;
// //   style?: React.CSSProperties;

// //   // Volume display style
// //   volumeStyle?: 'slider' | 'compact' | 'hover';

// //   // Video.js specific
// //   useVideoJs?: boolean;

// //   // Variant support
// //   variant?: string;
// // }

// // // Download helper function
// // const downloadVideo = (url: string, filename?: string) => {
// //   const link = document.createElement('a');
// //   link.href = url;
// //   link.download = filename || url.split('/').pop() || 'video.mp4';
// //   link.target = '_blank';
// //   document.body.appendChild(link);
// //   link.click();
// //   document.body.removeChild(link);
// // };

// // // Video.js player wrapper
// // interface VideoJSPlayerProps {
// //   src: string;
// //   poster?: string;
// //   options?: any;
// //   onReady: (player: any) => void;
// //   onDuration?: (duration: number) => void;
// //   onEnded?: () => void;
// //   onTimeUpdate?: (currentTime: number) => void;
// //   onPlay?: () => void;
// //   onPause?: () => void;
// //   onSeeked?: () => void;
// //   onWaiting?: () => void;
// //   onCanPlay?: () => void;
// // }

// // const VideoJSPlayer: React.FC<VideoJSPlayerProps> = React.memo(({
// //   src,
// //   poster,
// //   options,
// //   onReady,
// //   onDuration,
// //   onEnded,
// //   onTimeUpdate,
// //   onPlay,
// //   onPause,
// //   onSeeked,
// //   onWaiting,
// //   onCanPlay,
// // }) => {
// //   const videoRef = useRef<HTMLDivElement>(null);
// //   const playerRef = useRef<any>(null);

// //   useEffect(() => {
// //     if (!videojs || !videoRef.current || playerRef.current) return;

// //     const videoElement = document.createElement('video-js');
// //     videoElement.className = 'video-js vjs-big-play-centered';
    
// //     videoRef.current.appendChild(videoElement);

// //     const player = videojs(videoElement, {
// //       controls: false,
// //       autoplay: options?.autoplay || false,
// //       preload: options?.preload || 'metadata',
// //       fluid: true,
// //       responsive: true,
// //       poster,
// //       sources: [{ src, type: getVideoType(src) }],
// //       html5: {
// //         vhs: {
// //           overrideNative: true,
// //           enableLowInitialPlaylist: true,
// //           smoothQualityChange: true,
// //         },
// //       },
// //       playbackRates: [0.5, 1, 1.5, 2],
// //       ...options,
// //     });

// //     playerRef.current = player;

// //     // Set up event listeners
// //     const handleLoadedMetadata = () => {
// //       onDuration?.(player.duration() || 0);
// //     };

// //     const handleTimeUpdate = () => {
// //       onTimeUpdate?.(player.currentTime() || 0);
// //     };

// //     const handlePlay = () => {
// //       onPlay?.();
// //     };

// //     const handlePause = () => {
// //       onPause?.();
// //     };

// //     const handleEnded = () => {
// //       onEnded?.();
// //     };

// //     const handleSeeked = () => {
// //       onSeeked?.();
// //     };

// //     const handleWaiting = () => {
// //       onWaiting?.();
// //     };

// //     const handleCanPlay = () => {
// //       onCanPlay?.();
// //     };

// //     player.on('loadedmetadata', handleLoadedMetadata);
// //     player.on('timeupdate', handleTimeUpdate);
// //     player.on('play', handlePlay);
// //     player.on('pause', handlePause);
// //     player.on('ended', handleEnded);
// //     player.on('seeked', handleSeeked);
// //     player.on('waiting', handleWaiting);
// //     player.on('canplay', handleCanPlay);

// //     player.ready(() => {
// //       onReady(player);
// //     });

// //     return () => {
// //       player.off('loadedmetadata', handleLoadedMetadata);
// //       player.off('timeupdate', handleTimeUpdate);
// //       player.off('play', handlePlay);
// //       player.off('pause', handlePause);
// //       player.off('ended', handleEnded);
// //       player.off('seeked', handleSeeked);
// //       player.off('waiting', handleWaiting);
// //       player.off('canplay', handleCanPlay);

// //       if (playerRef.current) {
// //         playerRef.current.dispose();
// //         playerRef.current = null;
// //       }
// //     };
// //   }, []);

// //   // Update source when it changes
// //   useEffect(() => {
// //     if (playerRef.current) {
// //       playerRef.current.src({ src, type: getVideoType(src) });
// //     }
// //   }, [src]);

// //   return <div ref={videoRef} className="videojs-wrapper w-full h-full" />;
// // });

// // VideoJSPlayer.displayName = 'VideoJSPlayer';

// // // Helper to determine video type
// // const getVideoType = (src: string): string => {
// //   const extension = src.split('.').pop()?.toLowerCase();
// //   switch (extension) {
// //     case 'm3u8':
// //       return 'application/x-mpegURL';
// //     case 'mpd':
// //       return 'application/dash+xml';
// //     case 'webm':
// //       return 'video/webm';
// //     case 'ogg':
// //     case 'ogv':
// //       return 'video/ogg';
// //     default:
// //       return 'video/mp4';
// //   }
// // };

// // export default function Video({
// //   src,
// //   poster,
// //   onDuration,
// //   onEnded,
// //   isPause,
// //   spacebarPlay,
// //   className = '',
// //   autoPlay,
// //   showControls,
// //   showPlayPause,
// //   showProgress,
// //   showVolume,
// //   showTime,
// //   showFullscreen,
// //   showDownload,
// //   showSeekButtons,
// //   playIcon,
// //   pauseIcon,
// //   fullscreenIcon,
// //   downloadIcon,
// //   volumeIcon,
// //   muteIcon,
// //   rewindIcon,
// //   forwardIcon,
// //   hideControlsDelay,
// //   loop,
// //   muted,
// //   seekAmount,
// //   preload,
// //   preloadStrategy,
// //   bufferThreshold,
// //   funcss = '',
// //   containerCss = '',
// //   videoCss = '',
// //   controlsCss = '',
// //   progressCss = '',
// //   progressBarCss = '',
// //   timeCss = '',
// //   playCss = '',
// //   pauseCss = '',
// //   volumeCss = '',
// //   fullscreenCss = '',
// //   downloadCss = '',
// //   rewindCss = '',
// //   forwardCss = '',
// //   buttonCss = '',
// //   volumeStyle = 'slider',
// //   useVideoJs = true,
// //   style,
// //   variant = '',
// //   ...rest
// // }: VideoProps) {
// //   const { mergeWithLocal } = useComponentConfiguration('Video', variant);

// //   // Create local props object
// //   const localProps = {
// //     src,
// //     poster,
// //     onDuration,
// //     onEnded,
// //     isPause,
// //     spacebarPlay,
// //     className,
// //     autoPlay,
// //     showControls,
// //     showPlayPause,
// //     showProgress,
// //     showVolume,
// //     showTime,
// //     showFullscreen,
// //     showDownload,
// //     showSeekButtons,
// //     playIcon,
// //     pauseIcon,
// //     fullscreenIcon,
// //     downloadIcon,
// //     volumeIcon,
// //     muteIcon,
// //     rewindIcon,
// //     forwardIcon,
// //     hideControlsDelay,
// //     loop,
// //     muted,
// //     seekAmount,
// //     preload,
// //     preloadStrategy,
// //     bufferThreshold,
// //     funcss,
// //     containerCss,
// //     videoCss,
// //     controlsCss,
// //     progressCss,
// //     progressBarCss,
// //     timeCss,
// //     playCss,
// //     pauseCss,
// //     volumeCss,
// //     fullscreenCss,
// //     downloadCss,
// //     rewindCss,
// //     forwardCss,
// //     buttonCss,
// //     volumeStyle,
// //     useVideoJs,
// //     style,
// //     ...rest,
// //   };

// //   // Merge with config
// //   const { props: mergedProps } = mergeWithLocal(localProps);

// //   // Extract final values
// //   const final = {
// //     src: mergedProps.src,
// //     poster: mergedProps.poster,
// //     onDuration: mergedProps.onDuration,
// //     onEnded: mergedProps.onEnded,
// //     isPause: mergedProps.isPause,
// //     spacebarPlay: mergedProps.spacebarPlay ?? true,
// //     className: mergedProps.className ?? '',
// //     autoPlay: mergedProps.autoPlay ?? false,
// //     showControls: mergedProps.showControls ?? true,
// //     showPlayPause: mergedProps.showPlayPause ?? true,
// //     showProgress: mergedProps.showProgress ?? true,
// //     showVolume: mergedProps.showVolume ?? true,
// //     showTime: mergedProps.showTime ?? true,
// //     showFullscreen: mergedProps.showFullscreen ?? true,
// //     showDownload: mergedProps.showDownload ?? false,
// //     showSeekButtons: mergedProps.showSeekButtons ?? false,
// //     playIcon: mergedProps.playIcon,
// //     pauseIcon: mergedProps.pauseIcon,
// //     fullscreenIcon: mergedProps.fullscreenIcon,
// //     downloadIcon: mergedProps.downloadIcon,
// //     volumeIcon: mergedProps.volumeIcon,
// //     muteIcon: mergedProps.muteIcon,
// //     rewindIcon: mergedProps.rewindIcon,
// //     forwardIcon: mergedProps.forwardIcon,
// //     hideControlsDelay: mergedProps.hideControlsDelay ?? 3000,
// //     loop: mergedProps.loop ?? false,
// //     muted: mergedProps.muted ?? false,
// //     seekAmount: mergedProps.seekAmount ?? 10,
// //     preload: mergedProps.preload ?? 'metadata',
// //     preloadStrategy: mergedProps.preloadStrategy ?? 'moderate',
// //     bufferThreshold: mergedProps.bufferThreshold ?? 10,
// //     funcss: mergedProps.funcss ?? '',
// //     containerCss: mergedProps.containerCss ?? '',
// //     videoCss: mergedProps.videoCss ?? '',
// //     controlsCss: mergedProps.controlsCss ?? '',
// //     progressCss: mergedProps.progressCss ?? '',
// //     progressBarCss: mergedProps.progressBarCss ?? '',
// //     timeCss: mergedProps.timeCss ?? '',
// //     playCss: mergedProps.playCss ?? '',
// //     pauseCss: mergedProps.pauseCss ?? '',
// //     volumeCss: mergedProps.volumeCss ?? '',
// //     fullscreenCss: mergedProps.fullscreenCss ?? '',
// //     downloadCss: mergedProps.downloadCss ?? '',
// //     rewindCss: mergedProps.rewindCss ?? '',
// //     forwardCss: mergedProps.forwardCss ?? '',
// //     buttonCss: mergedProps.buttonCss ?? '',
// //     volumeStyle: mergedProps.volumeStyle ?? 'slider',
// //     useVideoJs: mergedProps.useVideoJs ?? true,
// //   };

// //   // Refs
// //   const videoRef = useRef<HTMLVideoElement | null>(null);
// //   const containerRef = useRef<HTMLDivElement | null>(null);
// //   const playerRef = useRef<any>(null);
// //   const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);
// //   const seekTimerRef = useRef<NodeJS.Timeout | null>(null);

// //   // State
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [currentTime, setCurrentTime] = useState(0);
// //   const [displayTime, setDisplayTime] = useState(0);
// //   const [duration, setDuration] = useState(0);
// //   const [volume, setVolume] = useState(final.muted ? 0 : 1);
// //   const [isMuted, setIsMuted] = useState(final.muted);
// //   const [isFullScreen, setIsFullScreen] = useState(false);
// //   const [showControlsState, setShowControlsState] = useState(false);
// //   const [hasStarted, setHasStarted] = useState(false);
// //   const [showVolumeSlider, setShowVolumeSlider] = useState(false);
// //   const [isBuffering, setIsBuffering] = useState(false);
// //   const [isSeeking, setIsSeeking] = useState(false);

// //   // Video.js ready handler
// //   const handleVideoReady = useCallback((player: any) => {
// //     playerRef.current = player;
    
// //     // Set initial state
// //     player.volume(volume);
// //     player.muted(isMuted);
    
// //     // Set loop if specified
// //     player.loop(final.loop);
    
// //     if (final.autoPlay) {
// //       setTimeout(() => {
// //         player.play().then(() => {
// //           setIsPlaying(true);
// //           setHasStarted(true);
// //         }).catch(console.error);
// //       }, 100);
// //     }
// //   }, [final.autoPlay, final.loop, volume, isMuted]);

// //   // Play/Pause functionality
// //   const playVideo = useCallback(() => {
// //     if (final.useVideoJs && playerRef.current) {
// //       playerRef.current.play().then(() => {
// //         setIsPlaying(true);
// //         setHasStarted(true);
// //       }).catch(console.error);
// //     } else if (videoRef.current) {
// //       if (videoRef.current.currentTime === videoRef.current.duration) {
// //         videoRef.current.currentTime = 0;
// //       }
// //       videoRef.current.play().then(() => {
// //         setIsPlaying(true);
// //         setHasStarted(true);
// //       }).catch(console.error);
// //     }
// //   }, [final.useVideoJs]);

// //   const pauseVideo = useCallback(() => {
// //     if (final.useVideoJs && playerRef.current) {
// //       playerRef.current.pause();
// //       setIsPlaying(false);
// //     } else if (videoRef.current && !videoRef.current.paused) {
// //       videoRef.current.pause();
// //       setIsPlaying(false);
// //     }
// //   }, [final.useVideoJs]);

// //   const handlePlayPauseToggle = useCallback(() => {
// //     isPlaying ? pauseVideo() : playVideo();
// //   }, [isPlaying, pauseVideo, playVideo]);

// //   // Click handlers for different video areas
// //   const handleVideoClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
// //     const container = containerRef.current;
// //     if (!container) return;

// //     const rect = container.getBoundingClientRect();
// //     const clickX = e.clientX - rect.left;
// //     const width = rect.width;
    
// //     const leftArea = width * 0.3;
// //     const rightArea = width * 0.7;

// //     if (clickX < leftArea) {
// //       handleSeek(-final.seekAmount);
// //     } else if (clickX > rightArea) {
// //       handleSeek(final.seekAmount);
// //     } else {
// //       handlePlayPauseToggle();
// //     }
// //   }, [final.seekAmount, handlePlayPauseToggle]);

// //   // Seek functionality
// //   const handleSeek = useCallback((seconds: number) => {
// //     if (final.useVideoJs && playerRef.current) {
// //       const newTime = Math.max(0, Math.min(playerRef.current.currentTime() + seconds, duration));
// //       playerRef.current.currentTime(newTime);
// //       setCurrentTime(newTime);
// //       setDisplayTime(newTime);
// //     } else if (videoRef.current) {
// //       const newTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
// //       videoRef.current.currentTime = newTime;
// //       setCurrentTime(newTime);
// //       setDisplayTime(newTime);
// //     }
// //   }, [duration, final.useVideoJs]);

// //   const handleRewind = useCallback(() => handleSeek(-final.seekAmount), [handleSeek, final.seekAmount]);
// //   const handleForward = useCallback(() => handleSeek(final.seekAmount), [handleSeek, final.seekAmount]);

// //   // Fullscreen functionality
// //   const handleToggleFullScreen = useCallback(() => {
// //     const element = containerRef.current;
// //     if (!element) return;
    
// //     if (!document.fullscreenElement) {
// //       element.requestFullscreen?.();
// //     } else {
// //       document.exitFullscreen?.();
// //     }
// //   }, []);

// //   // Download functionality
// //   const handleDownload = useCallback(() => {
// //     downloadVideo(final.src);
// //   }, [final.src]);

// //   // Volume functionality
// //   const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
// //     const newVolume = parseFloat(e.target.value);
// //     setVolume(newVolume);
// //     setIsMuted(newVolume === 0);
    
// //     if (final.useVideoJs && playerRef.current) {
// //       playerRef.current.volume(newVolume);
// //       playerRef.current.muted(newVolume === 0);
// //     } else if (videoRef.current) {
// //       videoRef.current.volume = newVolume;
// //       videoRef.current.muted = newVolume === 0;
// //     }
// //   }, [final.useVideoJs]);

// //   const handleToggleMute = useCallback(() => {
// //     const newMuted = !isMuted;
// //     setIsMuted(newMuted);
    
// //     if (final.useVideoJs && playerRef.current) {
// //       playerRef.current.muted(newMuted);
// //       if (!newMuted) {
// //         const newVolume = 1;
// //         setVolume(newVolume);
// //         playerRef.current.volume(newVolume);
// //       } else {
// //         setVolume(0);
// //       }
// //     } else if (videoRef.current) {
// //       videoRef.current.muted = newMuted;
// //       if (!newMuted) {
// //         videoRef.current.volume = 1;
// //         setVolume(1);
// //       } else {
// //         setVolume(0);
// //       }
// //     }
// //   }, [isMuted, final.useVideoJs]);

// //   // Progress functionality
// //   const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
// //     const newTime = parseFloat(e.target.value);
// //     setCurrentTime(newTime);
// //     setDisplayTime(newTime);
    
// //     if (final.useVideoJs && playerRef.current) {
// //       setIsSeeking(true);
// //       playerRef.current.currentTime(newTime);
      
// //       if (seekTimerRef.current) {
// //         clearTimeout(seekTimerRef.current);
// //       }
      
// //       seekTimerRef.current = setTimeout(() => {
// //         setIsSeeking(false);
// //       }, 100);
// //     } else if (videoRef.current) {
// //       setIsSeeking(true);
// //       videoRef.current.currentTime = newTime;
      
// //       if (seekTimerRef.current) {
// //         clearTimeout(seekTimerRef.current);
// //       }
      
// //       seekTimerRef.current = setTimeout(() => {
// //         setIsSeeking(false);
// //       }, 100);
// //     }
// //   }, [final.useVideoJs]);

// //   // Event handlers for native video
// //   const handleLoadedMetadata = useCallback(() => {
// //     const video = videoRef.current;
// //     if (video) {
// //       setDuration(video.duration || 0);
// //       final.onDuration?.(video.duration);

// //       if (final.autoPlay) {
// //         video.muted = true;
// //         video.play().then(() => {
// //           setIsPlaying(true);
// //           setHasStarted(true);
// //         }).catch(console.error);
// //       }
// //     }
// //   }, [final.onDuration, final.autoPlay]);

// //   const handleTimeUpdate = useCallback(() => {
// //     if (videoRef.current && !final.useVideoJs && !isSeeking) {
// //       setCurrentTime(videoRef.current.currentTime);
// //       setDisplayTime(videoRef.current.currentTime);
// //     }
// //   }, [final.useVideoJs, isSeeking]);

// //   const handleWaiting = useCallback(() => setIsBuffering(true), []);
// //   const handleCanPlay = useCallback(() => setIsBuffering(false), []);
// //   const handlePlaying = useCallback(() => setIsBuffering(false), []);
// //   const handleSeeked = useCallback(() => setIsSeeking(false), []);
  
// //   const handleVideoEnd = useCallback(() => {
// //     setIsPlaying(false);
// //     final.onEnded?.();
// //     if (final.loop) {
// //       if (final.useVideoJs && playerRef.current) {
// //         playerRef.current.currentTime(0);
// //         playVideo();
// //       } else if (videoRef.current) {
// //         videoRef.current.currentTime = 0;
// //         playVideo();
// //       }
// //     }
// //   }, [final.loop, final.onEnded, final.useVideoJs, playVideo]);

// //   // Video.js event handlers
// //   const handleVideoJsTimeUpdate = useCallback((time: number) => {
// //     if (!isSeeking) {
// //       setCurrentTime(time);
// //       setDisplayTime(time);
// //     }
// //   }, [isSeeking]);

// //   const handleVideoJsDuration = useCallback((dur: number) => {
// //     setDuration(dur);
// //     final.onDuration?.(dur);
// //   }, [final.onDuration]);

// //   const handleVideoJsPlay = useCallback(() => {
// //     setIsPlaying(true);
// //     setHasStarted(true);
// //   }, []);

// //   const handleVideoJsPause = useCallback(() => {
// //     setIsPlaying(false);
// //   }, []);

// //   const handleVideoJsEnded = useCallback(() => {
// //     setIsPlaying(false);
// //     final.onEnded?.();
// //   }, [final.onEnded]);

// //   const handleVideoJsSeeked = useCallback(() => {
// //     setIsSeeking(false);
// //   }, []);

// //   // Effects
// //   useEffect(() => {
// //     const handleKey = (e: KeyboardEvent) => 
// //       handleKeyDown(e, isPlaying, playVideo, pauseVideo, final.spacebarPlay);
// //     document.addEventListener('keydown', handleKey);
// //     return () => document.removeEventListener('keydown', handleKey);
// //   }, [isPlaying, playVideo, pauseVideo, final.spacebarPlay]);

// //   useEffect(() => {
// //     const handleFullscreenChange = () => {
// //       setIsFullScreen(!!document.fullscreenElement);
// //     };
    
// //     document.addEventListener('fullscreenchange', handleFullscreenChange);
// //     return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
// //   }, []);

// //   // Controls visibility with hover
// //   useEffect(() => {
// //     let timer: NodeJS.Timeout;
    
// //     const show = () => {
// //       setShowControlsState(true);
// //       clearTimeout(timer);
// //       timer = setTimeout(() => {
// //         setShowControlsState(false);
// //         setShowVolumeSlider(false);
// //       }, final.hideControlsDelay);
// //     };

// //     const hide = () => {
// //       setShowControlsState(false);
// //       setShowVolumeSlider(false);
// //     };

// //     const container = containerRef.current;
// //     if (container && final.showControls) {
// //       container.addEventListener('mouseenter', show);
// //       container.addEventListener('mouseleave', hide);
// //       container.addEventListener('mousemove', show);
// //     }

// //     return () => {
// //       if (container) {
// //         container.removeEventListener('mouseenter', show);
// //         container.removeEventListener('mouseleave', hide);
// //         container.removeEventListener('mousemove', show);
// //       }
// //       clearTimeout(timer);
// //     };
// //   }, [final.showControls, final.hideControlsDelay]);

// //   useEffect(() => {
// //     if (final.isPause) pauseVideo();
// //   }, [final.isPause, pauseVideo]);

// //   // Helper function to render icon
// //   const renderIcon = useCallback((icon: ReactNode, defaultIcon: ReactNode, defaultSize: number = 16) => {
// //     if (icon) {
// //       if (React.isValidElement(icon)) {
// //         return React.cloneElement(icon, { 
// //           size: (icon.props as any).size || defaultSize 
// //         } as any);
// //       }
// //       return icon;
// //     }
// //     return defaultIcon;
// //   }, []);

// //   // Get volume icon based on volume level
// //   const getVolumeIcon = useCallback(() => {
// //     if (isMuted || volume === 0) {
// //       return renderIcon(final.muteIcon, <PiSpeakerSlash size={18} />, 18);
// //     } else if (volume < 0.5) {
// //       return <PiSpeakerNone size={18} />;
// //     } else {
// //       return renderIcon(final.volumeIcon, <PiSpeakerHigh size={18} />, 18);
// //     }
// //   }, [isMuted, volume, renderIcon, final.muteIcon, final.volumeIcon]);

// //   // Progress Bar Component
// //   const ProgressBar = () => (
// //     <div className={`progress-container ${final.progressCss}`}>
// //       <div className="progress-wrapper">
// //         <input
// //           type="range"
// //           min={0}
// //           max={duration}
// //           value={currentTime}
// //           onChange={handleProgressChange}
// //           className={`video-progress ${final.progressCss}`}
// //           style={{
// //             '--progress-percent': `${(displayTime / duration) * 100}%`,
// //           } as React.CSSProperties}
// //         />
// //       </div>
// //     </div>
// //   );

// //   // Volume Control Component with different styles
// //   const VolumeControl = () => {
// //     if (final.volumeStyle === 'hover') {
// //       return (
// //         <div className="volume-control-wrapper relative">
// //           <ToolTip tip="top" message={isMuted ? "Unmute" : "Mute"}>
// //             <div 
// //               onClick={handleToggleMute}
// //               onMouseEnter={() => setShowVolumeSlider(true)}
// //               className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
// //             >
// //               {getVolumeIcon()}
// //             </div>
// //           </ToolTip>
          
// //           {showVolumeSlider && (
// //             <div 
// //               className="volume-slider-wrapper absolute bottom-full left-0 mb-2 p-2 bg-black bg-opacity-80 rounded-lg backdrop-blur-sm"
// //               onMouseEnter={() => setShowVolumeSlider(true)}
// //               onMouseLeave={() => setShowVolumeSlider(false)}
// //             >
// //               <input
// //                 type="range"
// //                 min={0}
// //                 max={1}
// //                 step={0.01}
// //                 value={volume}
// //                 onChange={handleVolumeChange}
// //                 className="volume-slider vertical"
// //                 style={{
// //                   '--volume-percent': `${volume * 100}%`,
// //                 } as React.CSSProperties}
// //               />
// //             </div>
// //           )}
// //         </div>
// //       );
// //     }

// //     if (final.volumeStyle === 'compact') {
// //       return (
// //         <div className="volume-control-wrapper">
// //           <ToolTip tip="top" message={isMuted ? "Unmute" : "Mute"}>
// //             <div 
// //               onClick={handleToggleMute}
// //               className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
// //             >
// //               {getVolumeIcon()}
// //             </div>
// //           </ToolTip>
// //         </div>
// //       );
// //     }

// //     // Default slider style
// //     return (
// //       <div className="volume-control-wrapper">
// //         <ToolTip tip="top" message={isMuted ? "Unmute" : "Mute"}>
// //           <div 
// //             onClick={handleToggleMute}
// //             className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
// //           >
// //             {getVolumeIcon()}
// //           </div>
// //         </ToolTip>
        
// //         <div className="volume-slider-wrapper">
// //           <input
// //             type="range"
// //             min={0}
// //             max={1}
// //             step={0.01}
// //             value={volume}
// //             onChange={handleVolumeChange}
// //             className="volume-slider"
// //             style={{
// //               '--volume-percent': `${volume * 100}%`,
// //             } as React.CSSProperties}
// //           />
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div 
// //       ref={containerRef}
// //       className={`video_container fit ${final.funcss} ${final.containerCss} ${final.className}`}
// //       style={{ 
// //         contain: 'content',
// //         willChange: 'transform',
// //         ...style 
// //       }}
// //       onClick={handleVideoClick}
// //     >
// //       {/* Poster */}
// //       {final.poster && !hasStarted && !isPlaying && (
// //         <div
// //           style={{ backgroundImage: `url(${final.poster})` }}
// //           className="video_poster"
// //         />
// //       )}

// //       {/* Video.js Player or Native Video Element */}
// //       {final.useVideoJs ? (
// //         <VideoJSPlayer
// //           src={final.src}
// //           poster={final.poster}
// //           options={{
// //             autoplay: final.autoPlay,
// //             loop: final.loop,
// //             muted: final.muted,
// //             preload: final.preload,
// //           }}
// //           onReady={handleVideoReady}
// //           onDuration={handleVideoJsDuration}
// //           onEnded={handleVideoJsEnded}
// //           onTimeUpdate={handleVideoJsTimeUpdate}
// //           onPlay={handleVideoJsPlay}
// //           onPause={handleVideoJsPause}
// //           onSeeked={handleVideoJsSeeked}
// //           onWaiting={() => setIsBuffering(true)}
// //           onCanPlay={() => setIsBuffering(false)}
// //         />
// //       ) : (
// //         <video
// //           ref={videoRef}
// //           preload={final.preload}
// //           autoPlay={final.autoPlay}
// //           style={{
// //             transform: 'translateZ(0)',
// //             backfaceVisibility: 'hidden',
// //             ...style
// //           }}
// //           src={final.src}
// //           className={`video_player fit min-w-200 ${final.videoCss}`}
// //           onLoadedMetadata={handleLoadedMetadata}
// //           onTimeUpdate={handleTimeUpdate}
// //           onWaiting={handleWaiting}
// //           onCanPlay={handleCanPlay}
// //           onPlaying={handlePlaying}
// //           onSeeked={handleSeeked}
// //           onEnded={handleVideoEnd}
// //           playsInline
// //           controls={false}
// //           loop={final.loop}
// //           muted={final.muted}
// //           crossOrigin="anonymous"
// //         />
// //       )}

// //       {/* Buffering Indicator */}
// //       {isBuffering && (
// //         <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
// //           <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
// //         </div>
// //       )}

// //       {/* Controls Overlay */}
// //       {final.showControls && (
// //         <div 
// //           className={`video_controls ${final.controlsCss} ${
// //             showControlsState ? 'show_controls' : 'hide_controls'
// //           }`}
// //         >
// //           {/* Bottom Controls Row */}
// //           <RowFlex 
// //             gap={1} 
// //             justify="space-between" 
// //             alignItems="center"
// //             className="controls-row"
// //           >
// //             {/* Left Controls */}
// //             <RowFlex gap={0.5} alignItems="center" funcss='videoLeftContainer'>
// //               {/* Play/Pause */}
// //               {final.showPlayPause && (
// //                 <ToolTip tip="top" message={isPlaying ? "Pause" : "Play"}>
// //                   <div 
// //                     onClick={handlePlayPauseToggle}
// //                     className={`${final.buttonCss} ${isPlaying ? final.pauseCss : final.playCss} pointer`}
// //                   >
// //                     {isPlaying 
// //                       ? renderIcon(final.pauseIcon, <PiPause size={20} />, 20)
// //                       : renderIcon(final.playIcon, <PiPlay size={20} />, 20)
// //                     }
// //                   </div>
// //                 </ToolTip>
// //               )}

// //               {/* Seek Buttons */}
// //               {final.showSeekButtons && (
// //                 <>
// //                   <ToolTip tip="top" message={`${final.seekAmount}s Back`}>
// //                     <div
// //                       onClick={handleRewind}
// //                       className={`${final.buttonCss} ${final.rewindCss} pointer`}
// //                     >
// //                       {renderIcon(final.rewindIcon, <TfiControlBackward size={16} />, 16)}
// //                     </div>
// //                   </ToolTip>

// //                   <ToolTip tip="top" message={`${final.seekAmount}s Forward`}>
// //                     <div 
// //                       onClick={handleForward}
// //                       className={`${final.buttonCss} ${final.forwardCss} pointer`}
// //                     >
// //                       {renderIcon(final.forwardIcon, <TfiControlForward size={16} />, 16)}
// //                     </div>
// //                   </ToolTip>
// //                 </>
// //               )}

// //               {/* Volume Control */}
// //               {final.showVolume && <VolumeControl />}

// //               {/* Time Display */}
// //               {final.showTime && (
// //                 <div className={`video_time ${final.timeCss}`}>
// //                   <Text 
// //                     text={`${formatTime(displayTime)} / ${formatTime(duration)}`} 
// //                     size="xs" 
// //                   />
// //                 </div>
// //               )}
// //             </RowFlex>
// //             <div className="col w-full ">
// //               <div className='videoProgressContainer'>
// //                 {final.showProgress && <ProgressBar />}
// //               </div>
// //             </div>

// //             {/* Right Controls */}
// //             <RowFlex gap={0.3} funcss='videoRightContainer'>
// //               {/* Fullscreen */}
// //               {final.showFullscreen && (
// //                 <ToolTip tip="top" message="Fullscreen">
// //                   <div 
// //                     onClick={handleToggleFullScreen}
// //                     className={`${final.buttonCss} ${final.fullscreenCss} pointer`}
// //                   >
// //                     {renderIcon(final.fullscreenIcon, <PiCornersOut size={18} />, 18)}
// //                   </div>
// //                 </ToolTip>
// //               )}

// //               {/* Download */}
// //               {final.showDownload && (
// //                 <ToolTip tip="top" message="Download">
// //                   <div 
// //                     onClick={handleDownload}
// //                     className={`${final.buttonCss} ${final.downloadCss} pointer`}
// //                   >
// //                     {renderIcon(final.downloadIcon, <TfiDownload size={16} />, 16)}
// //                   </div>
// //                 </ToolTip>
// //               )}
// //             </RowFlex>
// //           </RowFlex>
// //         </div>
// //       )}

// //       {/* Big Play Button */}
// //       {!hasStarted && final.showControls && (
// //         <div 
// //           onClick={handlePlayPauseToggle}
// //           className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 group cursor-pointer"
// //         >
// //           <Circle 
// //             className="bg-blue-600 group-hover:bg-blue-700 transition-colors"
// //           >
// //             <PiPlay size={32} className="text-white ml-1" />
// //           </Circle>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// // 'use client';
// // import React, { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
// // import { 
// //   PiCornersOut, PiPlay, PiPause, PiSpeakerHigh, PiSpeakerSlash, PiSpeakerNone
// // } from 'react-icons/pi';
// // import { TfiControlBackward, TfiControlForward, TfiDownload } from "react-icons/tfi";
// // import Text from '../text/Text';
// // import RowFlex from '../specials/RowFlex';
// // import ToolTip from '../tooltip/ToolTip';
// // import Circle from '../specials/Circle';
// // import Tip from '../tooltip/Tip';
// // import { formatTime } from './videoFunctions';
// // import { getDynamicIcon } from '../../utils/getDynamicIcon';

// // // Custom handleKeyDown function that checks if the target is an input field
// // const handleKeyDown = (e: KeyboardEvent, isPlaying: boolean, playVideo: () => void, pauseVideo: () => void, spacebarPlay: boolean = true) => {
// //   // Check if the target is an input, textarea, or contenteditable element
// //   const target = e.target as HTMLElement;
// //   const isInput = target.tagName === 'INPUT' || 
// //                   target.tagName === 'TEXTAREA' || 
// //                   target.isContentEditable;
  
// //   // If spacebar is pressed and the target is an input, let it handle the event
// //   if (e.code === 'Space' && isInput) {
// //     return; // Don't prevent default, let the input handle the space
// //   }
  
// //   // Only handle video shortcuts if spacebarPlay is enabled and target is not an input
// //   if (spacebarPlay && e.code === 'Space') {
// //     e.preventDefault();
// //     isPlaying ? pauseVideo() : playVideo();
// //   }
// // };

// // // Configuration hook
// // const useComponentConfiguration = (componentName: string, variant: string = '') => {
// //   const getComponentConfig = () => {
// //     const baseConfig = {
// //       Video: {
// //         default: {
// //           showControls: true,
// //           showPlayPause: true,
// //           showProgress: true,
// //           showVolume: true,
// //           showTime: true,
// //           showFullscreen: true,
// //           showDownload: false,
// //           showSeekButtons: false,
// //           spacebarPlay: true,
// //           autoPlay: false,
// //           loop: false,
// //           muted: false,
// //           seekAmount: 10,
// //           hideControlsDelay: 3000,
// //           funcss: '',
// //           containerCss: '',
// //           videoCss: '',
// //           controlsCss: '',
// //           progressCss: '',
// //           progressBarCss: '',
// //           timeCss: '',
// //           playCss: '',
// //           pauseCss: '',
// //           volumeCss: '',
// //           fullscreenCss: '',
// //           downloadCss: '',
// //           rewindCss: '',
// //           forwardCss: '',
// //           buttonCss: '',
// //           volumeStyle: 'slider', // 'slider' | 'compact' | 'hover'
// //         },
// //         minimal: {
// //           showControls: true,
// //           showPlayPause: true,
// //           showProgress: true,
// //           showVolume: false,
// //           showTime: true,
// //           showFullscreen: true,
// //           showDownload: false,
// //           showSeekButtons: false,
// //           controlsCss: 'minimal-controls',
// //           buttonCss: 'minimal-btn',
// //           volumeStyle: 'hover',
// //         },
// //         embedded: {
// //           showControls: false,
// //           autoPlay: true,
// //           muted: true,
// //           loop: true,
// //           containerCss: 'embedded-video',
// //         },
// //         fullFeatured: {
// //           showControls: true,
// //           showPlayPause: true,
// //           showProgress: true,
// //           showVolume: true,
// //           showTime: true,
// //           showFullscreen: true,
// //           showDownload: true,
// //           showSeekButtons: true,
// //           controlsCss: 'full-featured-controls',
// //           buttonCss: 'featured-btn',
// //           volumeStyle: 'slider',
// //         },
// //         theater: {
// //           showControls: true,
// //           containerCss: 'theater-mode',
// //           videoCss: 'theater-video',
// //           controlsCss: 'theater-controls',
// //           fullscreenCss: 'theater-fullscreen',
// //           volumeStyle: 'slider',
// //         },
// //         youtube: {
// //           showControls: true,
// //           showPlayPause: true,
// //           showProgress: true,
// //           showVolume: true,
// //           showTime: true,
// //           showFullscreen: true,
// //           showDownload: false,
// //           showSeekButtons: false,
// //           controlsCss: 'youtube-controls',
// //           buttonCss: 'youtube-btn',
// //           volumeStyle: 'hover',
// //           hideControlsDelay: 2000,
// //         }
// //       }
// //     };

// //     return baseConfig[componentName as keyof typeof baseConfig] || {};
// //   };

// //   const mergeWithLocal = (localProps: any) => {
// //     const config = getComponentConfig();
// //     const variantConfig = variant && config[variant as keyof typeof config] ? config[variant as keyof typeof config] : {};
// //     const defaultConfig = config.default || {};
    
// //     const mergedProps = {
// //       ...defaultConfig,
// //       ...variantConfig,
// //       ...localProps,
// //     };

// //     return {
// //       props: mergedProps,
// //       variantConfig,
// //       defaultConfig,
// //     };
// //   };

// //   return {
// //     mergeWithLocal,
// //     getComponentConfig,
// //   };
// // };

// // interface VideoProps {
// //   src: string;
// //   poster?: string;
// //   onDuration?: (duration: number) => void;
// //   onEnded?: () => void;
// //   isPause?: boolean;
// //   spacebarPlay?: boolean;
// //   className?: string;
// //   autoPlay?: boolean;
  
// //   // Controls visibility
// //   showControls?: boolean;
// //   showPlayPause?: boolean;
// //   showProgress?: boolean;
// //   showVolume?: boolean;
// //   showTime?: boolean;
// //   showFullscreen?: boolean;
// //   showDownload?: boolean;
// //   showSeekButtons?: boolean;
  
// //   // Custom icons - can be string (icon name) or ReactNode
// //   playIcon?: string | ReactNode;
// //   pauseIcon?: string | ReactNode;
// //   fullscreenIcon?: string | ReactNode;
// //   downloadIcon?: string | ReactNode;
// //   volumeIcon?: string | ReactNode;
// //   muteIcon?: string | ReactNode;
// //   rewindIcon?: string | ReactNode;
// //   forwardIcon?: string | ReactNode;
  
// //   // Behavior
// //   hideControlsDelay?: number;
// //   loop?: boolean;
// //   muted?: boolean;
// //   seekAmount?: number;
  
// //   // Custom CSS classes
// //   funcss?: string;
// //   containerCss?: string;
// //   videoCss?: string;
// //   controlsCss?: string;
// //   progressCss?: string;
// //   progressBarCss?: string;
// //   timeCss?: string;
// //   playCss?: string;
// //   pauseCss?: string;
// //   volumeCss?: string;
// //   fullscreenCss?: string;
// //   downloadCss?: string;
// //   rewindCss?: string;
// //   forwardCss?: string;
// //   buttonCss?: string;
// //   style?: React.CSSProperties;

// //   // Volume display style
// //   volumeStyle?: 'slider' | 'compact' | 'hover';

// //   // Variant support
// //   variant?: string;
// // }

// // export default function Video({
// //   src,
// //   poster,
// //   onDuration,
// //   onEnded,
// //   isPause,
// //   spacebarPlay,
// //   className = '',
// //   autoPlay,
// //   showControls,
// //   showPlayPause,
// //   showProgress,
// //   showVolume,
// //   showTime,
// //   showFullscreen,
// //   showDownload,
// //   showSeekButtons,
// //   playIcon,
// //   pauseIcon,
// //   fullscreenIcon,
// //   downloadIcon,
// //   volumeIcon,
// //   muteIcon,
// //   rewindIcon,
// //   forwardIcon,
// //   hideControlsDelay,
// //   loop,
// //   muted,
// //   seekAmount,
// //   funcss = '',
// //   containerCss = '',
// //   videoCss = '',
// //   controlsCss = '',
// //   progressCss = '',
// //   progressBarCss = '',
// //   timeCss = '',
// //   playCss = '',
// //   pauseCss = '',
// //   volumeCss = '',
// //   fullscreenCss = '',
// //   downloadCss = '',
// //   rewindCss = '',
// //   forwardCss = '',
// //   buttonCss = '',
// //   volumeStyle = 'slider',
// //   style,
// //   variant = '',
// //   ...rest
// // }: VideoProps) {
// //   const { mergeWithLocal } = useComponentConfiguration('Video', variant);

// //   // Create local props object - these will override config props
// //   const localProps = {
// //     src,
// //     poster,
// //     onDuration,
// //     onEnded,
// //     isPause,
// //     spacebarPlay,
// //     className,
// //     autoPlay,
// //     showControls,
// //     showPlayPause,
// //     showProgress,
// //     showVolume,
// //     showTime,
// //     showFullscreen,
// //     showDownload,
// //     showSeekButtons,
// //     playIcon,
// //     pauseIcon,
// //     fullscreenIcon,
// //     downloadIcon,
// //     volumeIcon,
// //     muteIcon,
// //     rewindIcon,
// //     forwardIcon,
// //     hideControlsDelay,
// //     loop,
// //     muted,
// //     seekAmount,
// //     funcss,
// //     containerCss,
// //     videoCss,
// //     controlsCss,
// //     progressCss,
// //     progressBarCss,
// //     timeCss,
// //     playCss,
// //     pauseCss,
// //     volumeCss,
// //     fullscreenCss,
// //     downloadCss,
// //     rewindCss,
// //     forwardCss,
// //     buttonCss,
// //     volumeStyle,
// //     style,
// //     ...rest,
// //   };

// //   // Merge with config - LOCAL PROPS OVERRIDE CONFIG
// //   const { props: mergedProps } = mergeWithLocal(localProps);

// //   // Extract final values - local props take precedence
// //   const final = {
// //     src: mergedProps.src,
// //     poster: mergedProps.poster,
// //     onDuration: mergedProps.onDuration,
// //     onEnded: mergedProps.onEnded,
// //     isPause: mergedProps.isPause,
// //     spacebarPlay: mergedProps.spacebarPlay ?? true,
// //     className: mergedProps.className ?? '',
// //     autoPlay: mergedProps.autoPlay ?? false,
// //     showControls: mergedProps.showControls ?? true,
// //     showPlayPause: mergedProps.showPlayPause ?? true,
// //     showProgress: mergedProps.showProgress ?? true,
// //     showVolume: mergedProps.showVolume ?? true,
// //     showTime: mergedProps.showTime ?? true,
// //     showFullscreen: mergedProps.showFullscreen ?? true,
// //     showDownload: mergedProps.showDownload ?? false,
// //     showSeekButtons: mergedProps.showSeekButtons ?? false,
// //     playIcon: mergedProps.playIcon,
// //     pauseIcon: mergedProps.pauseIcon,
// //     fullscreenIcon: mergedProps.fullscreenIcon,
// //     downloadIcon: mergedProps.downloadIcon,
// //     volumeIcon: mergedProps.volumeIcon,
// //     muteIcon: mergedProps.muteIcon,
// //     rewindIcon: mergedProps.rewindIcon,
// //     forwardIcon: mergedProps.forwardIcon,
// //     hideControlsDelay: mergedProps.hideControlsDelay ?? 3000,
// //     loop: mergedProps.loop ?? false,
// //     muted: mergedProps.muted ?? false,
// //     seekAmount: mergedProps.seekAmount ?? 10,
// //     funcss: mergedProps.funcss ?? '',
// //     containerCss: mergedProps.containerCss ?? '',
// //     videoCss: mergedProps.videoCss ?? '',
// //     controlsCss: mergedProps.controlsCss ?? '',
// //     progressCss: mergedProps.progressCss ?? '',
// //     progressBarCss: mergedProps.progressBarCss ?? '',
// //     timeCss: mergedProps.timeCss ?? '',
// //     playCss: mergedProps.playCss ?? '',
// //     pauseCss: mergedProps.pauseCss ?? '',
// //     volumeCss: mergedProps.volumeCss ?? '',
// //     fullscreenCss: mergedProps.fullscreenCss ?? '',
// //     downloadCss: mergedProps.downloadCss ?? '',
// //     rewindCss: mergedProps.rewindCss ?? '',
// //     forwardCss: mergedProps.forwardCss ?? '',
// //     buttonCss: mergedProps.buttonCss ?? '',
// //     volumeStyle: mergedProps.volumeStyle ?? 'slider',
// //   };

// //   const videoRef = useRef<HTMLVideoElement | null>(null);
// //   const containerRef = useRef<HTMLDivElement | null>(null);
// //   const animationFrameRef = useRef<number | null>(null);

// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [currentTime, setCurrentTime] = useState(0);
// //   const [duration, setDuration] = useState(0);
// //   const [volume, setVolume] = useState(final.muted ? 0 : 1);
// //   const [isMuted, setIsMuted] = useState(final.muted);
// //   const [isFullScreen, setIsFullScreen] = useState(false);
// //   const [showControlsState, setShowControlsState] = useState(false);
// //   const [hasStarted, setHasStarted] = useState(false);
// //   const [isHoveringProgress, setIsHoveringProgress] = useState(false);
// //   const [isHoveringVolume, setIsHoveringVolume] = useState(false);
// //   const [showVolumeSlider, setShowVolumeSlider] = useState(false);

// //   // Dynamic icon states
// //   const [dynamicPlayIcon, setDynamicPlayIcon] = useState<ReactNode>(null);
// //   const [dynamicPauseIcon, setDynamicPauseIcon] = useState<ReactNode>(null);
// //   const [dynamicFullscreenIcon, setDynamicFullscreenIcon] = useState<ReactNode>(null);
// //   const [dynamicDownloadIcon, setDynamicDownloadIcon] = useState<ReactNode>(null);
// //   const [dynamicVolumeIcon, setDynamicVolumeIcon] = useState<ReactNode>(null);
// //   const [dynamicMuteIcon, setDynamicMuteIcon] = useState<ReactNode>(null);
// //   const [dynamicRewindIcon, setDynamicRewindIcon] = useState<ReactNode>(null);
// //   const [dynamicForwardIcon, setDynamicForwardIcon] = useState<ReactNode>(null);

// //   // Helper function to load dynamic icons
// //   const loadDynamicIcon = async (iconProp: string | ReactNode | undefined, setter: (icon: ReactNode) => void, defaultIcon: ReactNode) => {
// //     if (!iconProp) {
// //       setter(defaultIcon);
// //       return;
// //     }

// //     if (typeof iconProp === 'string') {
// //       const iconNode = await getDynamicIcon(iconProp);
// //       setter(iconNode || defaultIcon);
// //     } else {
// //       setter(iconProp);
// //     }
// //   };

// //   // Load all dynamic icons
// //   useEffect(() => {
// //     const loadIcons = async () => {
// //       await Promise.all([
// //         loadDynamicIcon(final.playIcon, setDynamicPlayIcon, <PiPlay size={20} />),
// //         loadDynamicIcon(final.pauseIcon, setDynamicPauseIcon, <PiPause size={20} />),
// //         loadDynamicIcon(final.fullscreenIcon, setDynamicFullscreenIcon, <PiCornersOut size={18} />),
// //         loadDynamicIcon(final.downloadIcon, setDynamicDownloadIcon, <TfiDownload size={16} />),
// //         loadDynamicIcon(final.volumeIcon, setDynamicVolumeIcon, <PiSpeakerHigh size={18} />),
// //         loadDynamicIcon(final.muteIcon, setDynamicMuteIcon, <PiSpeakerSlash size={18} />),
// //         loadDynamicIcon(final.rewindIcon, setDynamicRewindIcon, <TfiControlBackward size={16} />),
// //         loadDynamicIcon(final.forwardIcon, setDynamicForwardIcon, <TfiControlForward size={16} />),
// //       ]);
// //     };

// //     loadIcons();
// //   }, [
// //     final.playIcon, final.pauseIcon, final.fullscreenIcon, final.downloadIcon, 
// //     final.volumeIcon, final.muteIcon, final.rewindIcon, final.forwardIcon
// //   ]);

// //   // Helper function to render icon
// //   const renderIcon = (icon: ReactNode, defaultSize: number = 16) => {
// //     if (!icon) return null;
    
// //     if (React.isValidElement(icon)) {
// //       return React.cloneElement(icon, { 
// //         size: (icon.props as any).size || defaultSize 
// //       } as any);
// //     }
    
// //     return icon;
// //   };

// //   // Play/Pause functionality
// //   const playVideo = () => {
// //     const video = videoRef.current;
// //     if (video) {
// //       if (video.currentTime === video.duration) {
// //         video.currentTime = 0;
// //       }
// //       video.play().then(() => {
// //         setIsPlaying(true);
// //         setHasStarted(true);
// //       }).catch(console.error);
// //     }
// //   };

// //   const pauseVideo = () => {
// //     const video = videoRef.current;
// //     if (video && !video.paused) {
// //       video.pause();
// //       setIsPlaying(false);
// //     }
// //   };

// //   const handlePlayPauseToggle = () => {
// //     isPlaying ? pauseVideo() : playVideo();
// //   };

// //   // Click handlers for different video areas
// //   const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
// //     const container = containerRef.current;
// //     if (!container) return;

// //     const rect = container.getBoundingClientRect();
// //     const clickX = e.clientX - rect.left;
// //     const width = rect.width;
    
// //     const leftArea = width * 0.3;
// //     const rightArea = width * 0.7;

// //     if (clickX < leftArea) {
// //       handleSeek(-final.seekAmount);
// //     } else if (clickX > rightArea) {
// //       handleSeek(final.seekAmount);
// //     } else {
// //       handlePlayPauseToggle();
// //     }
// //   };

// //   // Seek functionality
// //   const handleSeek = (seconds: number) => {
// //     const video = videoRef.current;
// //     if (video) {
// //       video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, duration));
// //     }
// //   };

// //   const handleRewind = () => handleSeek(-final.seekAmount);
// //   const handleForward = () => handleSeek(final.seekAmount);

// //   // Fullscreen functionality
// //   const handleToggleFullScreen = () => {
// //     const element = containerRef.current;
// //     if (!element) return;
    
// //     if (!document.fullscreenElement) {
// //       element.requestFullscreen?.();
// //     } else {
// //       document.exitFullscreen?.();
// //     }
// //   };

// //   // Volume functionality
// //   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const newVolume = parseFloat(e.target.value);
// //     setVolume(newVolume);
// //     setIsMuted(newVolume === 0);
// //     if (videoRef.current) {
// //       videoRef.current.volume = newVolume;
// //       videoRef.current.muted = newVolume === 0;
// //     }
// //   };

// //   const handleToggleMute = () => {
// //     const newMuted = !isMuted;
// //     setIsMuted(newMuted);
// //     if (videoRef.current) {
// //       videoRef.current.muted = newMuted;
// //       if (newMuted) {
// //         setVolume(0);
// //       } else {
// //         setVolume(1);
// //         if (videoRef.current) videoRef.current.volume = 1;
// //       }
// //     }
// //   };

// //   // Progress functionality
// //   const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const newTime = parseFloat(e.target.value);
// //     if (videoRef.current) {
// //       videoRef.current.currentTime = newTime;
// //     }
// //     setCurrentTime(newTime);
// //   };

// //   // Time update animation
// //   const updateCurrentTime = useCallback(() => {
// //     const video = videoRef.current;
// //     if (video) {
// //       setCurrentTime(video.currentTime);
// //       animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
// //     }
// //   }, []);

// //   // Event handlers
// //   const handleLoadedMetadata = () => {
// //     const video = videoRef.current;
// //     if (video) {
// //       setDuration(video.duration || 0);
// //       final.onDuration?.(video.duration);
// //       if (final.autoPlay) {
// //         video.muted = true;
// //         video.play().then(() => {
// //           setIsPlaying(true);
// //           setHasStarted(true);
// //         }).catch(console.error);
// //       }
// //     }
// //   };

// //   const handleVideoEnd = () => {
// //     setIsPlaying(false);
// //     final.onEnded?.();
// //     if (final.loop && videoRef.current) {
// //       videoRef.current.currentTime = 0;
// //       playVideo();
// //     }
// //   };

// //   // Effects
// //   useEffect(() => {
// //     const handleKey = (e: KeyboardEvent) => 
// //       handleKeyDown(e, isPlaying, playVideo, pauseVideo, final.spacebarPlay);
// //     document.addEventListener('keydown', handleKey);
// //     return () => document.removeEventListener('keydown', handleKey);
// //   }, [isPlaying, final.spacebarPlay]);

// //   useEffect(() => {
// //     const video = videoRef.current;
// //     if (!video) return;

// //     video.addEventListener('ended', handleVideoEnd);
// //     return () => video.removeEventListener('ended', handleVideoEnd);
// //   }, [final.loop, final.onEnded]);

// //   useEffect(() => {
// //     if (final.isPause) pauseVideo();
// //   }, [final.isPause]);

// //   useEffect(() => {
// //     const handleFullscreenChange = () => {
// //       setIsFullScreen(!!document.fullscreenElement);
// //     };
// //     document.addEventListener('fullscreenchange', handleFullscreenChange);
// //     return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
// //   }, []);

// //   // Controls visibility with hover
// //   useEffect(() => {
// //     let timer: NodeJS.Timeout;
    
// //     const show = () => {
// //       setShowControlsState(true);
// //       clearTimeout(timer);
// //       timer = setTimeout(() => {
// //         setShowControlsState(false);
// //         setShowVolumeSlider(false);
// //       }, final.hideControlsDelay);
// //     };

// //     const hide = () => {
// //       setShowControlsState(false);
// //       setShowVolumeSlider(false);
// //     };

// //     const container = containerRef.current;
// //     if (container && final.showControls) {
// //       container.addEventListener('mouseenter', show);
// //       container.addEventListener('mouseleave', hide);
// //       container.addEventListener('mousemove', show);
// //     }

// //     return () => {
// //       if (container) {
// //         container.removeEventListener('mouseenter', show);
// //         container.removeEventListener('mouseleave', hide);
// //         container.removeEventListener('mousemove', show);
// //       }
// //       clearTimeout(timer);
// //     };
// //   }, [final.showControls, final.hideControlsDelay]);

// //   useEffect(() => {
// //     if (isPlaying) {
// //       animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
// //     } else if (animationFrameRef.current) {
// //       cancelAnimationFrame(animationFrameRef.current);
// //     }
// //     return () => {
// //       if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
// //     };
// //   }, [isPlaying, updateCurrentTime]);

// //   // Get volume icon based on volume level
// //   const getVolumeIcon = () => {
// //     if (isMuted || volume === 0) {
// //       return renderIcon(dynamicMuteIcon, 18);
// //     } else if (volume < 0.5) {
// //       return <PiSpeakerNone size={18} />;
// //     } else {
// //       return renderIcon(dynamicVolumeIcon, 18);
// //     }
// //   };

// //   // Simple Progress Bar Component (YouTube style)
// //   const ProgressBar = () => (
// //     <div className="progress-container">
// //       <div className="progress-wrapper">
// //         <input
// //           type="range"
// //           min={0}
// //           max={duration}
// //           value={currentTime}
// //           onChange={handleProgressChange}
// //           className={`video-progress ${final.progressCss}`}
// //           style={{
// //             '--progress-percent': `${(currentTime / duration) * 100}%`,
// //           } as React.CSSProperties}
// //           onMouseEnter={() => setIsHoveringProgress(true)}
// //           onMouseLeave={() => setIsHoveringProgress(false)}
// //         />
// //       </div>
// //     </div>
// //   );

// //   // Volume Control Component with different styles
// //   const VolumeControl = () => {
// //     if (final.volumeStyle === 'hover') {
// //       return (
// //         <div className="volume-control-wrapper relative">
// //           <ToolTip tip="top" message={isMuted ? "Unmute" : "Mute"}>
// //             <div 
// //               onClick={handleToggleMute}
// //               onMouseEnter={() => setShowVolumeSlider(true)}
// //               className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
              
// //             >
// //               {getVolumeIcon()}
// //             </div>
// //           </ToolTip>
          
// //           {showVolumeSlider && (
// //             <div 
// //               className="volume-slider-wrapper absolute bottom-full left-0 mb-2 p-2 bg-black bg-opacity-80 rounded-lg backdrop-blur-sm"
// //               onMouseEnter={() => setShowVolumeSlider(true)}
// //               onMouseLeave={() => setShowVolumeSlider(false)}
// //             >
// //               <input
// //                 type="range"
// //                 min={0}
// //                 max={1}
// //                 step={0.01}
// //                 value={volume}
// //                 onChange={handleVolumeChange}
// //                 className="volume-slider vertical"
// //                 style={{
// //                   '--volume-percent': `${volume * 100}%`,
// //                 } as React.CSSProperties}
// //               />
// //             </div>
// //           )}
// //         </div>
// //       );
// //     }

// //     if (final.volumeStyle === 'compact') {
// //       return (
// //         <div className="volume-control-wrapper">
// //           <ToolTip>
// //             <div 
// //               onClick={handleToggleMute}
// //               className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
// //             >
// //               {getVolumeIcon()}
// //             </div>
// //             <Tip tip="top" content={isMuted ? "Unmute" : "Mute"} />
// //           </ToolTip>
// //         </div>
// //       );
// //     }

// //     // Default slider style
// //     return (
// //       <div className="volume-control-wrapper">
// //         <ToolTip>
// //           <div 
// //             onClick={handleToggleMute}
// //             className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
// //           >
// //             {getVolumeIcon()}
// //           </div>
// //           <Tip tip="top" content={isMuted ? "Unmute" : "Mute"} />
// //         </ToolTip>
        
// //         <div className="volume-slider-wrapper">
// //           <input
// //             type="range"
// //             min={0}
// //             max={1}
// //             step={0.01}
// //             value={volume}
// //             onChange={handleVolumeChange}
// //             className="volume-slider"
// //             style={{
// //               '--volume-percent': `${volume * 100}%`,
// //             } as React.CSSProperties}
// //           />
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div 
// //       ref={containerRef}
// //       className={`video_container fit ${final.funcss} ${final.containerCss} ${final.className}`}
// //       onClick={handleVideoClick}
// //     >
// //       {/* Poster */}
// //       {final.poster && !hasStarted && !isPlaying && (
// //         <div
// //           style={{ backgroundImage: `url(${final.poster})` }}
// //           className="video_poster"
// //         />
// //       )}

// //       {/* Video Element */}
// //       <video
// //         ref={videoRef}
// //         preload="auto"
// //         autoPlay={final.autoPlay}
// //         style={style}
// //         src={final.src}
// //         className={`video_player fit min-w-200 ${final.videoCss}`}
// //         onLoadedMetadata={handleLoadedMetadata}
// //         playsInline
// //         controls={false}
// //         loop={final.loop}
// //         muted={final.muted}
// //       />

// //       {/* Controls Overlay */}
// //       {final.showControls && (
// //         <div 
// //           className={`video_controls ${final.controlsCss} ${
// //             showControlsState ? 'show_controls' : 'hide_controls'
// //           }`}
// //         >
// //           {/* Bottom Controls Row */}
// //           <RowFlex 
// //             gap={1} 
// //             justify="space-between" 
// //             alignItems="center"
// //             className="controls-row"
// //           >
// //             {/* Left Controls */}
// //             <RowFlex gap={0.5} alignItems="center" funcss='videoLeftContainer'>
// //               {/* Play/Pause */}
// //               {final.showPlayPause && (
// //                 <ToolTip>
// //                   <div 
// //                     onClick={handlePlayPauseToggle}
// //                     className={`${final.buttonCss} ${isPlaying ? final.pauseCss : final.playCss} pointer`}
// //                   >
// //                     {isPlaying 
// //                       ? renderIcon(dynamicPauseIcon, 20)
// //                       : renderIcon(dynamicPlayIcon, 20)
// //                     }
// //                   </div>
// //                   <Tip tip="top" content={isPlaying ? "Pause" : "Play"} />
// //                 </ToolTip>
// //               )}

// //               {/* Seek Buttons */}
// //               {final.showSeekButtons && (
// //                 <>
// //                   <ToolTip>
// //                     <div
// //                       onClick={handleRewind}
// //                       className={`${final.buttonCss} ${final.rewindCss} pointer`}
// //                     >
// //                       {renderIcon(dynamicRewindIcon, 16)}
// //                     </div>
// //                     <Tip tip="top" content={`${final.seekAmount}s Back`} />
// //                   </ToolTip>

// //                   <ToolTip>
// //                     <div 
// //                       onClick={handleForward}
// //                       className={`${final.buttonCss} ${final.forwardCss} pointer`}
// //                     >
// //                       {renderIcon(dynamicForwardIcon, 16)}
// //                     </div>
// //                     <Tip tip="top" content={`${final.seekAmount}s Forward`} />
// //                   </ToolTip>
// //                 </>
// //               )}

// //               {/* Volume Control */}
// //               {final.showVolume && <VolumeControl />}

// //               {/* Time Display */}
// //               {final.showTime && (
// //                 <div className={`video_time ${final.timeCss}`}>
// //                   <Text 
// //                     text={`${formatTime(currentTime)} / ${formatTime(duration)}`} 
// //                     size="xs" 
// //                   />
// //                 </div>
// //               )}
// //             </RowFlex>
// //             <div className="col w-full ">
// //               <div className='videoProgressContainer'>
// //                 {final.showProgress && <ProgressBar />}
// //               </div>
// //             </div>

// //             {/* Right Controls */}
// //             <RowFlex gap={0.3} funcss='videoRightContainer'>
// //               {/* Fullscreen */}
// //               {final.showFullscreen && (
// //                 <ToolTip>
// //                   <div 
// //                     onClick={handleToggleFullScreen}
// //                     className={`${final.buttonCss} ${final.fullscreenCss} pointer`}
// //                   >
// //                     {renderIcon(dynamicFullscreenIcon, 18)}
// //                   </div>
// //                   <Tip tip="top" content="Fullscreen" />
// //                 </ToolTip>
// //               )}

// //               {/* Download */}
// //               {final.showDownload && (
// //                 <ToolTip>
// //                   <div 
// //                     onClick={() => window.open(final.src, '_blank')}
// //                     className={`${final.buttonCss} ${final.downloadCss} pointer`}
// //                   >
// //                     {renderIcon(dynamicDownloadIcon, 16)}
// //                   </div>
// //                   <Tip tip="top" content="Download" />
// //                 </ToolTip>
// //               )}
// //             </RowFlex>
// //           </RowFlex>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }