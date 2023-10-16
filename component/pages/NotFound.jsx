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
  "default": () => (/* binding */ NotFound)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ../Funcss/Components/pages/NotFound.js

function NotFound() {
  return /*#__PURE__*/external_react_default().createElement("div", null, /*#__PURE__*/external_react_default().createElement("div", null, /*#__PURE__*/external_react_default().createElement("div", {
    className: "central",
    style: {
      minHeight: "100vh",
      width: "100%",
      padding: "4rem 0px"
    }
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: " text-center width-600-max"
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: "h5 light-warning round-edge"
  }, "404"), /*#__PURE__*/external_react_default().createElement("div", {
    style: {
      margin: "1.4rem 0px"
    }
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: "text-bigger text-secondary",
    style: {
      display: "block",
      transition: "all 0.2s linear 0s"
    }
  }, "Page Not Found")), /*#__PURE__*/external_react_default().createElement("div", {
    className: "article"
  }, "Sorry, we couldn't find the page you're looking for."), /*#__PURE__*/external_react_default().createElement("div", {
    style: {
      margin: "2rem 0px"
    }
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: "row-flex gap",
    style: {
      justifyContent: "center",
      gap: "0.4rem"
    }
  }, /*#__PURE__*/external_react_default().createElement("button", {
    className: "button primary roundBtn",
    onClick: function onClick() {
      return window.location.assign("/");
    }
  }, /*#__PURE__*/external_react_default().createElement("i", {
    className: "icon fas fa-home"
  }), "\xA0Back To Home \xA0")))))));
}
module.exports = __webpack_exports__;
/******/ })()
;