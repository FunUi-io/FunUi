'use client';
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
exports.default = Analytics;
var react_1 = __importStar(require("react"));
var script_1 = __importDefault(require("next/script"));
var AnalyticsHandler_1 = __importDefault(require("./AnalyticsHandler"));
function Analytics(_a) {
    var id = _a.id;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(script_1.default, { strategy: "afterInteractive", src: "https://www.googletagmanager.com/gtag/js?id=".concat(id) }),
        react_1.default.createElement(script_1.default, { id: "gtag-init", strategy: "afterInteractive", dangerouslySetInnerHTML: {
                __html: "\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            gtag('js', new Date());\n            gtag('config', '".concat(id, "');\n          "),
            } }),
        react_1.default.createElement(react_1.Suspense, { fallback: null },
            react_1.default.createElement(AnalyticsHandler_1.default, { id: id }))));
}
