"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBufferedPercent = exports.formatTime = void 0;
var formatTime = function (time) {
    if (isNaN(time))
        return '00:00';
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return "".concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0'));
};
exports.formatTime = formatTime;
var getBufferedPercent = function (videoRef, duration) {
    var video = videoRef.current;
    if (!video || video.buffered.length === 0)
        return 0;
    var end = video.buffered.end(video.buffered.length - 1);
    return (end / duration) * 100;
};
exports.getBufferedPercent = getBufferedPercent;
