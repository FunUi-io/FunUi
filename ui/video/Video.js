'use client';
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Video = (0, react_1.lazy)(function () { return import('next-video'); });
var SimpleVideo = function (_a) {
    var src = _a.src, _b = _a.autoPlay, autoPlay = _b === void 0 ? false : _b, _c = _a.muted, muted = _c === void 0 ? false : _c, _d = _a.loop, loop = _d === void 0 ? false : _d, _e = _a.controls, controls = _e === void 0 ? true : _e, _f = _a.className, className = _f === void 0 ? '' : _f, funcss = _a.funcss, _g = _a.style, style = _g === void 0 ? {} : _g, maxResolution = _a.maxResolution, loadingComponent = _a.loadingComponent;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_1.Suspense, { fallback: loadingComponent || react_1.default.createElement("div", { className: "video-loading" }, "Loading video...") },
            react_1.default.createElement(Video, __assign({ src: src, style: __assign({}, style), autoPlay: autoPlay, muted: muted, loop: loop, controls: controls, className: "".concat(className, " ").concat(funcss), preload: "metadata" }, (maxResolution && {
                playbackRates: [0.5, 1, 1.25, 1.5, 2],
            }))))));
};
exports.default = SimpleVideo;
