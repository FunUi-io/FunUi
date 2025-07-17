"use strict";
'use client';
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
var framer_motion_1 = require("framer-motion");
var react_intersection_observer_1 = require("react-intersection-observer");
var animationVariants = {
    'fade-up': { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    'fade-down': { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    'fade-in': { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    'zoom-in': { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
    'slide-left': { hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    'slide-right': { hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
};
var ScrollInView = function (_a) {
    var children = _a.children, _b = _a.animationType, animationType = _b === void 0 ? 'fade-up' : _b, _c = _a.delay, delay = _c === void 0 ? 0 : _c, _d = _a.duration, duration = _d === void 0 ? 0.6 : _d, _e = _a.threshold, threshold = _e === void 0 ? 0.2 : _e, _f = _a.once, once = _f === void 0 ? false : _f, _g = _a.className, className = _g === void 0 ? '' : _g;
    var controls = (0, framer_motion_1.useAnimation)();
    var _h = (0, react_intersection_observer_1.useInView)({
        threshold: threshold,
        triggerOnce: once,
    }), ref = _h[0], inView = _h[1];
    (0, react_1.useEffect)(function () {
        if (inView) {
            controls.start('visible');
        }
        else if (!once) {
            controls.start('hidden');
        }
    }, [inView, once, controls]);
    var variants = animationVariants[animationType] || animationVariants['fade-up'];
    return (react_1.default.createElement(framer_motion_1.motion.div, { ref: ref, variants: variants, initial: "hidden", animate: controls, transition: {
            delay: delay,
            duration: duration,
            ease: [0.25, 1, 0.5, 1], // Natural cubic bezier
        }, className: className }, children));
};
exports.default = ScrollInView;
