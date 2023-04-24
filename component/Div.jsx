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
  "default": () => (/* binding */ Div)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ../Funcss/Components/Div.js

var Container = function Container(_ref) {
  var children = _ref.children,
    funcss = _ref.funcss,
    content = _ref.content,
    minHeight = _ref.minHeight,
    maxHeight = _ref.maxHeight,
    maxWidth = _ref.maxWidth,
    minWidth = _ref.minWidth,
    height = _ref.height,
    width = _ref.width,
    padding = _ref.padding,
    margin = _ref.margin,
    fit = _ref.fit;
  return /*#__PURE__*/external_react_default().createElement("div", {
    className: "".concat(fit ? "width-100-p height-100-p" : "", " ").concat(funcss),
    style: {
      height: height ? height : "",
      maxHeight: maxHeight ? maxHeight : "",
      minHeight: minHeight ? minHeight : "",
      maxWidth: maxWidth ? maxWidth : "",
      minWidth: minWidth ? minWidth : "",
      width: width ? width : "",
      padding: padding ? padding : "",
      margin: margin ? margin : ""
    }
  }, children, " ", content);
};
/* harmony default export */ const Div = (Container);
module.exports = __webpack_exports__;
/******/ })()
;