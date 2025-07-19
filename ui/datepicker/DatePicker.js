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
var react_1 = __importStar(require("react"));
var dayjs_1 = __importDefault(require("dayjs"));
var Avatar_1 = __importDefault(require("../avatar/Avatar"));
var pi_1 = require("react-icons/pi");
var DatePicker = function (_a) {
    var _b = _a.mode, mode = _b === void 0 ? 'single' : _b, onSelect = _a.onSelect, value = _a.value, funcss = _a.funcss, _c = _a.className, className = _c === void 0 ? '' : _c;
    var _d = (0, react_1.useState)((0, dayjs_1.default)()), currentMonth = _d[0], setCurrentMonth = _d[1];
    var _e = (0, react_1.useState)(value || null), selected = _e[0], setSelected = _e[1];
    var daysInMonth = currentMonth.daysInMonth();
    var firstDay = currentMonth.startOf('month').day(); // 0 = Sunday
    var days = [];
    for (var i = 0; i < firstDay; i++) {
        days.push(null); // padding
    }
    for (var i = 1; i <= daysInMonth; i++) {
        days.push(currentMonth.date(i).toDate());
    }
    var handleSelect = function (date) {
        if (mode === 'single') {
            setSelected(date);
            onSelect === null || onSelect === void 0 ? void 0 : onSelect(date);
        }
        else if (mode === 'interval') {
            if (!selected || !Array.isArray(selected)) {
                setSelected([date, null]);
            }
            else {
                var start = selected[0], end = selected[1];
                if (!end) {
                    var range = (0, dayjs_1.default)(date).isBefore((0, dayjs_1.default)(start)) ? [date, start] : [start, date];
                    setSelected(range);
                    onSelect === null || onSelect === void 0 ? void 0 : onSelect(range);
                }
                else {
                    setSelected([date, null]); // restart
                }
            }
        }
    };
    var isSelected = function (date) {
        if (!selected)
            return false;
        if (mode === 'single' && selected instanceof Date) {
            return (0, dayjs_1.default)(selected).isSame(date, 'day');
        }
        if (Array.isArray(selected)) {
            var start = selected[0], end = selected[1];
            if (start && end) {
                return ((0, dayjs_1.default)(date).isSame(start, 'day') ||
                    (0, dayjs_1.default)(date).isSame(end, 'day') ||
                    ((0, dayjs_1.default)(date).isAfter(start) && (0, dayjs_1.default)(date).isBefore(end)));
            }
            return (0, dayjs_1.default)(date).isSame(start, 'day');
        }
        return false;
    };
    var nextMonth = function () { return setCurrentMonth(currentMonth.add(1, 'month')); };
    var prevMonth = function () { return setCurrentMonth(currentMonth.subtract(1, 'month')); };
    var handleClear = function () {
        setSelected(null);
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(mode === 'single' ? null : null);
    };
    var formatDate = function (date) {
        return date ? (0, dayjs_1.default)(date).format('MMM D, YYYY') : '...';
    };
    return (react_1.default.createElement("div", { className: "datepicker ".concat(funcss, " ").concat(className) },
        react_1.default.createElement("div", { className: "datepicker-header" },
            react_1.default.createElement(Avatar_1.default, { onClick: prevMonth },
                react_1.default.createElement(pi_1.PiCaretLeft, null)),
            react_1.default.createElement("span", null, currentMonth.format('MMMM YYYY')),
            react_1.default.createElement(Avatar_1.default, { onClick: nextMonth },
                react_1.default.createElement(pi_1.PiCaretRight, null))),
        selected && (react_1.default.createElement("div", { className: "datepicker-selected" },
            react_1.default.createElement("span", { className: "interval-display" },
                mode === 'single' && selected instanceof Date && (react_1.default.createElement(react_1.default.Fragment, null,
                    "Selected: ",
                    formatDate(selected))),
                mode === 'interval' && Array.isArray(selected) && (react_1.default.createElement("div", { className: 'text-sm' }, selected[1]
                    ? "From ".concat(formatDate(selected[0]), " to ").concat(formatDate(selected[1]))
                    : "Start: ".concat(formatDate(selected[0]), " - Select end date")))),
            react_1.default.createElement("div", { style: { lineHeight: "0" } },
                react_1.default.createElement(pi_1.PiX, { className: "clear-icon", onClick: handleClear, style: { cursor: 'pointer' } })))),
        react_1.default.createElement("div", { className: "datepicker-weekdays" }, ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(function (d) { return (react_1.default.createElement("div", { key: d }, d)); })),
        react_1.default.createElement("div", { className: "datepicker-grid" }, days.map(function (date, idx) {
            var isSelectedClass = date && isSelected(date) ? 'selected' : '';
            var isInRangeClass = date && isSelected(date) && Array.isArray(selected) ? 'in-range' : '';
            return (react_1.default.createElement("div", { key: idx, onClick: function () { return date && handleSelect(date); }, className: "datepicker-day ".concat(!date ? 'empty' : '', " ").concat(isSelectedClass, " ").concat(isInRangeClass) }, date ? (0, dayjs_1.default)(date).date() : ''));
        }))));
};
exports.default = DatePicker;
