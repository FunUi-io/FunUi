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
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
function SideBar(_a) {
    var funcss = _a.funcss, position = _a.position, glassy = _a.glassy, header = _a.header, open = _a.open, content = _a.content, close = _a.close, footer = _a.footer, fixed = _a.fixed, rest = __rest(_a, ["funcss", "position", "glassy", "header", "open", "content", "close", "footer", "fixed"]);
    if (open) {
        return (React.createElement("aside", __assign({ className: "fun_side_bar_wrapper ".concat(fixed ? "fixed_sidebar" : "", " ").concat(glassy ? "glassy" : "") }, rest),
            React.createElement("div", { className: "\n            fun_sidebar_content ".concat(funcss || "", " ").concat(position || "", " \n            ") },
                React.createElement(RowFlex_1.default, { justify: 'space-between' },
                    header &&
                        React.createElement("div", { className: "col fit" },
                            " ",
                            header,
                            " "),
                    close && React.createElement("div", { className: "close_sidebar" },
                        close,
                        " ")),
                content &&
                    React.createElement("div", null, content),
                footer &&
                    React.createElement("div", null, footer))));
    }
    else {
        return React.createElement(React.Fragment, null);
    }
}
exports.default = SideBar;
