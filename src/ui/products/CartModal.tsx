// components/products/CartModal.tsx
'use client';
import React from 'react';
import { PiTrash, PiPlus, PiMinus } from 'react-icons/pi';
import Modal from '../modal/Modal';
import RowFlex from '../specials/RowFlex';
import Text from '../text/Text';
import Input from '../input/Input';
import Div from '../div/Div';
import Button from '../button/Button';
import { CartItem, Product } from './Store';
import Circle from '../specials/Circle';
import Flex from '../flex/Flex';

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

const generateCartItemId = (product: Product, options?: {
  color?: string;
  size?: string;
}) => {
  const parts = [
    product.id,
    options?.color || '',
    options?.size || ''
  ].filter(Boolean);
  return parts.join('_');
};

const CartModal: React.FC<CartModalProps> = ({
  cart,
  isOpen,
  setIsOpen,
  currency = '$',
  updateQuantity,
  removeFromCart,
  clearCart,
  handleCheckout,
  cartBadgeColor = 'error',
  checkoutText = 'Checkout',
  checkoutIcon,
  small = false,
  big = false,
  persistCart = true,
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleRemoveItem = (item: CartItem) => {
    const cartItemId = generateCartItemId(item.product, {
      color: item.selectedColor,
      size: item.selectedSize
    });
    removeFromCart(cartItemId);
  };

  const handleUpdateQuantity = (item: CartItem, newQuantity: number) => {
    const cartItemId = generateCartItemId(item.product, {
      color: item.selectedColor,
      size: item.selectedSize
    });
    updateQuantity(cartItemId, newQuantity);
  };

  return (
    <Modal
      animation="SlideLeft"
      position="right"
      duration={0.3}
      open={isOpen}
      setOpen={setIsOpen}
      funcss="funui_products_cart_modal width-400 sm:width-500"
      title={
        <Text text="Your Cart" size="h3" />
      }
      body={
        <Div funcss="funui_products_cart_body max-height-70vh overflow-y-auto">
          {cart.length === 0 ? (
            <Div funcss="flex-center padding-40">
              <Text 
                text="Your cart is empty" 
                color="text-light" 
                size="large" 
              />
            </Div>
          ) : (
            <>
              {cart.map((item, index) => {
                const cartItemId = generateCartItemId(item.product, {
                  color: item.selectedColor,
                  size: item.selectedSize
                });
                
                return (
                  <RowFlex
                    key={`${cartItemId}-${index}`}
                    funcss="lighter p round-edge section"
                    alignItems="center"
                    justify='space-between'
                    gap={1}
                  >
                    {/* Product Image */}
                    <Div funcss=" width-80 height-80">
                      {item.product.images?.[0] ? (
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          loading="lazy"
                          className="fit round-edge"
                        />
                      ) : (
                        <Div funcss="w-80 h-80 flex central">
                          <Text text="No Image" color="text-light" size="sm" />
                        </Div>
                      )}
                    </Div>

                    {/* Product Details */}
                    <Div funcss="funui_products_cart_details flex-1 min-width-0">
                      <Text 
                        text={item.product.name} 
                        block
                      />
                      {(item.selectedColor || item.selectedSize) && (
                        <Text 
                          text={`${item.selectedColor ? `Color: ${item.selectedColor}` : ''} ${item.selectedSize ? `Size: ${item.selectedSize}` : ''}`} 
                          size='sm'
                        />
                      )}
                      <Text 
                        text={`${item.product.currency || currency}${(item.product.price * item.quantity).toFixed(2)}`} 
                        block 
                        size='lg'
                      />
                    </Div>

                   <div className="col">
                       {/* Quantity Controls */}
                    <Flex width='100%' gap={0.5} alignItems='center'>
                      <Circle
                      size={2.5}
                      bg='bg'
                        body={<PiMinus />}
                        onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      />
                    <div className="w-90">
                           <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            handleUpdateQuantity(item, Math.max(1, value));
                          }
                        }}
                        fullWidth
                        bordered
                      />
                    </div>
                      <Circle
                           bg='bg'
                      size={2.5}
                        body={<PiPlus />}
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      />
                    </Flex>
                   </div>

                    {/* Remove Button */}
                    <Circle
                    size={2.5}
                      body={<PiTrash />}
                      onClick={() => handleRemoveItem(item)}
                      bg='error'
                    />
                  </RowFlex>
                );
              })}
              
              {/* Cart Summary */}
              <Div funcss="funui_products_cart_summary padding-20 space-y-3">
                <RowFlex justify="space-between">
                  <Text text="Subtotal" color="text-light" />
                  <Text text={`${currency}${subtotal.toFixed(2)}`} />
                </RowFlex>
                <RowFlex justify="space-between">
                  <Text text="Items" color="text-light" />
                  <Text text={totalItems.toString()} />
                </RowFlex>
              </Div>
            </>
          )}
        </Div>
      }
      footer={
        cart.length > 0 ? (
          <Div funcss="funui_products_cart_footer padding-20 border-top border-light">
            <RowFlex justify="space-between" alignItems="center">
              <Div>
                <Text text="Total" color="text-light" size="sm" block />
                <Text text={`${currency}${subtotal.toFixed(2)}`} size="h4" />
              </Div>
              <Button
                text={checkoutText}
                bg="primary"
                raised
                onClick={handleCheckout}
                funcss="padding-x-30"
                startIcon={checkoutIcon}
                small={small}
                big={big}
              />
            </RowFlex>
          </Div>
        ) : <></>
      }
    />
  );
};

export default CartModal;