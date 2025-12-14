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
export interface Asset {
    name: string;
    url: string;
}
export interface ProjectData {
    components?: {
        [componentName: string]: {
            [variantName: string]: ComponentVariant;
        };
    };
    variables?: Array<{
        name: string;
        value: string;
        category?: string;
        createdBy?: string;
        createdAt?: number;
        updatedBy?: string;
        updatedAt?: number;
    }>;
    assets?: Asset[];
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
 * Universal component config getter with interpolation
 */
export declare const getComponentConfig: (projectData: ProjectData | null | undefined, componentName: string, variantName?: string) => ComponentConfig;
/**
 * Merge component config with local props
 */
export declare const mergeComponentConfig: (config: ComponentConfig, localProps: ComponentProps | undefined, projectData: ProjectData | null | undefined) => MergedConfig;
/**
 * Hook for easy component config usage
 */
export declare const useComponentConfiguration: (componentName: string, variantName?: string) => UseComponentConfigReturn;
/**
 * Hook that directly returns merged props with local override
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
/**
 * Get all variables from project
 */
export declare const getProjectVariables: (projectData: ProjectData | null | undefined) => Array<{
    name: string;
    value: string;
}>;
/**
 * Get all assets from project
 */
export declare const getProjectAssets: (projectData: ProjectData | null | undefined) => Asset[];
/**
 * Hook to get interpolated value for a specific variable or asset reference
 */
export declare const useValue: (value: string) => string;
/**
 * Hook to get a specific variable value
 */
export declare const useVariable: (variableName: string) => string | null;
/**
 * Hook to get a specific asset
 */
export declare const useAsset: (assetName: string) => Asset | null;
/**
 * Hook to get a specific asset URL
 */
export declare const useAssetUrl: (assetName: string) => string | null;
/**
 * Check if a value is a variable reference
 */
export declare const isVariableReference: (value: any) => boolean;
/**
 * Check if a value is an asset reference
 */
export declare const isAssetReference: (value: any) => boolean;
/**
 * Helper to convert variable/asset references for UI display
 */
export declare const formatReferenceForDisplay: (value: string) => {
    type: "variable" | "asset" | "custom";
    display: string;
};
/**
 * Create a variable reference string
 */
export declare const createVariableReference: (variableName: string) => string;
/**
 * Create an asset reference string
 */
export declare const createAssetReference: (assetName: string) => string;
/**
 * Check if a prop value needs interpolation
 */
export declare const needsInterpolation: (value: any) => boolean;
/**
 * Get all references (variables and assets) used in props
 */
export declare const getUsedReferences: (props: ComponentProps, projectData: ProjectData | null | undefined) => {
    variables: string[];
    assets: string[];
};
/**
 * Get asset by name (exported version)
 */
export declare const getAssetByName: (assetName: string, projectData: ProjectData | null | undefined) => Asset | null;
/**
 * Get variable by name (exported version)
 */
export declare const getVariableByName: (variableName: string, projectData: ProjectData | null | undefined) => {
    name: string;
    value: string;
} | null;
declare const _default: {
    getComponentConfig: (projectData: ProjectData | null | undefined, componentName: string, variantName?: string) => ComponentConfig;
    mergeComponentConfig: (config: ComponentConfig, localProps: ComponentProps | undefined, projectData: ProjectData | null | undefined) => MergedConfig;
    useComponentConfiguration: (componentName: string, variantName?: string) => UseComponentConfigReturn;
    useComponentProps: (componentName: string, variantName?: string, localProps?: ComponentProps) => ComponentProps;
    hasComponentVariant: (projectData: ProjectData | null | undefined, componentName: string, variantName: string) => boolean;
    getAvailableVariants: (projectData: ProjectData | null | undefined, componentName: string) => string[];
    getProjectVariables: (projectData: ProjectData | null | undefined) => Array<{
        name: string;
        value: string;
    }>;
    getProjectAssets: (projectData: ProjectData | null | undefined) => Asset[];
    useValue: (value: string) => string;
    useVariable: (variableName: string) => string | null;
    useAsset: (assetName: string) => Asset | null;
    useAssetUrl: (assetName: string) => string | null;
    isVariableReference: (value: any) => boolean;
    isAssetReference: (value: any) => boolean;
    formatReferenceForDisplay: (value: string) => {
        type: "variable" | "asset" | "custom";
        display: string;
    };
    createVariableReference: (variableName: string) => string;
    createAssetReference: (assetName: string) => string;
    needsInterpolation: (value: any) => boolean;
    getUsedReferences: (props: ComponentProps, projectData: ProjectData | null | undefined) => {
        variables: string[];
        assets: string[];
    };
    getAssetByName: (assetName: string, projectData: ProjectData | null | undefined) => Asset | null;
    getVariableByName: (variableName: string, projectData: ProjectData | null | undefined) => {
        name: string;
        value: string;
    } | null;
};
export default _default;
