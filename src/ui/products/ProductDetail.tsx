// components/products/ProductDetail.tsx
'use client';
import React, { useState } from 'react';
import { PiMinus, PiPlus, PiCaretDown, PiCaretUp, PiChecks, PiScales, PiShieldCheck, PiUser, PiGlobe, PiUsers } from 'react-icons/pi';
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
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  const getDisplayPrice = () => {
    const price = product.price || 0;
    const productCurrency = product.currency || currency;
    return `${productCurrency}${price.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity, {
      color: selectedColor,
      size: selectedSize,
    });
    setOpen(false);
  };

  const totalPrice = ((product.price || 0) * quantity).toFixed(2);

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
                  {/* <img
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    className="funui_products_main_image round-edge"
                    loading="lazy"
                    width={"100%"}
                  /> */}
                  <ImageScaler 
                  src={product.images[selectedImageIndex]}
                  size={"100%"}
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
                        {/* <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          loading="lazy"
                          className="pointer h-80 round-edge"
                        /> */}
                            <ImageScaler 
                  src={image}
                  size={"100px"}
                  />
                      </Div>
                    ))}
                  </Carousel>
                )}
              </Div>
            )}
          </div>

          <div className="col">
            <Flex direction='column' gap={2} alignItems='flex-start' justify='flex-start'>
           <div>
               <Text text={product.name} size="2xl" block />
              <Flex justify="space-between" alignItems="center" width='100%'>
                <Text 
                  text={getDisplayPrice()} 
                  size="xl" 
                  
                />
                {(hasDiscount || product.comparePrice) && (
                  <Text 
                    text={`${product.currency || currency}${product.comparePrice!.toFixed(2)}`} 
                    textDecoration='line-through'
                  />
                )}
              </Flex>
           </div>

           {
           ( (product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0 ) ) &&
             <Flex width='100%' gap={1}>
                 {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="col">
                  <Select
                  fullWidth
                    options={[
                      { text: 'Select Color', value: ''  },
                      ...product.colors.map(color => ({ 
                        text: color.name, 
                        value: color.name , 
                        prefix: <div className='circle'
                          style={{width:"20px", height:'20px', backgroundColor:color.code}}
                        />
                      }))
                    ]}
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e)}
                    bordered
                  />
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="col">
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
                </div>
              )}
             </Flex>

           }
              {/* Description Section */}
              {processedDescription && (
                <div >
                  <Text text="Description" size="lg"  funcss="margin-bottom-1" />
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
                    />
                  )}
                </div>
              )}

              {/* no border incase nothing of these are there */}
              <div >
              <Flex gap={3} width='100%'>
                  {
                product.warranty && (
                     <Flex gap={0.3}>
                   <div>
                     <PiShieldCheck  className='text-primary' />
                   </div>
                   <div>
                         <Text text={"Warranty"} size="xs" opacity={4} block />
                         <Text text={product.warranty} size="sm" block lineHeight='1' />
                   </div>
                </Flex>
                )
               }
                  {
                product.manufacturer && (
                     <Flex gap={0.3}>
                   <div>
                     <PiUser  className='text-primary' />
                   </div>
                   <div>
                         <Text text={"Manufacturer"} size="xs" opacity={4} block />
                         <Text text={product.manufacturer} size="sm" block lineHeight='1' />
                   </div>
                </Flex>
                )
               }
                  {
                product.countryOfOrigin && (
                     <Flex gap={0.3}>
                   <div>
                     <PiGlobe  className='text-primary' />
                   </div>
                   <div>
                         <Text text={"Country of Origin"} size="xs" opacity={4} block />
                         <Text text={product.countryOfOrigin} size="sm" block lineHeight='1' />
                   </div>
                </Flex>
                )
               }
                  {
                product.isFeatured && (
                     <Flex gap={0.3}>
                   <div>
                     <PiUsers  className='text-primary' />
                   </div>
                   <div>
                         <Text text={"Featured"} size="xs" opacity={4} block />
                         <Text text={"Yes"} size="sm" block lineHeight='1' />
                   </div>
                </Flex>
                )
               }
                  {
                product.rating && (
                     <Flex gap={0.3}>
                   <div>
                     <TfiComments  className='text-primary' />
                   </div>
                   <div>
                         <Text text={"Rating"} size="xs" opacity={4} block />
                         <Text text={product.rating} size="sm" block lineHeight='1' />
                   </div>
                </Flex>
                )
               }
                  {
                product.brand && (
                     <Flex gap={0.3}>
                   <div>
                     <SiBlackmagicdesign  className='text-primary' />
                   </div>
                   <div>
                         <Text text={"Brand"} size="xs" opacity={4} block />
                         <Text text={product.brand} size="sm" block lineHeight='1' />
                   </div>
                </Flex>
                )
               }
                  {
                product.category && (
                     <Flex gap={0.3}>
                   <div>
                     <IoLayersOutline   className='text-primary' />
                   </div>
                   <div>
                         <Text text={"Category"} size="xs" opacity={4} block />
                         <Text text={product.category} size="sm" block lineHeight='1' />
                   </div>
                </Flex>
                )
               }
                  {
                product.isNew && (
                     <Flex gap={0.3}>
                   <div>
                     <PiChecks   className='text-primary' />
                   </div>
                   <div>
                         <Text text={"New"} size="xs" opacity={4} block />
                         <Text text={"Yes"} size="sm" block lineHeight='1' />
                   </div>
                </Flex>
                )
               }
                  {
                product.isSale && (
                     <Flex gap={0.3}>
                   <div>
                     <PiChecks   className='text-primary' />
                   </div>
                   <div>
                         <Text text={"On Sale"} size="xs" opacity={4} block />
                         <Text text={"Yes"} size="sm" block lineHeight='1' />
                   </div>
                </Flex>
                )
               }
                  {
                product.weight && (
                     <Flex gap={0.3}>
                   <div>
                     <PiScales   className='text-primary' />
                   </div>
                   <div>
                         <Text text={"Weight"} size="xs" opacity={4} block />
                         <Text text={product.weight + " " + product.weightUnit} size="sm" block lineHeight='1' />
                   </div>
                </Flex>
                )
               }
              </Flex>
              </div>
              
            
            </Flex>
          </div>
        </Flex>
      }
      footer={  <RowFlex gap={1}  justify='flex-end' funcss='pt'>
                <RowFlex gap={0.5} alignItems="center">
                  <Circle
                    body={<PiMinus />}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    funcss={quantity <= 1 ? "disabled" : ""}
                  />
                  <div className="w-90">
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setQuantity(Math.max(1, value));
                        }
                      }}
                      funcss="text-center"
                      bordered
                    />
                  </div>
                  <Circle onClick={() => setQuantity(quantity + 1)} bg='lighter'>
                    <PiPlus />
                  </Circle>
                </RowFlex>
                <Button
                  text={`Add to Cart - ${currency}${totalPrice}`}
                  bg="primary"
                  raised
                  onClick={handleAddToCart}
                />
              </RowFlex>}
    />
  );
};

export default ProductDetail;