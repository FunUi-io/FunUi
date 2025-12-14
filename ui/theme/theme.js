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
exports.getPaginatedRecords = exports.useBucketCache = exports.useAllJsonRecords = exports.usePaginatedRecords = exports.useBucketJsonFiles = exports.useBucketsByCategory = exports.useBucket = exports.useBuckets = exports.useDocumentAssets = exports.useAudioAssets = exports.useVideoAssets = exports.useImageAssets = exports.useAssetsByType = exports.useAssetInfo = exports.useAssetType = exports.useAssetValue = exports.useAsset = exports.useAssets = exports.getAssetInfo = exports.getAssetType = exports.getAssetValue = exports.getAllAssets = exports.getAsset = exports.useVariable = exports.useVariables = exports.useComponentVariant = exports.useTypographyValue = exports.useColor = exports.useProjectData = exports.useThemeConfig = exports.useTypography = exports.useColors = exports.useComponentConfig = exports.useThemeValue = exports.getAllVariables = exports.getVariable = exports.useVariant = exports.useTheme = void 0;
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
    projectId: undefined,
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
/*                          ORIGIN VALIDATION                                 */
/* -------------------------------------------------------------------------- */
var getCurrentOrigin = function () {
    if (typeof window === 'undefined')
        return '';
    // For local development, return localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'localhost';
    }
    // For production, return the domain without protocol and www
    var domain = window.location.hostname;
    domain = domain.replace(/^www\./, '');
    return domain;
};
var validateOriginAccess = function (projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var currentOrigin, projectData, trustedDomains, hasAccess, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!projectId) {
                    console.error('❌ No project ID provided for origin validation');
                    return [2 /*return*/, false];
                }
                currentOrigin = getCurrentOrigin();
                console.log("\uD83D\uDD0D Validating origin access for: ".concat(currentOrigin));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, loadThemeFromCDN(projectId)];
            case 2:
                projectData = _a.sent();
                if (!projectData) {
                    console.error('❌ Project not found or inaccessible');
                    return [2 /*return*/, false];
                }
                trustedDomains = projectData.trustedDomains || [];
                hasAccess = trustedDomains.some(function (domain) {
                    var trustedDomain = domain.domain.toLowerCase();
                    var currentDomain = currentOrigin.toLowerCase();
                    // Exact match or subdomain match
                    return currentDomain === trustedDomain ||
                        currentDomain.endsWith('.' + trustedDomain) ||
                        (trustedDomain === 'localhost' && currentOrigin === 'localhost');
                });
                if (!hasAccess) {
                    console.error("\u274C Access denied: Origin \"".concat(currentOrigin, "\" is not in trusted domains"));
                    console.log('📋 Trusted domains:', trustedDomains.map(function (d) { return d.domain; }));
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, true];
            case 3:
                error_1 = _a.sent();
                console.error('❌ Error during origin validation:', error_1);
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
/* -------------------------------------------------------------------------- */
/*                          LOCAL FILE MANAGEMENT                             */
/* -------------------------------------------------------------------------- */
var loadLocalTheme = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, data, error_2;
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
                return [2 /*return*/, data];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log('ℹ️ No local theme file found');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, null];
        }
    });
}); };
/* -------------------------------------------------------------------------- */
/*                          CDN THEME LOADER                                  */
/* -------------------------------------------------------------------------- */
var loadThemeFromCDN = function (projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var publicUrl, response, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!projectId) {
                    console.error('❌ No project ID provided for CDN loading');
                    return [2 /*return*/, null];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                publicUrl = "https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/themes%2F".concat(projectId, ".json?alt=media");
                return [4 /*yield*/, fetch(publicUrl, {
                        cache: 'no-cache',
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                return [2 /*return*/, data];
            case 4:
                console.error('❌ Firebase Storage fetch failed:', response.status, response.statusText);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                console.error('❌ Error loading from Firebase Storage:', error_3);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, null];
        }
    });
}); };
/* -------------------------------------------------------------------------- */
/*                          BUCKET JSON LOADER                                */
/* -------------------------------------------------------------------------- */
var loadBucketJsonFromCDN = function (bucketSanitizedName, projectId, page) { return __awaiter(void 0, void 0, void 0, function () {
    var pageNumber, publicUrl, response, data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!bucketSanitizedName || !projectId) {
                    console.error('❌ Missing parameters for JSON loading');
                    return [2 /*return*/, null];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                pageNumber = page.toString();
                publicUrl = "https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/projects%2F".concat(projectId, "%2Fbuckets%2F").concat(bucketSanitizedName, "%2F").concat(pageNumber, ".json?alt=media");
                return [4 /*yield*/, fetch(publicUrl, {
                        cache: 'no-cache',
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                console.log(data);
                return [2 /*return*/, data];
            case 4: 
            // File might not exist (e.g., page out of range)
            return [2 /*return*/, null];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                console.error("\u274C Error loading JSON file for page ".concat(page, ":"), error_4);
                return [2 /*return*/, null];
            case 7: return [2 /*return*/];
        }
    });
}); };
var listBucketJsonFiles = function (bucketSanitizedName, projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var files, page, hasMoreFiles, paddedPage, publicUrl, response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!bucketSanitizedName || !projectId) {
                    console.error('❌ Missing parameters for listing JSON files');
                    return [2 /*return*/, []];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                files = [];
                page = 1;
                hasMoreFiles = true;
                _a.label = 2;
            case 2:
                if (!(hasMoreFiles && page <= 100)) return [3 /*break*/, 4];
                paddedPage = page.toString().padStart(3, '0');
                publicUrl = "https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/projects%2F".concat(projectId, "%2Fbuckets%2F").concat(bucketSanitizedName, "%2Fpage_").concat(paddedPage, ".json?alt=media");
                return [4 /*yield*/, fetch(publicUrl, {
                        method: 'HEAD',
                        cache: 'no-cache',
                    })];
            case 3:
                response = _a.sent();
                if (response.ok) {
                    files.push({
                        name: "page_".concat(paddedPage, ".json"),
                        fullPath: "projects/".concat(projectId, "/buckets/").concat(bucketSanitizedName, "/page_").concat(paddedPage, ".json"),
                        url: publicUrl,
                        size: parseInt(response.headers.get('content-length') || '0', 10),
                        page: page
                    });
                    page++;
                }
                else {
                    hasMoreFiles = false;
                }
                return [3 /*break*/, 2];
            case 4: return [2 /*return*/, files];
            case 5:
                error_5 = _a.sent();
                console.error('❌ Error listing JSON files:', error_5);
                return [2 /*return*/, []];
            case 6: return [2 /*return*/];
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
/*                          BUCKET UTILITIES                                  */
/* -------------------------------------------------------------------------- */
// Cache for buckets and JSON files
var cachedBuckets = [];
var cachedJsonFiles = {};
var cachedJsonData = {};
var sanitizeBucketName = function (name) {
    return name
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_-]/g, '')
        .toLowerCase();
};
var transformProjectBucket = function (bucket, projectId) {
    return {
        id: bucket.id || bucket._id || '',
        // projectId: bucket.projectId || projectId || '',
        name: bucket.name || '',
        displayName: bucket.displayName || bucket.name || '',
        category: bucket.category || 'uncategorized',
        fields: Array.isArray(bucket.fields) ? bucket.fields : [],
        createdBy: bucket.createdBy || bucket.userId || '',
        createdAt: typeof bucket.createdAt === 'number' ? bucket.createdAt : Date.now(),
        updatedAt: typeof bucket.updatedAt === 'number' ? bucket.updatedAt : Date.now(),
        updatedBy: bucket.updatedBy || bucket.createdBy || '',
        recordCount: bucket.recordCount || 0,
        jsonFilesCount: bucket.jsonFilesCount || 0,
        totalRecordsInJson: bucket.totalRecordsInJson || 0,
        lastJsonExport: bucket.lastJsonExport,
        userId: bucket.userId,
        createdAtString: bucket.createdAt,
        updatedAtString: bucket.updatedAt
    };
};
/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */
var ThemeProvider = function (_a) {
    var theme = _a.theme, children = _a.children, _b = _a.funcss, funcss = _b === void 0 ? '' : _b, _c = _a.minHeight, minHeight = _c === void 0 ? '100vh' : _c, projectId = _a.projectId, providedProject = _a.project;
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
    /* ---------------------- Theme Loading Logic ----------------------- */
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined') {
            setIsLoading(false);
            setIsInitialLoad(false);
            return;
        }
        var root = document.documentElement;
        var pollTimer;
        var loadTheme = function () { return __awaiter(void 0, void 0, void 0, function () {
            var finalTheme, finalVersion, localTheme, localVersion, hasAccess, cdnTheme, cdnVersion, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, 10, 11]);
                        finalTheme = null;
                        finalVersion = null;
                        if (!providedProject) return [3 /*break*/, 1];
                        console.log('✅ Using provided project data directly');
                        finalTheme = providedProject;
                        finalVersion = providedProject.version || 0;
                        return [3 /*break*/, 8];
                    case 1: return [4 /*yield*/, loadLocalTheme()];
                    case 2:
                        localTheme = _a.sent();
                        localVersion = (localTheme === null || localTheme === void 0 ? void 0 : localTheme.version) || 0;
                        if (!projectId) return [3 /*break*/, 7];
                        return [4 /*yield*/, validateOriginAccess(projectId)];
                    case 3:
                        hasAccess = _a.sent();
                        if (!hasAccess) return [3 /*break*/, 5];
                        return [4 /*yield*/, loadThemeFromCDN(projectId)];
                    case 4:
                        cdnTheme = _a.sent();
                        cdnVersion = (cdnTheme === null || cdnTheme === void 0 ? void 0 : cdnTheme.version) || 0;
                        if (cdnTheme) {
                            // CDN theme available - use it
                            finalTheme = cdnTheme;
                            finalVersion = cdnVersion;
                            if (cdnVersion !== localVersion) {
                                console.log("\uD83D\uDD04 Version mismatch: Local(".concat(localVersion, ") vs CDN(").concat(cdnVersion, ")"));
                                console.log('ℹ️ Using CDN version. Please update your local funui.json file manually.');
                            }
                        }
                        else if (localTheme) {
                            // CDN not available but we have local theme
                            console.log('⚠️ CDN unavailable, using local theme');
                            finalTheme = localTheme;
                            finalVersion = localVersion;
                        }
                        else {
                            // No theme available anywhere
                            console.warn('⚠️ No theme found (CDN unavailable and no local theme)');
                            setError('Theme not found');
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        // Origin validation failed
                        if (localTheme) {
                            console.log('⚠️ Origin validation failed, using local theme');
                            finalTheme = localTheme;
                            finalVersion = localVersion;
                        }
                        else {
                            console.error('❌ Origin validation failed and no local theme available');
                            setError('Access denied and no local theme available');
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        // No project ID provided - only use local theme
                        console.log('ℹ️ No project ID provided, using local theme only');
                        if (localTheme) {
                            finalTheme = localTheme;
                            finalVersion = localVersion;
                            console.log('✅ Theme loaded from local file');
                        }
                        else {
                            console.log('ℹ️ No local theme file found - using base theme only');
                            // No error here - it's valid to use only base theme
                        }
                        _a.label = 8;
                    case 8:
                        // Apply the theme if we have one
                        if (finalTheme && (!currentVersion || finalVersion !== currentVersion)) {
                            applyThemeData(finalTheme, root);
                            setCurrentVersion(finalVersion);
                            setError(null);
                        }
                        else if (finalTheme) {
                            console.log('✓ Theme up to date');
                        }
                        return [3 /*break*/, 11];
                    case 9:
                        err_1 = _a.sent();
                        console.error('❌ Error loading theme:', err_1);
                        setError('Failed to load theme');
                        return [3 /*break*/, 11];
                    case 10:
                        setIsLoading(false);
                        setIsInitialLoad(false);
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        // Initial load
        loadTheme();
        // Only poll for updates if we have a project ID AND no provided project
        if (projectId && !providedProject) {
            pollTimer = setInterval(function () {
                loadTheme();
            }, 5 * 60 * 1000);
        }
        return function () {
            if (pollTimer) {
                clearInterval(pollTimer);
            }
        };
    }, [projectId, currentVersion, theme, providedProject]); // Added providedProject to dependencies
    var applyThemeData = function (data, root) {
        var _a;
        var themeConfig = (_a = data.theme_config) !== null && _a !== void 0 ? _a : {};
        var newVariant = data.default_variation || 'standard';
        setVariant(newVariant);
        setThemeConfig(themeConfig);
        setProjectData(data);
        // Cache for variable access
        cachedProjectData = data;
        // Cache for asset access
        cachedAssets = data.assets || [];
        // Cache for bucket access
        var projectBuckets = data.buckets || [];
        cachedBuckets = projectBuckets.map(function (bucket) {
            return transformProjectBucket(bucket, data.project_id || '');
        });
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
        projectId: projectId,
    }); }, [variant, themeConfig, projectData, isLoading, isInitialLoad, error, projectId]);
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
var cachedAssets = [];
var getAsset = function (name) {
    if (!cachedAssets.length) {
        console.warn('No assets available. Make sure ThemeProvider is mounted and assets are loaded.');
        return undefined;
    }
    var asset = cachedAssets.find(function (a) { return a.name === name; });
    return asset;
};
exports.getAsset = getAsset;
var getAllAssets = function () {
    return cachedAssets;
};
exports.getAllAssets = getAllAssets;
var getAssetValue = function (name) {
    var asset = (0, exports.getAsset)(name);
    return asset === null || asset === void 0 ? void 0 : asset.url;
};
exports.getAssetValue = getAssetValue;
var getAssetType = function (name) {
    var asset = (0, exports.getAsset)(name);
    return asset === null || asset === void 0 ? void 0 : asset.file_type;
};
exports.getAssetType = getAssetType;
var getAssetInfo = function (name) {
    var asset = (0, exports.getAsset)(name);
    if (!asset)
        return undefined;
    return {
        value: asset.url,
        type: asset.file_type,
        name: asset.name
    };
};
exports.getAssetInfo = getAssetInfo;
// Hook to access all assets
var useAssets = function () {
    var projectData = (0, exports.useTheme)().projectData;
    return (projectData === null || projectData === void 0 ? void 0 : projectData.assets) || [];
};
exports.useAssets = useAssets;
// Hook to get a specific asset
var useAsset = function (name) {
    var assets = (0, exports.useAssets)();
    var asset = assets.find(function (a) { return a.name === name; });
    return asset;
};
exports.useAsset = useAsset;
// Hook to get asset URL (most common use case)
var useAssetValue = function (name) {
    var asset = (0, exports.useAsset)(name);
    return asset === null || asset === void 0 ? void 0 : asset.url;
};
exports.useAssetValue = useAssetValue;
// Hook to get asset type
var useAssetType = function (name) {
    var asset = (0, exports.useAsset)(name);
    return asset === null || asset === void 0 ? void 0 : asset.file_type;
};
exports.useAssetType = useAssetType;
// Hook to get complete asset info
var useAssetInfo = function (name) {
    var asset = (0, exports.useAsset)(name);
    if (!asset)
        return undefined;
    return {
        value: asset.url,
        type: asset.file_type,
        name: asset.name
    };
};
exports.useAssetInfo = useAssetInfo;
// Hook to filter assets by type
var useAssetsByType = function (type) {
    var assets = (0, exports.useAssets)();
    return assets.filter(function (asset) { return asset.file_type === type; });
};
exports.useAssetsByType = useAssetsByType;
// Hook to get image assets
var useImageAssets = function () {
    return (0, exports.useAssetsByType)('image');
};
exports.useImageAssets = useImageAssets;
// Hook to get video assets
var useVideoAssets = function () {
    return (0, exports.useAssetsByType)('video');
};
exports.useVideoAssets = useVideoAssets;
// Hook to get audio assets
var useAudioAssets = function () {
    return (0, exports.useAssetsByType)('audio');
};
exports.useAudioAssets = useAudioAssets;
// Hook to get document assets
var useDocumentAssets = function () {
    return (0, exports.useAssetsByType)('document');
};
exports.useDocumentAssets = useDocumentAssets;
/* -------------------------------------------------------------------------- */
/*                              BUCKET HOOKS                                  */
/* -------------------------------------------------------------------------- */
// Helper function to get bucket
var getBucketFromCache = function (bucketIdOrName) {
    if (!cachedBuckets.length) {
        console.warn('No buckets available. Make sure ThemeProvider is mounted.');
        return undefined;
    }
    return cachedBuckets.find(function (b) {
        var _a;
        return b.id === bucketIdOrName ||
            b.name.toLowerCase() === bucketIdOrName.toLowerCase() ||
            ((_a = b.displayName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === bucketIdOrName.toLowerCase();
    });
};
// Hook to access all buckets
var useBuckets = function () {
    var projectData = (0, exports.useTheme)().projectData;
    var _a = (0, react_1.useState)([]), buckets = _a[0], setBuckets = _a[1];
    (0, react_1.useEffect)(function () {
        if (projectData === null || projectData === void 0 ? void 0 : projectData.buckets) {
            var transformedBuckets = projectData.buckets.map(function (bucket) {
                return transformProjectBucket(bucket, projectData.project_id || '');
            });
            setBuckets(transformedBuckets);
            cachedBuckets = transformedBuckets;
        }
        else {
            setBuckets([]);
        }
    }, [projectData]);
    return buckets;
};
exports.useBuckets = useBuckets;
// Hook to get a specific bucket
var useBucket = function (bucketIdOrName) {
    var buckets = (0, exports.useBuckets)();
    return buckets.find(function (b) {
        var _a;
        return b.id === bucketIdOrName ||
            b.name.toLowerCase() === bucketIdOrName.toLowerCase() ||
            ((_a = b.displayName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === bucketIdOrName.toLowerCase();
    });
};
exports.useBucket = useBucket;
// Hook to get buckets by category
var useBucketsByCategory = function (category) {
    var buckets = (0, exports.useBuckets)();
    if (category === 'all' || category === 'uncategorized') {
        return buckets.filter(function (b) { return !b.category || b.category === 'uncategorized'; });
    }
    return buckets.filter(function (b) { return b.category === category; });
};
exports.useBucketsByCategory = useBucketsByCategory;
// Hook to get bucket JSON files
var useBucketJsonFiles = function (bucketIdOrName) {
    var _a = (0, react_1.useState)([]), files = _a[0], setFiles = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var bucket = (0, exports.useBucket)(bucketIdOrName);
    var projectId = (0, exports.useTheme)().projectId;
    var loadFiles = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var bucketSanitizedName, jsonFiles, cacheKey, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!bucket || !projectId) {
                        setFiles([]);
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    setError(null);
                    bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name);
                    return [4 /*yield*/, listBucketJsonFiles(bucketSanitizedName, projectId)];
                case 2:
                    jsonFiles = _a.sent();
                    setFiles(jsonFiles);
                    cacheKey = "".concat(bucket.id, "_").concat(projectId);
                    cachedJsonFiles[cacheKey] = jsonFiles;
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    console.error('Error loading JSON files:', err_2);
                    setError(err_2 instanceof Error ? err_2.message : 'Failed to load JSON files');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [bucket, projectId]);
    (0, react_1.useEffect)(function () {
        loadFiles();
    }, [loadFiles]);
    return {
        files: files,
        loading: loading,
        error: error,
        refresh: loadFiles
    };
};
exports.useBucketJsonFiles = useBucketJsonFiles;
// Hook to get paginated records (YOU ONLY NEED TO PASS PAGE NUMBER!)
var usePaginatedRecords = function (bucketIdOrName, page, pageSize) {
    var _a = (0, react_1.useState)([]), records = _a[0], setRecords = _a[1];
    var _b = (0, react_1.useState)(null), metadata = _b[0], setMetadata = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var bucket = (0, exports.useBucket)(bucketIdOrName);
    var projectId = (0, exports.useTheme)().projectId;
    var loadRecords = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var bucketSanitizedName, jsonData, recordsToSet, cacheKey, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!bucket || !projectId) {
                        setRecords([]);
                        setMetadata(null);
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    setError(null);
                    bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name);
                    return [4 /*yield*/, loadBucketJsonFromCDN(bucketSanitizedName, projectId, page)];
                case 2:
                    jsonData = _a.sent();
                    if (jsonData) {
                        recordsToSet = jsonData.records || [];
                        // If pageSize is specified, limit the records
                        if (pageSize && recordsToSet.length > pageSize) {
                            recordsToSet = recordsToSet.slice(0, pageSize);
                        }
                        setRecords(recordsToSet);
                        setMetadata(jsonData.metadata);
                        cacheKey = "".concat(bucket.id, "_").concat(projectId);
                        if (!cachedJsonData[cacheKey]) {
                            cachedJsonData[cacheKey] = {};
                        }
                        cachedJsonData[cacheKey][page] = jsonData;
                    }
                    else {
                        setRecords([]);
                        setMetadata(null);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_3 = _a.sent();
                    console.error("Error loading records for page ".concat(page, ":"), err_3);
                    setError(err_3 instanceof Error ? err_3.message : 'Failed to load records');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [bucket, projectId, page, pageSize]);
    (0, react_1.useEffect)(function () {
        loadRecords();
    }, [loadRecords]);
    return {
        records: records,
        metadata: metadata,
        loading: loading,
        error: error,
        refresh: loadRecords
    };
};
exports.usePaginatedRecords = usePaginatedRecords;
// Hook to get all records from JSON files
var useAllJsonRecords = function (bucketIdOrName) {
    var _a = (0, react_1.useState)([]), records = _a[0], setRecords = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var bucket = (0, exports.useBucket)(bucketIdOrName);
    var projectId = (0, exports.useTheme)().projectId;
    var _d = (0, exports.useBucketJsonFiles)(bucketIdOrName), files = _d.files, filesLoading = _d.loading;
    var loadAllRecords = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var allRecords, _i, files_1, file, bucketSanitizedName, jsonData, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!bucket || !projectId || filesLoading) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    setLoading(true);
                    setError(null);
                    allRecords = [];
                    _i = 0, files_1 = files;
                    _a.label = 2;
                case 2:
                    if (!(_i < files_1.length)) return [3 /*break*/, 5];
                    file = files_1[_i];
                    bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name);
                    return [4 /*yield*/, loadBucketJsonFromCDN(bucketSanitizedName, projectId, file.page)];
                case 3:
                    jsonData = _a.sent();
                    if (jsonData && jsonData.records) {
                        allRecords.push.apply(allRecords, jsonData.records);
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    setRecords(allRecords);
                    return [3 /*break*/, 8];
                case 6:
                    err_4 = _a.sent();
                    console.error('Error loading all records:', err_4);
                    setError(err_4 instanceof Error ? err_4.message : 'Failed to load records');
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); }, [bucket, projectId, files, filesLoading]);
    (0, react_1.useEffect)(function () {
        if (!filesLoading) {
            loadAllRecords();
        }
    }, [loadAllRecords, filesLoading]);
    return {
        records: records,
        loading: loading || filesLoading,
        error: error,
        refresh: loadAllRecords
    };
};
exports.useAllJsonRecords = useAllJsonRecords;
// Hook for cache management
var useBucketCache = function () {
    var clearCache = (0, react_1.useCallback)(function (bucketIdOrName) {
        if (bucketIdOrName) {
            var bucket = getBucketFromCache(bucketIdOrName);
            if (bucket) {
                var projectId = (0, react_1.useContext)(ThemeContext).projectId;
                if (projectId) {
                    var cacheKey = "".concat(bucket.id, "_").concat(projectId);
                    delete cachedJsonFiles[cacheKey];
                    delete cachedJsonData[cacheKey];
                }
            }
        }
        else {
            cachedJsonFiles = {};
            cachedJsonData = {};
        }
    }, []);
    var refresh = (0, react_1.useCallback)(function () {
        // This will be handled by the ThemeProvider when project data changes
        console.log('Buckets will refresh when project data updates');
    }, []);
    return {
        clearCache: clearCache,
        refresh: refresh
    };
};
exports.useBucketCache = useBucketCache;
// Helper function to get bucket records (for non-hook usage)
var getPaginatedRecords = function (bucketIdOrName, page, pageSize) { return __awaiter(void 0, void 0, void 0, function () {
    var bucket, projectId, bucketSanitizedName, jsonData, records;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bucket = getBucketFromCache(bucketIdOrName);
                if (!bucket) {
                    throw new Error("Bucket not found: ".concat(bucketIdOrName));
                }
                projectId = (0, react_1.useContext)(ThemeContext).projectId;
                if (!projectId) {
                    throw new Error('Project ID not available');
                }
                bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name);
                return [4 /*yield*/, loadBucketJsonFromCDN(bucketSanitizedName, projectId, page)];
            case 1:
                jsonData = _a.sent();
                if (!jsonData) {
                    return [2 /*return*/, { records: [], metadata: null }];
                }
                records = jsonData.records || [];
                if (pageSize && records.length > pageSize) {
                    records = records.slice(0, pageSize);
                }
                return [2 /*return*/, {
                        records: records,
                        metadata: jsonData.metadata
                    }];
        }
    });
}); };
exports.getPaginatedRecords = getPaginatedRecords;
