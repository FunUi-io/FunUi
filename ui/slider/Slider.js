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
var getCssVariable_1 = require("../../utils/getCssVariable");
var Slider = function (_a) {
    var _b = _a.min, min = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 100 : _c, _d = _a.step, step = _d === void 0 ? 1 : _d, value = _a.value, onChange = _a.onChange, _e = _a.height, height = _e === void 0 ? 6 : _e, label = _a.label, _f = _a.showTooltip, showTooltip = _f === void 0 ? true : _f, _g = _a.funcss, funcss = _g === void 0 ? '' : _g;
    var _h = (0, react_1.useState)(false), isDragging = _h[0], setIsDragging = _h[1];
    var handleChange = function (e) {
        onChange(Number(e.target.value));
    };
    var percent = ((value - min) / (max - min)) * 100;
    var pColor = (0, getCssVariable_1.getCssVariableValue)("primary");
    return (react_1.default.createElement("div", { className: "range-slider-container ".concat(funcss) },
        react_1.default.createElement("div", { className: "range-wrapper" },
            showTooltip && (react_1.default.createElement("div", { className: "range-tooltip ".concat(isDragging ? 'visible' : ''), style: { left: "calc(".concat(percent, "% - 20px)") } },
                value,
                "%")),
            react_1.default.createElement("input", { type: "range", min: min, max: max, step: step, value: value, onChange: handleChange, onMouseDown: function () { return setIsDragging(true); }, onMouseUp: function () { return setIsDragging(false); }, onTouchStart: function () { return setIsDragging(true); }, onTouchEnd: function () { return setIsDragging(false); }, className: "range-slider", style: {
                    background: "linear-gradient(to right, ".concat(pColor, " 0%, ").concat(pColor, " ").concat(percent, "%, var(--lighter) ").concat(percent, "%, var(--lighter) 100%)"),
                    height: "".concat(height, "px"),
                } }))));
};
exports.default = Slider;
