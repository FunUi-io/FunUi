'use client';
import React from 'react';
import { PiTrash, PiPlus, PiMinus, PiBag } from 'react-icons/pi';
import Modal from '../modal/Modal';
import RowFlex from '../specials/RowFlex';
import Text from '../text/Text';
import Input from '../input/Input';
import Div from '../div/Div';
import Button from '../button/Button';
import { CartItem, Product } from './Store';
import Circle from '../specials/Circle';
import Flex from '../flex/Flex';
import ImageScaler from '../components/ImageScaler';
import { TbShoppingBagX } from "react-icons/tb";
import Empty from '../empty/Empty';


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
  persistCart?: boolean;
}

const generateCartItemId = (item: CartItem) => {
  const parts = [
    item.product.id,
    item.variant?.id || '',
    item.selectedColor || '',
    item.selectedSize || ''
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
  persistCart = true,
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cart.reduce((sum, item) => {
    const price = item.variant?.price || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  // Calculate total savings from discounts
  const totalSavings = cart.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.product.comparePrice || item.product.price;
    const currentPrice = item.variant?.price || item.product.price;
    const savings = originalPrice !== currentPrice ? (originalPrice - currentPrice) * item.quantity : 0;
    return sum + savings;
  }, 0);

  const handleRemoveItem = (item: CartItem) => {
    const cartItemId = generateCartItemId(item);
    removeFromCart(cartItemId);
  };

  const handleUpdateQuantity = (item: CartItem, newQuantity: number) => {
    const cartItemId = generateCartItemId(item);
    updateQuantity(cartItemId, newQuantity);
  };

  return (
    <Modal
      animation="SlideDown"
      duration={0.3}
      open={isOpen}
      setOpen={setIsOpen}
      maxWidth='600px'
      title={
        <Text text="Your Cart" size="h3" />
      }
      body={
        <Div funcss="pt pb">
          {cart.length === 0 ? (
            <Div>
              <Empty 
              title="Your cart is empty"
              showCta 
              description="Add items to your cart to checkout"
              ctaText="Continue Shopping"
              ctaOnClick={() => setIsOpen(false)}
              ctaIcon={<PiBag />}
              />
            </Div>
          ) : (
            <>
              {cart.map((item, index) => {
                const cartItemId = generateCartItemId(item);
                const currentPrice = item.variant?.price || item.product.price;
                const originalPrice = item.originalPrice || item.product.comparePrice || currentPrice;
                const hasDiscount = originalPrice > currentPrice;

                let isFirst = index === 0;
                let isLast = index === cart.length - 1;
                
                return (
                  <Flex
                    key={`${cartItemId}-${index}`}
                    funcss={`bt pt pb  ${isLast ? "bb" : ""}`}
                    alignItems="center"
                    justify='space-between'
                    gap={1}
                    width='100%'
                  >
                    {/* Product Image */}
                    <Div funcss=" width-80 height-80">
                      {item.product.images?.[0] ? (
                        <ImageScaler 
                          src={item.product.images[0]} 
                          size='80px'
                        />
                      ) : (
                        <Div funcss="w-80 h-80 flex central">
                          <Text text="No Image" color="text-light" size="sm" />
                        </Div>
                      )}
                    </Div>

                    {/* Product Details */}
                    <Div funcss='w-200'>
                      <Text 
                        text={item.product.name} 
                        block
                        weight={600}
                      />
                      {item.variant?.name && (
                        <Text 
                          text={item.variant.name}
                          size='sm'
                          color="text-light"
                        />
                      )}
                      {(item.selectedColor || item.selectedSize) && (
                        <Text 
                          text={`${item.selectedColor ? `Color: ${item.selectedColor}` : ''} ${item.selectedSize ? `Size: ${item.selectedSize}` : ''}`} 
                          size='sm'
                          color="text-light"
                        />
                      )}
                      
                      {/* Price Display */}
                      <Flex gap={0.2}>
                        {hasDiscount && (
                          <Text 
                            text={`${currency}${originalPrice.toFixed(2)}`} 
                            size='sm'
                            color="text-light"
                            style={{ textDecoration: 'line-through' }}
                          />
                        )}
                        <Text 
                          text={`${currency}${currentPrice.toFixed(2)}${hasDiscount ? ` (Save ${currency}${(originalPrice - currentPrice).toFixed(2)})` : ''}`} 
                          color={hasDiscount ? 'success' : 'text'}
                          size='xs'
                        />
                      </Flex>
                    </Div>

                   <div className="col">
                       {/* Quantity Controls */}
                    <Flex width='100%' gap={0.5} alignItems='center'>
                      <Circle
                      size={1.5}
                      bg='lighter'
                        body={<PiMinus size={12} />}
                        onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      />
                    <div className="w-70">
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
                        aria-label={`Quantity for ${item.product.name}`}
                      />
                    </div>
                      <Circle
                           bg='lighter'
                      size={1.5}
                        body={<PiPlus size={12}  />}
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.product.name}`}
                      />
                      <div />
                       <Circle
                    size={1.5}
                      body={<PiTrash size={12} />}
                      onClick={() => handleRemoveItem(item)}
                      bg='error'
                      aria-label={`Remove ${item.product.name} from cart`}
                    />
                    </Flex>
                   </div>

                   
                  </Flex>
                );
              })}

              <div className="section">
                    {persistCart && (
              <Button
                text="Clear Cart"
                onClick={clearCart}
                startIcon={<TbShoppingBagX />}
                bg="error-light"
                color="error"
                funcss="full-width"
              />
            )}
              </div>
              
              {/* Cart Summary */}
              <Div funcss='mt'>
                <RowFlex justify="space-between">
                  <Text text="Items" color="text-light" />
                  <Text text={totalItems.toString()} />
                </RowFlex>
                
                {totalSavings > 0 && (
                  <RowFlex justify="space-between">
                    <Text text="Total Savings" color="text-light" />
                    <Text 
                      text={`-${currency}${totalSavings.toFixed(2)}`} 
                      color="success"
                    />
                  </RowFlex>
                )}
                
                <RowFlex justify="space-between">
                  <Text text="Subtotal" color="text-light" />
                  <Text text={`${currency}${subtotal.toFixed(2)}`} />
                </RowFlex>
              </Div>
            </>
          )}
        </Div>
      }
      footer={
        cart.length > 0 ? (
          <Div funcss="pt pb">
        
            
            <RowFlex justify="space-between"  alignItems="center">
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
              />
            </RowFlex>
          </Div>
        ) : <></>
      }
    />
  );
};

export default CartModal;