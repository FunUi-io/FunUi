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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableVariants = exports.hasComponentVariant = exports.useComponentProps = exports.useComponentConfiguration = exports.mergeComponentConfig = exports.getComponentConfig = void 0;
var theme_1 = require("../ui/theme/theme");
var react_1 = require("react");
/**
 * Universal component config getter
 *
 * @param projectData - The project configuration data
 * @param componentName - Name of the component to get config for
 * @param variantName - Name of the variant (defaults to 'default')
 * @returns Component configuration with metadata
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
    return {
        componentProps: (variantData === null || variantData === void 0 ? void 0 : variantData.componentProps) || {},
        variantExists: variantExists,
        actualVariant: targetVariant,
        availableVariants: availableVariants,
        metadata: (variantData === null || variantData === void 0 ? void 0 : variantData.metadata) || {}
    };
};
exports.getComponentConfig = getComponentConfig;
/**
 * Smart merge utility - LOCAL PROPS OVERRIDE CONFIG PROPS
 * If a prop exists in both local and config, local wins
 */
var smartMergeWithLocalOverride = function (configProps, localProps) {
    var result = __assign({}, configProps);
    // Apply local props - they override config props
    for (var key in localProps) {
        if (localProps[key] !== undefined) {
            // For objects, do smart merge but local object properties still override
            if (typeof localProps[key] === 'object' &&
                !Array.isArray(localProps[key]) &&
                localProps[key] !== null &&
                typeof configProps[key] === 'object' &&
                !Array.isArray(configProps[key]) &&
                configProps[key] !== null) {
                // Merge nested objects but local properties still win
                result[key] = __assign(__assign({}, configProps[key]), localProps[key]);
            }
            else {
                // Primitive values or arrays - local always wins
                result[key] = localProps[key];
            }
        }
    }
    return result;
};
/**
 * Merge component config with local props - LOCAL PROPS OVERRIDE CONFIG
 *
 * @param config - Component configuration from getComponentConfig
 * @param localProps - Props passed directly to the component (OVERRIDES CONFIG)
 * @returns Merged configuration with metadata
 */
var mergeComponentConfig = function (config, localProps) {
    if (localProps === void 0) { localProps = {}; }
    // Only apply config if variant exists and has actual configuration
    var hasValidConfig = config.variantExists && Object.keys(config.componentProps).length > 0;
    if (!hasValidConfig) {
        return {
            props: localProps,
            variant: config.actualVariant,
            hasConfig: false
        };
    }
    // LOCAL PROPS OVERRIDE CONFIG PROPS
    return {
        props: smartMergeWithLocalOverride(config.componentProps, localProps),
        variant: config.actualVariant,
        hasConfig: true
    };
};
exports.mergeComponentConfig = mergeComponentConfig;
/**
 * Hook for easy component config usage with LOCAL PROP OVERRIDE
 * Uses useMemo to prevent unnecessary re-computation
 *
 * @param componentName - Name of the component
 * @param variantName - Optional variant name
 * @returns Configuration object with helper methods
 */
var useComponentConfiguration = function (componentName, variantName) {
    var projectData = (0, theme_1.useTheme)().projectData;
    // Memoize config computation - only recompute when dependencies change
    var config = (0, react_1.useMemo)(function () {
        if (!variantName) {
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
    // Memoize merge function - LOCAL PROPS OVERRIDE CONFIG
    var mergeWithLocal = (0, react_1.useMemo)(function () {
        return function (localProps) {
            if (localProps === void 0) { localProps = {}; }
            // If no variant name was provided, return local props as-is
            if (!variantName) {
                return {
                    props: localProps,
                    variant: '',
                    hasConfig: false
                };
            }
            return (0, exports.mergeComponentConfig)(config, localProps);
        };
    }, [config, variantName]);
    // Memoize getProp function (gets from config only, not merged)
    var getProp = (0, react_1.useMemo)(function () {
        return function (propName, defaultValue) { var _a; return ((_a = config.componentProps[propName]) !== null && _a !== void 0 ? _a : defaultValue); };
    }, [config.componentProps]);
    return __assign(__assign({}, config), { mergeWithLocal: mergeWithLocal, getProp: getProp, hasVariant: config.variantExists, isDefaultVariant: config.actualVariant === 'default' });
};
exports.useComponentConfiguration = useComponentConfiguration;
/**
 * Hook that directly returns merged props with local override
 * Perfect for direct use in components
 */
var useComponentProps = function (componentName, variantName, localProps) {
    if (variantName === void 0) { variantName = 'default'; }
    if (localProps === void 0) { localProps = {}; }
    var projectData = (0, theme_1.useTheme)().projectData;
    return (0, react_1.useMemo)(function () {
        var config = (0, exports.getComponentConfig)(projectData, componentName, variantName);
        var merged = (0, exports.mergeComponentConfig)(config, localProps);
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
