"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCssVariableValue = getCssVariableValue;
function getCssVariableValue(name) {
    if (typeof window === 'undefined' || typeof getComputedStyle === 'undefined') {
        return ''; // or throw an error / return a fallback
    }
    var variableName = name.startsWith('--') ? name : "--".concat(name);
    var rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue(variableName).trim();
}
