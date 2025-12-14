'use client';
import React from 'react';
import Div from '../div/Div';
import Text from '../text/Text';
import Flex from '../flex/Flex';
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

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency = '$',
  onClick,
  onAddToCart,
  className = '',
  funcss = '',
  showBadges = true,
}) => {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;
  
  const stockAvailable = product.stock === undefined || product.stock > 0;

  const handleClick = () => {
    onClick?.(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const getDisplayPrice = () => {
    const price = product.price || 0;
    const productCurrency = product.currency || currency;
    return `${productCurrency}${price.toFixed(2)}`;
  };

  return (
    <Div
      funcss={`funui_store_product-card ${className} ${funcss}`}
      onClick={handleClick}
      customStyle={{ cursor: 'pointer' }}
    >
      {/* Product Image Container */}
      <Div funcss="funui_store_image-container">
        {product.images?.[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            loading="lazy"
            className="funui_store_product-image"
          />
        ) : (
          <Div funcss="funui_store_no-image">
            <Text text="No Image" color="text-muted" size="sm" />
          </Div>
        )}
        
        {/* Badges */}
        {showBadges && (
          <Div funcss="funui_store_product-badges">
          
            {product.isSale && (
              <span className="funui_store_badge sale">Sale</span>
            )}
         
          </Div>
        )}
      </Div>

      {/* Product Info */}
      <Div funcss="funui_store_product-info">
      <Flex fit justify='space-between' alignItems='center' gap={1}>
          {product.category && (
          <span className="funui_store_product-category">{product.category}</span>
        )}
          {product.isNew && (
        <Text size='xs' color='success' weight={600}>New</Text>
            )}
      </Flex>
        
       <Flex gap={0.5} direction='column' width='100%'>
         <Text block size='lg' truncate={2} >{product.name}</Text>
        
        <Flex  width='100%' gap={1} justify='space-between'>
       <Flex gap={0.5} alignItems='center'>
          <span className="text-lg block">{getDisplayPrice()}</span>
                {hasDiscount && (
              <Text size='xs' color='info' weight={600}>{discountPercent}% Off</Text>
            )}
       </Flex>
            {hasDiscount && (
            <Text size="sm" opacity={4} textDecoration='line-through'>
              {product.currency || currency}{product.comparePrice!.toFixed(2)}
            </Text>
          )}
       
        </Flex>
        
        {!stockAvailable ? (
          <span className="funui_store_stock-info out text-xs">Out of Stock</span>
        ) : product.stock !== undefined && product.stock > 0 && product.stock < 10 ? (
          <span className="funui_store_stock-info low text-xs">Only {product.stock} left</span>
        ) : stockAvailable && (
          <span className="funui_store_stock-info in text-xs">In Stock</span>
        )}
       </Flex>
      </Div>
    </Div>
  );
};

export default ProductCard;