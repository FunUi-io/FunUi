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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var tfi_1 = require("react-icons/tfi");
var Text_1 = __importDefault(require("../text/Text"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var ToolTip_1 = __importDefault(require("../tooltip/ToolTip"));
var Tip_1 = __importDefault(require("../tooltip/Tip"));
var videoFunctions_1 = require("./videoFunctions");
var videoShortcuts_1 = require("./videoShortcuts");
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
// Configuration hook
var useComponentConfiguration = function (componentName, variant) {
    if (variant === void 0) { variant = ''; }
    var getComponentConfig = function () {
        var baseConfig = {
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
        return baseConfig[componentName] || {};
    };
    var mergeWithLocal = function (localProps) {
        var config = getComponentConfig();
        var variantConfig = variant && config[variant] ? config[variant] : {};
        var defaultConfig = config.default || {};
        var mergedProps = __assign(__assign(__assign({}, defaultConfig), variantConfig), localProps);
        return {
            props: mergedProps,
            variantConfig: variantConfig,
            defaultConfig: defaultConfig,
        };
    };
    return {
        mergeWithLocal: mergeWithLocal,
        getComponentConfig: getComponentConfig,
    };
};
function Video(_a) {
    var _this = this;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    var src = _a.src, poster = _a.poster, onDuration = _a.onDuration, onEnded = _a.onEnded, isPause = _a.isPause, spacebarPlay = _a.spacebarPlay, _8 = _a.className, className = _8 === void 0 ? '' : _8, autoPlay = _a.autoPlay, showControls = _a.showControls, showPlayPause = _a.showPlayPause, showProgress = _a.showProgress, showVolume = _a.showVolume, showTime = _a.showTime, showFullscreen = _a.showFullscreen, showDownload = _a.showDownload, showSeekButtons = _a.showSeekButtons, playIcon = _a.playIcon, pauseIcon = _a.pauseIcon, fullscreenIcon = _a.fullscreenIcon, downloadIcon = _a.downloadIcon, volumeIcon = _a.volumeIcon, muteIcon = _a.muteIcon, rewindIcon = _a.rewindIcon, forwardIcon = _a.forwardIcon, hideControlsDelay = _a.hideControlsDelay, loop = _a.loop, muted = _a.muted, seekAmount = _a.seekAmount, _9 = _a.funcss, funcss = _9 === void 0 ? '' : _9, _10 = _a.containerCss, containerCss = _10 === void 0 ? '' : _10, _11 = _a.videoCss, videoCss = _11 === void 0 ? '' : _11, _12 = _a.controlsCss, controlsCss = _12 === void 0 ? '' : _12, _13 = _a.progressCss, progressCss = _13 === void 0 ? '' : _13, _14 = _a.progressBarCss, progressBarCss = _14 === void 0 ? '' : _14, _15 = _a.timeCss, timeCss = _15 === void 0 ? '' : _15, _16 = _a.playCss, playCss = _16 === void 0 ? '' : _16, _17 = _a.pauseCss, pauseCss = _17 === void 0 ? '' : _17, _18 = _a.volumeCss, volumeCss = _18 === void 0 ? '' : _18, _19 = _a.fullscreenCss, fullscreenCss = _19 === void 0 ? '' : _19, _20 = _a.downloadCss, downloadCss = _20 === void 0 ? '' : _20, _21 = _a.rewindCss, rewindCss = _21 === void 0 ? '' : _21, _22 = _a.forwardCss, forwardCss = _22 === void 0 ? '' : _22, _23 = _a.buttonCss, buttonCss = _23 === void 0 ? '' : _23, _24 = _a.volumeStyle, volumeStyle = _24 === void 0 ? 'slider' : _24, style = _a.style, _25 = _a.variant, variant = _25 === void 0 ? '' : _25, rest = __rest(_a, ["src", "poster", "onDuration", "onEnded", "isPause", "spacebarPlay", "className", "autoPlay", "showControls", "showPlayPause", "showProgress", "showVolume", "showTime", "showFullscreen", "showDownload", "showSeekButtons", "playIcon", "pauseIcon", "fullscreenIcon", "downloadIcon", "volumeIcon", "muteIcon", "rewindIcon", "forwardIcon", "hideControlsDelay", "loop", "muted", "seekAmount", "funcss", "containerCss", "videoCss", "controlsCss", "progressCss", "progressBarCss", "timeCss", "playCss", "pauseCss", "volumeCss", "fullscreenCss", "downloadCss", "rewindCss", "forwardCss", "buttonCss", "volumeStyle", "style", "variant"]);
    var mergeWithLocal = useComponentConfiguration('Video', variant).mergeWithLocal;
    // Create local props object - these will override config props
    var localProps = __assign({ src: src, poster: poster, onDuration: onDuration, onEnded: onEnded, isPause: isPause, spacebarPlay: spacebarPlay, className: className, autoPlay: autoPlay, showControls: showControls, showPlayPause: showPlayPause, showProgress: showProgress, showVolume: showVolume, showTime: showTime, showFullscreen: showFullscreen, showDownload: showDownload, showSeekButtons: showSeekButtons, playIcon: playIcon, pauseIcon: pauseIcon, fullscreenIcon: fullscreenIcon, downloadIcon: downloadIcon, volumeIcon: volumeIcon, muteIcon: muteIcon, rewindIcon: rewindIcon, forwardIcon: forwardIcon, hideControlsDelay: hideControlsDelay, loop: loop, muted: muted, seekAmount: seekAmount, funcss: funcss, containerCss: containerCss, videoCss: videoCss, controlsCss: controlsCss, progressCss: progressCss, progressBarCss: progressBarCss, timeCss: timeCss, playCss: playCss, pauseCss: pauseCss, volumeCss: volumeCss, fullscreenCss: fullscreenCss, downloadCss: downloadCss, rewindCss: rewindCss, forwardCss: forwardCss, buttonCss: buttonCss, volumeStyle: volumeStyle, style: style }, rest);
    // Merge with config - LOCAL PROPS OVERRIDE CONFIG
    var mergedProps = mergeWithLocal(localProps).props;
    // Extract final values - local props take precedence
    var final = {
        src: mergedProps.src,
        poster: mergedProps.poster,
        onDuration: mergedProps.onDuration,
        onEnded: mergedProps.onEnded,
        isPause: mergedProps.isPause,
        spacebarPlay: (_b = mergedProps.spacebarPlay) !== null && _b !== void 0 ? _b : true,
        className: (_c = mergedProps.className) !== null && _c !== void 0 ? _c : '',
        autoPlay: (_d = mergedProps.autoPlay) !== null && _d !== void 0 ? _d : false,
        showControls: (_e = mergedProps.showControls) !== null && _e !== void 0 ? _e : true,
        showPlayPause: (_f = mergedProps.showPlayPause) !== null && _f !== void 0 ? _f : true,
        showProgress: (_g = mergedProps.showProgress) !== null && _g !== void 0 ? _g : true,
        showVolume: (_h = mergedProps.showVolume) !== null && _h !== void 0 ? _h : true,
        showTime: (_j = mergedProps.showTime) !== null && _j !== void 0 ? _j : true,
        showFullscreen: (_k = mergedProps.showFullscreen) !== null && _k !== void 0 ? _k : true,
        showDownload: (_l = mergedProps.showDownload) !== null && _l !== void 0 ? _l : false,
        showSeekButtons: (_m = mergedProps.showSeekButtons) !== null && _m !== void 0 ? _m : false,
        playIcon: mergedProps.playIcon,
        pauseIcon: mergedProps.pauseIcon,
        fullscreenIcon: mergedProps.fullscreenIcon,
        downloadIcon: mergedProps.downloadIcon,
        volumeIcon: mergedProps.volumeIcon,
        muteIcon: mergedProps.muteIcon,
        rewindIcon: mergedProps.rewindIcon,
        forwardIcon: mergedProps.forwardIcon,
        hideControlsDelay: (_o = mergedProps.hideControlsDelay) !== null && _o !== void 0 ? _o : 3000,
        loop: (_p = mergedProps.loop) !== null && _p !== void 0 ? _p : false,
        muted: (_q = mergedProps.muted) !== null && _q !== void 0 ? _q : false,
        seekAmount: (_r = mergedProps.seekAmount) !== null && _r !== void 0 ? _r : 10,
        funcss: (_s = mergedProps.funcss) !== null && _s !== void 0 ? _s : '',
        containerCss: (_t = mergedProps.containerCss) !== null && _t !== void 0 ? _t : '',
        videoCss: (_u = mergedProps.videoCss) !== null && _u !== void 0 ? _u : '',
        controlsCss: (_v = mergedProps.controlsCss) !== null && _v !== void 0 ? _v : '',
        progressCss: (_w = mergedProps.progressCss) !== null && _w !== void 0 ? _w : '',
        progressBarCss: (_x = mergedProps.progressBarCss) !== null && _x !== void 0 ? _x : '',
        timeCss: (_y = mergedProps.timeCss) !== null && _y !== void 0 ? _y : '',
        playCss: (_z = mergedProps.playCss) !== null && _z !== void 0 ? _z : '',
        pauseCss: (_0 = mergedProps.pauseCss) !== null && _0 !== void 0 ? _0 : '',
        volumeCss: (_1 = mergedProps.volumeCss) !== null && _1 !== void 0 ? _1 : '',
        fullscreenCss: (_2 = mergedProps.fullscreenCss) !== null && _2 !== void 0 ? _2 : '',
        downloadCss: (_3 = mergedProps.downloadCss) !== null && _3 !== void 0 ? _3 : '',
        rewindCss: (_4 = mergedProps.rewindCss) !== null && _4 !== void 0 ? _4 : '',
        forwardCss: (_5 = mergedProps.forwardCss) !== null && _5 !== void 0 ? _5 : '',
        buttonCss: (_6 = mergedProps.buttonCss) !== null && _6 !== void 0 ? _6 : '',
        volumeStyle: (_7 = mergedProps.volumeStyle) !== null && _7 !== void 0 ? _7 : 'slider',
    };
    var videoRef = (0, react_1.useRef)(null);
    var containerRef = (0, react_1.useRef)(null);
    var animationFrameRef = (0, react_1.useRef)(null);
    var _26 = (0, react_1.useState)(false), isPlaying = _26[0], setIsPlaying = _26[1];
    var _27 = (0, react_1.useState)(0), currentTime = _27[0], setCurrentTime = _27[1];
    var _28 = (0, react_1.useState)(0), duration = _28[0], setDuration = _28[1];
    var _29 = (0, react_1.useState)(final.muted ? 0 : 1), volume = _29[0], setVolume = _29[1];
    var _30 = (0, react_1.useState)(final.muted), isMuted = _30[0], setIsMuted = _30[1];
    var _31 = (0, react_1.useState)(false), isFullScreen = _31[0], setIsFullScreen = _31[1];
    var _32 = (0, react_1.useState)(false), showControlsState = _32[0], setShowControlsState = _32[1];
    var _33 = (0, react_1.useState)(false), hasStarted = _33[0], setHasStarted = _33[1];
    var _34 = (0, react_1.useState)(false), isHoveringProgress = _34[0], setIsHoveringProgress = _34[1];
    var _35 = (0, react_1.useState)(false), isHoveringVolume = _35[0], setIsHoveringVolume = _35[1];
    var _36 = (0, react_1.useState)(false), showVolumeSlider = _36[0], setShowVolumeSlider = _36[1];
    // Dynamic icon states
    var _37 = (0, react_1.useState)(null), dynamicPlayIcon = _37[0], setDynamicPlayIcon = _37[1];
    var _38 = (0, react_1.useState)(null), dynamicPauseIcon = _38[0], setDynamicPauseIcon = _38[1];
    var _39 = (0, react_1.useState)(null), dynamicFullscreenIcon = _39[0], setDynamicFullscreenIcon = _39[1];
    var _40 = (0, react_1.useState)(null), dynamicDownloadIcon = _40[0], setDynamicDownloadIcon = _40[1];
    var _41 = (0, react_1.useState)(null), dynamicVolumeIcon = _41[0], setDynamicVolumeIcon = _41[1];
    var _42 = (0, react_1.useState)(null), dynamicMuteIcon = _42[0], setDynamicMuteIcon = _42[1];
    var _43 = (0, react_1.useState)(null), dynamicRewindIcon = _43[0], setDynamicRewindIcon = _43[1];
    var _44 = (0, react_1.useState)(null), dynamicForwardIcon = _44[0], setDynamicForwardIcon = _44[1];
    // Helper function to load dynamic icons
    var loadDynamicIcon = function (iconProp, setter, defaultIcon) { return __awaiter(_this, void 0, void 0, function () {
        var iconNode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!iconProp) {
                        setter(defaultIcon);
                        return [2 /*return*/];
                    }
                    if (!(typeof iconProp === 'string')) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, getDynamicIcon_1.getDynamicIcon)(iconProp)];
                case 1:
                    iconNode = _a.sent();
                    setter(iconNode || defaultIcon);
                    return [3 /*break*/, 3];
                case 2:
                    setter(iconProp);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Load all dynamic icons
    (0, react_1.useEffect)(function () {
        var loadIcons = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            loadDynamicIcon(final.playIcon, setDynamicPlayIcon, react_1.default.createElement(pi_1.PiPlay, { size: 20 })),
                            loadDynamicIcon(final.pauseIcon, setDynamicPauseIcon, react_1.default.createElement(pi_1.PiPause, { size: 20 })),
                            loadDynamicIcon(final.fullscreenIcon, setDynamicFullscreenIcon, react_1.default.createElement(pi_1.PiCornersOut, { size: 18 })),
                            loadDynamicIcon(final.downloadIcon, setDynamicDownloadIcon, react_1.default.createElement(tfi_1.TfiDownload, { size: 16 })),
                            loadDynamicIcon(final.volumeIcon, setDynamicVolumeIcon, react_1.default.createElement(pi_1.PiSpeakerHigh, { size: 18 })),
                            loadDynamicIcon(final.muteIcon, setDynamicMuteIcon, react_1.default.createElement(pi_1.PiSpeakerSlash, { size: 18 })),
                            loadDynamicIcon(final.rewindIcon, setDynamicRewindIcon, react_1.default.createElement(tfi_1.TfiControlBackward, { size: 16 })),
                            loadDynamicIcon(final.forwardIcon, setDynamicForwardIcon, react_1.default.createElement(tfi_1.TfiControlForward, { size: 16 })),
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        loadIcons();
    }, [
        final.playIcon, final.pauseIcon, final.fullscreenIcon, final.downloadIcon,
        final.volumeIcon, final.muteIcon, final.rewindIcon, final.forwardIcon
    ]);
    // Helper function to render icon
    var renderIcon = function (icon, defaultSize) {
        if (defaultSize === void 0) { defaultSize = 16; }
        if (!icon)
            return null;
        if (react_1.default.isValidElement(icon)) {
            return react_1.default.cloneElement(icon, {
                size: icon.props.size || defaultSize
            });
        }
        return icon;
    };
    // Play/Pause functionality
    var playVideo = function () {
        var video = videoRef.current;
        if (video) {
            if (video.currentTime === video.duration) {
                video.currentTime = 0;
            }
            video.play().then(function () {
                setIsPlaying(true);
                setHasStarted(true);
            }).catch(console.error);
        }
    };
    var pauseVideo = function () {
        var video = videoRef.current;
        if (video && !video.paused) {
            video.pause();
            setIsPlaying(false);
        }
    };
    var handlePlayPauseToggle = function () {
        isPlaying ? pauseVideo() : playVideo();
    };
    // Click handlers for different video areas
    var handleVideoClick = function (e) {
        var container = containerRef.current;
        if (!container)
            return;
        var rect = container.getBoundingClientRect();
        var clickX = e.clientX - rect.left;
        var width = rect.width;
        var leftArea = width * 0.3;
        var rightArea = width * 0.7;
        if (clickX < leftArea) {
            handleSeek(-final.seekAmount);
        }
        else if (clickX > rightArea) {
            handleSeek(final.seekAmount);
        }
        else {
            handlePlayPauseToggle();
        }
    };
    // Seek functionality
    var handleSeek = function (seconds) {
        var video = videoRef.current;
        if (video) {
            video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, duration));
        }
    };
    var handleRewind = function () { return handleSeek(-final.seekAmount); };
    var handleForward = function () { return handleSeek(final.seekAmount); };
    // Fullscreen functionality
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
    // Volume functionality
    var handleVolumeChange = function (e) {
        var newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            videoRef.current.muted = newVolume === 0;
        }
    };
    var handleToggleMute = function () {
        var newMuted = !isMuted;
        setIsMuted(newMuted);
        if (videoRef.current) {
            videoRef.current.muted = newMuted;
            if (newMuted) {
                setVolume(0);
            }
            else {
                setVolume(1);
                if (videoRef.current)
                    videoRef.current.volume = 1;
            }
        }
    };
    // Progress functionality
    var handleProgressChange = function (e) {
        var newTime = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };
    // Time update animation
    var updateCurrentTime = (0, react_1.useCallback)(function () {
        var video = videoRef.current;
        if (video) {
            setCurrentTime(video.currentTime);
            animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
        }
    }, []);
    // Event handlers
    var handleLoadedMetadata = function () {
        var _a;
        var video = videoRef.current;
        if (video) {
            setDuration(video.duration || 0);
            (_a = final.onDuration) === null || _a === void 0 ? void 0 : _a.call(final, video.duration);
            if (final.autoPlay) {
                video.muted = true;
                video.play().then(function () {
                    setIsPlaying(true);
                    setHasStarted(true);
                }).catch(console.error);
            }
        }
    };
    var handleVideoEnd = function () {
        var _a;
        setIsPlaying(false);
        (_a = final.onEnded) === null || _a === void 0 ? void 0 : _a.call(final);
        if (final.loop && videoRef.current) {
            videoRef.current.currentTime = 0;
            playVideo();
        }
    };
    // Effects
    (0, react_1.useEffect)(function () {
        var handleKey = function (e) {
            return (0, videoShortcuts_1.handleKeyDown)(e, isPlaying, playVideo, pauseVideo, final.spacebarPlay);
        };
        document.addEventListener('keydown', handleKey);
        return function () { return document.removeEventListener('keydown', handleKey); };
    }, [isPlaying, final.spacebarPlay]);
    (0, react_1.useEffect)(function () {
        var video = videoRef.current;
        if (!video)
            return;
        video.addEventListener('ended', handleVideoEnd);
        return function () { return video.removeEventListener('ended', handleVideoEnd); };
    }, [final.loop, final.onEnded]);
    (0, react_1.useEffect)(function () {
        if (final.isPause)
            pauseVideo();
    }, [final.isPause]);
    (0, react_1.useEffect)(function () {
        var handleFullscreenChange = function () {
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return function () { return document.removeEventListener('fullscreenchange', handleFullscreenChange); };
    }, []);
    // Controls visibility with hover
    (0, react_1.useEffect)(function () {
        var timer;
        var show = function () {
            setShowControlsState(true);
            clearTimeout(timer);
            timer = setTimeout(function () {
                setShowControlsState(false);
                setShowVolumeSlider(false);
            }, final.hideControlsDelay);
        };
        var hide = function () {
            setShowControlsState(false);
            setShowVolumeSlider(false);
        };
        var container = containerRef.current;
        if (container && final.showControls) {
            container.addEventListener('mouseenter', show);
            container.addEventListener('mouseleave', hide);
            container.addEventListener('mousemove', show);
        }
        return function () {
            if (container) {
                container.removeEventListener('mouseenter', show);
                container.removeEventListener('mouseleave', hide);
                container.removeEventListener('mousemove', show);
            }
            clearTimeout(timer);
        };
    }, [final.showControls, final.hideControlsDelay]);
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
    // Get volume icon based on volume level
    var getVolumeIcon = function () {
        if (isMuted || volume === 0) {
            return renderIcon(dynamicMuteIcon, 18);
        }
        else if (volume < 0.5) {
            return react_1.default.createElement(pi_1.PiSpeakerNone, { size: 18 });
        }
        else {
            return renderIcon(dynamicVolumeIcon, 18);
        }
    };
    // Simple Progress Bar Component (YouTube style)
    var ProgressBar = function () { return (react_1.default.createElement("div", { className: "progress-container" },
        react_1.default.createElement("div", { className: "progress-wrapper" },
            react_1.default.createElement("input", { type: "range", min: 0, max: duration, value: currentTime, onChange: handleProgressChange, className: "video-progress ".concat(final.progressCss), style: {
                    '--progress-percent': "".concat((currentTime / duration) * 100, "%"),
                }, onMouseEnter: function () { return setIsHoveringProgress(true); }, onMouseLeave: function () { return setIsHoveringProgress(false); } })))); };
    // Volume Control Component with different styles
    var VolumeControl = function () {
        if (final.volumeStyle === 'hover') {
            return (react_1.default.createElement("div", { className: "volume-control-wrapper relative" },
                react_1.default.createElement(ToolTip_1.default, null,
                    react_1.default.createElement("div", { onClick: handleToggleMute, onMouseEnter: function () { return setShowVolumeSlider(true); }, className: "volume-toggle ".concat(final.buttonCss, " ").concat(final.volumeCss, " pointer") }, getVolumeIcon()),
                    react_1.default.createElement(Tip_1.default, { tip: "top", content: isMuted ? "Unmute" : "Mute" })),
                showVolumeSlider && (react_1.default.createElement("div", { className: "volume-slider-wrapper absolute bottom-full left-0 mb-2 p-2 bg-black bg-opacity-80 rounded-lg backdrop-blur-sm", onMouseEnter: function () { return setShowVolumeSlider(true); }, onMouseLeave: function () { return setShowVolumeSlider(false); } },
                    react_1.default.createElement("input", { type: "range", min: 0, max: 1, step: 0.01, value: volume, onChange: handleVolumeChange, className: "volume-slider vertical", style: {
                            '--volume-percent': "".concat(volume * 100, "%"),
                        } })))));
        }
        if (final.volumeStyle === 'compact') {
            return (react_1.default.createElement("div", { className: "volume-control-wrapper" },
                react_1.default.createElement(ToolTip_1.default, null,
                    react_1.default.createElement("div", { onClick: handleToggleMute, className: "volume-toggle ".concat(final.buttonCss, " ").concat(final.volumeCss, " pointer") }, getVolumeIcon()),
                    react_1.default.createElement(Tip_1.default, { tip: "top", content: isMuted ? "Unmute" : "Mute" }))));
        }
        // Default slider style
        return (react_1.default.createElement("div", { className: "volume-control-wrapper" },
            react_1.default.createElement(ToolTip_1.default, null,
                react_1.default.createElement("div", { onClick: handleToggleMute, className: "volume-toggle ".concat(final.buttonCss, " ").concat(final.volumeCss, " pointer") }, getVolumeIcon()),
                react_1.default.createElement(Tip_1.default, { tip: "top", content: isMuted ? "Unmute" : "Mute" })),
            react_1.default.createElement("div", { className: "volume-slider-wrapper" },
                react_1.default.createElement("input", { type: "range", min: 0, max: 1, step: 0.01, value: volume, onChange: handleVolumeChange, className: "volume-slider", style: {
                        '--volume-percent': "".concat(volume * 100, "%"),
                    } }))));
    };
    return (react_1.default.createElement("div", { ref: containerRef, className: "video_container fit ".concat(final.funcss, " ").concat(final.containerCss, " ").concat(final.className), onClick: handleVideoClick },
        final.poster && !hasStarted && !isPlaying && (react_1.default.createElement("div", { style: { backgroundImage: "url(".concat(final.poster, ")") }, className: "video_poster" })),
        react_1.default.createElement("video", { ref: videoRef, preload: "auto", autoPlay: final.autoPlay, style: style, src: final.src, className: "video_player fit min-w-200 ".concat(final.videoCss), onLoadedMetadata: handleLoadedMetadata, playsInline: true, controls: false, loop: final.loop, muted: final.muted }),
        final.showControls && (react_1.default.createElement("div", { className: "video_controls ".concat(final.controlsCss, " ").concat(showControlsState ? 'show_controls' : 'hide_controls') },
            react_1.default.createElement(RowFlex_1.default, { gap: 1, justify: "space-between", alignItems: "center", className: "controls-row" },
                react_1.default.createElement(RowFlex_1.default, { gap: 0.5, alignItems: "center", funcss: 'videoLeftContainer' },
                    final.showPlayPause && (react_1.default.createElement(ToolTip_1.default, null,
                        react_1.default.createElement("div", { onClick: handlePlayPauseToggle, className: "".concat(final.buttonCss, " ").concat(isPlaying ? final.pauseCss : final.playCss, " pointer") }, isPlaying
                            ? renderIcon(dynamicPauseIcon, 20)
                            : renderIcon(dynamicPlayIcon, 20)),
                        react_1.default.createElement(Tip_1.default, { tip: "top", content: isPlaying ? "Pause" : "Play" }))),
                    final.showSeekButtons && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(ToolTip_1.default, null,
                            react_1.default.createElement("div", { onClick: handleRewind, className: "".concat(final.buttonCss, " ").concat(final.rewindCss, " pointer") }, renderIcon(dynamicRewindIcon, 16)),
                            react_1.default.createElement(Tip_1.default, { tip: "top", content: "".concat(final.seekAmount, "s Back") })),
                        react_1.default.createElement(ToolTip_1.default, null,
                            react_1.default.createElement("div", { onClick: handleForward, className: "".concat(final.buttonCss, " ").concat(final.forwardCss, " pointer") }, renderIcon(dynamicForwardIcon, 16)),
                            react_1.default.createElement(Tip_1.default, { tip: "top", content: "".concat(final.seekAmount, "s Forward") })))),
                    final.showVolume && react_1.default.createElement(VolumeControl, null),
                    final.showTime && (react_1.default.createElement("div", { className: "video_time ".concat(final.timeCss) },
                        react_1.default.createElement(Text_1.default, { text: "".concat((0, videoFunctions_1.formatTime)(currentTime), " / ").concat((0, videoFunctions_1.formatTime)(duration)), size: "xs" })))),
                react_1.default.createElement("div", { className: "col w-full " },
                    react_1.default.createElement("div", { className: 'videoProgressContainer' }, final.showProgress && react_1.default.createElement(ProgressBar, null))),
                react_1.default.createElement(RowFlex_1.default, { gap: 0.3, funcss: 'videoRightContainer' },
                    final.showFullscreen && (react_1.default.createElement(ToolTip_1.default, null,
                        react_1.default.createElement("div", { onClick: handleToggleFullScreen, className: "".concat(final.buttonCss, " ").concat(final.fullscreenCss, " pointer") }, renderIcon(dynamicFullscreenIcon, 18)),
                        react_1.default.createElement(Tip_1.default, { tip: "top", content: "Fullscreen" }))),
                    final.showDownload && (react_1.default.createElement(ToolTip_1.default, null,
                        react_1.default.createElement("div", { onClick: function () { return window.open(final.src, '_blank'); }, className: "".concat(final.buttonCss, " ").concat(final.downloadCss, " pointer") }, renderIcon(dynamicDownloadIcon, 16)),
                        react_1.default.createElement(Tip_1.default, { tip: "top", content: "Download" })))))))));
}
