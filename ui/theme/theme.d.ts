import React, { ReactNode } from 'react';
export type ThemeVariant = 'standard' | 'minimal';
export type ThemeName = 'light' | 'dark' | 'dark-blue' | 'light-gray' | 'pastel-green' | 'warm-orange' | 'frosted-glass' | 'midnight-purple' | 'cyber-metal';
interface ThemeConfig {
    [key: string]: any;
}
interface Variable {
    name: string;
    value: any;
}
export interface BucketField {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: string[];
    min?: number;
    max?: number;
    multiple?: boolean;
}
export interface Bucket {
    id: string;
    name: string;
    displayName: string;
    category?: string;
    fields: BucketField[];
    createdBy: string;
    createdAt: number;
    updatedAt: number;
    updatedBy: string;
    recordCount: number;
    jsonFilesCount: number;
    totalRecordsInJson: number;
    lastJsonExport?: number;
    userId?: string;
    createdAtString?: string;
    updatedAtString?: string;
}
export interface BucketRecord {
    id: string;
    values: Record<string, any>;
    createdBy: string;
    createdAt: number;
    updatedAt: number;
    updatedBy: string;
}
export interface JsonFileMetadata {
    page: number;
    totalPages: number;
    recordsInPage: number;
    totalRecords: number;
    exportedAt: string;
    recordsPerFile: number;
    projectId: string;
    bucketId: string;
    bucketName: string;
}
export interface JsonFileData {
    metadata: JsonFileMetadata;
    records: BucketRecord[];
}
export interface JsonFileInfo {
    name: string;
    fullPath: string;
    url: string;
    size: number;
    page: number;
}
interface ProjectData {
    theme_config?: {
        colors?: Record<string, string>;
        typography?: Record<string, string>;
        [key: string]: any;
    };
    components?: Record<string, any>;
    default_variation?: ThemeVariant;
    variables?: Variable[];
    assets?: Asset[];
    buckets?: any[];
    name?: string;
    project_id?: string;
    version?: number;
    updated_at?: string;
    trustedDomains?: Array<{
        domain: string;
        status: string;
        isDefault?: boolean;
    }>;
}
interface ThemeProviderProps {
    theme: ThemeName;
    projectId?: string;
    funcss?: string;
    minHeight?: string;
    children: ReactNode;
    project?: ProjectData | null;
}
interface ThemeContextType {
    variant: ThemeVariant;
    setVariant: React.Dispatch<React.SetStateAction<ThemeVariant>>;
    themeConfig: ThemeConfig;
    projectData: ProjectData | null;
    isLoading: boolean;
    isInitialLoad: boolean;
    error: string | null;
    projectId?: string;
}
export declare const useTheme: () => ThemeContextType;
export declare const useVariant: () => {
    variant: ThemeVariant;
    setVariant: React.Dispatch<React.SetStateAction<ThemeVariant>>;
};
export declare const getVariable: (name: string) => {
    name: string;
    value: any;
} | undefined;
export declare const getAllVariables: () => Variable[];
declare const ThemeProvider: React.FC<ThemeProviderProps>;
export default ThemeProvider;
export declare const useThemeValue: (key: string) => string | undefined;
export declare const useComponentConfig: (componentName: string) => any;
export declare const useColors: () => Record<string, string>;
export declare const useTypography: () => Record<string, string>;
export declare const useThemeConfig: () => Record<string, any>;
export declare const useProjectData: () => ProjectData | null;
export declare const useColor: (colorName: string) => string | undefined;
export declare const useTypographyValue: (property: string) => string | undefined;
export declare const useComponentVariant: (componentName: string, variantName?: string) => any;
export declare const useVariables: () => Variable[];
export declare const useVariable: (name: string) => any;
interface Asset {
    name: string;
    url: string;
    file_type: string;
}
export declare const getAsset: (name: string) => Asset | undefined;
export declare const getAllAssets: () => Asset[];
export declare const getAssetValue: (name: string) => string | undefined;
export declare const getAssetType: (name: string) => string | undefined;
export declare const getAssetInfo: (name: string) => {
    value: string;
    type: string;
    name: string;
} | undefined;
export declare const useAssets: () => Asset[];
export declare const useAsset: (name: string) => Asset | undefined;
export declare const useAssetValue: (name: string) => string | undefined;
export declare const useAssetType: (name: string) => string | undefined;
export declare const useAssetInfo: (name: string) => {
    value: string;
    type: string;
    name: string;
} | undefined;
export declare const useAssetsByType: (type: string) => Asset[];
export declare const useImageAssets: () => Asset[];
export declare const useVideoAssets: () => Asset[];
export declare const useAudioAssets: () => Asset[];
export declare const useDocumentAssets: () => Asset[];
export declare const useBuckets: () => Bucket[];
export declare const useBucket: (bucketIdOrName: string) => Bucket | undefined;
export declare const useBucketsByCategory: (category: string) => Bucket[];
export declare const useBucketJsonFiles: (bucketIdOrName: string) => {
    files: JsonFileInfo[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
export declare const usePaginatedRecords: (bucketIdOrName: string, page: number, pageSize?: number) => {
    records: BucketRecord[];
    metadata: JsonFileMetadata | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
export declare const useAllJsonRecords: (bucketIdOrName: string) => {
    records: BucketRecord[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
export declare const useBucketCache: () => {
    clearCache: (bucketIdOrName?: string) => void;
    refresh: () => void;
};
export declare const getPaginatedRecords: (bucketIdOrName: string, page: number, pageSize?: number) => Promise<{
    records: BucketRecord[];
    metadata: JsonFileMetadata | null;
}>;
