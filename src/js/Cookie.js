"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cookie = function (name) {
    return {
        /**
         * Save a value as a cookie
         * @param value - Any JSON-serializable object
         * @param options - Expiration and cookie settings
         */
        save: function (value, options) {
            if (options === void 0) { options = {}; }
            return new Promise(function (resolve, reject) {
                try {
                    var stringValue = JSON.stringify(value);
                    var _a = options.duration, duration = _a === void 0 ? { days: 30 } : _a, _b = options.path, path = _b === void 0 ? '/' : _b, _c = options.secure, secure = _c === void 0 ? false : _c, _d = options.sameSite, sameSite = _d === void 0 ? 'Lax' : _d;
                    // Create expiration date
                    var expirationDate = new Date();
                    if (duration.years)
                        expirationDate.setFullYear(expirationDate.getFullYear() + duration.years);
                    if (duration.months)
                        expirationDate.setMonth(expirationDate.getMonth() + duration.months);
                    if (duration.days)
                        expirationDate.setDate(expirationDate.getDate() + duration.days);
                    // Build cookie string
                    var cookieString = "".concat(name, "=").concat(encodeURIComponent(stringValue), "; expires=").concat(expirationDate.toUTCString(), "; path=").concat(path, "; SameSite=").concat(sameSite);
                    if (secure)
                        cookieString += '; Secure';
                    document.cookie = cookieString;
                    resolve();
                }
                catch (error) {
                    reject({ status: 'error', message: error });
                }
            });
        },
        /**
         * Get and parse the cookie
         */
        get: function () {
            return new Promise(function (resolve, reject) {
                try {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i].trim();
                        if (cookie.startsWith(name + '=')) {
                            var value = decodeURIComponent(cookie.substring(name.length + 1));
                            return resolve(JSON.parse(value));
                        }
                    }
                    reject("".concat(name, " cookie not found or has expired."));
                }
                catch (error) {
                    reject({ status: 'error', message: error });
                }
            });
        },
        /**
         * Remove the cookie by setting its expiration to the past
         */
        remove: function () {
            return new Promise(function (resolve, reject) {
                try {
                    document.cookie = "".concat(name, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
                    resolve();
                }
                catch (error) {
                    reject({ status: 'error', message: error });
                }
            });
        },
    };
};
exports.default = Cookie;
