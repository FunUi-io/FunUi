'use client';
import React, { useRef } from 'react';
import { getCssVariableValue } from '../../utils/getCssVariable';
import { useComponentConfiguration } from '../../utils/componentUtils';
import Text from '../text/Text';
import Button from '../button/Button';
import Flex from '../flex/Flex';
import Video from '../video/Video';

type VistaProps = {
  // Main component ID
  id?: string;
  
  // Background Mode Props
  backgroundMode?: 'plain' | 'background';
  gradientOverlay?: boolean;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientDirection?: 'linear' | 'radial' | 'even'; // Added 'even' option
  gradientLinearDirection?: 'to right' | 'to left' | 'to top' | 'to bottom' | 'to top right' | 'to top left' | 'to bottom right' | 'to bottom left';
  
  // Background Media Props
  backgroundMedia?: 'none' | 'image' | 'video';
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundImageSize?: 'cover' | 'contain' | 'auto';
  backgroundImagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  backgroundImageRepeat?: boolean;
  
  videoAutoplay?: boolean;
  videoLoop?: boolean;
  videoMuted?: boolean;
  videoPoster?: string;
  videoControls?: boolean;
  
  layout?: 'centered' | 'mediaLeft' | 'mediaRight' | 'stacked';
  pattern?: 'grid' | 'dots' | 'diagonal' | 'checkerboard' | 'horizontal' | 'vertical';
  patternOpacity?: number;
  reverse?: boolean;
  bg?: string;
  padding?: string;
  textAlign?: 'left' | 'center' | 'right';
  contentWrapperMaxWidth?: string;
  
  // Flex positioning props for background mode
  contentJustify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  contentAlign?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  
  mediaPosition?: 'top' | 'bottom';
  funcss?: string;
  blurry?: number;
  opacity?: number;

  // Content Props
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
  
  media?: React.ReactNode;
  mediaUrl?: string;
  mediaAlt?: string;
  mediaClass?: string;
  mediaSize?: string;
  
  cta?: React.ReactNode;
  ctaClass?: string;

  sectionClass?: string;
  containerClass?: string;
  gap?: string;
  contentWrapperClass?: string;
  mediaWrapperClass?: string;
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
  mediaCss?: string;

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
  primaryButtonBig?: boolean;

  // Secondary CTA Button Props
  ctaSecondaryRounded?: boolean;
  ctaSecondaryFlat?: boolean;
  ctaSecondaryPrefix?: string;
  ctaSecondarySuffix?: string;
  secondaryIconSize?: number;
  secondaryButtonFuncss?: string;
  secondaryButtonSmall?: boolean;
  secondaryButtonBig?: boolean;

  // Accent CTA Button Props
  ctaAccentRounded?: boolean;
  ctaAccentFlat?: boolean;
  ctaAccentPrefix?: string;
  ctaAccentSuffix?: string;
  accentIconSize?: number;
  accentButtonFuncss?: string;
  accentButtonSmall?: boolean;
  accentButtonBig?: boolean;

  ctaGap?: number;
  ctaFlexJustify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';

  // Media Type Props
  mediaType?: 'image' | 'video' | 'iframe' | 'custom';
  videoUrl?: string;
  iframeUrl?: string;
  iframeSize?: string;
  customMedia?: React.ReactNode;

  // Media Effects
  mediaFilter?: 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast' | 'none';
  mediaFilterValue?: number;
};

const Vista: React.FC<VistaProps> = (localProps) => {
  const { mergeWithLocal } = useComponentConfiguration('Vista', localProps.variant);
  const { props: mergedProps } = mergeWithLocal(localProps);
  const final = mergedProps;

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Helper function to get color from CSS variable name
  const getColorValue = (colorName?: string, fallback: string = '#000000'): string => {
    if (!colorName) return fallback;
    return getCssVariableValue(colorName) || fallback;
  };

  // Check if there's a background image/video
  const hasBackgroundMedia = () => {
    return final.backgroundMode === 'background' && 
           final.backgroundMedia !== 'none' && 
           (final.backgroundImage || final.backgroundVideo);
  };

  // Get default text colors based on background
  const getDefaultTextColor = () => {
    if (hasBackgroundMedia() || final.bg) {
      return '';
    }
    return '';
  };

  // Get gradient color value
  const getGradientColorValue = () => {
    return getColorValue(final.gradientColor, 'primary');
  };

  // Get media size
  const getMediaSize = () => {
    if (final.mediaSize) {
      return final.mediaSize;
    }
    
    if (final.mediaType === 'iframe' && final.iframeSize) {
      return final.iframeSize;
    }
    
    return undefined;
  };

  const layoutClass = [
    final.layout || 'centered',
    final.reverse ? 'reverse' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Filter styles helper
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
            big={final.primaryButtonBig}
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
            big={final.secondaryButtonBig}
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
            big={final.accentButtonBig}
          >
            {final.ctaAccentText}
          </Button>
        )}
      </Flex>
    );
  };

  // Content Component
  const ContentComponent = (
    <div 
      ref={contentRef}
      className={`vista-content ${final.layout === 'centered' ? "text-center" : ""} ${final.contentWrapperClass || ''}`}
      style={{
        position: 'relative',
        zIndex: 2,
        textAlign: final.textAlign || 'center', // Moved text-align here
      }}
    >
      {final.heading && (
        <Text 
          block 
          size={final.headingSize || "6xl"}
          weight={final.headingWeight}
          color={final.headingColor || getDefaultTextColor()}
          funcss={final.headingClass}
     textAlign={final.textAlign || "center"}
        >
          {final.heading}
        </Text>
      )}
      
      {final.subheading && (
        <Text 
          block 
          size={final.subheadingSize || "lg"}
          weight={final.subheadingWeight}
          color={final.subheadingColor || getDefaultTextColor()}
          funcss={`mt-2 ${final.subheadingClass || ''}`}
          textAlign={final.textAlign || "center"}
        >
          {final.subheading}
        </Text>
      )}
      
      {final.content && (
        <Text 
          block 
          size={final.contentSize}
          weight={final.contentWeight}
          color={final.contentColor || getDefaultTextColor()}
          funcss={`mt-4 ${final.contentClass || ''}`}
          article 
               textAlign={final.textAlign || "center"}
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

  // Media Component (only shown when not in background mode)
  const MediaComponent = () => {
    if (final.backgroundMode === 'background') return null;
    
    const mediaType = final.mediaType || 'image';
    const hasMedia = final.media || final.mediaUrl || final.videoUrl || final.iframeUrl || final.customMedia;
    
    if (!hasMedia) return null;

    const mediaSize = getMediaSize();
    
    const mediaWrapperStyle: React.CSSProperties = {
      position: 'relative',
      width: mediaSize || '100%',
      margin: '0 auto',
    };

    const mediaStyle: React.CSSProperties = {
      objectFit: 'cover',
      width: mediaSize || '100%',
      borderRadius: 'inherit',
      filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
    };

    return (
      <div 
        className={`vista-media ${final.mediaCss || ''} ${final.mediaWrapperClass || ''}`}
        style={mediaWrapperStyle}
      >
        {/* Custom Media */}
        {mediaType === 'custom' && final.customMedia && (
          <div style={{ position: 'relative', width: '100%' }}>
            {final.customMedia}
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
              funcss={final.mediaCss || ''}
              style={{
                filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
              }}
            />
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
                display: 'block',
                filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
              }}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="Vista media content"
            />
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

  const primaryColor = getColorValue('primary');
  const secondaryColor = getColorValue('secondary');

  const gradientStyle: React.CSSProperties = {
    position: 'absolute',
    width: final.gradientSize || "200px",
    height: final.gradientSize || "200px",
    background: final.gradientColors 
      ? `radial-gradient(circle, ${getColorValue(final.gradientColors.split(',')[0])}, ${getColorValue(final.gradientColors.split(',')[1])})`
      : `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`,
    opacity: final.opacity || 0.7,
    filter: `blur(${final.blurry || 4}rem)`,
    pointerEvents: 'none',
    zIndex: 0,
    ...positionStyles[final.gradientPosition || 'center'],
  };

  // Get gradient overlay style - UPDATED with 'even' option
  const getGradientOverlayStyle = () => {
    if (!final.gradientOverlay) return {};
    
    const gradientColor = getGradientColorValue();
    const opacity = final.gradientOpacity || 0.7;
    
    // When 'even' is selected, use solid color (same color from 0% to 100%)
    if (final.gradientDirection === 'even') {
      return {
        background: gradientColor,
        opacity: opacity,
      };
    }
    
    if (final.gradientDirection === 'radial') {
      return {
        background: `radial-gradient(circle at center, ${gradientColor} 0%, transparent 100%)`,
        opacity: opacity,
      };
    }
    
    // Default to linear gradient
    const direction = final.gradientLinearDirection || 'to right';
    
    // Correct gradient stops for different directions
    let gradientStops = '';
    switch (direction) {
      case 'to right':
        gradientStops = `${gradientColor} 0%, transparent 100%`;
        break;
      case 'to left':
        gradientStops = `transparent 0%, ${gradientColor} 100%`;
        break;
      case 'to bottom':
        gradientStops = `${gradientColor} 0%, transparent 100%`;
        break;
      case 'to top':
        gradientStops = `transparent 0%, ${gradientColor} 100%`;
        break;
      case 'to top right':
        gradientStops = `transparent 0%, ${gradientColor} 100%`;
        break;
      case 'to top left':
        gradientStops = `${gradientColor} 0%, transparent 100%`;
        break;
      case 'to bottom right':
        gradientStops = `${gradientColor} 0%, transparent 100%`;
        break;
      case 'to bottom left':
        gradientStops = `transparent 0%, ${gradientColor} 100%`;
        break;
      default:
        gradientStops = `${gradientColor} 0%, transparent 100%`;
    }
    
    return {
      background: `linear-gradient(${direction}, ${gradientStops})`,
      opacity: opacity,
    };
  };

  // Get fade color
  const getFadeColorValue = (): string => {
    if (!final.fade) return '';
    return getColorValue(final.fadeColor, 'page-bg') || '#ffffff';
  };

  // Get fade style
  const getFadeStyle = () => {
    const fadeColor = getFadeColorValue();
    if (!fadeColor) return {};
    
    if (final.fadeRadial) {
      return {
        background: `radial-gradient(circle, transparent 30%, ${fadeColor} 100%)`,
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
      id={final.id}
      className={`vista 
        ${final.backgroundMode === 'background' ? 'vista-background-mode' : ''}
        ${final.pattern === 'grid' ? 'grid-bg' : 
          final.pattern === 'dots' ? 'bg-pattern-dots' : 
          final.pattern === 'diagonal' ? 'bg-pattern-diagonal' : 
          final.pattern === 'checkerboard' ? 'bg-pattern-checkerboard' :
          final.pattern === 'horizontal' ? 'bg-pattern-horizontal' :
          final.pattern === 'vertical' ? 'bg-pattern-vertical' : ''} 
          ${final.bg ? `bg-${final.bg}` : ''} ${final.padding ? `p-${final.padding}` : ''} ${layoutClass} ${final.sectionClass || ''} ${final.funcss || ''}`}
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        minHeight: 'auto',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: final.pattern && final.backgroundMode !== 'background' ? 
          (final.pattern === 'grid' ? `linear-gradient(to right, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` :
          final.pattern === 'dots' ? `radial-gradient(rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` :
          final.pattern === 'diagonal' ? `repeating-linear-gradient(45deg, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}), rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px, transparent 10px)` :
          final.pattern === 'checkerboard' ? `linear-gradient(45deg, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 25%, transparent 25%), linear-gradient(-45deg, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 75%), linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 75%)` :
          final.pattern === 'horizontal' ? `linear-gradient(to bottom, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` :
          final.pattern === 'vertical' ? `linear-gradient(to right, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` : '') : undefined,
        backgroundSize: final.pattern && final.backgroundMode !== 'background' ? '40px 40px' : undefined,
      }}
    >
      {/* Background Image/Video */}
      {final.backgroundMode === 'background' && (
        <>
          {/* Background Image */}
          {final.backgroundMedia === 'image' && final.backgroundImage && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                backgroundImage: `url(${final.backgroundImage})`,
                backgroundSize: final.backgroundImageSize || 'cover',
                backgroundPosition: final.backgroundImagePosition || 'center',
                backgroundRepeat: final.backgroundImageRepeat ? 'repeat' : 'no-repeat',
              }}
            />
          )}
          
          {/* Background Video */}
          {final.backgroundMedia === 'video' && final.backgroundVideo && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                overflow: 'hidden',
              }}
            >
              <video
                autoPlay={final.videoAutoplay !== false}
                loop={final.videoLoop !== false}
                muted={final.videoMuted !== false}
                poster={final.videoPoster}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  minWidth: '100%',
                  minHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              >
                <source src={final.backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!final.videoControls && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  }}
                />
              )}
            </div>
          )}
        </>
      )}

      {/* Gradient Blob */}
      {final.showGradient && (
        <div
          className="vista-gradient-blob"
          style={gradientStyle}
        />
      )}

      {/* Gradient Overlay (in background mode) */}
      {final.backgroundMode === 'background' && final.gradientOverlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            ...getGradientOverlayStyle(),
            zIndex: 1,
            pointerEvents: 'none'
          }}
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
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Main Container - Different behavior for background vs plain mode */}
      {final.backgroundMode === 'background' ? (
        // BACKGROUND MODE: Full flex container for positioning
        <div 
          className={`vista-container ${final.containerClass || ''}`}
          style={{ 
            position: 'relative', 
            zIndex: 3,
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: final.contentJustify || 'center',
            alignItems: final.contentAlign || 'center',
            padding: '2rem',
          }}
        >
          {/* Content wrapper with max-width */}
          <div 
            style={{ 
              maxWidth: final.contentWrapperMaxWidth || '700px',
              width: '100%',
            }}
          >
            {ContentComponent}
          </div>
        </div>
      ) : (
        // PLAIN MODE: Regular layout with mediaLeft/mediaRight positioning
        <div className={`vista-container ${final.containerClass || ''}`} style={{ 
          position: 'relative', 
          zIndex: 3,
          gap: final.gap || "2rem",
          display: 'flex',
          flexDirection: isCentered || isStacked ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          maxWidth: '1200px',
          flexWrap: 'wrap',
          margin: '0 auto',
          padding: '2rem',
          minHeight: 'auto',
        }}>
          {isCentered || isStacked ? (
            <>
              {(final.mediaPosition === 'top') && <MediaComponent />}
              {/* Content wrapper with max-width for centered content */}
              <div 
                style={{ 
                  maxWidth: final.contentWrapperMaxWidth || '100%',
                  width: '100%',
                }}
              >
                {ContentComponent}
              </div>
              {(final.mediaPosition === 'bottom' || !final.mediaPosition) && <MediaComponent />}
            </>
          ) : final.reverse ? (
            <>
              <div style={{ flex: 1 }}>
                <MediaComponent />
              </div>
              <div style={{ flex: 1 }}>
                {ContentComponent}
              </div>
            </>
          ) : (
            <>
              {isMediaLeft && (
                <div style={{ flex: 1 }}>
                  <MediaComponent />
                </div>
              )}
              <div style={{ flex: 1 }}>
                {ContentComponent}
              </div>
              {isMediaRight && (
                <div style={{ flex: 1 }}>
                  <MediaComponent />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Vista;
// 'use client';
// import React, { useRef } from 'react';
// import { getCssVariableValue } from '../../utils/getCssVariable';
// import { useComponentConfiguration } from '../../utils/componentUtils';
// import Text from '../text/Text';
// import Button from '../button/Button';
// import Flex from '../flex/Flex';
// import Video from '../video/Video';

// type VistaProps = {
//   // Main component ID
//   id?: string;
  
//   // Background Mode Props
//   backgroundMode?: 'plain' | 'background';
//   gradientOverlay?: boolean;
//   gradientColor?: string;
//   gradientOpacity?: number;
//   gradientDirection?: 'linear' | 'radial';
//   gradientLinearDirection?: 'to right' | 'to left' | 'to top' | 'to bottom' | 'to top right' | 'to top left' | 'to bottom right' | 'to bottom left';
  
//   // Background Media Props
//   backgroundMedia?: 'none' | 'image' | 'video';
//   backgroundImage?: string;
//   backgroundVideo?: string;
//   backgroundImageSize?: 'cover' | 'contain' | 'auto';
//   backgroundImagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
//   backgroundImageRepeat?: boolean;
  
//   videoAutoplay?: boolean;
//   videoLoop?: boolean;
//   videoMuted?: boolean;
//   videoPoster?: string;
//   videoControls?: boolean;
  
//   layout?: 'centered' | 'mediaLeft' | 'mediaRight' | 'stacked';
//   pattern?: 'grid' | 'dots' | 'diagonal' | 'checkerboard' | 'horizontal' | 'vertical';
//   patternOpacity?: number;
//   reverse?: boolean;
//   bg?: string;
//   padding?: string;
//   textAlign?: 'left' | 'center' | 'right';
//   contentWrapperMaxWidth?: string;
  
//   // Flex positioning props for background mode
//   contentJustify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
//   contentAlign?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  
//   mediaPosition?: 'top' | 'bottom';
//   funcss?: string;
//   blurry?: number;
//   opacity?: number;

//   // Content Props
//   heading?: React.ReactNode;
//   headingSize?: string;
//   headingWeight?: number;
//   headingColor?: string;
//   headingClass?: string;
  
//   subheading?: React.ReactNode;
//   subheadingSize?: string;
//   subheadingWeight?: number;
//   subheadingColor?: string;
//   subheadingClass?: string;
  
//   content?: React.ReactNode;
//   contentSize?: string;
//   contentWeight?: number;
//   contentColor?: string;
//   contentClass?: string;
  
//   media?: React.ReactNode;
//   mediaUrl?: string;
//   mediaAlt?: string;
//   mediaClass?: string;
//   mediaSize?: string;
  
//   cta?: React.ReactNode;
//   ctaClass?: string;

//   sectionClass?: string;
//   containerClass?: string;
//   gap?: string;
//   contentWrapperClass?: string;
//   mediaWrapperClass?: string;
//   children?: React.ReactNode;

//   // Gradient Blob Props
//   showGradient?: boolean;
//   gradientPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
//   gradientSize?: string;
//   gradientColors?: string;

//   fade?: boolean;
//   fadeColor?: string;
//   fadeDirection?: 'top' | 'bottom' | 'left' | 'right';
//   fadeRadial?: boolean;
//   variant?: string;

//   // Responsive props
//   mediaCss?: string;

//   // CTA Button Props
//   showPrimaryCTA?: boolean;
//   showSecondaryCTA?: boolean;
//   showAccentCTA?: boolean;
//   primaryButtonOutlined?: boolean;
//   secondaryButtonOutlined?: boolean;
//   accentButtonOutlined?: boolean;
//   ctaPrimaryUrl?: string;
//   ctaSecondaryUrl?: string;
//   ctaAccentUrl?: string;
//   ctaPrimaryText?: string;
//   ctaSecondaryText?: string;
//   ctaAccentText?: string;
  
//   // Primary CTA Button Props
//   ctaPrimaryRounded?: boolean;
//   ctaPrimaryFlat?: boolean;
//   ctaPrimaryPrefix?: string;
//   ctaPrimarySuffix?: string;
//   primaryIconSize?: number;
//   primaryButtonFuncss?: string;
//   primaryButtonSmall?: boolean;
//   primaryButtonBig?: boolean;

//   // Secondary CTA Button Props
//   ctaSecondaryRounded?: boolean;
//   ctaSecondaryFlat?: boolean;
//   ctaSecondaryPrefix?: string;
//   ctaSecondarySuffix?: string;
//   secondaryIconSize?: number;
//   secondaryButtonFuncss?: string;
//   secondaryButtonSmall?: boolean;
//   secondaryButtonBig?: boolean;

//   // Accent CTA Button Props
//   ctaAccentRounded?: boolean;
//   ctaAccentFlat?: boolean;
//   ctaAccentPrefix?: string;
//   ctaAccentSuffix?: string;
//   accentIconSize?: number;
//   accentButtonFuncss?: string;
//   accentButtonSmall?: boolean;
//   accentButtonBig?: boolean;

//   ctaGap?: number;
//   ctaFlexJustify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';

//   // Media Type Props
//   mediaType?: 'image' | 'video' | 'iframe' | 'custom';
//   videoUrl?: string;
//   iframeUrl?: string;
//   iframeSize?: string;
//   customMedia?: React.ReactNode;

//   // Media Effects
//   mediaFilter?: 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast' | 'none';
//   mediaFilterValue?: number;
// };

// const Vista: React.FC<VistaProps> = (localProps) => {
//   const { mergeWithLocal } = useComponentConfiguration('Vista', localProps.variant);
//   const { props: mergedProps } = mergeWithLocal(localProps);
//   const final = mergedProps;

//   const sectionRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   // Helper function to get color from CSS variable name
//   const getColorValue = (colorName?: string, fallback: string = '#000000'): string => {
//     if (!colorName) return fallback;
//     return getCssVariableValue(colorName) || fallback;
//   };

//   // Check if there's a background image/video
//   const hasBackgroundMedia = () => {
//     return final.backgroundMode === 'background' && 
//            final.backgroundMedia !== 'none' && 
//            (final.backgroundImage || final.backgroundVideo);
//   };

//   // Get default text colors based on background
//   const getDefaultTextColor = () => {
//     if (hasBackgroundMedia() || final.bg) {
//       return '';
//     }
//     return '';
//   };

//   // Get gradient color value
//   const getGradientColorValue = () => {
//     return getColorValue(final.gradientColor, 'primary');
//   };

//   // Get media size
//   const getMediaSize = () => {
//     if (final.mediaSize) {
//       return final.mediaSize;
//     }
    
//     if (final.mediaType === 'iframe' && final.iframeSize) {
//       return final.iframeSize;
//     }
    
//     return undefined;
//   };

//   const layoutClass = [
//     final.layout || 'centered',
//     final.reverse ? 'reverse' : '',
//     `text-${final.textAlign || 'left'}`,
//   ]
//     .filter(Boolean)
//     .join(' ');

//   // Filter styles helper
//   const getFilterStyle = (
//     filter?: 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast' | 'none',
//     filterValue?: number
//   ) => {
//     if (!filter || filter === 'none') return '';
    
//     const value = filterValue || 1;
//     switch (filter) {
//       case 'grayscale':
//         return `grayscale(${value})`;
//       case 'sepia':
//         return `sepia(${value})`;
//       case 'blur':
//         return `blur(${value}px)`;
//       case 'brightness':
//         return `brightness(${value})`;
//       case 'contrast':
//         return `contrast(${value})`;
//       default:
//         return '';
//     }
//   };

//   // CTA Buttons Component
//   const CTAButtons = () => {
//     const hasCTAs = final.showPrimaryCTA || final.showSecondaryCTA || final.showAccentCTA;
    
//     if (!hasCTAs) return null;

//     return (
//       <Flex 
//         gap={final.ctaGap} 
//         justify={final.ctaFlexJustify}
//         className={`mt-6 ${final.ctaClass || ''}`}
//         wrap="wrap"
//         width='100%'
//       >
//         {final.showPrimaryCTA && (
//           <Button
//             bg={"primary"}
//             outlined={final.primaryButtonOutlined}
//             onClick={() => final.ctaPrimaryUrl && (window.location.href = final.ctaPrimaryUrl)}
//             rounded={final.ctaPrimaryRounded}
//             flat={final.ctaPrimaryFlat}
//             stringPrefix={final.ctaPrimaryPrefix}
//             stringSuffix={final.ctaPrimarySuffix}
//             iconSize={final.primaryIconSize}
//             funcss={final.primaryButtonFuncss}
//             small={final.primaryButtonSmall}
//             big={final.primaryButtonBig}
//           >
//             {final.ctaPrimaryText}
//           </Button>
//         )}
        
//         {final.showSecondaryCTA && (
//           <Button
//             bg={"secondary"}
//             outlined={final.secondaryButtonOutlined}
//             onClick={() => final.ctaSecondaryUrl && (window.location.href = final.ctaSecondaryUrl)}
//             rounded={final.ctaSecondaryRounded}
//             flat={final.ctaSecondaryFlat}
//             stringPrefix={final.ctaSecondaryPrefix}
//             stringSuffix={final.ctaSecondarySuffix}
//             iconSize={final.secondaryIconSize}
//             funcss={final.secondaryButtonFuncss}
//             small={final.secondaryButtonSmall}
//             big={final.secondaryButtonBig}
//           >
//             {final.ctaSecondaryText}
//           </Button>
//         )}
        
//         {final.showAccentCTA && (
//           <Button
//             bg={"accent"}
//             outlined={final.accentButtonOutlined}
//             onClick={() => final.ctaAccentUrl && (window.location.href = final.ctaAccentUrl)}
//             rounded={final.ctaAccentRounded}
//             flat={final.ctaAccentFlat}
//             stringPrefix={final.ctaAccentPrefix}
//             stringSuffix={final.ctaAccentSuffix}
//             iconSize={final.accentIconSize}
//             funcss={final.accentButtonFuncss}
//             small={final.accentButtonSmall}
//             big={final.accentButtonBig}
//           >
//             {final.ctaAccentText}
//           </Button>
//         )}
//       </Flex>
//     );
//   };

//   // Content Component
//   const ContentComponent = (
//     <div 
//       ref={contentRef}
//       className={`vista-content ${final.layout === 'centered' ? "text-center" : ""} ${final.contentWrapperClass || ''}`}
//       style={{
//         position: 'relative',
//         zIndex: 2,
//       }}
//     >
//       {final.heading && (
//         <Text 
//           block 
//           size={final.headingSize || "6xl"}
//           weight={final.headingWeight}
//           color={final.headingColor || getDefaultTextColor()}
//           funcss={final.headingClass}
//         >
//           {final.heading}
//         </Text>
//       )}
      
//       {final.subheading && (
//         <Text 
//           block 
//           size={final.subheadingSize || "lg"}
//           weight={final.subheadingWeight}
//           color={final.subheadingColor || getDefaultTextColor()}
//           funcss={`mt-2 ${final.subheadingClass || ''}`}
//         >
//           {final.subheading}
//         </Text>
//       )}
      
//       {final.content && (
//         <Text 
//           block 
//           size={final.contentSize}
//           weight={final.contentWeight}
//           color={final.contentColor || getDefaultTextColor()}
//           funcss={`mt-4 ${final.contentClass || ''}`}
//           article
//         >
//           {localProps.children || (typeof final.content === 'string' ? <div dangerouslySetInnerHTML={{ __html: final.content }} /> : final.content)}
//         </Text>
//       )}
      
//       {final.cta ? (
//         <div className={`mt-6 ${final.ctaClass || ''}`}>
//           {final.cta}
//         </div>
//       ) : (
//         <CTAButtons />
//       )}
//     </div>
//   );

//   // Media Component (only shown when not in background mode)
//   const MediaComponent = () => {
//     if (final.backgroundMode === 'background') return null;
    
//     const mediaType = final.mediaType || 'image';
//     const hasMedia = final.media || final.mediaUrl || final.videoUrl || final.iframeUrl || final.customMedia;
    
//     if (!hasMedia) return null;

//     const mediaSize = getMediaSize();
    
//     const mediaWrapperStyle: React.CSSProperties = {
//       position: 'relative',
//       width: '100%',
//       maxWidth: mediaSize || '100%',
//       margin: '0 auto',
//     };

//     const mediaStyle: React.CSSProperties = {
//       objectFit: 'cover',
//       maxWidth: mediaSize,
//       width: '100%',
//       borderRadius: 'inherit',
//       filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
//     };

//     return (
//       <div 
//         className={`vista-media ${final.mediaCss || ''} ${final.mediaWrapperClass || ''}`}
//         style={mediaWrapperStyle}
//       >
//         {/* Custom Media */}
//         {mediaType === 'custom' && final.customMedia && (
//           <div style={{ position: 'relative', width: '100%' }}>
//             {final.customMedia}
//           </div>
//         )}

//         {/* Video */}
//         {mediaType === 'video' && final.videoUrl && (
//           <div style={{ position: 'relative', maxWidth: mediaSize, width: '100%', aspectRatio: '16/9', margin: '0 auto'}}>
//             <Video
//               src={final.videoUrl}
//               autoPlay={final.videoAutoplay}
//               loop={final.videoLoop}
//               muted={final.videoMuted}
//               poster={final.videoPoster}
//               funcss={final.mediaCss || ''}
//               style={{
//                 filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
//               }}
//             />
//           </div>
//         )}

//         {/* iFrame */}
//         {mediaType === 'iframe' && final.iframeUrl && (
//           <div
//             className="vista-iframe-wrapper"
//             style={{
//               position: 'relative',
//               width: '100%',
//               maxWidth: mediaSize || '100%',
//               margin: '0 auto',
//               height: 'fit-content',
//             }}
//           >
//             <iframe
//               src={final.iframeUrl}
//               className={`vista-iframe ${final.mediaCss || ''}`}
//               style={{
//                 width: '100%',
//                 height: 'auto',
//                 aspectRatio: '16/9',
//                 border: 'none',
//                 display: 'block',
//                 filter: getFilterStyle(final.mediaFilter, final.mediaFilterValue),
//               }}
//               allowFullScreen
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               title="Vista media content"
//             />
//           </div>
//         )}

//         {/* Image */}
//         {mediaType === 'image' && (final.media || final.mediaUrl) && (
//           <div style={{ position: 'relative', width: '100%' }}>
//             {final.media ? (
//               <div style={{ width: '100%', maxWidth: mediaSize, margin: '0 auto' }}>
//                 {final.media}
//               </div>
//             ) : (
//               <img 
//                 src={final.mediaUrl} 
//                 alt={final.mediaAlt || 'Vista media'}
//                 className={final.mediaCss || ''}
//                 style={mediaStyle}
//                 loading="lazy"
//               />
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const isCentered = final.layout === 'centered';
//   const isStacked = final.layout === 'stacked';
//   const isMediaLeft = final.layout === 'mediaLeft';
//   const isMediaRight = final.layout === 'mediaRight';

//   const positionStyles: Record<string, React.CSSProperties> = {
//     'top-left': { top: '-100px', left: '-100px' },
//     'top-right': { top: '-100px', right: '-100px' },
//     'bottom-left': { bottom: '-100px', left: '-100px' },
//     'bottom-right': { bottom: '-100px', right: '-100px' },
//     center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
//   };

//   const primaryColor = getColorValue('primary');
//   const secondaryColor = getColorValue('secondary');

//   const gradientStyle: React.CSSProperties = {
//     position: 'absolute',
//     width: final.gradientSize || "200px",
//     height: final.gradientSize || "200px",
//     background: final.gradientColors 
//       ? `radial-gradient(circle, ${getColorValue(final.gradientColors.split(',')[0])}, ${getColorValue(final.gradientColors.split(',')[1])})`
//       : `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`,
//     opacity: final.opacity || 0.7,
//     filter: `blur(${final.blurry || 4}rem)`,
//     pointerEvents: 'none',
//     zIndex: 0,
//     ...positionStyles[final.gradientPosition || 'center'],
//   };

//   // Get gradient overlay style
//   const getGradientOverlayStyle = () => {
//     if (!final.gradientOverlay) return {};
    
//     const gradientColor = getGradientColorValue();
//     const opacity = final.gradientOpacity || 0.7;
    
//     if (final.gradientDirection === 'radial') {
//       return {
//         background: `radial-gradient(circle at center, ${gradientColor} 0%, transparent 100%)`,
//         opacity: opacity,
//       };
//     }
    
//     const direction = final.gradientLinearDirection || 'to right';
    
//     let gradientStops = '';
//     switch (direction) {
//       case 'to right':
//         gradientStops = `${gradientColor} 0%,transparent 100%`;
//         break;
//       case 'to left':
//         gradientStops = `transparent 0%, ${gradientColor} 100%`;
//         break;
//       case 'to bottom':
//         gradientStops = `${gradientColor} 0%,transparent 100%`;
//         break;
//       case 'to top':
//         gradientStops = `transparent 0%, ${gradientColor} 100%`;
//         break;
//       case 'to top right':
//         gradientStops = `transparent 0%, ${gradientColor} 100%`;
//         break;
//       case 'to top left':
//         gradientStops = `transparent 0%, ${gradientColor} 100%`;
//         break;
//       case 'to bottom right':
//         gradientStops = `${gradientColor} 0%, transparent 100%`;
//         break;
//       case 'to bottom left':
//         gradientStops = `${gradientColor} 0%, transparent 100%`;
//         break;
//       default:
//         gradientStops = `${gradientColor} 0%,transparent 100%`;
//     }
    
//     return {
//       background: `linear-gradient(${direction}, ${gradientStops})`,
//       opacity: opacity,
//     };
//   };

//   // Get fade color
//   const getFadeColorValue = (): string => {
//     if (!final.fade) return '';
//     return getColorValue(final.fadeColor, 'page-bg') || '#ffffff';
//   };

//   // Get fade style
//   const getFadeStyle = () => {
//     const fadeColor = getFadeColorValue();
//     if (!fadeColor) return {};
    
//     if (final.fadeRadial) {
//       return {
//         background: `radial-gradient(circle, transparent 30%, ${fadeColor} 100%)`,
//       };
//     }
    
//     const direction = final.fadeDirection || 'bottom';
//     const toDirectionMap: Record<string, string> = {
//       top: 'to top',
//       bottom: 'to bottom',
//       left: 'to left',
//       right: 'to right'
//     };
    
//     return {
//       background: `linear-gradient(${toDirectionMap[direction]}, transparent 0%, ${fadeColor} 100%)`,
//     };
//   };

//   return (
//     <div
//       ref={sectionRef}
//       id={final.id}
//       className={`vista 
//         ${final.backgroundMode === 'background' ? 'vista-background-mode' : ''}
//         ${final.pattern === 'grid' ? 'grid-bg' : 
//           final.pattern === 'dots' ? 'bg-pattern-dots' : 
//           final.pattern === 'diagonal' ? 'bg-pattern-diagonal' : 
//           final.pattern === 'checkerboard' ? 'bg-pattern-checkerboard' :
//           final.pattern === 'horizontal' ? 'bg-pattern-horizontal' :
//           final.pattern === 'vertical' ? 'bg-pattern-vertical' : ''} 
//           ${final.bg ? `bg-${final.bg}` : ''} ${final.padding ? `p-${final.padding}` : ''} ${layoutClass} ${final.sectionClass || ''} ${final.funcss || ''}`}
//       style={{ 
//         position: 'relative', 
//         overflow: 'hidden',
//         minHeight: 'auto',
//         height: 'fit-content',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundImage: final.pattern && final.backgroundMode !== 'background' ? 
//           (final.pattern === 'grid' ? `linear-gradient(to right, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px),
//           linear-gradient(to bottom, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` :
//           final.pattern === 'dots' ? `radial-gradient(rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` :
//           final.pattern === 'diagonal' ? `repeating-linear-gradient(45deg, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}), rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px, transparent 10px)` :
//           final.pattern === 'checkerboard' ? `linear-gradient(45deg, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 25%, transparent 25%), linear-gradient(-45deg, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 75%), linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 75%)` :
//           final.pattern === 'horizontal' ? `linear-gradient(to bottom, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` :
//           final.pattern === 'vertical' ? `linear-gradient(to right, rgba(var(--borderRgb), ${final.patternOpacity || 0.1}) 1px, transparent 1px)` : '') : undefined,
//         backgroundSize: final.pattern && final.backgroundMode !== 'background' ? '40px 40px' : undefined,
//       }}
//     >
//       {/* Background Image/Video */}
//       {final.backgroundMode === 'background' && (
//         <>
//           {/* Background Image */}
//           {final.backgroundMedia === 'image' && final.backgroundImage && (
//             <div
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 zIndex: 0,
//                 backgroundImage: `url(${final.backgroundImage})`,
//                 backgroundSize: final.backgroundImageSize || 'cover',
//                 backgroundPosition: final.backgroundImagePosition || 'center',
//                 backgroundRepeat: final.backgroundImageRepeat ? 'repeat' : 'no-repeat',
//               }}
//             />
//           )}
          
//           {/* Background Video */}
//           {final.backgroundMedia === 'video' && final.backgroundVideo && (
//             <div
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 zIndex: 0,
//                 overflow: 'hidden',
//               }}
//             >
//               <video
//                 autoPlay={final.videoAutoplay !== false}
//                 loop={final.videoLoop !== false}
//                 muted={final.videoMuted !== false}
//                 poster={final.videoPoster}
//                 style={{
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%, -50%)',
//                   minWidth: '100%',
//                   minHeight: '100%',
//                   width: 'auto',
//                   height: 'auto',
//                   objectFit: 'cover',
//                 }}
//               >
//                 <source src={final.backgroundVideo} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               {!final.videoControls && (
//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//                   }}
//                 />
//               )}
//             </div>
//           )}
//         </>
//       )}

//       {/* Gradient Blob */}
//       {final.showGradient && (
//         <div
//           className="vista-gradient-blob"
//           style={gradientStyle}
//         />
//       )}

//       {/* Gradient Overlay (in background mode) */}
//       {final.backgroundMode === 'background' && final.gradientOverlay && (
//         <div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             width: '100%',
//             height: '100%',
//             ...getGradientOverlayStyle(),
//             zIndex: 1,
//             pointerEvents: 'none'
//           }}
//         />
//       )}

//       {/* Fade Overlay */}
//       {final.fade && (
//         <div
//           className="vista-fade-overlay"
//           style={{
//             position: 'absolute',
//             inset: 0,
//             width: '100%',
//             height: '100%',
//             ...getFadeStyle(),
//             zIndex: 2,
//             pointerEvents: 'none'
//           }}
//         />
//       )}
      
//       {/* Main Container - Different behavior for background vs plain mode */}
//       {final.backgroundMode === 'background' ? (
//         // BACKGROUND MODE: Full flex container for positioning
//         <div 
//           className={`vista-container ${final.containerClass || ''}`}
//           style={{ 
//             position: 'relative', 
//             zIndex: 3,
//             display: 'flex',
//             width: '100%',
//             height: '100%',
//             justifyContent: final.contentJustify || 'center',
//             alignItems: final.contentAlign || 'center',
//             padding: '2rem',
//           }}
//         >
//           {/* Content wrapper with max-width */}
//           <div 
//             style={{ 
//               maxWidth: final.contentWrapperMaxWidth || '700px',
//               width: '100%',
//               textAlign: final.textAlign || 'left',
//             }}
//           >
//             {ContentComponent}
//           </div>
//         </div>
//       ) : (
//         // PLAIN MODE: Regular layout with mediaLeft/mediaRight positioning
//         <div className={`vista-container ${final.containerClass || ''}`} style={{ 
//           position: 'relative', 
//           zIndex: 3,
//           gap: final.gap || "2rem",
//           display: 'flex',
//           flexDirection: isCentered || isStacked ? 'column' : 'row',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: '100%',
//           height: '100%',
//           maxWidth: '1200px',
//           margin: '0 auto',
//           padding: '2rem',
//           minHeight: 'auto',
//         }}>
//           {isCentered || isStacked ? (
//             <>
//               {(final.mediaPosition === 'top') && <MediaComponent />}
//               {/* Content wrapper with max-width for centered content */}
//               <div 
//                 style={{ 
//                   maxWidth: final.contentWrapperMaxWidth || '100%',
//                   width: '100%',
//                   textAlign: final.textAlign || 'left',
//                 }}
//               >
//                 {ContentComponent}
//               </div>
//               {(final.mediaPosition === 'bottom' || !final.mediaPosition) && <MediaComponent />}
//             </>
//           ) : final.reverse ? (
//             <>
//               <div style={{ flex: 1 }}>
//                 <MediaComponent />
//               </div>
//               <div style={{ flex: 1 }}>
//                 {ContentComponent}
//               </div>
//             </>
//           ) : (
//             <>
//               {isMediaLeft && (
//                 <div style={{ flex: 1 }}>
//                   <MediaComponent />
//                 </div>
//               )}
//               <div style={{ flex: 1 }}>
//                 {ContentComponent}
//               </div>
//               {isMediaRight && (
//                 <div style={{ flex: 1 }}>
//                   <MediaComponent />
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Vista;