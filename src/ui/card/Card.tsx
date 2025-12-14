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
  
  // NEW CTA Button Props
  ctaPrimaryRounded?: boolean;
  ctaPrimaryFlat?: boolean;
  ctaPrimaryPrefix?: string;
  ctaPrimarySuffix?: string;
  primaryIconSize?: number;
  primaryButtonFuncss?: string;
  primaryButtonSmall?: boolean;

  ctaSecondaryRounded?: boolean;
  ctaSecondaryFlat?: boolean;
  ctaSecondaryPrefix?: string;
  ctaSecondarySuffix?: string;
  secondaryIconSize?: number;
  secondaryButtonFuncss?: string;
  secondaryButtonSmall?: boolean;

  ctaAccentRounded?: boolean;
  ctaAccentFlat?: boolean;
  ctaAccentPrefix?: string;
  ctaAccentSuffix?: string;
  accentIconSize?: number;
  accentButtonFuncss?: string;
  accentButtonSmall?: boolean;

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

export default function Card(localProps: CardProps) {
  // Use the component config hook with the variant from localProps
  const { mergeWithLocal } = useComponentConfiguration('Card', localProps.variant);
  
  // Merge config with local props - local props override config
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Use mergedProps directly - they already have the correct merge logic applied
  const final = mergedProps;

  const { variant: themeVariant } = useVariant();

  // Handle content - if string, use dangerouslySetInnerHTML, otherwise render as is
  const renderContent = (content: ReactNode) => {
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content;
  };

  // CTA Buttons Component
  const CTAButtons = () => {
    const hasCTAs = final.showPrimaryCTA || final.showSecondaryCTA || final.showAccentCTA;
    
    if (!hasCTAs) return null;

    return (
      <Flex 
        gap={final.ctaGap} 
        justify={final.ctaFlexJustify}
        className={`mt-4 ${final.ctaClass}`}
        wrap="wrap"
        width='100%'
      >
        {final.showPrimaryCTA && (
          <Button
            bg="primary"
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
            bg="secondary"
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
            bg="accent"
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

  // Enhanced Text Content with flexible styling
  const EnhancedTextContent = (
    <div className="card-enhanced-content">
      {final.heading && (
        <Text 
          block 
          size={final.headingSize}
          weight={final.headingWeight}
          color={final.headingColor}
          funcss={final.headingClass}
          lineHeight={final.headingLineHeight}
        >
          {renderContent(final.heading)}
        </Text>
      )}
      
      {final.subheading && (
        <Text 
          block 
          size={final.subheadingSize}
          weight={final.subheadingWeight}
          color={final.subheadingColor}
          funcss={`mt-1 ${final.subheadingClass}`}
          lineHeight={final.subheadingLineHeight}
        >
          {renderContent(final.subheading)}
        </Text>
      )}
      
      {final.content && (
        <Text 
          block 
          size={final.contentSize}
          weight={final.contentWeight}
          color={final.contentColor}
          funcss={`mt-3 ${final.contentClass}`}
          lineHeight={final.contentLineHeight}
          article
        >
          {renderContent(final.content)}
        </Text>
      )}
    </div>
  );

  // Image Content - uses imageUrl if no image component provided
  const ImageContent = (final.image || final.imageUrl) && (
    <div className="card-image-content">
      {final.image ? (
        final.image
      ) : (
        final.imageUrl && (
          <img 
            src={final.imageUrl} 
            alt={final.imageAlt}
            className={final.imageClass}
            style={{ 
              width: final.imageSize,
              height: 'auto',
              objectFit: 'cover',
              borderRadius: 'inherit'
            }}
          />
        )
      )}
    </div>
  );

  // Determine if we should use enhanced content
  const hasEnhancedContent = final.heading || final.subheading || final.content;
  const hasEnhancedFooter = final.showPrimaryCTA || final.showSecondaryCTA || final.showAccentCTA;
  const hasImageContent = final.image || final.imageUrl;

  return (
    <div
      id={final.id || ''}
      className={`
        card 
        card_flex
        ${!final.image && !final.imageUrl ? "p" : ""}
        ${final.noGap ? 'no-gap' : ''} 
        ${final.xl ? 'xl' : ''} 
        text-${final.color || ''} 
        ${final.bg || ''} 
        ${final.funcss || ''} 
        ${final.roundEdge ? 'round-edge' : ''} 
        ${final.shadowless ? 'shadowless' : ''} 
        ${final.flat ? 'flat' : ''} 
        ${final.horizontal ? 'horizontalCard' : ''}
        ${final.responsiveMedium ? 'responsiveMedium' : ''}
        ${final.responsiveSmall ? 'responsiveSmall' : ''}
        ${final.pattern !== 'none' ? `pattern-${final.pattern}` : ''}
      `}
      style={{
        width: `${final.width || ''}`,
        height: `${final.height || ''}`,
        minHeight: `${final.minHeight || ''}`,
        minWidth: `${final.minWidth || ''}`,
        maxHeight: final.maxHeight || '',
        maxWidth: final.maxWidth || '',
        margin: `${final.margin || ''}`,
        padding: `${final.padding || ''}`,
        background: final.gradient,
        opacity: final.opacity,
        position: 'relative',
        overflow: 'hidden',
        ...final.style
      }} 
    >
      {/* Pattern Overlay */}
      {final.pattern !== 'none' && (
        <div 
          className="card-pattern-overlay"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            opacity: final.patternOpacity,
            mixBlendMode: 'multiply',
            backgroundImage: 
              final.pattern === 'grid' ? 
                `linear-gradient(to right, rgba(var(--borderRgb), 1) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(var(--borderRgb), 1) 1px, transparent 1px)` :
              final.pattern === 'dots' ? 
                `radial-gradient(rgba(var(--borderRgb), 1) 1px, transparent 1px)` :
              final.pattern === 'diagonal' ? 
                `repeating-linear-gradient(45deg, rgba(var(--borderRgb), 1), rgba(var(--borderRgb), 1) 1px, transparent 1px, transparent 10px)` :
              final.pattern === 'checkerboard' ? 
                `linear-gradient(45deg, rgba(var(--borderRgb), 1) 25%, transparent 25%), 
                 linear-gradient(-45deg, rgba(var(--borderRgb), 1) 25%, transparent 25%), 
                 linear-gradient(45deg, transparent 75%, rgba(var(--borderRgb), 1) 75%), 
                 linear-gradient(-45deg, transparent 75%, rgba(var(--borderRgb), 1) 75%)` :
              final.pattern === 'horizontal' ? 
                `linear-gradient(to bottom, rgba(var(--borderRgb), 1) 1px, transparent 1px)` :
              final.pattern === 'vertical' ? 
                `linear-gradient(to right, rgba(var(--borderRgb), 1) 1px, transparent 1px)` : 'none',
            backgroundSize: 
              final.pattern === 'grid' ? '20px 20px' :
              final.pattern === 'dots' ? '10px 10px' :
              final.pattern === 'diagonal' ? '20px 20px' :
              final.pattern === 'checkerboard' ? '20px 20px' :
              final.pattern === 'horizontal' ? '100% 10px' :
              final.pattern === 'vertical' ? '10px 100%' : 'auto'
          }}
        />
      )}

      {/* Original image/fab or enhanced image */}
      {hasImageContent ? (
        ImageContent
      ) : (
        final.image ? <div className={`${final.fab ? 'relative' : ''}`}>{final.image} {final.fab ? final.fab : ''}</div> : ''
      )}

      <View funcss={hasImageContent ? 'p' : ''}>

      {/* Use enhanced content or original header */}
      {hasEnhancedContent ? (
        <CardHeader 
          style={final.headerStyle} 
          className={final.headerClass}
        >
          {EnhancedTextContent}
        </CardHeader>
      ) : (
        final.header && !final.horizontal ? (
          <CardHeader 
            style={final.headerStyle} 
            className={final.headerClass}
          >
            {renderContent(final.header)}
          </CardHeader>
        ) : ''
      )}

      {/* Body content */}
      {final.body ? 
        <div>
          {final.horizontal && !hasEnhancedContent ? (
            <CardHeader 
              style={final.headerStyle} 
              className={final.headerClass}
            >
              {renderContent(final.header)}
            </CardHeader>
          ) : ''}
          <CardBody 
            style={final.bodyStyle} 
            className={final.bodyClass}
          >
            {hasEnhancedContent ? EnhancedTextContent : renderContent(final.body)}
          </CardBody> 
          {final.horizontal && !hasEnhancedFooter ? (
            <CardFooter 
              style={final.footerStyle} 
              className={final.footerClass}
            >
              {renderContent(final.footer)}
            </CardFooter>
          ) : ''}
        </div>
      : ''}

      {/* Children content */}
      {final.children && (
        <CardBody 
          style={final.bodyStyle} 
          className={final.bodyClass}
        >
          {renderContent(final.children)}
        </CardBody>
      )}

      {/* Footer - Enhanced with CTA buttons or original footer */}
      {hasEnhancedFooter ? (
        <CardFooter 
          style={final.footerStyle} 
          className={final.footerClass}
        >
          <CTAButtons />
        </CardFooter>
      ) : (
        final.footer && !final.horizontal ? (
          <CardFooter 
            style={final.footerStyle} 
            className={final.footerClass}
          >
            {renderContent(final.footer)}
          </CardFooter>
        ) : ''
      )}
      </View>
    </div>
  );
}