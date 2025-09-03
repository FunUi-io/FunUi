"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTouchDevice = isTouchDevice;
function isTouchDevice() {
    // Check for touch events
    var hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // Check for typical mobile user agents
    var isMobileAgent = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
    return hasTouchSupport && isMobileAgent;
}
