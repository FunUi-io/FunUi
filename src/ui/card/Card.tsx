'use client'; 
import React, { ReactNode } from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { useVariant } from '../theme/theme';
import { useComponentConfiguration } from '../../utils/componentUtils';
import Button from '../button/Button';
import Flex from '../flex/Flex';
import Text from '../text/Text';
import View from '../view/View';

interface CardProps {
  // Basic Props
  color?: string;
  bg?: string;
  width?: string;
  height?: string;
  minHeight?: string;
  minWidth?: string;
  margin?: string;
  padding?: string;
  funcss?: string;
  children?: ReactNode;
  roundEdge?: boolean;
  maxHeight?: string;
  maxWidth?: string;
  horizontal?: boolean;
  flat?: boolean;
  id?: string;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  image?: ReactNode;
  noGap?: boolean;
  shadowless?: boolean;
  fab?: ReactNode;
  responsiveSmall?: boolean;
  responsiveMedium?: boolean;
  xl?: boolean;
  style?: React.CSSProperties;

  // Pattern Props
  pattern?: 'none' | 'grid' | 'dots' | 'diagonal' | 'checkerboard' | 'horizontal' | 'vertical';
  patternOpacity?: number;
  gradient?: string;
  opacity?: number;
  border?: string;
  hoverEffect?: 'none' | 'lift' | 'glow';
  
  // Enhanced Content Props
  heading?: ReactNode;
  headingSize?: string;
  headingWeight?: number;
  headingColor?: string;
  headingClass?: string;
  headingLineHeight?: string;
  
  subheading?: ReactNode;
  subheadingSize?: string;
  subheadingWeight?: number;
  subheadingColor?: string;
  subheadingClass?: string;
  subheadingLineHeight?: string;
  
  content?: ReactNode;
  contentSize?: string;
  contentWeight?: number;
  contentColor?: string;
  contentClass?: string;
  contentLineHeight?: string;
  
  // Image Props
  imageUrl?: string;
  imageAlt?: string;
  imageClass?: string;
  imageSize?: string;
  
  // Enhanced Footer/CTA Props
  showPrimaryCTA?: boolean;
  showSecondaryCTA?: boolean;
  showAccentCTA?: boolean;
  primaryButtonOutlined?: boolean;
  secondaryButtonOutlined?: boolean;
  accentButtonOutlined?: boolean;
  ctaPrimaryUrl?: string;
  ctaSecondaryUrl?: string;
  ctaAccentUrl?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  ctaAccentText?: string;
  ctaGap?: number;
  ctaFlexJustify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  ctaClass?: string;
  
  // Section Styling Props
  headerStyle?: React.CSSProperties;
  headerClass?: string;
  bodyStyle?: React.CSSProperties;
  bodyClass?: string;
  footerStyle?: React.CSSProperties;
  footerClass?: string;
  
  // Configuration
  variant?: string;
}

export default function Card({
  // Original Props
  color,
  bg,
  width,
  height,
  minHeight,
  minWidth,
  margin,
  padding,
  funcss,
  children,
  roundEdge,
  maxHeight,
  maxWidth,
  horizontal,
  id, 
  header,
  body,
  footer,
  noGap,
  fab,
  image,
  shadowless,
  flat,
  responsiveMedium,
  xl,
  responsiveSmall,
  style,

  // Pattern Props
  pattern = 'none',
  patternOpacity = 0.1,
  gradient,
  opacity = 1,
  border,
  hoverEffect = 'none',
  
  // Enhanced Content Props
  heading,
  headingSize = 'xl',
  headingWeight = 700,
  headingColor,
  headingClass,
  headingLineHeight,
  
  subheading,
  subheadingSize = 'base',
  subheadingWeight = 400,
  subheadingColor = 'light',
  subheadingClass,
  subheadingLineHeight,
  
  content,
  contentSize = 'base',
  contentWeight = 400,
  contentColor,
  contentClass,
  contentLineHeight,

  // Image Props
  imageUrl,
  imageAlt = '',
  imageClass = '',
  imageSize = '100%',

  // Enhanced Footer/CTA Props
  showPrimaryCTA = false,
  showSecondaryCTA = false,
  showAccentCTA = false,
  primaryButtonOutlined = false,
  secondaryButtonOutlined = false,
  accentButtonOutlined = false,
  ctaPrimaryUrl = '',
  ctaSecondaryUrl = '',
  ctaAccentUrl = '',
  ctaPrimaryText = 'Primary Action',
  ctaSecondaryText = 'Secondary Action',
  ctaAccentText = 'Accent Action',
  ctaGap = 1,
  ctaFlexJustify = 'center',
  ctaClass = '',
  
  // Section Styling Props
  headerStyle,
  headerClass,
  bodyStyle,
  bodyClass,
  footerStyle,
  footerClass,
  
  // Configuration
  variant,
  ...rest
}: CardProps) {
  // Use the component config hook
  const { mergeWithLocal } = useComponentConfiguration('Card', variant);
  
  // Merge config with local props
  const { props: mergedProps } = mergeWithLocal({
    // Original props
    color,
    bg,
    width,
    height,
    minHeight,
    minWidth,
    margin,
    padding,
    funcss,
    children,
    roundEdge,
    maxHeight,
    maxWidth,
    horizontal,
    id,
    header,
    body,
    footer,
    noGap,
    fab,
    image,
    shadowless,
    flat,
    responsiveMedium,
    xl,
    responsiveSmall,
    style,
    
    // Pattern props
    pattern,
    patternOpacity,
    gradient,
    opacity,
    border,
    hoverEffect,
    
    // Enhanced content props
    heading,
    headingSize,
    headingWeight,
    headingColor,
    headingClass,
    headingLineHeight,
    subheading,
    subheadingSize,
    subheadingWeight,
    subheadingColor,
    subheadingClass,
    subheadingLineHeight,
    content,
    contentSize,
    contentWeight,
    contentColor,
    contentClass,
    contentLineHeight,
    
    // Image props
    imageUrl,
    imageAlt,
    imageClass,
    imageSize,
    
    // CTA props
    showPrimaryCTA,
    showSecondaryCTA,
    showAccentCTA,
    primaryButtonOutlined,
    secondaryButtonOutlined,
    accentButtonOutlined,
    ctaPrimaryUrl,
    ctaSecondaryUrl,
    ctaAccentUrl,
    ctaPrimaryText,
    ctaSecondaryText,
    ctaAccentText,
    ctaGap,
    ctaFlexJustify,
    ctaClass,
    
    // Section styling props
    headerStyle,
    headerClass,
    bodyStyle,
    bodyClass,
    footerStyle,
    footerClass,
  });

  const { variant: themeVariant } = useVariant();

  // Handle content - if string, use dangerouslySetInnerHTML, otherwise render as is
  const renderContent = (content: ReactNode) => {
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content;
  };

  // Enhanced Text Content with flexible styling
  const EnhancedTextContent = (
    <div className="card-enhanced-content">
      {mergedProps.heading && (
        <Text 
          block 
          size={mergedProps.headingSize}
          weight={mergedProps.headingWeight}
          color={mergedProps.headingColor}
          funcss={mergedProps.headingClass}
          lineHeight={mergedProps.headingLineHeight}
        >
          {renderContent(mergedProps.heading)}
        </Text>
      )}
      
      {mergedProps.subheading && (
        <Text 
          block 
          size={mergedProps.subheadingSize}
          weight={mergedProps.subheadingWeight}
          color={mergedProps.subheadingColor}
          funcss={`mt-1 ${mergedProps.subheadingClass}`}
          lineHeight={mergedProps.subheadingLineHeight}
        >
          {renderContent(mergedProps.subheading)}
        </Text>
      )}
      
      {mergedProps.content && (
        <Text 
          block 
          size={mergedProps.contentSize}
          weight={mergedProps.contentWeight}
          color={mergedProps.contentColor}
          funcss={`mt-3 ${mergedProps.contentClass}`}
          lineHeight={mergedProps.contentLineHeight}
          article
        >
          {renderContent(mergedProps.content)}
        </Text>
      )}
    </div>
  );

  // Image Content - uses imageUrl if no image component provided
  const ImageContent = (mergedProps.image || mergedProps.imageUrl) && (
    <div className="card-image-content">
      {mergedProps.image ? (
        mergedProps.image
      ) : (
        mergedProps.imageUrl && (
          <img 
            src={mergedProps.imageUrl} 
            alt={mergedProps.imageAlt}
            className={mergedProps.imageClass}
            style={{ 
              width: mergedProps.imageSize,
              height: 'auto',
              objectFit: 'cover',
              borderRadius: 'inherit'
            }}
          />
        )
      )}
    </div>
  );

  // CTA Buttons Component
  const CTAButtons = () => {
    const hasCTAs = mergedProps.showPrimaryCTA || mergedProps.showSecondaryCTA || mergedProps.showAccentCTA;
    
    if (!hasCTAs) return null;

    return (
      <Flex 
        gap={mergedProps.ctaGap} 
        justify={mergedProps.ctaFlexJustify}
        className={`mt-4 ${mergedProps.ctaClass}`}
        wrap="wrap"
        width='100%'
      >
        {mergedProps.showPrimaryCTA && (
          <Button
            bg="primary"
            outlined={mergedProps.primaryButtonOutlined}
            onClick={() => mergedProps.ctaPrimaryUrl && (window.location.href = mergedProps.ctaPrimaryUrl)}
          >
            {mergedProps.ctaPrimaryText}
          </Button>
        )}
        
        {mergedProps.showSecondaryCTA && (
          <Button
            bg="secondary"
            outlined={mergedProps.secondaryButtonOutlined}
            onClick={() => mergedProps.ctaSecondaryUrl && (window.location.href = mergedProps.ctaSecondaryUrl)}
          >
            {mergedProps.ctaSecondaryText}
          </Button>
        )}
        
        {mergedProps.showAccentCTA && (
          <Button
            bg="accent"
            outlined={mergedProps.accentButtonOutlined}
            onClick={() => mergedProps.ctaAccentUrl && (window.location.href = mergedProps.ctaAccentUrl)}
          >
            {mergedProps.ctaAccentText}
          </Button>
        )}
      </Flex>
    );
  };

  // Determine if we should use enhanced content
  const hasEnhancedContent = mergedProps.heading || mergedProps.subheading || mergedProps.content;
  const hasEnhancedFooter = mergedProps.showPrimaryCTA || mergedProps.showSecondaryCTA || mergedProps.showAccentCTA;
  const hasImageContent = mergedProps.image || mergedProps.imageUrl;

  return (
    <div
      id={mergedProps.id || ''}
      className={`
        card 
        card_flex
        ${!image && !imageUrl ? "p" : ""}
        ${mergedProps.noGap ? 'no-gap' : ''} 
        ${mergedProps.xl ? 'xl' : ''} 
        text-${mergedProps.color || ''} 
        ${mergedProps.bg || ''} 
        ${mergedProps.funcss || ''} 
        ${mergedProps.roundEdge ? 'round-edge' : ''} 
        ${mergedProps.shadowless ? 'shadowless' : ''} 
        ${mergedProps.flat ? 'flat' : ''} 
        ${mergedProps.horizontal ? 'horizontalCard' : ''}
        ${mergedProps.responsiveMedium ? 'responsiveMedium' : ''}
        ${mergedProps.responsiveSmall ? 'responsiveSmall' : ''}
        ${mergedProps.pattern !== 'none' ? `pattern-${mergedProps.pattern}` : ''}
        ${mergedProps.hoverEffect !== 'none' ? `hover-${mergedProps.hoverEffect}` : ''}
        ${themeVariant === "standard" ? "border" : ""}
      `}
      style={{
        width: `${mergedProps.width || ''}`,
        height: `${mergedProps.height || ''}`,
        minHeight: `${mergedProps.minHeight || ''}`,
        minWidth: `${mergedProps.minWidth || ''}`,
        maxHeight: mergedProps.maxHeight || '',
        maxWidth: mergedProps.maxWidth || '',
        margin: `${mergedProps.margin || ''}`,
        padding: `${mergedProps.padding || ''}`,
        background: mergedProps.gradient,
        opacity: mergedProps.opacity,
        border: mergedProps.border,
        position: 'relative',
        overflow: 'hidden',
        ...mergedProps.style
      }} 
      {...rest}
    >
      {/* Pattern Overlay */}
      {mergedProps.pattern !== 'none' && (
        <div 
          className="card-pattern-overlay"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            opacity: mergedProps.patternOpacity,
            mixBlendMode: 'multiply',
            backgroundImage: 
              mergedProps.pattern === 'grid' ? 
                `linear-gradient(to right, rgba(var(--borderRgb), 1) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(var(--borderRgb), 1) 1px, transparent 1px)` :
              mergedProps.pattern === 'dots' ? 
                `radial-gradient(rgba(var(--borderRgb), 1) 1px, transparent 1px)` :
              mergedProps.pattern === 'diagonal' ? 
                `repeating-linear-gradient(45deg, rgba(var(--borderRgb), 1), rgba(var(--borderRgb), 1) 1px, transparent 1px, transparent 10px)` :
              mergedProps.pattern === 'checkerboard' ? 
                `linear-gradient(45deg, rgba(var(--borderRgb), 1) 25%, transparent 25%), 
                 linear-gradient(-45deg, rgba(var(--borderRgb), 1) 25%, transparent 25%), 
                 linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), 1) 75%), 
                 linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), 1) 75%)` :
              mergedProps.pattern === 'horizontal' ? 
                `linear-gradient(to bottom, rgba(var(--borderRgb), 1) 1px, transparent 1px)` :
              mergedProps.pattern === 'vertical' ? 
                `linear-gradient(to right, rgba(var(--borderRgb), 1) 1px, transparent 1px)` : 'none',
            backgroundSize: 
              mergedProps.pattern === 'grid' ? '20px 20px' :
              mergedProps.pattern === 'dots' ? '10px 10px' :
              mergedProps.pattern === 'diagonal' ? '20px 20px' :
              mergedProps.pattern === 'checkerboard' ? '20px 20px' :
              mergedProps.pattern === 'horizontal' ? '100% 10px' :
              mergedProps.pattern === 'vertical' ? '10px 100%' : 'auto'
          }}
        />
      )}

      {/* Original image/fab or enhanced image */}
      {hasImageContent ? (
        ImageContent
      ) : (
        mergedProps.image ? <div className={`${mergedProps.fab ? 'relative' : ''}`}>{mergedProps.image} {mergedProps.fab ? mergedProps.fab : ''}</div> : ''
      )}

      <View funcss={hasImageContent ? 'p' : ''}>

      {/* Use enhanced content or original header */}
      {hasEnhancedContent ? (
        <CardHeader 
          style={mergedProps.headerStyle} 
          className={mergedProps.headerClass}
        >
          {EnhancedTextContent}
        </CardHeader>
      ) : (
        mergedProps.header && !mergedProps.horizontal ? (
          <CardHeader 
            style={mergedProps.headerStyle} 
            className={mergedProps.headerClass}
          >
            {renderContent(mergedProps.header)}
          </CardHeader>
        ) : ''
      )}

      {/* Body content */}
      {mergedProps.body ? 
        <div>
          {mergedProps.horizontal && !hasEnhancedContent ? (
            <CardHeader 
              style={mergedProps.headerStyle} 
              className={mergedProps.headerClass}
            >
              {renderContent(mergedProps.header)}
            </CardHeader>
          ) : ''}
          <CardBody 
            style={mergedProps.bodyStyle} 
            className={mergedProps.bodyClass}
          >
            {hasEnhancedContent ? EnhancedTextContent : renderContent(mergedProps.body)}
          </CardBody> 
          {mergedProps.horizontal && !hasEnhancedFooter ? (
            <CardFooter 
              style={mergedProps.footerStyle} 
              className={mergedProps.footerClass}
            >
              {renderContent(mergedProps.footer)}
            </CardFooter>
          ) : ''}
        </div>
      : ''}

      {/* Children content */}
      {mergedProps.children && (
        <CardBody 
          style={mergedProps.bodyStyle} 
          className={mergedProps.bodyClass}
        >
          {renderContent(mergedProps.children)}
        </CardBody>
      )}

      {/* Footer - Enhanced with CTA buttons or original footer */}
      {hasEnhancedFooter ? (
        <CardFooter 
          style={mergedProps.footerStyle} 
          className={mergedProps.footerClass}
        >
          <CTAButtons />
        </CardFooter>
      ) : (
        mergedProps.footer && !mergedProps.horizontal ? (
          <CardFooter 
            style={mergedProps.footerStyle} 
            className={mergedProps.footerClass}
          >
            {renderContent(mergedProps.footer)}
          </CardFooter>
        ) : ''
      )}
      </View>
    </div>
  );
}