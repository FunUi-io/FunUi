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
exports.default = Modal;
var React = __importStar(require("react"));
var Header_1 = __importDefault(require("./Header"));
var Content_1 = __importDefault(require("./Content"));
var Action_1 = __importDefault(require("./Action"));
var pi_1 = require("react-icons/pi");
var Button_1 = __importDefault(require("../button/Button"));
function Modal(_a) {
    var children = _a.children, funcss = _a.funcss, animation = _a.animation, duration = _a.duration, open = _a.open, setOpen = _a.setOpen, maxWidth = _a.maxWidth, maxHeight = _a.maxHeight, okIcon = _a.okIcon, height = _a.height, _b = _a.hideClose, hideClose = _b === void 0 ? false : _b, width = _a.width, _c = _a.backdrop, backdrop = _c === void 0 ? false : _c, title = _a.title, titlecss = _a.titlecss, body = _a.body, bodycss = _a.bodycss, footer = _a.footer, footercss = _a.footercss, close = _a.close, closecss = _a.closecss, position = _a.position, id = _a.id, flat = _a.flat, onOk = _a.onOk, // 👈 added
    onOkText = _a.onOkText, // 👈 added
    rest = __rest(_a, ["children", "funcss", "animation", "duration", "open", "setOpen", "maxWidth", "maxHeight", "okIcon", "height", "hideClose", "width", "backdrop", "title", "titlecss", "body", "bodycss", "footer", "footercss", "close", "closecss", "position", "id", "flat", "onOk", "onOkText"]);
    var modalId = id || '_mymodal';
    var handleClickOutside = function (e) {
        if (e.target && e.target.id === modalId) {
            setOpen(false);
        }
    };
    var handleOkClick = function () {
        if (onOk)
            onOk();
        else
            setOpen(false); // default behavior if no onOk is provided
    };
    if (!open)
        return null;
    return (React.createElement("div", { className: "modal ".concat(backdrop ? 'backdrop' : '', " ").concat(position || ''), id: modalId, onClick: handleClickOutside },
        React.createElement("div", __assign({ className: "modal-content ".concat(funcss || '', " ").concat(flat ? 'flat' : ''), style: {
                animation: "".concat(duration || 0.2, "s ").concat(animation || 'ScaleUp'),
                maxWidth: maxWidth || undefined,
                maxHeight: maxHeight || undefined,
                width: width || '100%',
                height: height || undefined,
            } }, rest),
            title && (React.createElement(Header_1.default, { funcss: titlecss || '', title: title, close: !hideClose ?
                    React.createElement("div", { onClick: function () { return setOpen(false); }, className: "".concat(closecss || '', " pointer hover-text-error") }, close || React.createElement(pi_1.PiX, { size: 25 }))
                    : "" })),
            React.createElement(Content_1.default, { funcss: bodycss || '' }, body || children),
            footer ? (React.createElement(Action_1.default, { funcss: footercss || '' }, footer)) : (React.createElement(Action_1.default, { funcss: 'text-right' },
                React.createElement(Button_1.default, { bg: 'success800', endIcon: okIcon || React.createElement(pi_1.PiPaperPlaneRight, null), raised: true, onClick: handleOkClick }, onOkText || 'OK'))))));
}
