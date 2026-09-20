'use client';
import React from 'react';
import Div from '../div/Div';
import View from '../view/View';


const ProductLoader = () => {
  return (
    <Div
      funcss={`funui_store_product-card `}
    >
      <Div funcss="funui_store_image-container  round-edge skeleton" />
     
        <View  funcss='skeleton round-edge'
        style={{
            height:"1rem",
            marginTop:"0.5rem"
        }}
        />
        
        <View  funcss='skeleton round-edge'
        style={{
            height:"3rem",
            marginTop:"0.5rem"
        }}
        />
        
      {/* <Flex width='100%' gap={0.5} direction='column'>
        <Text block weight={500} truncate={2}>{product.name}</Text>
        
        <Flex width='100%' gap={1} justify='space-between' alignItems='center'>
          <Flex gap={0.5} alignItems='center'>
            <span className="block">{getDisplayPrice()}</span>
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
      </Flex> */}

      </Div>
  );
};

export default ProductLoader;