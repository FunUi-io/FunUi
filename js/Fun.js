"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunQuery = exports.FunRequest = exports.FunAdd = exports.FunClass = exports.FunEvent = exports.FunStyle = exports.FunGet = exports.FunVisible = exports.FunHide = void 0;
exports.FunHide = {
    hide: function (selector) {
        var element = document.querySelector(selector);
        if (element) {
            element.style.display = "none";
        }
    },
    show: function (selector) {
        var element = document.querySelector(selector);
        if (element) {
            element.style.display = "inline-block";
        }
    },
    toggle: function (selector) {
        var element = document.querySelector(selector);
        if (element) {
            var style = element.style.display;
            element.style.display = style === "none" ? "inline-block" : "none";
        }
    }
};
exports.FunVisible = {
    hide: function (selector) {
        var element = document.querySelector(selector);
        if (element) {
            element.style.visibility = "hidden";
        }
    },
    show: function (selector) {
        var element = document.querySelector(selector);
        if (element) {
            element.style.visibility = "visible";
        }
    },
    toggle: function (selector) {
        var element = document.querySelector(selector);
        if (element) {
            var style = element.style.visibility;
            element.style.visibility = style === "hidden" ? "visible" : "hidden";
        }
    }
};
exports.FunGet = {
    text: function (selector, data) {
        var element = document.querySelector(selector);
        if (element) {
            var text = element.textContent;
            if (data) {
                element.textContent = data;
            }
            else {
                return text ? text : "";
            }
        }
    },
    html: function (selector, data) {
        var element = document.querySelector(selector);
        if (element) {
            var text = element.innerHTML;
            if (data) {
                element.innerHTML = data;
            }
            else {
                return text ? text : "";
            }
        }
    },
    val: function (selector, data) {
        var element = document.querySelector(selector);
        if (element) {
            var text = element.value;
            if (data !== undefined && data !== null) {
                element.value = data === '' ? '' : data;
            }
            else {
                return text;
            }
        }
    },
};
exports.FunStyle = {
    css: function (selector, css) {
        var element = document.querySelector(selector);
        if (element) {
            Object.assign(element.style, css);
        }
    },
};
exports.FunEvent = {
    event: function (selector, eventType, callBack) {
        var element = document.querySelector(selector);
        if (element && eventType && callBack) {
            element.addEventListener(eventType, callBack);
        }
    },
};
exports.FunClass = {
    add: function (selector, newClass) {
        var element = document.querySelector(selector);
        if (element && newClass) {
            element.classList.add(newClass);
        }
    },
    remove: function (selector, newClass) {
        var element = document.querySelector(selector);
        if (element && newClass) {
            element.classList.remove(newClass);
        }
    },
};
exports.FunAdd = {
    append: function (selector, child) {
        var element = document.querySelector(selector);
        if (element && child) {
            element.append(child);
        }
    },
    prepend: function (selector, child) {
        var element = document.querySelector(selector);
        if (element && child) {
            element.prepend(child);
        }
    },
};
exports.FunRequest = {
    get: function (url, headers) {
        return new Promise(function (resolve, reject) {
            fetch(url, headers ? { headers: headers } : {})
                .then(function (response) { return response.json(); })
                .then(function (data) {
                resolve(data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    },
    post: function (url, body, headers) {
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers: headers ? __assign(__assign({}, headers), { 'Content-Type': 'application/json' }) : { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                resolve(data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    },
    patch: function (url, body, headers) {
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'PATCH',
                headers: headers ? __assign(__assign({}, headers), { 'Content-Type': 'application/json' }) : { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                resolve(data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    },
    delete: function (url, headers) {
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'DELETE',
                headers: headers ? headers : {},
            })
                .then(function (response) {
                if (response.ok) {
                    resolve("");
                }
                else {
                    reject("Error: ".concat(response.status, " ").concat(response.statusText));
                }
            })
                .catch(function (error) {
                reject(error);
            });
        });
    },
};
exports.FunQuery = {
    query: function (data, fields) {
        return new Promise(function (resolve, reject) {
            if (Array.isArray(data)) {
                resolve(data.filter(function (item) { return applyFilter(item, fields); }));
            }
            else if (typeof data === 'object') {
                var filteredData = {};
                for (var key in data) {
                    if (applyFilter(data[key], fields)) {
                        filteredData[key] = data[key];
                    }
                }
                resolve(filteredData);
            }
            else {
                reject('Invalid data type. Expected an array or object.');
            }
            function applyFilter(item, fields) {
                if (typeof fields !== 'object') {
                    reject('Invalid filter criteria. Expected an object.');
                }
                for (var key in fields) {
                    if (item[key] !== fields[key]) {
                        return false;
                    }
                }
                return true;
            }
        });
    },
};
