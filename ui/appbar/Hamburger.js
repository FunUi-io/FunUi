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
var Hamburger = function (_a) {
    var controlledOpen = _a.isOpen, toggle = _a.toggle;
    var _b = (0, react_1.useState)(false), internalOpen = _b[0], setInternalOpen = _b[1];
    var isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    var handleClick = function () {
        if (toggle) {
            toggle();
        }
        else {
            setInternalOpen(!isOpen);
        }
    };
    return (react_1.default.createElement("div", { className: "navhamburger ".concat(isOpen ? 'navopen' : ''), onClick: handleClick },
        react_1.default.createElement("span", { className: "navline navtop" }),
        react_1.default.createElement("span", { className: "navline navmiddle" }),
        react_1.default.createElement("span", { className: "navline navbottom" })));
};
exports.default = Hamburger;
