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
 * Check if a value is a bucket reference and extract bucket info
 */
var extractBucketInfo = function (value, props, projectData) {
    if (typeof value !== 'string')
        return null;
    // Check if it's a bucket reference {{bucket_name}}
    var bucketMatch = value.match(/^\{\{\s*([^}]+)\s*\}\}$/);
    if (!bucketMatch)
        return null;
    var bucketReference = bucketMatch[1].trim();
    // Try to get the actual bucket name from variables
    var bucketName = getVariableValue(bucketReference, projectData) || bucketReference;
    // Get bucketPage from props (with variable interpolation if needed)
    var bucketPage = 1;
    var bucketPageValue = props.bucketPage;
    if (bucketPageValue !== undefined) {
        if (typeof bucketPageValue === 'number') {
            bucketPage = bucketPageValue;
        }
        else if (typeof bucketPageValue === 'string') {
            // Check if bucketPage is also a variable reference
            var pageVariableName = extractVariableName(bucketPageValue);
            if (pageVariableName) {
                var pageValue = getVariableValue(pageVariableName, projectData);
                if (pageValue) {
                    var parsed = parseInt(pageValue, 10);
                    if (!isNaN(parsed) && parsed > 0) {
                        bucketPage = parsed;
                    }
                }
            }
            else {
                // Direct number string
                var parsed = parseInt(bucketPageValue, 10);
                if (!isNaN(parsed) && parsed > 0) {
                    bucketPage = parsed;
                }
            }
        }
    }
    return {
        bucketName: bucketName,
        bucketPage: Math.max(1, bucketPage)
    };
};
/**
 * Interpolate values (variables, assets, and buckets) in props
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
            // Check for bucket reference (treated specially in components)
            // We don't interpolate bucket references here - they stay as {{bucket_name}}
            // for the component to handle
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
 * Process props specifically for Store component to handle bucket references
 */
var processStoreProps = function (props, projectData) {
    var result = __assign({}, props);
    // Check if this is a Store component and has bucket prop
    if (props.bucket) {
        var bucketInfo = extractBucketInfo(props.bucket, props, projectData);
        if (bucketInfo) {
            // Replace bucket reference with actual bucket name
            result.bucket = bucketInfo.bucketName;
            // Ensure bucketPage is set (override if not provided or use extracted value)
            if (props.bucketPage === undefined || typeof props.bucketPage === 'string') {
                result.bucketPage = bucketInfo.bucketPage;
            }
            console.log("Processed bucket reference: ".concat(props.bucket, " -> ").concat(bucketInfo.bucketName, ", page: ").concat(bucketInfo.bucketPage));
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
    // Special processing for Store component bucket references
    var processedProps = componentName === 'Store'
        ? processStoreProps(interpolatedProps, projectData)
        : interpolatedProps;
    return {
        componentProps: processedProps,
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
var smartMergeWithLocalOverride = function (configProps, localProps, projectData, componentName) {
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
    var interpolatedResult = interpolateValues(result, projectData);
    // Special processing for Store component bucket references
    return componentName === 'Store'
        ? processStoreProps(interpolatedResult, projectData)
        : interpolatedResult;
};
/**
 * Merge component config with local props
 */
var mergeComponentConfig = function (config, localProps, projectData, componentName) {
    if (localProps === void 0) { localProps = {}; }
    // Only apply config if variant exists and has actual configuration
    var hasValidConfig = config.variantExists && Object.keys(config.componentProps).length > 0;
    if (!hasValidConfig) {
        // Still interpolate values in local props even if no config
        var interpolatedLocalProps = interpolateValues(localProps, projectData);
        // Special processing for Store component
        var processedLocalProps = componentName === 'Store'
            ? processStoreProps(interpolatedLocalProps, projectData)
            : interpolatedLocalProps;
        return {
            props: processedLocalProps,
            variant: config.actualVariant,
            hasConfig: false
        };
    }
    return {
        props: smartMergeWithLocalOverride(config.componentProps, localProps, projectData, componentName),
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
                var processedLocalProps = componentName === 'Store'
                    ? processStoreProps(interpolatedLocalProps, projectData)
                    : interpolatedLocalProps;
                return {
                    props: processedLocalProps,
                    variant: '',
                    hasConfig: false
                };
            }
            return (0, exports.mergeComponentConfig)(config, localProps, projectData, componentName);
        };
    }, [config, variantName, projectData, componentName]);
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
        var merged = (0, exports.mergeComponentConfig)(config, localProps, projectData, componentName);
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
// // Define the Asset interface based on your actual Asset type
// export interface Asset {
//   name: string;
//   url: string;
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
//   assets?: Asset[] // Use the Asset interface
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
//   if (!props) return {};
//   const filtered: ComponentProps = {};
//   for (const key in props) {
//     if (Object.prototype.hasOwnProperty.call(props, key)) {
//       const value = props[key];
//       // Only include props that are not undefined and not empty strings
//       if (value !== undefined && value !== '') {
//         filtered[key] = value;
//       }
//     }
//   }
//   return filtered;
// }
// /**
//  * Extract variable name from {{variable_name}} pattern
//  */
// const extractVariableName = (value: string): string | null => {
//   if (typeof value !== 'string') return null;
//   // Match exact {{variable}} pattern
//   const match = value.match(/^\{\{\s*([^}]+)\s*\}\}$/);
//   return match ? match[1].trim() : null;
// }
// /**
//  * Extract asset name from {{{asset_name}}} pattern
//  */
// const extractAssetName = (value: string): string | null => {
//   if (typeof value !== 'string') return null;
//   // Match exact {{{asset}}} pattern
//   const match = value.match(/^\{\{\{\s*([^}]+)\s*\}\}\}$/);
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
//  * Get asset URL from project assets
//  */
// const getAssetUrl = (
//   assetName: string,
//   projectData: ProjectData | null | undefined
// ): string | null => {
//   if (!projectData?.assets || !assetName) return null;
//   const asset = projectData.assets.find(a => a.name === assetName);
//   return asset?.url || null;
// }
// /**
//  * Get asset by name
//  */
// const getAsset = (
//   assetName: string,
//   projectData: ProjectData | null | undefined
// ): Asset | null => {
//   if (!projectData?.assets || !assetName) return null;
//   const asset = projectData.assets.find(a => a.name === assetName);
//   return asset || null;
// }
// /**
//  * Interpolate values (variables and assets) in props
//  */
// const interpolateValues = (
//   props: ComponentProps,
//   projectData: ProjectData | null | undefined
// ): ComponentProps => {
//   if (!props || Object.keys(props).length === 0) {
//     return props || {};
//   }
//   const result: ComponentProps = {};
//   // Create lookup maps for faster access
//   const variableMap: Record<string, string> = {};
//   const assetMap: Record<string, string> = {};
//   if (projectData?.variables) {
//     projectData.variables.forEach(variable => {
//       variableMap[variable.name] = variable.value;
//     });
//   }
//   if (projectData?.assets) {
//     projectData.assets.forEach(asset => {
//       assetMap[asset.name] = asset.url;
//     });
//   }
//   for (const key in props) {
//     if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
//     const value = props[key];
//     // Handle strings with interpolation
//     if (typeof value === 'string') {
//       // Check for asset reference first ({{{asset}}})
//       const assetName = extractAssetName(value);
//       if (assetName && assetMap[assetName]) {
//         result[key] = assetMap[assetName];
//         continue;
//       }
//       // Check for variable reference ({{variable}})
//       const variableName = extractVariableName(value);
//       if (variableName && variableMap[variableName]) {
//         result[key] = variableMap[variableName];
//         continue;
//       }
//       // No interpolation needed
//       result[key] = value;
//     } 
//     // Handle arrays - process string elements only
//     else if (Array.isArray(value)) {
//       result[key] = value.map(item => {
//         if (typeof item === 'string') {
//           // Check for asset reference
//           const assetName = extractAssetName(item);
//           if (assetName && assetMap[assetName]) {
//             return assetMap[assetName];
//           }
//           // Check for variable reference
//           const variableName = extractVariableName(item);
//           if (variableName && variableMap[variableName]) {
//             return variableMap[variableName];
//           }
//         }
//         return item;
//       });
//     }
//     // Handle objects - create shallow copy (no deep interpolation)
//     else if (value && typeof value === 'object' && !Array.isArray(value)) {
//       result[key] = { ...value };
//     }
//     // Handle arrays that are objects - create shallow copy
//     else if (Array.isArray(value)) {
//       result[key] = [...value];
//     }
//     // All other values pass through
//     else {
//       result[key] = value;
//     }
//   }
//   return result;
// }
// /**
//  * Universal component config getter with interpolation
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
//     };
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
//   const filteredComponentProps = filterEmptyProps(variantData?.componentProps || {});
//   // Apply interpolation to component props
//   const interpolatedProps = interpolateValues(filteredComponentProps, projectData);
//   return {
//     componentProps: interpolatedProps,
//     variantExists,
//     actualVariant: targetVariant,
//     availableVariants,
//     metadata: variantData?.metadata || {}
//   };
// }
// /**
//  * Smart merge utility - LOCAL PROPS OVERRIDE CONFIG PROPS
//  */
// const smartMergeWithLocalOverride = (
//   configProps: ComponentProps, 
//   localProps: ComponentProps,
//   projectData: ProjectData | null | undefined
// ): ComponentProps => {
//   // Start with interpolated config props
//   const interpolatedConfigProps = interpolateValues(configProps, projectData);
//   // Simple merge: local props override config props
//   const result = { ...interpolatedConfigProps };
//   // Apply local props (they will be interpolated in the final pass)
//   for (const key in localProps) {
//     if (Object.prototype.hasOwnProperty.call(localProps, key)) {
//       const value = localProps[key];
//       if (value !== undefined) {
//         result[key] = value;
//       }
//     }
//   }
//   // Final interpolation pass to handle any variable/asset references in local props
//   return interpolateValues(result, projectData);
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
//     // Still interpolate values in local props even if no config
//     const interpolatedLocalProps = interpolateValues(localProps, projectData);
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
//         const interpolatedLocalProps = interpolateValues(localProps, projectData);
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
//     return <T = any>(propName: string, defaultValue?: T): T => {
//       const value = config.componentProps[propName];
//       return (value !== undefined ? value : defaultValue) as T;
//     };
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
//  * Get all assets from project
//  */
// export const getProjectAssets = (
//   projectData: ProjectData | null | undefined
// ): Asset[] => {
//   return projectData?.assets || [];
// }
// /**
//  * Hook to get interpolated value for a specific variable or asset reference
//  */
// export const useValue = (value: string): string => {
//   const { projectData } = useTheme();
//   return useMemo(() => {
//     if (typeof value !== 'string') return value;
//     // Check for asset reference ({{{asset}}})
//     const assetName = extractAssetName(value);
//     if (assetName) {
//       const assetUrl = getAssetUrl(assetName, projectData);
//       return assetUrl || value;
//     }
//     // Check for variable reference ({{variable}})
//     const variableName = extractVariableName(value);
//     if (variableName) {
//       const variableValue = getVariableValue(variableName, projectData);
//       return variableValue || value;
//     }
//     return value;
//   }, [value, projectData]);
// }
// /**
//  * Hook to get a specific variable value
//  */
// export const useVariable = (variableName: string): string | null => {
//   const { projectData } = useTheme();
//   return useMemo(() => {
//     if (!variableName || !projectData?.variables) return null;
//     const variable = projectData.variables.find(v => v.name === variableName);
//     return variable?.value || null;
//   }, [variableName, projectData]);
// }
// /**
//  * Hook to get a specific asset
//  */
// export const useAsset = (assetName: string): Asset | null => {
//   const { projectData } = useTheme();
//   return useMemo(() => {
//     if (!assetName || !projectData?.assets) return null;
//     return getAsset(assetName, projectData);
//   }, [assetName, projectData]);
// }
// /**
//  * Hook to get a specific asset URL
//  */
// export const useAssetUrl = (assetName: string): string | null => {
//   const { projectData } = useTheme();
//   return useMemo(() => {
//     if (!assetName || !projectData?.assets) return null;
//     return getAssetUrl(assetName, projectData);
//   }, [assetName, projectData]);
// }
// /**
//  * Check if a value is a variable reference
//  */
// export const isVariableReference = (value: any): boolean => {
//   return typeof value === 'string' && !!extractVariableName(value);
// }
// /**
//  * Check if a value is an asset reference
//  */
// export const isAssetReference = (value: any): boolean => {
//   return typeof value === 'string' && !!extractAssetName(value);
// }
// /**
//  * Helper to convert variable/asset references for UI display
//  */
// export const formatReferenceForDisplay = (value: string): { type: 'variable' | 'asset' | 'custom', display: string } => {
//   if (!value || typeof value !== 'string') {
//     return { type: 'custom', display: value || '' };
//   }
//   const variableName = extractVariableName(value);
//   if (variableName) {
//     return { type: 'variable', display: variableName };
//   }
//   const assetName = extractAssetName(value);
//   if (assetName) {
//     return { type: 'asset', display: assetName };
//   }
//   return { type: 'custom', display: value };
// }
// /**
//  * Create a variable reference string
//  */
// export const createVariableReference = (variableName: string): string => {
//   return `{{${variableName}}}`;
// }
// /**
//  * Create an asset reference string
//  */
// export const createAssetReference = (assetName: string): string => {
//   return `{{{${assetName}}}}`;
// }
// /**
//  * Check if a prop value needs interpolation
//  */
// export const needsInterpolation = (value: any): boolean => {
//   if (typeof value !== 'string') return false;
//   return isVariableReference(value) || isAssetReference(value);
// }
// /**
//  * Get all references (variables and assets) used in props
//  */
// export const getUsedReferences = (
//   props: ComponentProps,
//   projectData: ProjectData | null | undefined
// ): { variables: string[]; assets: string[] } => {
//   const variables: string[] = [];
//   const assets: string[] = [];
//   if (!props || !projectData) return { variables, assets };
//   const processValue = (value: any) => {
//     if (typeof value === 'string') {
//       const variableName = extractVariableName(value);
//       if (variableName) {
//         variables.push(variableName);
//         return;
//       }
//       const assetName = extractAssetName(value);
//       if (assetName) {
//         assets.push(assetName);
//       }
//     } else if (Array.isArray(value)) {
//       value.forEach(processValue);
//     }
//   };
//   Object.values(props).forEach(processValue);
//   return {
//     variables: Array.from(new Set(variables)),
//     assets: Array.from(new Set(assets))
//   };
// }
// /**
//  * Get asset by name (exported version)
//  */
// export const getAssetByName = (assetName: string, projectData: ProjectData | null | undefined): Asset | null => {
//   return getAsset(assetName, projectData);
// }
// /**
//  * Get variable by name (exported version)
//  */
// export const getVariableByName = (variableName: string, projectData: ProjectData | null | undefined): { name: string; value: string } | null => {
//   if (!projectData?.variables || !variableName) return null;
//   const variable = projectData.variables.find(v => v.name === variableName);
//   return variable ? { name: variable.name, value: variable.value } : null;
// }
// export default {
//   getComponentConfig,
//   mergeComponentConfig,
//   useComponentConfiguration,
//   useComponentProps,
//   hasComponentVariant,
//   getAvailableVariants,
//   getProjectVariables,
//   getProjectAssets,
//   useValue,
//   useVariable,
//   useAsset,
//   useAssetUrl,
//   isVariableReference,
//   isAssetReference,
//   formatReferenceForDisplay,
//   createVariableReference,
//   createAssetReference,
//   needsInterpolation,
//   getUsedReferences,
//   getAssetByName,
//   getVariableByName
// };
