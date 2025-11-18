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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var Input_1 = __importDefault(require("../input/Input"));
var react_1 = require("react");
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Button_1 = __importDefault(require("../button/Button"));
var pi_1 = require("react-icons/pi");
var Circle_1 = __importDefault(require("../specials/Circle"));
var Text_1 = __importDefault(require("../text/Text"));
var View_1 = __importDefault(require("../view/View"));
var ScrollInView_1 = __importDefault(require("../ScrollInView/ScrollInView"));
var Select_1 = __importDefault(require("../select/Select"));
var Export_1 = require("./Export");
var ToolTip_1 = __importDefault(require("../tooltip/ToolTip"));
var Tip_1 = __importDefault(require("../tooltip/Tip"));
var Flex_1 = __importDefault(require("../flex/Flex"));
var ci_1 = require("react-icons/ci");
var io5_1 = require("react-icons/io5");
var Query_1 = require("./Query");
function Table(_a) {
    var _b, _c;
    var children = _a.children, funcss = _a.funcss, bordered = _a.bordered, noStripped = _a.noStripped, hoverable = _a.hoverable, _d = _a.title, title = _d === void 0 ? "" : _d, showTotal = _a.showTotal, light = _a.light, dark = _a.dark, head = _a.head, body = _a.body, data = _a.data, _e = _a.isLoading, isLoading = _e === void 0 ? false : _e, right = _a.right, hideExport = _a.hideExport, height = _a.height, _f = _a.pageSize, pageSize = _f === void 0 ? data ? 10 : 0 : _f, // Default page size,
    customColumns = _a.customColumns, filterableFields = _a.filterableFields, // New prop
    emptyResponse = _a.emptyResponse, filterOnchange = _a.filterOnchange, clearSearch = _a.clearSearch, _g = _a.prioritizeSearchFields, prioritizeSearchFields = _g === void 0 ? [] : _g, onRowClick = _a.onRowClick, rest = __rest(_a, ["children", "funcss", "bordered", "noStripped", "hoverable", "title", "showTotal", "light", "dark", "head", "body", "data", "isLoading", "right", "hideExport", "height", "pageSize", "customColumns", "filterableFields", "emptyResponse", "filterOnchange", "clearSearch", "prioritizeSearchFields", "onRowClick"]);
    // Check if data is null or undefined before accessing its properties
    // Replace this in your component
    var _h = (0, react_1.useState)(''), search = _h[0], setSearch = _h[1];
    var _j = (0, react_1.useState)(1), currentPage = _j[0], setCurrentPage = _j[1];
    // Determine the total number of pages based on data length and page size
    var totalPages = data ? Math.ceil((((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.length) || 0) / pageSize) : 0;
    // Calculate start and end indices for data pagination
    var startIndex = data ? (currentPage - 1) * pageSize : 0;
    var endIndex = data ? Math.min(startIndex + pageSize, ((_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.length) || 0) : 0;
    var _k = (0, react_1.useState)(null), selectedField = _k[0], setSelectedField = _k[1];
    var _l = (0, react_1.useState)(null), selectedValue = _l[0], setSelectedValue = _l[1];
    var _m = (0, react_1.useState)(true), showSearch = _m[0], setshowSearch = _m[1];
    var _o = (0, react_1.useState)(""), searchQuery = _o[0], setsearchQuery = _o[1];
    React.useEffect(function () {
        if (clearSearch) {
            setsearchQuery("");
        }
    }, [clearSearch]);
    // Enhanced filter logic:
    var normalize = function (val) { return val === null || val === void 0 ? void 0 : val.toString().toLowerCase().trim(); };
    var matchesSearch = function (item) {
        var searchTerms = Array.isArray(search) ? search : [search];
        return searchTerms.some(function (term) {
            return Object.values(item).some(function (value) {
                return normalize(value).includes(normalize(term));
            });
        });
    };
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
    var getNestedValue = function (obj, path) {
        return path.split('.').reduce(function (acc, part) { return acc && acc[part]; }, obj);
    };
    var filteredData = data ? data === null || data === void 0 ? void 0 : data.data.filter(function (item) {
        if (!search && !selectedField && !selectedValue)
            return true;
        if (selectedField && selectedValue) {
            var value = getNestedValue(item, selectedField);
            if (value) {
                return value.toString().toLowerCase() === selectedValue.toString().toLowerCase();
            }
        }
        if (selectedField) {
            var value = getNestedValue(item, selectedField);
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
        (0, Export_1.ExportData)(filteredData, title, selectedField);
    };
    // Extract the data array
    var dataArray = data ? data.data : [];
    // Remove duplicate values
    var uniqueValues = selectedField
        ? Array.from(new Set(dataArray.map(function (item) { return getNestedValue(item, selectedField); })))
        : [];
    React.useEffect(function () {
        if (filterOnchange) {
            filterOnchange(selectedField, selectedValue, filteredData.length);
        }
    }, [selectedField, selectedValue]);
    return (React.createElement("div", { className: "".concat(funcss ? funcss : '', " roundEdge") },
        data &&
            React.createElement("div", { className: "padding bb" },
                React.createElement(RowFlex_1.default, { gap: 0.5, justify: 'space-between' },
                    title ?
                        React.createElement("div", null,
                            showTotal && data &&
                                React.createElement("div", null,
                                    React.createElement(Text_1.default, { text: 'Records: ', size: 'sm' }),
                                    React.createElement(Text_1.default, { text: filteredData.length, weight: 600 })),
                            title &&
                                React.createElement("div", null,
                                    React.createElement(Text_1.default, { text: title || "", size: 'h6' })))
                        :
                            React.createElement(React.Fragment, null, showTotal && data &&
                                React.createElement("div", null,
                                    React.createElement(Text_1.default, { text: 'Records: ', size: 'sm' }),
                                    React.createElement(Text_1.default, { text: filteredData.length, weight: 600, color: 'primary' }))),
                    data ?
                        React.createElement("div", null,
                            React.createElement(Flex_1.default, { width: '100%', wrap: 'nowrap', alignItems: 'center', gap: 0.7 },
                                !selectedField && !showSearch && filterableFields &&
                                    React.createElement("div", null,
                                        React.createElement(Select_1.default, { fullWidth: true, searchable: true, funcss: 'min-w-300 w-full', rounded: true, value: selectedField || '', onChange: function (e) { return handleFieldChange(e); }, options: __spreadArray([
                                                { text: '🔍 Filter', value: '' },
                                                { text: 'All*', value: '' }
                                            ], (filterableFields || []).map(function (field) { return ({
                                                text: field,
                                                value: field
                                            }); }), true) })),
                                selectedField && !showSearch && filterableFields && (React.createElement("div", { className: '' },
                                    React.createElement(Select_1.default, { rounded: true, searchable: true, funcss: 'min-w-300 w-full', fullWidth: true, value: selectedValue || '', onChange: function (e) {
                                            if (e === 'clear_all') {
                                                setSelectedField('');
                                            }
                                            else {
                                                handleValueChange(e);
                                                handleChangePage(1);
                                            }
                                        }, options: __spreadArray(__spreadArray([
                                            { text: 'All*', value: '' }
                                        ], uniqueValues
                                            .filter(Boolean) // remove null/undefined/empty
                                            .map(function (item) { return ({
                                            text: item.toString(),
                                            value: item
                                        }); }), true), [
                                            { text: 'Clear', value: 'clear_all' }
                                        ], false) }))),
                                showSearch ?
                                    React.createElement(Flex_1.default, { gap: 0.5, wrap: 'nowrap', alignItems: 'center' },
                                        React.createElement("div", { className: 'animated slide-up' },
                                            React.createElement(Input_1.default, { borderless: true, funcss: 'min-w-300', fullWidth: true, rounded: true, value: searchQuery, onChange: function (e) { return setsearchQuery(e.target.value); }, label: "Search..." })),
                                        React.createElement("div", { className: 'animated fade-in' },
                                            React.createElement("div", { onClick: function () { return setshowSearch(false); } },
                                                React.createElement(ToolTip_1.default, null,
                                                    filterableFields ? React.createElement(io5_1.IoFilterOutline, { className: 'pointer' })
                                                        :
                                                            React.createElement(pi_1.PiXThin, { className: 'pointer', size: 23, onClick: function () { return setshowSearch(false); } }),
                                                    React.createElement(Tip_1.default, { tip: "bottom", animation: "Opacity", duration: 1, content: filterableFields ? "Filter" : "Close Search" })))))
                                    :
                                        React.createElement("div", { className: 'animated fade-in' },
                                            React.createElement(ToolTip_1.default, null,
                                                React.createElement(ci_1.CiSearch, { className: 'pointer', size: 23, onClick: function () { return setshowSearch(true); } }),
                                                React.createElement(Tip_1.default, { tip: "bottom", animation: "Opacity", duration: 1, content: "Search Data" })))))
                        : '',
                    React.createElement(React.Fragment, null,
                        React.createElement(RowFlex_1.default, { gap: 0.5 },
                            right && right,
                            !hideExport &&
                                React.createElement("div", { className: 'animated slide-up' },
                                    React.createElement(ToolTip_1.default, null,
                                        React.createElement(Circle_1.default, { bg: 'lighter', bordered: true, onClick: Export },
                                            React.createElement(pi_1.PiExportThin, null)),
                                        React.createElement(Tip_1.default, { tip: "bottom", animation: "Opacity", duration: 1, content: "Export Data" }))))))),
        React.createElement("main", { style: { overflow: "auto", width: "100%" } },
            React.createElement("table", __assign({ className: "table  ".concat(bordered ? 'border' : '', " ").concat(noStripped ? '' : 'stripped', " ").concat(hoverable ? 'hoverableTr' : '', " ").concat(light ? 'light' : '', " ").concat(dark ? 'dark' : ''), style: {
                    height: height ? height + "px" : "",
                    position: 'relative',
                    zIndex: 1
                } }, rest),
                data &&
                    (data === null || data === void 0 ? void 0 : data.titles) &&
                    React.createElement(Head_1.default, null, data.titles.map(function (mdoc) { return (React.createElement("th", { key: mdoc },
                        React.createElement(Text_1.default, { text: mdoc, weight: 500, funcss: 'text-secondary' }))); })),
                head && React.createElement(Head_1.default, null, head),
                body && React.createElement(Body_1.default, null, body),
                data &&
                    (function () {
                        var results = (0, Query_1.getAdvancedFilteredData)(filteredData, searchQuery, data, getNestedValue, prioritizeSearchFields);
                        var shouldSlice = !searchQuery || results.length > 10;
                        return (shouldSlice ? results.slice(startIndex, endIndex) : results)
                            .map(function (mdoc, index) { return (React.createElement("tr", { className: 'animated slide-up', key: index, onClick: onRowClick ? function () { return onRowClick(mdoc); } : undefined },
                            data.fields.map(function (fdoc, findex) {
                                var _a;
                                return (React.createElement(Data_1.default, { key: fdoc, funcss: data.funcss ? ((_a = data === null || data === void 0 ? void 0 : data.funcss) === null || _a === void 0 ? void 0 : _a[findex]) || '' : '' }, getNestedValue(mdoc, fdoc)));
                            }),
                            customColumns ?
                                customColumns.map(function (column, columnIndex) { return (React.createElement("td", { key: columnIndex },
                                    column.render && column.render(mdoc),
                                    column.onClick && (React.createElement(Button_1.default, { onClick: function () { return column.onClick && column.onClick(mdoc); } }, column.title)))); }) : "")); });
                    })(),
                isLoading &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function () { return (React.createElement(Row_1.default, { funcss: 'skeleton' })); }),
                children ? children : ''),
            (filteredData.length === 0 && !isLoading && !children) &&
                React.createElement(ScrollInView_1.default, null,
                    React.createElement(View_1.default, { funcss: 'max-w-400 p-4 text-center center' },
                        React.createElement("div", null, (emptyResponse === null || emptyResponse === void 0 ? void 0 : emptyResponse.icon) || React.createElement(pi_1.PiEmpty, { size: 30, className: 'text-error' })),
                        React.createElement("div", null, (emptyResponse === null || emptyResponse === void 0 ? void 0 : emptyResponse.title) ||
                            React.createElement(Text_1.default, { text: "No Record Found!", size: 'xl' })),
                        React.createElement("div", null, (emptyResponse === null || emptyResponse === void 0 ? void 0 : emptyResponse.subtitle) ||
                            React.createElement(Text_1.default, { text: "You can try reloading the page or check your query" }))))),
        data &&
            React.createElement(React.Fragment, null, pageSize &&
                React.createElement(React.Fragment, null, filteredData.length > pageSize &&
                    React.createElement("div", { className: "padding bt" },
                        React.createElement(RowFlex_1.default, { gap: 1, justify: 'center' },
                            React.createElement("div", { className: "pagination" }, Array.from({ length: endPage - startPage + 1 }, function (_, i) { return (React.createElement(Circle_1.default, { size: 2.5, key: startPage + i, onClick: function () { return handleChangePage(startPage + i); }, funcss: currentPage === startPage + i ? 'primary pageCircle' : 'lighter pageCircle text-primary' },
                                React.createElement(Text_1.default, { text: "".concat(startPage + i), bold: true, size: 'sm' }))); }))))))));
}
