"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleKeyDown = void 0;
// videoShortcuts.ts
var handleKeyDown = function (e, isPlaying, playVideo, pauseVideo, spacebarPlay) {
    if (e.key === ' ' && spacebarPlay) {
        e.preventDefault();
        isPlaying ? pauseVideo() : playVideo();
    }
};
exports.handleKeyDown = handleKeyDown;
