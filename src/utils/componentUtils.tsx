import { useTheme } from "../ui/theme/theme"
import { useMemo } from "react"

// Type definitions
export interface ComponentProps {
  [key: string]: any
}

export interface ComponentMetadata {
  createdAt?: Date
  updatedAt?: Date
  isCustom?: boolean
  baseVariant?: string
}

export interface ComponentVariant {
  componentProps: ComponentProps
  metadata?: ComponentMetadata
}

export interface ComponentConfig {
  componentProps: ComponentProps
  variantExists: boolean
  actualVariant: string
  availableVariants: string[]
  metadata: ComponentMetadata
}

// Define the Asset interface based on your actual Asset type
export interface Asset {
  name: string;
  url: string;
  
}

export interface ProjectData {
  components?: {
    [componentName: string]: {
      [variantName: string]: ComponentVariant
    }
  }
  variables?: Array<{
    name: string;
    value: string;
    category?: string;
    createdBy?: string;
    createdAt?: number;
    updatedBy?: string;
    updatedAt?: number;
  }>
  assets?: Asset[] // Use the Asset interface
}

export interface MergedConfig {
  props: ComponentProps
  variant: string
  hasConfig: boolean
}

export interface UseComponentConfigReturn extends ComponentConfig {
  mergeWithLocal: (localProps?: ComponentProps) => MergedConfig
  getProp: <T = any>(propName: string, defaultValue?: T) => T
  hasVariant: boolean
  isDefaultVariant: boolean
}

/**
 * Check if a variant name is valid (not empty or whitespace only)
 */
const isValidVariantName = (variantName: string | undefined): boolean => {
  return !!variantName && variantName.trim() !== '';
}

/**
 * Filter out empty string and undefined values from component props
 */
const filterEmptyProps = (props: ComponentProps): ComponentProps => {
  if (!props) return {};
  
  const filtered: ComponentProps = {};
  
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const value = props[key];
      // Only include props that are not undefined and not empty strings
      if (value !== undefined && value !== '') {
        filtered[key] = value;
      }
    }
  }
  
  return filtered;
}

/**
 * Extract variable name from {{variable_name}} pattern
 */
const extractVariableName = (value: string): string | null => {
  if (typeof value !== 'string') return null;
  
  // Match exact {{variable}} pattern
  const match = value.match(/^\{\{\s*([^}]+)\s*\}\}$/);
  return match ? match[1].trim() : null;
}

/**
 * Extract asset name from {{{asset_name}}} pattern
 */
const extractAssetName = (value: string): string | null => {
  if (typeof value !== 'string') return null;
  
  // Match exact {{{asset}}} pattern
  const match = value.match(/^\{\{\{\s*([^}]+)\s*\}\}\}$/);
  return match ? match[1].trim() : null;
}

/**
 * Get variable value from project variables
 */
const getVariableValue = (
  variableName: string,
  projectData: ProjectData | null | undefined
): string | null => {
  if (!projectData?.variables || !variableName) return null;
  
  const variable = projectData.variables.find(v => v.name === variableName);
  return variable?.value || null;
}

/**
 * Get asset URL from project assets
 */
const getAssetUrl = (
  assetName: string,
  projectData: ProjectData | null | undefined
): string | null => {
  if (!projectData?.assets || !assetName) return null;
  
  const asset = projectData.assets.find(a => a.name === assetName);
  return asset?.url || null;
}

/**
 * Get asset by name
 */
const getAsset = (
  assetName: string,
  projectData: ProjectData | null | undefined
): Asset | null => {
  if (!projectData?.assets || !assetName) return null;
  
  const asset = projectData.assets.find(a => a.name === assetName);
  return asset || null;
}

/**
 * Interpolate values (variables and assets) in props
 */
const interpolateValues = (
  props: ComponentProps,
  projectData: ProjectData | null | undefined
): ComponentProps => {
  if (!props || Object.keys(props).length === 0) {
    return props || {};
  }
  
  const result: ComponentProps = {};
  
  // Create lookup maps for faster access
  const variableMap: Record<string, string> = {};
  const assetMap: Record<string, string> = {};
  
  if (projectData?.variables) {
    projectData.variables.forEach(variable => {
      variableMap[variable.name] = variable.value;
    });
  }
  
  if (projectData?.assets) {
    projectData.assets.forEach(asset => {
      assetMap[asset.name] = asset.url;
    });
  }
  
  for (const key in props) {
    if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
    
    const value = props[key];
    
    // Handle strings with interpolation
    if (typeof value === 'string') {
      // Check for asset reference first ({{{asset}}})
      const assetName = extractAssetName(value);
      if (assetName && assetMap[assetName]) {
        result[key] = assetMap[assetName];
        continue;
      }
      
      // Check for variable reference ({{variable}})
      const variableName = extractVariableName(value);
      if (variableName && variableMap[variableName]) {
        result[key] = variableMap[variableName];
        continue;
      }
      
      // No interpolation needed
      result[key] = value;
    } 
    // Handle arrays - process string elements only
    else if (Array.isArray(value)) {
      result[key] = value.map(item => {
        if (typeof item === 'string') {
          // Check for asset reference
          const assetName = extractAssetName(item);
          if (assetName && assetMap[assetName]) {
            return assetMap[assetName];
          }
          
          // Check for variable reference
          const variableName = extractVariableName(item);
          if (variableName && variableMap[variableName]) {
            return variableMap[variableName];
          }
        }
        return item;
      });
    }
    // Handle objects - create shallow copy (no deep interpolation)
    else if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = { ...value };
    }
    // Handle arrays that are objects - create shallow copy
    else if (Array.isArray(value)) {
      result[key] = [...value];
    }
    // All other values pass through
    else {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Universal component config getter with interpolation
 */
export const getComponentConfig = (
  projectData: ProjectData | null | undefined,
  componentName: string,
  variantName: string = 'default'
): ComponentConfig => {
  // Early return if no component exists
  if (!projectData?.components?.[componentName]) {
    return {
      componentProps: {},
      variantExists: false,
      actualVariant: variantName,
      availableVariants: [],
      metadata: {}
    };
  }

  const component = projectData.components[componentName];
  const availableVariants = Object.keys(component);
  
  // Find the best variant match with fallback chain
  let targetVariant = variantName;
  let variantExists = availableVariants.includes(variantName);
  
  if (!variantExists) {
    // Fallback priority: default → first available → none
    if (availableVariants.includes('default')) {
      targetVariant = 'default';
      variantExists = true;
    } else if (availableVariants.length > 0) {
      targetVariant = availableVariants[0];
      variantExists = true;
    } else {
      return {
        componentProps: {},
        variantExists: false,
        actualVariant: variantName,
        availableVariants: [],
        metadata: {}
      };
    }
  }

  const variantData = component[targetVariant];
  
  // Filter out empty string and undefined props from config
  const filteredComponentProps = filterEmptyProps(variantData?.componentProps || {});
  
  // Apply interpolation to component props
  const interpolatedProps = interpolateValues(filteredComponentProps, projectData);
  
  return {
    componentProps: interpolatedProps,
    variantExists,
    actualVariant: targetVariant,
    availableVariants,
    metadata: variantData?.metadata || {}
  };
}

/**
 * Smart merge utility - LOCAL PROPS OVERRIDE CONFIG PROPS
 */
const smartMergeWithLocalOverride = (
  configProps: ComponentProps, 
  localProps: ComponentProps,
  projectData: ProjectData | null | undefined
): ComponentProps => {
  // Start with interpolated config props
  const interpolatedConfigProps = interpolateValues(configProps, projectData);
  
  // Simple merge: local props override config props
  const result = { ...interpolatedConfigProps };
  
  // Apply local props (they will be interpolated in the final pass)
  for (const key in localProps) {
    if (Object.prototype.hasOwnProperty.call(localProps, key)) {
      const value = localProps[key];
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }
  
  // Final interpolation pass to handle any variable/asset references in local props
  return interpolateValues(result, projectData);
}

/**
 * Merge component config with local props
 */
export const mergeComponentConfig = (
  config: ComponentConfig,
  localProps: ComponentProps = {},
  projectData: ProjectData | null | undefined
): MergedConfig => {
  // Only apply config if variant exists and has actual configuration
  const hasValidConfig = config.variantExists && Object.keys(config.componentProps).length > 0;
  
  if (!hasValidConfig) {
    // Still interpolate values in local props even if no config
    const interpolatedLocalProps = interpolateValues(localProps, projectData);
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
}

/**
 * Hook for easy component config usage
 */
export const useComponentConfiguration = (
  componentName: string, 
  variantName?: string
): UseComponentConfigReturn => {
  const { projectData } = useTheme();

  // Memoize config computation
  const config = useMemo(() => {
    if (!isValidVariantName(variantName)) {
      return {
        componentProps: {},
        variantExists: false,
        actualVariant: '',
        availableVariants: [],
        metadata: {}
      };
    }
    return getComponentConfig(projectData, componentName, variantName!);
  }, [projectData, componentName, variantName]);
  
  // Memoize merge function
  const mergeWithLocal = useMemo(() => {
    return (localProps: ComponentProps = {}): MergedConfig => {
      if (!isValidVariantName(variantName)) {
        const interpolatedLocalProps = interpolateValues(localProps, projectData);
        return {
          props: interpolatedLocalProps,
          variant: '',
          hasConfig: false
        };
      }
      return mergeComponentConfig(config, localProps, projectData);
    };
  }, [config, variantName, projectData]);
  
  // Memoize getProp function
  const getProp = useMemo(() => {
    return <T = any>(propName: string, defaultValue?: T): T => {
      const value = config.componentProps[propName];
      return (value !== undefined ? value : defaultValue) as T;
    };
  }, [config.componentProps]);

  return {
    ...config,
    mergeWithLocal,
    getProp,
    hasVariant: config.variantExists,
    isDefaultVariant: config.actualVariant === 'default'
  };
}

/**
 * Hook that directly returns merged props with local override
 */
export const useComponentProps = (
  componentName: string,
  variantName: string = 'default',
  localProps: ComponentProps = {}
): ComponentProps => {
  const { projectData } = useTheme();

  return useMemo(() => {
    const config = getComponentConfig(projectData, componentName, variantName);
    const merged = mergeComponentConfig(config, localProps, projectData);
    return merged.props;
  }, [projectData, componentName, variantName, localProps]);
}

/**
 * Quick utility to check if a component variant exists
 */
export const hasComponentVariant = (
  projectData: ProjectData | null | undefined,
  componentName: string,
  variantName: string
): boolean => {
  return !!projectData?.components?.[componentName]?.[variantName];
}

/**
 * Get all available variants for a component
 */
export const getAvailableVariants = (
  projectData: ProjectData | null | undefined,
  componentName: string
): string[] => {
  return Object.keys(projectData?.components?.[componentName] || {});
}

/**
 * Get all variables from project
 */
export const getProjectVariables = (
  projectData: ProjectData | null | undefined
): Array<{name: string; value: string}> => {
  return projectData?.variables?.map(v => ({ 
    name: v.name, 
    value: v.value 
  })) || [];
}

/**
 * Get all assets from project
 */
export const getProjectAssets = (
  projectData: ProjectData | null | undefined
): Asset[] => {
  return projectData?.assets || [];
}

/**
 * Hook to get interpolated value for a specific variable or asset reference
 */
export const useValue = (value: string): string => {
  const { projectData } = useTheme();
  
  return useMemo(() => {
    if (typeof value !== 'string') return value;
    
    // Check for asset reference ({{{asset}}})
    const assetName = extractAssetName(value);
    if (assetName) {
      const assetUrl = getAssetUrl(assetName, projectData);
      return assetUrl || value;
    }
    
    // Check for variable reference ({{variable}})
    const variableName = extractVariableName(value);
    if (variableName) {
      const variableValue = getVariableValue(variableName, projectData);
      return variableValue || value;
    }
    
    return value;
  }, [value, projectData]);
}

/**
 * Hook to get a specific variable value
 */
export const useVariable = (variableName: string): string | null => {
  const { projectData } = useTheme();
  
  return useMemo(() => {
    if (!variableName || !projectData?.variables) return null;
    
    const variable = projectData.variables.find(v => v.name === variableName);
    return variable?.value || null;
  }, [variableName, projectData]);
}

/**
 * Hook to get a specific asset
 */
export const useAsset = (assetName: string): Asset | null => {
  const { projectData } = useTheme();
  
  return useMemo(() => {
    if (!assetName || !projectData?.assets) return null;
    
    return getAsset(assetName, projectData);
  }, [assetName, projectData]);
}

/**
 * Hook to get a specific asset URL
 */
export const useAssetUrl = (assetName: string): string | null => {
  const { projectData } = useTheme();
  
  return useMemo(() => {
    if (!assetName || !projectData?.assets) return null;
    
    return getAssetUrl(assetName, projectData);
  }, [assetName, projectData]);
}

/**
 * Check if a value is a variable reference
 */
export const isVariableReference = (value: any): boolean => {
  return typeof value === 'string' && !!extractVariableName(value);
}

/**
 * Check if a value is an asset reference
 */
export const isAssetReference = (value: any): boolean => {
  return typeof value === 'string' && !!extractAssetName(value);
}

/**
 * Helper to convert variable/asset references for UI display
 */
export const formatReferenceForDisplay = (value: string): { type: 'variable' | 'asset' | 'custom', display: string } => {
  if (!value || typeof value !== 'string') {
    return { type: 'custom', display: value || '' };
  }
  
  const variableName = extractVariableName(value);
  if (variableName) {
    return { type: 'variable', display: variableName };
  }
  
  const assetName = extractAssetName(value);
  if (assetName) {
    return { type: 'asset', display: assetName };
  }
  
  return { type: 'custom', display: value };
}

/**
 * Create a variable reference string
 */
export const createVariableReference = (variableName: string): string => {
  return `{{${variableName}}}`;
}

/**
 * Create an asset reference string
 */
export const createAssetReference = (assetName: string): string => {
  return `{{{${assetName}}}}`;
}

/**
 * Check if a prop value needs interpolation
 */
export const needsInterpolation = (value: any): boolean => {
  if (typeof value !== 'string') return false;
  return isVariableReference(value) || isAssetReference(value);
}

/**
 * Get all references (variables and assets) used in props
 */
export const getUsedReferences = (
  props: ComponentProps,
  projectData: ProjectData | null | undefined
): { variables: string[]; assets: string[] } => {
  const variables: string[] = [];
  const assets: string[] = [];
  
  if (!props || !projectData) return { variables, assets };
  
  const processValue = (value: any) => {
    if (typeof value === 'string') {
      const variableName = extractVariableName(value);
      if (variableName) {
        variables.push(variableName);
        return;
      }
      
      const assetName = extractAssetName(value);
      if (assetName) {
        assets.push(assetName);
      }
    } else if (Array.isArray(value)) {
      value.forEach(processValue);
    }
  };
  
  Object.values(props).forEach(processValue);
  
  return {
    variables: Array.from(new Set(variables)),
    assets: Array.from(new Set(assets))
  };
}

/**
 * Get asset by name (exported version)
 */
export const getAssetByName = (assetName: string, projectData: ProjectData | null | undefined): Asset | null => {
  return getAsset(assetName, projectData);
}

/**
 * Get variable by name (exported version)
 */
export const getVariableByName = (variableName: string, projectData: ProjectData | null | undefined): { name: string; value: string } | null => {
  if (!projectData?.variables || !variableName) return null;
  
  const variable = projectData.variables.find(v => v.name === variableName);
  return variable ? { name: variable.name, value: variable.value } : null;
}

export default {
  getComponentConfig,
  mergeComponentConfig,
  useComponentConfiguration,
  useComponentProps,
  hasComponentVariant,
  getAvailableVariants,
  getProjectVariables,
  getProjectAssets,
  useValue,
  useVariable,
  useAsset,
  useAssetUrl,
  isVariableReference,
  isAssetReference,
  formatReferenceForDisplay,
  createVariableReference,
  createAssetReference,
  needsInterpolation,
  getUsedReferences,
  getAssetByName,
  getVariableByName
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