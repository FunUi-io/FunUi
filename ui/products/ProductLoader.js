'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Div_1 = __importDefault(require("../div/Div"));
var View_1 = __importDefault(require("../view/View"));
var ProductLoader = function () {
    return (react_1.default.createElement(Div_1.default, { funcss: "funui_store_product-card " },
        react_1.default.createElement(Div_1.default, { funcss: "funui_store_image-container  round-edge skeleton" }),
        react_1.default.createElement(View_1.default, { funcss: 'skeleton round-edge', style: {
                height: "1rem",
                marginTop: "0.5rem"
            } }),
        react_1.default.createElement(View_1.default, { funcss: 'skeleton round-edge', style: {
                height: "3rem",
                marginTop: "0.5rem"
            } })));
};
exports.default = ProductLoader;
