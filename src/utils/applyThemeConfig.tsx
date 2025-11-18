export interface ThemeConfig {
  colors?: Record<string, string>;
}

/**
 * Applies color variables from a theme config to the :root element.
 * Example: { primary: "#8B5CF6" } → --color-primary: #8B5CF6
 */
export const applyThemeConfig = (themeConfig: ThemeConfig) => {
  if (typeof window === "undefined") return; // For SSR safety

  const root = document.documentElement;
  const colors = themeConfig.colors || {};

  Object.entries(colors).forEach(([key, value]) => {
    const varName = `--${key}`;
    root.style.setProperty(varName, String(value));
  });
};
