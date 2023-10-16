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
  "default": () => (/* binding */ Typography)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ../Funcss/Components/Typography.js

function Typography(_ref) {
  var size = _ref.size,
    bg = _ref.bg,
    color = _ref.color,
    children = _ref.children,
    hoverBg = _ref.hoverBg,
    hoverText = _ref.hoverText,
    text = _ref.text,
    heading = _ref.heading,
    funcss = _ref.funcss,
    emp = _ref.emp,
    bold = _ref.bold,
    block = _ref.block,
    body = _ref.body,
    article = _ref.article,
    light = _ref.light,
    lighter = _ref.lighter,
    italic = _ref.italic,
    underline = _ref.underline,
    align = _ref.align,
    lineHeight = _ref.lineHeight,
    letterSpacing = _ref.letterSpacing,
    monospace = _ref.monospace,
    font = _ref.font;
  return /*#__PURE__*/external_react_default().createElement("span", {
    className: "\n".concat(size ? "text-".concat(size) : "", "\n").concat(color ? "text-".concat(color) : '', "\n").concat(align ? "text-".concat(align) : '', "\n").concat(block ? "block" : "", "\n").concat(monospace ? "monospace" : "", "\n").concat(bg ? bg : "", "\n").concat(hoverText ? "hover-text-".concat(hoverText) : '', "\n").concat(hoverBg ? "hover-".concat(hoverBg) : '', "\n").concat(light ? "lightText" : lighter ? "lighterText" : "", "\n").concat(heading ? heading : "", "\n").concat(italic ? "italicText" : "", "\n").concat(underline ? "underlineText" : "", "\n").concat(body ? "body" : "", "\n").concat(article ? "article" : "", "\n").concat(funcss, "\n").concat(emp ? "emp" : "", "\n").concat(bold ? "bold" : "", "\n"),
    style: {
      display: block ? "block" : "",
      fontWeight: "".concat(bold ? "bold" : ""),
      lineHeight: lineHeight ? lineHeight : "",
      letterSpacing: letterSpacing ? letterSpacing : "",
      fontFamily: font ? font : ""
    }
  }, children, text);
}
module.exports = __webpack_exports__;
/******/ })()
;