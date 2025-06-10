"use strict";
'use client';
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
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var Button_1 = __importDefault(require("../button/Button"));
var Input = function (_a) {
    var select = _a.select, bordered = _a.bordered, borderless = _a.borderless, multiline = _a.multiline, file = _a.file, extra = _a.extra, noBorder = _a.noBorder, icon = _a.icon, btn = _a.btn, button = _a.button, id = _a.id, status = _a.status, funcss = _a.funcss, flat = _a.flat, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, rounded = _a.rounded, fullWidth = _a.fullWidth, type = _a.type, label = _a.label, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, options = _a.options, rows = _a.rows, bg = _a.bg, rest = __rest(_a, ["select", "bordered", "borderless", "multiline", "file", "extra", "noBorder", "icon", "btn", "button", "id", "status", "funcss", "flat", "leftRounded", "rightRounded", "rounded", "fullWidth", "type", "label", "name", "value", "defaultValue", "onChange", "options", "rows", "bg"]);
    var _b = (0, react_1.useState)(''), fileName = _b[0], setFileName = _b[1];
    var handleChange = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setFileName(file.name);
        }
        if (onChange)
            onChange(e);
    };
    if (select) {
        if (bordered) {
            return (react_1.default.createElement("select", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input \n            ").concat(rounded ? "rounded" : '', "\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n          "), onChange: onChange, defaultValue: defaultValue, name: name, style: {
                    width: "".concat(fullWidth ? '100%' : '')
                }, value: value }), options
                ? options.map(function (doc) { return (react_1.default.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                : ''));
        }
        else if (borderless) {
            return (react_1.default.createElement("select", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input \n            ").concat(rounded ? "rounded" : '', "\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderless\n          "), onChange: onChange, defaultValue: defaultValue, name: name, value: value, style: {
                    width: "".concat(fullWidth ? '100%' : '')
                } }), options
                ? options.map(function (doc) { return (react_1.default.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                : ''));
        }
        else {
            return (react_1.default.createElement("select", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input \n            ").concat(rounded ? "rounded" : '', "\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n          "), onChange: onChange, defaultValue: defaultValue, name: name, value: value, style: {
                    width: "".concat(fullWidth ? '100%' : '')
                } }), options
                ? options.map(function (doc) { return (react_1.default.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                : ''));
        }
    }
    else if (multiline) {
        if (bordered) {
            return (react_1.default.createElement("textarea", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input \n            ").concat(rounded ? "rounded" : '', "\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, style: {
                    width: "".concat(fullWidth ? '100%' : '')
                }, value: value, rows: rows ? rows : 2 })));
        }
        else if (borderless) {
            return (react_1.default.createElement("textarea", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input \n            ").concat(rounded ? "rounded" : '', "\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderless\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, value: value, style: {
                    width: "".concat(fullWidth ? '100%' : '')
                }, rows: rows ? rows : 2 })));
        }
        else {
            return (react_1.default.createElement("textarea", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input \n            ").concat(rounded ? "rounded" : '', "\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, value: value, style: {
                    width: "".concat(fullWidth ? '100%' : '')
                }, rows: rows ? rows : 2 })));
        }
    }
    else if (file) {
        if (btn)
            return (react_1.default.createElement("div", { className: "fileInput" },
                button ? (button) : (react_1.default.createElement(Button_1.default, { funcss: " ".concat(funcss, " "), startIcon: icon ? icon : react_1.default.createElement(pi_1.PiCloudArrowUp, null), bg: "primary", fullWidth: true, raised: true }, fileName || label || 'Upload File')),
                react_1.default.createElement("input", __assign({ name: name, id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input \n            ").concat(rounded ? "rounded" : '', "\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n            filedInput\n          "), onChange: handleChange, type: 'file', style: {
                        width: "".concat(fullWidth ? '100%' : '')
                    }, value: value }, rest))));
        return (react_1.default.createElement("div", { className: "_upload_container" },
            react_1.default.createElement("label", { htmlFor: id || "fileInput", className: "_upload_label" },
                react_1.default.createElement("div", { className: "_upload_icon" }, icon || react_1.default.createElement(react_1.default.Fragment, null, "\u21EA")),
                react_1.default.createElement("div", { className: "_upload_text", style: {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'inline-block',
                        width: '100%',
                    } }, fileName || label || "Upload File"),
                react_1.default.createElement("div", { className: "text-small opacity-3" }, extra || '')),
            react_1.default.createElement("input", __assign({ onChange: handleChange, type: "file", id: id || "fileInput", className: "_upload_input" }, rest))));
    }
    else {
        if (bordered) {
            return (react_1.default.createElement("input", __assign({ name: name, id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input \n            ").concat(rounded ? "rounded" : '', "\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n          "), onChange: onChange, defaultValue: defaultValue, type: type, placeholder: label, style: {
                    width: "".concat(fullWidth ? '100%' : '')
                }, value: value }, rest)));
        }
        else if (borderless) {
            return (react_1.default.createElement("input", __assign({ name: name, id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input \n            ").concat(rounded ? "rounded" : '', "\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderless\n          "), onChange: onChange, defaultValue: defaultValue, type: type, placeholder: label, value: value, style: {
                    width: "".concat(fullWidth ? '100%' : '')
                } }, rest)));
        }
        else {
            return (react_1.default.createElement("input", __assign({ name: name, id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input \n            ").concat(rounded ? "rounded" : '', "\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n          "), onChange: onChange, defaultValue: defaultValue, type: type, placeholder: label, value: value, style: {
                    width: "".concat(fullWidth ? '100%' : '')
                } }, rest)));
        }
    }
};
exports.default = Input;
