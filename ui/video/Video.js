"use strict";
'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Video;
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var io5_1 = require("react-icons/io5");
var Text_1 = __importDefault(require("../text/Text"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var ToolTip_1 = __importDefault(require("../tooltip/ToolTip"));
var Circle_1 = __importDefault(require("../specials/Circle"));
var Tip_1 = __importDefault(require("../tooltip/Tip"));
var videoFunctions_1 = require("./videoFunctions");
var videoShortcuts_1 = require("./videoShortcuts");
function Video(_a) {
    var src = _a.src, poster = _a.poster, onDuration = _a.onDuration, isPause = _a.isPause, className = _a.className, autoPlay = _a.autoPlay, rest = __rest(_a, ["src", "poster", "onDuration", "isPause", "className", "autoPlay"]);
    var videoRef = (0, react_1.useRef)(null);
    var containerRef = (0, react_1.useRef)(null);
    var animationFrameRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), isPlaying = _b[0], setIsPlaying = _b[1];
    var _c = (0, react_1.useState)(0), currentTime = _c[0], setCurrentTime = _c[1];
    var _d = (0, react_1.useState)(0), duration = _d[0], setDuration = _d[1];
    var _e = (0, react_1.useState)(1), volume = _e[0], setVolume = _e[1];
    var _f = (0, react_1.useState)(false), isFullScreen = _f[0], setIsFullScreen = _f[1];
    var _g = (0, react_1.useState)(false), showVolume = _g[0], setShowVolume = _g[1];
    var _h = (0, react_1.useState)(true), isMouseMoving = _h[0], setIsMouseMoving = _h[1];
    var _j = (0, react_1.useState)(false), hasStarted = _j[0], setHasStarted = _j[1];
    var handleVideoEnd = function () {
        setIsPlaying(false);
        setCurrentTime(duration); // optional
    };
    (0, react_1.useEffect)(function () {
        var video = videoRef.current;
        if (!video)
            return;
        video.addEventListener('ended', handleVideoEnd);
        return function () {
            video.removeEventListener('ended', handleVideoEnd);
        };
    }, [duration]);
    var playVideo = function () {
        var video = videoRef.current;
        if (video) {
            // ✅ if video ended, reset it to start
            if (video.currentTime === video.duration) {
                video.currentTime = 0;
            }
            video.play().then(function () {
                setIsPlaying(true);
                setHasStarted(true);
            }).catch(function () { });
        }
    };
    var pauseVideo = function () {
        var video = videoRef.current;
        if (video && !video.paused) {
            video.pause();
            setIsPlaying(false);
        }
    };
    (0, react_1.useEffect)(function () {
        var handleKey = function (e) { return (0, videoShortcuts_1.handleKeyDown)(e, isPlaying, playVideo, pauseVideo); };
        document.addEventListener('keydown', handleKey);
        return function () { return document.removeEventListener('keydown', handleKey); };
    }, [isPlaying]);
    var handlePlayPauseToggle = function () {
        isPlaying ? pauseVideo() : playVideo();
    };
    var handleRewind = function () {
        var video = videoRef.current;
        if (video)
            video.currentTime = Math.max(video.currentTime - 10, 0);
    };
    var handleForward = function () {
        var video = videoRef.current;
        if (video)
            video.currentTime = Math.min(video.currentTime + 10, duration);
    };
    var handleToggleFullScreen = function () {
        var _a, _b;
        var element = containerRef.current;
        if (!element)
            return;
        if (!document.fullscreenElement) {
            (_a = element.requestFullscreen) === null || _a === void 0 ? void 0 : _a.call(element);
        }
        else {
            (_b = document.exitFullscreen) === null || _b === void 0 ? void 0 : _b.call(document);
        }
    };
    var updateCurrentTime = (0, react_1.useCallback)(function () {
        var video = videoRef.current;
        if (video) {
            setCurrentTime(video.currentTime);
            animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
        }
    }, []);
    var handleLoadedMetadata = function () {
        var video = videoRef.current;
        if (video) {
            setDuration(video.duration || 0);
            onDuration === null || onDuration === void 0 ? void 0 : onDuration(video.duration);
            if (autoPlay) {
                video.play().then(function () {
                    setIsPlaying(true); // ✅ update UI state
                    setHasStarted(true);
                }).catch(function () { });
            }
        }
    };
    (0, react_1.useEffect)(function () {
        if (autoPlay && videoRef.current) {
            videoRef.current.muted = true; // ✅ important for autoplay to work
            videoRef.current.play().then(function () {
                setIsPlaying(true);
                setHasStarted(true);
            }).catch(function (err) {
                console.warn('Autoplay failed', err);
            });
        }
    }, [autoPlay]);
    var handleProgressBarChange = function (e) {
        var newTime = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };
    var handleVolumeChange = function (e) {
        if (videoRef.current) {
            videoRef.current.muted = false;
        }
        var newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current)
            videoRef.current.volume = newVolume;
    };
    (0, react_1.useEffect)(function () {
        if (autoPlay && videoRef.current) {
            var playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(function () { });
            }
        }
    }, [autoPlay]);
    (0, react_1.useEffect)(function () {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);
    (0, react_1.useEffect)(function () {
        if (isPause)
            pauseVideo();
    }, [isPause]);
    (0, react_1.useEffect)(function () {
        var handleFullscreenChange = function () {
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return function () { return document.removeEventListener('fullscreenchange', handleFullscreenChange); };
    }, []);
    (0, react_1.useEffect)(function () {
        var timer;
        var handleMouseMove = function (e) {
            var _a;
            if ((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
                setIsMouseMoving(true);
                clearTimeout(timer);
                timer = setTimeout(function () { return setIsMouseMoving(false); }, 2000);
            }
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchstart', handleMouseMove);
        return function () {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchstart', handleMouseMove);
            clearTimeout(timer);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        if (isPlaying) {
            animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
        }
        else if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        return function () {
            if (animationFrameRef.current)
                cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isPlaying, updateCurrentTime]);
    (0, react_1.useEffect)(function () {
        return function () {
            pauseVideo();
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var video = videoRef.current;
        if (!video)
            return;
        var onEnd = function () {
            setIsPlaying(false);
        };
        video.addEventListener('ended', onEnd);
        return function () { return video.removeEventListener('ended', onEnd); };
    }, []);
    return (react_1.default.createElement("div", { ref: containerRef, className: "video_container fit ".concat(className || ''), id: "fun_video_container" },
        poster && !hasStarted && !isPlaying && (react_1.default.createElement("div", { style: { backgroundImage: "url(".concat(poster, ")") }, className: "video_poster" })),
        react_1.default.createElement("video", __assign({ ref: videoRef, preload: "auto", src: src, className: "video_player fit min-w-200", onClick: handlePlayPauseToggle, onLoadedMetadata: handleLoadedMetadata, playsInline: true, controls: false }, rest)),
        react_1.default.createElement("div", { className: "video_controls ".concat(isMouseMoving ? 'show_controls' : 'hide_controls') },
            react_1.default.createElement("div", { className: "w-80-p center animated fade-in" },
                react_1.default.createElement(RowFlex_1.default, { gap: 0.3, funcss: 'mb-2', alignItems: "center" },
                    react_1.default.createElement("div", { className: 'video_time' },
                        react_1.default.createElement(Text_1.default, { text: (0, videoFunctions_1.formatTime)(currentTime), funcss: 'm-0', size: "sm" })),
                    react_1.default.createElement("div", { className: "col width-100-p" },
                        react_1.default.createElement("input", { type: "range", min: 0, max: duration, value: currentTime, onChange: handleProgressBarChange, className: "width-100-p videoSlider styled-slider m-0", "aria-label": "Progress bar", style: { '--progress': "".concat((currentTime / duration) * 100) } })),
                    react_1.default.createElement("div", { className: "video_time" },
                        react_1.default.createElement(Text_1.default, { text: "".concat((0, videoFunctions_1.formatTime)(duration - currentTime)), funcss: 'm-0', size: "sm" })))),
            react_1.default.createElement("div", { className: "center-play-icon animated fade-in", onClick: handlePlayPauseToggle },
                react_1.default.createElement("div", { className: 'play-button' }, isPlaying ? react_1.default.createElement(pi_1.PiPause, { size: 30 }) : react_1.default.createElement(pi_1.PiPlay, { size: 30 }))),
            react_1.default.createElement(RowFlex_1.default, { funcss: 'animated slide-up', gap: 1, justify: "center" },
                react_1.default.createElement(RowFlex_1.default, { gap: 0.5 },
                    react_1.default.createElement(ToolTip_1.default, null,
                        react_1.default.createElement(Circle_1.default, { bordered: true, size: 2, onClick: handleRewind },
                            react_1.default.createElement(pi_1.PiRewind, null)),
                        react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: "10 sec Back" })),
                    react_1.default.createElement(ToolTip_1.default, null,
                        react_1.default.createElement(Circle_1.default, { bordered: true, size: 2, onClick: handleForward },
                            react_1.default.createElement(pi_1.PiFastForward, null)),
                        react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: "10 sec Forward" })),
                    react_1.default.createElement("div", { onMouseEnter: function () { return setShowVolume(true); }, onMouseLeave: function () { return setShowVolume(false); } },
                        react_1.default.createElement(RowFlex_1.default, null,
                            react_1.default.createElement(Circle_1.default, { bordered: true, size: 2 },
                                react_1.default.createElement(pi_1.PiSpeakerLow, null)),
                            showVolume && (react_1.default.createElement("input", { type: "range", min: 0, max: 1, step: 0.01, value: volume, onChange: handleVolumeChange, className: "width-100 max-w-50 animated slide-right", style: { height: '3px', marginLeft: 8 }, "aria-label": "Volume" }))))),
                react_1.default.createElement(RowFlex_1.default, { gap: 0.3 },
                    react_1.default.createElement(ToolTip_1.default, null,
                        react_1.default.createElement(Circle_1.default, { bordered: true, size: 2, onClick: handleToggleFullScreen },
                            react_1.default.createElement(pi_1.PiCornersOut, null)),
                        react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: "Expand" })),
                    react_1.default.createElement(ToolTip_1.default, null,
                        react_1.default.createElement(Circle_1.default, { bordered: true, size: 2, onClick: function () { return window.open(src || '', '_blank'); } },
                            react_1.default.createElement(io5_1.IoCloudDownloadOutline, null)),
                        react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: "Download" })))))));
}
