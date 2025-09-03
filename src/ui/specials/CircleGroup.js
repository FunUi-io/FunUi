"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CircleGroup;
var react_1 = __importDefault(require("react"));
function CircleGroup(_a) {
    var avatars = _a.avatars, _b = _a.size, size = _b === void 0 ? 2 : _b, _c = _a.overlap, overlap = _c === void 0 ? 0.8 : _c, _d = _a.maxVisible, maxVisible = _d === void 0 ? avatars.length : _d;
    var displayed = avatars.slice(0, maxVisible);
    var extra = avatars.length - maxVisible;
    return (react_1.default.createElement("div", { className: "flex", style: { direction: 'ltr' } },
        displayed.map(function (avatar, i) { return (react_1.default.createElement("div", { key: i, style: {
                marginLeft: i === 0 ? '0' : "-".concat(overlap, "rem"),
                zIndex: avatars.length - i,
            } }, react_1.default.cloneElement(avatar, { size: size }))); }),
        extra > 0 && (react_1.default.createElement("div", { className: "avatar lighter text-small flex ", style: {
                width: "".concat(size, "rem"),
                height: "".concat(size, "rem"),
                marginLeft: "-".concat(overlap, "rem"),
                zIndex: 0,
            } },
            "+",
            extra))));
}
