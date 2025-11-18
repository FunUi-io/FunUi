"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVariable = exports.useVariables = exports.useComponentVariant = exports.useTypographyValue = exports.useColor = exports.useProjectData = exports.useThemeConfig = exports.useTypography = exports.useColors = exports.useComponentConfig = exports.useThemeValue = exports.getAllVariables = exports.getVariable = exports.useVariant = exports.useTheme = void 0;
var react_1 = __importStar(require("react"));
var themes_1 = require("./themes");
var darkenUtils_1 = require("./darkenUtils");
var ThemeContext = (0, react_1.createContext)({
    variant: 'standard',
    setVariant: function () { },
    themeConfig: {},
    projectData: null,
    isLoading: true,
    isInitialLoad: true,
    error: null,
});
var useTheme = function () {
    var context = (0, react_1.useContext)(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
exports.useTheme = useTheme;
var useVariant = function () {
    var _a = (0, exports.useTheme)(), variant = _a.variant, setVariant = _a.setVariant;
    return { variant: variant, setVariant: setVariant };
};
exports.useVariant = useVariant;
/* -------------------------------------------------------------------------- */
/*                          LOCAL FILE MANAGEMENT                             */
/* -------------------------------------------------------------------------- */
var loadLocalTheme = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, fetch('/funui.json', {
                        cache: 'no-cache',
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                console.log('✅ Loaded theme from local file');
                return [2 /*return*/, data];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log('No local theme file found');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, null];
        }
    });
}); };
/* -------------------------------------------------------------------------- */
/*                          CDN THEME LOADER                                  */
/* -------------------------------------------------------------------------- */
var loadThemeFromCDN = function (projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var publicUrl, response, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                publicUrl = "https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/themes%2F".concat(projectId, ".json?alt=media");
                return [4 /*yield*/, fetch(publicUrl, {
                        cache: 'no-cache',
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                console.log('✅ Loaded theme from Firebase Storage CDN');
                return [2 /*return*/, data];
            case 3:
                console.error('Firebase Storage fetch failed:', response.status, response.statusText);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error('Error loading from Firebase Storage:', error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/, null];
        }
    });
}); };
/* -------------------------------------------------------------------------- */
/*                          CSS VARIABLE APPLIER                              */
/* -------------------------------------------------------------------------- */
var applyTypographyVariables = function (typography, root) {
    if (!typography)
        return;
    Object.entries(typography).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var cssVarName = "--".concat(key.replace(/_/g, '-'));
        root.style.setProperty(cssVarName, value);
    });
};
var applyColorVariables = function (colors, root) {
    if (!colors)
        return;
    Object.entries(colors).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var cssVarName = "--".concat(key.replace(/_/g, '-'));
        root.style.setProperty(cssVarName, value);
    });
};
var applyThemeConfig = function (themeConfig, root) {
    if (!themeConfig)
        return;
    if (themeConfig.colors) {
        applyColorVariables(themeConfig.colors, root);
    }
    if (themeConfig.typography) {
        applyTypographyVariables(themeConfig.typography, root);
    }
    Object.entries(themeConfig).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (key !== 'colors' && key !== 'typography' && typeof value === 'string') {
            var cssVarName = "--".concat(key.replace(/_/g, '-'));
            root.style.setProperty(cssVarName, value);
        }
    });
};
/* -------------------------------------------------------------------------- */
/*                          VARIABLES HELPER                                  */
/* -------------------------------------------------------------------------- */
var cachedProjectData = null;
var getVariable = function (name) {
    if (!(cachedProjectData === null || cachedProjectData === void 0 ? void 0 : cachedProjectData.variables)) {
        console.warn('No variables available. Make sure ThemeProvider is mounted.');
        return undefined;
    }
    var variable = cachedProjectData.variables.find(function (v) { return v.name === name; });
    return variable;
};
exports.getVariable = getVariable;
var getAllVariables = function () {
    return (cachedProjectData === null || cachedProjectData === void 0 ? void 0 : cachedProjectData.variables) || [];
};
exports.getAllVariables = getAllVariables;
/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */
var ThemeProvider = function (_a) {
    var theme = _a.theme, children = _a.children, _b = _a.funcss, funcss = _b === void 0 ? '' : _b, _c = _a.minHeight, minHeight = _c === void 0 ? '100vh' : _c, projectId = _a.projectId;
    var _d = (0, react_1.useState)('standard'), variant = _d[0], setVariant = _d[1];
    var _e = (0, react_1.useState)({}), themeConfig = _e[0], setThemeConfig = _e[1];
    var _f = (0, react_1.useState)(null), projectData = _f[0], setProjectData = _f[1];
    var _g = (0, react_1.useState)(true), isLoading = _g[0], setIsLoading = _g[1];
    var _h = (0, react_1.useState)(true), isInitialLoad = _h[0], setIsInitialLoad = _h[1];
    var _j = (0, react_1.useState)(null), error = _j[0], setError = _j[1];
    var _k = (0, react_1.useState)(null), currentVersion = _k[0], setCurrentVersion = _k[1];
    /* -------------------------- Apply base theme --------------------------- */
    (0, react_1.useEffect)(function () {
        var root = document.documentElement;
        var selectedTheme = themes_1.themes[theme] || themes_1.themes.light;
        Object.entries(selectedTheme).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            root.style.setProperty(key, value);
        });
        if (['dark', 'dark-blue', 'midnight-purple', 'cyber-metal'].includes(theme)) {
            themes_1.colorVarsToDarken.forEach(function (varName) {
                var original = getComputedStyle(root)
                    .getPropertyValue(varName)
                    .trim();
                if (original) {
                    var darkAmount = (0, darkenUtils_1.getDarkenAmount)(varName);
                    var rgba = (0, darkenUtils_1.darkenToRgba)(original, darkAmount, 0.9);
                    root.style.setProperty(varName, rgba);
                }
            });
        }
    }, [theme]);
    /* ---------------------- CDN Theme Sync with Local File ----------------------- */
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined' || !projectId) {
            setIsLoading(false);
            setIsInitialLoad(false);
            return;
        }
        var root = document.documentElement;
        var pollTimer;
        var syncTheme = function () { return __awaiter(void 0, void 0, void 0, function () {
            var localTheme, localVersion, cdnTheme, cdnVersion, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, loadLocalTheme()];
                    case 1:
                        localTheme = _a.sent();
                        localVersion = (localTheme === null || localTheme === void 0 ? void 0 : localTheme.version) || 0;
                        return [4 /*yield*/, loadThemeFromCDN(projectId)];
                    case 2:
                        cdnTheme = _a.sent();
                        cdnVersion = (cdnTheme === null || cdnTheme === void 0 ? void 0 : cdnTheme.version) || 0;
                        if (cdnTheme) {
                            // Compare versions and use the newer one
                            if (cdnVersion !== localVersion) {
                                console.log("\uD83D\uDD04 Version mismatch: Local(".concat(localVersion, ") vs CDN(").concat(cdnVersion, ")"));
                                console.log('ℹ️ Using CDN version. Please update your local funui.json file manually.');
                            }
                            // Always use CDN theme if available
                            if (!currentVersion || cdnVersion !== currentVersion) {
                                applyThemeData(cdnTheme, root);
                                setCurrentVersion(cdnVersion);
                                console.log('✅ Theme loaded from CDN');
                            }
                            else {
                                console.log('✓ Theme up to date');
                            }
                            setError(null);
                        }
                        else if (localTheme) {
                            // CDN not available but we have local
                            console.log('⚠️ Using local theme (CDN unavailable)');
                            applyThemeData(localTheme, root);
                            setCurrentVersion(localVersion);
                            setError(null);
                        }
                        else {
                            // No theme available anywhere
                            console.warn('⚠️ No theme found');
                            setError('Theme not found');
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        console.error('Error syncing theme:', err_1);
                        setError('Failed to sync theme');
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        setIsInitialLoad(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        // Initial sync
        syncTheme();
        // Poll for updates every 5 minutes
        pollTimer = setInterval(function () {
            syncTheme();
        }, 5 * 60 * 1000);
        return function () {
            clearInterval(pollTimer);
        };
    }, [projectId, currentVersion]);
    var applyThemeData = function (data, root) {
        var _a;
        var themeConfig = (_a = data.theme_config) !== null && _a !== void 0 ? _a : {};
        var newVariant = data.default_variation || 'standard';
        setVariant(newVariant);
        setThemeConfig(themeConfig);
        setProjectData(data);
        // Cache for variable access
        cachedProjectData = data;
        // Apply all theme config to CSS variables
        applyThemeConfig(themeConfig, root);
    };
    var contextValue = (0, react_1.useMemo)(function () { return ({
        variant: variant,
        setVariant: setVariant,
        themeConfig: themeConfig,
        projectData: projectData,
        isLoading: isLoading,
        isInitialLoad: isInitialLoad,
        error: error,
    }); }, [variant, themeConfig, projectData, isLoading, isInitialLoad, error]);
    return (react_1.default.createElement(ThemeContext.Provider, { value: contextValue },
        react_1.default.createElement("div", { className: "theme-".concat(theme, " ").concat(funcss), style: {
                backgroundColor: 'var(--page-bg)',
                color: 'var(--text-color)',
                minHeight: minHeight,
                transition: isInitialLoad ? 'none' : 'background-color 0.3s ease, color 0.3s ease',
            } }, children)));
};
exports.default = ThemeProvider;
/* -------------------------------------------------------------------------- */
/*                              HELPER HOOKS                                  */
/* -------------------------------------------------------------------------- */
var useThemeValue = function (key) {
    var themeConfig = (0, exports.useTheme)().themeConfig;
    return themeConfig[key];
};
exports.useThemeValue = useThemeValue;
var useComponentConfig = function (componentName) {
    var _a;
    var projectData = (0, exports.useTheme)().projectData;
    return ((_a = projectData === null || projectData === void 0 ? void 0 : projectData.components) === null || _a === void 0 ? void 0 : _a[componentName]) || {};
};
exports.useComponentConfig = useComponentConfig;
var useColors = function () {
    var _a;
    var projectData = (0, exports.useTheme)().projectData;
    return ((_a = projectData === null || projectData === void 0 ? void 0 : projectData.theme_config) === null || _a === void 0 ? void 0 : _a.colors) || {};
};
exports.useColors = useColors;
var useTypography = function () {
    var _a;
    var projectData = (0, exports.useTheme)().projectData;
    return ((_a = projectData === null || projectData === void 0 ? void 0 : projectData.theme_config) === null || _a === void 0 ? void 0 : _a.typography) || {};
};
exports.useTypography = useTypography;
var useThemeConfig = function () {
    var projectData = (0, exports.useTheme)().projectData;
    return (projectData === null || projectData === void 0 ? void 0 : projectData.theme_config) || {};
};
exports.useThemeConfig = useThemeConfig;
var useProjectData = function () {
    var projectData = (0, exports.useTheme)().projectData;
    return projectData;
};
exports.useProjectData = useProjectData;
var useColor = function (colorName) {
    var colors = (0, exports.useColors)();
    return colors[colorName];
};
exports.useColor = useColor;
var useTypographyValue = function (property) {
    var typography = (0, exports.useTypography)();
    return typography[property];
};
exports.useTypographyValue = useTypographyValue;
var useComponentVariant = function (componentName, variantName) {
    if (variantName === void 0) { variantName = 'default'; }
    var componentConfig = (0, exports.useComponentConfig)(componentName);
    return componentConfig[variantName] || {};
};
exports.useComponentVariant = useComponentVariant;
// Hook to access variables
var useVariables = function () {
    var projectData = (0, exports.useTheme)().projectData;
    return (projectData === null || projectData === void 0 ? void 0 : projectData.variables) || [];
};
exports.useVariables = useVariables;
// Hook to get a specific variable
var useVariable = function (name) {
    var variables = (0, exports.useVariables)();
    var variable = variables.find(function (v) { return v.name === name; });
    return variable === null || variable === void 0 ? void 0 : variable.value;
};
exports.useVariable = useVariable;
