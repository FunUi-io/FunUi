"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var CardHeader_1 = __importDefault(require("./CardHeader"));
var CardBody_1 = __importDefault(require("./CardBody"));
var CardFooter_1 = __importDefault(require("./CardFooter"));
function Card(_a) {
    var color = _a.color, bg = _a.bg, width = _a.width, height = _a.height, minHeight = _a.minHeight, minWidth = _a.minWidth, margin = _a.margin, padding = _a.padding, funcss = _a.funcss, children = _a.children, roundEdge = _a.roundEdge, maxHeight = _a.maxHeight, maxWidth = _a.maxWidth, horizontal = _a.horizontal, id = _a.id, header = _a.header, body = _a.body, footer = _a.footer, noGap = _a.noGap, fab = _a.fab, image = _a.image;
    return (react_1.default.createElement("div", { id: id || '', className: "card ".concat(noGap ? 'no-gap' : '', " text-").concat(color || '', " ").concat(bg || '', " ").concat(funcss || '', " ").concat(roundEdge ? 'round-edge' : '', " ").concat(horizontal ? 'horizontalCard' : ''), style: {
            width: "".concat(width || ''),
            height: "".concat(height || ''),
            minHeight: "".concat(minHeight || ''),
            minWidth: "".concat(minWidth || ''),
            maxHeight: maxHeight || '',
            maxWidth: maxWidth || '',
            margin: "".concat(margin || ''),
            padding: "".concat(padding || ''),
        } },
        image ? react_1.default.createElement("div", { className: "".concat(fab ? 'relative' : '') },
            image,
            " ",
            fab ? fab : '') : '',
        header && !horizontal ? react_1.default.createElement(CardHeader_1.default, null, header) : '',
        body ?
            react_1.default.createElement("div", null,
                horizontal ? react_1.default.createElement(CardHeader_1.default, null, header) : '',
                react_1.default.createElement(CardBody_1.default, null,
                    "  ",
                    body,
                    " "),
                horizontal ? react_1.default.createElement(CardFooter_1.default, null, footer) : '')
            : '',
        footer && !horizontal ? react_1.default.createElement(CardFooter_1.default, null, footer) : '',
        children));
}
exports.default = Card;
