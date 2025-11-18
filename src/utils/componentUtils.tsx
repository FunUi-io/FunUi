import { useTheme } from "../ui/theme/theme"
import { useMemo } from "react"

// utils/componentUtils.ts
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

export interface ProjectData {
  components?: {
    [componentName: string]: {
      [variantName: string]: ComponentVariant
    }
  }
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
 * Universal component config getter
 * 
 * @param projectData - The project configuration data
 * @param componentName - Name of the component to get config for
 * @param variantName - Name of the variant (defaults to 'default')
 * @returns Component configuration with metadata
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
    }
  }

  const component = projectData.components[componentName]
  const availableVariants = Object.keys(component)
  
  // Find the best variant match with fallback chain
  let targetVariant = variantName
  let variantExists = availableVariants.includes(variantName)
  
  if (!variantExists) {
    // Fallback priority: default → first available → none
    if (availableVariants.includes('default')) {
      targetVariant = 'default'
      variantExists = true
    } else if (availableVariants.length > 0) {
      targetVariant = availableVariants[0]
      variantExists = true
    } else {
      return {
        componentProps: {},
        variantExists: false,
        actualVariant: variantName,
        availableVariants: [],
        metadata: {}
      }
    }
  }

  const variantData = component[targetVariant]
  
  return {
    componentProps: variantData?.componentProps || {},
    variantExists,
    actualVariant: targetVariant,
    availableVariants,
    metadata: variantData?.metadata || {}
  }
}

/**
 * Smart merge utility - LOCAL PROPS OVERRIDE CONFIG PROPS
 * If a prop exists in both local and config, local wins
 */
const smartMergeWithLocalOverride = (
  configProps: ComponentProps, 
  localProps: ComponentProps
): ComponentProps => {
  const result = { ...configProps }
  
  // Apply local props - they override config props
  for (const key in localProps) {
    if (localProps[key] !== undefined) {
      // For objects, do smart merge but local object properties still override
      if (typeof localProps[key] === 'object' && 
          !Array.isArray(localProps[key]) && 
          localProps[key] !== null &&
          typeof configProps[key] === 'object' &&
          !Array.isArray(configProps[key]) &&
          configProps[key] !== null) {
        
        // Merge nested objects but local properties still win
        result[key] = { ...configProps[key], ...localProps[key] }
      } else {
        // Primitive values or arrays - local always wins
        result[key] = localProps[key]
      }
    }
  }
  
  return result
}

/**
 * Merge component config with local props - LOCAL PROPS OVERRIDE CONFIG
 * 
 * @param config - Component configuration from getComponentConfig
 * @param localProps - Props passed directly to the component (OVERRIDES CONFIG)
 * @returns Merged configuration with metadata
 */
export const mergeComponentConfig = (
  config: ComponentConfig,
  localProps: ComponentProps = {}
): MergedConfig => {
  // Only apply config if variant exists and has actual configuration
  const hasValidConfig = config.variantExists && Object.keys(config.componentProps).length > 0
  
  if (!hasValidConfig) {
    return {
      props: localProps,
      variant: config.actualVariant,
      hasConfig: false
    }
  }

  // LOCAL PROPS OVERRIDE CONFIG PROPS
  return {
    props: smartMergeWithLocalOverride(config.componentProps, localProps),
    variant: config.actualVariant,
    hasConfig: true
  }
}

/**
 * Hook for easy component config usage with LOCAL PROP OVERRIDE
 * Uses useMemo to prevent unnecessary re-computation
 * 
 * @param componentName - Name of the component
 * @param variantName - Optional variant name
 * @returns Configuration object with helper methods
 */
export const useComponentConfiguration = (
  componentName: string, 
  variantName?: string
): UseComponentConfigReturn => {
  const { projectData } = useTheme()

  
  // Memoize config computation - only recompute when dependencies change
  const config = useMemo(() => {
    if (!variantName) {
      return {
        componentProps: {},
        variantExists: false,
        actualVariant: '',
        availableVariants: [],
        metadata: {}
      }
    }
    return getComponentConfig(projectData, componentName, variantName)
  }, [projectData, componentName, variantName])
  
  // Memoize merge function - LOCAL PROPS OVERRIDE CONFIG
  const mergeWithLocal = useMemo(() => {
    return (localProps: ComponentProps = {}): MergedConfig => {
      // If no variant name was provided, return local props as-is
      if (!variantName) {
        return {
          props: localProps,
          variant: '',
          hasConfig: false
        }
      }
      return mergeComponentConfig(config, localProps)
    }
  }, [config, variantName])
  
  // Memoize getProp function (gets from config only, not merged)
  const getProp = useMemo(() => {
    return <T = any>(propName: string, defaultValue?: T): T => 
      (config.componentProps[propName] ?? defaultValue) as T
  }, [config.componentProps])

  return {
    ...config,
    mergeWithLocal,
    getProp,
    hasVariant: config.variantExists,
    isDefaultVariant: config.actualVariant === 'default'
  }
}

/**
 * Hook that directly returns merged props with local override
 * Perfect for direct use in components
 */
export const useComponentProps = (
  componentName: string,
  variantName: string = 'default',
  localProps: ComponentProps = {}
): ComponentProps => {
  const { projectData } = useTheme()
  
  return useMemo(() => {
    const config = getComponentConfig(projectData, componentName, variantName)
    const merged = mergeComponentConfig(config, localProps)
    return merged.props
  }, [projectData, componentName, variantName, localProps])
}

/**
 * Quick utility to check if a component variant exists
 */
export const hasComponentVariant = (
  projectData: ProjectData | null | undefined,
  componentName: string,
  variantName: string
): boolean => {
  return !!projectData?.components?.[componentName]?.[variantName]
}

/**
 * Get all available variants for a component
 */
export const getAvailableVariants = (
  projectData: ProjectData | null | undefined,
  componentName: string
): string[] => {
  return Object.keys(projectData?.components?.[componentName] || {})
}

