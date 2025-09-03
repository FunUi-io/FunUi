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
var ActivityCard_1 = __importDefault(require("./ActivityCard"));
var View_1 = __importDefault(require("../view/View"));
var Dropdown_1 = __importDefault(require("../drop/Dropdown"));
var hi_1 = require("react-icons/hi");
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
var Calendar = function (_a) {
    var activities = _a.activities, onAdd = _a.onAdd, onActivityClick = _a.onActivityClick, onDateClick = _a.onDateClick, _b = _a.funcss, funcss = _b === void 0 ? '' : _b, _c = _a.weekStart, weekStart = _c === void 0 ? 0 : _c, renderActivity = _a.renderActivity, _d = _a.showAdjacentMonths, showAdjacentMonths = _d === void 0 ? true : _d, minDate = _a.minDate, maxDate = _a.maxDate;
    var _e = (0, react_1.useState)((0, dayjs_1.default)()), currentMonth = _e[0], setCurrentMonth = _e[1];
    var _f = (0, react_1.useState)(null), hoveredDate = _f[0], setHoveredDate = _f[1];
    var _g = (0, react_1.useState)(null), selectedDate = _g[0], setSelectedDate = _g[1];
    var _h = (0, react_1.useState)(false), showMoreActivities = _h[0], setShowMoreActivities = _h[1];
    // ✅ NEW: View mode state
    var _j = (0, react_1.useState)('month'), viewMode = _j[0], setViewMode = _j[1];
    var startOfWeek = currentMonth.startOf('week').add(weekStart, 'day');
    var _k = (0, react_1.useMemo)(function () {
        var days = [];
        if (viewMode === 'month') {
            var startOfMonth = currentMonth.startOf('month');
            var endOfMonth = currentMonth.endOf('month');
            var firstDay = startOfMonth.day();
            var daysBefore = (firstDay - weekStart + 7) % 7;
            var daysInMonth = currentMonth.daysInMonth();
            var totalDays = Math.ceil((daysBefore + daysInMonth) / 7) * 7;
            for (var i = daysBefore - 1; i >= 0; i--) {
                var date = startOfMonth.subtract(i + 1, 'day');
                days.push(showAdjacentMonths ? date : null);
            }
            for (var i = 0; i < daysInMonth; i++) {
                days.push(startOfMonth.add(i, 'day'));
            }
            var remaining = totalDays - days.length;
            for (var i = 0; i < remaining; i++) {
                var date = endOfMonth.add(i + 1, 'day');
                days.push(showAdjacentMonths ? date : null);
            }
        }
        else {
            // ✅ Week View: only 7 days
            for (var i = 0; i < 7; i++) {
                days.push(startOfWeek.add(i, 'day'));
            }
        }
        var monthActivities = {};
        activities.forEach(function (activity) {
            var date = (0, dayjs_1.default)(activity.date);
            var key = date.format('YYYY-MM-DD');
            if (viewMode === 'month' &&
                (date.isSame(currentMonth, 'month') || (showAdjacentMonths &&
                    (date.isBefore(currentMonth.endOf('month')) && date.isAfter(currentMonth.startOf('month')))))) {
                if (!monthActivities[key])
                    monthActivities[key] = [];
                monthActivities[key].push(activity);
            }
            if (viewMode === 'week' && date.isSame(startOfWeek, 'week')) {
                if (!monthActivities[key])
                    monthActivities[key] = [];
                monthActivities[key].push(activity);
            }
        });
        return { days: days, monthActivities: monthActivities };
    }, [currentMonth, activities, viewMode, weekStart, showAdjacentMonths]), days = _k.days, monthActivities = _k.monthActivities;
    var prevPeriod = function () {
        return setCurrentMonth(currentMonth.subtract(1, viewMode === 'month' ? 'month' : 'week'));
    };
    var nextPeriod = function () {
        return setCurrentMonth(currentMonth.add(1, viewMode === 'month' ? 'month' : 'week'));
    };
    var goToToday = function () { return setCurrentMonth((0, dayjs_1.default)()); };
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
    var isDateDisabled = function (date) {
        return (minDate && date.isBefore((0, dayjs_1.default)(minDate), 'day')) ||
            (maxDate && date.isAfter((0, dayjs_1.default)(maxDate), 'day'));
    };
    var isToday = function (date) { return date.isSame((0, dayjs_1.default)(), 'day'); };
    var isSelected = function (date) { return selectedDate && date.isSame(selectedDate, 'day'); };
    var weekdays = (0, react_1.useMemo)(function () {
        var days = [];
        for (var i = 0; i < 7; i++) {
            var day = (0, dayjs_1.default)().day((weekStart + i) % 7);
            days.push(day.format('dd'));
        }
        return days;
    }, [weekStart]);
    var _l = (0, react_1.useState)(false), isMobile = _l[0], setIsMobile = _l[1];
    (0, react_1.useEffect)(function () {
        var updateViewMode = function () {
            var small = window.innerWidth < 768;
            setIsMobile(small);
            setViewMode(small ? 'week' : 'month');
        };
        updateViewMode(); // initial check
        window.addEventListener('resize', updateViewMode);
        return function () { return window.removeEventListener('resize', updateViewMode); };
    }, []);
    return (react_1.default.createElement("div", { className: "calendar ".concat(funcss) },
        react_1.default.createElement("div", { className: "calendar-header" },
            react_1.default.createElement(Avatar_1.default, { funcss: "border", onClick: prevPeriod },
                react_1.default.createElement(pi_1.PiCaretLeft, null)),
            react_1.default.createElement("div", { className: "calendar-title" },
                react_1.default.createElement(RowFlex_1.default, { gap: 1, align: "center" },
                    react_1.default.createElement(Input_1.default, { type: "text", select: true, value: currentMonth.month().toString(), onChange: function (e) {
                            return setCurrentMonth(currentMonth.month(parseInt(e.target.value)));
                        }, options: Array.from({ length: 12 }, function (_, i) { return ({
                            value: i.toString(),
                            text: (0, dayjs_1.default)().month(i).format('MMMM'),
                        }); }), borderless: true, funcss: "round-edge" }),
                    react_1.default.createElement(Input_1.default, { type: "text", select: true, value: currentMonth.year().toString(), onChange: function (e) {
                            return setCurrentMonth(currentMonth.year(parseInt(e.target.value)));
                        }, options: Array.from({ length: 21 }, function (_, i) {
                            var year = (0, dayjs_1.default)().year() - 10 + i;
                            return { value: year.toString(), text: year.toString() };
                        }), borderless: true, funcss: "round-edge" }),
                    react_1.default.createElement(Dropdown_1.default, { direction: "dropdown", position: 'right', openOnHover: false, button: react_1.default.createElement(Avatar_1.default, null,
                            react_1.default.createElement(hi_1.HiOutlineDotsVertical, null)), items: [
                            {
                                label: react_1.default.createElement("span", { className: "text-sm" }, "Today"),
                                onClick: function () { return goToToday(); },
                            },
                            {
                                label: react_1.default.createElement("div", { className: "text-sm", onClick: function () {
                                        return setViewMode(viewMode === 'month' ? 'week' : 'month');
                                    } }, viewMode === 'month' ? 'Switch to Week' : 'Switch to Month'),
                            },
                        ] }))),
            react_1.default.createElement(Avatar_1.default, { funcss: "border", onClick: nextPeriod },
                react_1.default.createElement(pi_1.PiCaretRight, null))),
        react_1.default.createElement("div", { className: "calendar-weekdays" }, weekdays.map(function (d, i) { return (react_1.default.createElement("div", { key: i, className: "weekday-header" }, d)); })),
        react_1.default.createElement("div", { className: "calendar-grid" }, days.map(function (date, index) {
            if (!date || (viewMode === 'month' && !date.isSame(currentMonth, 'month'))) {
                return react_1.default.createElement("div", { key: index, className: "calendar-cell empty" });
            }
            var key = date.format('YYYY-MM-DD');
            var activitiesToday = monthActivities[key] || [];
            var disabled = isDateDisabled(date);
            var today = isToday(date);
            var selected = isSelected(date);
            return (react_1.default.createElement("div", { key: key, className: "calendar-cell hoverable ".concat(disabled ? 'disabled' : '', " ").concat(today ? 'today' : '', " ").concat(selected ? 'selected' : ''), onClick: function () { return handleDateClick(date); }, onMouseEnter: function () { return setHoveredDate(key); }, onMouseLeave: function () { return setHoveredDate(null); } },
                react_1.default.createElement("div", { className: "day-number ".concat(today ? 'today' : '') }, date.date()),
                !isMobile && (react_1.default.createElement("div", { className: "activities " },
                    activitiesToday.slice(0, showMoreActivities ? activitiesToday.length : 3).map(function (activity) { return (react_1.default.createElement(ActivityCard_1.default, { activity: activity, onClick: function (e) {
                            onActivityClick === null || onActivityClick === void 0 ? void 0 : onActivityClick(activity);
                        } })); }),
                    activitiesToday.length > 3 && (react_1.default.createElement(Button_1.default, { smaller: true, funcss: 'p-0', color: "primary", onClick: function () { return setShowMoreActivities(!showMoreActivities); } }, showMoreActivities ? 'Show Less' : react_1.default.createElement(react_1.default.Fragment, null,
                        "+",
                        activitiesToday.length - 3,
                        " more"))))),
                hoveredDate === key && !disabled && (react_1.default.createElement("div", { className: "add-icon hide-small", onClick: function (e) { return handleAdd(e, date); } },
                    react_1.default.createElement(Circle_1.default, { bg: 'primary' },
                        react_1.default.createElement(pi_1.PiPlus, null))))));
        })),
        isMobile && selectedDate && (react_1.default.createElement("div", { className: "calendar-activities-mobile p-1" },
            react_1.default.createElement(RowFlex_1.default, { gap: 0.5, justify: "space-between", align: "center", className: "mt-3 mb-2" },
                react_1.default.createElement(Text_1.default, { text: (0, dayjs_1.default)(selectedDate).format('dddd, MMMM D'), weight: 600, funcss: "mb-2" }),
                react_1.default.createElement("div", { onClick: function (e) { return handleAdd(e, (0, dayjs_1.default)(selectedDate)); } },
                    react_1.default.createElement(Circle_1.default, { bg: "primary" },
                        react_1.default.createElement(pi_1.PiPlus, null)))),
            (monthActivities[(0, dayjs_1.default)(selectedDate).format('YYYY-MM-DD')] || []).map(function (activity) { return (react_1.default.createElement(ActivityCard_1.default, { activity: activity, onClick: function (e) {
                    onActivityClick === null || onActivityClick === void 0 ? void 0 : onActivityClick(activity);
                } })); }),
            (monthActivities[(0, dayjs_1.default)(selectedDate).format('YYYY-MM-DD')] || []).length === 0 && (react_1.default.createElement(View_1.default, { funcss: 'mt-2 text-center' },
                react_1.default.createElement("div", null,
                    " ",
                    react_1.default.createElement(pi_1.PiEmpty, { size: 30 })),
                react_1.default.createElement(Text_1.default, { text: "No activities for this day.", size: "sm", opacity: 2 }),
                react_1.default.createElement("div", { className: "mt-2" },
                    react_1.default.createElement("span", { onClick: function (e) { return handleAdd(e, (0, dayjs_1.default)(selectedDate)); } },
                        react_1.default.createElement(Button_1.default, { small: true, bg: 'lighter', startIcon: react_1.default.createElement(pi_1.PiPlus, null) }, "Add Activity")))))))));
};
exports.default = Calendar;
