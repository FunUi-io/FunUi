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
  "default": () => (/* binding */ Components_Snackbar)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ../Funcss/Components/Snackbar.js

var Snackbar = function Snackbar(_ref) {
  var message = _ref.message,
    close = _ref.close,
    open = _ref.open,
    position = _ref.position,
    funcss = _ref.funcss,
    animation = _ref.animation,
    duration = _ref.duration;
  if (open) {
    return /*#__PURE__*/external_react_default().createElement("div", null, /*#__PURE__*/external_react_default().createElement("div", {
      className: "snackbar ".concat(position, " ").concat(funcss),
      style: {
        animation: " ".concat(duration, "s ").concat(animation)
      }
    }, /*#__PURE__*/external_react_default().createElement("div", {
      className: "snackbar-content"
    }, /*#__PURE__*/external_react_default().createElement("div", {
      className: "snackbar-body"
    }, message), /*#__PURE__*/external_react_default().createElement("div", null, /*#__PURE__*/external_react_default().createElement("span", {
      className: "close-snackbar"
    }, /*#__PURE__*/external_react_default().createElement("span", null, close))))));
  } else {
    /*#__PURE__*/external_react_default().createElement("div", null);
  }
};
/* harmony default export */ const Components_Snackbar = (Snackbar);
module.exports = __webpack_exports__;
/******/ })()
;