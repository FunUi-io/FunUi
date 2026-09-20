'use client';
import React, { useState, useEffect } from 'react';
import { getCssVariableValue } from '../../utils/getCssVariable';
import { useComponentConfiguration } from '../../utils/componentUtils';
import Text from '../text/Text';
import Button from '../button/Button';
import { getDynamicIcon } from '../../utils/getDynamicIcon';
import Carousel from '../carousel/Carousel';
import { usePaginatedRecords } from '../theme/theme';
import { PiStarFill, PiStarHalf, PiStar } from 'react-icons/pi';

type ContentItem = {
  // Common fields
  icon?: string | React.ReactNode;
  iconColor?: string;
  iconSize?: number;
  
  title?: React.ReactNode;
  description?: React.ReactNode;
  
  imageUrl?: string;
  imageAlt?: string;
  
  className?: string;
  style?: React.CSSProperties;
  
  // For testimonials
  customerName?: string;
  company?: string;
  avatar?: string;
  role?: string;
  project?: string;
  rating?: number;
  date?: string;
  featured?: boolean;
  content?: string; // Rich text content
};

// Carousel-specific props
interface CarouselOptions {
  isCarousel?: boolean;
  scrollNumber?: number;
  gap?: number;
  carouselFuncss?: string;
  showDashes?: boolean;
}

// Simplified props
type FeatureProps = {
  variant?: string;
  
  layout?: 'checklist' | 'centered' | 'grid';
  
  title?: React.ReactNode;
  titleSize?: 'base' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  titleColor?: string;
  titleAlign?: 'left' | 'center' | 'right';
  
  subtitle?: React.ReactNode;
  subtitleSize?: 'base' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  subtitleColor?: string;
  
  description?: React.ReactNode;
  descriptionSize?: 'base' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  descriptionColor?: string;
  
  // Data source
  isTestimonial?: boolean;
  items?: ContentItem[] | string;
  bucket?: string;
  bucketPage?: number;
  bucketSize?: number;
  
  // Display settings
  gap?: number;
  itemMaxWidth?: string;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  
  // Item styling
  card?: boolean;
  cardPadding?: string;
  cardRounded?: string;
  cardShadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  cardClassName?: string;
  
  // Icon settings
  iconColor?: string;
  iconSize?: number;
  
  // Text sizing
  itemTitleSize?: 'base' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  itemDescriptionSize?: 'base' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  
  // Testimonial specific
  showStars?: boolean;
  ratingIcon?: string;
  starColor?: string;
  showQuote?: boolean;
  quoteIcon?: string | React.ReactNode;
  quoteColor?: string;
  showDate?: boolean;
  showCompany?: boolean;
  showRole?: boolean;
  showCTA?: boolean;
  
  // Content limit
  contentLimit?: number;
  showExpand?: boolean;
  expandText?: string;
  collapseText?: string;
  
  // CTA
  ctaText?: string;
  ctaUrl?: string;
  ctaBg?: string;
  ctaAlign?: 'left' | 'center' | 'right';
  
  // Styling
  padding?: string;
  className?: string;
  containerClassName?: string;
  maxWidth?: string;
  id?: string;
  funcss?: string;
} & CarouselOptions;

const useDynamicIcon = (iconString?: string) => {
  const [iconNode, setIconNode] = useState<React.ReactNode>(null);
  const [hasValidIcon, setHasValidIcon] = useState(false);

  useEffect(() => {
    if (!iconString || typeof iconString !== 'string' || iconString.trim() === '') {
      setIconNode(null);
      setHasValidIcon(false);
      return;
    }

    getDynamicIcon(iconString).then((node) => {
      if (node) {
        setIconNode(node);
        setHasValidIcon(true);
      } else {
        setIconNode(null);
        setHasValidIcon(false);
      }
    });
  }, [iconString]);

  return { iconNode, hasValidIcon };
};

// Type-safe icon component with size prop
interface IconProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: any;
}

// Dynamic Icon Component with proper typing
const DynamicIcon: React.FC<{
  icon?: string | React.ReactNode;
  color?: string;
  size?: number;
}> = ({ icon, color, size = 24 }) => {
  const isStringIcon = icon && typeof icon === 'string';
  const { iconNode, hasValidIcon } = useDynamicIcon(isStringIcon ? icon as string : undefined);

  const getIconColorStyle = (): React.CSSProperties => {
    if (!color) return {};
    
    const cssValue = getCssVariableValue(color);
    if (cssValue && cssValue !== color) {
      return { color: cssValue };
    }
    
    return { color };
  };

  if (icon && typeof icon !== 'string' && React.isValidElement(icon)) {
    // Handle React element icons
    const iconElement = icon as React.ReactElement<IconProps>;
    return React.cloneElement(iconElement, {
      size,
      style: { ...getIconColorStyle(), ...iconElement.props.style },
    });
  }
  
  if (isStringIcon && hasValidIcon && iconNode && React.isValidElement(iconNode)) {
    // Handle dynamically loaded icons
    const dynamicIconElement = iconNode as React.ReactElement<IconProps>;
    const newProps: IconProps = {
      size,
      style: getIconColorStyle(),
    };
    
    // Preserve existing props
    if (dynamicIconElement.props.className) {
      newProps.className = dynamicIconElement.props.className;
    }
    
    return React.cloneElement(dynamicIconElement, newProps);
  }
  
  return null;
};

// Star Rating Component with dynamic icon
const StarRating: React.FC<{
  rating: number;
  icon?: string;
  color?: string;
  size?: number;
}> = ({ rating, icon = 'PiStar', color = 'warning', size = 16 }) => {
  const [ratingIconNode, setRatingIconNode] = useState<React.ReactNode>(null);
  
  const { iconNode } = useDynamicIcon(icon);
  
  useEffect(() => {
    if (iconNode) {
      setRatingIconNode(iconNode);
    }
  }, [iconNode]);

const renderIcon = (type: 'empty' | 'half' | 'full', index: number) => {
  const colorValue = getCssVariableValue(color) || color;
  const emptyColor = 'var(--muted)';
  
  // If we have a dynamic icon and it's not empty
  if (ratingIconNode && React.isValidElement(ratingIconNode) && type !== 'empty') {
    const iconElement = ratingIconNode as React.ReactElement;
    
    // Create a new props object
    const newProps: any = {
      key: index,
      style: { 
        color: colorValue,
        ...(iconElement.props as any).style 
      }
    };
    
    // Add size prop if it exists
    if (size !== undefined) {
      newProps.size = size;
    }
    
    return React.cloneElement(iconElement, newProps);
  }
  
  // For empty stars or fallback, use PiStar icons
  if (type === 'full') {
    return <PiStarFill key={index} size={size} style={{ color: colorValue }} />;
  } else if (type === 'half') {
    return <PiStarHalf key={index} size={size} style={{ color: colorValue }} />;
  } else {
    return <PiStar key={index} size={size} style={{ color: emptyColor }} />;
  }
};

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(renderIcon('full', i));
    } else if (hasHalfStar && i === fullStars + 1) {
      stars.push(renderIcon('half', i));
    } else {
      stars.push(renderIcon('empty', i));
    }
  }
  
  return (
    <div className="star-rating" style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {stars}
    </div>
  );
};

// Helper function to convert shorthand flex values
const convertFlexValue = (value?: string): string | undefined => {
  if (!value) return undefined;
  
  const flexMap: Record<string, string> = {
    'start': 'flex-start',
    'end': 'flex-end',
    'center': 'center',
    'between': 'space-between',
    'around': 'space-around',
  };
  
  return flexMap[value] || value;
};

// Format date
const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

// Truncate HTML content safely
const truncateHtml = (html: string, maxLength: number): { truncated: string; isTruncated: boolean } => {
  if (!html) return { truncated: '', isTruncated: false };
  
  // Strip HTML tags for length calculation
  const text = html.replace(/<[^>]*>/g, '');
  
  if (text.length <= maxLength) {
    return { truncated: html, isTruncated: false };
  }
  
  // Truncate text
  const truncatedText = text.substring(0, maxLength) + '...';
  return { truncated: truncatedText, isTruncated: true };
};

const Feature: React.FC<FeatureProps> = (localProps) => {
  const { mergeWithLocal } = useComponentConfiguration('Feature', localProps.variant);
  const { props: mergedProps } = mergeWithLocal(localProps);
  const final = mergedProps;

  const [itemsArray, setItemsArray] = useState<ContentItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  
  // Use bucket data if bucket is provided
  const { records: bucketRecords, loading: bucketLoading } = usePaginatedRecords(
    final.bucket || '',
    final.bucketPage || 1,
    final.bucketSize || 50
  );
  
  // Parse items from props or bucket
  useEffect(() => {
    const parseItems = () => {
      if (final.bucket && bucketRecords) {
        // Map bucket records to content format
        const mappedItems = bucketRecords.map((record: any) => {
          const values = record.values || record;
          
          if (final.isTestimonial) {
            return {
              customerName: values.customerName || values.name || values.customer,
              company: values.company || values.organization,
              avatar: values?.avatar?.url || values.imageUrl || values.photo,
              content: values.content || values.testimonial || values.description,
              rating: values.rating || values.stars || 5,
              role: values.role || values.position,
              project: values.project || values.service,
              date: values.date || values.createdAt,
              featured: values.featured || values.highlighted || false,
              title: values.customerName || values.name,
              description: values.content || values.testimonial,
              imageUrl: values.avatar || values.imageUrl,
              icon: final.quoteIcon || 'PiQuotes',
              iconColor: final.quoteColor || 'primary'
            };
          } else {
            return {
              title: values.title || values.name,
              description: values.description || values.content,
              icon: values.icon,
              iconColor: values.iconColor,
              imageUrl: values.imageUrl || values.avatar?.url,
              ...values
            };
          }
        });
        setItemsArray(mappedItems);
      } else if (typeof final.items === 'string') {
        try {
          const parsed = JSON.parse(final.items);
          setItemsArray(Array.isArray(parsed) ? parsed : [parsed]);
        } catch (error) {
          console.error('Error parsing items JSON:', error);
          setItemsArray([]);
        }
      } else if (Array.isArray(final.items)) {
        setItemsArray(final.items);
      } else {
        setItemsArray([]);
      }
    };
    
    parseItems();
  }, [final.items, final.isTestimonial, final.bucket, bucketRecords, final.quoteIcon, final.quoteColor]);

  // Toggle expanded state for an item
  const toggleExpand = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const renderItem = (item: ContentItem, index: number) => {
    const isExpanded = expandedItems.has(index);
    const contentLimit = final.contentLimit || 150;
    
    // Get content to display
    let displayContent = item.description || item.content || '';
    let isTruncated = false;
    
    if (typeof displayContent === 'string' && displayContent.length > contentLimit && !isExpanded) {
      const { truncated, isTruncated: truncatedFlag } = truncateHtml(displayContent, contentLimit);
      displayContent = truncated;
      isTruncated = truncatedFlag;
    }
    
    // Item content
    const itemContent = (
      <>
        {/* Quote icon for testimonials */}
        {final.isTestimonial && final.showQuote && (
          <div className="feature__quote-icon" style={{ marginBottom: '1rem' }}>
            {React.isValidElement(final.quoteIcon) ? final.quoteIcon : (
              <DynamicIcon 
                icon={final.quoteIcon || 'PiQuotes'} 
                color={final.quoteColor} 
                size={final.iconSize} 
              />
            )}
          </div>
        )}
        
        {/* Icon or Image */}
        {(item.icon || item.imageUrl) && !final.isTestimonial && (
          <div className="feature__icon-container" style={{ marginBottom: '1rem' }}>
            {item.imageUrl ? (
              <img 
                src={item.imageUrl} 
                alt={item.imageAlt || ''} 
                className="feature__image"
                style={{
                  width: `${final.iconSize || 24}px`,
                  height: `${final.iconSize || 24}px`,
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <DynamicIcon 
                icon={item.icon} 
                color={item.iconColor || final.iconColor} 
                size={final.iconSize} 
              />
            )}
          </div>
        )}
        
        {/* Title */}
        {item.title && (
          <Text 
            block
            size={final.itemTitleSize || 'lg'}
            weight={600}
            color="default"
            style={{ marginBottom: '0.75rem' }}
          >
            {item.title}
          </Text>
        )}
        
        {/* Content/Description */}
        {(item.description || item.content) && (
          <>
            <Text 
              block
              size={final.itemDescriptionSize || 'base'}
              weight={400}
              color="muted"
              dangerouslySetInnerHTML
              text={displayContent}
            />
            
            {/* Expand/collapse button */}
            {isTruncated && final.showExpand && (
              <button
                onClick={() => toggleExpand(index)}
                className="feature__expand-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  padding: 0,
                  textDecoration: 'underline'
                }}
              >
                {isExpanded ? (final.collapseText || 'Show less') : (final.expandText || 'Read more')}
              </button>
            )}
          </>
        )}
        
        {/* Testimonial specific info */}
        {final.isTestimonial && (
          <div className="feature__testimonial-info" style={{ marginTop: '1rem' }}>
            {/* Star rating */}
            {final.showStars && item.rating && (
              <div style={{ marginBottom: '0.5rem' }}>
                <StarRating 
                  rating={item.rating} 
                  icon={final.ratingIcon}
                  color={final.starColor} 
                  size={16} 
                />
              </div>
            )}
            
            {/* Customer info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {item.avatar && (
                <img 
                  src={item.avatar} 
                  alt={item.customerName || 'Customer'}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              )}
              
              <div>
                {item.customerName && (
                  <Text block size="sm" weight={600} style={{ marginBottom: '0.25rem' }}>
                    {item.customerName}
                  </Text>
                )}
                
                {/* Metadata */}
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {item.role && final.showRole && <span>{item.role}</span>}
                  {item.company && final.showCompany && (
                    <span>{item.role ? ' at ' : ''}{item.company}</span>
                  )}
                  {item.date && final.showDate && <span> • {formatDate(item.date)}</span>}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* CTA for regular features */}
        {!final.isTestimonial && final.showCTA && final.ctaText && (
          <div style={{ marginTop: '1rem' }}>
            <Button
              url={final.ctaUrl}
              color="primary"
              text={final.ctaText}
              funcss='p-0'
            />
          </div>
        )}
      </>
    );
    
    // Apply card styling if enabled
    if (final.card) {
      const shadowValue = final.cardShadow !== 'none' ? 
        getCssVariableValue(`shadow-${final.cardShadow}`) || undefined : 
        undefined;
      
      return (
        <div 
          key={index}
          className={`feature__card ${final.cardClassName || ''}`}
          style={{
            padding: final.cardPadding || '1.5rem',
            borderRadius: final.cardRounded || '0.5rem',
            boxShadow: shadowValue,
            border: '1px solid var(--borderRgb)',
            height: '100%',
            maxWidth: final.itemMaxWidth || '100%',
            ...item.style
          }}
        >
          {itemContent}
        </div>
      );
    }
    
    // Regular item without card
    return (
      <div 
        key={index}
        className="feature__item"
        style={{ 
          maxWidth: final.itemMaxWidth || '100%',
          ...item.style 
        }}
      >
        {itemContent}
      </div>
    );
  };

  const renderFlexItems = () => {
    if (itemsArray.length === 0) return null;

    const gapValue = final.gap !== undefined ? `${final.gap * 0.25}rem` : '2rem';

    if (final.layout === 'centered') {
      const maxWidth = final.maxWidth || '48rem';
      return (
        <div 
          className="feature__centered-container"
          style={{ 
            maxWidth,
            margin: '0 auto',
          }}
        >
          {itemsArray.map((item, index) => renderItem(item, index))}
        </div>
      );
    }

    // Use Flex layout
    return (
      <div 
        className="feature__flex-container"
        style={{
          display: 'flex',
          flexWrap: final.wrap !== false ? 'wrap' : 'nowrap',
          gap: gapValue,
          alignItems: convertFlexValue(final.align) || 'stretch',
          justifyContent: convertFlexValue(final.justify) || 'flex-start',
          maxWidth: final.maxWidth || '100%',
          margin: '0 auto',
        }}
      >
        {itemsArray.map((item, index) => (
          <div key={index} className="feature__flex-item" style={{ flex: '1 1 300px' }}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    );
  };

  const renderCarouselItems = () => {
    if (itemsArray.length === 0) return null;

    // Prepare carousel items
    const carouselItems = itemsArray.map((item, index) => renderItem(item, index));

    return (
      <div className="feature__carousel-container">
        <Carousel
          scrollNumber={final.scrollNumber || 320}
          gap={final.gap || 1}
          funcss={final.carouselFuncss}
          showDashes={final.showDashes !== false}
        >
          {carouselItems}
        </Carousel>
      </div>
    );
  };

  const renderContent = () => {
    if (itemsArray.length === 0) return null;

    // Use carousel if isCarousel is true
    if (final.isCarousel) {
      return renderCarouselItems();
    }

    // Otherwise use flex layout
    return renderFlexItems();
  };

  return (
    <section
      id={final.id}
      className={`feature-section ${final.className || ''} ${final.funcss || ''}`}
      style={{
        padding: final.padding || '3rem 0',
      }}
    >
      <div 
        className={`feature__container ${final.containerClassName || ''}`}
        style={{
          maxWidth: final.maxWidth || '1280px',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        {/* Header */}
        {(final.title || final.subtitle || final.description) && (
          <div 
            className="feature__header"
            style={{
              marginBottom: '3rem',
              maxWidth: final.layout === 'centered' ? '48rem' : '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: final.titleAlign || 'center',
            }}
          >
            {final.subtitle && (
              <Text 
                block
                size={final.subtitleSize || 'sm'}
                weight={600}
                color={final.subtitleColor || 'primary'}
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                }}
              >
                {final.subtitle}
              </Text>
            )}
            
            {final.title && (
              <Text 
                block
                size={final.titleSize || 'xl'}
                weight={700}
                color={final.titleColor || 'default'}
                style={{ marginBottom: '1rem' }}
              >
                {final.title}
              </Text>
            )}
            
            {final.description && (
              <Text 
                block
                size={final.descriptionSize || 'base'}
                weight={400}
                color={final.descriptionColor || 'muted'}
              >
                {final.description}
              </Text>
            )}
          </div>
        )}
        
        {/* Items */}
        <div className="feature__content">
          {renderContent()}
          {final.children}
        </div>
        
        {/* Section CTA */}
        {final.ctaText && (
          <div 
            className="feature__cta-container"
            style={{
              marginTop: '2.5rem',
              textAlign: final.ctaAlign || 'center',
            }}
          >
            <Button
              url={final.ctaUrl}
              bg={final.ctaBg || 'primary'}
              text={final.ctaText}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Feature;

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { getCssVariableValue } from '../../utils/getCssVariable';
// import { useComponentConfiguration } from '../../utils/componentUtils';
// import Text from '../text/Text';
// import Button from '../button/Button';
// import { getDynamicIcon } from '../../utils/getDynamicIcon';
// import Carousel from '../carousel/Carousel'; // Import the Carousel component

// type FeatureItem = {
//   icon?: string | React.ReactNode;
//   iconColor?: string;
//   iconSize?: number;
//   iconClassName?: string;
  
//   title?: React.ReactNode;
//   titleSize?: string;
//   titleWeight?: number;
//   titleColor?: string;
//   titleClassName?: string;
  
//   description?: React.ReactNode;
//   descriptionSize?: string;
//   descriptionWeight?: number;
//   descriptionColor?: string;
//   descriptionClassName?: string;
  
//   imageUrl?: string;
//   imageAlt?: string;
//   imageClassName?: string;
//   imageStyle?: React.CSSProperties;
  
//   content?: React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties;
  
//   ctaText?: string;
//   ctaUrl?: string;
//   ctaOnClick?: () => void;
//   ctaClassName?: string;
  
//   customRender?: () => React.ReactNode;
// };

// // Carousel-specific props
// interface CarouselOptions {
//   isCarousel?: boolean;
  
//   // Carousel props
//   scrollNumber?: number;
//   gap?: number;
//   carouselFuncss?: string;
//   showDashes?: boolean;
//   allowVerticalOverflow?: boolean;
//   itemPadding?: string;
//   controlerSize?: number;
//   controlerIconSize?: number;
//   infiniteScroll?: boolean;
//   infiniteScrollSpeed?: number;
//   infiniteScrollDirection?: 'left' | 'right' | 'alternate';
  
//   // Carousel container styling
//   carouselContainerClassName?: string;
//   carouselContainerStyle?: React.CSSProperties;
// }

// type FeatureProps = {
//   variant?: string;
  
//   layout?: 'checklist' | 'centered' | 'grid';
  
//   title?: React.ReactNode;
//   titleSize?: string;
//   titleWeight?: number;
//   titleColor?: string;
//   titleClassName?: string;
//   titleAlign?: 'left' | 'center' | 'right';
  
//   subtitle?: React.ReactNode;
//   subtitleSize?: string;
//   subtitleWeight?: number;
//   subtitleColor?: string;
//   subtitleClassName?: string;
  
//   description?: React.ReactNode;
//   descriptionSize?: string;
//   descriptionWeight?: number;
//   descriptionColor?: string;
//   descriptionClassName?: string;
  
//   features?: FeatureItem[] | string;
  
//   gap?: number;
//   itemMaxWidth?: string;
//   align?: 'start' | 'center' | 'end' | 'stretch';
//   justify?: 'start' | 'center' | 'end' | 'between' | 'around';
//   wrap?: boolean;
  
//   card?: boolean;
//   cardPadding?: string;
//   cardRounded?: string;
//   cardShadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
//   cardBorder?: boolean;
//   cardBorderColor?: string;
//   cardHoverEffect?: 'lift' | 'glow' | 'scale' | 'none';
//   cardClassName?: string;
  
//   padding?: string;
//   className?: string;
//   style?: React.CSSProperties;
//   containerClassName?: string;
//   containerStyle?: React.CSSProperties;
  
//   iconColor?: string;
//   iconSize?: number;
//   iconClassName?: string;
  
//   itemTitleSize?: string;
//   itemTitleWeight?: number;
//   itemTitleColor?: string;
  
//   itemDescriptionSize?: string;
//   itemDescriptionWeight?: number;
//   itemDescriptionColor?: string;
  
//   checkmarkIcon?: string;
//   checkmarkColor?: string;
//   checkmarkSize?: number;
//   checkmarkClassName?: string;
  
//   ctaText?: string;
//   ctaUrl?: string;
//   ctaOnClick?: () => void;
//   ctaClassName?: string;
//   ctaAlign?: 'left' | 'center' | 'right';
//   ctaStringPrefix?: string;
//   ctaStringSuffix?: string;
//   ctaStartIcon?: React.ReactNode;
//   ctaEndIcon?: React.ReactNode;
//   ctaIconSize?: number;
//   ctaIsLoading?: boolean;
//   ctaStatus?: 'success' | 'warning' | 'info' | 'error';
//   ctaBg?: string;
  
//   children?: React.ReactNode;
  
//   id?: string;
  
//   funcss?: string;
//   sectionClass?: string;
  
//   maxWidth?: string;
// } & CarouselOptions; // Merge CarouselOptions into FeatureProps

// const useDynamicIcon = (iconString?: string) => {
//   const [iconNode, setIconNode] = useState<React.ReactNode>(null);
//   const [hasValidIcon, setHasValidIcon] = useState(false);

//   useEffect(() => {
//     if (!iconString || typeof iconString !== 'string' || iconString.trim() === '') {
//       setIconNode(null);
//       setHasValidIcon(false);
//       return;
//     }

//     getDynamicIcon(iconString).then((node) => {
//       if (node) {
//         setIconNode(node);
//         setHasValidIcon(true);
//       } else {
//         setIconNode(null);
//         setHasValidIcon(false);
//       }
//     });
//   }, [iconString]);

//   return { iconNode, hasValidIcon };
// };

// const FeatureIcon: React.FC<{
//   icon?: string | React.ReactNode;
//   iconColor?: string;
//   iconSize?: number;
//   iconClassName?: string;
//   layout?: string;
//   checklistIcon?: string;
//   checklistColor?: string;
//   checklistSize?: number;
//   checklistClassName?: string;
// }> = ({ 
//   icon, 
//   iconColor, 
//   iconSize = 24, 
//   iconClassName = '',
//   layout,
//   checklistIcon = 'PiCheck',
//   checklistColor = 'success',
//   checklistSize = 20,
//   checklistClassName = ''
// }) => {
//   const isStringIcon = icon && typeof icon === 'string';
//   const { iconNode: dynamicIconNode, hasValidIcon: hasValidDynamicIcon } = useDynamicIcon(
//     isStringIcon ? icon as string : undefined
//   );
  
//   const { iconNode: checkmarkIconNode, hasValidIcon: hasValidCheckmarkIcon } = useDynamicIcon(
//     layout === 'checklist' ? checklistIcon : undefined
//   );

//   const getIconColorStyle = (color?: string): React.CSSProperties => {
//     if (!color) return {};
    
//     if (color.startsWith('text-') || color.startsWith('bg-') || color.startsWith('border-')) {
//       return {};
//     }
    
//     const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
//     if (colorNames.includes(color)) {
//       const cssValue = getCssVariableValue(color);
//       if (cssValue) {
//         return { color: cssValue };
//       }
//     }
    
//     return { color };
//   };

//   const iconColorStyle = getIconColorStyle(iconColor);
//   const checklistColorStyle = getIconColorStyle(checklistColor);

//   const renderIconWithProps = (iconElement: React.ReactNode, className: string, style: React.CSSProperties, size?: number) => {
//     if (!React.isValidElement(iconElement)) return iconElement;
    
//     const props: any = {
//       className,
//       style: { ...style, ...(iconElement.props as any).style },
//     };
    
//     if (size !== undefined) {
//       props.size = size;
//     }
    
//     return React.cloneElement(iconElement, props);
//   };

//   if (icon && typeof icon !== 'string' && React.isValidElement(icon)) {
//     return renderIconWithProps(
//       icon,
//       `feature-section__icon ${iconClassName}`,
//       iconColorStyle,
//       iconSize
//     );
//   }
  
//   if (isStringIcon && hasValidDynamicIcon && dynamicIconNode) {
//     return renderIconWithProps(
//       dynamicIconNode,
//       `feature-section__icon ${iconClassName}`,
//       iconColorStyle,
//       iconSize
//     );
//   }
  
//   if (layout === 'checklist' && hasValidCheckmarkIcon && checkmarkIconNode) {
//     return renderIconWithProps(
//       checkmarkIconNode,
//       `feature-section__checkmark ${checklistClassName}`,
//       checklistColorStyle,
//       checklistSize
//     );
//   }
  
//   return null;
// };

// // Helper function to convert shorthand flex values to proper CSS values
// const convertFlexValue = (value?: string): string | undefined => {
//   if (!value) return undefined;
  
//   const flexMap: Record<string, string> = {
//     'start': 'flex-start',
//     'end': 'flex-end',
//     'center': 'center',
//     'between': 'space-between',
//     'around': 'space-around',
//     'stretch': 'stretch',
//   };
  
//   return flexMap[value] || value;
// };

// const Feature: React.FC<FeatureProps> = (localProps) => {
//   const { mergeWithLocal } = useComponentConfiguration('Feature', localProps.variant);
//   const { props: mergedProps } = mergeWithLocal(localProps);
//   const final = mergedProps;

//   const [featuresArray, setFeaturesArray] = useState<FeatureItem[]>([]);
  
//   // Parse features
//   useEffect(() => {
//     if (typeof final.features === 'string') {
//       try {
//         const parsed = JSON.parse(final.features);
//         setFeaturesArray(Array.isArray(parsed) ? parsed : [parsed]);
//       } catch (error) {
//         console.error('Error parsing features JSON:', error);
//         setFeaturesArray([]);
//       }
//     } else if (Array.isArray(final.features)) {
//       setFeaturesArray(final.features);
//     } else {
//       setFeaturesArray([]);
//     }
//   }, [final.features]);

//   const getSpacingValue = (value?: string, defaultValue: string = '0'): string => {
//     if (!value) return defaultValue;
    
//     if (/^\d+$/.test(value)) {
//       return `${parseInt(value) * 0.25}rem`;
//     }
    
//     return value;
//   };

//   const renderItemCTA = (item: FeatureItem) => {
//     if (!item.ctaText) return null;
    
//     return (
//       <a
//         href={item.ctaUrl}
//         onClick={item.ctaOnClick}
//         className={`feature-section__item-cta ${item.ctaClassName || ''}`}
//         style={{ 
//           marginTop: '1rem', 
//           display: 'inline-block',
//           textDecoration: 'none',
//           color: 'var(--primary)',
//           fontWeight: 500,
//           fontSize: '0.875rem',
//         }}
//       >
//         {item.ctaText}
//       </a>
//     );
//   };

//   const renderFeatureItem = (item: FeatureItem, index: number) => {
//     if (item.customRender) {
//       return item.customRender();
//     }

//     const iconColor = item.iconColor || final.iconColor;
//     const iconSize = item.iconSize || final.iconSize || 24;
//     const iconClassName = item.iconClassName || final.iconClassName || '';
    
//     const checkmarkIcon = final.checkmarkIcon || 'PiCheck';
//     const checkmarkColor = final.checkmarkColor || 'success';
//     const checkmarkSize = final.checkmarkSize || 20;
//     const checkmarkClassName = final.checkmarkClassName || '';
    
//     const cardPadding = final.cardPadding || '1.5rem';
//     const cardRounded = final.cardRounded || '0.5rem';
//     const cardShadow = final.cardShadow || 'md';
//     const cardBorder = final.cardBorder ?? true;
//     const cardBorderColor = final.cardBorderColor || 'var(--borderRgb)';
//     const cardHoverEffect = final.cardHoverEffect || 'none';
    
//     const titleSize = item.titleSize || final.itemTitleSize || '1.125rem';
//     const titleWeight = item.titleWeight || final.itemTitleWeight || 600;
//     const titleColor = item.titleColor || final.itemTitleColor || 'var(--text-color)';
//     const titleClassName = item.titleClassName || '';
    
//     const descriptionSize = item.descriptionSize || final.itemDescriptionSize || '0.875rem';
//     const descriptionWeight = item.descriptionWeight || final.itemDescriptionWeight || 400;
//     const descriptionColor = item.descriptionColor || final.itemDescriptionColor || 'var(--text-muted)';
//     const descriptionClassName = item.descriptionClassName || '';
    
//     const featureContent = (
//       <div className={`feature-section__item ${item.className || ''}`} style={item.style}>
//         {(item.icon || item.imageUrl || final.layout === 'checklist') && (
//           <div 
//             className="feature-section__icon-container"
//             style={{ marginBottom: '1rem' }}
//           >
//             {item.imageUrl ? (
//               <img 
//                 src={item.imageUrl} 
//                 alt={item.imageAlt || ''} 
//                 className={`feature-section__image ${item.imageClassName || ''}`}
//                 style={{
//                   width: `${iconSize}px`,
//                   height: `${iconSize}px`,
//                   objectFit: 'cover',
//                   borderRadius: '50%',
//                   ...item.imageStyle,
//                 }}
//               />
//             ) : (
//               <div className="feature-section__icon-wrapper">
//                 <FeatureIcon
//                   icon={item.icon}
//                   iconColor={iconColor}
//                   iconSize={iconSize}
//                   iconClassName={iconClassName}
//                   layout={final.layout}
//                   checklistIcon={checkmarkIcon}
//                   checklistColor={checkmarkColor}
//                   checklistSize={checkmarkSize}
//                   checklistClassName={checkmarkClassName}
//                 />
//               </div>
//             )}
//           </div>
//         )}
        
//         {item.title && (
//           <Text 
//             block
//             size={titleSize}
//             weight={titleWeight}
//             color={titleColor}
//             funcss={`feature-section__title ${titleClassName}`}
//             style={{ marginBottom: '0.75rem' }}
//           >
//             {item.title}
//           </Text>
//         )}
        
//         {item.description && (
//           <Text 
//             block
//             size={descriptionSize}
//             weight={descriptionWeight}
//             color={descriptionColor}
//             funcss={`feature-section__description ${descriptionClassName}`}
//           >
//             {item.description}
//           </Text>
//         )}
        
//         {item.content && (
//           <div 
//             className="feature-section__additional-content"
//             style={{ marginTop: '1rem' }}
//           >
//             {item.content}
//           </div>
//         )}
        
//         {renderItemCTA(item)}
//       </div>
//     );
    
//     // Apply card styling if card prop is true
//     if (final.card) {
//       const cardClasses = [
//         'feature-section__card',
//         'card',
//         cardHoverEffect !== 'none' ? `card--hover-${cardHoverEffect}` : '',
//         item.className || '',
//         final.cardClassName || '',
//       ].filter(Boolean).join(' ');
      
//       const cardStyles: React.CSSProperties = {
//         padding: getSpacingValue(cardPadding, '1.5rem'),
//         borderRadius: cardRounded,
//         boxShadow: cardShadow !== 'none' ? getCssVariableValue(`shadow-${cardShadow}`) || undefined : undefined,
//         border: cardBorder ? `1px solid ${getCssVariableValue(cardBorderColor) || cardBorderColor}` : 'none',
//         height: '100%',
//         maxWidth: final.itemMaxWidth || '100%',
//         ...item.style,
//       };
      
//       return (
//         <div key={index} className={cardClasses} style={cardStyles}>
//           {featureContent}
//         </div>
//       );
//     }
    
//     // Regular item without card
//     return (
//       <div 
//         key={index} 
//         className={`feature-section__item-wrapper ${item.className || ''}`}
//         style={{ 
//           maxWidth: final.itemMaxWidth || '100%',
//           ...item.style 
//         }}
//       >
//         {featureContent}
//       </div>
//     );
//   };

//   const renderFlexFeatures = () => {
//     if (featuresArray.length === 0) return null;

//     const gapValue = final.gap !== undefined ? `${final.gap * 0.25}rem` : '2rem';
//     const flexGap = gapValue;

//     if (final.layout === 'centered') {
//       const maxWidth = final.maxWidth || '48rem';
//       return (
//         <div 
//           className="feature-section__centered-container"
//           style={{ 
//             maxWidth,
//             margin: '0 auto',
//           }}
//         >
//           {featuresArray.map((item, index) => renderFeatureItem(item, index))}
//         </div>
//       );
//     }

//     // Use Flex layout with proper flexbox values
//     return (
//       <div 
//         className="feature-section__flex-container"
//         style={{
//           display: 'flex',
//           flexWrap: final.wrap !== false ? 'wrap' : 'nowrap',
//           gap: flexGap,
//           alignItems: convertFlexValue(final.align) || 'stretch',
//           justifyContent: convertFlexValue(final.justify) || 'flex-start',
//           maxWidth: final.maxWidth || '100%',
//           margin: '0 auto',
//         }}
//       >
//         {featuresArray.map((item, index) => (
//           <div key={index} className="feature-section__flex-item">
//             {renderFeatureItem(item, index)}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderCarouselFeatures = () => {
//     if (featuresArray.length === 0) return null;

//     // Prepare carousel items
//     const carouselItems = featuresArray.map((item, index) => 
//       renderFeatureItem(item, index)
//     );

//     return (
//       <div 
//         className={`feature-section__carousel-container ${final.carouselContainerClassName || ''}`}
//         style={final.carouselContainerStyle}
//       >
//         <Carousel
//           scrollNumber={final.scrollNumber}
//           gap={final.gap || 1} // Default gap for carousel
//           funcss={final.carouselFuncss}
//           showDashes={final.showDashes}
//           allowVerticalOverflow={final.allowVerticalOverflow}
//           itemPadding={final.itemPadding || '0.5rem'}
//           controlerSize={final.controlerSize}
//           controlerIconSize={final.controlerIconSize}
//           infiniteScroll={final.infiniteScroll}
//           infiniteScrollSpeed={final.infiniteScrollSpeed}
//           infiniteScrollDirection={final.infiniteScrollDirection}
//         >
//           {carouselItems}
//         </Carousel>
//       </div>
//     );
//   };

//   const renderFeaturesContent = () => {
//     if (featuresArray.length === 0) return null;

//     // Use carousel if isCarousel is true
//     if (final.isCarousel) {
//       return renderCarouselFeatures();
//     }

//     // Otherwise use flex layout
//     return renderFlexFeatures();
//   };

//   const getLayoutClasses = () => {
//     const classes = ['feature-section'];
    
//     if (final.layout) {
//       classes.push(`feature-section--${final.layout}`);
//     }
    
//     if (final.isCarousel) {
//       classes.push('feature-section--carousel');
//     }
    
//     if (final.className) {
//       classes.push(final.className);
//     }
    
//     if (final.sectionClass) {
//       classes.push(final.sectionClass);
//     }
    
//     if (final.funcss) {
//       classes.push(final.funcss);
//     }
    
//     return classes.filter(Boolean).join(' ');
//   };

//   const getContainerStyles = (): React.CSSProperties => {
//     const padding = getSpacingValue(final.padding, '3rem 0');
    
//     return {
//       padding: padding,
//       ...final.style,
//     };
//   };

//   const getTextAlign = (align?: 'left' | 'center' | 'right'): React.CSSProperties => {
//     return {
//       textAlign: align || 'center',
//     };
//   };

//   return (
//     <section
//       id={final.id}
//       className={getLayoutClasses()}
//       style={getContainerStyles()}
//     >
//       <div 
//         className={`feature-section__container ${final.containerClassName || ''}`}
//         style={{
//           maxWidth: final.maxWidth || '1280px',
//           margin: '0 auto',
//           padding: '0 1rem',
//           ...final.containerStyle,
//         }}
//       >
//         {(final.title || final.subtitle || final.description) && (
//           <div 
//             className="feature-section__header"
//             style={{
//               marginBottom: '3rem',
//               maxWidth: final.layout === 'centered' ? '48rem' : '100%',
//               marginLeft: 'auto',
//               marginRight: 'auto',
//               ...getTextAlign(final.titleAlign),
//             }}
//           >
//             {final.subtitle && (
//               <Text 
//                 block
//                 size={final.subtitleSize || 'sm'}
//                 weight={final.subtitleWeight || 600}
//                 color={final.subtitleColor || 'var(--primary)'}
//                 funcss={`feature-section__subtitle ${final.subtitleClassName || ''}`}
//                 style={{
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.05em',
//                   marginBottom: '0.5rem',
//                 }}
//               >
//                 {final.subtitle}
//               </Text>
//             )}
            
//             {final.title && (
//               <Text 
//                 block
//                 size={final.titleSize || 'xl'}
//                 weight={final.titleWeight || 700}
//                 color={final.titleColor || 'var(--text-color)'}
//                 funcss={`feature-section__main-title ${final.titleClassName || ''}`}
//                 style={{ marginBottom: '1rem' }}
//               >
//                 {final.title}
//               </Text>
//             )}
            
//             {final.description && (
//               <Text 
//                 block
//                 size={final.descriptionSize || 'sm'}
//                 weight={final.descriptionWeight || 400}
//                 color={final.descriptionColor || 'var(--text-muted)'}
//                 funcss={`feature-section__section-description ${final.descriptionClassName || ''}`}
//               >
//                 {final.description}
//               </Text>
//             )}
//           </div>
//         )}
        
//         <div className="feature-section__content">
//           {renderFeaturesContent()}
//           {final.children}
//         </div>
        
//         {final.ctaText && (
//           <div 
//             className="feature-section__cta-container"
//             style={{
//               marginTop: '2.5rem',
//               ...getTextAlign(final.ctaAlign),
//             }}
//           >
//             <Button
//               onClick={final.ctaOnClick || (() => final.ctaUrl && (window.location.href = final.ctaUrl))}
//               funcss={`feature-section__cta ${final.ctaClassName || ''}`}
//               stringPrefix={final.ctaStringPrefix}
//               stringSuffix={final.ctaStringSuffix}
//               startIcon={final.ctaStartIcon}
//               endIcon={final.ctaEndIcon}
//               iconSize={final.ctaIconSize}
//               bg={final.ctaBg || 'primary'}
//               isLoading={final.ctaIsLoading}
//               status={final.ctaStatus}
//               url={final.ctaUrl}
//             >
//               {final.ctaText}
//             </Button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Feature;