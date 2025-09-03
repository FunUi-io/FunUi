interface DataConfig {
    fields: string[];
}
type GetNestedValueFunction = (obj: any, path: string) => any;
export declare const getAdvancedFilteredData: <T = any>(filteredData: T[], searchQuery: string, data: DataConfig, getNestedValue: GetNestedValueFunction) => T[];
export declare const getFilteredAndPaginatedData: <T = any>(filteredData: T[], searchQuery: string, data: DataConfig, getNestedValue: GetNestedValueFunction, startIndex?: number, endIndex?: number) => T[];
export {};
