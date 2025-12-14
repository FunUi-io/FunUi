import React from 'react';
import { Product } from './Store';
interface ProductCardProps {
    product: Product;
    currency?: string;
    onClick?: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
    className?: string;
    funcss?: string;
    showBadges?: boolean;
}
declare const ProductCard: React.FC<ProductCardProps>;
export default ProductCard;
