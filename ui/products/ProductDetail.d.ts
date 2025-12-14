import React from 'react';
import { Product } from './Store';
interface ProductDetailProps {
    product: Product;
    open: boolean;
    setOpen: (open: boolean) => void;
    currency?: string;
    onAddToCart?: (product: Product, quantity: number, selectedOptions?: {
        color?: string;
        size?: string;
    }) => void;
}
declare const ProductDetail: React.FC<ProductDetailProps>;
export default ProductDetail;
