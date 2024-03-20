"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Head_1 = __importDefault(require("./Head"));
var Body_1 = __importDefault(require("./Body"));
var Row_1 = __importDefault(require("./Row"));
var Data_1 = __importDefault(require("./Data"));
var Input_1 = __importDefault(require("../input/Input"));
var react_1 = require("react");
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Button_1 = __importDefault(require("../button/Button"));
var pi_1 = require("react-icons/pi");
var Circle_1 = __importDefault(require("../specials/Circle"));
var Text_1 = __importDefault(require("../text/Text"));
var react_easy_export_1 = require("react-easy-export");
function Table(_a) {
    var _b, _c;
    var children = _a.children, funcss = _a.funcss, bordered = _a.bordered, noStripped = _a.noStripped, hoverable = _a.hoverable, showTotal = _a.showTotal, light = _a.light, dark = _a.dark, head = _a.head, body = _a.body, data = _a.data, height = _a.height, _d = _a.pageSize, pageSize = _d === void 0 ? data ? 10 : 0 : _d, // Default page size,
    customColumns = _a.customColumns, rest = __rest(_a, ["children", "funcss", "bordered", "noStripped", "hoverable", "showTotal", "light", "dark", "head", "body", "data", "height", "pageSize", "customColumns"]);
    var _e = (0, react_1.useState)(""), search = _e[0], setSearch = _e[1];
    var _f = (0, react_1.useState)(1), currentPage = _f[0], setCurrentPage = _f[1];
    var totalPages = Math.ceil((((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.length) || 0) / pageSize);
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize, ((_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.length) || 0);
    var handleChangePage = function (page) {
        setCurrentPage(page);
    };
    var filteredData = data === null || data === void 0 ? void 0 : data.data.filter(function (item) {
        return Object.values(item).some(function (value) {
            return value.toString().toLowerCase().includes(search.toLowerCase());
        });
    });
    var maxVisiblePages = 5; // Maximum number of visible pages
    // Determine which pages to display
    var startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    var endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    // Adjust startPage and endPage if there are not enough pages to fill maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    var Export = function () {
        (0, react_easy_export_1.exportToCSV)(data.data, 'data.csv');
    };
    return (React.createElement("div", { className: "".concat(funcss ? funcss : '', " roundEdge") },
        data &&
            React.createElement("div", { className: "padding bb" },
                React.createElement(RowFlex_1.default, { justify: 'space-between' },
                    data &&
                        React.createElement("div", { className: "col width-200-max" },
                            React.createElement(Input_1.default, { fullWidth: true, bordered: true, funcss: "text-smaller text-bold height-30", label: "Search...", onChange: function (e) { return setSearch(e.target.value); } })),
                    React.createElement("div", null,
                        React.createElement(Button_1.default, { small: true, bold: true, text: 'Export', startIcon: React.createElement(pi_1.PiDownload, null), onClick: Export })))),
        React.createElement("table", __assign({ className: "table  ".concat(bordered ? 'border' : '', " ").concat(noStripped ? '' : 'stripped', " ").concat(hoverable ? 'hoverableTr' : '', " ").concat(light ? 'light' : '', " ").concat(dark ? 'dark' : ''), style: {
                height: height ? height + "px" : ""
            } }, rest),
            (data === null || data === void 0 ? void 0 : data.titles) &&
                React.createElement(Head_1.default, null, data.titles.map(function (mdoc) { return (React.createElement("th", { key: mdoc }, mdoc)); })),
            head && React.createElement(Head_1.default, null, head),
            body && React.createElement(Body_1.default, null, body),
            data &&
                filteredData.slice(startIndex, endIndex).map(function (mdoc, index) { return (React.createElement(Row_1.default, { rowKey: index },
                    data.fields.map(function (fdoc) { return (React.createElement(Data_1.default, { key: fdoc }, mdoc[fdoc])); }),
                    customColumns &&
                        customColumns)); }),
            children ? children : ''),
        data &&
            React.createElement(React.Fragment, null,
                React.createElement("div", { className: "padding bt" },
                    React.createElement(RowFlex_1.default, { gap: 1, justify: 'space-between' },
                        React.createElement("div", { className: "" }, data &&
                            React.createElement("div", { className: "text-bold" },
                                "Total: ",
                                filteredData.length)),
                        React.createElement("div", { className: "pagination" }, Array.from({ length: endPage - startPage + 1 }, function (_, i) { return (React.createElement(Circle_1.default, { size: 2, key: startPage + i, onClick: function () { return handleChangePage(startPage + i); }, funcss: currentPage === startPage + i ? 'primary pageCircle' : 'dark pageCircle' },
                            React.createElement(Text_1.default, { text: "".concat(startPage + i), bold: true }))); })))))));
}
exports.default = Table;
