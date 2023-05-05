/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
  "default": () => (/* binding */ DarkMode)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
;// CONCATENATED MODULE: ../Funcss/Components/DarkMode.js

function DarkMode(state) {
  if (state) {
    var root = document.querySelector(':root');
    var bdColor = "#FFFFFFD9";
    var borderColor, raiseColor;
    borderColor = "#444654";
    raiseColor = "#1e1e1e";
    root.style.setProperty('--bd-theme', "#141414");
    root.style.setProperty('--bd-color', bdColor);
    root.style.setProperty('--borderColor', borderColor);
    root.style.setProperty('--raiseThemes', raiseColor);
    root.style.setProperty('--lighter', "#33333349");
    root.style.setProperty('--inputOutline', "#1e1e1e");
    root.style.setProperty('--lightThemeDark', bdColor);

    // dark theme for all the colors
    root.style.setProperty('--success', "#1d6640");
    root.style.setProperty('--successLight', " #c7e6c8");
    root.style.setProperty('--info', "#2471a3");
    root.style.setProperty('--infoLight', "#b3d9ed");
    root.style.setProperty('--warning', "#8c3d00");
    root.style.setProperty('--warningLight', "#d8b69c");
    root.style.setProperty('--danger', "#6b0600");
    root.style.setProperty('--dangerLight', "#bfbfbf");

    // root.style.setProperty('--info', "#2471a3"); 
    // root.style.setProperty('--infoLight', "#b3d9ed"); 

    root.style.setProperty('--light', "#c5d8e0");
    root.style.setProperty('--deepLight', "#154556");
  }
}
module.exports = __webpack_exports__;
/******/ })()
;