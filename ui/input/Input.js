"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var pi_1 = require("react-icons/pi");
var Button_1 = __importDefault(require("../button/Button"));
var Input = function (_a) {
    var select = _a.select, bordered = _a.bordered, bordereless = _a.bordereless, multiline = _a.multiline, file = _a.file, noBorder = _a.noBorder, icon = _a.icon, button = _a.button, id = _a.id, status = _a.status, funcss = _a.funcss, flat = _a.flat, leftRounded = _a.leftRounded, rightRounded = _a.rightRounded, rounded = _a.rounded, fullWidth = _a.fullWidth, type = _a.type, label = _a.label, name = _a.name, value = _a.value, defaultValue = _a.defaultValue, onChange = _a.onChange, options = _a.options, rows = _a.rows, bg = _a.bg;
    if (select) {
        if (bordered) {
            return (react_1.default.createElement("select", { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n          "), onChange: onChange, defaultValue: defaultValue, name: name, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, value: value }, options
                ? options.map(function (doc) { return (react_1.default.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                : ''));
        }
        else if (bordereless) {
            return (react_1.default.createElement("select", { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderless\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                } }, options
                ? options.map(function (doc) { return (react_1.default.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                : ''));
        }
        else {
            return (react_1.default.createElement("select", { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                } }, options
                ? options.map(function (doc) { return (react_1.default.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                : ''));
        }
    }
    else if (multiline) {
        if (bordered) {
            return (react_1.default.createElement("textarea", { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, value: value, rows: rows ? rows : 2 }));
        }
        else if (bordereless) {
            return (react_1.default.createElement("textarea", { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderless\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, rows: rows ? rows : 2 }));
        }
        else {
            return (react_1.default.createElement("textarea", { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n          "), onChange: onChange, defaultValue: defaultValue, placeholder: label, name: name, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, rows: rows ? rows : 2 }));
        }
    }
    else if (file) {
        return (react_1.default.createElement("div", { className: "fileInput" },
            button ? (button) : (react_1.default.createElement(Button_1.default, { funcss: " ".concat(funcss, " "), startIcon: icon ? icon : react_1.default.createElement(pi_1.PiCloudArrowUp, null), bg: "primary800", raised: true }, label ? label : 'Upload File')),
            react_1.default.createElement("input", { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n            filedInput\n          "), onChange: onChange, type: 'file', name: name, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, value: value })));
    }
    else {
        if (bordered) {
            return (react_1.default.createElement("input", { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderedInput\n          "), onChange: onChange, defaultValue: defaultValue, type: type, placeholder: label, name: name, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                }, value: value }));
        }
        else if (bordereless) {
            return (react_1.default.createElement("input", { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n            borderless\n          "), onChange: onChange, defaultValue: defaultValue, type: type, placeholder: label, name: name, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                } }));
        }
        else {
            return (react_1.default.createElement("input", { id: id, className: "\n            ".concat(status === 'success' ? 'success-input' : '', "\n            ").concat(status === 'warning' ? 'warning-input' : '', "\n            ").concat(status === 'danger' ? 'danger-input' : '', "\n            input\n            ").concat(bg ? bg : '', "\n            ").concat(funcss, " ").concat(flat ? 'flat' : '', "\n            ").concat(leftRounded ? 'leftRounded' : rightRounded ? 'rightRounded' : '', "\n          "), onChange: onChange, defaultValue: defaultValue, type: type, placeholder: label, name: name, value: value, style: {
                    borderRadius: "".concat(rounded ? '400rem' : ''),
                    width: "".concat(fullWidth ? '100%' : ''),
                } }));
        }
    }
};
exports.default = Input;
