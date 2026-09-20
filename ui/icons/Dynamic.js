'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var getDynamicIcon_1 = require("../../utils/getDynamicIcon");
var DynamicIcon = function (_a) {
    var iconName = _a.iconName, size = _a.size, color = _a.color, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.funcss, funcss = _c === void 0 ? '' : _c, _d = _a.style, style = _d === void 0 ? {} : _d, rest = __rest(_a, ["iconName", "size", "color", "className", "funcss", "style"]);
    var _e = (0, react_1.useState)(null), IconComponent = _e[0], setIconComponent = _e[1];
    var _f = (0, react_1.useState)(false), isLoading = _f[0], setIsLoading = _f[1];
    (0, react_1.useEffect)(function () {
        var loadIcon = function () { return __awaiter(void 0, void 0, void 0, function () {
            var Icon, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!iconName || typeof iconName !== 'string') {
                            setIconComponent(null);
                            setIsLoading(false);
                            return [2 /*return*/];
                        }
                        setIsLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, (0, getDynamicIcon_1.getDynamicIcon)(iconName)];
                    case 2:
                        Icon = _a.sent();
                        setIconComponent(Icon);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Failed to load icon \"".concat(iconName, "\":"), error_1);
                        setIconComponent(null);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        loadIcon();
    }, [iconName]);
    // Helper function to handle React elements
    var handleReactElement = function (element) {
        var _a, _b;
        var combinedClassName = "dynamic-icon ".concat(funcss, " ").concat(className, " ").concat(((_a = element.props) === null || _a === void 0 ? void 0 : _a.className) || '').trim();
        var combinedStyle = __assign(__assign(__assign(__assign({}, (((_b = element.props) === null || _b === void 0 ? void 0 : _b.style) || {})), style), (size && { fontSize: typeof size === 'number' ? "".concat(size, "px") : size })), (color && { color: color }));
        var mergedProps = __assign(__assign(__assign({}, element.props), rest), { className: combinedClassName, style: combinedStyle });
        return react_1.default.cloneElement(element, mergedProps);
    };
    // If no icon is provided
    if (!iconName)
        return null;
    // Handle React elements
    if (react_1.default.isValidElement(iconName)) {
        return handleReactElement(iconName);
    }
    // Handle string icons
    if (typeof iconName === 'string') {
        // Loading or error state
        if (isLoading || !IconComponent) {
            return (react_1.default.createElement("span", { className: "dynamic-icon-placeholder ".concat(funcss, " ").concat(className).trim(), style: __assign(__assign({}, style), { display: 'inline-block', width: size ? (typeof size === 'number' ? "".concat(size, "px") : size) : '1em', height: size ? (typeof size === 'number' ? "".concat(size, "px") : size) : '1em' }), "aria-label": isLoading ? 'Loading icon' : 'Icon not found' }));
        }
        var combinedClassName = "dynamic-icon ".concat(funcss, " ").concat(className).trim();
        var combinedStyle = __assign(__assign(__assign({}, style), (size && { fontSize: typeof size === 'number' ? "".concat(size, "px") : size })), (color && { color: color }));
        return react_1.default.createElement(IconComponent, __assign({ className: combinedClassName, style: combinedStyle }, rest));
    }
    // Handle other React nodes (fallback)
    return iconName;
};
exports.default = DynamicIcon;
