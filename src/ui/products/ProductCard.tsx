'use client';
import React, { useState, useEffect } from 'react';
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
  
  // Track which image is currently displayed
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  
  // Check if product has multiple images
  const hasMultipleImages = product.images && product.images.length > 1;
  
  // Handle image preloading
  useEffect(() => {
    if (!product.images || product.images.length === 0) return;
    
    // Track loaded images
    const loadedStatus = new Array(product.images.length).fill(false);
    setImagesLoaded(loadedStatus);
    
    // Preload all images
    product.images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      };
    });
  }, [product.images]);
  
  const handleClick = () => {
    onClick?.(product);
  };

  const handleMouseEnter = () => {
    if (hasMultipleImages && product.images && product.images.length > 1) {
      // Switch to next image (or first if at the end)
      setCurrentImageIndex(prev => 
        prev === product.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleMouseLeave = () => {
    // Reset to first image when mouse leaves
    setCurrentImageIndex(0);
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
      <Div 
        funcss="funui_store_image-container round-edge"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        customStyle={{ position: 'relative', overflow: 'hidden' }}
      >
        {product.images && product.images.length > 0 ? (
          <>
            {/* First image - always visible as base */}
            <img 
              src={product.images[0]} 
              alt={product.name}
              loading="lazy"
              className="funui_store_product-image"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: currentImageIndex === 0 ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                zIndex: 1
              }}
            />
            
            {/* Preload all other images */}
            {product.images.slice(1).map((imageSrc, index) => (
              <img 
                key={`preload-${index + 1}`}
                src={imageSrc}
                alt={`${product.name} - View ${index + 2}`}
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: currentImageIndex === index + 1 ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                  zIndex: 2
                }}
              />
            ))}
            
            {/* Fallback for no image */}
            {(!product.images[0] || imagesLoaded[0] === false) && (
              <Div funcss="funui_store_no-image">
                <Text text="No Image" color="text-muted" size="sm" />
              </Div>
            )}
          </>
        ) : (
          <Div funcss="funui_store_no-image">
            <Text text="No Image" color="text-muted" size="sm" />
          </Div>
        )}
      </Div>

      {/* Product Info */}
      <Div funcss="funui_store_product-info ">
        {/* Category */}
        {product.category && (
          <Text size='xs' opacity={4} uppercase>{product.category}</Text>
        )}
        
      <Flex width='100%' gap={0.5} direction='column'>
          {/* Name */}
        <Text block weight={500} truncate={2}>{product.name}</Text>
        
        {/* Price Section */}
        <Flex width='100%' gap={1} justify='space-between' alignItems='center'>
          <Flex gap={0.5} alignItems='center'>
            <span className="block">{getDisplayPrice()}</span>
            {hasDiscount && (
              <Text size='xs' color='info' weight={600}>{discountPercent}% Off</Text>
            )}
          </Flex>
          
          {/* Original Price if Discount */}
          {hasDiscount && (
            <Text size="sm" opacity={4} textDecoration='line-through'>
              {product.currency || currency}{product.comparePrice!.toFixed(2)}
            </Text>
          )}
        </Flex>
      </Flex>
      </Div>
    </Div>
  );
};

export default ProductCard;