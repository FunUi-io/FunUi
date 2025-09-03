"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DarkMode;
function DarkMode(_a) {
    var state = _a.state;
    if (state) {
        var root = document.querySelector(':root'); // Properly declare the type of root
        var bdColor = "#FFFFFFD9";
        var borderColor = void 0;
        var raiseColor = void 0;
        borderColor = "#444654";
        raiseColor = "#1e1e1e";
        root.style.setProperty('--bd-theme', "#141414");
        root.style.setProperty('--bd-color', bdColor);
        root.style.setProperty('--borderColor', borderColor);
        root.style.setProperty('--raiseThemes', raiseColor);
        root.style.setProperty('--lighter', "#33333349");
        root.style.setProperty('--inputOutline', "#1e1e1e");
        root.style.setProperty('--lightThemeDark', bdColor);
        // Dark theme for all the colors
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
