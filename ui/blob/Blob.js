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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Blob = function (_a) {
    var _b = _a.height, height = _b === void 0 ? '' : _b, _c = _a.width, width = _c === void 0 ? '' : _c, _d = _a.background, background = _d === void 0 ? '' : _d, _e = _a.funcss, funcss = _e === void 0 ? '' : _e, _f = _a.shape, shape = _f === void 0 ? '' : _f;
    return (React.createElement("div", { className: "".concat(funcss), style: {
            height: height,
            width: width,
            background: background ? "url(".concat(background, ")") : '',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: shape,
            transition: '0.3s linear',
        } }));
};
exports.default = Blob;
