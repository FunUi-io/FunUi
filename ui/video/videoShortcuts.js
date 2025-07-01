"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleKeyDown = void 0;
// videoShortcuts.ts
var handleKeyDown = function (e, isPlaying, playVideo, pauseVideo) {
    if (e.key === ' ') {
        e.preventDefault();
        isPlaying ? pauseVideo() : playVideo();
    }
};
exports.handleKeyDown = handleKeyDown;
