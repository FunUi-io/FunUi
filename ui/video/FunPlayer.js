"use strict";
// import React, { useState, useRef, useEffect } from 'react';
// import { PiCornersOut, PiDownload, PiFastForward, PiFileAudio, PiPause, PiPlay, PiRewind, PiSpeakerHifi, PiSpeakerLow } from 'react-icons/pi';
// import ToolTip from "../tooltip/ToolTip"
// import RowFlex from '../specials/RowFlex';
// import Button from '../button/Button'
// import Text from '../text/Text'
// import Tip from '../tooltip/Tip'
// interface VideoProps {
//   src: string;
//   autoPlay: boolean;
//   onDuration?: (duration: number) => void;
// }
// export default function Video({ src, autoPlay, onDuration }: VideoProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
//   const [currentTime, setCurrentTime] = useState<number>(0);
//   const [duration, setDuration] = useState<number>(0);
//   const [volume, setVolume] = useState<number>(1);
//   const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
//   const [showVolume, setShowVolume] = useState<boolean>(false);
//   useEffect(() => {
//     if (!videoRef.current) return;
//     const handleTimeUpdate = () => {
//       setCurrentTime(videoRef.current.currentTime);
//     };
//     const handleDurationChange = () => {
//       const newDuration = videoRef.current.duration;
//       setDuration(newDuration);
//       onDuration && onDuration(newDuration);
//     };
//     videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
//     videoRef.current.addEventListener('durationchange', handleDurationChange);
//     return () => {
//       videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
//       videoRef.current?.removeEventListener('durationchange', handleDurationChange);
//     };
//   }, [onDuration]);
//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };
//   const handlePlay = () => {
//     videoRef.current?.play();
//     setIsPlaying(true);
//   };
//   const handlePause = () => {
//     videoRef.current?.pause();
//     setIsPlaying(false);
//   };
//   const handleStop = () => {
//     videoRef.current?.pause();
//     videoRef.current.currentTime = 0;
//     setIsPlaying(false);
//   };
//   const handleRewind = () => {
//     if (videoRef.current) videoRef.current.currentTime -= 10; // Rewind 10 seconds
//   };
//   const handleForward = () => {
//     if (videoRef.current) videoRef.current.currentTime += 10; // Forward 10 seconds
//   };
//   const handleToggleFullScreen = () => {
//     if (videoRef.current) {
//       if (videoRef.current.requestFullscreen) {
//         videoRef.current.requestFullscreen();
//       } else if (videoRef.current.mozRequestFullScreen) {
//         videoRef.current.mozRequestFullScreen();
//       } else if (videoRef.current.webkitRequestFullscreen) {
//         videoRef.current.webkitRequestFullscreen();
//       } else if (videoRef.current.msRequestFullscreen) {
//         videoRef.current.msRequestFullscreen();
//       }
//       setIsFullScreen(true);
//     }
//   };
// //   const handleExitFullScreen = () => {
// //     if (document.exitFullscreen) {
// //       document.exitFullscreen();
// //     } else if (document.mozCancelFullScreen) {
// //       document.mozCancelFullScreen();
// //     } else if (document.webkitExitFullscreen) {
// //       document.webkitExitFullscreen();
// //     } else if (document.msExitFullscreen) {
// //       document.msExitFullscreen();
// //     }
// //     setIsFullScreen(false);
// //   };
//   const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTime = parseFloat(e.target.value);
//     setCurrentTime(newTime);
//     if (videoRef.current) videoRef.current.currentTime = newTime;
//   };
//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (videoRef.current) videoRef.current.volume = newVolume;
//   };
//   const timePlayed = formatTime(currentTime);
//   const timeLeft = formatTime(duration - currentTime);
//   return (
//     <div className="vide_container">
//       <video
//         ref={videoRef}
//         autoPlay={autoPlay}
//         src={src}
//         className="fit"
//       ></video>
//       <div className="video_controls" onDoubleClick={isPlaying ? handlePause : handlePlay}>
//         <RowFlex gap={0.3} funcss="padding-5">
//           <div>
//             <Text
//               text={timePlayed}
//               size="small"
//               bold
//             />
//           </div>
//           <div className="col width-100-p">
//             <input
//               type="range"
//               min={0}
//               max={duration}
//               value={currentTime}
//               className="width-100-p"
//               style={{ height: "3px" }}
//               onChange={handleProgressBarChange}
//             />
//           </div>
//           <div>
//             <Text
//               text={timeLeft}
//               size="small"
//               bold
//             />
//           </div>
//         </RowFlex>
//         <div className="margin-top-5"></div>
//         <RowFlex gap={1} justify="space-between">
//           <div>
//             <RowFlex gap={0.5}>
//               <ToolTip>
//                 <div className="width-30 height-30 pointer padding-5" onClick={isPlaying ? handlePause : handlePlay}>
//                   {isPlaying ? <PiPause /> : <PiPlay />}
//                 </div>
//                 <Tip tip="top" animation="ScaleUp" duration={0.5} content={isPlaying ? "Pause" : "Play"} />
//               </ToolTip>
//               <ToolTip>
//                 <div className="width-30 height-30 pointer padding-5" onClick={handleRewind}>
//                   <PiRewind />
//                 </div>
//                 <Tip tip="top" animation="ScaleUp" duration={0.5} content={"10 sec Back"} />
//               </ToolTip>
//               <ToolTip>
//                 <div className="width-30 height-30 pointer padding-5" onClick={handleForward}>
//                   <PiFastForward />
//                 </div>
//                 <Tip tip="top" animation="ScaleUp" duration={0.5} content={"10 sec Forward"} />
//               </ToolTip>
//               <div onMouseEnter={() => setShowVolume(true)} onMouseLeave={() => setShowVolume(false)}>
//                 <RowFlex >
//                   <ToolTip>
//                     <div className="width-30 height-30 pointer padding-5">
//                       <PiSpeakerLow />
//                     </div>
//                     <Tip tip="top" animation="ScaleUp" duration={0.5} content={"Volume"} />
//                   </ToolTip>
//                   {showVolume &&
//                     <input
//                       type="range"
//                       min={0}
//                       max={1}
//                       step={0.01}
//                       value={volume}
//                       className="width-100"
//                       style={{ height: "3px" }}
//                       onChange={handleVolumeChange}
//                     />
//                   }
//                 </RowFlex>
//               </div>
//             </RowFlex>
//           </div>
//           <div>
//             <RowFlex gap={0.3}>
//               <ToolTip>
//                 <div className="width-30 height-30 pointer padding-5" onClick={handleToggleFullScreen}>
//                   <PiCornersOut />
//                 </div>
//                 <Tip tip="top" animation="ScaleUp" duration={0.5} content={"Expand"} />
//               </ToolTip>
//               <ToolTip>
//                 <div className="width-30 height-30 pointer padding-5" onClick={() => { window.open(src || "", '_blank'); }}>
//                   <PiDownload />
//                 </div>
//                 <Tip tip="top" animation="ScaleUp" duration={0.5} content={"Download"} />
//               </ToolTip>
//             </RowFlex>
//           </div>
//         </RowFlex>
//       </div>
//     </div>
//   );
// }
