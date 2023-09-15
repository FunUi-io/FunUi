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
function Table(_a) {
    var children = _a.children, funcss = _a.funcss, bordered = _a.bordered, stripped = _a.stripped, hoverable = _a.hoverable, showTotal = _a.showTotal, light = _a.light, dark = _a.dark;
    return (React.createElement("table", { className: "table ".concat(funcss ? funcss : '', " ").concat(bordered ? 'border' : '', " ").concat(stripped ? 'stripped' : '', " ").concat(hoverable ? 'hoverableTr' : '', " ").concat(light ? 'light' : '', " ").concat(dark ? 'dark' : '') },
        children,
        showTotal && (React.createElement("tr", { className: "borderless" },
            React.createElement("td", { className: "padding borderless text-bold" },
                "Total ",
                React.Children.count(children) - 1)))));
}
exports.default = Table;
