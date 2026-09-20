// components/products/ProductDetail.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { PiMinus, PiPlus, PiCaretDown, PiCaretUp, PiChecks, PiScales, PiShieldCheck, PiUser, PiGlobe, PiUsers, PiStorefront, PiTag, PiBag } from 'react-icons/pi';
import { TfiComments } from "react-icons/tfi";
import { SiBlackmagicdesign } from "react-icons/si";
import Modal from '../modal/Modal';
import Div from '../div/Div';
import Text from '../text/Text';
import Flex from '../flex/Flex';
import Button from '../button/Button';
import RowFlex from '../specials/RowFlex';
import Input from '../input/Input';
import Circle from '../specials/Circle';
import Carousel from '../carousel/Carousel';
import Select from '../select/Select';
import { Product } from './Store';
import { IoLayersOutline } from "react-icons/io5";
import ImageScaler from '../components/ImageScaler';

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

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  open,
  setOpen,
  currency = '$',
  onAddToCart,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [canAddToCart, setCanAddToCart] = useState(false);

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  // Stock information logic
  const stockAvailable = product.stock === undefined || product.stock > 0;
  const lowStock = product.stock !== undefined && product.stock > 0 && product.stock < 10;

  const getDisplayPrice = () => {
    const price = product.price || 0;
    const productCurrency = product.currency || currency;
    return `${productCurrency}${price.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    // Always add with quantity 1
    onAddToCart?.(product, 1, {
      color: selectedColor,
      size: selectedSize,
    });
    setOpen(false);
  };

  // Validate if all required selections are made
  useEffect(() => {
    let isValid = true;
    
    // Check if color selection is required and selected
    if (product.colors && product.colors.length > 0) {
      isValid = isValid && selectedColor !== '';
    }
    
    // Check if size selection is required and selected
    if (product.sizes && product.sizes.length > 0) {
      isValid = isValid && selectedSize !== '';
    }
    
    // Also check stock availability
    isValid = isValid && stockAvailable;
    
    setCanAddToCart(isValid);
  }, [selectedColor, selectedSize, stockAvailable, product.colors, product.sizes]);

  // Function to safely process description
  const processDescription = (description: string) => {
    if (!description) return '';
    
    // Remove h1, h2, h3 tags but keep their content
    let processed = description
      .replace(/<h[1-3][^>]*>/gi, '<p>')
      .replace(/<\/h[1-3]>/gi, '</p>');
    
    return processed;
  };

  // Function to truncate HTML while preserving tags
  const truncateHTML = (html: string, maxLength: number) => {
    if (html.length <= maxLength) return html;
    
    let truncated = '';
    let length = 0;
    let inTag = false;
    let tagBuffer = '';
    
    for (let i = 0; i < html.length && length < maxLength; i++) {
      const char = html[i];
      
      if (char === '<') {
        inTag = true;
        tagBuffer = char;
      } else if (char === '>') {
        inTag = false;
        tagBuffer += char;
        truncated += tagBuffer;
        tagBuffer = '';
      } else if (inTag) {
        tagBuffer += char;
      } else {
        truncated += char;
        length++;
      }
    }
    
    // Close any open tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = truncated + '...';
    
    // Get the innerHTML to ensure tags are properly closed
    return tempDiv.innerHTML;
  };

  // Process the description
  const processedDescription = processDescription(product.description || '');
  const maxDescriptionLength = 200;
  const shouldTruncate = processedDescription.length > maxDescriptionLength;
  
  const displayDescription = showFullDescription 
    ? processedDescription 
    : (shouldTruncate ? truncateHTML(processedDescription, maxDescriptionLength) : processedDescription);

  // Check if description has HTML tags
  const hasHTML = /<[a-z][\s\S]*>/i.test(processedDescription);

  return (
    <Modal
      animation="SlideDown"
      open={open}
      setOpen={setOpen}
      maxWidth='1000px'
      title={<></>}
      body={
        <Flex width='100%' gap={2}>
          <div className="w-400">
            {/* Product Images */}
            {product.images && product.images.length > 0 && (
              <Div funcss="margin-bottom-20">
                <Div funcss="funui_products_main_image_container mb-3">
                  <ImageScaler 
                    src={product.images[selectedImageIndex]}
                    size={"400px"}
                    funcss='round-edge'
                  />
                </Div>
                
                {product.images.length > 1 && (
                  <Carousel gap={1}>
                    {product.images.map((image, index) => (
                      <Div
                        key={index}
                        funcss={`funui_products_thumbnail rounde-edge ${selectedImageIndex === index ? 'funui_products_thumbnail-active' : ''}`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <ImageScaler 
                          src={image}
                          size={"100px"}
                          funcss='round-edge'
                        />
                      </Div>
                    ))}
                  </Carousel>
                )}
              </Div>
            )}
          </div>

          <div className="col">
            <Flex direction='column' gap={2} alignItems='flex-start' justify='flex-start' width='100%'>
              {/* Product Header Section */}
              <div className="w-full">
                <Flex justify="space-between" alignItems="center" width='100%'>
                  {/* Category & Badges */}
                  <Flex gap={1} alignItems="center">
                    {product.category && (
                      <Text size='xs' opacity={4} uppercase weight={500} color="text-muted">
                        {product.category}
                      </Text>
                    )}
                    
                    {/* New Badge */}
                    {product.isNew && (
                      <Div funcss="badge-new">
                        <Text size='xs' color='white' weight={600}>
                          NEW
                        </Text>
                      </Div>
                    )}
                    
                    {/* Sale Badge */}
                    {product.isSale && (
                      <Div funcss="badge-sale">
                        <Text size='xs' color='white' weight={600}>
                          SALE
                        </Text>
                      </Div>
                    )}
                  </Flex>
                  
                  {/* Stock Status */}
                  {!stockAvailable ? (
                    <Text size='xs' color='error' weight={600}>
                      Out of Stock
                    </Text>
                  ) : lowStock ? (
                    <Text size='xs' color='warning' weight={600}>
                      Only {product.stock} left
                    </Text>
                  ) : (
                    <Text size='xs' color='success' weight={600}>
                      In Stock
                    </Text>
                  )}
                </Flex>
                
                {/* Product Name */}
                <Text text={product.name} size="2xl" block weight={600} funcss="mb-3" />
                
                {/* Price Section */}
                <Flex justify="space-between" alignItems="center" width='100%' funcss="mb-3">
                  <Flex gap={1} alignItems="baseline">
                    <Text 
                      text={getDisplayPrice()} 
                      size="xl" 
                      weight={700}
                      color="primary"
                    />
                    {hasDiscount && (
                      <Div funcss="discount-percent">
                        <Text size='sm' color='white' weight={600}>
                          -{discountPercent}%
                        </Text>
                      </Div>
                    )}
                  </Flex>
                  
                  {/* Original Price */}
                  {(hasDiscount || product.comparePrice) && (
                    <Text 
                      text={`${product.currency || currency}${product.comparePrice!.toFixed(2)}`} 
                      textDecoration='line-through'
                      size="sm"
                      color="text-muted"
                    />
                  )}
                </Flex>
              </div>

              {/* Stock Quantity Display */}
              {product.stock !== undefined && (
                <Div>
                  <Text size='xs' opacity={4}>
                    {product.stock} units available
                  </Text>
                </Div>
              )}

              {/* Color & Size Selection */}
              {((product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0)) && (
                <Flex width='100%' gap={1} >
                  {/* Color Selection */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="col">
                      <Text size="sm" weight={500} funcss="mb-1">
                        Color
                        <Text size="xs" color="error" funcss="margin-left-1">
                          *
                        </Text>
                      </Text>
                      <Select
                        fullWidth
                        options={[
                          { text: 'Select Color', value: '' },
                          ...product.colors.map(color => ({ 
                            text: color.name, 
                            value: color.name, 
                            prefix: (
                              <Div 
                                funcss="color-preview"
                                customStyle={{
                                  width: "20px", 
                                  height: "20px", 
                                  borderRadius: "50%",
                                  backgroundColor: color.code,
                                  border: selectedColor === color.name ? '2px solid var(--primary)' : '1px solid var(--border)'
                                }}
                              />
                            )
                          }))
                        ]}
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e)}
                        bordered
                      />
                      {selectedColor === '' && (
                        <Text size="xs" color="error" funcss="margin-top-1">
                          Please select a color
                        </Text>
                      )}
                    </div>
                  )}

                  {/* Size Selection */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="col">
                      <Text size="sm" weight={500} funcss="mb-1">
                        Size
                        <Text size="xs" color="error" funcss="margin-left-1">
                          *
                        </Text>
                      </Text>
                      <Select
                        fullWidth
                        options={[
                          { text: 'Select Size', value: '' },
                          ...product.sizes.map(size => ({ text: size, value: size }))
                        ]}
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e)}
                        bordered
                      />
                      {selectedSize === '' && (
                        <Text size="xs" color="error" funcss="margin-top-1">
                          Please select a size
                        </Text>
                      )}
                    </div>
                  )}
                </Flex>
              )}

              {/* Description Section */}
              {processedDescription && (
                <Div >
                  <Text text="Description" size="lg" weight={600} funcss="margin-bottom-1" />
                  <div 
                    className={`article text-sm ${hasHTML ? '' : 'whitespace-pre-wrap'}`}
                    dangerouslySetInnerHTML={{__html: displayDescription}}
                  />
                  
                  {shouldTruncate && (
                    <Button
                      text={showFullDescription ? 'Show Less' : 'Read More'}
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      small
                      bg='lighter'
                      startIcon={showFullDescription ? <PiCaretUp /> : <PiCaretDown />}
                      funcss="mt-2"
                    />
                  )}
                </Div>
              )}

              {/* Product Details Grid */}
              <Div funcss="product-details-grid">
                <Flex gap={3} width='100%' >
                  {/* Brand */}
                  {product.brand && (
                    <Flex gap={0.3} funcss="detail-item">
                      <Div>
                        <SiBlackmagicdesign className='text-primary' />
                      </Div>
                      <Div>
                        <Text text={"Brand"} size="xs" opacity={4} block />
                        <Text text={product.brand} size="sm" block lineHeight='1' weight={500} />
                      </Div>
                    </Flex>
                  )}

                  {/* SKU */}
                  {product.sku && (
                    <Flex gap={0.3} funcss="detail-item">
                      <Div>
                        <PiTag className='text-primary' />
                      </Div>
                      <Div>
                        <Text text={"SKU"} size="xs" opacity={4} block />
                        <Text text={product.sku} size="sm" block lineHeight='1' weight={500} />
                      </Div>
                    </Flex>
                  )}

                  {/* Rating */}
                  {product.rating && (
                    <Flex gap={0.3} funcss="detail-item">
                      <Div>
                        <TfiComments className='text-primary' />
                      </Div>
                      <Div>
                        <Text text={"Rating"} size="xs" opacity={4} block />
                        <Text text={product.rating.toString()} size="sm" block lineHeight='1' weight={500} />
                      </Div>
                    </Flex>
                  )}

                  {/* Weight */}
                  {product.weight && (
                    <Flex gap={0.3} funcss="detail-item">
                      <Div>
                        <PiScales className='text-primary' />
                      </Div>
                      <Div>
                        <Text text={"Weight"} size="xs" opacity={4} block />
                        <Text text={`${product.weight} ${product.weightUnit || ''}`} size="sm" block lineHeight='1' weight={500} />
                      </Div>
                    </Flex>
                  )}

                  {/* Manufacturer */}
                  {product.manufacturer && (
                    <Flex gap={0.3} funcss="detail-item">
                      <Div>
                        <PiUser className='text-primary' />
                      </Div>
                      <Div>
                        <Text text={"Manufacturer"} size="xs" opacity={4} block />
                        <Text text={product.manufacturer} size="sm" block lineHeight='1' weight={500} />
                      </Div>
                    </Flex>
                  )}

                  {/* Country of Origin */}
                  {product.countryOfOrigin && (
                    <Flex gap={0.3} funcss="detail-item">
                      <Div>
                        <PiGlobe className='text-primary' />
                      </Div>
                      <Div>
                        <Text text={"Country of Origin"} size="xs" opacity={4} block />
                        <Text text={product.countryOfOrigin} size="sm" block lineHeight='1' weight={500} />
                      </Div>
                    </Flex>
                  )}

                  {/* Warranty */}
                  {product.warranty && (
                    <Flex gap={0.3} funcss="detail-item">
                      <Div>
                        <PiShieldCheck className='text-primary' />
                      </Div>
                      <Div>
                        <Text text={"Warranty"} size="xs" opacity={4} block />
                        <Text text={product.warranty} size="sm" block lineHeight='1' weight={500} />
                      </Div>
                    </Flex>
                  )}

                  {/* Category */}
                  {product.category && (
                    <Flex gap={0.3} funcss="detail-item">
                      <Div>
                        <IoLayersOutline className='text-primary' />
                      </Div>
                      <Div>
                        <Text text={"Category"} size="xs" opacity={4} block />
                        <Text text={product.category} size="sm" block lineHeight='1' weight={500} />
                      </Div>
                    </Flex>
                  )}

                  {/* Store/Vendor */}
                  {product.brand && (
                    <Flex gap={0.3} funcss="detail-item">
                      <Div>
                        <PiStorefront className='text-primary' />
                      </Div>
                      <Div>
                        <Text text={"Store"} size="xs" opacity={4} block />
                        <Text text={product.brand} size="sm" block lineHeight='1' weight={500} />
                      </Div>
                    </Flex>
                  )}

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <Flex gap={0.3} funcss="detail-item">
                      <Div>
                        <PiTag className='text-primary' />
                      </Div>
                      <Div>
                        <Text text={"Tags"} size="xs" opacity={4} block />
                        <Text text={product.tags.join(', ')} size="sm" block lineHeight='1' truncate={1} />
                      </Div>
                    </Flex>
                  )}
                </Flex>
              </Div>
            </Flex>
          </div>
        </Flex>
      }
      footer={
        <RowFlex gap={1} justify='flex-end' funcss='pt'>
          <Button
            text={`Add to Cart`}
            startIcon={<PiBag />}
            bg="primary"
            raised
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            funcss={!canAddToCart ? "opacity-6" : ""}
          />
        </RowFlex>
      }
    />
  );
};

export default ProductDetail;