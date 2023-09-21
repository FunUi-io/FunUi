"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var pi_1 = require("react-icons/pi");
var Button_1 = __importDefault(require("../button/Button"));
;
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Input.prototype.render = function () {
        if (this.props.select) {
            if (this.props.bordered) {
                return (React.createElement("select", { id: this.props.id, className: "\n              ".concat(this.props.status === 'success' ? 'success-input' : '', "\n              ").concat(this.props.status === 'warning' ? 'warning-input' : '', "\n              ").concat(this.props.status === 'danger' ? 'danger-input' : '', "\n              input\n              ").concat(this.props.bg ? this.props.bg : '', "\n              ").concat(this.props.funcss, " ").concat(this.props.flat ? 'flat' : '', "\n              ").concat(this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : '', "\n              borderedInput\n            "), onChange: this.props.onChange, defaultValue: this.props.defaultValue, name: this.props.name, style: {
                        borderRadius: "".concat(this.props.rounded ? '400rem' : ''),
                        width: "".concat(this.props.fullWidth ? '100%' : ''),
                    }, value: this.props.value }, this.props.options
                    ? this.props.options.map(function (doc) { return (React.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                    : ''));
            }
            else if (this.props.bordereless) {
                return (React.createElement("select", { id: this.props.id, className: "\n              ".concat(this.props.status === 'success' ? 'success-input' : '', "\n              ").concat(this.props.status === 'warning' ? 'warning-input' : '', "\n              ").concat(this.props.status === 'danger' ? 'danger-input' : '', "\n              input\n              ").concat(this.props.bg ? this.props.bg : '', "\n              ").concat(this.props.funcss, " ").concat(this.props.flat ? 'flat' : '', "\n              ").concat(this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : '', "\n              borderless\n            "), onChange: this.props.onChange, defaultValue: this.props.defaultValue, placeholder: this.props.label, name: this.props.name, value: this.props.value, style: {
                        borderRadius: "".concat(this.props.rounded ? '400rem' : ''),
                        width: "".concat(this.props.fullWidth ? '100%' : ''),
                    } }, this.props.options
                    ? this.props.options.map(function (doc) { return (React.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                    : ''));
            }
            else {
                return (React.createElement("select", { id: this.props.id, className: "\n              ".concat(this.props.status === 'success' ? 'success-input' : '', "\n              ").concat(this.props.status === 'warning' ? 'warning-input' : '', "\n              ").concat(this.props.status === 'danger' ? 'danger-input' : '', "\n              input\n              ").concat(this.props.bg ? this.props.bg : '', "\n              ").concat(this.props.funcss, " ").concat(this.props.flat ? 'flat' : '', "\n              ").concat(this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : '', "\n            "), onChange: this.props.onChange, defaultValue: this.props.defaultValue, placeholder: this.props.label, name: this.props.name, value: this.props.value, style: {
                        borderRadius: "".concat(this.props.rounded ? '400rem' : ''),
                        width: "".concat(this.props.fullWidth ? '100%' : ''),
                    } }, this.props.options
                    ? this.props.options.map(function (doc) { return (React.createElement("option", { value: doc.value, key: doc.value }, doc.text)); })
                    : ''));
            }
        }
        else if (this.props.multiline) {
            if (this.props.bordered) {
                return (React.createElement("textarea", { id: this.props.id, className: "\n              ".concat(this.props.status === 'success' ? 'success-input' : '', "\n              ").concat(this.props.status === 'warning' ? 'warning-input' : '', "\n              ").concat(this.props.status === 'danger' ? 'danger-input' : '', "\n              input\n              ").concat(this.props.bg ? this.props.bg : '', "\n              ").concat(this.props.funcss, " ").concat(this.props.flat ? 'flat' : '', "\n              ").concat(this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : '', "\n              borderedInput\n            "), onChange: this.props.onChange, defaultValue: this.props.defaultValue, placeholder: this.props.label, name: this.props.name, style: {
                        borderRadius: "".concat(this.props.rounded ? '400rem' : ''),
                        width: "".concat(this.props.fullWidth ? '100%' : ''),
                    }, value: this.props.value, rows: this.props.rows ? this.props.rows : 2 }));
            }
            else if (this.props.bordereless) {
                return (React.createElement("textarea", { id: this.props.id, className: "\n              ".concat(this.props.status === 'success' ? 'success-input' : '', "\n              ").concat(this.props.status === 'warning' ? 'warning-input' : '', "\n              ").concat(this.props.status === 'danger' ? 'danger-input' : '', "\n              input\n              ").concat(this.props.bg ? this.props.bg : '', "\n              ").concat(this.props.funcss, " ").concat(this.props.flat ? 'flat' : '', "\n              ").concat(this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : '', "\n              borderless\n            "), onChange: this.props.onChange, defaultValue: this.props.defaultValue, placeholder: this.props.label, name: this.props.name, value: this.props.value, style: {
                        borderRadius: "".concat(this.props.rounded ? '400rem' : ''),
                        width: "".concat(this.props.fullWidth ? '100%' : ''),
                    }, rows: this.props.rows ? this.props.rows : 2 }));
            }
            else {
                return (React.createElement("textarea", { id: this.props.id, className: "\n              ".concat(this.props.status === 'success' ? 'success-input' : '', "\n              ").concat(this.props.status === 'warning' ? 'warning-input' : '', "\n              ").concat(this.props.status === 'danger' ? 'danger-input' : '', "\n              input\n              ").concat(this.props.bg ? this.props.bg : '', "\n              ").concat(this.props.funcss, " ").concat(this.props.flat ? 'flat' : '', "\n              ").concat(this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : '', "\n            "), onChange: this.props.onChange, defaultValue: this.props.defaultValue, placeholder: this.props.label, name: this.props.name, value: this.props.value, style: {
                        borderRadius: "".concat(this.props.rounded ? '400rem' : ''),
                        width: "".concat(this.props.fullWidth ? '100%' : ''),
                    }, rows: this.props.rows ? this.props.rows : 2 }));
            }
        }
        else if (this.props.file) {
            return (React.createElement("div", { className: "fileInput" },
                this.props.button ? (this.props.button) : (React.createElement(Button_1.default, { funcss: " ".concat(this.props.funcss, " "), startIcon: this.props.icon ? this.props.icon : React.createElement(pi_1.PiCloudArrowUp, null), bg: 'primary800', raised: true }, this.props.label ? this.props.label : 'Upload File')),
                React.createElement("input", { id: this.props.id, className: "\n                ".concat(this.props.status === 'success' ? 'success-input' : '', "\n                ").concat(this.props.status === 'warning' ? 'warning-input' : '', "\n                ").concat(this.props.status === 'danger' ? 'danger-input' : '', "\n                input\n                ").concat(this.props.bg ? this.props.bg : '', "\n                ").concat(this.props.funcss, " ").concat(this.props.flat ? 'flat' : '', "\n                ").concat(this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : '', "\n                borderedInput\n                filedInput\n              "), onChange: this.props.onChange, type: 'file', name: this.props.name, style: {
                        borderRadius: "".concat(this.props.rounded ? '400rem' : ''),
                        width: "".concat(this.props.fullWidth ? '100%' : ''),
                    }, value: this.props.value })));
        }
        else {
            if (this.props.bordered) {
                return (React.createElement("input", { id: this.props.id, className: "\n              ".concat(this.props.status === 'success' ? 'success-input' : '', "\n              ").concat(this.props.status === 'warning' ? 'warning-input' : '', "\n              ").concat(this.props.status === 'danger' ? 'danger-input' : '', "\n              input\n              ").concat(this.props.bg ? this.props.bg : '', "\n              ").concat(this.props.funcss, " ").concat(this.props.flat ? 'flat' : '', "\n              ").concat(this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : '', "\n              borderedInput\n            "), onChange: this.props.onChange, defaultValue: this.props.defaultValue, type: this.props.type, placeholder: this.props.label, name: this.props.name, style: {
                        borderRadius: "".concat(this.props.rounded ? '400rem' : ''),
                        width: "".concat(this.props.fullWidth ? '100%' : ''),
                    }, value: this.props.value }));
            }
            else if (this.props.bordereless) {
                return (React.createElement("input", { id: this.props.id, className: "\n              ".concat(this.props.status === 'success' ? 'success-input' : '', "\n              ").concat(this.props.status === 'warning' ? 'warning-input' : '', "\n              ").concat(this.props.status === 'danger' ? 'danger-input' : '', "\n              input\n              ").concat(this.props.bg ? this.props.bg : '', "\n              ").concat(this.props.funcss, " ").concat(this.props.flat ? 'flat' : '', "\n              ").concat(this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : '', "\n              borderless\n            "), onChange: this.props.onChange, defaultValue: this.props.defaultValue, type: this.props.type, placeholder: this.props.label, name: this.props.name, value: this.props.value, style: {
                        borderRadius: "".concat(this.props.rounded ? '400rem' : ''),
                        width: "".concat(this.props.fullWidth ? '100%' : ''),
                    } }));
            }
            else {
                return (React.createElement("input", { id: this.props.id, className: "\n              ".concat(this.props.status === 'success' ? 'success-input' : '', "\n              ").concat(this.props.status === 'warning' ? 'warning-input' : '', "\n              ").concat(this.props.status === 'danger' ? 'danger-input' : '', "\n              input\n              ").concat(this.props.bg ? this.props.bg : '', "\n              ").concat(this.props.funcss, " ").concat(this.props.flat ? 'flat' : '', "\n              ").concat(this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : '', "\n            "), onChange: this.props.onChange, defaultValue: this.props.defaultValue, type: this.props.type, placeholder: this.props.label, name: this.props.name, value: this.props.value, style: {
                        borderRadius: "".concat(this.props.rounded ? '400rem' : ''),
                        width: "".concat(this.props.fullWidth ? '100%' : ''),
                    } }));
            }
        }
    };
    return Input;
}(React.Component));
exports.default = Input;
