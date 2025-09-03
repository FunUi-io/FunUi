import { exportToCSV } from "react-easy-export";

/**
 * Cleans data by removing columns that contain objects
 * and ensures all values are primitive types (string, number, boolean, null)
 */
export const cleanDataForExport = (data: any[]): any[] => {
  if (!data || data.length === 0) return [];

  // Get all unique keys from all objects
  const allKeys = new Set<string>();
  data.forEach(item => {
    if (item && typeof item === 'object') {
      Object.keys(item).forEach(key => allKeys.add(key));
    }
  });

  // Identify columns that contain objects
  const columnsWithObjects = new Set<string>();
  
  allKeys.forEach(key => {
    const hasObject = data.some(item => {
      const value = item?.[key];
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
  return data.map(item => {
    if (!item || typeof item !== 'object') return item;
    
    const cleanedItem: any = {};
    
    Object.keys(item).forEach(key => {
      // Skip columns that contain objects
      if (columnsWithObjects.has(key)) {
        return;
      }
      
      const value = item[key];
      
      // Handle different value types
      if (value === null || value === undefined) {
        cleanedItem[key] = '';
      } else if (Array.isArray(value)) {
        // Convert arrays to comma-separated strings
        cleanedItem[key] = value.join(', ');
      } else if (value instanceof Date) {
        // Convert dates to ISO strings
        cleanedItem[key] = value.toISOString();
      } else if (typeof value === 'object') {
        // Skip objects (shouldn't reach here due to column filtering above)
        return;
      } else {
        // Primitive values (string, number, boolean)
        cleanedItem[key] = value;
      }
    });
    
    return cleanedItem;
  }).filter(item => Object.keys(item).length > 0); // Remove empty objects
};

/**
 * Enhanced export function with automatic data cleaning
 */
export const ExportData = (
  filteredData: any,
  title?: any,
  selectedField?: any
) => {
  // Clean the data before export
  const cleanedData = cleanDataForExport(filteredData);
  
  // Generate filename
  const filename = title 
    ? `${title}${selectedField ? `_${selectedField}` : ''}.csv` 
    : 'data.csv';
  
  // Export cleaned data
  exportToCSV(cleanedData, filename);
};

/**
 * Alternative export function that logs what was cleaned (for debugging)
 */
export const ExportDataWithLog = (
  filteredData: any,
  title?: any,
  selectedField?: any
) => {
  if (!filteredData || filteredData.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get original columns
  const originalColumns = Object.keys(filteredData[0] || {});
  
  // Clean the data
  const cleanedData = cleanDataForExport(filteredData);
  
  // Get cleaned columns
  const cleanedColumns = cleanedData.length > 0 ? Object.keys(cleanedData[0]) : [];
  
  // Log what was removed
  const removedColumns = originalColumns.filter(col => !cleanedColumns.includes(col));
  if (removedColumns.length > 0) {
    console.log('Removed columns containing objects:', removedColumns);
  }
  
  console.log('Cleaned data preview:', cleanedData.slice(0, 2));
  
  // Generate filename
  const filename = title 
    ? `${title}${selectedField ? `_${selectedField}` : ''}.csv` 
    : 'data.csv';
  
  // Export cleaned data
  exportToCSV(cleanedData, filename);
};
