export interface ThemeConfig {
    colors?: Record<string, string>;
}
/**
 * Applies color variables from a theme config to the :root element.
 * Example: { primary: "#8B5CF6" } → --color-primary: #8B5CF6
 */
export declare const applyThemeConfig: (themeConfig: ThemeConfig) => void;
