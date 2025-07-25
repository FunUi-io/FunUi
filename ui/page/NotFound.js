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
exports.default = NotFound;
var React = __importStar(require("react"));
var Button_1 = __importDefault(require("../button/Button"));
var pi_1 = require("react-icons/pi");
var Text_1 = __importDefault(require("../text/Text"));
function NotFound(_a) {
    var header = _a.header, code = _a.code, content = _a.content, action = _a.action;
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement("div", { className: "central", style: { minHeight: "100vh", width: "100%", padding: "4rem 0px" } },
                React.createElement("div", { className: "text-center width-600-max" },
                    code ?
                        code :
                        React.createElement("div", { className: "h2 text-warning round-edge" }, "404"),
                    React.createElement("div", { style: { margin: "1.4rem 0px" } }, header ? header
                        :
                            React.createElement("div", { className: "text-big text-bold text-dark300", style: { display: "block", transition: "all 0.2s linear 0s" } }, "Page not found \uD83E\uDD14")),
                    content ? content :
                        React.createElement("div", { className: "article" },
                            React.createElement(Text_1.default, { article: true, text: "Don't worry, it happens to the best of us \uD83D\uDE05. We'll help you find what you're looking for.", color: "dark300", block: true })),
                    React.createElement("div", { style: { margin: "2rem 0px" } }, action ? action :
                        React.createElement("div", { className: "row-flex gap", style: { justifyContent: "center", gap: "0.4rem" } },
                            React.createElement(Button_1.default, { raised: true, rounded: true, startIcon: React.createElement(pi_1.PiArrowLeft, null), bg: 'primary', onClick: function () {
                                    window.history.back();
                                } }, "Take me back \uD83C\uDFE0"))))))));
}
