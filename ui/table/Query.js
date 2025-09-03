"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredAndPaginatedData = exports.getAdvancedFilteredData = void 0;
// Simple Levenshtein distance function for fuzzy matching
var levenshteinDistance = function (str1, str2) {
    var matrix = Array(str2.length + 1).fill(null).map(function () {
        return Array(str1.length + 1).fill(null);
    });
    for (var i = 0; i <= str1.length; i++)
        matrix[0][i] = i;
    for (var j = 0; j <= str2.length; j++)
        matrix[j][0] = j;
    for (var j = 1; j <= str2.length; j++) {
        for (var i = 1; i <= str1.length; i++) {
            var indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(matrix[j][i - 1] + 1, // deletion
            matrix[j - 1][i] + 1, // insertion
            matrix[j - 1][i - 1] + indicator // substitution
            );
        }
    }
    return matrix[str2.length][str1.length];
};
// Define various search strategies
var searchStrategies = [
    // 1. Exact substring match (your original method)
    function (value, query, terms) {
        return value.includes(query);
    },
    // 2. All terms must be present (AND search)
    function (value, query, terms) {
        return terms.every(function (term) { return value.includes(term); });
    },
    // 3. Any term must be present (OR search)
    function (value, query, terms) {
        return terms.some(function (term) { return value.includes(term); });
    },
    // 4. Alphanumeric-only search (ignores special chars)
    function (value, query, terms) {
        var cleanValue = value.replace(/[^a-z0-9]/g, '');
        var cleanQuery = query.replace(/[^a-z0-9]/g, '');
        return cleanValue.includes(cleanQuery);
    },
    // 5. Number extraction and matching
    function (value, query, terms) {
        var valueNumbers = value.match(/\d+/g) || [];
        var queryNumbers = query.match(/\d+/g) || [];
        return queryNumbers.some(function (queryNum) {
            return valueNumbers.some(function (valueNum) { return valueNum.includes(queryNum); });
        });
    },
    // 6. Word boundary matching (whole words)
    function (value, query, terms) {
        try {
            var regex = new RegExp("\\b".concat(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "\\b"), 'i');
            return regex.test(value);
        }
        catch (_a) {
            return false;
        }
    },
    // 7. Fuzzy matching for typos (simple Levenshtein-based)
    function (value, query, terms) {
        if (query.length < 3)
            return false; // Skip fuzzy for very short queries
        var words = value.split(/\s+/);
        return words.some(function (word) {
            if (Math.abs(word.length - query.length) > 2)
                return false;
            return levenshteinDistance(word, query) <= Math.floor(query.length * 0.3);
        });
    },
    // 8. Prefix matching (starts with)
    function (value, query, terms) {
        var words = value.split(/[\s-._]+/);
        return (words.some(function (word) { return word.startsWith(query); }) ||
            terms.some(function (term) { return words.some(function (word) { return word.startsWith(term); }); }));
    },
    // 9. Suffix matching (ends with)
    function (value, query, terms) {
        var words = value.split(/[\s-._]+/);
        return (words.some(function (word) { return word.endsWith(query); }) ||
            terms.some(function (term) { return words.some(function (word) { return word.endsWith(term); }); }));
    },
    // 10. Pattern matching (handles common separators)
    function (value, query, terms) {
        // Split on common separators and search in parts
        var valueParts = value.split(/[-._\s\/\\]/);
        var queryParts = query.split(/[-._\s\/\\]/);
        return queryParts.every(function (queryPart) {
            return valueParts.some(function (valuePart) { return valuePart.includes(queryPart); });
        });
    },
];
// MAIN FUNCTION: Direct replacement for your original code
var getAdvancedFilteredData = function (filteredData, searchQuery, data, getNestedValue) {
    return filteredData.filter(function (mdoc, index) {
        if (searchQuery) {
            // Convert search query to lowercase for case-insensitive search
            var query_1 = searchQuery.toLowerCase().trim();
            if (!query_1)
                return true; // If empty query after trim, show all
            // Split query into multiple terms for multi-term search
            var queryTerms_1 = query_1.split(/\s+/).filter(function (term) { return term.length > 0; });
            // Search through all fields defined in data.fields
            return data.fields.some(function (field) {
                try {
                    // Get the value using the same getNestedValue function used for display
                    var value = getNestedValue(mdoc, field);
                    // Convert value to string and search
                    if (value !== null && value !== undefined) {
                        var stringValue_1 = String(value).toLowerCase();
                        // Use advanced search strategies instead of just includes
                        return searchStrategies.some(function (strategy) {
                            return strategy(stringValue_1, query_1, queryTerms_1);
                        });
                    }
                    return false;
                }
                catch (error) {
                    // Handle any errors in accessing nested values
                    console.warn("Error accessing field ".concat(field, ":"), error);
                    return false;
                }
            });
        }
        else {
            return true; // If no search query, return all items
        }
    });
};
exports.getAdvancedFilteredData = getAdvancedFilteredData;
// Optional: Simplified version with pagination built-in
var getFilteredAndPaginatedData = function (filteredData, searchQuery, data, getNestedValue, startIndex, endIndex) {
    if (startIndex === void 0) { startIndex = 0; }
    var filtered = (0, exports.getAdvancedFilteredData)(filteredData, searchQuery, data, getNestedValue);
    return endIndex !== undefined ? filtered.slice(startIndex, endIndex) : filtered.slice(startIndex);
};
exports.getFilteredAndPaginatedData = getFilteredAndPaginatedData;
