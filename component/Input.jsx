/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Input)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ../Funcss/Components/Input.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Input = /*#__PURE__*/function (_Component) {
  _inherits(Input, _Component);
  var _super = _createSuper(Input);
  function Input() {
    _classCallCheck(this, Input);
    return _super.apply(this, arguments);
  }
  _createClass(Input, [{
    key: "render",
    value: function render() {
      if (this.props.select) {
        if (this.props.bordered) {
          return /*#__PURE__*/external_react_default().createElement("select", _extends({}, this.props.disabled ? "disabled" : "", {
            className: "\n        input\n        ".concat(this.props.funcss, "\n        bordered\n        "),
            onChange: this.props.onChange,
            defaultValue: this.props.defaultValue,
            type: this.props.type,
            name: this.props.name,
            style: {
              borderRadius: "".concat(this.props.rounded ? "400rem" : ""),
              width: "".concat(this.props.fullWidth ? "100%" : "")
            },
            value: this.props.value
          }), this.props.options ? this.props.options.map(function (doc) {
            return /*#__PURE__*/external_react_default().createElement("option", {
              value: doc.value,
              key: doc.value
            }, doc.text);
          }) : "");
        } else if (this.props.bordereless) {
          return /*#__PURE__*/external_react_default().createElement("select", _extends({}, this.props.disabled ? "disabled" : "", {
            className: "\n        input\n        ".concat(this.props.funcss, "\n        borderless\n        "),
            onChange: this.props.onChange,
            defaultValue: this.props.defaultValue,
            type: this.props.type,
            placeholder: this.props.label,
            name: this.props.name,
            value: this.props.value,
            style: {
              borderRadius: "".concat(this.props.rounded ? "400rem" : ""),
              width: "".concat(this.props.fullWidth ? "100%" : "")
            }
          }), this.props.options ? this.props.options.map(function (doc) {
            return /*#__PURE__*/external_react_default().createElement("option", {
              value: doc.value,
              key: doc.value
            }, doc.text);
          }) : "");
        } else {
          return /*#__PURE__*/external_react_default().createElement("select", _extends({}, this.props.disabled ? "disabled" : "", {
            className: "\n        input\n        ".concat(this.props.funcss, "\n        "),
            onChange: this.props.onChange,
            defaultValue: this.props.defaultValue,
            type: this.props.type,
            placeholder: this.props.label,
            name: this.props.name,
            value: this.props.value,
            style: {
              borderRadius: "".concat(this.props.rounded ? "400rem" : ""),
              width: "".concat(this.props.fullWidth ? "100%" : "")
            }
          }), this.props.options ? this.props.options.map(function (doc) {
            return /*#__PURE__*/external_react_default().createElement("option", {
              value: doc.value,
              key: doc.value
            }, doc.text);
          }) : "");
        }
      } else if (this.props.multiline) {
        if (this.props.bordered) {
          return /*#__PURE__*/external_react_default().createElement("textarea", _extends({}, this.props.disabled ? "disabled" : "", {
            className: "\n        input\n        ".concat(this.props.funcss, "\n        bordered\n        "),
            onChange: this.props.onChange,
            defaultValue: this.props.defaultValue,
            type: this.props.type,
            placeholder: this.props.label,
            name: this.props.name,
            style: {
              borderRadius: "".concat(this.props.rounded ? "400rem" : ""),
              width: "".concat(this.props.fullWidth ? "100%" : "")
            },
            value: this.props.value,
            rows: this.props.rows ? this.props.rows : 2
          }));
        } else if (this.props.bordereless) {
          return /*#__PURE__*/external_react_default().createElement("textarea", _extends({}, this.props.disabled ? "disabled" : "", {
            className: "\n        input\n        ".concat(this.props.funcss, "\n        borderless\n        "),
            onChange: this.props.onChange,
            defaultValue: this.props.defaultValue,
            type: this.props.type,
            placeholder: this.props.label,
            name: this.props.name,
            value: this.props.value,
            style: {
              borderRadius: "".concat(this.props.rounded ? "400rem" : ""),
              width: "".concat(this.props.fullWidth ? "100%" : "")
            },
            rows: this.props.rows ? this.props.rows : 2
          }));
        } else {
          return /*#__PURE__*/external_react_default().createElement("textarea", _extends({}, this.props.disabled ? "disabled" : "", {
            className: "\n        input\n        ".concat(this.props.funcss, "\n        "),
            onChange: this.props.onChange,
            defaultValue: this.props.defaultValue,
            type: this.props.type,
            placeholder: this.props.label,
            name: this.props.name,
            value: this.props.value,
            style: {
              borderRadius: "".concat(this.props.rounded ? "400rem" : ""),
              width: "".concat(this.props.fullWidth ? "100%" : "")
            },
            rows: this.props.rows ? this.props.rows : 2
          }));
        }
      } else {
        if (this.props.bordered) {
          return /*#__PURE__*/external_react_default().createElement("input", _extends({}, this.props.disabled ? "disabled" : "", {
            className: "\n        input\n        ".concat(this.props.funcss, "\n        bordered\n        "),
            onChange: this.props.onChange,
            defaultValue: this.props.defaultValue,
            type: this.props.type,
            placeholder: this.props.label,
            name: this.props.name,
            style: {
              borderRadius: "".concat(this.props.rounded ? "400rem" : ""),
              width: "".concat(this.props.fullWidth ? "100%" : "")
            },
            value: this.props.value
          }));
        } else if (this.props.bordereless) {
          return /*#__PURE__*/external_react_default().createElement("input", _extends({}, this.props.disabled ? "disabled" : "", {
            className: "\n        input\n        ".concat(this.props.funcss, "\n        borderless\n        "),
            onChange: this.props.onChange,
            defaultValue: this.props.defaultValue,
            type: this.props.type,
            placeholder: this.props.label,
            name: this.props.name,
            value: this.props.value,
            style: {
              borderRadius: "".concat(this.props.rounded ? "400rem" : ""),
              width: "".concat(this.props.fullWidth ? "100%" : "")
            }
          }));
        } else {
          return /*#__PURE__*/external_react_default().createElement("input", _extends({}, this.props.disabled ? "disabled" : "", {
            className: "\n        input\n        ".concat(this.props.funcss, "\n        "),
            onChange: this.props.onChange,
            defaultValue: this.props.defaultValue,
            type: this.props.type,
            placeholder: this.props.label,
            name: this.props.name,
            value: this.props.value,
            style: {
              borderRadius: "".concat(this.props.rounded ? "400rem" : ""),
              width: "".concat(this.props.fullWidth ? "100%" : "")
            }
          }));
        }
      }
    }
  }]);
  return Input;
}(external_react_namespaceObject.Component);

module.exports = __webpack_exports__;
/******/ })()
;