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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Notification;
var React = __importStar(require("react"));
var Header_1 = __importDefault(require("./Header"));
var Content_1 = __importDefault(require("./Content"));
var Footer_1 = __importDefault(require("./Footer"));
function Notification(_a) {
    var position = _a.position, funcss = _a.funcss, animation = _a.animation, duration = _a.duration, children = _a.children, state = _a.state, width = _a.width, header = _a.header, content = _a.content, footer = _a.footer;
    if (state) {
        return (React.createElement("div", { className: "notification ".concat(position, " ").concat(funcss), style: { animation: " ".concat(duration ? duration : 0.2, "s ").concat(animation), width: width ? width : '450px' } },
            header &&
                React.createElement(Header_1.default, null, header),
            content &&
                React.createElement(Content_1.default, null, content),
            footer &&
                React.createElement(Footer_1.default, null, footer),
            children));
    }
    else {
        return null;
    }
}
