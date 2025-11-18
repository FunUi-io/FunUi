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
interface ProjectData {
    theme_config?: {
        colors?: Record<string, string>;
        typography?: Record<string, string>;
        [key: string]: any;
    };
    components?: Record<string, any>;
    default_variation?: ThemeVariant;
    variables?: Variable[];
    name?: string;
    project_id?: string;
    version?: number;
    updated_at?: string;
}
interface ThemeProviderProps {
    theme: ThemeName;
    projectId: string;
    funcss?: string;
    minHeight?: string;
    children: ReactNode;
}
interface ThemeContextType {
    variant: ThemeVariant;
    setVariant: React.Dispatch<React.SetStateAction<ThemeVariant>>;
    themeConfig: ThemeConfig;
    projectData: ProjectData | null;
    isLoading: boolean;
    isInitialLoad: boolean;
    error: string | null;
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
