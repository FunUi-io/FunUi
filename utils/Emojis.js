"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllEmojis = exports.EmojiAminal = exports.EmojiPeople = exports.EmojiTravel = exports.EmojiSymbol = exports.EmojiGesture = exports.EmojiSmiley = void 0;
var EmojiSmiley = function () {
    return [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚',
        '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔',
        '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🥵', '🥶', '😵', '🥴', '😕', '😟', '🙁', '☹️', '😲', '😯', '😳',
        '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠',
        '🤬', '😈', '👿', '💀', '☠️', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖'
    ];
};
exports.EmojiSmiley = EmojiSmiley;
var EmojiGesture = function () {
    return [
        '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🫰', '🫵', '🫱', '🫲', '🤟', '🤘', '🤙', '👈', '👉', '👆',
        '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🙏', '💪', '🦾', '🦿', '🦵', '🦶'
    ];
};
exports.EmojiGesture = EmojiGesture;
var EmojiSymbol = function () {
    return [
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟',
        '💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💣', '💬', '👁️‍🗨️', '🗨️', '🗯️', '💭', '🌀', '🔔', '🔕', '🎵', '🎶',
        '🎼', '🔥', '⭐', '🌟', '✨', '⚡', '💡', '🎉', '🎊', '🎈', '🎁', '🎀'
    ];
};
exports.EmojiSymbol = EmojiSymbol;
var EmojiTravel = function () {
    return [
        '🚀', '🚁', '✈️', '🛩️', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🛻', '🚜', '🛴', '🚲',
        '🛵', '🏍️', '🛺', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚟', '🚠', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆',
        '🛫', '🛬', '🛰️', '💺', '🛶', '⛵', '🚤', '🛳️', '⛴️', '🚢'
    ];
};
exports.EmojiTravel = EmojiTravel;
var EmojiPeople = function () {
    return [
        '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '👩', '🧓', '👴', '👵', '🙍', '🙎', '🙅', '🙆', '💁', '🙋', '🧏', '🙇', '🤦',
        '🤷', '🧑‍⚕️', '👨‍⚕️', '👩‍⚕️', '🧑‍🎓', '👨‍🎓', '👩‍🎓', '🧑‍🏫', '👨‍🏫', '👩‍🏫', '🧑‍⚖️', '👨‍⚖️', '👩‍⚖️', '🧑‍🌾',
        '👨‍🌾', '👩‍🌾', '🧑‍🍳', '👨‍🍳', '👩‍🍳', '🧑‍🔧', '👨‍🔧', '👩‍🔧', '🧑‍🏭', '👨‍🏭', '👩‍🏭'
    ];
};
exports.EmojiPeople = EmojiPeople;
var EmojiAminal = function () {
    return [
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔',
        '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🪲'
    ];
};
exports.EmojiAminal = EmojiAminal;
exports.AllEmojis = {
    'Animals': (0, exports.EmojiAminal)(),
    'People': (0, exports.EmojiPeople)(),
    'Travel': (0, exports.EmojiTravel)(),
    'Smiley': (0, exports.EmojiSmiley)(),
    'Gesture': (0, exports.EmojiGesture)(),
    'Symbols': (0, exports.EmojiSymbol)(),
};
