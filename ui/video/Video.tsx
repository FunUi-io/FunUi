
'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  PiCornersOut,
  PiFastForward,
  PiPause,
  PiPlay,
  PiRewind,
  PiSpeakerLow,
} from 'react-icons/pi';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import Text from '../text/Text';
import RowFlex from '../specials/RowFlex';
import ToolTip from '../tooltip/ToolTip';
import Circle from '../specials/Circle';
import Tip from '../tooltip/Tip';
import Image from 'next/image';

import { formatTime, getBufferedPercent } from './videoFunctions';
import { handleKeyDown } from './videoShortcuts';

interface VideoProps {
  src: string;
  poster?: string;
  onDuration?: (duration: number) => void;
  isPause?: boolean;
  className?: string;
  autoPlay?: boolean;
}

export default function Video({ src, poster, onDuration, isPause, className, autoPlay , ...rest }: VideoProps) {
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

  const playVideo = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
      setHasStarted(true);
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
    const handleKey = (e: KeyboardEvent) => handleKeyDown(e, isPlaying, playVideo, pauseVideo);
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
        playVideo();
      }
    }
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className="w-80-p center animated fade-in">
          <RowFlex gap={0.3} funcss="padding-5" alignItems="center">
           <div className='video_time'>
             <Text text={formatTime(currentTime)} funcss='m-0' size="sm"  />
           </div>
            <div className="col width-100-p">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleProgressBarChange}
                className="width-100-p styled-slider m-0"
                aria-label="Progress bar"
                style={{ '--progress': `${(currentTime / duration) * 100}` } as React.CSSProperties}
              />
            </div>
            <div className="video_time">
            <Text text={`-${formatTime(duration - currentTime)}`} funcss='m-0' size="sm"  />
            </div>
          </RowFlex>
        </div>

        <div className="center-play-icon animated fade-in" onClick={handlePlayPauseToggle}>
          <div className='play-button'>
            {isPlaying ? <PiPause size={30} /> : <PiPlay size={30} />}
          </div>
        </div>

        <RowFlex funcss='animated slide-up' gap={1} justify="center">
          <RowFlex gap={0.5}>
            <ToolTip>
              <Circle bordered size={2} onClick={handleRewind}><PiRewind /></Circle>
              <Tip tip="top" animation="ScaleUp" duration={0.5} content="10 sec Back" />
            </ToolTip>

            <ToolTip>
              <Circle bordered size={2} onClick={handleForward}><PiFastForward /></Circle>
              <Tip tip="top" animation="ScaleUp" duration={0.5} content="10 sec Forward" />
            </ToolTip>

            <div onMouseEnter={() => setShowVolume(true)} onMouseLeave={() => setShowVolume(false)}>
              <RowFlex>
                <Circle bordered size={2}><PiSpeakerLow /></Circle>
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
          </RowFlex>

          <RowFlex gap={0.3}>
            <ToolTip>
              <Circle bordered size={2} onClick={handleToggleFullScreen}><PiCornersOut /></Circle>
              <Tip tip="top" animation="ScaleUp" duration={0.5} content="Expand" />
            </ToolTip>

            <ToolTip>
              <Circle bordered size={2} onClick={() => window.open(src || '', '_blank')}>
                <IoCloudDownloadOutline />
              </Circle>
              <Tip tip="top" animation="ScaleUp" duration={0.5} content="Download" />
            </ToolTip>
          </RowFlex>
        </RowFlex>
      </div>
    </div>
  );
}