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
function RowFlex(_a) {
    var funcss = _a.funcss, content = _a.content, justify = _a.justify, gap = _a.gap, alignItems = _a.alignItems, responsiveSmall = _a.responsiveSmall, responsiveMedium = _a.responsiveMedium, id = _a.id, children = _a.children;
    return (React.createElement("div", { id: id ? id : '', className: "\n        row-flex ".concat(funcss ? funcss : '', "\n        ").concat(responsiveSmall ? 'responsiveSmall' : responsiveMedium ? 'responsiveMedium' : '', "\n      "), style: {
            justifyContent: justify ? justify : '',
            gap: gap ? gap + "rem" : '',
            alignItems: alignItems ? alignItems : '',
        } },
        children,
        " ",
        content));
}
exports.default = RowFlex;
