"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var StepTitle = function (_a) {
    var children = _a.children, funcss = _a.funcss;
    return (react_1.default.createElement("div", { className: "stepHeader ".concat(funcss ? funcss : '') }, children));
};
exports.default = StepTitle;
