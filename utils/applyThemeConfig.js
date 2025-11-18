"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyThemeConfig = void 0;
/**
 * Applies color variables from a theme config to the :root element.
 * Example: { primary: "#8B5CF6" } → --color-primary: #8B5CF6
 */
var applyThemeConfig = function (themeConfig) {
    if (typeof window === "undefined")
        return; // For SSR safety
    var root = document.documentElement;
    var colors = themeConfig.colors || {};
    Object.entries(colors).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var varName = "--".concat(key);
        root.style.setProperty(varName, String(value));
    });
};
exports.applyThemeConfig = applyThemeConfig;
