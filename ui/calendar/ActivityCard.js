"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Text_1 = __importDefault(require("../text/Text"));
var ActivityCard = function (_a) {
    var activity = _a.activity, onClick = _a.onClick;
    return (react_1.default.createElement("div", { className: "activity-tag animated slide-up ".concat(activity.funcss || ''), style: { backgroundColor: activity.color || '' }, onClick: function (e) {
            e.stopPropagation();
            onClick === null || onClick === void 0 ? void 0 : onClick(activity);
        } },
        react_1.default.createElement(Text_1.default, { text: activity.title, size: "xs", block: true, truncate: 2 }),
        activity.footer && react_1.default.createElement("div", null, activity.footer)));
};
exports.default = ActivityCard;
