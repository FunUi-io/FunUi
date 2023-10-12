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
var react_1 = __importDefault(require("react"));
var pi_1 = require("react-icons/pi");
var Button_1 = __importDefault(require("../button/Button"));
var Input = function (_a) {
    var select = _a.select, bordered = _a.bordered, bordereless = _a.bordereless, multiline = _a.multiline, file = _a.file, noBorder = _a.noBorder, icon = _a.icon, button = _a.button, id = _a.id, status = _a.status, funcss = _a.funcss, flat = _a.flat, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, rounded = _a.rounded, fullWidth = _a.fullWidth, type = _a.type, label = _a.label, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, options = _a.options, rows = _a.rows, bg = _a.bg, rest = __rest(_a, ["select", "bordered", "bordereless", "multiline", "file", "noBorder", "icon", "button", "id", "status", "funcss", "flat", "leftRounded", "rightRounded", "rounded", "fullWidth", "type", "label", "name", "value", "defaultValue", "onChange", "options", "rows", "bg"]);
    if (select) {
        if (bordered) {
            return (react_1.default.createElement("select", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n          "), onChange: onChange, defaultValue: defaultValue, name: name, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, value: value }), options
                ? options.map(function (doc) { return (react_1.default.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                : ''));
        }
        else if (bordereless) {
            return (react_1.default.createElement("select", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderless\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                } }), options
                ? options.map(function (doc) { return (react_1.default.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                : ''));
        }
        else {
            return (react_1.default.createElement("select", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                } }), options
                ? options.map(function (doc) { return (react_1.default.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                : ''));
        }
    }
    else if (multiline) {
        if (bordered) {
            return (react_1.default.createElement("textarea", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, value: value, rows: rows ? rows : 2 })));
        }
        else if (bordereless) {
            return (react_1.default.createElement("textarea", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderless\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, rows: rows ? rows : 2 })));
        }
        else {
            return (react_1.default.createElement("textarea", __assign({}, rest, { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, rows: rows ? rows : 2 })));
        }
    }
    else if (file) {
        return (react_1.default.createElement("div", { className: "fileInput" },
            button ? (button) : (react_1.default.createElement(Button_1.default, { funcss: " ".concat(funcss, " "), startIcon: icon ? icon : react_1.default.createElement(pi_1.PiCloudArrowUp, null), bg: "primary800", fullWidth: true, raised: true }, label ? label : 'Upload File')),
            react_1.default.createElement("input", __assign({}, rest, { name: name, id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n            filedInput\n          "), onChange: onChange, type: 'file', style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, value: value }))));
    }
    else {
        if (bordered) {
            return (react_1.default.createElement("input", __assign({}, rest, { name: name, id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n          "), onChange: onChange, defaultValue: defaultValue, type: type, placeholder: label, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, value: value })));
        }
        else if (bordereless) {
            return (react_1.default.createElement("input", __assign({}, rest, { name: name, id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderless\n          "), onChange: onChange, defaultValue: defaultValue, type: type, placeholder: label, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                } })));
        }
        else {
            return (react_1.default.createElement("input", __assign({}, rest, { name: name, id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n          "), onChange: onChange, defaultValue: defaultValue, type: type, placeholder: label, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                } })));
        }
    }
};
exports.default = Input;
