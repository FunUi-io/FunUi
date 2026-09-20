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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var Button_1 = __importDefault(require("../button/Button"));
var Text_1 = __importDefault(require("../text/Text"));
var FileUpload = function (_a) {
    var _b = _a.id, id = _b === void 0 ? 'fileInput' : _b, name = _a.name, onChange = _a.onChange, onDrop = _a.onDrop, status = _a.status, _c = _a.label, label = _c === void 0 ? 'Upload File' : _c, helperText = _a.helperText, icon = _a.icon, extra = _a.extra, button = _a.button, btn = _a.btn, value = _a.value, _d = _a.fullWidth, fullWidth = _d === void 0 ? true : _d, accept = _a.accept, multiple = _a.multiple, rest = __rest(_a, ["id", "name", "onChange", "onDrop", "status", "label", "helperText", "icon", "extra", "button", "btn", "value", "fullWidth", "accept", "multiple"]);
    var _e = (0, react_1.useState)([]), fileNames = _e[0], setFileNames = _e[1];
    var _f = (0, react_1.useState)(false), isDragging = _f[0], setIsDragging = _f[1];
    var _g = (0, react_1.useState)(false), isDragOver = _g[0], setIsDragOver = _g[1];
    var inputRef = (0, react_1.useRef)(null);
    var handleChange = function (e) {
        var files = e.target.files;
        if (files && files.length > 0) {
            // Store all file names
            var names = Array.from(files).map(function (file) { return file.name; });
            setFileNames(names);
        }
        else {
            setFileNames([]);
        }
        if (onChange)
            onChange(e);
    };
    var handleDragEnter = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        setIsDragOver(true);
    };
    var handleDragLeave = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragging(false);
        }
    };
    var handleDragOver = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setIsDragOver(false);
        var files = e.dataTransfer.files;
        if (files && files.length > 0) {
            var names = Array.from(files).map(function (file) { return file.name; });
            setFileNames(names);
            // Update the input element's files
            if (inputRef.current) {
                var dataTransfer = new DataTransfer();
                for (var i = 0; i < files.length; i++) {
                    dataTransfer.items.add(files[i]);
                }
                inputRef.current.files = dataTransfer.files;
                // Trigger onChange if provided
                if (onChange) {
                    var event_1 = {
                        target: inputRef.current,
                        currentTarget: inputRef.current,
                    };
                    onChange(event_1);
                }
            }
            if (onDrop) {
                onDrop(files);
            }
        }
    };
    var handleClick = function () {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    // Enhanced drag and drop styles
    var getContainerStyles = function () {
        var baseStyles = {
            border: '0.17rem dashed var(--borderColor)',
            borderRadius: '16px',
            padding: 'var(--space-5)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            margin: 'auto',
            color: 'var(--text-color)',
            position: 'relative',
        };
        if (isDragOver) {
            return __assign(__assign({}, baseStyles), { borderColor: 'var(--primary)', backgroundColor: 'var(--lighter)', transform: 'scale(1.02)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' });
        }
        if (isDragging) {
            return __assign(__assign({}, baseStyles), { borderColor: 'var(--primary600)', backgroundColor: 'var(--lighter)' });
        }
        return baseStyles;
    };
    var getButtonStyles = function () {
        if (isDragOver) {
            return {
                opacity: 0.8,
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease',
                backgroundColor: 'var(--primary600)',
            };
        }
        return {};
    };
    // Render file info when files are selected
    var renderFileInfo = function () {
        if (fileNames.length === 0)
            return null;
        return (react_1.default.createElement("div", { className: "file-info", style: {
                marginTop: 'var(--space-3)',
                padding: 'var(--space-3)',
                backgroundColor: 'var(--light)',
                borderRadius: '8px',
                border: '1px solid var(--borderColor)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                alignItems: 'center'
            } },
            react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 'var(--space-2)' } },
                react_1.default.createElement(pi_1.PiFiles, { style: { color: 'var(--primary)', fontSize: '1.2rem' } }),
                react_1.default.createElement(Text_1.default, { text: "".concat(fileNames.length, " file").concat(fileNames.length !== 1 ? 's' : '', " selected"), truncate: 1, block: true, size: 'sm', bold: true })),
            fileNames.length > 0 && (react_1.default.createElement("div", { style: {
                    maxHeight: '100px',
                    overflowY: 'auto',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0 var(--space-2)'
                } }, fileNames.map(function (name, index) { return (react_1.default.createElement("div", { key: index, style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-1) 0',
                    borderBottom: index < fileNames.length - 1 ? '1px solid var(--borderColor)' : 'none'
                } },
                react_1.default.createElement(pi_1.PiFile, { style: { color: 'var(--secondary)', fontSize: '0.9rem' } }),
                react_1.default.createElement(Text_1.default, { text: name, truncate: 1, block: true, size: 'xs', color: 'secondary' }))); })))));
    };
    // Get display text based on number of files
    var getDisplayText = function () {
        if (isDragOver)
            return 'Drop files to upload';
        if (fileNames.length === 0)
            return label;
        if (fileNames.length === 1)
            return fileNames[0];
        return "".concat(fileNames.length, " files selected");
    };
    if (btn) {
        return (react_1.default.createElement("div", { className: "fileInput", style: {
                width: fullWidth ? '100%' : 'fit-content',
                position: 'relative'
            } },
            button || (react_1.default.createElement("div", { onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, onClick: handleClick, style: { position: 'relative' } },
                react_1.default.createElement(Button_1.default, { startIcon: icon || react_1.default.createElement(pi_1.PiCloudArrowUp, null), bg: isDragOver ? "primary600" : "primary", fullWidth: fullWidth, raised: true, style: getButtonStyles() }, isDragOver ? 'Drop files here' : getDisplayText()))),
            react_1.default.createElement("input", __assign({ ref: inputRef, id: id, name: name, onChange: handleChange, type: "file", accept: accept, multiple: multiple, className: "filedInput", style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 1
                } }, rest)),
            renderFileInfo(),
            helperText && (react_1.default.createElement("div", { className: "input-helper-text ".concat(status ? "helper-".concat(status) : ''), style: { marginTop: 'var(--space-3)' } },
                react_1.default.createElement("span", null, helperText)))));
    }
    return (react_1.default.createElement("div", { className: "_upload_container", style: getContainerStyles(), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, onClick: handleClick },
        react_1.default.createElement("div", { className: "_upload_label" },
            react_1.default.createElement("div", { className: "_upload_icon", style: {
                    fontSize: '2.4rem',
                    color: isDragOver ? 'var(--primary600)' : 'var(--primary)',
                    marginBottom: '0.5rem',
                    transition: 'color 0.3s ease',
                    transform: isDragOver ? 'translateY(-2px)' : 'none'
                } }, icon || react_1.default.createElement(pi_1.PiCloudArrowUp, null)),
            react_1.default.createElement("div", { className: "_upload_text fit" },
                react_1.default.createElement(Text_1.default, { text: isDragOver ? 'Drop files to upload' : getDisplayText(), truncate: 1, block: true, style: {
                        color: isDragOver ? 'var(--primary600)' : 'var(--text-color)',
                        fontWeight: isDragOver ? '600' : '400'
                    } })),
            isDragOver && (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'var(--primary)',
                    opacity: 0.1,
                    borderRadius: '14px',
                    pointerEvents: 'none'
                } })),
            !fileNames.length && !isDragOver && (react_1.default.createElement("div", { style: {
                    marginTop: 'var(--space-3)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    opacity: 0.7
                } }, multiple ? 'Click or drag multiple files to upload' : 'Click or drag a file to upload')),
            extra && react_1.default.createElement("div", { className: "text-small opacity-3", style: { marginTop: 'var(--space-2)' } }, extra)),
        react_1.default.createElement("input", __assign({ ref: inputRef, onChange: handleChange, type: "file", id: id, name: name, className: "_upload_input", accept: accept, multiple: multiple, style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
                zIndex: 1
            } }, rest)),
        renderFileInfo(),
        helperText && (react_1.default.createElement("div", { className: "input-helper-text ".concat(status ? "helper-".concat(status) : ''), style: { marginTop: 'var(--space-3)' } },
            react_1.default.createElement("span", null, helperText)))));
};
exports.FileUpload = FileUpload;
exports.default = exports.FileUpload;
