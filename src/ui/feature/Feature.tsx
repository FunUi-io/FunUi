'use client';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { getCssVariableValue } from '../../utils/getCssVariable';
import { useComponentConfiguration } from '../../utils/componentUtils';
import Text from '../text/Text';
import Button from '../button/Button';
import { getDynamicIcon } from '../../utils/getDynamicIcon';

type FeatureItem = {
  icon?: string | React.ReactNode;
  iconColor?: string;
  iconSize?: number;
  iconClassName?: string;
  
  title?: React.ReactNode;
  titleSize?: string;
  titleWeight?: number;
  titleColor?: string;
  titleClassName?: string;
  titleVariant?: string; // Added
  
  description?: React.ReactNode;
  descriptionSize?: string;
  descriptionWeight?: number;
  descriptionColor?: string;
  descriptionClassName?: string;
  descriptionVariant?: string; // Added
  
  imageUrl?: string;
  imageAlt?: string;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  
  content?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  
  cardBg?: string;
  cardPadding?: string;
  cardRounded?: string;
  cardShadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  cardBorder?: boolean;
  cardBorderColor?: string;
  cardHoverEffect?: 'lift' | 'glow' | 'scale' | 'none';
  
  ctaText?: string;
  ctaUrl?: string;
  ctaVariant?: 'primary' | 'secondary' | 'accent' | 'text' | 'outline';
  ctaOnClick?: () => void;
  ctaCss?: string;
  ctaClassName?: string;
  
  customRender?: () => React.ReactNode;
};

type FeatureProps = {
  variant?: string;
  
  layout?: 'checklist' | 'centered' | 'grid';
  
  title?: React.ReactNode;
  titleSize?: string;
  titleWeight?: number;
  titleColor?: string;
  titleClassName?: string;
  titleAlign?: 'left' | 'center' | 'right';
  titleVariant?: string; // Added
  
  subtitle?: React.ReactNode;
  subtitleSize?: string;
  subtitleWeight?: number;
  subtitleColor?: string;
  subtitleClassName?: string;
  subtitleVariant?: string; // Added
  
  description?: React.ReactNode;
  descriptionSize?: string;
  descriptionWeight?: number;
  descriptionColor?: string;
  descriptionClassName?: string;
  descriptionVariant?: string; // Added
  
  features?: FeatureItem[] | string;
  
  columns?: number;
  gap?: string;
  itemGap?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  
  bg?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  
  cardBg?: string;
  cardPadding?: string;
  cardRounded?: string;
  cardShadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  cardBorder?: boolean;
  cardBorderColor?: string;
  cardHoverEffect?: 'lift' | 'glow' | 'scale' | 'none';
  cardClassName?: string;
  
  iconColor?: string;
  iconSize?: number;
  iconClassName?: string;
  
  itemTitleSize?: string;
  itemTitleWeight?: number;
  itemTitleColor?: string;
  itemTitleVariant?: string; // Added
  
  itemDescriptionSize?: string;
  itemDescriptionWeight?: number;
  itemDescriptionColor?: string;
  itemDescriptionVariant?: string; // Added
  
  checkmarkIcon?: string;
  checkmarkColor?: string;
  checkmarkSize?: number;
  checkmarkClassName?: string;
  
  ctaText?: string;
  ctaUrl?: string;
  ctaVariant?: 'primary' | 'secondary' | 'accent' | 'text' | 'outline';
  ctaOnClick?: () => void;
  ctaClassName?: string;
  ctaCss?: string;
  ctaAlign?: 'left' | 'center' | 'right';
  ctaStringPrefix?: string;
  ctaStringSuffix?: string;
  ctaStartIcon?: React.ReactNode;
  ctaEndIcon?: React.ReactNode;
  ctaIconSize?: number;
  ctaIsLoading?: boolean;
  ctaStatus?: 'success' | 'warning' | 'info' | 'error';
  
  pattern?: 'grid' | 'dots' | 'diagonal' | 'none';
  patternOpacity?: number;
  patternColor?: string;
  patternSize?: string;
  
  fade?: boolean;
  fadeColor?: string;
  fadeDirection?: 'top' | 'bottom' | 'left' | 'right';
  fadeRadial?: boolean;
  
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'none';
  
  children?: React.ReactNode;
  
  id?: string;
  
  funcss?: string;
  sectionClass?: string;
  
  // Responsive settings
  maxWidth?: string;
  responsiveColumns?: string; // JSON string e.g., '{"sm": 1, "md": 2, "lg": 3}'
};

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

const FeatureIcon: React.FC<{
  icon?: string | React.ReactNode;
  iconColor?: string;
  iconSize?: number;
  iconClassName?: string;
  layout?: string;
  checklistIcon?: string;
  checklistColor?: string;
  checklistSize?: number;
  checklistClassName?: string;
}> = ({ 
  icon, 
  iconColor, 
  iconSize = 24, 
  iconClassName = '',
  layout,
  checklistIcon = 'PiCheck',
  checklistColor = 'success',
  checklistSize = 20,
  checklistClassName = ''
}) => {
  const isStringIcon = icon && typeof icon === 'string';
  const { iconNode: dynamicIconNode, hasValidIcon: hasValidDynamicIcon } = useDynamicIcon(
    isStringIcon ? icon as string : undefined
  );
  
  const { iconNode: checkmarkIconNode, hasValidIcon: hasValidCheckmarkIcon } = useDynamicIcon(
    layout === 'checklist' ? checklistIcon : undefined
  );

  const getIconColorStyle = (color?: string): React.CSSProperties => {
    if (!color) return {};
    
    if (color.startsWith('text-') || color.startsWith('bg-') || color.startsWith('border-')) {
      return {};
    }
    
    const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
    if (colorNames.includes(color)) {
      const cssValue = getCssVariableValue(color);
      if (cssValue) {
        return { color: cssValue };
      }
    }
    
    return { color };
  };

  const iconColorStyle = getIconColorStyle(iconColor);
  const checklistColorStyle = getIconColorStyle(checklistColor);

  const renderIconWithProps = (iconElement: React.ReactNode, className: string, style: React.CSSProperties, size?: number) => {
    if (!React.isValidElement(iconElement)) return iconElement;
    
    const props: any = {
      className,
      style: { ...style, ...(iconElement.props as any).style },
    };
    
    if (size !== undefined) {
      props.size = size;
    }
    
    return React.cloneElement(iconElement, props);
  };

  if (icon && typeof icon !== 'string' && React.isValidElement(icon)) {
    return renderIconWithProps(
      icon,
      `feature-section__icon ${iconClassName}`,
      iconColorStyle,
      iconSize
    );
  }
  
  if (isStringIcon && hasValidDynamicIcon && dynamicIconNode) {
    return renderIconWithProps(
      dynamicIconNode,
      `feature-section__icon ${iconClassName}`,
      iconColorStyle,
      iconSize
    );
  }
  
  if (layout === 'checklist' && hasValidCheckmarkIcon && checkmarkIconNode) {
    return renderIconWithProps(
      checkmarkIconNode,
      `feature-section__checkmark ${checklistClassName}`,
      checklistColorStyle,
      checklistSize
    );
  }
  
  return null;
};

const Feature: React.FC<FeatureProps> = (localProps) => {
  const { mergeWithLocal } = useComponentConfiguration('Feature', localProps.variant);
  const { props: mergedProps } = mergeWithLocal(localProps);
  const final = mergedProps;

  const [featuresArray, setFeaturesArray] = useState<FeatureItem[]>([]);
  const [responsiveColumns, setResponsiveColumns] = useState<Record<string, number>>({});
  
  // Parse features
  useEffect(() => {
    if (typeof final.features === 'string') {
      try {
        const parsed = JSON.parse(final.features);
        setFeaturesArray(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (error) {
        console.error('Error parsing features JSON:', error);
        setFeaturesArray([]);
      }
    } else if (Array.isArray(final.features)) {
      setFeaturesArray(final.features);
    } else {
      setFeaturesArray([]);
    }
  }, [final.features]);

  // Parse responsive columns
  useEffect(() => {
    if (final.responsiveColumns) {
      try {
        const parsed = JSON.parse(final.responsiveColumns);
        if (parsed && typeof parsed === 'object') {
          setResponsiveColumns(parsed);
        }
      } catch (error) {
        console.error('Error parsing responsive columns:', error);
        setResponsiveColumns({});
      }
    }
  }, [final.responsiveColumns]);

  const getSpacingValue = (value?: string, defaultValue: string = '0'): string => {
    if (!value) return defaultValue;
    
    if (/^\d+$/.test(value)) {
      return `${parseInt(value) * 0.25}rem`;
    }
    
    return value;
  };

  const getButtonVariantClass = (variant?: string): string => {
    if (!variant) return '';
    
    const variantClasses: Record<string, string> = {
      'primary': 'btn-primary',
      'secondary': 'btn-secondary',
      'accent': 'btn-accent',
      'text': 'btn-text',
      'outline': 'btn-outline',
    };
    
    return variantClasses[variant] || `btn-${variant}`;
  };

  const renderItemCTA = (item: FeatureItem) => {
    if (!item.ctaText) return null;
    
    const ctaVariant = item.ctaVariant || 'text';
    const ctaClassName = item.ctaClassName || '';
    const ctaCss = item.ctaCss || '';
    const buttonClass = getButtonVariantClass(ctaVariant);
    
    return (
      <a
        href={item.ctaUrl}
        onClick={item.ctaOnClick}
        className={`btn ${buttonClass} ${ctaClassName} ${ctaCss} feature-section__item-cta text-sm`}
        style={{ 
          marginTop: '1rem', 
          display: 'inline-block',
          textDecoration: 'none',
        }}
      >
        {item.ctaText}
      </a>
    );
  };

  const renderFeatureItem = (item: FeatureItem, index: number) => {
    if (item.customRender) {
      return item.customRender();
    }

    const iconColor = item.iconColor || final.iconColor;
    const iconSize = item.iconSize || final.iconSize || 24;
    const iconClassName = item.iconClassName || final.iconClassName || '';
    
    const checkmarkIcon = final.checkmarkIcon || 'PiCheck';
    const checkmarkColor = final.checkmarkColor || 'success';
    const checkmarkSize = final.checkmarkSize || 20;
    const checkmarkClassName = final.checkmarkClassName || '';
    
    const cardBg = item.cardBg || final.cardBg;
    const cardPadding = item.cardPadding || final.cardPadding || '1.5rem';
    const cardRounded = item.cardRounded || final.cardRounded || '0.5rem';
    const cardShadow = item.cardShadow || final.cardShadow || 'md';
    const cardBorder = item.cardBorder ?? final.cardBorder ?? true;
    const cardBorderColor = item.cardBorderColor || final.cardBorderColor || 'var(--borderRgb)';
    const cardHoverEffect = item.cardHoverEffect || final.cardHoverEffect || 'none';
    
    const titleSize = item.titleSize || final.itemTitleSize || '1.125rem';
    const titleWeight = item.titleWeight || final.itemTitleWeight || 600;
    const titleColor = item.titleColor || final.itemTitleColor || 'var(--text-color)';
    const titleClassName = item.titleClassName || '';
    const titleVariant = item.titleVariant || final.itemTitleVariant; // Updated
    
    const descriptionSize = item.descriptionSize || final.itemDescriptionSize || '0.875rem';
    const descriptionWeight = item.descriptionWeight || final.itemDescriptionWeight || 400;
    const descriptionColor = item.descriptionColor || final.itemDescriptionColor || 'var(--text-muted)';
    const descriptionClassName = item.descriptionClassName || '';
    const descriptionVariant = item.descriptionVariant || final.itemDescriptionVariant; // Updated
    
    const isGridLayout = final.layout === 'grid';
    
    const featureContent = (
      <div className={`feature-section__item ${item.className || ''}`} style={item.style}>
        {(item.icon || item.imageUrl || final.layout === 'checklist') && (
          <div 
            className="feature-section__icon-container"
            style={{ marginBottom: '1rem' }}
          >
            {item.imageUrl ? (
              <img 
                src={item.imageUrl} 
                alt={item.imageAlt || ''} 
                className={`feature-section__image ${item.imageClassName || final.imageClassName || ''}`}
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  ...item.imageStyle,
                  ...final.imageStyle,
                }}
              />
            ) : (
              <div className="feature-section__icon-wrapper">
                <FeatureIcon
                  icon={item.icon}
                  iconColor={iconColor}
                  iconSize={iconSize}
                  iconClassName={iconClassName}
                  layout={final.layout}
                  checklistIcon={checkmarkIcon}
                  checklistColor={checkmarkColor}
                  checklistSize={checkmarkSize}
                  checklistClassName={checkmarkClassName}
                />
              </div>
            )}
          </div>
        )}
        
        {item.title && (
          <Text 
            variant={titleVariant} // Updated: Use titleVariant instead of final.variant
            block
            size={titleSize}
            weight={titleWeight}
            color={titleColor}
            funcss={`feature-section__title ${titleClassName}`}
            style={{ marginBottom: '0.75rem' }}
          >
            {item.title}
          </Text>
        )}
        
        {item.description && (
          <Text 
            variant={descriptionVariant} // Updated: Use descriptionVariant instead of final.variant
            block
            size={descriptionSize}
            weight={descriptionWeight}
            color={descriptionColor}
            funcss={`feature-section__description ${descriptionClassName}`}
          >
            {item.description}
          </Text>
        )}
        
        {item.content && (
          <div 
            className="feature-section__additional-content"
            style={{ marginTop: '1rem' }}
          >
            {item.content}
          </div>
        )}
        
        {renderItemCTA(item)}
      </div>
    );
    
    // For grid layout with cards
    if (isGridLayout && cardBg) {
      const cardClasses = [
        'feature-section__card',
        cardHoverEffect !== 'none' ? `feature-section__card--hover-${cardHoverEffect}` : '',
        item.className || '',
      ].filter(Boolean).join(' ');
      
      const cardStyles: React.CSSProperties = {
        padding: getSpacingValue(cardPadding, '1.5rem'),
        borderRadius: cardRounded,
        backgroundColor: cardBg ? getCssVariableValue(cardBg) || cardBg : undefined,
        boxShadow: cardShadow !== 'none' ? getCssVariableValue(`shadow-${cardShadow}`) || undefined : undefined,
        border: cardBorder ? `1px solid ${getCssVariableValue(cardBorderColor) || cardBorderColor}` : 'none',
        height: '100%',
        ...item.style,
      };
      
      return (
        <div key={index} className={cardClasses} style={cardStyles}>
          {featureContent}
        </div>
      );
    }
    
    return featureContent;
  };

  const getResponsiveGridColumns = () => {
    const defaultColumns = final.columns || 3;
    
    if (Object.keys(responsiveColumns).length === 0) {
      return `repeat(${defaultColumns}, 1fr)`;
    }
    
    return {
      base: `repeat(${responsiveColumns.sm || defaultColumns}, 1fr)`,
      sm: `repeat(${responsiveColumns.sm || defaultColumns}, 1fr)`,
      md: `repeat(${responsiveColumns.md || responsiveColumns.sm || defaultColumns}, 1fr)`,
      lg: `repeat(${responsiveColumns.lg || responsiveColumns.md || responsiveColumns.sm || defaultColumns}, 1fr)`,
      xl: `repeat(${responsiveColumns.xl || responsiveColumns.lg || responsiveColumns.md || responsiveColumns.sm || defaultColumns}, 1fr)`,
    };
  };

  const getGridStyles = (): React.CSSProperties => {
    const gap = getSpacingValue(final.gap, '2rem');
    const itemGap = getSpacingValue(final.itemGap, '1rem');
    
    const baseStyle: React.CSSProperties = {
      display: 'grid',
      gap: gap,
      alignItems: final.align || 'stretch',
      justifyContent: final.justify || 'start',
    };
    
    const columns = getResponsiveGridColumns();
    
    if (typeof columns === 'string') {
      return {
        ...baseStyle,
        gridTemplateColumns: columns,
      };
    }
    
    return baseStyle;
  };
  const getPatternStyle = () => {
    if (!final.pattern || final.pattern === 'none') return {};
    
    const opacity = final.patternOpacity || 0.05;
    const color = final.patternColor || 'borderRgb';
    const size = final.patternSize || '20px';
    const colorValue = getCssVariableValue(color) || 'rgba(var(--borderRgb), 0.1)';
    
    let backgroundImage = '';
    let backgroundSize = size;
    
    switch (final.pattern) {
      case 'grid':
        backgroundImage = `linear-gradient(to right, ${colorValue} ${opacity} 1px, transparent 1px),
                          linear-gradient(to bottom, ${colorValue} ${opacity} 1px, transparent 1px)`;
        backgroundSize = `${size} ${size}`;
        break;
      case 'dots':
        backgroundImage = `radial-gradient(${colorValue} ${opacity} 1px, transparent 1px)`;
        backgroundSize = `${size} ${size}`;
        break;
      case 'diagonal':
        backgroundImage = `repeating-linear-gradient(45deg, ${colorValue} ${opacity}, ${colorValue} ${opacity} 1px, transparent 1px, transparent 20px)`;
        backgroundSize = `${size} ${size}`;
        break;
    }
    
    return {
      backgroundImage,
      backgroundSize,
    };
  };

  const getFadeStyle = () => {
    if (!final.fade) return {};
    
    const color = final.fadeColor || 'page-bg';
    const fadeColor = getCssVariableValue(color) || color;
    
    if (final.fadeRadial) {
      return {
        background: `radial-gradient(ellipse at center, transparent 30%, ${fadeColor} 70%)`,
      };
    }
    
    const direction = final.fadeDirection || 'bottom';
    const gradients: any = {
      top: 'to top',
      bottom: 'to bottom',
      left: 'to left',
      right: 'to right',
    };
    
    return {
      background: `linear-gradient(${gradients[direction]}, transparent 0%, ${fadeColor} 90%)`,
    };
  };

  const getTextAlign = (align?: 'left' | 'center' | 'right'): React.CSSProperties => {
    return {
      textAlign: align || 'center',
    };
  };

  const renderFeaturesContent = () => {
    if (featuresArray.length === 0) return null;

    const gridStyles = getGridStyles();
    const isCentered = final.layout === 'centered';
    const maxWidth = final.maxWidth || (isCentered ? '48rem' : '100%');

    if (isCentered) {
      return (
        <div 
          className="feature-section__centered-container"
          style={{ 
            maxWidth,
            margin: '0 auto',
          }}
        >
          {featuresArray.map((item, index) => renderFeatureItem(item, index))}
        </div>
      );
    }

    return (
      <div 
        className="feature-section__grid"
        style={{
          ...gridStyles,
          maxWidth: final.maxWidth || '100%',
          margin: '0 auto',
        }}
      >
        {featuresArray.map((item, index) => (
          <div key={index} className="feature-section__grid-item">
            {renderFeatureItem(item, index)}
          </div>
        ))}
      </div>
    );
  };

  const getLayoutClasses = () => {
    const classes = ['feature-section'];
    
    if (final.layout) {
      classes.push(`feature-section--${final.layout}`);
    }
    
    if (final.className) {
      classes.push(final.className);
    }
    
    if (final.sectionClass) {
      classes.push(final.sectionClass);
    }
    
    if (final.funcss) {
      classes.push(final.funcss);
    }
    
    return classes.filter(Boolean).join(' ');
  };

  const getContainerStyles = (): React.CSSProperties => {
    const padding = getSpacingValue(final.padding, '3rem 0');
    
    return {
      position: 'relative',
      padding: padding,
      backgroundColor: final.bg ? getCssVariableValue(final.bg) || final.bg : undefined,
      overflow: 'hidden',
      ...getPatternStyle(),
      ...final.style,
    };
  };

  return (
    <section
      id={final.id}
      className={getLayoutClasses()}
      style={getContainerStyles()}
    >
      {final.fade && (
        <div
          className="feature-section__fade-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            ...getFadeStyle(),
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      )}
      
      <div 
        className={`feature-section__container ${final.containerClassName || ''}`}
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: final.maxWidth || '1280px',
          margin: '0 auto',
          padding: '0 1rem',
          ...final.containerStyle,
        }}
      >
        {(final.title || final.subtitle || final.description) && (
          <div 
            className="feature-section__header"
            style={{
              marginBottom: '3rem',
              maxWidth: final.layout === 'centered' ? '48rem' : '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              ...getTextAlign(final.titleAlign),
            }}
          >
            {final.subtitle && (
              <Text 
                variant={final.subtitleVariant} // Updated: Use subtitleVariant or fallback to variant
                block
                size={final.subtitleSize || 'sm'}
                weight={final.subtitleWeight || 600}
                color={final.subtitleColor || 'var(--primary)'}
                funcss={`feature-section__subtitle ${final.subtitleClassName || ''}`}
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                }}
                text={final.subtitle}
              >
               
              </Text>
            )}
            
            {final.title && (
              <Text 
                variant={final.titleVariant} // Updated: Use titleVariant or fallback to variant
                block
                size={final.titleSize || 'xl'}
                weight={final.titleWeight || 700}
                color={final.titleColor || 'var(--text-color)'}
                funcss={`feature-section__main-title ${final.titleClassName || ''}`}
                style={{ marginBottom: '1rem' }}
                text=    {final.title}
              >
              </Text>
            )}
            
            {final.description && (
              <Text 
                variant={final.descriptionVariant} // Updated: Use descriptionVariant or fallback to variant
                block
                size={final.descriptionSize || 'sm'}
                weight={final.descriptionWeight || 400}
                color={final.descriptionColor || 'var(--text-muted)'}
                funcss={`feature-section__section-description ${final.descriptionClassName || ''}`}
                text=   {final.description}
              >
             
              </Text>
            )}
          </div>
        )}
        
        <div className="feature-section__content">
          {renderFeaturesContent()}
          {final.children}
        </div>
        
        {final.ctaText && (
          <div 
            className="feature-section__cta-container"
            style={{
              marginTop: '2.5rem',
              ...getTextAlign(final.ctaAlign),
            }}
          >
            <Button
              variant={final.ctaVariant}
              onClick={final.ctaOnClick || (() => final.ctaUrl && (window.location.href = final.ctaUrl))}
              funcss={`feature-section__cta ${final.ctaClassName || ''} ${final.ctaCss || ''}`}
              stringPrefix={final.ctaStringPrefix}
              stringSuffix={final.ctaStringSuffix}
              startIcon={final.ctaStartIcon}
              endIcon={final.ctaEndIcon}
              iconSize={final.ctaIconSize}
              isLoading={final.ctaIsLoading}
              status={final.ctaStatus}
              url={final.ctaUrl}
            >
              {final.ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feature;