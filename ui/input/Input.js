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
exports.FileInput = exports.TextareaInput = exports.SelectInput = exports.TextInput = void 0;
var react_1 = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var Button_1 = __importDefault(require("../button/Button"));
// Utility function to generate CSS classes
var generateInputClasses = function (_a) {
    var status = _a.status, rounded = _a.rounded, bg = _a.bg, funcss = _a.funcss, flat = _a.flat, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, bordered = _a.bordered, borderless = _a.borderless, _b = _a.additionalClasses, additionalClasses = _b === void 0 ? '' : _b;
    var statusClass = status ? "".concat(status, "-input") : '';
    var roundedClass = rounded ? 'rounded' : '';
    var bgClass = bg || '';
    var flatClass = flat ? 'flat' : '';
    var cornerClass = leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '';
    var borderClass = bordered ? 'borderedInput' : borderless ? 'borderless' : '';
    return "\n    ".concat(statusClass, "\n    ").concat(roundedClass, "\n    ").concat(bgClass, "\n    ").concat(funcss || '', "\n    ").concat(flatClass, "\n    ").concat(cornerClass, "\n    ").concat(borderClass, "\n    ").concat(additionalClasses, "\n    input\n  ").trim().replace(/\s+/g, ' ');
};
// Text Input Component
var TextInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, _b = _a.type, type = _b === void 0 ? 'text' : _b, label = _a.label, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "type", "label"]);
    var className = generateInputClasses({
        status: status,
        rounded: rounded,
        bg: bg,
        funcss: funcss,
        flat: flat,
        leftRounded: leftRounded,
        rightRounded: rightRounded,
        bordered: bordered,
        borderless: borderless
    });
    var style = fullWidth ? { width: '100%' } : undefined;
    return (react_1.default.createElement("input", __assign({ id: id, name: name, className: className, onChange: onChange, defaultValue: defaultValue, type: type, placeholder: label, style: style, value: value }, rest)));
};
exports.TextInput = TextInput;
// Select Component
var SelectInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, _b = _a.options, options = _b === void 0 ? [] : _b, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "options"]);
    var className = generateInputClasses({
        status: status,
        rounded: rounded,
        bg: bg,
        funcss: funcss,
        flat: flat,
        leftRounded: leftRounded,
        rightRounded: rightRounded,
        bordered: bordered,
        borderless: borderless
    });
    var style = fullWidth ? { width: '100%' } : undefined;
    return (react_1.default.createElement("select", __assign({ id: id, name: name, className: className, onChange: onChange, defaultValue: defaultValue, value: value, style: style }, rest), options.map(function (option) { return (react_1.default.createElement("option", { key: option.value, value: option.value }, option.text)); })));
};
exports.SelectInput = SelectInput;
// Textarea Component
var TextareaInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, bordered = _a.bordered, borderless = _a.borderless, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, label = _a.label, _b = _a.rows, rows = _b === void 0 ? 2 : _b, rest = __rest(_a, ["id", "name", "value", "defaultValue", "onChange", "status", "funcss", "bg", "fullWidth", "flat", "bordered", "borderless", "rounded", "leftRounded", "rightRounded", "label", "rows"]);
    var className = generateInputClasses({
        status: status,
        rounded: rounded,
        bg: bg,
        funcss: funcss,
        flat: flat,
        leftRounded: leftRounded,
        rightRounded: rightRounded,
        bordered: bordered,
        borderless: borderless
    });
    var style = fullWidth ? { width: '100%' } : undefined;
    return (react_1.default.createElement("textarea", __assign({ id: id, name: name, className: className, onChange: onChange, defaultValue: defaultValue, placeholder: label, style: style, value: value, rows: rows }, rest)));
};
exports.TextareaInput = TextareaInput;
// File Input Component
var FileInput = function (_a) {
    var _b = _a.id, id = _b === void 0 ? 'fileInput' : _b, name = _a.name, onChange = _a.onChange, status = _a.status, funcss = _a.funcss, bg = _a.bg, fullWidth = _a.fullWidth, flat = _a.flat, rounded = _a.rounded, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, _c = _a.label, label = _c === void 0 ? 'Upload File' : _c, icon = _a.icon, extra = _a.extra, button = _a.button, btn = _a.btn, value = _a.value, rest = __rest(_a, ["id", "name", "onChange", "status", "funcss", "bg", "fullWidth", "flat", "rounded", "leftRounded", "rightRounded", "label", "icon", "extra", "button", "btn", "value"]);
    var _d = (0, react_1.useState)(''), fileName = _d[0], setFileName = _d[1];
    var handleChange = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setFileName(file.name);
        }
        if (onChange)
            onChange(e);
    };
    if (btn) {
        var className = generateInputClasses({
            status: status,
            rounded: rounded,
            bg: bg,
            funcss: funcss,
            flat: flat,
            leftRounded: leftRounded,
            rightRounded: rightRounded,
            bordered: true,
            borderless: false,
            additionalClasses: 'filedInput'
        });
        var style = fullWidth ? { width: '100%' } : undefined;
        return (react_1.default.createElement("div", { className: "fileInput" },
            button || (react_1.default.createElement(Button_1.default, { funcss: funcss, startIcon: icon || react_1.default.createElement(pi_1.PiCloudArrowUp, null), bg: "primary", fullWidth: true, raised: true }, fileName || label)),
            react_1.default.createElement("input", __assign({ id: id, name: name, className: className, onChange: handleChange, type: "file", style: style, value: value }, rest))));
    }
    return (react_1.default.createElement("div", { className: "_upload_container" },
        react_1.default.createElement("label", { htmlFor: id, className: "_upload_label" },
            react_1.default.createElement("div", { className: "_upload_icon" }, icon || react_1.default.createElement(pi_1.PiCloudArrowUp, null)),
            react_1.default.createElement("div", { className: "_upload_text", style: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'inline-block',
                    width: '100%',
                } }, fileName || label),
            extra && react_1.default.createElement("div", { className: "text-small opacity-3" }, extra)),
        react_1.default.createElement("input", __assign({ onChange: handleChange, type: "file", id: id, className: "_upload_input" }, rest))));
};
exports.FileInput = FileInput;
var Input = function (_a) {
    var select = _a.select, multiline = _a.multiline, file = _a.file, noBorder = _a.noBorder, props = __rest(_a, ["select", "multiline", "file", "noBorder"]);
    // Handle legacy noBorder prop
    var inputProps = __assign(__assign({}, props), { borderless: noBorder || props.borderless });
    if (select) {
        return react_1.default.createElement(exports.SelectInput, __assign({}, inputProps));
    }
    if (multiline) {
        return react_1.default.createElement(exports.TextareaInput, __assign({}, inputProps));
    }
    if (file) {
        return react_1.default.createElement(exports.FileInput, __assign({}, inputProps));
    }
    return react_1.default.createElement(exports.TextInput, __assign({}, inputProps));
};
exports.default = Input;
