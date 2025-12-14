'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { PiMagnifyingGlass, PiCaretLeft, PiCaretRight, PiSpinnerGap } from 'react-icons/pi';
import Button from '../button/Button';
import RowFlex from '../specials/RowFlex';
import Text from '../text/Text';
import Input from '../input/Input';
import Div from '../div/Div';
import { SlHandbag } from "react-icons/sl";
import Flex from '../flex/Flex';
import Select from '../select/Select';
import ProductCard from './ProductCard';
import CartModal from './CartModal';
import ProductDetail from './ProductDetail';
import { usePaginatedRecords } from '../theme/theme';
import { useComponentConfiguration } from '../../utils/componentUtils';
import Empty from '../empty/Empty';
import { RiLoader4Line } from 'react-icons/ri';

export type WeightUnit = 'g' | 'kg' | 'oz' | 'lb';
export type DimensionUnit = 'cm' | 'm' | 'in' | 'ft';

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  price: number;
  comparePrice?: number;
  currency?: string;
  weight?: number;
  weightUnit?: WeightUnit;
  stock?: number;
  images?: string[];
  color?: string;
  size?: string;
  discount?: number; // Added discount field
}

export type Product = {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  currency?: string;
  description?: string;
  images?: string[];
  category?: string;
  brand?: string;
  tags?: string[];
  colors?: { name: string; code: string }[];
  sizes?: string[];
  weight?: number;
  weightUnit?: WeightUnit;
  sku?: string;
  stock?: number;
  rating?: number;
  isNew?: boolean;
  isSale?: boolean;
  variants?: ProductVariant[];
  manufacturer: string | '';
  countryOfOrigin: string | '';
  warranty: string | '';
  isFeatured: string | '';
  discount?: number; // Added discount field for main product
};

export type CartItem = {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  addedAt: number;
  originalPrice?: number; // Store original price for discount calculation
};

export type CartStorage = {
  items: CartItem[];
  updatedAt: number;
};

type ProductsPageProps = {
  // Products source
  products?: Product[] | string;
  bucket?: string; // New prop for bucket name
  bucketPage?: number; // New prop for paginated records page
  bucketSize?: number; // New prop for paginated records page size
  
  // Display
  title?: string;
  showHeader?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  showCart?: boolean;
  
  // Cart
  cartIcon?: string | React.ReactNode;
  cartBadgeColor?: string;
  cartBadgeText?: string;
  checkoutText?: string;
  checkoutIcon?: string | React.ReactNode;
  currency?: string;
  persistCart?: boolean;
  storageKey?: string;
  
  // Callbacks
  onAddToCart?: (item: CartItem) => void;
  onRemoveFromCart?: (itemId: string) => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onCheckout?: (cartItems: CartItem[], totalAmount: number) => void;
  onProductClick?: (product: Product) => void;
  
  // Styling
  className?: string;
  gridClassName?: string;
  children?: React.ReactNode;
  id?: string;
  funcss?: string;
  bg?: string;
  color?: string;
  fullWidth?: boolean;
  small?: boolean;
  big?: boolean;
  itemsPerPage?: number;
  
  // Variant
  variant?: string;
};

const Store: React.FC<ProductsPageProps> = (localProps) => {
  // Use component configuration with variant
  const { mergeWithLocal } = useComponentConfiguration('Store', localProps.variant);
  const { props: final } = mergeWithLocal(localProps);
  
  // Destructure props from final merged configuration
  const {
    products = [],
    bucket,
    bucketPage = 1,
    bucketSize = 50,
    title = 'Products',
    showHeader = true,
    showSearch = true,
    showFilters = true,
    showCart = true,
    cartBadgeColor = 'error',
    cartBadgeText,
    checkoutText = 'Checkout',
    checkoutIcon,
    currency = '$',
    persistCart = true,
    storageKey = 'funui_cart',
    onAddToCart,
    onRemoveFromCart,
    onUpdateQuantity,
    onCheckout,
    onProductClick,
    className = '',
    gridClassName = '',
    children,
    id,
    funcss = '',
    fullWidth = false,
    small = false,
    big = false,
    itemsPerPage = 10,
  } = final;

  // Loading state - track bucket loading and initial load
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Use bucket data if bucket prop is provided
  const { records: bucketRecords, loading: bucketLoading } = usePaginatedRecords(
    bucket || '', // Use bucket name if provided
    bucketPage,
    bucketSize
  );

  // Function to calculate discount price
  const calculateDiscountedPrice = useCallback((price: number, discount?: number): { finalPrice: number; originalPrice: number } => {
    if (discount && discount > 0 && discount <= 100) {
      const discountAmount = (price * discount) / 100;
      return {
        finalPrice: price - discountAmount,
        originalPrice: price
      };
    }
    return {
      finalPrice: price,
      originalPrice: price
    };
  }, []);

  // Apply discounts to products
  const applyDiscounts = useCallback((products: Product[]): Product[] => {
    return products.map(product => {
      // Check if product has variants
      if (product.variants && product.variants.length > 0) {
        const discountedVariants = product.variants.map(variant => {
          const { finalPrice, originalPrice } = calculateDiscountedPrice(variant.price, variant.discount);
          return {
            ...variant,
            price: finalPrice,
            comparePrice: originalPrice
          };
        });
        
        return {
          ...product,
          variants: discountedVariants,
          // Use the first variant's price as the main product price
          price: discountedVariants[0]?.price || product.price,
          comparePrice: discountedVariants[0]?.comparePrice || product.comparePrice
        };
      } else {
        // Apply discount to main product
        const { finalPrice, originalPrice } = calculateDiscountedPrice(product.price, product.discount);
        return {
          ...product,
          price: finalPrice,
          comparePrice: originalPrice !== finalPrice ? originalPrice : product.comparePrice
        };
      }
    });
  }, [calculateDiscountedPrice]);

  // Convert bucket records to products format with discount handling
  const bucketProducts = useMemo(() => {
    if (!bucket || !bucketRecords) return null;
    
    const mappedProducts = bucketRecords.map((record: any) => {
      const values = record.values || record;
      
      // Extract discount from record - could be in various fields
      const discount = values.discount || values.salePercentage || values.discountPercentage;
      
      return {
        id: values.id || record.id || `bucket_${Math.random().toString(36).substr(2, 9)}`,
        name: values.name || values.title || 'Unnamed Product',
        price: parseFloat(values.price) || 0,
        comparePrice: parseFloat(values.comparePrice) || parseFloat(values.originalPrice) || undefined,
        currency: values.currency || currency,
        description: values.description || '',
        images: Array.isArray(values.images) ? values.images.map((image: { url: string }) => image.url) : 
               values.image ? [values.image] : [],
        category: values.category || values.type || '',
        brand: values.brand || values.manufacturer || '',
        tags: Array.isArray(values.tags) ? values.tags : 
              values.tag ? [values.tag] : [],
        colors: values.colors || [],
        sizes: values.sizes || [],
        weight: parseFloat(values.weight) || undefined,
        weightUnit: values.weightUnit as WeightUnit,
        sku: values.sku || values.productCode,
        stock: parseInt(values.stock) || parseInt(values.quantity) || undefined,
        rating: parseFloat(values.rating) || undefined,
        isNew: values.isNew || values.newArrival || false,
        isSale: values.isSale || values.onSale || false,
        variants: values.variants ? values.variants.map((variant: any) => ({
          ...variant,
          discount: variant.discount || discount // Pass discount to variants
        })) : [],
        manufacturer: values.manufacturer || '',
        countryOfOrigin: values.countryOfOrigin || '',
        warranty: values.warranty || '',
        isFeatured: values.isFeatured || '',
        discount: discount ? parseFloat(discount) : undefined
      };
    });
    
    return applyDiscounts(mappedProducts);
  }, [bucketRecords, bucket, currency, applyDiscounts]);

  // Parse and process products - FIXED: No setState calls inside useMemo
  const parsedProducts = React.useMemo(() => {
    let productList: Product[];
    
    // Use bucket products if bucket prop is provided and we have bucket data
    if (bucket && bucketProducts) {
      console.log(`Using ${bucketProducts.length} products from bucket: ${bucket}`);
      productList = bucketProducts.map((product, index) => ({
        ...product,
        id: product.id || `bucket_product_${index}_${Date.now()}`,
      }));
    } else {
      // Fall back to local products prop
      if (typeof products === 'string') {
        try {
          const parsed = JSON.parse(products);
          productList = Array.isArray(parsed) ? parsed : [];
        } catch (error) {
          console.error('Error parsing products JSON:', error);
          productList = [];
        }
      } else {
        productList = products || [];
      }
      
      // Apply discounts to locally provided products
      productList = applyDiscounts(productList);
    }
    
    // Ensure each product has a unique ID
    return productList.map((product, index) => ({
      ...product,
      id: product.id || `product_${index}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }));
  }, [products, bucket, bucketProducts, applyDiscounts]);

  // Handle loading state separately
  useEffect(() => {
    if (bucket) {
      // For bucket data, loading is based on bucketLoading state
      if (!bucketLoading && bucketProducts !== undefined) {
        // Small delay for better UX
        const timer = setTimeout(() => {
          setIsInitialLoading(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
      // For local data, loading is immediate after parsing
      setIsInitialLoading(false);
    }
  }, [bucket, bucketLoading, bucketProducts]);

  // Combined loading state
  const showLoading = isInitialLoading || (bucket && bucketLoading);

  // Initialize cart from localStorage with discount handling
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (!persistCart) return [];
    
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed: CartStorage = JSON.parse(stored);
        if (parsed.items && Array.isArray(parsed.items)) {
          return parsed.items.map(item => ({
            ...item,
            product: {
              ...item.product,
              id: item.product.id || `restored_${Date.now()}`
            },
            // Ensure original price is preserved
            originalPrice: item.originalPrice || item.product.comparePrice || item.product.price
          }));
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    return [];
  });

  // Save cart to localStorage
  useEffect(() => {
    if (persistCart) {
      try {
        const cartStorage: CartStorage = {
          items: cart,
          updatedAt: Date.now(),
        };
        localStorage.setItem(storageKey, JSON.stringify(cartStorage));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, persistCart, storageKey]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories
  const categories = useMemo(() => {
    if (showLoading) return ['all'];
    
    const allCategories = parsedProducts
      .map(p => p.category)
      .filter((cat): cat is string => typeof cat === 'string' && cat.trim() !== '');
    
    const uniqueCategories = Array.from(new Set(allCategories));
    return ['all', ...uniqueCategories];
  }, [parsedProducts, showLoading]);

  // Get unique brands
  const brands = useMemo(() => {
    if (showLoading) return ['all'];
    
    const allBrands = parsedProducts
      .map(p => p.brand)
      .filter((brand): brand is string => typeof brand === 'string' && brand.trim() !== '');
    
    return ['all', ...Array.from(new Set(allBrands))];
  }, [parsedProducts, showLoading]);

  // Get unique colors
  const colors = useMemo(() => {
    if (showLoading) return ['all'];
    
    const allColors: string[] = [];
    parsedProducts.forEach(product => {
      product.colors?.forEach((color:any) => {
        if (!allColors.includes(color.name)) {
          allColors.push(color.name);
        }
      });
    });
    return ['all', ...allColors];
  }, [parsedProducts, showLoading]);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (showLoading) return [];
    
    let filtered = [...parsedProducts];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => {
        const nameMatch = p.name?.toLowerCase().includes(query) ?? false;
        const descMatch = p.description?.toLowerCase().includes(query) ?? false;
        const brandMatch = p.brand?.toLowerCase().includes(query) ?? false;
        const categoryMatch = p.category?.toLowerCase().includes(query) ?? false;
        const tagsMatch = p.tags?.some(tag => tag.toLowerCase().includes(query)) ?? false;
        return nameMatch || descMatch || brandMatch || categoryMatch || tagsMatch;
      });
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }

    if (selectedColor !== 'all') {
      filtered = filtered.filter(p => 
        p.colors?.some((color: any) => color.name === selectedColor)
      );
    }

    return filtered;
  }, [parsedProducts, searchQuery, selectedCategory, selectedBrand, selectedColor, showLoading]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrand, selectedColor]);

  // Enhanced cart calculations with discount consideration
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  
  const subtotal = useMemo(() => cart.reduce((sum, item) => {
    const price = item.variant?.price || item.product.price;
    return sum + (price * item.quantity);
  }, 0), [cart]);

  // Calculate total savings from discounts
  const totalSavings = useMemo(() => cart.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.product.comparePrice || item.product.price;
    const currentPrice = item.variant?.price || item.product.price;
    const savings = originalPrice !== currentPrice ? (originalPrice - currentPrice) * item.quantity : 0;
    return sum + savings;
  }, 0), [cart]);

  // Generate cart item ID
  const generateCartItemId = useCallback((product: Product, options?: {
    color?: string;
    size?: string;
    variant?: ProductVariant;
  }) => {
    const parts = [
      product.id,
      options?.variant?.id || '',
      options?.color || '',
      options?.size || ''
    ].filter(Boolean);
    return parts.join('_');
  }, []);

  // Enhanced cart functions with original price preservation
  const addToCart = useCallback((product: Product, selectedOptions?: {
    color?: string;
    size?: string;
    variant?: ProductVariant;
  }) => {
    const cartItemId = generateCartItemId(product, selectedOptions);
    
    const existingItemIndex = cart.findIndex(item => {
      const itemId = generateCartItemId(item.product, {
        color: item.selectedColor,
        size: item.selectedSize,
        variant: item.variant
      });
      return itemId === cartItemId;
    });

    let updatedCart: CartItem[];
    
    // Store original price before discount
    const originalPrice = selectedOptions?.variant?.comparePrice || 
                         product.comparePrice || 
                         product.price;
    
    if (existingItemIndex !== -1) {
      updatedCart = [...cart];
      const existingItem = updatedCart[existingItemIndex];
      updatedCart[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
    } else {
      const newItem: CartItem = {
        product,
        variant: selectedOptions?.variant,
        quantity: 1,
        selectedColor: selectedOptions?.color,
        selectedSize: selectedOptions?.size,
        addedAt: Date.now(),
        originalPrice
      };
      updatedCart = [...cart, newItem];
    }
    
    setCart(updatedCart);
    
    if (existingItemIndex !== -1) {
      const existingItem = cart[existingItemIndex];
      onUpdateQuantity?.(cartItemId, existingItem.quantity + 1);
    } else {
      const newItem = updatedCart[updatedCart.length - 1];
      onAddToCart?.(newItem);
    }
  }, [cart, generateCartItemId, onUpdateQuantity, onAddToCart]);

  const updateQuantity = useCallback((cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    
    const updatedCart = cart.map(item => {
      const itemId = generateCartItemId(item.product, {
        color: item.selectedColor,
        size: item.selectedSize,
        variant: item.variant
      });
      if (itemId === cartItemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCart(updatedCart);
    onUpdateQuantity?.(cartItemId, newQuantity);
  }, [cart, generateCartItemId, onUpdateQuantity]);

  const removeFromCart = useCallback((cartItemId: string) => {
    const updatedCart = cart.filter(item => {
      const itemId = generateCartItemId(item.product, {
        color: item.selectedColor,
        size: item.selectedSize,
        variant: item.variant
      });
      return itemId !== cartItemId;
    });
    
    setCart(updatedCart);
    onRemoveFromCart?.(cartItemId);
  }, [cart, generateCartItemId, onRemoveFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    if (persistCart) {
      localStorage.removeItem(storageKey);
    }
  }, [persistCart, storageKey]);

  const handleCheckout = useCallback(() => {
    if (onCheckout) {
      onCheckout(cart, subtotal);
    }
    if (persistCart) {
      clearCart();
    }
    setIsCartOpen(false);
  }, [onCheckout, cart, subtotal, persistCart, clearCart]);

  // Product modal
  const openProductModal = useCallback((product: Product) => {
    if (onProductClick) {
      onProductClick(product);
      return;
    }
    
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  }, [onProductClick]);

  const handleAddFromModal = useCallback((product: Product, quantity: number, options?: any) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, options);
    }
    setIsProductModalOpen(false);
  }, [addToCart]);

  // Pagination
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  return (
    <Div 
      funcss={`funui_products_classname ${className} ${funcss}`}
      id={id}
      customStyle={{
        backgroundColor: final.bg,
        color: final.color,
      }}
    >
      {/* Header */}
      {showHeader && (
        <RowFlex justify="space-between" alignItems="center" funcss="mb-5">
          <Text 
            text={title} 
            size="h1" 
          />
          
          {showCart && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="cart-icon relative"
              type="button"
              aria-label={`Shopping cart (${totalItems} items)`}
              disabled={showLoading}
            >
              <SlHandbag size={30} />
                
                {totalItems > 0 && (
                  <div 
                    className="cart-badge"
                    style={{ backgroundColor: cartBadgeColor }}
                  >
                    {cartBadgeText || (totalItems > 99 ? '99+' : totalItems)}
                  </div>
                )}
            </button>
          )}
        </RowFlex>
      )}

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <RowFlex gap={1} alignItems="center" justify='space-between'>
          {showSearch && (
            <Input
              label="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bordered
              fullWidth={fullWidth}
              startIcon={<PiMagnifyingGlass />}
              // disabled={showLoading}
            />
          )}

          {/* Filters */}
          {showFilters && (
            <div className="col">
              <Flex gap={0.5} width='100%' justify='flex-end'>
                {
                  categories && categories.length > 0 && (
                    <div className="w-150">
                      <Select
                        options={categories.map(cat => ({ text: cat === 'all' ? 'All Categories' : cat, value: cat }))}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e)}
                        bordered
                        funcss='text-sm'
                        disabled={showLoading}
                      />
                    </div>
                  )
                }
                {
                  brands && brands.length > 0 && (
                    <div className="w-150">
                      <Select
                        options={brands.map(brand => ({ text: brand === 'all' ? 'All Brands' : brand, value: brand }))}
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e)}
                        bordered
                        funcss='text-sm'
                        disabled={showLoading}
                      />
                    </div>
                  )
                }
                {
                  colors && colors.length > 0 && (
                    <div className="w-150">
                      <Select
                        options={colors.map(color => ({ text: color === 'all' ? 'All Colors' : color, value: color  }))}
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e)}
                        bordered
                        funcss='text-sm'
                        disabled={showLoading}
                      />
                    </div>
                  )
                }
              </Flex>
            </div>
          )}
        </RowFlex>
      )}

      {/* Loading State */}
      {showLoading ? (
        <Div funcss="funui_products_loading flex-center padding-40">
          <Flex direction="column" alignItems="center" gap={2}>
            <RiLoader4Line size={40} className="spin" />
            <Text text="Loading products..." size="large" color="text-light" />
          </Flex>
        </Div>
      ) : (
        <>
          {/* Products Grid */}
          {currentProducts.length === 0 ? (
            <Div funcss="funui_products_empty flex-center padding-40">
              <Empty 
              title='No products found'
              ctaIcon={<PiSpinnerGap />}
              ctaText='Reload Page!'
              ctaOnClick={() => window.location.reload()}
              />
            </Div>
          ) : (
            <>
              <Div
                funcss={`funui_products_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ${gridClassName}`}
              >
                {currentProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    onClick={() => openProductModal(product)}
                    onAddToCart={() => addToCart(product)}
                    showBadges
                  />
                ))}
              </Div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Flex width='100%' justify='center' gap={0.5}>
                  <Button
                    startIcon={<PiCaretLeft />}
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    small
                    text="Prev"
                  />
                  
                  <Div funcss="pagination-numbers">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          text={pageNum.toString()}
                          onClick={() => goToPage(pageNum)}
                          bg={currentPage === pageNum ? 'primary' : undefined}
                          color={currentPage === pageNum ? 'white' : 'text'}
                          small
                        />
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <Text text="..." color="text-light" />
                        <Button
                          text={totalPages.toString()}
                          onClick={() => goToPage(totalPages)}
                          small
                        />
                      </>
                    )}
                  </Div>
                  
                  <Button
                    endIcon={<PiCaretRight />}
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    small
                    text="Next"
                  />
                </Flex>
              )}
            </>
          )}

         
          {children}
        </>
      )}

      {/* Cart Modal */}
      {showCart && (
        <CartModal
          cart={cart}
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
          currency={currency}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          handleCheckout={handleCheckout}
          cartBadgeColor={cartBadgeColor}
          checkoutText={checkoutText}
          checkoutIcon={checkoutIcon}
          small={small}
          big={big}
          persistCart={persistCart}
          // totalSavings={totalSavings}
        />
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          open={isProductModalOpen}
          setOpen={setIsProductModalOpen}
          currency={currency}
          onAddToCart={handleAddFromModal}
        />
      )}
    </Div>
  );
};

export default Store;