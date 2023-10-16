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
  "default": () => (/* binding */ Alert)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ../Funcss/Components/Alert.js

function Alert(_ref) {
  var message = _ref.message,
    funcss = _ref.funcss,
    type = _ref.type,
    outlined = _ref.outlined,
    fixed = _ref.fixed,
    fullWidth = _ref.fullWidth,
    isLoading = _ref.isLoading,
    children = _ref.children;
  return /*#__PURE__*/external_react_default().createElement("div", null, outlined ? /*#__PURE__*/external_react_default().createElement("div", {
    style: {
      animation: " ".concat(0.3, "s ", "ScaleUp")
    },
    className: "alert ".concat(type, "-outline\n ").concat(fixed == "top-left" ? "top-left" : "", "\n ").concat(fixed == "top-right" ? "top-right" : "", "\n ").concat(fixed == "bottom-left" ? "bottom-left" : "", "\n ").concat(fixed == "bottom-right" ? "bottom-right" : "", " \n ").concat(fixed == "top-middle" ? "top-middle" : "", " \n ").concat(fixed == "bottom-middle" ? "bottom-middle" : "", " \n ").concat(fullWidth ? "width-100-p" : "", "\n ")
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: "alert-icon"
  }, !isLoading ? /*#__PURE__*/external_react_default().createElement("div", null, type === "success" && /*#__PURE__*/external_react_default().createElement("i", {
    className: "fa fa-check"
  }), type === "info" && /*#__PURE__*/external_react_default().createElement("i", {
    className: "fa fa-info-circle"
  }), type === "warning" && /*#__PURE__*/external_react_default().createElement("i", {
    className: "fa fa-exclamation-triangle"
  }), type === "danger" && /*#__PURE__*/external_react_default().createElement("i", {
    className: "far fa-times-circle"
  })) : /*#__PURE__*/external_react_default().createElement("i", {
    className: "fas fa-spinner fa-spin"
  })), /*#__PURE__*/external_react_default().createElement("div", {
    className: "alert-text"
  }, message ? message : children ? children : "")) : "", !outlined ? /*#__PURE__*/external_react_default().createElement("div", {
    style: {
      animation: " ".concat(0.3, "s ", "ScaleUp")
    },
    className: "alert ".concat(funcss, " ").concat(type, "  \n").concat(fixed == "top-left" ? "top-left" : "", "\n ").concat(fixed == "top-right" ? "top-right" : "", "\n ").concat(fixed == "bottom-left" ? "bottom-left" : "", "\n ").concat(fixed == "bottom-right" ? "bottom-right" : "", " \n ").concat(fixed == "top-middle" ? "top-middle" : "", " \n ").concat(fixed == "bottom-middle" ? "bottom-middle" : "", " \n ").concat(fixed == "middle" ? "middle" : "", " \n ").concat(fullWidth ? "width-100-p" : "", "\n \n ")
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: "alert-icon"
  }, !isLoading ? /*#__PURE__*/external_react_default().createElement("div", null, type === "success" && /*#__PURE__*/external_react_default().createElement("i", {
    className: "fa fa-check"
  }), type === "info" && /*#__PURE__*/external_react_default().createElement("i", {
    className: "fa fa-info-circle"
  }), type === "warning" && /*#__PURE__*/external_react_default().createElement("i", {
    className: "fa fa-exclamation-triangle"
  }), type === "danger" && /*#__PURE__*/external_react_default().createElement("i", {
    className: "far fa-times-circle"
  })) : /*#__PURE__*/external_react_default().createElement("i", {
    className: "fas fa-spinner fa-spin"
  })), /*#__PURE__*/external_react_default().createElement("div", {
    className: "alert-text"
  }, message ? message : children ? children : "")) : "");
}
module.exports = __webpack_exports__;
/******/ })()
;