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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVariableByName = exports.getAssetByName = exports.getUsedReferences = exports.needsInterpolation = exports.createAssetReference = exports.createVariableReference = exports.formatReferenceForDisplay = exports.isAssetReference = exports.isVariableReference = exports.useAssetUrl = exports.useAsset = exports.useVariable = exports.useValue = exports.getProjectAssets = exports.getProjectVariables = exports.getAvailableVariants = exports.hasComponentVariant = exports.useComponentProps = exports.useComponentConfiguration = exports.mergeComponentConfig = exports.getComponentConfig = void 0;
var theme_1 = require("../ui/theme/theme");
var react_1 = require("react");
/**
 * Check if a variant name is valid (not empty or whitespace only)
 */
var isValidVariantName = function (variantName) {
    return !!variantName && variantName.trim() !== '';
};
/**
 * Filter out empty string and undefined values from component props
 */
var filterEmptyProps = function (props) {
    if (!props)
        return {};
    var filtered = {};
    for (var key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            var value = props[key];
            // Only include props that are not undefined and not empty strings
            if (value !== undefined && value !== '') {
                filtered[key] = value;
            }
        }
    }
    return filtered;
};
/**
 * Extract variable name from {{variable_name}} pattern
 */
var extractVariableName = function (value) {
    if (typeof value !== 'string')
        return null;
    // Match exact {{variable}} pattern
    var match = value.match(/^\{\{\s*([^}]+)\s*\}\}$/);
    return match ? match[1].trim() : null;
};
/**
 * Extract asset name from {{{asset_name}}} pattern
 */
var extractAssetName = function (value) {
    if (typeof value !== 'string')
        return null;
    // Match exact {{{asset}}} pattern
    var match = value.match(/^\{\{\{\s*([^}]+)\s*\}\}\}$/);
    return match ? match[1].trim() : null;
};
/**
 * Get variable value from project variables
 */
var getVariableValue = function (variableName, projectData) {
    if (!(projectData === null || projectData === void 0 ? void 0 : projectData.variables) || !variableName)
        return null;
    var variable = projectData.variables.find(function (v) { return v.name === variableName; });
    return (variable === null || variable === void 0 ? void 0 : variable.value) || null;
};
/**
 * Get asset URL from project assets
 */
var getAssetUrl = function (assetName, projectData) {
    if (!(projectData === null || projectData === void 0 ? void 0 : projectData.assets) || !assetName)
        return null;
    var asset = projectData.assets.find(function (a) { return a.name === assetName; });
    return (asset === null || asset === void 0 ? void 0 : asset.url) || null;
};
/**
 * Get asset by name
 */
var getAsset = function (assetName, projectData) {
    if (!(projectData === null || projectData === void 0 ? void 0 : projectData.assets) || !assetName)
        return null;
    var asset = projectData.assets.find(function (a) { return a.name === assetName; });
    return asset || null;
};
/**
 * Interpolate values (variables and assets) in props
 */
var interpolateValues = function (props, projectData) {
    if (!props || Object.keys(props).length === 0) {
        return props || {};
    }
    var result = {};
    // Create lookup maps for faster access
    var variableMap = {};
    var assetMap = {};
    if (projectData === null || projectData === void 0 ? void 0 : projectData.variables) {
        projectData.variables.forEach(function (variable) {
            variableMap[variable.name] = variable.value;
        });
    }
    if (projectData === null || projectData === void 0 ? void 0 : projectData.assets) {
        projectData.assets.forEach(function (asset) {
            assetMap[asset.name] = asset.url;
        });
    }
    for (var key in props) {
        if (!Object.prototype.hasOwnProperty.call(props, key))
            continue;
        var value = props[key];
        // Handle strings with interpolation
        if (typeof value === 'string') {
            // Check for asset reference first ({{{asset}}})
            var assetName = extractAssetName(value);
            if (assetName && assetMap[assetName]) {
                result[key] = assetMap[assetName];
                continue;
            }
            // Check for variable reference ({{variable}})
            var variableName = extractVariableName(value);
            if (variableName && variableMap[variableName]) {
                result[key] = variableMap[variableName];
                continue;
            }
            // No interpolation needed
            result[key] = value;
        }
        // Handle arrays - process string elements only
        else if (Array.isArray(value)) {
            result[key] = value.map(function (item) {
                if (typeof item === 'string') {
                    // Check for asset reference
                    var assetName = extractAssetName(item);
                    if (assetName && assetMap[assetName]) {
                        return assetMap[assetName];
                    }
                    // Check for variable reference
                    var variableName = extractVariableName(item);
                    if (variableName && variableMap[variableName]) {
                        return variableMap[variableName];
                    }
                }
                return item;
            });
        }
        // Handle objects - create shallow copy (no deep interpolation)
        else if (value && typeof value === 'object' && !Array.isArray(value)) {
            result[key] = __assign({}, value);
        }
        // Handle arrays that are objects - create shallow copy
        else if (Array.isArray(value)) {
            result[key] = __spreadArray([], value, true);
        }
        // All other values pass through
        else {
            result[key] = value;
        }
    }
    return result;
};
/**
 * Universal component config getter with interpolation
 */
var getComponentConfig = function (projectData, componentName, variantName) {
    var _a;
    if (variantName === void 0) { variantName = 'default'; }
    // Early return if no component exists
    if (!((_a = projectData === null || projectData === void 0 ? void 0 : projectData.components) === null || _a === void 0 ? void 0 : _a[componentName])) {
        return {
            componentProps: {},
            variantExists: false,
            actualVariant: variantName,
            availableVariants: [],
            metadata: {}
        };
    }
    var component = projectData.components[componentName];
    var availableVariants = Object.keys(component);
    // Find the best variant match with fallback chain
    var targetVariant = variantName;
    var variantExists = availableVariants.includes(variantName);
    if (!variantExists) {
        // Fallback priority: default → first available → none
        if (availableVariants.includes('default')) {
            targetVariant = 'default';
            variantExists = true;
        }
        else if (availableVariants.length > 0) {
            targetVariant = availableVariants[0];
            variantExists = true;
        }
        else {
            return {
                componentProps: {},
                variantExists: false,
                actualVariant: variantName,
                availableVariants: [],
                metadata: {}
            };
        }
    }
    var variantData = component[targetVariant];
    // Filter out empty string and undefined props from config
    var filteredComponentProps = filterEmptyProps((variantData === null || variantData === void 0 ? void 0 : variantData.componentProps) || {});
    // Apply interpolation to component props
    var interpolatedProps = interpolateValues(filteredComponentProps, projectData);
    return {
        componentProps: interpolatedProps,
        variantExists: variantExists,
        actualVariant: targetVariant,
        availableVariants: availableVariants,
        metadata: (variantData === null || variantData === void 0 ? void 0 : variantData.metadata) || {}
    };
};
exports.getComponentConfig = getComponentConfig;
/**
 * Smart merge utility - LOCAL PROPS OVERRIDE CONFIG PROPS
 */
var smartMergeWithLocalOverride = function (configProps, localProps, projectData) {
    // Start with interpolated config props
    var interpolatedConfigProps = interpolateValues(configProps, projectData);
    // Simple merge: local props override config props
    var result = __assign({}, interpolatedConfigProps);
    // Apply local props (they will be interpolated in the final pass)
    for (var key in localProps) {
        if (Object.prototype.hasOwnProperty.call(localProps, key)) {
            var value = localProps[key];
            if (value !== undefined) {
                result[key] = value;
            }
        }
    }
    // Final interpolation pass to handle any variable/asset references in local props
    return interpolateValues(result, projectData);
};
/**
 * Merge component config with local props
 */
var mergeComponentConfig = function (config, localProps, projectData) {
    if (localProps === void 0) { localProps = {}; }
    // Only apply config if variant exists and has actual configuration
    var hasValidConfig = config.variantExists && Object.keys(config.componentProps).length > 0;
    if (!hasValidConfig) {
        // Still interpolate values in local props even if no config
        var interpolatedLocalProps = interpolateValues(localProps, projectData);
        return {
            props: interpolatedLocalProps,
            variant: config.actualVariant,
            hasConfig: false
        };
    }
    return {
        props: smartMergeWithLocalOverride(config.componentProps, localProps, projectData),
        variant: config.actualVariant,
        hasConfig: true
    };
};
exports.mergeComponentConfig = mergeComponentConfig;
/**
 * Hook for easy component config usage
 */
var useComponentConfiguration = function (componentName, variantName) {
    var projectData = (0, theme_1.useTheme)().projectData;
    // Memoize config computation
    var config = (0, react_1.useMemo)(function () {
        if (!isValidVariantName(variantName)) {
            return {
                componentProps: {},
                variantExists: false,
                actualVariant: '',
                availableVariants: [],
                metadata: {}
            };
        }
        return (0, exports.getComponentConfig)(projectData, componentName, variantName);
    }, [projectData, componentName, variantName]);
    // Memoize merge function
    var mergeWithLocal = (0, react_1.useMemo)(function () {
        return function (localProps) {
            if (localProps === void 0) { localProps = {}; }
            if (!isValidVariantName(variantName)) {
                var interpolatedLocalProps = interpolateValues(localProps, projectData);
                return {
                    props: interpolatedLocalProps,
                    variant: '',
                    hasConfig: false
                };
            }
            return (0, exports.mergeComponentConfig)(config, localProps, projectData);
        };
    }, [config, variantName, projectData]);
    // Memoize getProp function
    var getProp = (0, react_1.useMemo)(function () {
        return function (propName, defaultValue) {
            var value = config.componentProps[propName];
            return (value !== undefined ? value : defaultValue);
        };
    }, [config.componentProps]);
    return __assign(__assign({}, config), { mergeWithLocal: mergeWithLocal, getProp: getProp, hasVariant: config.variantExists, isDefaultVariant: config.actualVariant === 'default' });
};
exports.useComponentConfiguration = useComponentConfiguration;
/**
 * Hook that directly returns merged props with local override
 */
var useComponentProps = function (componentName, variantName, localProps) {
    if (variantName === void 0) { variantName = 'default'; }
    if (localProps === void 0) { localProps = {}; }
    var projectData = (0, theme_1.useTheme)().projectData;
    return (0, react_1.useMemo)(function () {
        var config = (0, exports.getComponentConfig)(projectData, componentName, variantName);
        var merged = (0, exports.mergeComponentConfig)(config, localProps, projectData);
        return merged.props;
    }, [projectData, componentName, variantName, localProps]);
};
exports.useComponentProps = useComponentProps;
/**
 * Quick utility to check if a component variant exists
 */
var hasComponentVariant = function (projectData, componentName, variantName) {
    var _a, _b;
    return !!((_b = (_a = projectData === null || projectData === void 0 ? void 0 : projectData.components) === null || _a === void 0 ? void 0 : _a[componentName]) === null || _b === void 0 ? void 0 : _b[variantName]);
};
exports.hasComponentVariant = hasComponentVariant;
/**
 * Get all available variants for a component
 */
var getAvailableVariants = function (projectData, componentName) {
    var _a;
    return Object.keys(((_a = projectData === null || projectData === void 0 ? void 0 : projectData.components) === null || _a === void 0 ? void 0 : _a[componentName]) || {});
};
exports.getAvailableVariants = getAvailableVariants;
/**
 * Get all variables from project
 */
var getProjectVariables = function (projectData) {
    var _a;
    return ((_a = projectData === null || projectData === void 0 ? void 0 : projectData.variables) === null || _a === void 0 ? void 0 : _a.map(function (v) { return ({
        name: v.name,
        value: v.value
    }); })) || [];
};
exports.getProjectVariables = getProjectVariables;
/**
 * Get all assets from project
 */
var getProjectAssets = function (projectData) {
    return (projectData === null || projectData === void 0 ? void 0 : projectData.assets) || [];
};
exports.getProjectAssets = getProjectAssets;
/**
 * Hook to get interpolated value for a specific variable or asset reference
 */
var useValue = function (value) {
    var projectData = (0, theme_1.useTheme)().projectData;
    return (0, react_1.useMemo)(function () {
        if (typeof value !== 'string')
            return value;
        // Check for asset reference ({{{asset}}})
        var assetName = extractAssetName(value);
        if (assetName) {
            var assetUrl = getAssetUrl(assetName, projectData);
            return assetUrl || value;
        }
        // Check for variable reference ({{variable}})
        var variableName = extractVariableName(value);
        if (variableName) {
            var variableValue = getVariableValue(variableName, projectData);
            return variableValue || value;
        }
        return value;
    }, [value, projectData]);
};
exports.useValue = useValue;
/**
 * Hook to get a specific variable value
 */
var useVariable = function (variableName) {
    var projectData = (0, theme_1.useTheme)().projectData;
    return (0, react_1.useMemo)(function () {
        if (!variableName || !(projectData === null || projectData === void 0 ? void 0 : projectData.variables))
            return null;
        var variable = projectData.variables.find(function (v) { return v.name === variableName; });
        return (variable === null || variable === void 0 ? void 0 : variable.value) || null;
    }, [variableName, projectData]);
};
exports.useVariable = useVariable;
/**
 * Hook to get a specific asset
 */
var useAsset = function (assetName) {
    var projectData = (0, theme_1.useTheme)().projectData;
    return (0, react_1.useMemo)(function () {
        if (!assetName || !(projectData === null || projectData === void 0 ? void 0 : projectData.assets))
            return null;
        return getAsset(assetName, projectData);
    }, [assetName, projectData]);
};
exports.useAsset = useAsset;
/**
 * Hook to get a specific asset URL
 */
var useAssetUrl = function (assetName) {
    var projectData = (0, theme_1.useTheme)().projectData;
    return (0, react_1.useMemo)(function () {
        if (!assetName || !(projectData === null || projectData === void 0 ? void 0 : projectData.assets))
            return null;
        return getAssetUrl(assetName, projectData);
    }, [assetName, projectData]);
};
exports.useAssetUrl = useAssetUrl;
/**
 * Check if a value is a variable reference
 */
var isVariableReference = function (value) {
    return typeof value === 'string' && !!extractVariableName(value);
};
exports.isVariableReference = isVariableReference;
/**
 * Check if a value is an asset reference
 */
var isAssetReference = function (value) {
    return typeof value === 'string' && !!extractAssetName(value);
};
exports.isAssetReference = isAssetReference;
/**
 * Helper to convert variable/asset references for UI display
 */
var formatReferenceForDisplay = function (value) {
    if (!value || typeof value !== 'string') {
        return { type: 'custom', display: value || '' };
    }
    var variableName = extractVariableName(value);
    if (variableName) {
        return { type: 'variable', display: variableName };
    }
    var assetName = extractAssetName(value);
    if (assetName) {
        return { type: 'asset', display: assetName };
    }
    return { type: 'custom', display: value };
};
exports.formatReferenceForDisplay = formatReferenceForDisplay;
/**
 * Create a variable reference string
 */
var createVariableReference = function (variableName) {
    return "{{".concat(variableName, "}}");
};
exports.createVariableReference = createVariableReference;
/**
 * Create an asset reference string
 */
var createAssetReference = function (assetName) {
    return "{{{".concat(assetName, "}}}");
};
exports.createAssetReference = createAssetReference;
/**
 * Check if a prop value needs interpolation
 */
var needsInterpolation = function (value) {
    if (typeof value !== 'string')
        return false;
    return (0, exports.isVariableReference)(value) || (0, exports.isAssetReference)(value);
};
exports.needsInterpolation = needsInterpolation;
/**
 * Get all references (variables and assets) used in props
 */
var getUsedReferences = function (props, projectData) {
    var variables = [];
    var assets = [];
    if (!props || !projectData)
        return { variables: variables, assets: assets };
    var processValue = function (value) {
        if (typeof value === 'string') {
            var variableName = extractVariableName(value);
            if (variableName) {
                variables.push(variableName);
                return;
            }
            var assetName = extractAssetName(value);
            if (assetName) {
                assets.push(assetName);
            }
        }
        else if (Array.isArray(value)) {
            value.forEach(processValue);
        }
    };
    Object.values(props).forEach(processValue);
    return {
        variables: Array.from(new Set(variables)),
        assets: Array.from(new Set(assets))
    };
};
exports.getUsedReferences = getUsedReferences;
/**
 * Get asset by name (exported version)
 */
var getAssetByName = function (assetName, projectData) {
    return getAsset(assetName, projectData);
};
exports.getAssetByName = getAssetByName;
/**
 * Get variable by name (exported version)
 */
var getVariableByName = function (variableName, projectData) {
    if (!(projectData === null || projectData === void 0 ? void 0 : projectData.variables) || !variableName)
        return null;
    var variable = projectData.variables.find(function (v) { return v.name === variableName; });
    return variable ? { name: variable.name, value: variable.value } : null;
};
exports.getVariableByName = getVariableByName;
exports.default = {
    getComponentConfig: exports.getComponentConfig,
    mergeComponentConfig: exports.mergeComponentConfig,
    useComponentConfiguration: exports.useComponentConfiguration,
    useComponentProps: exports.useComponentProps,
    hasComponentVariant: exports.hasComponentVariant,
    getAvailableVariants: exports.getAvailableVariants,
    getProjectVariables: exports.getProjectVariables,
    getProjectAssets: exports.getProjectAssets,
    useValue: exports.useValue,
    useVariable: exports.useVariable,
    useAsset: exports.useAsset,
    useAssetUrl: exports.useAssetUrl,
    isVariableReference: exports.isVariableReference,
    isAssetReference: exports.isAssetReference,
    formatReferenceForDisplay: exports.formatReferenceForDisplay,
    createVariableReference: exports.createVariableReference,
    createAssetReference: exports.createAssetReference,
    needsInterpolation: exports.needsInterpolation,
    getUsedReferences: exports.getUsedReferences,
    getAssetByName: exports.getAssetByName,
    getVariableByName: exports.getVariableByName
};
// import { useTheme } from "../ui/theme/theme"
// import { useMemo } from "react"
// // utils/componentUtils.ts
// // Type definitions
// export interface ComponentProps {
//   [key: string]: any
// }
// export interface ComponentMetadata {
//   createdAt?: Date
//   updatedAt?: Date
//   isCustom?: boolean
//   baseVariant?: string
// }
// export interface ComponentVariant {
//   componentProps: ComponentProps
//   metadata?: ComponentMetadata
// }
// export interface ComponentConfig {
//   componentProps: ComponentProps
//   variantExists: boolean
//   actualVariant: string
//   availableVariants: string[]
//   metadata: ComponentMetadata
// }
// export interface ProjectData {
//   components?: {
//     [componentName: string]: {
//       [variantName: string]: ComponentVariant
//     }
//   }
//   variables?: Array<{
//     name: string;
//     value: string;
//     category?: string;
//     createdBy?: string;
//     createdAt?: number;
//     updatedBy?: string;
//     updatedAt?: number;
//   }>
// }
// export interface MergedConfig {
//   props: ComponentProps
//   variant: string
//   hasConfig: boolean
// }
// export interface UseComponentConfigReturn extends ComponentConfig {
//   mergeWithLocal: (localProps?: ComponentProps) => MergedConfig
//   getProp: <T = any>(propName: string, defaultValue?: T) => T
//   hasVariant: boolean
//   isDefaultVariant: boolean
// }
// /**
//  * Extract variable name from {{variable_name}} pattern
//  */
// const extractVariableName = (value: string): string | null => {
//   if (typeof value !== 'string') return null;
//   const match = value.match(/\{\{\s*([^}]+)\s*\}\}/);
//   return match ? match[1].trim() : null;
// }
// /**
//  * Get variable value from project variables
//  */
// const getVariableValue = (
//   variableName: string,
//   projectData: ProjectData | null | undefined
// ): string | null => {
//   if (!projectData?.variables || !variableName) return null;
//   const variable = projectData.variables.find(v => v.name === variableName);
//   return variable?.value || null;
// }
// /**
//  * SAFE Interpolate variables in props - NO RECURSION to prevent stack overflow
//  */
// const interpolateVariables = (
//   props: ComponentProps,
//   projectData: ProjectData | null | undefined
// ): ComponentProps => {
//   // Quick return if no variables or empty props
//   if (!projectData?.variables || !props || Object.keys(props).length === 0) {
//     return props;
//   }
//   const result: ComponentProps = {};
//   // Create a lookup map for faster variable access
//   const variableMap = projectData.variables.reduce((acc, variable) => {
//     acc[variable.name] = variable.value;
//     return acc;
//   }, {} as Record<string, string>);
//   // Process each property safely
//   for (const key in props) {
//     if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
//     const value = props[key];
//     // Handle strings with variable interpolation
//     if (typeof value === 'string') {
//       const variableName = extractVariableName(value);
//       if (variableName && variableMap[variableName]) {
//         result[key] = variableMap[variableName];
//       } else {
//         result[key] = value;
//       }
//     } 
//     // Handle arrays - shallow process only
//     else if (Array.isArray(value)) {
//       result[key] = value.map(item => {
//         if (typeof item === 'string') {
//           const variableName = extractVariableName(item);
//           return variableName && variableMap[variableName] 
//             ? variableMap[variableName] 
//             : item;
//         }
//         return item;
//       });
//     }
//     // Handle objects - ONLY shallow copy, NO deep processing
//     else if (value && typeof value === 'object') {
//       // Create a shallow copy to avoid modifying original
//       const shallowCopy = Array.isArray(value) ? [...value] : { ...value };
//       result[key] = shallowCopy;
//     }
//     // All other values pass through
//     else {
//       result[key] = value;
//     }
//   }
//   return result;
// }
// /**
//  * Check if a variant name is valid (not empty or whitespace only)
//  */
// const isValidVariantName = (variantName: string | undefined): boolean => {
//   return !!variantName && variantName.trim() !== '';
// }
// /**
//  * Filter out empty string and undefined values from component props
//  */
// const filterEmptyProps = (props: ComponentProps): ComponentProps => {
//   const filtered: ComponentProps = {};
//   for (const key in props) {
//     const value = props[key];
//     // Only include props that are not undefined and not empty strings
//     if (value !== undefined && value !== '') {
//       filtered[key] = value;
//     }
//   }
//   return filtered;
// }
// /**
//  * Universal component config getter with variable interpolation
//  */
// export const getComponentConfig = (
//   projectData: ProjectData | null | undefined,
//   componentName: string,
//   variantName: string = 'default'
// ): ComponentConfig => {
//   // Early return if no component exists
//   if (!projectData?.components?.[componentName]) {
//     return {
//       componentProps: {},
//       variantExists: false,
//       actualVariant: variantName,
//       availableVariants: [],
//       metadata: {}
//     }
//   }
//   const component = projectData.components[componentName];
//   const availableVariants = Object.keys(component);
//   // Find the best variant match with fallback chain
//   let targetVariant = variantName;
//   let variantExists = availableVariants.includes(variantName);
//   if (!variantExists) {
//     // Fallback priority: default → first available → none
//     if (availableVariants.includes('default')) {
//       targetVariant = 'default';
//       variantExists = true;
//     } else if (availableVariants.length > 0) {
//       targetVariant = availableVariants[0];
//       variantExists = true;
//     } else {
//       return {
//         componentProps: {},
//         variantExists: false,
//         actualVariant: variantName,
//         availableVariants: [],
//         metadata: {}
//       };
//     }
//   }
//   const variantData = component[targetVariant];
//   // Filter out empty string and undefined props from config
//   let filteredComponentProps = filterEmptyProps(variantData?.componentProps || {});
//   // Apply variable interpolation to component props
//   filteredComponentProps = interpolateVariables(filteredComponentProps, projectData);
//   return {
//     componentProps: filteredComponentProps,
//     variantExists,
//     actualVariant: targetVariant,
//     availableVariants,
//     metadata: variantData?.metadata || {}
//   };
// }
// /**
//  * Smart merge utility - LOCAL PROPS OVERRIDE CONFIG PROPS with variable interpolation
//  */
// const smartMergeWithLocalOverride = (
//   configProps: ComponentProps, 
//   localProps: ComponentProps,
//   projectData: ProjectData | null | undefined
// ): ComponentProps => {
//   // Start with interpolated config props
//   const interpolatedConfigProps = interpolateVariables(configProps, projectData);
//   const interpolatedLocalProps = interpolateVariables(localProps, projectData);
//   // Simple merge: local props override config props
//   const result = { ...interpolatedConfigProps };
//   for (const key in interpolatedLocalProps) {
//     if (interpolatedLocalProps[key] !== undefined) {
//       result[key] = interpolatedLocalProps[key];
//     }
//   }
//   return result;
// }
// /**
//  * Merge component config with local props
//  */
// export const mergeComponentConfig = (
//   config: ComponentConfig,
//   localProps: ComponentProps = {},
//   projectData: ProjectData | null | undefined
// ): MergedConfig => {
//   // Only apply config if variant exists and has actual configuration
//   const hasValidConfig = config.variantExists && Object.keys(config.componentProps).length > 0;
//   if (!hasValidConfig) {
//     // Still interpolate variables in local props even if no config
//     const interpolatedLocalProps = interpolateVariables(localProps, projectData);
//     return {
//       props: interpolatedLocalProps,
//       variant: config.actualVariant,
//       hasConfig: false
//     };
//   }
//   return {
//     props: smartMergeWithLocalOverride(config.componentProps, localProps, projectData),
//     variant: config.actualVariant,
//     hasConfig: true
//   };
// }
// /**
//  * Hook for easy component config usage
//  */
// export const useComponentConfiguration = (
//   componentName: string, 
//   variantName?: string
// ): UseComponentConfigReturn => {
//   const { projectData } = useTheme();
//   // Memoize config computation
//   const config = useMemo(() => {
//     if (!isValidVariantName(variantName)) {
//       return {
//         componentProps: {},
//         variantExists: false,
//         actualVariant: '',
//         availableVariants: [],
//         metadata: {}
//       };
//     }
//     return getComponentConfig(projectData, componentName, variantName!);
//   }, [projectData, componentName, variantName]);
//   // Memoize merge function
//   const mergeWithLocal = useMemo(() => {
//     return (localProps: ComponentProps = {}): MergedConfig => {
//       if (!isValidVariantName(variantName)) {
//         const interpolatedLocalProps = interpolateVariables(localProps, projectData);
//         return {
//           props: interpolatedLocalProps,
//           variant: '',
//           hasConfig: false
//         };
//       }
//       return mergeComponentConfig(config, localProps, projectData);
//     };
//   }, [config, variantName, projectData]);
//   // Memoize getProp function
//   const getProp = useMemo(() => {
//     return <T = any>(propName: string, defaultValue?: T): T => 
//       (config.componentProps[propName] ?? defaultValue) as T;
//   }, [config.componentProps]);
//   return {
//     ...config,
//     mergeWithLocal,
//     getProp,
//     hasVariant: config.variantExists,
//     isDefaultVariant: config.actualVariant === 'default'
//   };
// }
// /**
//  * Hook that directly returns merged props with local override
//  */
// export const useComponentProps = (
//   componentName: string,
//   variantName: string = 'default',
//   localProps: ComponentProps = {}
// ): ComponentProps => {
//   const { projectData } = useTheme();
//   return useMemo(() => {
//     const config = getComponentConfig(projectData, componentName, variantName);
//     const merged = mergeComponentConfig(config, localProps, projectData);
//     return merged.props;
//   }, [projectData, componentName, variantName, localProps]);
// }
// /**
//  * Quick utility to check if a component variant exists
//  */
// export const hasComponentVariant = (
//   projectData: ProjectData | null | undefined,
//   componentName: string,
//   variantName: string
// ): boolean => {
//   return !!projectData?.components?.[componentName]?.[variantName];
// }
// /**
//  * Get all available variants for a component
//  */
// export const getAvailableVariants = (
//   projectData: ProjectData | null | undefined,
//   componentName: string
// ): string[] => {
//   return Object.keys(projectData?.components?.[componentName] || {});
// }
// /**
//  * Get all variables from project
//  */
// export const getProjectVariables = (
//   projectData: ProjectData | null | undefined
// ): Array<{name: string; value: string}> => {
//   return projectData?.variables?.map(v => ({ 
//     name: v.name, 
//     value: v.value 
//   })) || [];
// }
// /**
//  * Hook to get interpolated value for a specific variable or string
//  */
// export const useVariable = (value: string): string => {
//   const { projectData } = useTheme();
//   return useMemo(() => {
//     if (typeof value !== 'string') return value;
//     const variableName = extractVariableName(value);
//     if (!variableName) return value;
//     const variableValue = getVariableValue(variableName, projectData);
//     return variableValue || value;
//   }, [value, projectData]);
// }
// import { useTheme } from "../ui/theme/theme"
// import { useMemo } from "react"
// // utils/componentUtils.ts
// // Type definitions
// export interface ComponentProps {
//   [key: string]: any
// }
// export interface ComponentMetadata {
//   createdAt?: Date
//   updatedAt?: Date
//   isCustom?: boolean
//   baseVariant?: string
// }
// export interface ComponentVariant {
//   componentProps: ComponentProps
//   metadata?: ComponentMetadata
// }
// export interface ComponentConfig {
//   componentProps: ComponentProps
//   variantExists: boolean
//   actualVariant: string
//   availableVariants: string[]
//   metadata: ComponentMetadata
// }
// export interface ProjectData {
//   components?: {
//     [componentName: string]: {
//       [variantName: string]: ComponentVariant
//     }
//   }
// }
// export interface MergedConfig {
//   props: ComponentProps
//   variant: string
//   hasConfig: boolean
// }
// export interface UseComponentConfigReturn extends ComponentConfig {
//   mergeWithLocal: (localProps?: ComponentProps) => MergedConfig
//   getProp: <T = any>(propName: string, defaultValue?: T) => T
//   hasVariant: boolean
//   isDefaultVariant: boolean
// }
// /**
//  * Check if a variant name is valid (not empty or whitespace only)
//  */
// const isValidVariantName = (variantName: string | undefined): boolean => {
//   return !!variantName && variantName.trim() !== '';
// }
// /**
//  * Filter out empty string and undefined values from component props
//  */
// const filterEmptyProps = (props: ComponentProps): ComponentProps => {
//   const filtered: ComponentProps = {};
//   for (const key in props) {
//     const value = props[key];
//     // Only include props that are not undefined and not empty strings
//     if (value !== undefined && value !== '') {
//       filtered[key] = value;
//     }
//   }
//   return filtered;
// }
// /**
//  * Universal component config getter
//  * 
//  * @param projectData - The project configuration data
//  * @param componentName - Name of the component to get config for
//  * @param variantName - Name of the variant (defaults to 'default')
//  * @returns Component configuration with metadata
//  */
// export const getComponentConfig = (
//   projectData: ProjectData | null | undefined,
//   componentName: string,
//   variantName: string = 'default'
// ): ComponentConfig => {
//   // Early return if no component exists
//   if (!projectData?.components?.[componentName]) {
//     return {
//       componentProps: {},
//       variantExists: false,
//       actualVariant: variantName,
//       availableVariants: [],
//       metadata: {}
//     }
//   }
//   const component = projectData.components[componentName]
//   const availableVariants = Object.keys(component)
//   // Find the best variant match with fallback chain
//   let targetVariant = variantName
//   let variantExists = availableVariants.includes(variantName)
//   if (!variantExists) {
//     // Fallback priority: default → first available → none
//     if (availableVariants.includes('default')) {
//       targetVariant = 'default'
//       variantExists = true
//     } else if (availableVariants.length > 0) {
//       targetVariant = availableVariants[0]
//       variantExists = true
//     } else {
//       return {
//         componentProps: {},
//         variantExists: false,
//         actualVariant: variantName,
//         availableVariants: [],
//         metadata: {}
//       }
//     }
//   }
//   const variantData = component[targetVariant]
//   // Filter out empty string and undefined props from config
//   const filteredComponentProps = filterEmptyProps(variantData?.componentProps || {})
//   return {
//     componentProps: filteredComponentProps,
//     variantExists,
//     actualVariant: targetVariant,
//     availableVariants,
//     metadata: variantData?.metadata || {}
//   }
// }
// /**
//  * Smart merge utility - LOCAL PROPS OVERRIDE CONFIG PROPS
//  * If a prop exists in both local and config, local wins
//  */
// const smartMergeWithLocalOverride = (
//   configProps: ComponentProps, 
//   localProps: ComponentProps
// ): ComponentProps => {
//   const result = { ...configProps }
//   // Apply local props - they override config props
//   for (const key in localProps) {
//     if (localProps[key] !== undefined) {
//       // For objects, do smart merge but local object properties still override
//       if (typeof localProps[key] === 'object' && 
//           !Array.isArray(localProps[key]) && 
//           localProps[key] !== null &&
//           typeof configProps[key] === 'object' &&
//           !Array.isArray(configProps[key]) &&
//           configProps[key] !== null) {
//         // Merge nested objects but local properties still win
//         result[key] = { ...configProps[key], ...localProps[key] }
//       } else {
//         // Primitive values or arrays - local always wins
//         result[key] = localProps[key]
//       }
//     }
//   }
//   return result
// }
// /**
//  * Merge component config with local props - LOCAL PROPS OVERRIDE CONFIG
//  * 
//  * @param config - Component configuration from getComponentConfig
//  * @param localProps - Props passed directly to the component (OVERRIDES CONFIG)
//  * @returns Merged configuration with metadata
//  */
// export const mergeComponentConfig = (
//   config: ComponentConfig,
//   localProps: ComponentProps = {}
// ): MergedConfig => {
//   // Only apply config if variant exists and has actual configuration
//   const hasValidConfig = config.variantExists && Object.keys(config.componentProps).length > 0
//   if (!hasValidConfig) {
//     return {
//       props: localProps,
//       variant: config.actualVariant,
//       hasConfig: false
//     }
//   }
//   // LOCAL PROPS OVERRIDE CONFIG PROPS
//   return {
//     props: smartMergeWithLocalOverride(config.componentProps, localProps),
//     variant: config.actualVariant,
//     hasConfig: true
//   }
// }
// /**
//  * Hook for easy component config usage with LOCAL PROP OVERRIDE
//  * Uses useMemo to prevent unnecessary re-computation
//  * 
//  * @param componentName - Name of the component
//  * @param variantName - Optional variant name
//  * @returns Configuration object with helper methods
//  */
// export const useComponentConfiguration = (
//   componentName: string, 
//   variantName?: string
// ): UseComponentConfigReturn => {
//   const { projectData } = useTheme()
//   // Memoize config computation - only recompute when dependencies change
//   const config = useMemo(() => {
//     // Check for valid variant name (not empty or whitespace only)
//     if (!isValidVariantName(variantName)) {
//       return {
//         componentProps: {},
//         variantExists: false,
//         actualVariant: '',
//         availableVariants: [],
//         metadata: {}
//       }
//     }
//     return getComponentConfig(projectData, componentName, variantName!)
//   }, [projectData, componentName, variantName])
//   // Memoize merge function - LOCAL PROPS OVERRIDE CONFIG
//   const mergeWithLocal = useMemo(() => {
//     return (localProps: ComponentProps = {}): MergedConfig => {
//       // If no valid variant name was provided, return local props as-is
//       if (!isValidVariantName(variantName)) {
//         return {
//           props: localProps,
//           variant: '',
//           hasConfig: false
//         }
//       }
//       return mergeComponentConfig(config, localProps)
//     }
//   }, [config, variantName])
//   // Memoize getProp function (gets from config only, not merged)
//   const getProp = useMemo(() => {
//     return <T = any>(propName: string, defaultValue?: T): T => 
//       (config.componentProps[propName] ?? defaultValue) as T
//   }, [config.componentProps])
//   return {
//     ...config,
//     mergeWithLocal,
//     getProp,
//     hasVariant: config.variantExists,
//     isDefaultVariant: config.actualVariant === 'default'
//   }
// }
// /**
//  * Hook that directly returns merged props with local override
//  * Perfect for direct use in components
//  */
// export const useComponentProps = (
//   componentName: string,
//   variantName: string = 'default',
//   localProps: ComponentProps = {}
// ): ComponentProps => {
//   const { projectData } = useTheme()
//   return useMemo(() => {
//     const config = getComponentConfig(projectData, componentName, variantName)
//     const merged = mergeComponentConfig(config, localProps)
//     return merged.props
//   }, [projectData, componentName, variantName, localProps])
// }
// /**
//  * Quick utility to check if a component variant exists
//  */
// export const hasComponentVariant = (
//   projectData: ProjectData | null | undefined,
//   componentName: string,
//   variantName: string
// ): boolean => {
//   return !!projectData?.components?.[componentName]?.[variantName]
// }
// /**
//  * Get all available variants for a component
//  */
// export const getAvailableVariants = (
//   projectData: ProjectData | null | undefined,
//   componentName: string
// ): string[] => {
//   return Object.keys(projectData?.components?.[componentName] || {})
// }
