"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var ToolTip_1 = __importDefault(require("../tooltip/ToolTip"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Text_1 = __importDefault(require("../text/Text"));
var Tip_1 = __importDefault(require("../tooltip/Tip"));
function Video(_a) {
    var src = _a.src, autoPlay = _a.autoPlay, onDuration = _a.onDuration;
    var videoRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(autoPlay), isPlaying = _b[0], setIsPlaying = _b[1];
    var _c = (0, react_1.useState)(0), currentTime = _c[0], setCurrentTime = _c[1];
    var _d = (0, react_1.useState)(0), duration = _d[0], setDuration = _d[1];
    var _e = (0, react_1.useState)(1), volume = _e[0], setVolume = _e[1];
    var _f = (0, react_1.useState)(false), isFullScreen = _f[0], setIsFullScreen = _f[1];
    var _g = (0, react_1.useState)(false), showVolume = _g[0], setShowVolume = _g[1];
    (0, react_1.useEffect)(function () {
        if (!videoRef.current)
            return;
        var handleTimeUpdate = function () {
            setCurrentTime(videoRef.current.currentTime);
        };
        var handleDurationChange = function () {
            var newDuration = videoRef.current.duration;
            setDuration(newDuration);
            onDuration && onDuration(newDuration);
        };
        videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
        videoRef.current.addEventListener('durationchange', handleDurationChange);
        return function () {
            var _a, _b;
            (_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('timeupdate', handleTimeUpdate);
            (_b = videoRef.current) === null || _b === void 0 ? void 0 : _b.removeEventListener('durationchange', handleDurationChange);
        };
    }, [onDuration]);
    var formatTime = function (time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        return "".concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0'));
    };
    var handlePlay = function () {
        var _a;
        (_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.play();
        setIsPlaying(true);
    };
    var handlePause = function () {
        var _a;
        (_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.pause();
        setIsPlaying(false);
    };
    var handleStop = function () {
        var _a;
        (_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
    };
    var handleRewind = function () {
        if (videoRef.current)
            videoRef.current.currentTime -= 10; // Rewind 10 seconds
    };
    var handleForward = function () {
        if (videoRef.current)
            videoRef.current.currentTime += 10; // Forward 10 seconds
    };
    var handleToggleFullScreen = function () {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            }
            else if (videoRef.current.mozRequestFullScreen) {
                videoRef.current.mozRequestFullScreen();
            }
            else if (videoRef.current.webkitRequestFullscreen) {
                videoRef.current.webkitRequestFullscreen();
            }
            else if (videoRef.current.msRequestFullscreen) {
                videoRef.current.msRequestFullscreen();
            }
            setIsFullScreen(true);
        }
    };
    //   const handleExitFullScreen = () => {
    //     if (document.exitFullscreen) {
    //       document.exitFullscreen();
    //     } else if (document.mozCancelFullScreen) {
    //       document.mozCancelFullScreen();
    //     } else if (document.webkitExitFullscreen) {
    //       document.webkitExitFullscreen();
    //     } else if (document.msExitFullscreen) {
    //       document.msExitFullscreen();
    //     }
    //     setIsFullScreen(false);
    //   };
    var handleProgressBarChange = function (e) {
        var newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (videoRef.current)
            videoRef.current.currentTime = newTime;
    };
    var handleVolumeChange = function (e) {
        var newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current)
            videoRef.current.volume = newVolume;
    };
    var timePlayed = formatTime(currentTime);
    var timeLeft = formatTime(duration - currentTime);
    return (react_1.default.createElement("div", { className: "vide_container" },
        react_1.default.createElement("video", { ref: videoRef, autoPlay: autoPlay, src: src, className: "fit" }),
        react_1.default.createElement("div", { className: "video_controls", onDoubleClick: isPlaying ? handlePause : handlePlay },
            react_1.default.createElement(RowFlex_1.default, { gap: 0.3, funcss: "padding-5" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(Text_1.default, { text: timePlayed, size: "small", bold: true })),
                react_1.default.createElement("div", { className: "col width-100-p" },
                    react_1.default.createElement("input", { type: "range", min: 0, max: duration, value: currentTime, className: "width-100-p", style: { height: "3px" }, onChange: handleProgressBarChange })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(Text_1.default, { text: timeLeft, size: "small", bold: true }))),
            react_1.default.createElement("div", { className: "margin-top-5" }),
            react_1.default.createElement(RowFlex_1.default, { gap: 1, justify: "space-between" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(RowFlex_1.default, { gap: 0.5 },
                        react_1.default.createElement(ToolTip_1.default, null,
                            react_1.default.createElement("div", { className: "width-30 height-30 pointer padding-5", onClick: isPlaying ? handlePause : handlePlay }, isPlaying ? react_1.default.createElement(pi_1.PiPause, null) : react_1.default.createElement(pi_1.PiPlay, null)),
                            react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: isPlaying ? "Pause" : "Play" })),
                        react_1.default.createElement(ToolTip_1.default, null,
                            react_1.default.createElement("div", { className: "width-30 height-30 pointer padding-5", onClick: handleRewind },
                                react_1.default.createElement(pi_1.PiRewind, null)),
                            react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: "10 sec Back" })),
                        react_1.default.createElement(ToolTip_1.default, null,
                            react_1.default.createElement("div", { className: "width-30 height-30 pointer padding-5", onClick: handleForward },
                                react_1.default.createElement(pi_1.PiFastForward, null)),
                            react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: "10 sec Forward" })),
                        react_1.default.createElement("div", { onMouseEnter: function () { return setShowVolume(true); }, onMouseLeave: function () { return setShowVolume(false); } },
                            react_1.default.createElement(RowFlex_1.default, null,
                                react_1.default.createElement(ToolTip_1.default, null,
                                    react_1.default.createElement("div", { className: "width-30 height-30 pointer padding-5" },
                                        react_1.default.createElement(pi_1.PiSpeakerLow, null)),
                                    react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: "Volume" })),
                                showVolume &&
                                    react_1.default.createElement("input", { type: "range", min: 0, max: 1, step: 0.01, value: volume, className: "width-100", style: { height: "3px" }, onChange: handleVolumeChange }))))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(RowFlex_1.default, { gap: 0.3 },
                        react_1.default.createElement(ToolTip_1.default, null,
                            react_1.default.createElement("div", { className: "width-30 height-30 pointer padding-5", onClick: handleToggleFullScreen },
                                react_1.default.createElement(pi_1.PiCornersOut, null)),
                            react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: "Expand" })),
                        react_1.default.createElement(ToolTip_1.default, null,
                            react_1.default.createElement("div", { className: "width-30 height-30 pointer padding-5", onClick: function () { window.open(src || "", '_blank'); } },
                                react_1.default.createElement(pi_1.PiDownload, null)),
                            react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: "Download" }))))))));
}
exports.default = Video;
