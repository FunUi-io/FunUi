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
  "default": () => (/* binding */ Button)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ../Funcss/Components/Button.js

function Button(_ref) {
  var color = _ref.color,
    bg = _ref.bg,
    funcss = _ref.funcss,
    onChange = _ref.onChange,
    onClick = _ref.onClick,
    startIcon = _ref.startIcon,
    endIcon = _ref.endIcon,
    children = _ref.children,
    text = _ref.text,
    rounded = _ref.rounded,
    raised = _ref.raised,
    height = _ref.height,
    width = _ref.width,
    _float = _ref["float"],
    hoverUp = _ref.hoverUp,
    fullWidth = _ref.fullWidth,
    outlined = _ref.outlined;
  return /*#__PURE__*/external_react_default().createElement("button", {
    className: "button\ntext-".concat(color, "\n").concat(funcss, "\n").concat(rounded ? "roundBtn" : "", "\n").concat(_float ? "floatBtn" : "", "\n").concat(raised ? "card" : "", "\n").concat(hoverUp ? "hover-up" : "", "\n").concat(outlined ? "".concat(bg, "-outline outlined text-").concat(bg) : bg, "\n\n"),
    onClick: onClick,
    onChange: onChange,
    style: {
      height: height ? height : "",
      width: fullWidth ? "100%" : width ? width : ""
    }
  }, startIcon, " \xA0", text, children, " \xA0", endIcon);
}
module.exports = __webpack_exports__;
/******/ })()
;