'use client';
import React, { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { 
  PiCornersOut, PiPlay, PiPause, PiSpeakerHigh, PiSpeakerSlash, PiSpeakerNone
} from 'react-icons/pi';
import { TfiControlBackward, TfiControlForward, TfiDownload } from "react-icons/tfi";
import Text from '../text/Text';
import RowFlex from '../specials/RowFlex';
import ToolTip from '../tooltip/ToolTip';
import Circle from '../specials/Circle';
import Tip from '../tooltip/Tip';
import { formatTime } from './videoFunctions';
import { handleKeyDown } from './videoShortcuts';
import { getDynamicIcon } from '../../utils/getDynamicIcon';

// Configuration hook
const useComponentConfiguration = (componentName: string, variant: string = '') => {
  const getComponentConfig = () => {
    const baseConfig = {
      Video: {
        default: {
          showControls: true,
          showPlayPause: true,
          showProgress: true,
          showVolume: true,
          showTime: true,
          showFullscreen: true,
          showDownload: false,
          showSeekButtons: false,
          spacebarPlay: true,
          autoPlay: false,
          loop: false,
          muted: false,
          seekAmount: 10,
          hideControlsDelay: 3000,
          funcss: '',
          containerCss: '',
          videoCss: '',
          controlsCss: '',
          progressCss: '',
          progressBarCss: '',
          timeCss: '',
          playCss: '',
          pauseCss: '',
          volumeCss: '',
          fullscreenCss: '',
          downloadCss: '',
          rewindCss: '',
          forwardCss: '',
          buttonCss: '',
          volumeStyle: 'slider', // 'slider' | 'compact' | 'hover'
        },
        minimal: {
          showControls: true,
          showPlayPause: true,
          showProgress: true,
          showVolume: false,
          showTime: true,
          showFullscreen: true,
          showDownload: false,
          showSeekButtons: false,
          controlsCss: 'minimal-controls',
          buttonCss: 'minimal-btn',
          volumeStyle: 'hover',
        },
        embedded: {
          showControls: false,
          autoPlay: true,
          muted: true,
          loop: true,
          containerCss: 'embedded-video',
        },
        fullFeatured: {
          showControls: true,
          showPlayPause: true,
          showProgress: true,
          showVolume: true,
          showTime: true,
          showFullscreen: true,
          showDownload: true,
          showSeekButtons: true,
          controlsCss: 'full-featured-controls',
          buttonCss: 'featured-btn',
          volumeStyle: 'slider',
        },
        theater: {
          showControls: true,
          containerCss: 'theater-mode',
          videoCss: 'theater-video',
          controlsCss: 'theater-controls',
          fullscreenCss: 'theater-fullscreen',
          volumeStyle: 'slider',
        },
        youtube: {
          showControls: true,
          showPlayPause: true,
          showProgress: true,
          showVolume: true,
          showTime: true,
          showFullscreen: true,
          showDownload: false,
          showSeekButtons: false,
          controlsCss: 'youtube-controls',
          buttonCss: 'youtube-btn',
          volumeStyle: 'hover',
          hideControlsDelay: 2000,
        }
      }
    };

    return baseConfig[componentName as keyof typeof baseConfig] || {};
  };

  const mergeWithLocal = (localProps: any) => {
    const config = getComponentConfig();
    const variantConfig = variant && config[variant as keyof typeof config] ? config[variant as keyof typeof config] : {};
    const defaultConfig = config.default || {};
    
    const mergedProps = {
      ...defaultConfig,
      ...variantConfig,
      ...localProps,
    };

    return {
      props: mergedProps,
      variantConfig,
      defaultConfig,
    };
  };

  return {
    mergeWithLocal,
    getComponentConfig,
  };
};

interface VideoProps {
  src: string;
  poster?: string;
  onDuration?: (duration: number) => void;
  onEnded?: () => void;
  isPause?: boolean;
  spacebarPlay?: boolean;
  className?: string;
  autoPlay?: boolean;
  
  // Controls visibility
  showControls?: boolean;
  showPlayPause?: boolean;
  showProgress?: boolean;
  showVolume?: boolean;
  showTime?: boolean;
  showFullscreen?: boolean;
  showDownload?: boolean;
  showSeekButtons?: boolean;
  
  // Custom icons - can be string (icon name) or ReactNode
  playIcon?: string | ReactNode;
  pauseIcon?: string | ReactNode;
  fullscreenIcon?: string | ReactNode;
  downloadIcon?: string | ReactNode;
  volumeIcon?: string | ReactNode;
  muteIcon?: string | ReactNode;
  rewindIcon?: string | ReactNode;
  forwardIcon?: string | ReactNode;
  
  // Behavior
  hideControlsDelay?: number;
  loop?: boolean;
  muted?: boolean;
  seekAmount?: number;
  
  // Custom CSS classes
  funcss?: string;
  containerCss?: string;
  videoCss?: string;
  controlsCss?: string;
  progressCss?: string;
  progressBarCss?: string;
  timeCss?: string;
  playCss?: string;
  pauseCss?: string;
  volumeCss?: string;
  fullscreenCss?: string;
  downloadCss?: string;
  rewindCss?: string;
  forwardCss?: string;
  buttonCss?: string;
  style?: React.CSSProperties;

  // Volume display style
  volumeStyle?: 'slider' | 'compact' | 'hover';

  // Variant support
  variant?: string;
}

export default function Video({
  src,
  poster,
  onDuration,
  onEnded,
  isPause,
  spacebarPlay,
  className = '',
  autoPlay,
  showControls,
  showPlayPause,
  showProgress,
  showVolume,
  showTime,
  showFullscreen,
  showDownload,
  showSeekButtons,
  playIcon,
  pauseIcon,
  fullscreenIcon,
  downloadIcon,
  volumeIcon,
  muteIcon,
  rewindIcon,
  forwardIcon,
  hideControlsDelay,
  loop,
  muted,
  seekAmount,
  funcss = '',
  containerCss = '',
  videoCss = '',
  controlsCss = '',
  progressCss = '',
  progressBarCss = '',
  timeCss = '',
  playCss = '',
  pauseCss = '',
  volumeCss = '',
  fullscreenCss = '',
  downloadCss = '',
  rewindCss = '',
  forwardCss = '',
  buttonCss = '',
  volumeStyle = 'slider',
  style,
  variant = '',
  ...rest
}: VideoProps) {
  const { mergeWithLocal } = useComponentConfiguration('Video', variant);

  // Create local props object - these will override config props
  const localProps = {
    src,
    poster,
    onDuration,
    onEnded,
    isPause,
    spacebarPlay,
    className,
    autoPlay,
    showControls,
    showPlayPause,
    showProgress,
    showVolume,
    showTime,
    showFullscreen,
    showDownload,
    showSeekButtons,
    playIcon,
    pauseIcon,
    fullscreenIcon,
    downloadIcon,
    volumeIcon,
    muteIcon,
    rewindIcon,
    forwardIcon,
    hideControlsDelay,
    loop,
    muted,
    seekAmount,
    funcss,
    containerCss,
    videoCss,
    controlsCss,
    progressCss,
    progressBarCss,
    timeCss,
    playCss,
    pauseCss,
    volumeCss,
    fullscreenCss,
    downloadCss,
    rewindCss,
    forwardCss,
    buttonCss,
    volumeStyle,
    style,
    ...rest,
  };

  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Extract final values - local props take precedence
  const final = {
    src: mergedProps.src,
    poster: mergedProps.poster,
    onDuration: mergedProps.onDuration,
    onEnded: mergedProps.onEnded,
    isPause: mergedProps.isPause,
    spacebarPlay: mergedProps.spacebarPlay ?? true,
    className: mergedProps.className ?? '',
    autoPlay: mergedProps.autoPlay ?? false,
    showControls: mergedProps.showControls ?? true,
    showPlayPause: mergedProps.showPlayPause ?? true,
    showProgress: mergedProps.showProgress ?? true,
    showVolume: mergedProps.showVolume ?? true,
    showTime: mergedProps.showTime ?? true,
    showFullscreen: mergedProps.showFullscreen ?? true,
    showDownload: mergedProps.showDownload ?? false,
    showSeekButtons: mergedProps.showSeekButtons ?? false,
    playIcon: mergedProps.playIcon,
    pauseIcon: mergedProps.pauseIcon,
    fullscreenIcon: mergedProps.fullscreenIcon,
    downloadIcon: mergedProps.downloadIcon,
    volumeIcon: mergedProps.volumeIcon,
    muteIcon: mergedProps.muteIcon,
    rewindIcon: mergedProps.rewindIcon,
    forwardIcon: mergedProps.forwardIcon,
    hideControlsDelay: mergedProps.hideControlsDelay ?? 3000,
    loop: mergedProps.loop ?? false,
    muted: mergedProps.muted ?? false,
    seekAmount: mergedProps.seekAmount ?? 10,
    funcss: mergedProps.funcss ?? '',
    containerCss: mergedProps.containerCss ?? '',
    videoCss: mergedProps.videoCss ?? '',
    controlsCss: mergedProps.controlsCss ?? '',
    progressCss: mergedProps.progressCss ?? '',
    progressBarCss: mergedProps.progressBarCss ?? '',
    timeCss: mergedProps.timeCss ?? '',
    playCss: mergedProps.playCss ?? '',
    pauseCss: mergedProps.pauseCss ?? '',
    volumeCss: mergedProps.volumeCss ?? '',
    fullscreenCss: mergedProps.fullscreenCss ?? '',
    downloadCss: mergedProps.downloadCss ?? '',
    rewindCss: mergedProps.rewindCss ?? '',
    forwardCss: mergedProps.forwardCss ?? '',
    buttonCss: mergedProps.buttonCss ?? '',
    volumeStyle: mergedProps.volumeStyle ?? 'slider',
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(final.muted ? 0 : 1);
  const [isMuted, setIsMuted] = useState(final.muted);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControlsState, setShowControlsState] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isHoveringProgress, setIsHoveringProgress] = useState(false);
  const [isHoveringVolume, setIsHoveringVolume] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Dynamic icon states
  const [dynamicPlayIcon, setDynamicPlayIcon] = useState<ReactNode>(null);
  const [dynamicPauseIcon, setDynamicPauseIcon] = useState<ReactNode>(null);
  const [dynamicFullscreenIcon, setDynamicFullscreenIcon] = useState<ReactNode>(null);
  const [dynamicDownloadIcon, setDynamicDownloadIcon] = useState<ReactNode>(null);
  const [dynamicVolumeIcon, setDynamicVolumeIcon] = useState<ReactNode>(null);
  const [dynamicMuteIcon, setDynamicMuteIcon] = useState<ReactNode>(null);
  const [dynamicRewindIcon, setDynamicRewindIcon] = useState<ReactNode>(null);
  const [dynamicForwardIcon, setDynamicForwardIcon] = useState<ReactNode>(null);

  // Helper function to load dynamic icons
  const loadDynamicIcon = async (iconProp: string | ReactNode | undefined, setter: (icon: ReactNode) => void, defaultIcon: ReactNode) => {
    if (!iconProp) {
      setter(defaultIcon);
      return;
    }

    if (typeof iconProp === 'string') {
      const iconNode = await getDynamicIcon(iconProp);
      setter(iconNode || defaultIcon);
    } else {
      setter(iconProp);
    }
  };

  // Load all dynamic icons
  useEffect(() => {
    const loadIcons = async () => {
      await Promise.all([
        loadDynamicIcon(final.playIcon, setDynamicPlayIcon, <PiPlay size={20} />),
        loadDynamicIcon(final.pauseIcon, setDynamicPauseIcon, <PiPause size={20} />),
        loadDynamicIcon(final.fullscreenIcon, setDynamicFullscreenIcon, <PiCornersOut size={18} />),
        loadDynamicIcon(final.downloadIcon, setDynamicDownloadIcon, <TfiDownload size={16} />),
        loadDynamicIcon(final.volumeIcon, setDynamicVolumeIcon, <PiSpeakerHigh size={18} />),
        loadDynamicIcon(final.muteIcon, setDynamicMuteIcon, <PiSpeakerSlash size={18} />),
        loadDynamicIcon(final.rewindIcon, setDynamicRewindIcon, <TfiControlBackward size={16} />),
        loadDynamicIcon(final.forwardIcon, setDynamicForwardIcon, <TfiControlForward size={16} />),
      ]);
    };

    loadIcons();
  }, [
    final.playIcon, final.pauseIcon, final.fullscreenIcon, final.downloadIcon, 
    final.volumeIcon, final.muteIcon, final.rewindIcon, final.forwardIcon
  ]);

  // Helper function to render icon
  const renderIcon = (icon: ReactNode, defaultSize: number = 16) => {
    if (!icon) return null;
    
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { 
        size: (icon.props as any).size || defaultSize 
      } as any);
    }
    
    return icon;
  };

  // Play/Pause functionality
  const playVideo = () => {
    const video = videoRef.current;
    if (video) {
      if (video.currentTime === video.duration) {
        video.currentTime = 0;
      }
      video.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(console.error);
    }
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (video && !video.paused) {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handlePlayPauseToggle = () => {
    isPlaying ? pauseVideo() : playVideo();
  };

  // Click handlers for different video areas
  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    
    const leftArea = width * 0.3;
    const rightArea = width * 0.7;

    if (clickX < leftArea) {
      handleSeek(-final.seekAmount);
    } else if (clickX > rightArea) {
      handleSeek(final.seekAmount);
    } else {
      handlePlayPauseToggle();
    }
  };

  // Seek functionality
  const handleSeek = (seconds: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, duration));
    }
  };

  const handleRewind = () => handleSeek(-final.seekAmount);
  const handleForward = () => handleSeek(final.seekAmount);

  // Fullscreen functionality
  const handleToggleFullScreen = () => {
    const element = containerRef.current;
    if (!element) return;
    
    if (!document.fullscreenElement) {
      element.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Volume functionality
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
      if (newMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        if (videoRef.current) videoRef.current.volume = 1;
      }
    }
  };

  // Progress functionality
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  // Time update animation
  const updateCurrentTime = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    }
  }, []);

  // Event handlers
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration || 0);
      final.onDuration?.(video.duration);
      if (final.autoPlay) {
        video.muted = true;
        video.play().then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        }).catch(console.error);
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    final.onEnded?.();
    if (final.loop && videoRef.current) {
      videoRef.current.currentTime = 0;
      playVideo();
    }
  };

  // Effects
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => 
      handleKeyDown(e, isPlaying, playVideo, pauseVideo, final.spacebarPlay);
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isPlaying, final.spacebarPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('ended', handleVideoEnd);
    return () => video.removeEventListener('ended', handleVideoEnd);
  }, [final.loop, final.onEnded]);

  useEffect(() => {
    if (final.isPause) pauseVideo();
  }, [final.isPause]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Controls visibility with hover
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const show = () => {
      setShowControlsState(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowControlsState(false);
        setShowVolumeSlider(false);
      }, final.hideControlsDelay);
    };

    const hide = () => {
      setShowControlsState(false);
      setShowVolumeSlider(false);
    };

    const container = containerRef.current;
    if (container && final.showControls) {
      container.addEventListener('mouseenter', show);
      container.addEventListener('mouseleave', hide);
      container.addEventListener('mousemove', show);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', show);
        container.removeEventListener('mouseleave', hide);
        container.removeEventListener('mousemove', show);
      }
      clearTimeout(timer);
    };
  }, [final.showControls, final.hideControlsDelay]);

  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, updateCurrentTime]);

  // Get volume icon based on volume level
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return renderIcon(dynamicMuteIcon, 18);
    } else if (volume < 0.5) {
      return <PiSpeakerNone size={18} />;
    } else {
      return renderIcon(dynamicVolumeIcon, 18);
    }
  };

  // Simple Progress Bar Component (YouTube style)
  const ProgressBar = () => (
    <div className="progress-container">
      <div className="progress-wrapper">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          className={`video-progress ${final.progressCss}`}
          style={{
            '--progress-percent': `${(currentTime / duration) * 100}%`,
          } as React.CSSProperties}
          onMouseEnter={() => setIsHoveringProgress(true)}
          onMouseLeave={() => setIsHoveringProgress(false)}
        />
      </div>
    </div>
  );

  // Volume Control Component with different styles
  const VolumeControl = () => {
    if (final.volumeStyle === 'hover') {
      return (
        <div className="volume-control-wrapper relative">
          <ToolTip>
            <div 
              onClick={handleToggleMute}
              onMouseEnter={() => setShowVolumeSlider(true)}
              className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
            >
              {getVolumeIcon()}
            </div>
            <Tip tip="top" content={isMuted ? "Unmute" : "Mute"} />
          </ToolTip>
          
          {showVolumeSlider && (
            <div 
              className="volume-slider-wrapper absolute bottom-full left-0 mb-2 p-2 bg-black bg-opacity-80 rounded-lg backdrop-blur-sm"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider vertical"
                style={{
                  '--volume-percent': `${volume * 100}%`,
                } as React.CSSProperties}
              />
            </div>
          )}
        </div>
      );
    }

    if (final.volumeStyle === 'compact') {
      return (
        <div className="volume-control-wrapper">
          <ToolTip>
            <div 
              onClick={handleToggleMute}
              className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
            >
              {getVolumeIcon()}
            </div>
            <Tip tip="top" content={isMuted ? "Unmute" : "Mute"} />
          </ToolTip>
        </div>
      );
    }

    // Default slider style
    return (
      <div className="volume-control-wrapper">
        <ToolTip>
          <div 
            onClick={handleToggleMute}
            className={`volume-toggle ${final.buttonCss} ${final.volumeCss} pointer`}
          >
            {getVolumeIcon()}
          </div>
          <Tip tip="top" content={isMuted ? "Unmute" : "Mute"} />
        </ToolTip>
        
        <div className="volume-slider-wrapper">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            style={{
              '--volume-percent': `${volume * 100}%`,
            } as React.CSSProperties}
          />
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`video_container fit ${final.funcss} ${final.containerCss} ${final.className}`}
      onClick={handleVideoClick}
    >
      {/* Poster */}
      {final.poster && !hasStarted && !isPlaying && (
        <div
          style={{ backgroundImage: `url(${final.poster})` }}
          className="video_poster"
        />
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        preload="auto"
        autoPlay={final.autoPlay}
        style={style}
        src={final.src}
        className={`video_player fit min-w-200 ${final.videoCss}`}
        onLoadedMetadata={handleLoadedMetadata}
        playsInline
        controls={false}
        loop={final.loop}
        muted={final.muted}
      />

      {/* Controls Overlay */}
      {final.showControls && (
        <div 
          className={`video_controls ${final.controlsCss} ${
            showControlsState ? 'show_controls' : 'hide_controls'
          }`}
        >
       

          {/* Bottom Controls Row */}
          <RowFlex 
            gap={1} 
            justify="space-between" 
            alignItems="center"
            className="controls-row"
          >
            {/* Left Controls */}
            <RowFlex gap={0.5} alignItems="center" funcss='videoLeftContainer'>
              {/* Play/Pause */}
              {final.showPlayPause && (
                <ToolTip>
                  <div 
                    onClick={handlePlayPauseToggle}
                    className={`${final.buttonCss} ${isPlaying ? final.pauseCss : final.playCss} pointer`}
                  >
                    {isPlaying 
                      ? renderIcon(dynamicPauseIcon, 20)
                      : renderIcon(dynamicPlayIcon, 20)
                    }
                  </div>
                  <Tip tip="top" content={isPlaying ? "Pause" : "Play"} />
                </ToolTip>
              )}

              {/* Seek Buttons */}
              {final.showSeekButtons && (
                <>
                  <ToolTip>
                    <div
                      onClick={handleRewind}
                      className={`${final.buttonCss} ${final.rewindCss} pointer`}
                    >
                      {renderIcon(dynamicRewindIcon, 16)}
                    </div>
                    <Tip tip="top" content={`${final.seekAmount}s Back`} />
                  </ToolTip>

                  <ToolTip>
                    <div 
                      onClick={handleForward}
                      className={`${final.buttonCss} ${final.forwardCss} pointer`}
                    >
                      {renderIcon(dynamicForwardIcon, 16)}
                    </div>
                    <Tip tip="top" content={`${final.seekAmount}s Forward`} />
                  </ToolTip>
                </>
              )}

              {/* Volume Control */}
              {final.showVolume && <VolumeControl />}

              {/* Time Display */}
              {final.showTime && (
                <div className={`video_time ${final.timeCss}`}>
                  <Text 
                    text={`${formatTime(currentTime)} / ${formatTime(duration)}`} 
                    size="xs" 
                  />
                </div>
              )}
            </RowFlex>
            <div className="col w-full ">
              <div className='videoProgressContainer'>
          {final.showProgress && <ProgressBar />}
          </div>
            </div>

            {/* Right Controls */}
            <RowFlex gap={0.3} funcss='videoRightContainer'>
              {/* Fullscreen */}
              {final.showFullscreen && (
                <ToolTip>
                  <div 
                    onClick={handleToggleFullScreen}
                    className={`${final.buttonCss} ${final.fullscreenCss} pointer`}
                  >
                    {renderIcon(dynamicFullscreenIcon, 18)}
                  </div>
                  <Tip tip="top" content="Fullscreen" />
                </ToolTip>
              )}

              {/* Download */}
              {final.showDownload && (
                <ToolTip>
                  <div 
                    onClick={() => window.open(final.src, '_blank')}
                    className={`${final.buttonCss} ${final.downloadCss} pointer`}
                  >
                    {renderIcon(dynamicDownloadIcon, 16)}
                  </div>
                  <Tip tip="top" content="Download" />
                </ToolTip>
              )}
            </RowFlex>
          </RowFlex>
        </div>
      )}
    </div>
  );
}