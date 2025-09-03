'use client';
import React from 'react';
import ScrollInView from '../ScrollInView/ScrollInView';
import { getCssVariableValue } from '../../utils/getCssVariable';

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

  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  content?: React.ReactNode;
  image?: React.ReactNode;
  cta?: React.ReactNode;

  sectionClass?: string;
  containerClass?: string;
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

  heading,
  subheading,
  content,
  image,
  cta,

  sectionClass = '',
  containerClass = '',
  textWrapperClass = '',
  imageWrapperClass = '',
  children,

  // Gradient Props
  showGradient = false,
  gradientPosition = 'bottom-right',
  gradientSize = '300px',
  blurry = 100,
  opacity = 0.4 ,
  gradientColors,

  fade = false,
  fadeDirection = 'bottom',
  fadeRadial = false,
  fadeOverlayDarken = 0.5,
  backgroundImage = '',
}) => {
  const layoutClass = [
    layout,
    reverse ? 'reverse' : '',
    `text-${textAlign}`,
  ]
    .filter(Boolean)
    .join(' ');

  const TextContent = (
    <div className={`vista-text ${textWrapperClass}`}>
      {heading}
      {subheading}
      {content}
      {cta}
      {children}
    </div>
  );

  const ImageContent = image && (
    <div className={`vista-image ${imageWrapperClass}`}>{image}</div>
  );

  const isCentered = layout === 'centered';
  const isStacked = layout === 'stacked';

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
    width: gradientSize,
    height: gradientSize,
    background: gradientColors || `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`,
    opacity: opacity,
    filter: `blur(${blurry}px)`,
    pointerEvents: 'none',
    zIndex: 0,
    ...positionStyles[gradientPosition],
  };

  return (
    <ScrollInView>
      <div
        className={`vista 
          ${pattern === 'grid' ? 'grid-bg' : 
            pattern === 'dots' ? 'bg-pattern-dots' : 
            pattern === 'diagonal' ? 'bg-pattern-diagonal' : 
            pattern === 'checkerboard' ? 'bg-pattern-checkerboard' :
            pattern === 'horizontal' ? 'bg-pattern-horizontal' :
            pattern === 'vertical' ? 'bg-pattern-vertical' : ''} 
            ${bg} ${padding} ${layoutClass} ${sectionClass} ${funcss}`}
        style={{ position: 'relative', 
          overflow: 'hidden'  ,
          backgroundImage: pattern === 'grid' ? `linear-gradient(to right, rgba(var(--borderRgb), ${patternOpacity}) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(var(--borderRgb), ${patternOpacity}) 1px, transparent 1px)` :
          pattern === 'dots' ? `radial-gradient(rgba(var(--borderRgb), ${patternOpacity}) 1px, transparent 1px)` :
          pattern === 'diagonal' ? `repeating-linear-gradient(45deg, rgba(var(--borderRgb), ${patternOpacity}), rgba(var(--borderRgb), ${patternOpacity}) 1px, transparent 1px, transparent 10px)` :
          pattern === 'checkerboard' ? `linear-gradient(45deg, rgba(var(--borderRgb), ${patternOpacity}) 25%, transparent 25%), linear-gradient(-45deg, rgba(var(--borderRgb), ${patternOpacity}) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), ${patternOpacity}) 75%), linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), ${patternOpacity}) 75%)` :
          pattern === 'horizontal' ? `linear-gradient(to bottom, rgba(var(--borderRgb), ${patternOpacity}) 1px, transparent 1px)` :
          pattern === 'vertical' ? `linear-gradient(to right, rgba(var(--borderRgb), ${patternOpacity}) 1px, transparent 1px)` : ''
         }}
      >
        {showGradient && <div style={gradientStyle} />}
        <div className={`vista-container ${containerClass}`} style={{ position: 'relative', zIndex: 1 }}>
          {isCentered || isStacked ? (
            <>
              {(imgPosition === 'top') && ImageContent}
              {TextContent}
              {(imgPosition === 'bottom') && ImageContent}
            </>
          ) : reverse ? (
            <>
              {ImageContent}
              {TextContent}
            </>
          ) : (
            <>
              {(layout === 'imageLeft') && ImageContent}
              {TextContent}
              {(layout === 'imageRight') && ImageContent}
            </>
          )}
        </div>

        {fade &&(
  <div
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      background: fadeRadial
        ? `radial-gradient(circle, transparent 0%, ${getCssVariableValue(bg || 'page-bg')} 100%)`
        : `linear-gradient(to ${fadeDirection || 'bottom'}, ${getCssVariableValue(bg || 'page-bg')} 0%, transparent 100%)`,
      zIndex: 0,
      pointerEvents: 'none'
    }}
  />
)}
{backgroundImage && (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: -1,
      width: '100%',
      height: '100%',
    }}
  />
)}

{backgroundImage && fadeOverlayDarken !== undefined && (
  <div
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      inset: 0,
      backgroundColor: `rgba(0, 0, 0, ${fadeOverlayDarken})`,
      zIndex: -1,
    }}
  />
)}


      </div>
    </ScrollInView>
  );
};

export default Vista;
