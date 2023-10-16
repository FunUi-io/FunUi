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
  "default": () => (/* binding */ Components_Card)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ../Funcss/Components/Card.js

var Card = function Card(_ref) {
  var color = _ref.color,
    bg = _ref.bg,
    width = _ref.width,
    height = _ref.height,
    minHeight = _ref.minHeight,
    minWidth = _ref.minWidth,
    margin = _ref.margin,
    padding = _ref.padding,
    funcss = _ref.funcss,
    children = _ref.children,
    roundEdge = _ref.roundEdge,
    maxHeight = _ref.maxHeight,
    maxWidth = _ref.maxWidth,
    horizontal = _ref.horizontal,
    id = _ref.id;
  return /*#__PURE__*/external_react_default().createElement("div", {
    id: id ? id : "",
    className: "card text-".concat(color, " ").concat(bg, " ").concat(funcss, " \n").concat(roundEdge ? "round-edge" : "", "  \n").concat(horizontal ? "horizontalCard" : ""),
    style: {
      width: "".concat(width ? width : ""),
      height: "".concat(height ? height : ""),
      minHeight: "".concat(minHeight ? minHeight : ""),
      minWidth: "".concat(minWidth ? minWidth : ""),
      maxHeight: maxHeight ? maxHeight : "",
      maxWidth: maxWidth ? maxWidth : "",
      margin: "".concat(margin ? margin : ""),
      padding: "".concat(padding ? padding : "")
    }
  }, children);
};
/* harmony default export */ const Components_Card = (Card);
module.exports = __webpack_exports__;
/******/ })()
;