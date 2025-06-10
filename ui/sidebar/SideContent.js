"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SideContent;
var react_1 = __importDefault(require("react"));
function SideContent(_a) {
    var content = _a.content;
    return (react_1.default.createElement("main", { className: "fun_main_content" }, content && react_1.default.createElement("div", null, content)));
}
