"use strict";
'use client';
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
exports.default = Table;
var React = __importStar(require("react"));
var Head_1 = __importDefault(require("./Head"));
var Body_1 = __importDefault(require("./Body"));
var Row_1 = __importDefault(require("./Row"));
var Data_1 = __importDefault(require("./Data"));
var react_1 = require("react");
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Button_1 = __importDefault(require("../button/Button"));
var pi_1 = require("react-icons/pi");
var Circle_1 = __importDefault(require("../specials/Circle"));
var Text_1 = __importDefault(require("../text/Text"));
var react_easy_export_1 = require("react-easy-export");
function Table(_a) {
    var _b, _c;
    var children = _a.children, funcss = _a.funcss, bordered = _a.bordered, noStripped = _a.noStripped, hoverable = _a.hoverable, title = _a.title, showTotal = _a.showTotal, light = _a.light, dark = _a.dark, head = _a.head, body = _a.body, data = _a.data, isLoading = _a.isLoading, right = _a.right, height = _a.height, _d = _a.pageSize, pageSize = _d === void 0 ? data ? 10 : 0 : _d, // Default page size,
    customColumns = _a.customColumns, filterableFields = _a.filterableFields, // New prop
    rest = __rest(_a, ["children", "funcss", "bordered", "noStripped", "hoverable", "title", "showTotal", "light", "dark", "head", "body", "data", "isLoading", "right", "height", "pageSize", "customColumns", "filterableFields"]);
    // Check if data is null or undefined before accessing its properties
    var _e = (0, react_1.useState)((data === null || data === void 0 ? void 0 : data.data) ? "" : ""), search = _e[0], setSearch = _e[1];
    var _f = (0, react_1.useState)(1), currentPage = _f[0], setCurrentPage = _f[1];
    // Determine the total number of pages based on data length and page size
    var totalPages = data ? Math.ceil((((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.length) || 0) / pageSize) : 0;
    // Calculate start and end indices for data pagination
    var startIndex = data ? (currentPage - 1) * pageSize : 0;
    var endIndex = data ? Math.min(startIndex + pageSize, ((_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.length) || 0) : 0;
    var _g = (0, react_1.useState)(null), selectedField = _g[0], setSelectedField = _g[1];
    var _h = (0, react_1.useState)(null), selectedValue = _h[0], setSelectedValue = _h[1];
    // Function to handle page change
    var handleChangePage = function (page) {
        if (data) {
            setCurrentPage(page);
        }
    };
    var handleFieldChange = function (field) {
        setSelectedField(field);
        setSelectedValue(null); // Reset selected value when field changes
    };
    var handleValueChange = function (value) {
        setSelectedValue(value);
    };
    var filteredData = data ? data === null || data === void 0 ? void 0 : data.data.filter(function (item) {
        if (!search && !selectedField && !selectedValue)
            return true;
        if (selectedField && selectedValue) {
            var value = item[selectedField];
            if (value) {
                return value.toString().toLowerCase() === selectedValue.toString().toLowerCase();
            }
        }
        if (selectedField) {
            var value = item[selectedField];
            if (value) {
                return value.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        }
        return Object.values(item).some(function (value) {
            if (value) {
                return value.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        });
    })
        : [];
    // Maximum number of visible pages for pagination
    var maxVisiblePages = 5;
    // Determine which pages to display
    var startPage = data ? Math.max(1, currentPage - Math.floor(maxVisiblePages / 2)) : 0;
    var endPage = data ? Math.min(startPage + maxVisiblePages - 1, totalPages) : 0;
    // Adjust startPage and endPage if there are not enough pages to fill maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    // Function to export data to CSV
    var Export = function () {
        (0, react_easy_export_1.exportToCSV)(filteredData, title ? "".concat(title, " ").concat(selectedField ? "_".concat(selectedField) : '', ".csv") : 'data.csv');
    };
    // Extract the data array
    var dataArray = data ? data.data : [];
    // Remove duplicate values
    var uniqueValues = selectedField
        ? Array.from(new Set(dataArray.map(function (item) { return item[selectedField]; })))
        : [];
    return (React.createElement("div", { className: "".concat(funcss ? funcss : '', " roundEdge") },
        data &&
            React.createElement("div", { className: "padding bb" },
                React.createElement(RowFlex_1.default, { justify: 'space-between' },
                    React.createElement("div", null,
                        title &&
                            React.createElement("div", null,
                                React.createElement(Text_1.default, { text: title || "", size: 'h4' })),
                        showTotal && data &&
                            React.createElement("div", null,
                                React.createElement(Text_1.default, { text: 'Records:', size: 'sm', color: 'primary' }),
                                React.createElement(Text_1.default, { text: filteredData.length, size: 'h6' }))),
                    data && filterableFields ?
                        React.createElement("div", { className: "col width-200-max" },
                            React.createElement(RowFlex_1.default, { gap: 0.7 },
                                React.createElement("select", { className: " input borderedInput roundEdgeSmall smallInput", value: selectedField || '', onChange: function (e) {
                                        handleFieldChange(e.target.value);
                                    } },
                                    React.createElement("option", { value: "" }, "\uD83D\uDD0D Filter"),
                                    React.createElement("option", { value: "" }, "All*"), filterableFields === null || filterableFields === void 0 ? void 0 :
                                    filterableFields.map(function (field) { return (React.createElement("option", { key: field, value: field }, field)); })),
                                selectedField && React.createElement("div", null, "="),
                                selectedField && (React.createElement("select", { className: " input borderedInput width-200-max  roundEdgeSmall smallInput", value: selectedValue || '', onChange: function (e) {
                                        handleValueChange(e.target.value);
                                        handleChangePage(1);
                                    } },
                                    React.createElement("option", { value: "" }, "All*"),
                                    uniqueValues.map(function (item) { return (React.createElement(React.Fragment, null, item &&
                                        React.createElement("option", { key: item[selectedField], value: item }, item.toString()))); })))))
                        : '',
                    React.createElement("div", null,
                        React.createElement(RowFlex_1.default, { gap: 0.5 },
                            right && right,
                            React.createElement(Button_1.default, { small: true, bold: true, text: 'Export', startIcon: React.createElement(pi_1.PiFileCsv, null), color: 'gradient', onClick: Export }))))),
        React.createElement("main", { style: { overflow: "auto", width: "100%" } },
            React.createElement("table", __assign({ className: "table  ".concat(bordered ? 'border' : '', " ").concat(noStripped ? '' : 'stripped', " ").concat(hoverable ? 'hoverableTr' : '', " ").concat(light ? 'light' : '', " ").concat(dark ? 'dark' : ''), style: {
                    height: height ? height + "px" : ""
                } }, rest),
                data &&
                    (data === null || data === void 0 ? void 0 : data.titles) &&
                    React.createElement(Head_1.default, null, data.titles.map(function (mdoc) { return (React.createElement("th", { key: mdoc },
                        React.createElement(Text_1.default, { text: mdoc, bold: true, color: 'primary' }))); })),
                head && React.createElement(Head_1.default, null, head),
                body && React.createElement(Body_1.default, null, body),
                data &&
                    filteredData.slice(startIndex, endIndex).map(function (mdoc, index) { return (React.createElement(Row_1.default, { rowKey: index },
                        data.fields.map(function (fdoc) { return (React.createElement(Data_1.default, { key: fdoc }, mdoc[fdoc])); }),
                        customColumns ?
                            customColumns.map(function (column, columnIndex) { return (React.createElement("td", { key: columnIndex },
                                column.render && column.render(mdoc),
                                column.onClick && (React.createElement(Button_1.default, { onClick: function () { return column.onClick && column.onClick(mdoc); } }, column.title)))); }) : "")); }),
                isLoading &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function () { return (React.createElement(Row_1.default, { funcss: 'skeleton' })); }),
                children ? children : '')),
        data &&
            React.createElement(React.Fragment, null, pageSize &&
                React.createElement(React.Fragment, null, filteredData.length > pageSize &&
                    React.createElement("div", { className: "padding bt" },
                        React.createElement(RowFlex_1.default, { gap: 1, justify: 'center' },
                            React.createElement("div", { className: "pagination" }, Array.from({ length: endPage - startPage + 1 }, function (_, i) { return (React.createElement(Circle_1.default, { size: 2.5, key: startPage + i, onClick: function () { return handleChangePage(startPage + i); }, funcss: currentPage === startPage + i ? 'primary pageCircle' : 'dark800 pageCircle text-primary' },
                                React.createElement(Text_1.default, { text: "".concat(startPage + i), bold: true, size: 'sm' }))); }))))))));
}
