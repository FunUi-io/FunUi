import React from 'react';
import { CartItem } from './Store';
interface CartModalProps {
    cart: CartItem[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    currency?: string;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    removeFromCart: (cartItemId: string) => void;
    clearCart: () => void;
    handleCheckout: () => void;
    cartBadgeColor?: string;
    checkoutText?: string;
    checkoutIcon?: React.ReactNode;
    small?: boolean;
    big?: boolean;
    persistCart?: boolean;
}
declare const CartModal: React.FC<CartModalProps>;
export default CartModal;
