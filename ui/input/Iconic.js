"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IconicInput;
var react_1 = __importDefault(require("react"));
function IconicInput(_a) {
    var funcss = _a.funcss, children = _a.children, leftIcon = _a.leftIcon, rightIcon = _a.rightIcon, input = _a.input, iconicBg = _a.iconicBg;
    return (react_1.default.createElement("div", { className: "icon-container ".concat(funcss) },
        leftIcon ?
            react_1.default.createElement("div", { className: "leftIcon", style: {
                    backgroundColor: iconicBg || '',
                    border: iconicBg ? "0.1rem ".concat(iconicBg, " solid") : '',
                } }, leftIcon ? leftIcon : '')
            : '',
        react_1.default.createElement("div", { className: "icon_input_wrapper  ".concat(leftIcon ? 'lefticon' : '', " ").concat(rightIcon ? 'righticon' : '') },
            " ",
            input),
        rightIcon ?
            react_1.default.createElement("div", { className: "rightIcon", style: { backgroundColor: iconicBg || '' } }, rightIcon ? rightIcon : '')
            : ''));
}
