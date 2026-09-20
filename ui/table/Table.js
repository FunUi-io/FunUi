'use client';
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
var Input_1 = __importDefault(require("../input/Input"));
var react_1 = require("react");
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Button_1 = __importDefault(require("../button/Button"));
var pi_1 = require("react-icons/pi");
var Circle_1 = __importDefault(require("../specials/Circle"));
var Text_1 = __importDefault(require("../text/Text"));
var Select_1 = __importDefault(require("../select/Select"));
var Export_1 = require("./Export");
var ToolTip_1 = __importDefault(require("../tooltip/ToolTip"));
var Flex_1 = __importDefault(require("../flex/Flex"));
var ci_1 = require("react-icons/ci");
var io5_1 = require("react-icons/io5");
var Query_1 = require("./Query");
var Empty_1 = __importDefault(require("../empty/Empty"));
// Helper function to normalize data structure
var normalizeData = function (data) {
    if (!data)
        return null;
    // Old format
    if ('fields' in data && 'titles' in data) {
        return {
            fields: data.fields || [],
            data: data.data || [],
            titles: data.titles || [],
            funcss: data.funcss || [],
            columns: (data.columns || []).map(function (col) { return typeof col === 'string' ? { title: col, field: col } : col; })
        };
    }
    // New format with data property
    if ('data' in data) {
        var dataObj_1 = data;
        var rawData = dataObj_1.data || [];
        var fields = [];
        var titles = [];
        var funcss = dataObj_1.funcss || [];
        var columns = [];
        // If we have columns array (like in Staff example)
        if (dataObj_1.columns && Array.isArray(dataObj_1.columns)) {
            // Convert string columns to ColumnConfig objects
            columns = dataObj_1.columns.map(function (col, index) {
                var _a;
                if (typeof col === 'string') {
                    return {
                        field: ((_a = dataObj_1.fields) === null || _a === void 0 ? void 0 : _a[index]) || "field".concat(index),
                        title: col
                    };
                }
                return col;
            });
            titles = columns.map(function (col) { return col.title; });
            // Use provided fields or extract from columns
            if (dataObj_1.fields && dataObj_1.fields.length > 0) {
                fields = dataObj_1.fields;
            }
            else {
                // Extract fields from columns that have real fields
                fields = columns
                    .map(function (col) { return col.field; })
                    .filter(function (field) { return field && !field.startsWith('field'); });
            }
        }
        // If we have both fields and titles
        else if (dataObj_1.fields && dataObj_1.titles) {
            fields = dataObj_1.fields;
            titles = dataObj_1.titles;
        }
        // Auto-detect
        else if (rawData.length > 0) {
            var firstItem = rawData[0];
            fields = Object.keys(firstItem);
            titles = fields.map(function (field) {
                return field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ');
            });
        }
        return {
            fields: fields,
            data: rawData,
            titles: titles,
            funcss: funcss,
            columns: columns.length > 0 ? columns : undefined
        };
    }
    return null;
};
function Table(_a) {
    var _b, _c, _d;
    var children = _a.children, funcss = _a.funcss, bordered = _a.bordered, noStripped = _a.noStripped, hoverable = _a.hoverable, _e = _a.title, title = _e === void 0 ? "" : _e, showTotal = _a.showTotal, light = _a.light, dark = _a.dark, head = _a.head, body = _a.body, propData = _a.data, _f = _a.isLoading, isLoading = _f === void 0 ? false : _f, right = _a.right, hideExport = _a.hideExport, height = _a.height, pageSize = _a.pageSize, customColumns = _a.customColumns, filterableFields = _a.filterableFields, // New prop
    emptyResponse = _a.emptyResponse, filterOnchange = _a.filterOnchange, clearSearch = _a.clearSearch, _g = _a.prioritizeSearchFields, prioritizeSearchFields = _g === void 0 ? [] : _g, onRowClick = _a.onRowClick, trCss = _a.trCss, columns = _a.columns, // New columns prop
    rest = __rest(_a, ["children", "funcss", "bordered", "noStripped", "hoverable", "title", "showTotal", "light", "dark", "head", "body", "data", "isLoading", "right", "hideExport", "height", "pageSize", "customColumns", "filterableFields", "emptyResponse", "filterOnchange", "clearSearch", "prioritizeSearchFields", "onRowClick", "trCss", "columns"]);
    // Normalize data
    var normalizedData = (0, react_1.useMemo)(function () { return normalizeData(propData); }, [propData]);
    var _h = (0, react_1.useState)(''), search = _h[0], setSearch = _h[1];
    var _j = (0, react_1.useState)(1), currentPage = _j[0], setCurrentPage = _j[1];
    // Calculate total columns including custom columns
    var totalDataColumns = ((_b = normalizedData === null || normalizedData === void 0 ? void 0 : normalizedData.fields) === null || _b === void 0 ? void 0 : _b.length) || 0;
    var totalCustomColumns = (customColumns === null || customColumns === void 0 ? void 0 : customColumns.length) || 0;
    var totalColumns = totalDataColumns + totalCustomColumns;
    // Use the titles array if it has enough items (includes custom columns)
    // Otherwise, combine data titles with custom column titles
    var allTitles = (0, react_1.useMemo)(function () {
        var titles = [];
        if (normalizedData === null || normalizedData === void 0 ? void 0 : normalizedData.titles) {
            // If titles array is longer than fields, it might already include custom columns
            if (normalizedData.titles.length >= totalColumns) {
                return normalizedData.titles.slice(0, totalColumns);
            }
            // Otherwise, start with data titles
            titles.push.apply(titles, normalizedData.titles.slice(0, totalDataColumns));
        }
        // Add custom column titles
        if (customColumns) {
            customColumns.forEach(function (col) {
                titles.push(col.title);
            });
        }
        return titles;
    }, [normalizedData, customColumns, totalDataColumns, totalColumns]);
    // Determine the total number of pages based on data length and page size
    var pageSizeValue = pageSize || (normalizedData ? 10 : 0);
    var totalPages = normalizedData ? Math.ceil((((_c = normalizedData === null || normalizedData === void 0 ? void 0 : normalizedData.data) === null || _c === void 0 ? void 0 : _c.length) || 0) / pageSizeValue) : 0;
    // Calculate start and end indices for data pagination
    var startIndex = normalizedData ? (currentPage - 1) * pageSizeValue : 0;
    var endIndex = normalizedData ? Math.min(startIndex + pageSizeValue, ((_d = normalizedData === null || normalizedData === void 0 ? void 0 : normalizedData.data) === null || _d === void 0 ? void 0 : _d.length) || 0) : 0;
    var _k = (0, react_1.useState)(null), selectedField = _k[0], setSelectedField = _k[1];
    var _l = (0, react_1.useState)(null), selectedValue = _l[0], setSelectedValue = _l[1];
    var _m = (0, react_1.useState)(true), showSearch = _m[0], setshowSearch = _m[1];
    var _o = (0, react_1.useState)(""), searchQuery = _o[0], setsearchQuery = _o[1];
    (0, react_1.useEffect)(function () {
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
        if (normalizedData) {
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
    var filteredData = normalizedData ? normalizedData === null || normalizedData === void 0 ? void 0 : normalizedData.data.filter(function (item) {
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
    var startPage = normalizedData ? Math.max(1, currentPage - Math.floor(maxVisiblePages / 2)) : 0;
    var endPage = normalizedData ? Math.min(startPage + maxVisiblePages - 1, totalPages) : 0;
    // Adjust startPage and endPage if there are not enough pages to fill maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    // Function to export data to CSV
    var Export = function () {
        (0, Export_1.ExportData)(filteredData, title, selectedField);
    };
    // Extract the data array
    var dataArray = normalizedData ? normalizedData.data : [];
    // Remove duplicate values
    var uniqueValues = selectedField
        ? Array.from(new Set(dataArray.map(function (item) { return getNestedValue(item, selectedField); })))
        : [];
    (0, react_1.useEffect)(function () {
        if (filterOnchange) {
            filterOnchange(selectedField, selectedValue, filteredData.length);
        }
    }, [selectedField, selectedValue]);
    // Helper function to get column configuration for a specific index
    var getColumnConfig = function (index) {
        if (columns && columns[index]) {
            return columns[index];
        }
        if ((normalizedData === null || normalizedData === void 0 ? void 0 : normalizedData.columns) && normalizedData.columns[index]) {
            return normalizedData.columns[index];
        }
        return undefined;
    };
    // Helper function to generate grid template columns
    var generateGridTemplateColumns = function () {
        var widths = [];
        // Generate widths for all columns (data + custom)
        for (var i = 0; i < totalColumns; i++) {
            var col = getColumnConfig(i);
            if (col === null || col === void 0 ? void 0 : col.width) {
                widths.push(typeof col.width === 'number' ? "".concat(col.width, "px") : col.width);
            }
            else {
                widths.push('1fr');
            }
        }
        return widths.join(' ');
    };
    // Helper function to get column width for a specific index
    var getColumnWidth = function (index) {
        var col = getColumnConfig(index);
        if (col === null || col === void 0 ? void 0 : col.width) {
            return typeof col.width === 'number' ? "".concat(col.width, "px") : col.width;
        }
        return 'auto';
    };
    // Helper function to get column min-width for a specific index
    var getColumnMinWidth = function (index) {
        var col = getColumnConfig(index);
        if (col === null || col === void 0 ? void 0 : col.minWidth) {
            return typeof col.minWidth === 'number' ? "".concat(col.minWidth, "px") : col.minWidth;
        }
        return '80px';
    };
    // Helper function to get column max-width for a specific index
    var getColumnMaxWidth = function (index) {
        var col = getColumnConfig(index);
        if (col === null || col === void 0 ? void 0 : col.maxWidth) {
            return typeof col.maxWidth === 'number' ? "".concat(col.maxWidth, "px") : col.maxWidth;
        }
        return 'none';
    };
    // Generate grid template columns string
    var gridTemplateColumns = generateGridTemplateColumns();
    return (React.createElement("div", { className: "".concat(funcss ? funcss : '', " roundEdge") },
        normalizedData &&
            React.createElement("div", { className: "pr-4 pl-4 pt-2 pb-2 lighter tableHeader mb-2", style: { overflow: "show" } },
                React.createElement(RowFlex_1.default, { gap: 0.5, justify: 'space-between' },
                    title ?
                        React.createElement("div", null,
                            showTotal && normalizedData &&
                                React.createElement("div", null,
                                    React.createElement(Text_1.default, { text: "".concat(filteredData.length, " Records"), size: 'sm', weight: 500 })),
                            title &&
                                React.createElement("div", null,
                                    React.createElement(Text_1.default, { text: title || "", size: 'h6', lineHeight: '0.8' })))
                        :
                            React.createElement(React.Fragment, null, showTotal && normalizedData &&
                                React.createElement("div", null,
                                    React.createElement(Text_1.default, { text: "".concat(filteredData.length, " Records"), size: 'sm', weight: 500 }))),
                    normalizedData ?
                        React.createElement("div", null,
                            React.createElement(Flex_1.default, { width: '100%', wrap: 'nowrap', alignItems: 'center', gap: 0.7 },
                                !selectedField && !showSearch && filterableFields &&
                                    React.createElement("div", null,
                                        React.createElement(Select_1.default, { fullWidth: true, searchable: true, funcss: 'min-w-300 w-full bg', rounded: true, value: selectedField || '', onChange: function (e) { return handleFieldChange(e); }, options: __spreadArray([
                                                { text: '🔍 Filter', value: '' },
                                                { text: 'All*', value: '' }
                                            ], (filterableFields || []).map(function (field) { return ({
                                                text: field,
                                                value: field
                                            }); }), true) })),
                                selectedField && !showSearch && filterableFields && (React.createElement("div", { className: '' },
                                    React.createElement(Select_1.default, { rounded: true, searchable: true, funcss: 'min-w-300 w-full bg', fullWidth: true, value: selectedValue || '', onChange: function (e) {
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
                                            React.createElement(Input_1.default, { borderless: true, funcss: 'min-w-300 bg', fullWidth: true, rounded: true, value: searchQuery, onChange: function (e) { return setsearchQuery(e.target.value); }, label: "Search..." })),
                                        React.createElement("div", null,
                                            React.createElement("div", { onClick: function () { return setshowSearch(false); } },
                                                React.createElement(ToolTip_1.default, { tip: 'top', message: filterableFields ? "Filter" : "Close Search" }, filterableFields ? React.createElement(io5_1.IoFilterOutline, { className: 'pointer' })
                                                    :
                                                        React.createElement(pi_1.PiXThin, { className: 'pointer', size: 23, onClick: function () { return setshowSearch(false); } })))))
                                    :
                                        React.createElement("div", null,
                                            React.createElement(ToolTip_1.default, { tip: 'top', message: "Search" },
                                                React.createElement(ci_1.CiSearch, { className: 'pointer', size: 23, onClick: function () { return setshowSearch(true); } })))))
                        : '',
                    React.createElement(React.Fragment, null, (right || !hideExport) &&
                        React.createElement(RowFlex_1.default, { gap: 0.5 },
                            right && React.createElement("div", { style: { display: 'flex', alignItems: 'center' } }, right),
                            !hideExport &&
                                React.createElement("div", null,
                                    React.createElement(ToolTip_1.default, { tip: 'top', message: "Export Data" },
                                        React.createElement(Circle_1.default, { bg: 'lighter', bordered: true, onClick: Export },
                                            React.createElement(pi_1.PiExportThin, null)))))))),
        React.createElement("main", { style: { overflow: "auto", width: "100%" } },
            React.createElement("div", __assign({ className: "table-grid ".concat(bordered ? 'bordered' : '', " ").concat(noStripped ? '' : 'stripped', " ").concat(hoverable ? 'hoverableTr' : '', " ").concat(light ? 'light' : '', " ").concat(dark ? 'dark' : ''), style: {
                    height: height ? height + "px" : "",
                    position: 'relative',
                    zIndex: 1,
                    // Set grid template columns on the main container for consistency
                    gridTemplateColumns: gridTemplateColumns
                } }, rest),
                allTitles.length > 0 && (React.createElement("div", { className: "table-head", style: {
                        // Match the grid template columns
                        gridTemplateColumns: gridTemplateColumns
                    } }, allTitles.map(function (title, index) {
                    var colConfig = getColumnConfig(index);
                    var isFirst = index === 0;
                    var isLast = index === allTitles.length - 1;
                    var isCustomColumn = index >= totalDataColumns;
                    return (React.createElement("div", { key: title + index, className: "table-header text-secondary ".concat((colConfig === null || colConfig === void 0 ? void 0 : colConfig.headerClassName) || '', " ").concat(isFirst ? "first_table_data" : "", " ").concat(isLast ? "last_table_data" : ""), "data-label": title, style: {
                            // Apply column-specific styles
                            minWidth: isCustomColumn ? '100px' : getColumnMinWidth(index),
                            maxWidth: isCustomColumn ? 'none' : getColumnMaxWidth(index),
                            width: isCustomColumn ? 'auto' : getColumnWidth(index),
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                        } }, title));
                }))),
                head && React.createElement("div", { className: "table-head" }, head),
                React.createElement("div", { className: "table-body", style: {
                        // Match the grid template columns
                        gridTemplateColumns: gridTemplateColumns
                    } },
                    body && body,
                    normalizedData &&
                        (function () {
                            var results = (0, Query_1.getAdvancedFilteredData)(filteredData, searchQuery, normalizedData, getNestedValue, prioritizeSearchFields);
                            var shouldSlice = !searchQuery || results.length > 10;
                            return (shouldSlice ? results.slice(startIndex, endIndex) : results).map(function (mdoc, rowIndex) { return (React.createElement("div", { className: "table-row animated slide-up ".concat(trCss), key: rowIndex, onClick: onRowClick ? function () { return onRowClick(mdoc); } : undefined, style: {
                                    // Match the grid template columns
                                    gridTemplateColumns: gridTemplateColumns,
                                    position: 'relative', zIndex: ((shouldSlice ? results.slice(startIndex, endIndex) : results).length + 2) - (rowIndex)
                                } }, Array.from({ length: totalColumns }).map(function (_, index) {
                                var _a;
                                var colConfig = getColumnConfig(index);
                                var isFirst = index === 0;
                                var isLast = index === totalColumns - 1;
                                var isDataColumn = index < totalDataColumns;
                                var isCustomColumn = index >= totalDataColumns;
                                var customColumnIndex = index - totalDataColumns;
                                // For data columns
                                if (isDataColumn && normalizedData.fields[index]) {
                                    var field = normalizedData.fields[index];
                                    var cellContent = getNestedValue(mdoc, field);
                                    return (React.createElement("div", { key: "data-".concat(index), className: "table-cell ".concat(normalizedData.funcss ? ((_a = normalizedData === null || normalizedData === void 0 ? void 0 : normalizedData.funcss) === null || _a === void 0 ? void 0 : _a[index]) || "" : "", " ").concat((colConfig === null || colConfig === void 0 ? void 0 : colConfig.cellClassName) || '', " ").concat('wrap'), "data-label": allTitles[index] || field, style: {
                                            overflow: "visible",
                                            // Apply column-specific styles to match header
                                            minWidth: getColumnMinWidth(index),
                                            maxWidth: getColumnMaxWidth(index),
                                            width: getColumnWidth(index),
                                            // Text handling based on column config
                                            whiteSpace: 'normal',
                                            overflowWrap: 'break-word',
                                            textOverflow: 'clip'
                                        } }, cellContent));
                                }
                                // For custom columns
                                if (isCustomColumn && customColumns && customColumns[customColumnIndex]) {
                                    var column_1 = customColumns[customColumnIndex];
                                    return (React.createElement("div", { key: "custom-".concat(index), className: "table-cell wrap", "data-label": column_1.title || "Action", style: {
                                            position: "relative",
                                            overflow: "visible",
                                            // Apply column-specific styles
                                            minWidth: '100px',
                                            whiteSpace: 'normal',
                                            overflowWrap: 'break-word',
                                            textOverflow: 'clip'
                                        } },
                                        column_1.render && column_1.render(mdoc),
                                        column_1.onClick && (React.createElement(Button_1.default, { onClick: function () { return column_1.onClick && column_1.onClick(mdoc); } }, column_1.title))));
                                }
                                return null;
                            }))); });
                        })(),
                    isLoading &&
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (_, rowIndex) { return (React.createElement(Flex_1.default, { key: rowIndex, className: "table-row skeleton", style: {
                                // Match the grid template columns
                                gridTemplateColumns: gridTemplateColumns
                            } }, Array.from({ length: totalColumns }).map(function (_, cellIndex) {
                            var isCustomColumn = cellIndex >= totalDataColumns;
                            return (React.createElement("div", { key: cellIndex, className: "table-cell", style: {
                                    // Apply column-specific styles to match headers
                                    minWidth: isCustomColumn ? '100px' : getColumnMinWidth(cellIndex),
                                    maxWidth: isCustomColumn ? 'none' : getColumnMaxWidth(cellIndex),
                                    width: isCustomColumn ? 'auto' : getColumnWidth(cellIndex)
                                } }));
                        }))); }),
                    children ? children : ""),
                filteredData.length === 0 && !isLoading && !children && (React.createElement("div", { className: "table-empty-state", style: {
                        gridColumn: "1 / span ".concat(totalColumns),
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '300px',
                        width: '100%',
                        padding: '40px 20px'
                    } },
                    React.createElement(Empty_1.default, { ctaIcon: (emptyResponse === null || emptyResponse === void 0 ? void 0 : emptyResponse.ctaIcon) || React.createElement(pi_1.PiSpinnerGap, null), title: (emptyResponse === null || emptyResponse === void 0 ? void 0 : emptyResponse.title) || 'No Record Found!', description: (emptyResponse === null || emptyResponse === void 0 ? void 0 : emptyResponse.subtitle) || 'You can try reloading the page or check your query', ctaText: (emptyResponse === null || emptyResponse === void 0 ? void 0 : emptyResponse.ctaText) || 'Reload', showCta: (emptyResponse === null || emptyResponse === void 0 ? void 0 : emptyResponse.showCta) || false, ctaOnClick: function () {
                            if (emptyResponse === null || emptyResponse === void 0 ? void 0 : emptyResponse.ctaOnClick) {
                                emptyResponse.ctaOnClick();
                            }
                            else {
                                window.location.reload();
                            }
                        } }))))),
        normalizedData && pageSizeValue && filteredData.length > pageSizeValue && (React.createElement("div", { className: "padding bt" },
            React.createElement(RowFlex_1.default, { gap: 1, funcss: 'pointer', justify: "center" },
                React.createElement("div", { className: "pagination-nav ".concat(currentPage === 1 ? 'pagination-nav-disabled' : ''), onClick: function () { return currentPage > 1 && handleChangePage(1); }, title: "First page" },
                    React.createElement(Text_1.default, { text: "\u00AB\u00AB" })),
                React.createElement("div", { className: "pagination-nav p ".concat(currentPage === 1 ? 'pagination-nav-disabled' : ''), onClick: function () { return currentPage > 1 && handleChangePage(currentPage - 1); }, title: "Previous page" },
                    React.createElement(Text_1.default, { text: "\u2039" })),
                React.createElement(Flex_1.default, null, Array.from({ length: endPage - startPage + 1 }, function (_, i) {
                    var pageNumber = startPage + i;
                    var isActive = currentPage === pageNumber;
                    return (React.createElement("div", { key: pageNumber },
                        React.createElement("div", { className: "pagination-item text-xs ".concat(isActive ? 'pagination-item-active primary' : ''), onClick: function () { return handleChangePage(pageNumber); } }, "".concat(pageNumber))));
                })),
                React.createElement("div", { className: "pagination-nav p ".concat(currentPage === totalPages ? 'pagination-nav-disabled' : ''), onClick: function () { return currentPage < totalPages && handleChangePage(currentPage + 1); }, title: "Next page" },
                    React.createElement(Text_1.default, { text: "\u203A" })),
                React.createElement("div", { className: "pagination-nav ".concat(currentPage === totalPages ? 'pagination-nav-disabled' : ''), onClick: function () { return currentPage < totalPages && handleChangePage(totalPages); }, title: "Last page" },
                    React.createElement(Text_1.default, { text: "\u00BB\u00BB" })))))));
}
