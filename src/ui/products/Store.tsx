'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  PiMagnifyingGlass, 
  PiCaretLeft, 
  PiCaretRight, 
  PiSpinnerGap, 
  PiWhatsappLogo, 
  PiX,
  PiList,
  PiFunnel,
  PiHandTap,
  PiUserCircle
} from 'react-icons/pi';
import Button from '../button/Button';
import RowFlex from '../specials/RowFlex';
import Text from '../text/Text';
import Input from '../input/Input';
import Div from '../div/Div';
import { SlHandbag } from "react-icons/sl";
import Flex from '../flex/Flex';
import ProductCard from './ProductCard';
import CartModal from './CartModal';
import ProductDetail from './ProductDetail';
import { usePaginatedRecords } from '../theme/theme';
import { useComponentConfiguration } from '../../utils/componentUtils';
import Empty from '../empty/Empty';
import Modal from '../modal/Modal';
import Accordion from '../accordion/Accordion';
import View from '../view/View';
import { getCssVariableValue } from '../../utils/getCssVariable';
import ProductLoader from './ProductLoader';

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
  discount?: number;
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
  discount?: number;
};

export type CartItem = {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  addedAt: number;
  originalPrice?: number;
};

export type CartStorage = {
  items: CartItem[];
  updatedAt: number;
};

export type UserInfoField = {
  infoName: string;
  type: 'text' | 'tel' | 'email' | 'number' | 'textarea';
  required: boolean;
  label?: string;
  placeholder?: string;
};

export type OtherInfo = UserInfoField[] | string;

export type CheckoutData = {
  cartItems: CartItem[];
  totalAmount: number;
  userInfo: Record<string, string>;
};

type ProductsPageProps = {
  // Products source
  products?: Product[] | string;
  bucket?: string;
  bucketPage?: number;
  bucketSize?: number;
  
  // Display
  title?: string;
  heroAlign?: 'left' | 'center' | 'right' | 'justify';
  heroTitle?: string;
  heroDescription?: string;
  heroBackgroundImage?: string;
  heroHeight?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  overlayGradient?: boolean;
  gradientDirection?: 'to-bottom' | 'to-top' | 'to-left' | 'to-right' | 'to-bottom-right' | 'to-bottom-left' | 'to-top-right' | 'to-top-left';
  invertGradient?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  showHero?: boolean;
  
  // Title & Description Styling
  titleSize?: string;
  titleColor?: string;
  descriptionSize?: string;
  descriptionColor?: string;
  descriptionOpacity?: number;
  
  // Cart
  cartIcon?: string | React.ReactNode;
  cartBadgeColor?: string;
  cartBadgeText?: string;
  checkoutText?: string;
  checkoutIcon?: string | React.ReactNode;
  currency?: string;
  persistCart?: boolean;
  storageKey?: string;
  
  // WhatsApp Order
  whatsappOrderNumber?: string;
  otherInfo?: OtherInfo;
  
  // Callbacks
  onAddToCart?: (item: CartItem) => void;
  onRemoveFromCart?: (itemId: string) => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onCheckout?: (checkoutData: CheckoutData) => void;
  onProductClick?: (product: Product) => void;
  
  // Styling
  className?: string;
  gridClassName?: string;
  children?: React.ReactNode;
  id?: string;
  funcss?: string;
  fullWidth?: boolean;
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
    heroTitle = 'Our Products',
    heroDescription = 'Discover our amazing collection of products',
    heroBackgroundImage = '',
    overlayColor = 'primary',
    overlayOpacity = 0.6,
    overlayGradient = false,
    gradientDirection = 'to-bottom',
    invertGradient = false,
    showHeader = true,
    showSearch = true,
    showFilters = true,
    showCart = true,
    showHero = true,
    titleSize = 'big',
    titleColor = 'white',
    descriptionSize = 'lg',
    descriptionColor = 'white',
    descriptionOpacity = 0.8,
    cartBadgeColor = 'error',
    cartBadgeText,
    checkoutText = 'Checkout',
    checkoutIcon,
    currency = '$',
    persistCart = true,
    storageKey = 'funui_cart',
    whatsappOrderNumber,
    otherInfo,
    onAddToCart,
    onRemoveFromCart,
    onUpdateQuantity,
    onCheckout,
    onProductClick,
    className = '',
    gridClassName = '',
    children,
    id,
    heroAlign = 'center',
    funcss = '',
    heroHeight = '400px',
    fullWidth = false,
    itemsPerPage = 10,
  } = final;

  // Mobile state
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parse otherInfo
  const parsedOtherInfo = useMemo(() => {
    if (!otherInfo) return [];
    
    try {
      if (typeof otherInfo === 'string') {
        return JSON.parse(otherInfo) as UserInfoField[];
      }
      return otherInfo as UserInfoField[];
    } catch (error) {
      console.error('Error parsing otherInfo:', error);
      return [];
    }
  }, [otherInfo]);

  // Checkout state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [userInfoData, setUserInfoData] = useState<Record<string, string>>({});
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Loading state - track bucket loading and initial load
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Use bucket data if bucket prop is provided
  const { records: bucketRecords, loading: bucketLoading } = usePaginatedRecords(
    bucket || '',
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
          price: discountedVariants[0]?.price || product.price,
          comparePrice: discountedVariants[0]?.comparePrice || product.comparePrice
        };
      } else {
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
          discount: variant.discount || discount
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

  // Parse and process products
  const parsedProducts = React.useMemo(() => {
    let productList: Product[];
    
    if (bucket && bucketProducts) {
      console.log(`Using ${bucketProducts.length} products from bucket: ${bucket}`);
      productList = bucketProducts.map((product, index) => ({
        ...product,
        id: product.id || `bucket_product_${index}_${Date.now()}`,
      }));
    } else {
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
      
      productList = applyDiscounts(productList);
    }
    
    return productList.map((product, index) => ({
      ...product,
      id: product.id || `product_${index}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }));
  }, [products, bucket, bucketProducts, applyDiscounts]);

  // Handle loading state separately
  useEffect(() => {
    if (bucket) {
      if (!bucketLoading && bucketProducts !== undefined) {
        const timer = setTimeout(() => {
          setIsInitialLoading(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
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

  // Get brands based on selected category
  const brands = useMemo(() => {
    if (showLoading) return ['all'];
    
    let filteredProducts = parsedProducts;
    
    // If a category is selected, filter by it
    if (selectedCategory !== 'all') {
      filteredProducts = parsedProducts.filter(p => p.category === selectedCategory);
    }
    
    const allBrands = filteredProducts
      .map(p => p.brand)
      .filter((brand): brand is string => typeof brand === 'string' && brand.trim() !== '');
    
    return ['all', ...Array.from(new Set(allBrands))];
  }, [parsedProducts, selectedCategory, showLoading]);

  // Get colors based on selected category and brand
  const colors = useMemo(() => {
    if (showLoading) return ['all'];
    
    let filteredProducts = parsedProducts;
    
    // If a category is selected, filter by it
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
    }
    
    // If a brand is selected, filter by it
    if (selectedBrand !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.brand === selectedBrand);
    }
    
    const allColors: string[] = [];
    filteredProducts.forEach(product => {
      product.colors?.forEach((color: any) => {
        if (!allColors.includes(color.name)) {
          allColors.push(color.name);
        }
      });
    });
    return ['all', ...allColors];
  }, [parsedProducts, selectedCategory, selectedBrand, showLoading]);

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

  // Reset dependent filters when parent filter changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setSelectedBrand('all');
      setSelectedColor('all');
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedBrand === 'all') {
      setSelectedColor('all');
    }
  }, [selectedBrand]);

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

  // Create WhatsApp message
  const createWhatsAppMessage = useCallback((cartItems: CartItem[], userInfo: Record<string, string> = {}): string => {
    const lines: string[] = [];
    
    // Order summary header
    lines.push('🛒 *ORDER SUMMARY*');
    lines.push('');
    
    // List products
    cartItems.forEach((item, index) => {
      const productName = item.product.name;
      const variantInfo = item.variant ? ` (${item.variant.name})` : '';
      const options = [];
      if (item.selectedColor) options.push(`Color: ${item.selectedColor}`);
      if (item.selectedSize) options.push(`Size: ${item.selectedSize}`);
      const optionsText = options.length > 0 ? ` [${options.join(', ')}]` : '';
      const price = item.variant?.price || item.product.price;
      const total = price * item.quantity;
      
      lines.push(`${index + 1}. ${productName}${variantInfo}${optionsText}`);
      lines.push(`   Quantity: ${item.quantity}`);
      lines.push(`   Price: ${currency}${price.toFixed(2)} each`);
      lines.push(`   Total: ${currency}${total.toFixed(2)}`);
      lines.push('');
    });
    
    // Cart totals
    const subtotal = cartItems.reduce((sum, item) => {
      const price = item.variant?.price || item.product.price;
      return sum + (price * item.quantity);
    }, 0);
    
    lines.push('---');
    lines.push(`*Subtotal:* ${currency}${subtotal.toFixed(2)}`);
    lines.push(`*Total Items:* ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}`);
    lines.push('');
    
    // User information
    if (Object.keys(userInfo).length > 0) {
      lines.push('👤 *CUSTOMER INFORMATION*');
      lines.push('');
      Object.entries(userInfo).forEach(([key, value]) => {
        if (value.trim()) {
          const label = key.charAt(0).toUpperCase() + key.slice(1);
          lines.push(`*${label}:* ${value}`);
        }
      });
      lines.push('');
    }
    
    // Footer
    lines.push('Thank you for your order!');
    
    return encodeURIComponent(lines.join('\n'));
  }, [currency]);

  // Handle checkout
  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;
    
    // If there's otherInfo to collect, show modal
    if (parsedOtherInfo.length > 0) {
      setShowCheckoutModal(true);
    } else {
      // No additional info needed, proceed directly
      proceedToWhatsAppOrCallback({});
    }
  }, [cart, parsedOtherInfo]);

  // Proceed with checkout (either to WhatsApp or callback)
  const proceedToWhatsAppOrCallback = useCallback((userInfo: Record<string, string>) => {
    const checkoutData: CheckoutData = {
      cartItems: cart,
      totalAmount: subtotal,
      userInfo
    };
    
    // Call the onCheckout callback if provided
    if (onCheckout) {
      onCheckout(checkoutData);
    }
    
    // If WhatsApp number is provided, create WhatsApp message
    if (whatsappOrderNumber) {
      const message = createWhatsAppMessage(cart, userInfo);
      const whatsappUrl = `https://wa.me/${whatsappOrderNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
    
    // Clear cart and close modals
    if (persistCart) {
      clearCart();
    }
    setShowCheckoutModal(false);
    setIsCartOpen(false);
    setUserInfoData({});
  }, [cart, subtotal, onCheckout, whatsappOrderNumber, createWhatsAppMessage, persistCart, clearCart]);

  // Handle user info form submission
  const handleUserInfoSubmit = useCallback(() => {
    setCheckoutLoading(true);
    
    // Validate required fields
    const missingFields = parsedOtherInfo
      .filter(field => field.required && !userInfoData[field.infoName]?.trim())
      .map(field => field.label || field.infoName);
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      setCheckoutLoading(false);
      return;
    }
    
    setTimeout(() => {
      proceedToWhatsAppOrCallback(userInfoData);
      setCheckoutLoading(false);
    }, 500);
  }, [parsedOtherInfo, userInfoData, proceedToWhatsAppOrCallback]);

  // Update user info
  const handleUserInfoChange = useCallback((fieldName: string, value: string) => {
    setUserInfoData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

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

  // Helper function to get color with opacity
  const getColorWithOpacity = useCallback((color: string, opacity: number): string => {
    // Try to get CSS variable value first
    const cssVariableValue = getCssVariableValue(color);

    
    // If getCssVariableValue returns a different value than input, 
    // it means the color was a CSS variable (like "primary", "dark", etc.)
    const colorValue = cssVariableValue && cssVariableValue !== color ? cssVariableValue : color;
    
    // Check if color is already in rgba format
    const rgbaMatch = colorValue.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (rgbaMatch) {
      const [, r, g, b] = rgbaMatch;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    // Check if color is in rgb format
    const rgbMatch = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    // Check if color is hex format
    if (colorValue.startsWith('#')) {
      const hex = colorValue.replace('#', '');
      let r, g, b;
      
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }
      
      if (r !== undefined && g !== undefined && b !== undefined) {
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
    }
    
    // For named colors that don't match patterns above, return as-is
    // CSS will handle the opacity via the opacity property
    return colorValue;
  }, []);

  // Create overlay style based on gradient settings
// Create overlay style based on gradient settings
  const getOverlayStyle = useCallback(() => {
    // Get the actual color value (resolve CSS variables)
    const cssVariableValue = getCssVariableValue(overlayColor);
    const resolvedColor = cssVariableValue && cssVariableValue !== overlayColor 
      ? cssVariableValue 
      : overlayColor;
    
    if (!overlayGradient) {
      // Solid overlay
      return {
        backgroundColor: resolvedColor,
        opacity: overlayOpacity,
      };
    }
    
    // For gradient overlay, create color with opacity
    const colorWithOpacity = getColorWithOpacity(resolvedColor, overlayOpacity);
    
    // Build gradient direction
    const direction = gradientDirection.replace('to-', 'to ');
    
    if (invertGradient) {
      // From transparent to color
      return {
        background: `linear-gradient(${direction}, transparent 0%, ${colorWithOpacity} 100%)`,
      };
    } else {
      // From color to transparent
      return {
        background: `linear-gradient(${direction}, ${colorWithOpacity} 0%, transparent 100%)`,
      };
    }
  }, [overlayGradient, gradientDirection, invertGradient, overlayColor, overlayOpacity, getColorWithOpacity]);
  // Create accordion items for filters
  const filterAccordionItems = useMemo(() => [
    {
      icon: <PiList className='text-primary' size={20} />,
      title: 'Categories',
      content: (
        <Div funcss="filter-options">
          {categories.map(cat => (
            <div 
              key={cat} 
              className={`filter-option ${selectedCategory === cat ? 'primary100 text-primary' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat === 'all') {
                  setSelectedBrand('all');
                  setSelectedColor('all');
                }
              }}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </div>
          ))}
        </Div>
      ),
    },
    {
      icon: <PiUserCircle className='text-primary' size={20} />,
      title: 'Brands',
      content: (
        <Div funcss="filter-options">
          {brands.map(brand => (
            <div 
              key={brand} 
              className={`filter-option ${selectedBrand === brand ? 'primary100 text-primary' : ''}`}
              onClick={() => {
                setSelectedBrand(brand);
                if (brand === 'all') {
                  setSelectedColor('all');
                }
              }}
              style={{
                opacity: selectedCategory === 'all' && brand !== 'all' ? 0.5 : 1,
                pointerEvents: selectedCategory === 'all' && brand !== 'all' ? 'none' : 'auto'
              }}
            >
              {brand === 'all' ? 'All Brands' : brand}
              {selectedCategory === 'all' && brand !== 'all' && (
                <small className="text-muted" style={{fontSize: '0.7rem', display: 'block'}}>
                  (Select category first)
                </small>
              )}
            </div>
          ))}
        </Div>
      ),
    },
    {
      icon: <PiHandTap className='text-primary' size={20} />,
      title: 'Colors',
      content: (
        <Div funcss="filter-options">
          {colors.map(color => (
            <div 
              key={color} 
              className={`filter-option ${selectedColor === color ? 'primary100 text-primary' : ''}`}
              onClick={() => setSelectedColor(color)}
              style={{
                opacity: (selectedCategory === 'all' || selectedBrand === 'all') && color !== 'all' ? 0.5 : 1,
                pointerEvents: (selectedCategory === 'all' || selectedBrand === 'all') && color !== 'all' ? 'none' : 'auto'
              }}
            >
              {color === 'all' ? 'All Colors' : color}
              {(selectedCategory === 'all' || selectedBrand === 'all') && color !== 'all' && (
                <small className="text-muted" style={{fontSize: '0.7rem', display: 'block'}}>
                  (Select category & brand first)
                </small>
              )}
            </div>
          ))}
        </Div>
      ),
    },
  ], [categories, brands, colors, selectedCategory, selectedBrand, selectedColor]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedColor('all');
    setSearchQuery('');
  }, []);

  return (
    <Div 
      funcss={`${className} ${funcss}`}
      id={id}
    >
      {/* Hero Section */}
      {showHero && (
        <Div 
          funcss="store-hero-section"
          customStyle={{
            backgroundImage: heroBackgroundImage ? `url(${heroBackgroundImage})` : 'none',
            backgroundColor: heroBackgroundImage ? undefined : 'var(--lighter)',
            height: heroHeight,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div 
            className="hero-overlay fit"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              ...getOverlayStyle(),
            }}
          />
          <div
            className={`hero-content text-${heroAlign || 'center'} relative z-10`}
            style={{
              padding: '2rem',
              width: '100%',
            }}
          >
            <Text 
              text={heroTitle || title} 
              size={titleSize}
              color={titleColor}
              block
              bold
            />
            <Text 
              text={heroDescription} 
              size={descriptionSize}
              color={descriptionColor}
              opacity={descriptionOpacity}
            />
          </div>
        </Div>
      )}

      <View 
        funcss="pt-10  pl-5 pr-5 center" 
        fit  
        style={{
          maxWidth: "1500px"
        }}
      >
        <Flex width='100%' justify='center' gap={2}>
          {/* Desktop Filters Sidebar */}
          {showFilters && !isMobile && (
            <View funcss="w-200">
              <RowFlex justify="space-between" funcss='bb mb' alignItems="center">
                <Text text="Filters" size="h5" />
                <Button
                  text="Clear"
                  onClick={clearFilters}
                  small
                  bg="lighter"
                  startIcon={<PiX />}
                />
              </RowFlex>
              
              <Accordion
              border={false}
              funcss='bg borderless'
                items={filterAccordionItems}
                allowMultiple={true}
                titleClass="text-sm"
                contentClass="text-sm"
              />
            </View>
          )}

          {/* Main Content Area */}
          <div className='col fit'>
            {/* Mobile Filters Button */}
            {showFilters && isMobile && (
              <Div funcss="mobile-filters-button mb-4">
                <Button
                  startIcon={<PiFunnel />}
                  text="Filters"
                  onClick={() => setShowMobileFilters(true)}
                  bg="light"
                  color="text"
                  raised
                  funcss="w-full"
                />
              </Div>
            )}
            
            <Flex gap={1} width='100%' funcss='mb-4' justify='space-between'>
              {/* Search */}
              {showSearch && (
                <div className="w-400">
                  <Input
                    label="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startIcon={<PiMagnifyingGlass />}
                    borderless 
                  />
                </div>
              )}
              
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
                      className="cart-badge error"
                      style={{ backgroundColor: cartBadgeColor }}
                    >
                      {cartBadgeText || (totalItems > 99 ? '99+' : totalItems)}
                    </div>
                  )}
                </button>
              )}
            </Flex>

            {/* Loading State */}
            {showLoading ? (
              <Div funcss="
              funui_products_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              ">
              {
                [1,2,3,4,5,6,7,8,9,10,11,12].map((index) => (
                 <div  key={index}>
                   <ProductLoader />
                 </div>
                ))
              }
              </Div>
            ) : (
              <>
          

                {/* Products Grid */}
                {currentProducts.length === 0 ? (
                  <Div funcss="">
                    <Empty 
                      title='No products found'
                      ctaIcon={<PiSpinnerGap />}
                      ctaText='Reset Filters'
                      ctaOnClick={clearFilters}
                    />
                  </Div>
                ) : (
                  <>
                    <Div
                    margin='2rem 0'
                      funcss={`funui_products_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${gridClassName}`}
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
                      <Flex width='100%' justify='center' gap={0.5} funcss="mt-8">
                        <Button
                          startIcon={<PiCaretLeft />}
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          text="Prev"
                          small
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
                          text="Next"
                          small
                        />
                      </Flex>
                    )}
                  </>
                )}

                {children}
              </>
            )}
          </div>
        </Flex>
      </View>

      {/* Mobile Filters Modal */}
      {showFilters && isMobile && (
        <Modal
          animation="slideUp"
          open={showMobileFilters}
          setOpen={setShowMobileFilters}
          title={
            <RowFlex justify="space-between" alignItems="center">
              <Text text="Filters" size="h5" />
              <Button
                text="Clear All"
                onClick={clearFilters}
                small
                bg="transparent"
                color="text-light"
              />
            </RowFlex>
          }
          body={
            <Div funcss="p-4">
              <Accordion
                items={filterAccordionItems}
                allowMultiple={true}
                titleClass="text-sm"
                contentClass="text-xs"
                activeClass=""
                funcss='card'
              />
            </Div>
          }
          footer={
            <Div funcss="p-4">
              <Button
                text="Apply Filters"
                onClick={() => setShowMobileFilters(false)}
                bg="primary"
                color="white"
                raised
                funcss="w-full"
              />
            </Div>
          }
        />
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
          persistCart={persistCart}
        />
      )}

      {/* Checkout Modal for Additional Information */}
      {showCheckoutModal && (
        <Modal
          animation="fadeIn"
          open={showCheckoutModal}
          setOpen={setShowCheckoutModal}
          maxWidth='550px'
          title={
            <>
              {whatsappOrderNumber ? (
                <>
                  <Text text="Complete Your Order" size="xl" block />
                  <Text 
                    text="Please provide the following information to complete your order:" 
                    size="sm"
                  />
                </>
              ) : (
                <Text text="Order Information" size="xkl" />
              )}
            </>
          }
          body={
            <Div funcss="p-8">
              {parsedOtherInfo.map((field, index) => (
                <Div key={index} funcss="section">
                  <Input
                    label={`${field.label || field.infoName}${field.required ? ' *' : ''}`}
                    type={field.type === 'textarea' ? 'text' : field.type}
                    multiline={field.type === 'textarea'}
                    rows={field.type === 'textarea' ? 3 : undefined}
                    value={userInfoData[field.infoName] || ''}
                    onChange={(e) => handleUserInfoChange(field.infoName, e.target.value)}
                    bordered
                    fullWidth
                  />
                </Div>
              ))}
            </Div>
          }
          footer={
            <Div funcss="">
              <RowFlex justify="center" alignItems="center">
                <Button
                  prefix={<PiX />}
                  text="Cancel"
                  onClick={() => {
                    setShowCheckoutModal(false);
                    setUserInfoData({});
                  }}
                  bg="error-light"
                  color="error"
                />
                <Button
                  text={whatsappOrderNumber ? "Send via WhatsApp" : "Complete Order"}
                  bg="primary"
                  raised
                  onClick={handleUserInfoSubmit}
                  funcss="padding-x-30"
                  startIcon={whatsappOrderNumber ? <PiWhatsappLogo /> : checkoutIcon}
                  isLoading={checkoutLoading}
                  disabled={checkoutLoading}
                />
              </RowFlex>
            </Div>
          }
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
