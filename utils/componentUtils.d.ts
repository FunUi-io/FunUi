export interface ComponentProps {
    [key: string]: any;
}
export interface ComponentMetadata {
    createdAt?: Date;
    updatedAt?: Date;
    isCustom?: boolean;
    baseVariant?: string;
}
export interface ComponentVariant {
    componentProps: ComponentProps;
    metadata?: ComponentMetadata;
}
export interface ComponentConfig {
    componentProps: ComponentProps;
    variantExists: boolean;
    actualVariant: string;
    availableVariants: string[];
    metadata: ComponentMetadata;
}
export interface ProjectData {
    components?: {
        [componentName: string]: {
            [variantName: string]: ComponentVariant;
        };
    };
}
export interface MergedConfig {
    props: ComponentProps;
    variant: string;
    hasConfig: boolean;
}
export interface UseComponentConfigReturn extends ComponentConfig {
    mergeWithLocal: (localProps?: ComponentProps) => MergedConfig;
    getProp: <T = any>(propName: string, defaultValue?: T) => T;
    hasVariant: boolean;
    isDefaultVariant: boolean;
}
/**
 * Universal component config getter
 *
 * @param projectData - The project configuration data
 * @param componentName - Name of the component to get config for
 * @param variantName - Name of the variant (defaults to 'default')
 * @returns Component configuration with metadata
 */
export declare const getComponentConfig: (projectData: ProjectData | null | undefined, componentName: string, variantName?: string) => ComponentConfig;
/**
 * Merge component config with local props - LOCAL PROPS OVERRIDE CONFIG
 *
 * @param config - Component configuration from getComponentConfig
 * @param localProps - Props passed directly to the component (OVERRIDES CONFIG)
 * @returns Merged configuration with metadata
 */
export declare const mergeComponentConfig: (config: ComponentConfig, localProps?: ComponentProps) => MergedConfig;
/**
 * Hook for easy component config usage with LOCAL PROP OVERRIDE
 * Uses useMemo to prevent unnecessary re-computation
 *
 * @param componentName - Name of the component
 * @param variantName - Optional variant name
 * @returns Configuration object with helper methods
 */
export declare const useComponentConfiguration: (componentName: string, variantName?: string) => UseComponentConfigReturn;
/**
 * Hook that directly returns merged props with local override
 * Perfect for direct use in components
 */
export declare const useComponentProps: (componentName: string, variantName?: string, localProps?: ComponentProps) => ComponentProps;
/**
 * Quick utility to check if a component variant exists
 */
export declare const hasComponentVariant: (projectData: ProjectData | null | undefined, componentName: string, variantName: string) => boolean;
/**
 * Get all available variants for a component
 */
export declare const getAvailableVariants: (projectData: ProjectData | null | undefined, componentName: string) => string[];
