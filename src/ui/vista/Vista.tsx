'use client';
import React from 'react';
import ScrollInView from '../ScrollInView/ScrollInView';
import { getCssVariableValue } from '../../utils/getCssVariable';
import { useComponentConfiguration } from '../../utils/componentUtils';
import Text from '../text/Text';
import Col from '../grid/Col';
import Button from '../button/Button'; // Import your Button component
import Flex from '../flex/Flex'; // Import your Flex component

type VistaProps = {
  layout?: 'centered' | 'imageLeft' | 'imageRight' | 'stacked';
  pattern?: 'grid' | 'dots' | 'diagonal' | 'checkerboard' | 'horizontal' | 'vertical';
  patternOpacity?: number;
  reverse?: boolean;
  bg?: string;
  padding?: string;
  textAlign?: 'left' | 'center' | 'right';
  imgPosition?: 'top' | 'bottom';
  funcss?: string;
  blurry?: number;
  opacity?: number;

  // Enhanced Content Props
  heading?: React.ReactNode;
  headingSize?: string;
  headingWeight?: number;
  headingColor?: string;
  headingClass?: string;
  
  subheading?: React.ReactNode;
  subheadingSize?: string;
  subheadingWeight?: number;
  subheadingColor?: string;
  subheadingClass?: string;
  
  content?: React.ReactNode;
  contentSize?: string;
  contentWeight?: number;
  contentColor?: string;
  contentClass?: string;
  
  image?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  imageClass?: string;
  imageSize?: string;
  
  cta?: React.ReactNode;
  ctaClass?: string;

  sectionClass?: string;
  containerClass?: string;
  gap?: string;
  textWrapperClass?: string;
  imageWrapperClass?: string;
  children?: React.ReactNode;

  // New Props for Gradient Blob
  showGradient?: boolean;
  gradientPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  gradientSize?: string; // e.g. '300px'
  gradientColors?: string; // e.g. 'radial-gradient(circle, #ff6ec4, #7873f5)'

  fade?: boolean;
  fadeDirection?: 'top' | 'bottom' | 'left' | 'right';
  fadeRadial?: boolean;
  fadeOverlayDarken?: number; // 0 to 1
  backgroundImage?: string;
  variant?: string;

  // New CTA Button Props
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
  ctaPrimaryRounded?: boolean;
  ctaPrimaryFlat?: boolean;
  ctaPrimaryPrefix?: string;
  ctaPrimarySuffix?: string;
  primaryIconSize?: number;


  ctaSecondaryRounded?: boolean;
  ctaSecondaryFlat?: boolean;
  ctaSecondaryPrefix?: string;
  ctaSecondarySuffix?: string;
  secondaryIconSize?: number;

  ctaAccentRounded?: boolean;
  ctaAccentFlat?: boolean;
  ctaAccentPrefix?: string;
  ctaAccentSuffix?: string;
  accentIconSize?: number;

  ctaGap?: number;
  ctaFlexJustify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
};

const Vista: React.FC<VistaProps> = ({
  layout = 'imageRight',
  reverse = false,
  bg = '',
  padding = 'padding-lg',
  textAlign = 'left',
  imgPosition = 'top',
  funcss = '',
  pattern = '',
  patternOpacity = pattern === 'grid' ? 0.15 : pattern === 'dots' ? 0.4 : pattern === 'diagonal' ? 0.2 : pattern === 'checkerboard' ? 0.2 : pattern === 'horizontal' ? 0.2 : pattern === 'vertical' ? 0.2 : 0.1,

  // Enhanced Content
  heading,
  headingSize = '5xl',
  headingWeight = 700,
  headingColor = '',
  headingClass = '',
  
  subheading,
  subheadingSize = 'lg',
  subheadingWeight = 400,
  subheadingColor = 'light',
  subheadingClass = '',
  
  content,
  contentSize = 'base',
  contentWeight = 400,
  contentColor = '',
  contentClass = '',
  
  image,
  imageUrl = '',
  imageAlt = '',
  imageClass = '',
  imageSize = '100%',
  
  cta,
  ctaClass = '',

  sectionClass = '',
  containerClass = '',
  textWrapperClass = '',
  gap = '2rem',
  imageWrapperClass = '',
  children,

  // Gradient Props
  showGradient = false,
  gradientPosition = 'bottom-right',
  gradientSize = '300px',
  blurry = 100,
  opacity = 0.4,
  gradientColors,

  fade = false,
  fadeDirection = 'bottom',
  fadeRadial = false,
  fadeOverlayDarken = 0.5,
  backgroundImage = '',
  variant = '',

  // New CTA Button Props
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
  ctaPrimaryRounded = false,
  ctaPrimaryFlat = false,
  ctaPrimaryPrefix = '',
  ctaPrimarySuffix = '',
  ctaSecondaryRounded = false,
  ctaSecondaryFlat = false,
  ctaSecondaryPrefix = '',
  ctaSecondarySuffix = '',
  ctaAccentRounded = false,
  ctaAccentFlat = false,
  ctaAccentPrefix = '',
  ctaAccentSuffix = '',
  primaryIconSize ,
  secondaryIconSize ,
  accentIconSize,
}) => {
  // Use the component config hook
  const { mergeWithLocal } = useComponentConfiguration('Vista', variant);
  
  // Merge config with local props - local props should override config
  const { props: mergedProps } = mergeWithLocal({
    layout,
    reverse,
    bg,
    padding,
    textAlign,
    imgPosition,
    funcss,
    pattern,
    patternOpacity,
    showGradient,
    gradientPosition,
    gradientSize,
    blurry,
    opacity,
    gradientColors,
    fade,
    fadeDirection,
    fadeRadial,
    fadeOverlayDarken,
    backgroundImage,
    sectionClass,
    containerClass,
    textWrapperClass,
    imageWrapperClass,
    gap,
    // Enhanced content props
    heading,
    headingSize,
    headingWeight,
    headingColor,
    headingClass,
    subheading,
    subheadingSize,
    subheadingWeight,
    subheadingColor,
    subheadingClass,
    content,
    contentSize,
    contentWeight,
    contentColor,
    contentClass,
    image,
    imageUrl,
    imageSize,
    imageAlt,
    imageClass,
    cta,
    ctaClass,
    // CTA Button props
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
    ctaPrimaryRounded,
    ctaPrimaryFlat,
    ctaPrimaryPrefix,
    ctaPrimarySuffix,
    ctaSecondaryRounded,
    ctaSecondaryFlat,
    ctaSecondaryPrefix,
    ctaSecondarySuffix,
    ctaAccentRounded,
    ctaAccentFlat,
    ctaAccentPrefix,
    ctaAccentSuffix,
    primaryIconSize,
    secondaryIconSize,
    accentIconSize,
  });

  const layoutClass = [
    mergedProps.layout,
    mergedProps.reverse ? 'reverse' : '',
    `text-${mergedProps.textAlign}`,
  ]
    .filter(Boolean)
    .join(' ');

  // CTA Buttons Component
  const CTAButtons = () => {
    const hasCTAs = mergedProps.showPrimaryCTA || mergedProps.showSecondaryCTA || mergedProps.showAccentCTA;
    
    if (!hasCTAs) return null;

    return (
      <Flex 
        gap={mergedProps.ctaGap} 
        justify={mergedProps.ctaFlexJustify}
        className={`mt-6 ${mergedProps.ctaClass}`}
        wrap="wrap"
        width='100%'
      >
        {mergedProps.showPrimaryCTA && (
          <Button
            bg={"primary"}
            outlined={mergedProps.primaryButtonOutlined}
            onClick={() => window.location.href = mergedProps.ctaPrimaryUrl}
            rounded={mergedProps.ctaPrimaryRounded}
            flat={mergedProps.ctaPrimaryFlat}
            stringPrefix={mergedProps.ctaPrimaryPrefix}
            stringSuffix={mergedProps.ctaPrimarySuffix}
            iconSize={mergedProps.primaryIconSize}
          >
            {mergedProps.ctaPrimaryText}
          </Button>
        )}
        
        {mergedProps.showSecondaryCTA && (
          <Button
            bg={"secondary"}
            outlined={mergedProps.secondaryButtonOutlined}
            onClick={() => window.location.href = mergedProps.ctaSecondaryUrl}
            rounded={mergedProps.ctaSecondaryRounded}
            flat={mergedProps.ctaSecondaryFlat}
            stringPrefix={mergedProps.ctaSecondaryPrefix}
            stringSuffix={mergedProps.ctaSecondarySuffix}
            iconSize={mergedProps.secondaryIconSize}
          >
            {mergedProps.ctaSecondaryText}
          </Button>
        )}
        
        {mergedProps.showAccentCTA && (
          <Button
            bg={ "accent"}
            outlined={mergedProps.accentButtonOutlined}
            onClick={() => window.location.href = mergedProps.ctaAccentUrl}
            rounded={mergedProps.ctaAccentRounded}
            flat={mergedProps.ctaAccentFlat}
            stringPrefix={mergedProps.ctaAccentPrefix}
            stringSuffix={mergedProps.ctaAccentSuffix}
            iconSize={mergedProps.accentIconSize}
          >
            {mergedProps.ctaAccentText}
          </Button>
        )}
      </Flex>
    );
  };

  // Enhanced Text Content with flexible styling
  const TextContent = (
    <div className={`vista-text ${mergedProps.layout === 'centered' ? "text-center" : ""} ${mergedProps.textWrapperClass}`}>
      {mergedProps.heading && (
        <Text 
          block 
          size={mergedProps.headingSize}
          weight={mergedProps.headingWeight}
          color={mergedProps.headingColor}
          funcss={mergedProps.headingClass}
        >
          {mergedProps.heading}
        </Text>
      )}
      
      {mergedProps.subheading && (
        <Text 
          block 
          size={mergedProps.subheadingSize}
          weight={mergedProps.subheadingWeight}
          color={mergedProps.subheadingColor}
          funcss={`mt-2 ${mergedProps.subheadingClass}`}
        >
          {mergedProps.subheading}
        </Text>
      )}
      
      {mergedProps.content && (
        <Text 
          block 
          size={mergedProps.contentSize}
          weight={mergedProps.contentWeight}
          color={mergedProps.contentColor}
          funcss={`mt-4 ${mergedProps.contentClass}`}
          article
        >
          {children || (typeof mergedProps.content === 'string' ? <div dangerouslySetInnerHTML={{ __html: mergedProps.content }} /> : mergedProps.content)}
        </Text>
      )}
      
      {/* Render custom CTA or the new CTA buttons */}
      {mergedProps.cta ? (
        <div className={`mt-6 ${mergedProps.ctaClass}`}>
          {mergedProps.cta}
        </div>
      ) : (
        <CTAButtons />
      )}
    </div>
  );

  // Enhanced Image Content - uses imageUrl if no image component provided
  const ImageContent = (mergedProps.image || mergedProps.imageUrl) && (
    <div className={`vista-image ${mergedProps.imageWrapperClass}`}>
      {mergedProps.image ? (
        mergedProps.image
      ) : (
        <img 
          src={mergedProps.imageUrl} 
          alt={mergedProps.imageAlt || 'Vista image'}
          className={`${mergedProps.imageClass}`}
          style={{ 
            objectFit: 'cover',
            maxWidth: mergedProps.imageSize,
            borderRadius: 'inherit'
          }}
        />
      )}
    </div>
  );

  const isCentered = mergedProps.layout === 'centered';
  const isStacked = mergedProps.layout === 'stacked';

  const positionStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: '-100px', left: '-100px' },
    'top-right': { top: '-100px', right: '-100px' },
    'bottom-left': { bottom: '-100px', left: '-100px' },
    'bottom-right': { bottom: '-100px', right: '-100px' },
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };

  let primaryColor = getCssVariableValue('primary')
  let secondaryColor = getCssVariableValue('secondary')

  const gradientStyle: React.CSSProperties = {
    position: 'absolute',
    width: mergedProps.gradientSize,
    height: mergedProps.gradientSize,
    background: mergedProps.gradientColors || `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`,
    opacity: mergedProps.opacity,
    filter: `blur(${mergedProps.blurry}px)`,
    pointerEvents: 'none',
    zIndex: 0,
    ...positionStyles[mergedProps.gradientPosition],
  };

  return (
    <ScrollInView>
      <div
        className={`vista 
          ${mergedProps.pattern === 'grid' ? 'grid-bg' : 
            mergedProps.pattern === 'dots' ? 'bg-pattern-dots' : 
            mergedProps.pattern === 'diagonal' ? 'bg-pattern-diagonal' : 
            mergedProps.pattern === 'checkerboard' ? 'bg-pattern-checkerboard' :
            mergedProps.pattern === 'horizontal' ? 'bg-pattern-horizontal' :
            mergedProps.pattern === 'vertical' ? 'bg-pattern-vertical' : ''} 
            ${mergedProps.bg} p-${mergedProps.padding} ${layoutClass} ${mergedProps.sectionClass} ${mergedProps.funcss}`}
        style={{ 
          position: 'relative', 
          overflow: 'hidden',
          minHeight:"90vh",
          backgroundImage: mergedProps.pattern === 'grid' ? `linear-gradient(to right, rgba(var(--borderRgb), ${mergedProps.patternOpacity}) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(var(--borderRgb), ${mergedProps.patternOpacity}) 1px, transparent 1px)` :
          mergedProps.pattern === 'dots' ? `radial-gradient(rgba(var(--borderRgb), ${mergedProps.patternOpacity}) 1px, transparent 1px)` :
          mergedProps.pattern === 'diagonal' ? `repeating-linear-gradient(45deg, rgba(var(--borderRgb), ${mergedProps.patternOpacity}), rgba(var(--borderRgb), ${mergedProps.patternOpacity}) 1px, transparent 1px, transparent 10px)` :
          mergedProps.pattern === 'checkerboard' ? `linear-gradient(45deg, rgba(var(--borderRgb), ${mergedProps.patternOpacity}) 25%, transparent 25%), linear-gradient(-45deg, rgba(var(--borderRgb), ${mergedProps.patternOpacity}) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), ${mergedProps.patternOpacity}) 75%), linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), ${mergedProps.patternOpacity}) 75%)` :
          mergedProps.pattern === 'horizontal' ? `linear-gradient(to bottom, rgba(var(--borderRgb), ${mergedProps.patternOpacity}) 1px, transparent 1px)` :
          mergedProps.pattern === 'vertical' ? `linear-gradient(to right, rgba(var(--borderRgb), ${mergedProps.patternOpacity}) 1px, transparent 1px)` : ''
         }}
      >
        {mergedProps.showGradient && <div style={gradientStyle} />}
        <div className={`vista-container ${mergedProps.containerClass}`} style={{ position: 'relative', zIndex: 1 , gap: mergedProps.gap || "2rem" }}>
          {isCentered || isStacked ? (
            <>
              {(mergedProps.imgPosition === 'top') && ImageContent}
              {TextContent}
              {(mergedProps.imgPosition === 'bottom') && ImageContent}
            </>
          ) : mergedProps.reverse ? (
            <>
              {ImageContent}
              {TextContent}
            </>
          ) : (
            <>
              {(mergedProps.layout === 'imageLeft') && <Col>{ImageContent}</Col>}
              {TextContent}
              {(mergedProps.layout === 'imageRight') && <Col>{ImageContent}</Col>}
            </>
          )}
        </div>

        {mergedProps.fade &&(
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              background: mergedProps.fadeRadial
                ? `radial-gradient(circle, transparent 0%, ${getCssVariableValue(mergedProps.bg || 'page-bg')} 100%)`
                : `linear-gradient(to ${mergedProps.fadeDirection || 'bottom'}, ${getCssVariableValue(mergedProps.bg || 'page-bg')} 0%, transparent 100%)`,
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />
        )}
        {mergedProps.backgroundImage && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${mergedProps.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -1,
              width: '100%',
              height: '100%',
            }}
          />
        )}

        {mergedProps.backgroundImage && mergedProps.fadeOverlayDarken !== undefined && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              inset: 0,
              backgroundColor: `rgba(0, 0, 0, ${mergedProps.fadeOverlayDarken})`,
              zIndex: -1,
            }}
          />
        )}
      </div>
    </ScrollInView>
  );
};

export default Vista;