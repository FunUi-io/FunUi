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
exports.default = Avatar;
var React = __importStar(require("react"));
function Avatar(_a) {
    var funcss = _a.funcss, children = _a.children, _b = _a.size, size = _b === void 0 ? 2 : _b, _c = _a.bordered, bordered = _c === void 0 ? true : _c, bg = _a.bg, content = _a.content, color = _a.color;
    return (React.createElement("div", { className: "\n        animated \n        fade-in \n        avatar \n        ".concat(funcss || '', " \n        ").concat(bg || 'lighter', " \n        ").concat(bordered ? 'border' : '', "\n      ").concat("text-".concat(color), "\n      "), style: {
            width: "".concat(size, "rem"),
            height: "".concat(size, "rem"),
        } },
        React.createElement(React.Fragment, null, content || children)));
}
