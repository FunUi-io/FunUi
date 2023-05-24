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
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FunAdd": () => (/* binding */ FunAdd),
/* harmony export */   "FunClass": () => (/* binding */ FunClass),
/* harmony export */   "FunEvent": () => (/* binding */ FunEvent),
/* harmony export */   "FunGet": () => (/* binding */ FunGet),
/* harmony export */   "FunHide": () => (/* binding */ FunHide),
/* harmony export */   "FunRequest": () => (/* binding */ FunRequest),
/* harmony export */   "FunStyle": () => (/* binding */ FunStyle)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var FunHide = {
  hide: function hide(selector) {
    var element = document.querySelector(selector);
    element.style.display = "none";
  },
  show: function show(selector) {
    var element = document.querySelector(selector);
    element.style.display = "inline-block";
  },
  toggle: function toggle(selector) {
    var element = document.querySelector(selector);
    var style = element.style.display;
    if (style == "none") {
      element.style.display = "inline-block";
    } else {
      element.style.display = "none";
    }
  }
};
var FunGet = {
  text: function text(selector, data) {
    var element = document.querySelector(selector);
    if (typeof element != 'undefined' && element != null) {
      var text = element.textContent;
      if (data) {
        element.textContent = data;
      } else {
        return text ? text : '';
      }
    }
  },
  html: function html(selector, data) {
    var element = document.querySelector(selector);
    if (typeof element != 'undefined' && element != null) {
      var text = element.innerHTML;
      if (data) {
        element.innerHTML = data;
      } else {
        return text ? text : "";
      }
    }
  },
  val: function val(selector, data) {
    var element = document.querySelector(selector);
    if (typeof element != 'undefined' && element != null) {
      var text = element.value;
      if (data) {
        element.value = data;
      } else {
        return text;
      }
    }
  }
};
var FunStyle = {
  css: function css(selector, _css) {
    // Get the element you want to style
    var element = document.querySelector(selector);

    // Define multiple styles using JavaScript objects
    var styles = _css;

    // Apply the styles to the element
    Object.assign(element.style, styles);
  }
};
var FunEvent = {
  event: function event(selector, eventType, callBack) {
    var element = document.querySelector(selector);
    if (selector && eventType && callBack) {
      if (typeof element != 'undefined' && element != null) {
        document.querySelector(selector).addEventListener(eventType, callBack);
      }
    }
  }
};
var FunClass = {
  add: function add(selector, newClass) {
    var element = document.querySelector(selector);
    if (typeof element != 'undefined' && element != null && newClass) {
      element.classList.add(newClass);
    }
  },
  remove: function remove(selector, newClass) {
    var element = document.querySelector(selector);
    if (typeof element != 'undefined' && element != null && newClass) {
      element.classList.remove(newClass);
    }
  }
};
var FunAdd = {
  append: function append(selector, child) {
    var element = document.querySelector(selector);
    if (typeof element != 'undefined' && element != null && child) {
      element.append(child);
    }
  },
  prepend: function prepend(selector, child) {
    var element = document.querySelector(selector);
    if (typeof element != 'undefined' && element != null && child) {
      element.prepend(child);
    }
  }
};
var FunRequest = {
  get: function get(url, headers) {
    return new Promise(function (resolve, reject) {
      fetch(url, headers ? {
        headers: headers
      } : {}).then(function (response) {
        return response.json();
      }).then(function (data) {
        // Handle the received data
        resolve(data);
      })["catch"](function (error) {
        // Handle any errors that occur during the request
        reject(error);
      });
    });
  },
  post: function post(url, body, headers) {
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: 'POST',
        headers: headers ? _objectSpread(_objectSpread({}, headers), {}, {
          'Content-Type': 'application/json'
        }) : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        // Handle the received data
        resolve(data);
      })["catch"](function (error) {
        // Handle any errors that occur during the request
        reject(error);
      });
    });
  },
  patch: function patch(url, body, headers) {
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: 'PATCH',
        headers: headers ? _objectSpread(_objectSpread({}, headers), {}, {
          'Content-Type': 'application/json'
        }) : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        // Handle the received data
        resolve(data);
      })["catch"](function (error) {
        // Handle any errors that occur during the request
        reject(error);
      });
    });
  },
  "delete": function _delete(url, headers) {
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: 'DELETE',
        headers: headers ? headers : {}
      }).then(function (response) {
        if (response.ok) {
          resolve(); // Resolve with no data for successful DELETE requests
        } else {
          reject("Error: ".concat(response.status, " ").concat(response.statusText));
        }
      })["catch"](function (error) {
        // Handle any errors that occur during the request
        reject(error);
      });
    });
  }
};
module.exports = __webpack_exports__;
/******/ })()
;