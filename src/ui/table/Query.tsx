// Type definitions
type SearchStrategy = (value: string, query: string, terms: string[]) => boolean;

interface DataConfig {
  fields: string[];
}

type GetNestedValueFunction = (obj: any, path: string) => any;

// Simple Levenshtein distance function for fuzzy matching
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null)
  );

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
};

// Define various search strategies
const searchStrategies: SearchStrategy[] = [
  // 1. Exact substring match (your original method)
  (value: string, query: string, terms: string[]) =>
    value.includes(query),

  // 2. All terms must be present (AND search)
  (value: string, query: string, terms: string[]) =>
    terms.every((term) => value.includes(term)),

  // 3. Any term must be present (OR search)
  (value: string, query: string, terms: string[]) =>
    terms.some((term) => value.includes(term)),

  // 4. Alphanumeric-only search (ignores special chars)
  (value: string, query: string, terms: string[]) => {
    const cleanValue = value.replace(/[^a-z0-9]/g, '');
    const cleanQuery = query.replace(/[^a-z0-9]/g, '');
    return cleanValue.includes(cleanQuery);
  },

  // 5. Number extraction and matching
  (value: string, query: string, terms: string[]) => {
    const valueNumbers = value.match(/\d+/g) || [];
    const queryNumbers = query.match(/\d+/g) || [];
    return queryNumbers.some((queryNum) =>
      valueNumbers.some((valueNum) => valueNum.includes(queryNum))
    );
  },

  // 6. Word boundary matching (whole words)
  (value: string, query: string, terms: string[]) => {
    try {
      const regex = new RegExp(`\\b${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(value);
    } catch {
      return false;
    }
  },

  // 7. Fuzzy matching for typos (simple Levenshtein-based)
  (value: string, query: string, terms: string[]) => {
    if (query.length < 3) return false; // Skip fuzzy for very short queries

    const words = value.split(/\s+/);
    return words.some((word) => {
      if (Math.abs(word.length - query.length) > 2) return false;
      return levenshteinDistance(word, query) <= Math.floor(query.length * 0.3);
    });
  },

  // 8. Prefix matching (starts with)
  (value: string, query: string, terms: string[]) => {
    const words = value.split(/[\s-._]+/);
    return (
      words.some((word) => word.startsWith(query)) ||
      terms.some((term) => words.some((word) => word.startsWith(term)))
    );
  },

  // 9. Suffix matching (ends with)
  (value: string, query: string, terms: string[]) => {
    const words = value.split(/[\s-._]+/);
    return (
      words.some((word) => word.endsWith(query)) ||
      terms.some((term) => words.some((word) => word.endsWith(term)))
    );
  },

  // 10. Pattern matching (handles common separators)
  (value: string, query: string, terms: string[]) => {
    // Split on common separators and search in parts
    const valueParts = value.split(/[-._\s\/\\]/);
    const queryParts = query.split(/[-._\s\/\\]/);

    return queryParts.every((queryPart) =>
      valueParts.some((valuePart) => valuePart.includes(queryPart))
    );
  },
];

// MAIN FUNCTION: Direct replacement for your original code
export const getAdvancedFilteredData = <T = any>(
  filteredData: T[],
  searchQuery: string,
  data: DataConfig,
  getNestedValue: GetNestedValueFunction
): T[] => {
  return filteredData.filter((mdoc, index) => {
    if (searchQuery) {
      // Convert search query to lowercase for case-insensitive search
      const query = searchQuery.toLowerCase().trim();
      
      if (!query) return true; // If empty query after trim, show all
      
      // Split query into multiple terms for multi-term search
      const queryTerms = query.split(/\s+/).filter((term) => term.length > 0);
      
      // Search through all fields defined in data.fields
      return data.fields.some(field => {
        try {
          // Get the value using the same getNestedValue function used for display
          const value = getNestedValue(mdoc, field);
          
          // Convert value to string and search
          if (value !== null && value !== undefined) {
            const stringValue = String(value).toLowerCase();
            
            // Use advanced search strategies instead of just includes
            return searchStrategies.some((strategy) =>
              strategy(stringValue, query, queryTerms)
            );
          }
          
          return false;
        } catch (error) {
          // Handle any errors in accessing nested values
          console.warn(`Error accessing field ${field}:`, error);
          return false;
        }
      });
    } else {
      return true; // If no search query, return all items
    }
  });
};

// Optional: Simplified version with pagination built-in
export const getFilteredAndPaginatedData = <T = any>(
  filteredData: T[],
  searchQuery: string,
  data: DataConfig,
  getNestedValue: GetNestedValueFunction,
  startIndex: number = 0,
  endIndex?: number
): T[] => {
  const filtered = getAdvancedFilteredData(filteredData, searchQuery, data, getNestedValue);
  return endIndex !== undefined ? filtered.slice(startIndex, endIndex) : filtered.slice(startIndex);
};