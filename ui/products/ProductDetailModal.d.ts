import React from 'react';
import { Product } from './Products';
declare const ProductDetailModal: React.MemoExoticComponent<({ isOpen, setIsOpen, selectedProduct, selectedImageIndex, setSelectedImageIndex, selectedColor, setSelectedColor, quantity, setQuantity, handleAddFromModal, small, big }: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selectedProduct: Product;
    selectedImageIndex: number;
    setSelectedImageIndex: (index: number) => void;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    quantity: number;
    setQuantity: (qty: number) => void;
    handleAddFromModal: () => void;
    small?: boolean;
    big?: boolean;
}) => React.JSX.Element>;
export default ProductDetailModal;
