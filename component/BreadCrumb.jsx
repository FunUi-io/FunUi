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
  "default": () => (/* binding */ BreadCrumb)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ../Funcss/Components/Icon.js

function Icon(_ref) {
  var funcss = _ref.funcss,
    color = _ref.color,
    size = _ref.size,
    onClick = _ref.onClick,
    onChange = _ref.onChange,
    icon = _ref.icon;
  return /*#__PURE__*/external_react_default().createElement("i", {
    className: "icon ".concat(icon, " ").concat(funcss, " text-").concat(color, " size-").concat(size, " "),
    onClick: onClick,
    onChange: onChange
  });
}
;// CONCATENATED MODULE: ../Funcss/Components/BreadCrumb.js


function BreadCrumb(_ref) {
  var type = _ref.type,
    funcss = _ref.funcss;
  return /*#__PURE__*/external_react_default().createElement("span", null, type === "slash" && /*#__PURE__*/external_react_default().createElement("span", {
    style: {
      margin: "0 0.2rem"
    },
    className: " ".concat(funcss)
  }, " / "), type === "greater" && /*#__PURE__*/external_react_default().createElement("span", {
    style: {
      margin: "0 0.2rem"
    },
    className: " ".concat(funcss)
  }, " ", /*#__PURE__*/external_react_default().createElement(Icon, {
    icon: "fas fa-angle-right"
  }), " "), type === "less" && /*#__PURE__*/external_react_default().createElement("span", {
    style: {
      margin: "0 0.2rem"
    },
    className: " ".concat(funcss)
  }, " ", /*#__PURE__*/external_react_default().createElement(Icon, {
    icon: "fas fa-angle-left"
  }), " "), type === "straight" && /*#__PURE__*/external_react_default().createElement("span", {
    style: {
      margin: "0 0.2rem"
    },
    className: " ".concat(funcss)
  }, " ", "|", " "));
}
module.exports = __webpack_exports__;
/******/ })()
;