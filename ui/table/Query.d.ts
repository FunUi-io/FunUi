interface DataConfig {
    fields: string[];
    priorityFields?: string[];
}
type GetNestedValueFunction = (obj: any, path: string) => any;
export declare const getAdvancedFilteredData: <T = any>(filteredData: T[], searchQuery: string, data: DataConfig, getNestedValue: GetNestedValueFunction, priorityFields?: string[]) => T[];
export declare const getFilteredAndPaginatedData: <T = any>(filteredData: T[], searchQuery: string, data: DataConfig, getNestedValue: GetNestedValueFunction, startIndex?: number, endIndex?: number, priorityFields?: string[]) => T[];
export {};
