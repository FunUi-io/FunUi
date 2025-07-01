"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkenToRgba = exports.getDarkenAmount = void 0;
var tinycolor2_1 = __importDefault(require("tinycolor2"));
var getDarkenAmount = function (variable) {
    if (variable.includes('50'))
        return 5;
    if (variable.includes('100'))
        return 10;
    if (variable.includes('200'))
        return 15;
    if (variable.includes('300'))
        return 20;
    if (variable.includes('400'))
        return 25;
    return 20;
};
exports.getDarkenAmount = getDarkenAmount;
var darkenToRgba = function (hex, darkenAmount, alpha) {
    if (alpha === void 0) { alpha = 1; }
    var color = (0, tinycolor2_1.default)(hex).darken(darkenAmount).toRgb();
    return "rgba(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ", ").concat(alpha, ")");
};
exports.darkenToRgba = darkenToRgba;
