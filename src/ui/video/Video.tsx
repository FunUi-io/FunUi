
'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  PiCornersOut,
} from 'react-icons/pi';
import Text from '../text/Text';
import RowFlex from '../specials/RowFlex';
import ToolTip from '../tooltip/ToolTip';
import Circle from '../specials/Circle';
import Tip from '../tooltip/Tip';
import {TfiControlBackward , TfiControlForward , TfiControlPlay , TfiControlPause , TfiDownload  , TfiVolume   } from "react-icons/tfi";

import { formatTime, getBufferedPercent } from './videoFunctions';
import { handleKeyDown } from './videoShortcuts';

interface VideoProps {
  src: string;
  poster?: string;
  onDuration?: (duration: number) => void;
  isPause?: boolean;
  spacebarPlay?: boolean;
  className?: string;
  autoPlay?: boolean;
}

export default function Video({ src, poster, onDuration, isPause, className, autoPlay , spacebarPlay = true, ...rest }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);



  const handleVideoEnd = () => {
  setIsPlaying(false);
  setCurrentTime(duration); // optional
};

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  video.addEventListener('ended', handleVideoEnd);
  return () => {
    video.removeEventListener('ended', handleVideoEnd);
  };
}, [duration]);


const playVideo = () => {
  const video = videoRef.current;
  if (video) {
    // ✅ if video ended, reset it to start
    if (video.currentTime === video.duration) {
      video.currentTime = 0;
    }

    video.play().then(() => {
      setIsPlaying(true);
      setHasStarted(true);
    }).catch(() => {});
  }
};

const pauseVideo = () => {
  const video = videoRef.current;
  if (video && !video.paused) {
    video.pause();
    setIsPlaying(false);
  }
};



  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => handleKeyDown(e, isPlaying, playVideo, pauseVideo, spacebarPlay);
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isPlaying]);

  const handlePlayPauseToggle = () => {
    isPlaying ? pauseVideo() : playVideo();
  };

  const handleRewind = () => {
    const video = videoRef.current;
    if (video) video.currentTime = Math.max(video.currentTime - 10, 0);
  };

  const handleForward = () => {
    const video = videoRef.current;
    if (video) video.currentTime = Math.min(video.currentTime + 10, duration);
  };

  const handleToggleFullScreen = () => {
    const element = containerRef.current;
    if (!element) return;
    if (!document.fullscreenElement) {
      element.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const updateCurrentTime = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    }
  }, []);

const handleLoadedMetadata = () => {
  const video = videoRef.current;
  if (video) {
    setDuration(video.duration || 0);
    onDuration?.(video.duration);
    if (autoPlay) {
      video.play().then(() => {
        setIsPlaying(true); // ✅ update UI state
        setHasStarted(true);
      }).catch(() => {});
    }
  }
};


useEffect(() => {
  if (autoPlay && videoRef.current) {
    videoRef.current.muted = true; // ✅ important for autoplay to work
    videoRef.current.play().then(() => {
      setIsPlaying(true);
      setHasStarted(true);
    }).catch((err) => {
      console.warn('Autoplay failed', err);
    });
  }
}, [autoPlay]);


  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(videoRef.current){
      videoRef.current.muted = false; 
    }
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
  };

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [autoPlay]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPause) pauseVideo();
  }, [isPause]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current?.contains(e.target as Node)) {
        setIsMouseMoving(true);
        clearTimeout(timer);
        timer = setTimeout(() => setIsMouseMoving(false), 2000);
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

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

  useEffect(() => {
    return () => {
      pauseVideo();
    };
  }, []);


  useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const onEnd = () => {
    setIsPlaying(false);
  };

  video.addEventListener('ended', onEnd);
  return () => video.removeEventListener('ended', onEnd);
}, []);


  return (
    <div ref={containerRef} className={`video_container fit ${className || ''}`} id="fun_video_container">
      {poster && !hasStarted && !isPlaying && (
        <div
          style={{ backgroundImage: `url(${poster})` }}
          className="video_poster"
        />
      )}
      <video
        ref={videoRef}
        preload="auto"
        src={src}
        className="video_player fit min-w-200"
        onClick={handlePlayPauseToggle}
        onLoadedMetadata={handleLoadedMetadata}
        playsInline
        controls={false}
        {...rest}
      />

      <div className={`video_controls ${isMouseMoving ? 'show_controls' : 'hide_controls'}`}>
        <div className=" animated fade-in pr-5 pl-5">
          <RowFlex gap={0.3} funcss='mb-2' alignItems="center">
         
            <div className="col width-100-p">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleProgressBarChange}
                className="width-100-p videoSlider styled-slider m-0"
                aria-label="Progress bar"
                style={{ '--progress': `${(currentTime / duration) * 100}` } as React.CSSProperties}
              />
            </div>
           
          </RowFlex>
        </div>

        <div className="_center-play-icon animated fade-in" onClick={handlePlayPauseToggle}>
          <div className='_play-button'>
            {isPlaying ? <TfiControlPause  size={50} /> : <TfiControlPlay  size={50} />}
          </div>
        </div>

        <RowFlex funcss='animated slide-up pr-5 pl-5' gap={1} justify="space-between">
          <RowFlex gap={0.5}>
             <div className="hide-small">
               <Circle bordered size={2.5} onClick={handlePlayPauseToggle}>
            {isPlaying ? <TfiControlPause  size={20} /> : <TfiControlPlay  size={20} />}
              </Circle>
             </div>
           
            <ToolTip>
              <Circle bordered size={2.5} onClick={handleRewind}><TfiControlBackward  /></Circle>
              <Tip tip="right" animation="ScaleUp" duration={0.5} content="10 sec Back" />
            </ToolTip>

            <ToolTip>
              <Circle bordered size={2.5} onClick={handleForward}><TfiControlForward /></Circle>
              <Tip tip="right" animation="ScaleUp" duration={0.5} content="10 sec Forward" />
            </ToolTip>

            <div onMouseEnter={() => setShowVolume(true)} onMouseLeave={() => setShowVolume(false)}>
              <RowFlex>
                <Circle bordered size={2.5}><TfiVolume  /></Circle>
                {showVolume && (
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="width-100 max-w-50 animated slide-right"
                    style={{ height: '3px', marginLeft: 8 }}
                    aria-label="Volume"
                  />
                )}
              </RowFlex>
            </div>
               <div className='video_time'>
             <Text text={formatTime(currentTime)} funcss='m-0' size="sm"  />
             / 
            <Text text={`${formatTime(duration - currentTime)}`} funcss='m-0' size="sm"  />
           </div>
          </RowFlex>

          <RowFlex gap={0.3}>
            <ToolTip>
              <Circle bordered size={2.5} onClick={handleToggleFullScreen}><PiCornersOut /></Circle>
              <Tip tip="left" animation="ScaleUp" duration={0.5} content="Expand" />
            </ToolTip>

            <ToolTip>
              <Circle bordered size={2.5} onClick={() => window.open(src || '', '_blank')}>
                <TfiDownload  />
              </Circle>
              <Tip tip="left" animation="ScaleUp" duration={0.5} content="Download" />
            </ToolTip>
          </RowFlex>
        </RowFlex>
      </div>
    </div>
  );
}