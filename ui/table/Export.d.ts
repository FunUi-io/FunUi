/**
 * Cleans data by removing columns that contain objects
 * and ensures all values are primitive types (string, number, boolean, null)
 */
export declare const cleanDataForExport: (data: any[]) => any[];
/**
 * Enhanced export function with automatic data cleaning
 */
export declare const ExportData: (filteredData: any, title?: any, selectedField?: any) => void;
/**
 * Alternative export function that logs what was cleaned (for debugging)
 */
export declare const ExportDataWithLog: (filteredData: any, title?: any, selectedField?: any) => void;
