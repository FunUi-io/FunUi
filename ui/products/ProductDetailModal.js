"use strict";
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
var pi_1 = require("react-icons/pi");
var Modal_1 = __importDefault(require("../modal/Modal"));
var Close_1 = __importDefault(require("../modal/Close"));
var Button_1 = __importDefault(require("../button/Button"));
var RowFlex_1 = __importDefault(require("../specials/RowFlex"));
var Text_1 = __importDefault(require("../text/Text"));
var Input_1 = __importDefault(require("../input/Input"));
var Div_1 = __importDefault(require("../div/Div"));
var DETAIL_EMPTY_SVG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23f3f4f6"><rect width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%239ca3af" font-size="12">No Image</text></svg>';
var THUMBNAIL_EMPTY_SVG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23f3f4f6"><rect width="100" height="100"/></svg>';
var ProductDetailModal = (0, react_1.memo)(function (_a) {
    var isOpen = _a.isOpen, setIsOpen = _a.setIsOpen, selectedProduct = _a.selectedProduct, selectedImageIndex = _a.selectedImageIndex, setSelectedImageIndex = _a.setSelectedImageIndex, selectedColor = _a.selectedColor, setSelectedColor = _a.setSelectedColor, quantity = _a.quantity, setQuantity = _a.setQuantity, handleAddFromModal = _a.handleAddFromModal, small = _a.small, big = _a.big;
    return (react_1.default.createElement(Modal_1.default, { animation: "ScaleUp", duration: 0.3, open: isOpen, setOpen: setIsOpen, funcss: "funui_products_detail_modal max-width-600", title: react_1.default.createElement(RowFlex_1.default, { justify: "space-between", alignItems: "center" },
            react_1.default.createElement(Text_1.default, { text: selectedProduct.name, size: "h3", funcss: "text-bold", block: true }),
            react_1.default.createElement(Close_1.default, { onClick: function () { return setIsOpen(false); } })), body: react_1.default.createElement(Div_1.default, { funcss: "funui_products_detail_body" },
            selectedProduct.images && selectedProduct.images.length > 0 && (react_1.default.createElement(Div_1.default, { funcss: "margin-bottom-20" },
                react_1.default.createElement(Div_1.default, { funcss: "margin-bottom-10" },
                    react_1.default.createElement("img", { src: selectedProduct.images[selectedImageIndex], alt: selectedProduct.name, style: { width: '100%', borderRadius: '0.5rem' }, loading: "lazy", onError: function (e) {
                            e.target.src = DETAIL_EMPTY_SVG;
                        } })),
                selectedProduct.images.length > 1 && (react_1.default.createElement(RowFlex_1.default, { gap: 1, wrap: "wrap" }, selectedProduct.images.map(function (image, index) { return (react_1.default.createElement(Div_1.default, { key: index, funcss: "cursor-pointer ".concat(selectedImageIndex === index ? 'border-2 border-primary' : 'border border-light'), onClick: function () { return setSelectedImageIndex(index); }, customStyle: {
                        width: '80px',
                        height: '80px',
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        cursor: 'pointer'
                    } },
                    react_1.default.createElement("img", { src: image, alt: "".concat(selectedProduct.name, " ").concat(index + 1), loading: "lazy", style: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }, onError: function (e) {
                            e.target.src = THUMBNAIL_EMPTY_SVG;
                        } }))); }))))),
            react_1.default.createElement(Div_1.default, { funcss: "funui_products_detail_info space-y-3" },
                react_1.default.createElement(RowFlex_1.default, { justify: "space-between", alignItems: "center" },
                    react_1.default.createElement(Text_1.default, { text: "$".concat(selectedProduct.price.toFixed(2)), size: "h3", funcss: "text-bold" }),
                    selectedProduct.comparePrice && selectedProduct.comparePrice > selectedProduct.price && (react_1.default.createElement(Text_1.default, { text: "$".concat(selectedProduct.comparePrice.toFixed(2)), funcss: "text-light line-through" }))),
                selectedProduct.description && (react_1.default.createElement(Text_1.default, { text: selectedProduct.description, funcss: "text-light line-height-1.6" })),
                selectedProduct.colors && selectedProduct.colors.length > 0 && (react_1.default.createElement(Div_1.default, { funcss: "funui_products_color_selection space-y-2" },
                    react_1.default.createElement(Text_1.default, { text: "Color", funcss: "text-bold" }),
                    react_1.default.createElement(RowFlex_1.default, { gap: 1, wrap: "wrap" }, selectedProduct.colors.map(function (color) { return (react_1.default.createElement(Button_1.default, { key: color.name, onClick: function () { return setSelectedColor(color.name); }, funcss: "padding-10 rounded ".concat(selectedColor === color.name
                            ? 'border-2 border-primary'
                            : 'border border-light'), style: { backgroundColor: color.code }, "aria-label": color.name }, selectedColor === color.name && (react_1.default.createElement(pi_1.PiCheck, { style: { color: 'white' } })))); })))),
                react_1.default.createElement(Div_1.default, { funcss: "funui_products_quantity_selection space-y-2" },
                    react_1.default.createElement(Text_1.default, { text: "Quantity", funcss: "text-bold" }),
                    react_1.default.createElement(RowFlex_1.default, { gap: 2, alignItems: "center" },
                        react_1.default.createElement(Button_1.default, { startIcon: "-", onClick: function () { return setQuantity(Math.max(1, quantity - 1)); }, disabled: quantity <= 1, color: "text", small: small }),
                        react_1.default.createElement(Input_1.default, { type: "number", value: quantity, onChange: function (e) {
                                var value = parseInt(e.target.value);
                                if (!isNaN(value)) {
                                    setQuantity(Math.max(1, value));
                                }
                            }, funcss: "width-100 text-center", bordered: true }),
                        react_1.default.createElement(Button_1.default, { startIcon: react_1.default.createElement(pi_1.PiPlus, null), onClick: function () { return setQuantity(quantity + 1); }, color: "text", small: small }))))), footer: react_1.default.createElement(RowFlex_1.default, { gap: 1, justify: "flex-end", funcss: "funui_products_detail_footer" },
            react_1.default.createElement(Button_1.default, { text: "Cancel", color: "text", onClick: function () { return setIsOpen(false); }, small: small }),
            react_1.default.createElement(Button_1.default, { text: "Add to Cart - $".concat(((selectedProduct.price || 0) * quantity).toFixed(2)), bg: "primary", raised: true, startIcon: react_1.default.createElement(pi_1.PiShoppingCart, null), onClick: handleAddFromModal, small: small, big: big })) }));
});
ProductDetailModal.displayName = 'ProductDetailModal';
exports.default = ProductDetailModal;
