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
  "default": () => (/* binding */ Modal)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ../Funcss/Components/Modal.js

function Modal(_ref) {
  var children = _ref.children,
    funcss = _ref.funcss,
    animation = _ref.animation,
    duration = _ref.duration,
    open = _ref.open,
    maxWidth = _ref.maxWidth,
    maxHeight = _ref.maxHeight,
    height = _ref.height,
    width = _ref.width,
    backdrop = _ref.backdrop;
  if (open) {
    return /*#__PURE__*/external_react_default().createElement("div", {
      className: "".concat(funcss, " modal ").concat(backdrop ? "backdrop" : "")
    }, /*#__PURE__*/external_react_default().createElement("div", {
      className: "modal-content",
      style: {
        animation: " ".concat(duration, "s ").concat(animation),
        maxWidth: maxWidth ? maxWidth : "",
        maxHeight: maxHeight ? maxHeight : "",
        width: width ? width : "",
        height: height ? height : ""
      }
    }, children));
  }
  {
    return /*#__PURE__*/external_react_default().createElement("div", null);
  }
}
module.exports = __webpack_exports__;
/******/ })()
;