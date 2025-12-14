'use client';
import React, { useEffect, useRef, useState } from 'react';
import { getCssVariableValue } from '../../utils/getCssVariable';
import { useComponentConfiguration } from '../../utils/componentUtils';
import Text from '../text/Text';
import Button from '../button/Button';
import Flex from '../flex/Flex';
import Video from '../video/Video';

type VistaProps = {
  layout?: 'centered' | 'mediaLeft' | 'mediaRight' | 'stacked'; // Changed from imageLeft/imageRight
  pattern?: 'grid' | 'dots' | 'diagonal' | 'checkerboard' | 'horizontal' | 'vertical';
  patternOpacity?: number;
  reverse?: boolean;
  bg?: string;
  padding?: string;
  textAlign?: 'left' | 'center' | 'right';
  mediaPosition?: 'top' | 'bottom'; // Changed from imgPosition
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
  
  media?: React.ReactNode; // Changed from image
  mediaUrl?: string; // Changed from imageUrl
  mediaAlt?: string; // Changed from imageAlt
  mediaClass?: string; // Changed from imageClass
  mediaSize?: string; // This now affects all media types
  
  cta?: React.ReactNode;
  ctaClass?: string;

  sectionClass?: string;
  containerClass?: string;
  gap?: string;
  textWrapperClass?: string;
  mediaWrapperClass?: string; // Changed from imageWrapperClass
  children?: React.ReactNode;

  // Gradient Blob Props
  showGradient?: boolean;
  gradientPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  gradientSize?: string;
  gradientColors?: string;

  fade?: boolean;
  fadeColor?: string;
  fadeDirection?: 'top' | 'bottom' | 'left' | 'right';
  fadeRadial?: boolean;
  variant?: string;

  // Responsive props
  mediaCss?: string; // CSS that affects all media components

  // CTA Button Props
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
  
  // Primary CTA Button Props
  ctaPrimaryRounded?: boolean;
  ctaPrimaryFlat?: boolean;
  ctaPrimaryPrefix?: string;
  ctaPrimarySuffix?: string;
  primaryIconSize?: number;
  primaryButtonFuncss?: string;
  primaryButtonSmall?: boolean;

  // Secondary CTA Button Props
  ctaSecondaryRounded?: boolean;
  ctaSecondaryFlat?: boolean;
  ctaSecondaryPrefix?: string;
  ctaSecondarySuffix?: string;
  secondaryIconSize?: number;
  secondaryButtonFuncss?: string;
  secondaryButtonSmall?: boolean;

  // Accent CTA Button Props
  ctaAccentRounded?: boolean;
  ctaAccentFlat?: boolean;
  ctaAccentPrefix?: string;
  ctaAccentSuffix?: string;
  accentIconSize?: number;
  accentButtonFuncss?: string;
  accentButtonSmall?: boolean;

  ctaGap?: number;
  ctaFlexJustify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';

  // Media Type Props
  mediaType?: 'image' | 'video' | 'iframe' | 'custom';
  videoUrl?: string;
  videoAutoplay?: boolean;
  videoLoop?: boolean;
  videoMuted?: boolean;
  videoPoster?: string;
  videoControls?: boolean;
  iframeUrl?: string;
  iframeSize?: string;
  customMedia?: React.ReactNode;

  // Media Overlay & Effects (renamed from image*)
  mediaOverlay?: boolean; // Changed from imageOverlay
  mediaOverlayColor?: string; // Changed from imageOverlayColor
  mediaOverlayOpacity?: number; // Changed from imageOverlayOpacity
  mediaFilter?: 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast' | 'none'; // Changed from imageFilter
  mediaFilterValue?: number; // Changed from imageFilterValue
  mediaBlendMode?: 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten'; // Changed from imageBlendMode

  // Hover Effects
  hoverEffect?: 'lift' | 'scale' | 'tilt' | 'glow' | 'none';
  parallax?: boolean;
  parallaxSpeed?: number;
};

const Vista: React.FC<VistaProps> = (localProps) => {
  const { mergeWithLocal } = useComponentConfiguration('Vista', localProps.variant);
  const { props: mergedProps } = mergeWithLocal(localProps);
  const final = mergedProps;

  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  useEffect(() => {
    if (!final.parallax) return;

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top;
        setScrollY(scrollProgress * (final.parallaxSpeed || 0.5));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [final.parallax, final.parallaxSpeed]);

  // Get media size - updated logic for all media types
  const getMediaSize = () => {
    // Priority order for mediaSize:
    // 1. If mediaSize is passed, it affects all media types
    // 2. For backward compatibility, also check iframeSize for iframes
    // 3. Fallback to undefined
    
    if (final.mediaSize) {
      return final.mediaSize;
    }
    
    // For backward compatibility with iframeSize
    if (final.mediaType === 'iframe' && final.iframeSize) {
      return final.iframeSize;
    }
    
    return undefined;
  };

  const layoutClass = [
    final.layout || 'centered',
    final.reverse ? 'reverse' : '',
    `text-${final.textAlign || 'left'}`,
  ]
    .filter(Boolean)
    .join(' ');

  // Hover effect class
  const getHoverClass = () => {
    if (!final.hoverEffect || final.hoverEffect === 'none') return '';
    return `vista-hover-${final.hoverEffect}`;
  };

  // Filter styles helper - used for all media types
  const getFilterStyle = (
    filter?: 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast' | 'none',
    filterValue?: number
  ) => {
    if (!filter || filter === 'none') return '';
    
    const value = filterValue || 1;
    switch (filter) {
      case 'grayscale':
        return `grayscale(${value})`;
      case 'sepia':
        return `sepia(${value})`;
      case 'blur':
        return `blur(${value}px)`;
      case 'brightness':
        return `brightness(${value})`;
      case 'contrast':
        return `contrast(${value})`;
      default:
        return '';
    }
  };

  // CTA Buttons Component
  const CTAButtons = () => {
    const hasCTAs = final.showPrimaryCTA || final.showSecondaryCTA || final.showAccentCTA;
    
    if (!hasCTAs) return null;

    return (
      <Flex 
        gap={final.ctaGap} 
        justify={final.ctaFlexJustify}
        className={`mt-6 ${final.ctaClass || ''}`}
        wrap="wrap"
        width='100%'
      >
        {final.showPrimaryCTA && (
          <Button
            bg={"primary"}
            outlined={final.primaryButtonOutlined}
            onClick={() => final.ctaPrimaryUrl && (window.location.href = final.ctaPrimaryUrl)}
            rounded={final.ctaPrimaryRounded}
            flat={final.ctaPrimaryFlat}
            stringPrefix={final.ctaPrimaryPrefix}
            stringSuffix={final.ctaPrimarySuffix}
            iconSize={final.primaryIconSize}
            funcss={final.primaryButtonFuncss}
            small={final.primaryButtonSmall}
          >
            {final.ctaPrimaryText}
          </Button>
        )}
        
        {final.showSecondaryCTA && (
          <Button
            bg={"secondary"}
            outlined={final.secondaryButtonOutlined}
            onClick={() => final.ctaSecondaryUrl && (window.location.href = final.ctaSecondaryUrl)}
            rounded={final.ctaSecondaryRounded}
            flat={final.ctaSecondaryFlat}
            stringPrefix={final.ctaSecondaryPrefix}
            stringSuffix={final.ctaSecondarySuffix}
            iconSize={final.secondaryIconSize}
            funcss={final.secondaryButtonFuncss}
            small={final.secondaryButtonSmall}
          >
            {final.ctaSecondaryText}
          </Button>
        )}
        
        {final.showAccentCTA && (
          <Button
            bg={"accent"}
            outlined={final.accentButtonOutlined}
            onClick={() => final.ctaAccentUrl && (window.location.href = final.ctaAccentUrl)}
            rounded={final.ctaAccentRounded}
            flat={final.ctaAccentFlat}
            stringPrefix={final.ctaAccentPrefix}
            stringSuffix={final.ctaAccentSuffix}
            iconSize={final.accentIconSize}
            funcss={final.accentButtonFuncss}
            small={final.accentButtonSmall}
          >
            {final.ctaAccentText}
          </Button>
        )}
      </Flex>
    );
  };

  // Enhanced Text Content
  const TextContent = (
    <div className={`vista-text ${final.layout === 'centered' ? "text-center" : ""} ${final.textWrapperClass || ''}`}>
      {final.heading && (
        <Text 
          block 
          size={final.headingSize}
          weight={final.headingWeight}
          color={final.headingColor}
          funcss={final.headingClass}
        >
          {final.heading}
        </Text>
      )}
      
      {final.subheading && (
        <Text 
          block 
          size={final.subheadingSize}
          weight={final.subheadingWeight}
          color={final.subheadingColor}
          funcss={`mt-2 ${final.subheadingClass || ''}`}
        >
          {final.subheading}
        </Text>
      )}
      
      {final.content && (
        <Text 
          block 
          size={final.contentSize}
          weight={final.contentWeight}
          color={final.contentColor}
          funcss={`mt-4 ${final.contentClass || ''}`}
          article
        >
          {localProps.children || (typeof final.content === 'string' ? <div dangerouslySetInnerHTML={{ __html: final.content }} /> : final.content)}
        </Text>
      )}
      
      {final.cta ? (
        <div className={`mt-6 ${final.ctaClass || ''}`}>
          {final.cta}
        </div>
      ) : (
        <CTAButtons />
      )}
    </div>
  );

  // Enhanced Media Content
  const MediaContent = () => {
    const mediaType = final.mediaType || 'image';
    const hasMedia = final.media || final.mediaUrl || final.videoUrl || final.iframeUrl || final.customMedia;
    
    if (!hasMedia) return null;

    const mediaSize = getMediaSize();
    
    const mediaWrapperStyle: React.CSSProperties = {
      position: 'relative',
      transform: final.parallax ? `translateY(${scrollY}px)` : undefined,
      transition: final.parallax ? 'transform 0.1s linear' : undefined,
      width: '100%',
      maxWidth: mediaSize || '100%',
      margin: '0 auto',
    };

    const mediaStyle: React.CSSProperties = {
      objectFit: 'cover',
      maxWidth: mediaSize,
      width: '100%',
      borderRadius: 'inherit',
      filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
      mixBlendMode: final.mediaBlendMode as any,
    };

    const overlayStyle: React.CSSProperties = final.mediaOverlay ? {
      position: 'absolute',
      inset: 0,
      backgroundColor: final.mediaOverlayColor || 'rgba(0, 0, 0, 0.3)',
      opacity: final.mediaOverlayOpacity ?? 1,
      pointerEvents: 'none',
      borderRadius: 'inherit',
      zIndex: 1,
    } : {};

    return (
      <div 
        className={`vista-media ${final.mediaCss || ''} ${final.mediaWrapperClass || ''}`}
        style={mediaWrapperStyle}
      >
        {/* Custom Media */}
        {mediaType === 'custom' && final.customMedia && (
          <div style={{ position: 'relative', width: '100%' }}>
            {final.customMedia}
            {final.mediaOverlay && <div style={overlayStyle} />}
          </div>
        )}

        {/* Video */}
        {mediaType === 'video' && final.videoUrl && (
          <div style={{ position: 'relative', maxWidth: mediaSize, width: '100%', aspectRatio: '16/9', margin: '0 auto'}}>
            <Video
              src={final.videoUrl}
              autoPlay={final.videoAutoplay}
              loop={final.videoLoop}
              muted={final.videoMuted}
              poster={final.videoPoster}
              funcss={final.mediaCss || ''}
              style={{
                filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
                mixBlendMode: final.mediaBlendMode as any,
              }}
            />
            {final.mediaOverlay && <div style={overlayStyle} />}
          </div>
        )}

{/* iFrame */}
{mediaType === 'iframe' && final.iframeUrl && (
  <div
    className="vista-iframe-wrapper"
    style={{
      position: 'relative',
      width: '100%',
      maxWidth: mediaSize || '100%',
      margin: '0 auto',
      height: 'fit-content',
    }}
  >
    <iframe
      src={final.iframeUrl}
      className={`vista-iframe ${final.mediaCss || ''}`}
      style={{
        width: '100%',
        height: 'auto', 
        aspectRatio: '16/9',
        border: 'none',
        display: 'block', // Crucial for 'height: auto' to work reliably
        filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
        mixBlendMode: final.mediaBlendMode as any,
      }}
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      title="Vista media content"
    />
    {final.mediaOverlay && <div style={overlayStyle} />}
  </div>
)}

        {/* Image */}
        {mediaType === 'image' && (final.media || final.mediaUrl) && (
          <div style={{ position: 'relative', width: '100%' }}>
            {final.media ? (
              <div style={{ width: '100%', maxWidth: mediaSize, margin: '0 auto' }}>
                {final.media}
              </div>
            ) : (
              <img 
                src={final.mediaUrl} 
                alt={final.mediaAlt || 'Vista media'}
                className={final.mediaCss || ''}
                style={mediaStyle}
                loading="lazy"
              />
            )}
            {final.mediaOverlay && <div style={overlayStyle} />}
          </div>
        )}
      </div>
    );
  };

  const isCentered = final.layout === 'centered';
  const isStacked = final.layout === 'stacked';
  const isMediaLeft = final.layout === 'mediaLeft';
  const isMediaRight = final.layout === 'mediaRight';

  const positionStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: '-100px', left: '-100px' },
    'top-right': { top: '-100px', right: '-100px' },
    'bottom-left': { bottom: '-100px', left: '-100px' },
    'bottom-right': { bottom: '-100px', right: '-100px' },
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };

  const primaryColor = getCssVariableValue('primary');
  const secondaryColor = getCssVariableValue('secondary');

  const gradientStyle: React.CSSProperties = {
    position: 'absolute',
    width: final.gradientSize || "200px",
    height: final.gradientSize || "200px",
    background: final.gradientColors || `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`,
    opacity: final.opacity || 0.7,
    filter: `blur(${final.blurry || 4}rem)`,
    pointerEvents: 'none',
    zIndex: 0,
    ...positionStyles[final.gradientPosition || 'center'],
  };

  // Get fade color - accepts color variable name or color string
  const getFadeColor = (): string => {
    if (!final.fade) return '';
    
    if (final.fadeColor) {
      // Try to get CSS variable value
      const colorValue = getCssVariableValue(final.fadeColor);
      if (colorValue) return colorValue;
      
      // If not a variable, assume it's a color string
      return final.fadeColor;
    }
    
    // Default to page background
    return getCssVariableValue('page-bg') || '#ffffff';
  };

  // Get fade style
  const getFadeStyle = () => {
    const fadeColor = getFadeColor();
    if (!fadeColor) return {};
    
    if (final.fadeRadial) {
      return {
        background: `radial-gradient(circle, transparent 0%, ${fadeColor} 100%)`,
      };
    }
    
    const direction = final.fadeDirection || 'bottom';
    const toDirectionMap: Record<string, string> = {
      top: 'to top',
      bottom: 'to bottom',
      left: 'to left',
      right: 'to right'
    };
    
    return {
      background: `linear-gradient(${toDirectionMap[direction]}, transparent 0%, ${fadeColor} 100%)`,
    };
  };

  return (
    <div
      ref={sectionRef}
      className={`vista 
        ${final.pattern === 'grid' ? 'grid-bg' : 
          final.pattern === 'dots' ? 'bg-pattern-dots' : 
          final.pattern === 'diagonal' ? 'bg-pattern-diagonal' : 
          final.pattern === 'checkerboard' ? 'bg-pattern-checkerboard' :
          final.pattern === 'horizontal' ? 'bg-pattern-horizontal' :
          final.pattern === 'vertical' ? 'bg-pattern-vertical' : ''} 
          ${final.bg ? `bg-${final.bg}` : ''} ${final.padding ? `p-${final.padding}` : ''} ${layoutClass} ${final.sectionClass || ''} ${final.funcss || ''}
          ${getHoverClass()}`}
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        minHeight: "90vh",
        backgroundImage: final.pattern === 'grid' ? `linear-gradient(to right, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` :
        final.pattern === 'dots' ? `radial-gradient(rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` :
        final.pattern === 'diagonal' ? `repeating-linear-gradient(45deg, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}), rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px, transparent 10px)` :
        final.pattern === 'checkerboard' ? `linear-gradient(45deg, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 25%, transparent 25%), linear-gradient(-45deg, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 75%), linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 75%)` :
        final.pattern === 'horizontal' ? `linear-gradient(to bottom, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` :
        final.pattern === 'vertical' ? `linear-gradient(to right, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` : '',
        backgroundSize: final.pattern ? '40px 40px' : undefined,
      }}
    >
      {/* Gradient Blob */}
      {final.showGradient && (
        <div
          className="vista-gradient-blob"
          style={gradientStyle}
        />
      )}

      {/* Fade Overlay */}
      {final.fade && (
        <div
          className="vista-fade-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            ...getFadeStyle(),
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Main Content */}
      <div className={`vista-container ${final.containerClass || ''}`} style={{ 
        position: 'relative', 
        zIndex: 1,
        gap: final.gap || "2rem",
        display: 'flex',
        flexDirection: isCentered || isStacked ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
      }}>
        {isCentered || isStacked ? (
          <>
            {(final.mediaPosition === 'top') && <MediaContent />}
            {TextContent}
            {(final.mediaPosition === 'bottom' || !final.mediaPosition) && <MediaContent />}
          </>
        ) : final.reverse ? (
          <>
            <div style={{ flex: 1 }}>
              <MediaContent />
            </div>
            <div style={{ flex: 1 }}>
              {TextContent}
            </div>
          </>
        ) : (
          <>
            {isMediaLeft && (
              <div style={{ flex: 1 }}>
                <MediaContent />
              </div>
            )}
            <div style={{ flex: 1 }}>
              {TextContent}
            </div>
            {isMediaRight && (
              <div style={{ flex: 1 }}>
                <MediaContent />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Vista;