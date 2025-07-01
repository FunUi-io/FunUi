"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCssVariableValue = getCssVariableValue;
function getCssVariableValue(name) {
    // Convert name like "primary" into "--primary"
    var variableName = name.startsWith('--') ? name : "--".concat(name);
    // Get value from :root style
    var rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue(variableName).trim();
}
