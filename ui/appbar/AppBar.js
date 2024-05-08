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
function AppBar(_a) {
    var fixedTop = _a.fixedTop, funcss = _a.funcss, padding = _a.padding, fixedBottom = _a.fixedBottom, justify = _a.justify, children = _a.children, left = _a.left, center = _a.center, right = _a.right, sideBar = _a.sideBar, width = _a.width, visibleLinks = _a.visibleLinks, sidebarTrigger = _a.sidebarTrigger, transparent = _a.transparent;
    return (React.createElement("div", null,
        React.createElement("nav", { className: "\n          navigation-bar ".concat(funcss ? funcss : '', "\n          ").concat(fixedTop ? 'fixed_top_navbar' : '', "\n          ").concat(sideBar ? 'there_is_sidebar' : '', "\n          ").concat(transparent ? 'transparent' : '', "\n          ").concat(fixedBottom ? 'fixedBottom' : '', "\n        "), style: { padding: "".concat(padding ? padding : ''), justifyContent: "".concat(justify ? justify : '') } },
            React.createElement("div", null, left),
            React.createElement("div", { className: " linkWrapper ".concat(visibleLinks ? "visibleLinks" : "") }, center),
            React.createElement("div", { className: "linkWrapper ".concat(visibleLinks ? "visibleLinks" : "") }, right),
            sidebarTrigger ? React.createElement("span", { className: 'sidebar-trigger' }, sidebarTrigger) : '')));
}
exports.default = AppBar;
