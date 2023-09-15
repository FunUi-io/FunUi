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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var React = __importStar(require("react"));
var Header_1 = __importDefault(require("./Header"));
var Content_1 = __importDefault(require("./Content"));
var Action_1 = __importDefault(require("./Action"));
var Close_1 = __importDefault(require("./Close"));
function Modal(_a) {
    var children = _a.children, funcss = _a.funcss, animation = _a.animation, duration = _a.duration, open = _a.open, maxWidth = _a.maxWidth, maxHeight = _a.maxHeight, height = _a.height, width = _a.width, backdrop = _a.backdrop, title = _a.title, titlecss = _a.titlecss, body = _a.body, bodycss = _a.bodycss, footer = _a.footer, footercss = _a.footercss, close = _a.close, closecss = _a.closecss, rest = __rest(_a, ["children", "funcss", "animation", "duration", "open", "maxWidth", "maxHeight", "height", "width", "backdrop", "title", "titlecss", "body", "bodycss", "footer", "footercss", "close", "closecss"]);
    if (open) {
        return (React.createElement("div", __assign({ className: "".concat(funcss, " modal ").concat(backdrop ? 'backdrop' : '') }, rest),
            React.createElement("div", { className: "modal-content", style: {
                    animation: " ".concat(duration, "s ").concat(animation),
                    maxWidth: maxWidth ? maxWidth : undefined,
                    maxHeight: maxHeight ? maxHeight : undefined,
                    width: width ? width : undefined,
                    height: height ? height : undefined,
                } },
                title &&
                    React.createElement(Header_1.default, { funcss: titlecss ? titlecss : '' },
                        title,
                        close &&
                            React.createElement(Close_1.default, { funcss: closecss ? closecss : '' })),
                body &&
                    React.createElement(Content_1.default, { funcss: bodycss ? bodycss : '' }, body),
                footer &&
                    React.createElement(Action_1.default, { funcss: footercss ? footercss : '' }, footer),
                children)));
    }
    else {
        return React.createElement("div", null);
    }
}
exports.default = Modal;
