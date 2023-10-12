"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var StepContainer = function (_a) {
    var children = _a.children, funcss = _a.funcss, responsiveMedium = _a.responsiveMedium, responsiveSmall = _a.responsiveSmall;
    return (react_1.default.createElement("div", { className: "".concat(funcss ? funcss : '', " stepContainer ").concat(responsiveMedium ? 'stepResponsiveMedium' : responsiveSmall ? 'stepResponsiveSmall' : '') }, children));
};
exports.default = StepContainer;
