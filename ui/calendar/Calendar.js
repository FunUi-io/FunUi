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
var isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
var isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
var pi_1 = require("react-icons/pi");
var Avatar_1 = __importDefault(require("../avatar/Avatar"));
var Circle_1 = __importDefault(require("../specials/Circle"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Input_1 = __importDefault(require("../input/Input"));
var Button_1 = __importDefault(require("../button/Button"));
var Text_1 = __importDefault(require("../text/Text"));
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
var Calendar = function (_a) {
    var activities = _a.activities, onAdd = _a.onAdd, onActivityClick = _a.onActivityClick, onDateClick = _a.onDateClick, _b = _a.funcss, funcss = _b === void 0 ? '' : _b, _c = _a.weekStart, weekStart = _c === void 0 ? 0 : _c, renderActivity = _a.renderActivity, _d = _a.showAdjacentMonths, showAdjacentMonths = _d === void 0 ? true : _d, minDate = _a.minDate, maxDate = _a.maxDate;
    var _e = (0, react_1.useState)((0, dayjs_1.default)()), currentMonth = _e[0], setCurrentMonth = _e[1];
    var _f = (0, react_1.useState)(null), hoveredDate = _f[0], setHoveredDate = _f[1];
    var _g = (0, react_1.useState)(null), selectedDate = _g[0], setSelectedDate = _g[1];
    // Memoized calculations
    var _h = (0, react_1.useMemo)(function () {
        var startOfMonth = currentMonth.startOf('month');
        var endOfMonth = currentMonth.endOf('month');
        // Calculate days grid
        var firstDay = startOfMonth.day();
        var daysBefore = (firstDay - weekStart + 7) % 7;
        var daysInMonth = currentMonth.daysInMonth();
        var totalDays = Math.ceil((daysBefore + daysInMonth) / 7) * 7;
        var days = [];
        // Previous month days
        for (var i = daysBefore - 1; i >= 0; i--) {
            var date = startOfMonth.subtract(i + 1, 'day');
            days.push(showAdjacentMonths ? date : null);
        }
        // Current month days
        for (var i = 0; i < daysInMonth; i++) {
            days.push(startOfMonth.add(i, 'day'));
        }
        // Next month days
        var remaining = totalDays - days.length;
        for (var i = 0; i < remaining; i++) {
            var date = endOfMonth.add(i + 1, 'day');
            days.push(showAdjacentMonths ? date : null);
        }
        // Group activities by date
        var monthActivities = {};
        activities.forEach(function (activity) {
            var date = (0, dayjs_1.default)(activity.date);
            if (date.isSame(currentMonth, 'month') ||
                (showAdjacentMonths && (date.isBefore(endOfMonth) && date.isAfter(startOfMonth)))) {
                var key = date.format('YYYY-MM-DD');
                if (!monthActivities[key])
                    monthActivities[key] = [];
                monthActivities[key].push(activity);
            }
        });
        return { days: days, monthActivities: monthActivities };
    }, [currentMonth, activities, weekStart, showAdjacentMonths]), days = _h.days, monthActivities = _h.monthActivities;
    // Navigation handlers
    var prevMonth = function () { return setCurrentMonth(currentMonth.subtract(1, 'month')); };
    var nextMonth = function () { return setCurrentMonth(currentMonth.add(1, 'month')); };
    var goToToday = function () { return setCurrentMonth((0, dayjs_1.default)()); };
    // Date handlers
    var handleDateClick = function (date) {
        if (isDateDisabled(date))
            return;
        setSelectedDate(date.toDate());
        onDateClick === null || onDateClick === void 0 ? void 0 : onDateClick(date.toDate());
    };
    var handleAdd = function (e, date) {
        e.stopPropagation();
        if (isDateDisabled(date))
            return;
        onAdd === null || onAdd === void 0 ? void 0 : onAdd(date.toDate());
    };
    // Utility functions
    var isDateDisabled = function (date) {
        return ((minDate && date.isBefore((0, dayjs_1.default)(minDate), 'day')) ||
            (maxDate && date.isAfter((0, dayjs_1.default)(maxDate), 'day')));
    };
    var isToday = function (date) { return date.isSame((0, dayjs_1.default)(), 'day'); };
    var isSelected = function (date) { return selectedDate && date.isSame(selectedDate, 'day'); };
    var isCurrentMonth = function (date) { return date.isSame(currentMonth, 'month'); };
    // Weekday headers
    var weekdays = (0, react_1.useMemo)(function () {
        var days = [];
        for (var i = 0; i < 7; i++) {
            var day = (0, dayjs_1.default)().day((weekStart + i) % 7);
            days.push(day.format('dd'));
        }
        return days;
    }, [weekStart]);
    return (react_1.default.createElement("div", { className: "calendar ".concat(funcss) },
        react_1.default.createElement("div", { className: "calendar-header" },
            react_1.default.createElement(Avatar_1.default, { funcss: 'border', onClick: prevMonth, "aria-label": "Previous month" },
                react_1.default.createElement(pi_1.PiCaretLeft, null)),
            react_1.default.createElement("div", { className: "calendar-title" },
                react_1.default.createElement(Input_1.default, { value: currentMonth.month(), onChange: function (e) {
                        var newMonth = currentMonth.month(parseInt(e.target.value));
                        setCurrentMonth(newMonth);
                    }, type: "text", label: "Select Month", borderless: true, fullWidth: true, funcss: 'round-edge', select: true, options: [
                        { value: "", text: "-- Select month --" },
                        { value: "0", text: "January" },
                        { value: "1", text: "February" },
                        { value: "2", text: "March" },
                        { value: "3", text: "April" },
                        { value: "4", text: "May" },
                        { value: "5", text: "June" },
                        { value: "6", text: "July" },
                        { value: "7", text: "August" },
                        { value: "8", text: "September" },
                        { value: "9", text: "October" },
                        { value: "10", text: "November" },
                        { value: "11", text: "December" }
                    ] }),
                react_1.default.createElement(Input_1.default, { type: "text", label: "Select Year", funcss: 'round-edge', fullWidth: true, borderless: true, select: true, value: currentMonth.year().toString(), onChange: function (e) {
                        var newYear = currentMonth.year(parseInt(e.target.value));
                        setCurrentMonth(newYear);
                    }, options: Array.from({ length: 21 }, function (_, i) {
                        var year = (0, dayjs_1.default)().year() - 10 + i;
                        return {
                            value: year.toString(),
                            text: year.toString(),
                        };
                    }) }),
                react_1.default.createElement(Button_1.default, { bg: 'lighter border', onClick: goToToday }, "Today")),
            react_1.default.createElement(Avatar_1.default, { funcss: 'border', onClick: nextMonth, "aria-label": "Next month" },
                react_1.default.createElement(pi_1.PiCaretRight, null))),
        react_1.default.createElement("div", { className: "calendar-weekdays" }, weekdays.map(function (d, i) { return (react_1.default.createElement("div", { key: i, className: "weekday-header" }, d)); })),
        react_1.default.createElement("div", { className: "calendar-grid" }, days.map(function (date, index) {
            if (!date)
                return react_1.default.createElement("div", { key: index, className: "calendar-cell empty" });
            var key = date.format('YYYY-MM-DD');
            var activitiesToday = monthActivities[key] || [];
            var disabled = isDateDisabled(date);
            var today = isToday(date);
            var selected = isSelected(date);
            var currentMonth = isCurrentMonth(date);
            return (react_1.default.createElement("div", { key: key, className: "calendar-cell ".concat(!currentMonth ? 'adjacent-month' : '', " ").concat(disabled ? 'disabled' : '', " ").concat(today ? 'today' : '', " ").concat(selected ? 'selected' : ''), onClick: function () { return handleDateClick(date); }, onMouseEnter: function () { return setHoveredDate(key); }, onMouseLeave: function () { return setHoveredDate(null); }, "aria-disabled": disabled, "aria-label": date.format('MMMM D, YYYY'), role: "button", tabIndex: 0 },
                react_1.default.createElement("div", { className: "day-number" },
                    react_1.default.createElement(RowFlex_1.default, { justify: 'space-between', align: 'center', gap: 0.5 },
                        react_1.default.createElement(Text_1.default, { text: date.date(), color: today ? 'primary' : '', size: 'xl' }),
                        today && react_1.default.createElement(pi_1.PiChecks, { className: "text-success" }))),
                react_1.default.createElement("div", { className: "activities" },
                    activitiesToday.slice(0, 2).map(function (activity) { return (react_1.default.createElement("div", { key: activity.id, className: "activity-tag", style: { backgroundColor: activity.color || '#e0e0e0' }, onClick: function (e) {
                            e.stopPropagation();
                            onActivityClick === null || onActivityClick === void 0 ? void 0 : onActivityClick(activity);
                        } }, renderActivity ? renderActivity(activity) : activity.title)); }),
                    activitiesToday.length > 2 && (react_1.default.createElement("div", { className: "activity-more" },
                        "+",
                        activitiesToday.length - 2,
                        " more"))),
                hoveredDate === key && !disabled && (react_1.default.createElement("div", { className: "add-icon", onClick: function (e) { return handleAdd(e, date); }, "aria-label": "Add event on ".concat(date.format('MMMM D')) },
                    react_1.default.createElement(Circle_1.default, { hoverable: true, funcss: 'card bg' },
                        react_1.default.createElement(pi_1.PiPlus, null))))));
        }))));
};
exports.default = Calendar;
