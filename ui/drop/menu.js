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
var react_1 = require("react");
function DropMenu(_a) {
    var children = _a.children, funcss = _a.funcss, hoverable = _a.hoverable, duration = _a.duration, animation = _a.animation, state = _a.state, id = _a.id, width = _a.width;
    var _b = (0, react_1.useState)(false), show = _b[0], setshow = _b[1];
    (0, react_1.useEffect)(function () {
        setshow(state);
    }, [state]);
    return (React.createElement("div", null, show ? (React.createElement("div", { id: id, className: "drop-menu ".concat(funcss, " item-").concat(hoverable ? hoverable : ''), style: {
            animation: " ".concat(duration ? duration : 0.2, "s ").concat(animation ? animation : 'ScaleUp'),
            width: width ? width : '100%',
        } }, children)) : ('')));
}
exports.default = DropMenu;
