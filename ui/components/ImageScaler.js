"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageScaler;
var react_1 = __importDefault(require("react"));
function ImageScaler(_a) {
    var _b = _a.funcss, funcss = _b === void 0 ? '' : _b, _c = _a.size, size = _c === void 0 ? "100%" : _c, _d = _a.src, src = _d === void 0 ? '' : _d;
    return (react_1.default.createElement("div", { className: "image-scaler-container ".concat(funcss), style: {
            maxWidth: size,
            width: size,
            maxHeight: size,
            height: size,
        } },
        react_1.default.createElement("img", { src: src, className: "image-scaler-img", loading: "lazy", alt: "" })));
}
