"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportDataWithLog = exports.ExportData = exports.cleanDataForExport = void 0;
var react_easy_export_1 = require("react-easy-export");
/**
 * Cleans data by removing columns that contain objects
 * and ensures all values are primitive types (string, number, boolean, null)
 */
var cleanDataForExport = function (data) {
    if (!data || data.length === 0)
        return [];
    // Get all unique keys from all objects
    var allKeys = new Set();
    data.forEach(function (item) {
        if (item && typeof item === 'object') {
            Object.keys(item).forEach(function (key) { return allKeys.add(key); });
        }
    });
    // Identify columns that contain objects
    var columnsWithObjects = new Set();
    allKeys.forEach(function (key) {
        var hasObject = data.some(function (item) {
            var value = item === null || item === void 0 ? void 0 : item[key];
            return value !== null &&
                value !== undefined &&
                typeof value === 'object' &&
                !Array.isArray(value) &&
                !(value instanceof Date);
        });
        if (hasObject) {
            columnsWithObjects.add(key);
        }
    });
    // Clean the data by removing problematic columns and converting values
    return data.map(function (item) {
        if (!item || typeof item !== 'object')
            return item;
        var cleanedItem = {};
        Object.keys(item).forEach(function (key) {
            // Skip columns that contain objects
            if (columnsWithObjects.has(key)) {
                return;
            }
            var value = item[key];
            // Handle different value types
            if (value === null || value === undefined) {
                cleanedItem[key] = '';
            }
            else if (Array.isArray(value)) {
                // Convert arrays to comma-separated strings
                cleanedItem[key] = value.join(', ');
            }
            else if (value instanceof Date) {
                // Convert dates to ISO strings
                cleanedItem[key] = value.toISOString();
            }
            else if (typeof value === 'object') {
                // Skip objects (shouldn't reach here due to column filtering above)
                return;
            }
            else {
                // Primitive values (string, number, boolean)
                cleanedItem[key] = value;
            }
        });
        return cleanedItem;
    }).filter(function (item) { return Object.keys(item).length > 0; }); // Remove empty objects
};
exports.cleanDataForExport = cleanDataForExport;
/**
 * Enhanced export function with automatic data cleaning
 */
var ExportData = function (filteredData, title, selectedField) {
    // Clean the data before export
    var cleanedData = (0, exports.cleanDataForExport)(filteredData);
    // Generate filename
    var filename = title
        ? "".concat(title).concat(selectedField ? "_".concat(selectedField) : '', ".csv")
        : 'data.csv';
    // Export cleaned data
    (0, react_easy_export_1.exportToCSV)(cleanedData, filename);
};
exports.ExportData = ExportData;
/**
 * Alternative export function that logs what was cleaned (for debugging)
 */
var ExportDataWithLog = function (filteredData, title, selectedField) {
    if (!filteredData || filteredData.length === 0) {
        console.warn('No data to export');
        return;
    }
    // Get original columns
    var originalColumns = Object.keys(filteredData[0] || {});
    // Clean the data
    var cleanedData = (0, exports.cleanDataForExport)(filteredData);
    // Get cleaned columns
    var cleanedColumns = cleanedData.length > 0 ? Object.keys(cleanedData[0]) : [];
    // Log what was removed
    var removedColumns = originalColumns.filter(function (col) { return !cleanedColumns.includes(col); });
    if (removedColumns.length > 0) {
        console.log('Removed columns containing objects:', removedColumns);
    }
    console.log('Cleaned data preview:', cleanedData.slice(0, 2));
    // Generate filename
    var filename = title
        ? "".concat(title).concat(selectedField ? "_".concat(selectedField) : '', ".csv")
        : 'data.csv';
    // Export cleaned data
    (0, react_easy_export_1.exportToCSV)(cleanedData, filename);
};
exports.ExportDataWithLog = ExportDataWithLog;
