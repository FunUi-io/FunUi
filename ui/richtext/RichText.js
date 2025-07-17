"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_quilljs_1 = require("react-quilljs");
require("quill/dist/quill.bubble.css");
var md_1 = require("react-icons/md");
var Emojis_1 = require("../../utils/Emojis");
var Dropdown_1 = __importDefault(require("../drop/Dropdown"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var ToolTip_1 = __importDefault(require("../tooltip/ToolTip"));
var Circle_1 = __importDefault(require("../specials/Circle"));
var Tip_1 = __importDefault(require("../tooltip/Tip"));
var RichText = function (_a) {
    var value = _a.value, onChange = _a.onChange, _b = _a.placeholder, placeholder = _b === void 0 ? 'Write something...' : _b, afterEmoji = _a.afterEmoji, showEmojis = _a.showEmojis, _c = _a.funcss, funcss = _c === void 0 ? '' : _c;
    var _d = (0, react_quilljs_1.useQuill)({
        theme: 'bubble',
        placeholder: placeholder,
        modules: {
            toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
        },
    }), quill = _d.quill, quillRef = _d.quillRef;
    var savedRange = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!quill)
            return;
        var handleSelectionChange = function (range) {
            if (range)
                savedRange.current = range;
        };
        var handleTextChange = function () {
            onChange(quill.root.innerHTML);
        };
        quill.on('selection-change', handleSelectionChange);
        quill.on('text-change', handleTextChange);
        return function () {
            quill.off('selection-change', handleSelectionChange);
            quill.off('text-change', handleTextChange);
        };
    }, [quill, onChange]);
    (0, react_1.useEffect)(function () {
        if (quill && value !== quill.root.innerHTML) {
            quill.root.innerHTML = value;
        }
    }, [quill, value]);
    var insertEmoji = function (emoji) {
        if (quill && savedRange.current) {
            quill.insertText(savedRange.current.index, emoji);
            quill.setSelection(savedRange.current.index + emoji.length);
        }
    };
    var renderEmojiSection = function (title, emojis) { return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "mb-2 mt-2 text-sm" }, title),
        react_1.default.createElement(RowFlex_1.default, { gap: 0.3 }, emojis.map(function (emoji, i) { return (react_1.default.createElement("span", { key: i, className: "h6 pointer", onClick: function () { return insertEmoji(emoji); } }, emoji)); })))); };
    return (react_1.default.createElement("div", { className: funcss },
        react_1.default.createElement("div", { id: "bubble-editor-container", className: "bubble-editor-container p-0" },
            react_1.default.createElement("div", { ref: quillRef, className: "bubble-editor" })),
        react_1.default.createElement(RowFlex_1.default, { gap: 0.5 },
            showEmojis &&
                react_1.default.createElement(Dropdown_1.default, { closableOnlyOutside: true, direction: "dropdown", openOnHover: false, button: react_1.default.createElement(ToolTip_1.default, null,
                        react_1.default.createElement(Circle_1.default, { funcss: "bg border" },
                            react_1.default.createElement(md_1.MdOutlineEmojiEmotions, null)),
                        react_1.default.createElement(Tip_1.default, { tip: "top", animation: "ScaleUp", duration: 0.5, content: "Emojis" })), items: [
                        {
                            label: (react_1.default.createElement("div", { className: "w-200 h-300", style: { overflowY: 'auto' } },
                                renderEmojiSection('❤️ Smileys & People', Emojis_1.AllEmojis.Smiley),
                                renderEmojiSection('👍 Gestures & Body Parts', Emojis_1.AllEmojis.Gesture),
                                renderEmojiSection('🔥 Symbols & Expressions', Emojis_1.AllEmojis.Symbols),
                                renderEmojiSection('🚀 Travel, Objects & Activities', Emojis_1.AllEmojis.Travel),
                                renderEmojiSection('👨‍👩‍👧‍👦 People & Professions', Emojis_1.AllEmojis.People),
                                renderEmojiSection('🐶 Animals & Nature', Emojis_1.AllEmojis.Animals))),
                        },
                    ] }),
            afterEmoji || null)));
};
exports.default = RichText;
