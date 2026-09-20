'use client';
import React, { useEffect, useState } from 'react';
import { useComponentConfiguration } from '../../utils/componentUtils';
import Text from '../text/Text';
import Button from '../button/Button';
import Flex from '../flex/Flex';
import { getDynamicIcon } from '../../utils/getDynamicIcon';

type NotificationProps = {
  variant?: string;
  
  // Position & State
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  state?: boolean;
  setOpen?: (state: boolean) => void;
  
  // Animation
  animation?: 'fadeIn' | 'slideIn' | 'scale' | 'bounce' | 'none';
  duration?: number; // in seconds
  autoHide?: boolean;
  autoHideDuration?: number; // in seconds
  
  // Main Content (no longer in JSON)
  avatarUrl?: string;
  avatarAlt?: string;
  avatarSize?: number;
  avatarClassName?: string;
  avatarRounded?: string;
  
  title?: React.ReactNode;
  titleSize?: string;
  titleWeight?: number;
  titleColor?: string;
  titleClassName?: string;
  titleVariant?: string;
  
  subtitle?: React.ReactNode;
  subtitleSize?: string;
  subtitleWeight?: number;
  subtitleColor?: string;
  subtitleClassName?: string;
  subtitleVariant?: string;
  
  timestamp?: string;
  timestampSize?: string;
  timestampColor?: string;
  timestampClassName?: string;
  
  icon?: string | React.ReactNode;
  iconColor?: string;
  iconSize?: number;
  iconClassName?: string;
  iconPosition?: 'left' | 'right';
  
  // Content
  content?: React.ReactNode;
  contentSize?: string;
  contentWeight?: number;
  contentColor?: string;
  contentClassName?: string;
  contentVariant?: string;
  
  // Footer/CTA customization
  ctaText?: string;
  ctaUrl?: string;
  ctaVariant?: 'primary' | 'secondary' | 'accent' | 'text' | 'outline';
  ctaOnClick?: () => void;
  ctaClassName?: string;
  ctaCss?: string;
  ctaAlign?: 'left' | 'center' | 'right';
  
  // Layout
  width?: string;
  maxWidth?: string;
  gap?: string;
  padding?: string;
  margin?: string;
  
  // Visual
  bg?: string;
  border?: boolean;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  shadow?: boolean;
  zIndex?: number;
  
  // Header flex layout
  headerGap?: string;
  headerAlign?: 'start' | 'center' | 'end';
  headerJustify?: 'start' | 'center' | 'end' | 'between' | 'around';
  
  // Container
  className?: string;
  funcss?: string;
  style?: React.CSSProperties;
  
  // Testing mode
  testing?: boolean;
  
  // Children
  children?: React.ReactNode;
  
  // Callbacks
  onClose?: () => void;
  onOpen?: () => void;
  onAction?: (action: string) => void;
};

// Custom hook for dynamic icons
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

// Icon component
const NotificationIcon: React.FC<{
  icon?: string | React.ReactNode;
  iconColor?: string;
  iconSize?: number;
  iconClassName?: string;
}> = ({ 
  icon, 
  iconColor, 
  iconSize = 20, 
  iconClassName = ''
}) => {
  const isStringIcon = icon && typeof icon === 'string';
  const { iconNode: dynamicIconNode, hasValidIcon: hasValidDynamicIcon } = useDynamicIcon(
    isStringIcon ? icon as string : undefined
  );

  // Get color class from color name
  const getColorClass = (color?: string): string => {
    if (!color) return '';
    
    if (color.startsWith('text-') || color.startsWith('bg-') || color.startsWith('border-')) {
      return color;
    }
    
    const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
    if (colorNames.includes(color)) {
      return `text-${color}`;
    }
    
    return '';
  };

  const colorClass = getColorClass(iconColor);

  const renderIconWithProps = (iconElement: React.ReactNode, className: string, size?: number) => {
    if (!React.isValidElement(iconElement)) return iconElement;
    
    const props: any = {
      className: `${className} ${colorClass}`.trim(),
    };
    
    if (size !== undefined) {
      props.size = size;
    }
    
    return React.cloneElement(iconElement, props);
  };

  if (icon && typeof icon !== 'string' && React.isValidElement(icon)) {
    return renderIconWithProps(
      icon,
      `notification__icon ${iconClassName}`.trim(),
      iconSize
    );
  }
  
  if (isStringIcon && hasValidDynamicIcon && dynamicIconNode) {
    return renderIconWithProps(
      dynamicIconNode,
      `notification__icon ${iconClassName}`.trim(),
      iconSize
    );
  }
  
  return null;
};

// Helper function to convert spacing string to number for Flex component
const getFlexGap = (value?: string): number => {
  if (!value) return 0.5; // Default gap for Flex
  
  // If it's already a number string (like "0.5"), convert to number
  if (/^\d+(\.\d+)?$/.test(value)) {
    return parseFloat(value);
  }
  
  // If it has a unit (like "0.5rem", "8px", "1em"), extract the number part
  const match = value.match(/^(\d+(\.\d+)?)/);
  if (match) {
    const num = parseFloat(match[1]);
    
    // Convert rem to equivalent number (1rem = 4 in Flex component spacing system)
    if (value.includes('rem')) {
      return num * 4; // Assuming Flex uses a base unit where 1 = 0.25rem
    }
    
    // Convert px to approximate number (assuming 1px ≈ 0.0625rem ≈ 0.25 in Flex system)
    if (value.includes('px')) {
      return num / 4; // Rough approximation
    }
    
    // For other units or unitless numbers, just return the number
    return num;
  }
  
  return 0.5; // Default fallback
};

// Helper function to get spacing value with unit for CSS
const getSpacingValue = (value?: string): string => {
  if (!value) return '';
  
  // If it's just a number, convert to rem (assuming number * 0.25rem)
  if (/^\d+$/.test(value)) {
    return `${parseInt(value) * 0.25}rem`;
  }
  
  // If it's a decimal number without unit, also convert to rem
  if (/^\d+(\.\d+)?$/.test(value)) {
    return `${parseFloat(value) * 0.25}rem`;
  }
  
  // If it already has a unit, return as-is
  return value;
};

// Notification Header Component
const NotificationHeader: React.FC<{
  globalProps: any;
}> = ({ globalProps }) => {
  const {
    avatarUrl,
    avatarAlt = 'Avatar',
    avatarSize = 60,
    avatarClassName = '',
    avatarRounded = '50%',
    
    title,
    titleSize,
    titleWeight,
    titleColor,
    titleClassName,
    titleVariant,
    
    subtitle,
    subtitleSize,
    subtitleWeight,
    subtitleColor,
    subtitleClassName,
    subtitleVariant,
    
    timestamp,
    timestampSize,
    timestampColor,
    timestampClassName,
    
    icon,
    iconColor,
    iconSize,
    iconClassName,
    iconPosition = 'right',
    
    headerGap = '0.75rem',
    headerAlign = 'start',
    headerJustify = 'between'
  } = globalProps;

  // Get background class from color name
  const getBgClass = (color?: string): string => {
    if (!color) return '';
    
    if (color.startsWith('bg-')) {
      return color;
    }
    
    const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
    if (colorNames.includes(color)) {
      return `bg-${color}`;
    }
    
    return '';
  };

  if (!title && !subtitle && !avatarUrl && !icon) {
    return null;
  }

  return (
    <div 
      className={`notification__header ${getBgClass(globalProps.headerBg)}`}
      style={{
        display: 'flex',
        alignItems: headerAlign,
        justifyContent: headerJustify,
        gap: getSpacingValue(headerGap),
      }}
    >
     <div className="col" style={{ flex: 1 }}>
       <Flex alignItems="flex-start" gap={getFlexGap(headerGap)} width='100%'>
        {avatarUrl && (
          <img 
            src={avatarUrl}
            alt={avatarAlt}
            className={`notification__avatar ${avatarClassName}`}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarRounded,
              objectFit: 'cover',
            }}
          />
        )}
        
        <div className="col" style={{ flex: 1 }}>
          <Flex gap={0.25} direction='column' fit>
          {title && (
            <Text 
              variant={titleVariant}
              block
              size={titleSize || 'md'}
              weight={titleWeight || 600}
              color={titleColor || 'default'}
              funcss={`notification__title ${titleClassName || ''}`}
            >
              {title}
            </Text>
          )}
          
          {subtitle && (
            <Text 
              block
              size={subtitleSize || 'sm'}
              weight={subtitleWeight || 400}
              lineHeight='0.9'
              color={subtitleColor || 'muted'}
              funcss={`notification__subtitle ${subtitleClassName || ''}`}
            >
              {subtitle}
            </Text>
          )}
          
          {timestamp && (
            <Text 
              size={timestampSize || 'xs'}
              color={timestampColor || 'light'}
              funcss={`notification__timestamp ${timestampClassName || ''}`}
              style={{
                marginTop: '0.25rem',
                opacity: 0.7,
              }}
            >
              {timestamp}
            </Text>
          )}
        </Flex>
        </div>
      </Flex>
     </div>
      
      {icon && iconPosition === 'right' && (
        <NotificationIcon
          icon={icon}
          iconColor={iconColor}
          iconSize={iconSize}
          iconClassName={iconClassName}
        />
      )}
      
      {icon && iconPosition === 'left' && (
        <NotificationIcon
          icon={icon}
          iconColor={iconColor}
          iconSize={iconSize}
          iconClassName={iconClassName}
        />
      )}
    </div>
  );
};

// Notification Content Component
const NotificationContent: React.FC<{
  globalProps: any;
}> = ({ globalProps }) => {
  const {
    content,
    contentSize,
    contentWeight,
    contentColor,
    contentClassName,
    contentVariant
  } = globalProps;

  if (!content) {
    return null;
  }

  if (typeof content === 'string') {
    return (
      <Text 
        block
        size={contentSize || 'md'}
        weight={contentWeight || 400}
        color={contentColor || ''}
        funcss={`notification__content ${contentClassName || ''}`}
      >
       <div dangerouslySetInnerHTML={{__html:  content}} />
      </Text>
    );
  }

  return (
    <div 
      className={`notification__content ${contentClassName || ''}`}
    >
      {content}
    </div>
  );
};

// Notification Footer Component
const NotificationFooter: React.FC<{
  globalProps: any;
  onClose?: () => void;
}> = ({ globalProps, onClose }) => {
  const {
    ctaText,
    ctaUrl,
    ctaVariant,
    ctaOnClick,
    ctaClassName,
    ctaCss,
    ctaAlign = 'right'
  } = globalProps;

  const handleCTAClick = ( url ?: string) => {
    if (url) {
      window.open(url, '_blank');
      return;
    }
    if (ctaOnClick) {
      ctaOnClick();
    }
    if (onClose) {
      onClose();
    }
  };

  if (!ctaText && !onClose) {
    return null;
  }

  return (
    <div 
      className="notification__footer"
      style={{
        display: 'flex',
        justifyContent: ctaAlign === 'left' ? 'flex-start' : ctaAlign === 'center' ? 'center' : 'flex-end',
        gap: getSpacingValue('0.75rem'), // Using getSpacingValue for consistency
      }}
    >
      {ctaText && (
        <Button
          url={ctaUrl}
          onClick={ () => handleCTAClick(ctaUrl) }
          funcss={`${ctaClassName || ''} ${ctaCss || ''}`}
          text={ctaText}
        />
      )}
      
      {onClose && (
        <Button
          onClick={onClose}
          funcss="notification__close-btn"
          text="Dismiss"
          style={{
            color: 'var(--text-muted)',
            opacity: 0.7,
          }}
        />
      )}
    </div>
  );
};

// Main Notification Component
const Notification: React.FC<NotificationProps> = (localProps) => {
  const { mergeWithLocal } = useComponentConfiguration('Notification', localProps.variant);
  const { props: mergedProps } = mergeWithLocal(localProps);
  const final = mergedProps;

  const [isOpen, setIsOpen] = useState(final.state || false);

  // Handle state changes
  useEffect(() => {
    if (final.state !== undefined) {
      setIsOpen(final.state);
      if (final.state && final.onOpen) {
        final.onOpen();
      }
    }
  }, [final.state]);

  // Auto-hide timer
  useEffect(() => {
    if (isOpen && final.autoHide) {
      const duration = final.autoHideDuration || 5;
      const timer = setTimeout(() => {
        handleClose();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, final.autoHide, final.autoHideDuration]);

  const handleClose = () => {
    if (final.setOpen) {
      final.setOpen(false);
    } else {
      setIsOpen(false);
    }
    
    if (final.onClose) {
      final.onClose();
    }
  };

  // Get background class from color name
  const getBgClass = (color?: string): string => {
    if (!color) return '';
    
    if (color.startsWith('bg-')) {
      return color;
    }
    
    const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
    if (colorNames.includes(color)) {
      return `bg-${color}`;
    }
    
    return '';
  };

  // Get border class from color name
  const getBorderClass = (color?: string): string => {
    if (!color) return '';
    
    if (color.startsWith('border-')) {
      return color;
    }
    
    const colorNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'dark', 'light'];
    if (colorNames.includes(color)) {
      return `border-${color}`;
    }
    
    return color === 'borderColor' ? 'border-default' : '';
  };

  const getAnimationStyle = (): React.CSSProperties => {
    if (!final.animation || final.animation === 'none') {
      return {};
    }
    
    const duration = final.duration || 0.3;
    
    return {
      animation: `${duration}s ${final.animation}`,
    };
  };

  const getPositionStyle = (): React.CSSProperties => {
    const position = final.position || 'top-right';
    
    const positionStyles: Record<string, React.CSSProperties> = {
      'top-right': {
        top: '20px',
        right: '20px',
      },
      'top-left': {
        top: '20px',
        left: '20px',
      },
      'bottom-right': {
        bottom: '20px',
        right: '20px',
      },
      'bottom-left': {
        bottom: '20px',
        left: '20px',
      },
      'top-center': {
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      'bottom-center': {
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
      }
    };
    
    return {
      position: final.testing ? 'absolute' : 'fixed',
      ...positionStyles[position],
      zIndex: final.zIndex || 1000,
    };
  };

  const getContainerClasses = (): string => {
    const classes = ['notification'];
    
    // Background class
    if (final.bg) {
      const bgClass = getBgClass(final.bg);
      if (bgClass) {
        classes.push(bgClass);
      }
    }
    
    // Border classes
    if (final.border) {
      classes.push('border');
      const borderClass = getBorderClass(final.borderColor);
      if (borderClass) {
        classes.push(borderClass);
      }
    }
    
    // Border radius
    const borderRadius = getSpacingValue(final.borderRadius);
    if (borderRadius === '0.25rem') classes.push('rounded-sm');
    else if (borderRadius === '0.5rem') classes.push('rounded-md');
    else if (borderRadius === '0.75rem') classes.push('rounded-lg');
    else if (borderRadius === '1rem') classes.push('rounded-xl');
    
    // Shadow
    if (final.shadow && final.shadow !== 'none') {
      classes.push(`${final.shadow ? "card" : ''}`);
    }
    
    // Custom classes
    if (final.className) {
      classes.push(final.className);
    }
    
    if (final.funcss) {
      classes.push(final.funcss);
    }
    
    return classes.filter(Boolean).join(' ');
  };

  const getContainerStyles = (): React.CSSProperties => {
    return {
      width: final.width || '450px',
      maxWidth: final.maxWidth || '90vw',
      padding: getSpacingValue(final.padding) || '1.25rem',
      margin: getSpacingValue(final.margin) || '0',
      borderWidth: final.borderWidth || '1px',
      ...getAnimationStyle(),
      ...getPositionStyle(),
      ...final.style,
      boxShadow:"var(--card)"
    };
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className={getContainerClasses()}
      style={getContainerStyles()}
    >
      <NotificationHeader globalProps={final} />
      <NotificationContent globalProps={final} />
      <NotificationFooter 
        globalProps={final}
        onClose={handleClose}
      />
      
      {final.children}
    </div>
  );
};

export default Notification;
export type { NotificationProps };
// 'use client';
// import React, { useEffect, useState } from 'react';
// import NotificationHeader from './Header';
// import NotificationContent from './Content';
// import NotificationFooter from './Footer';

// type NotificationProps = {
//   position: string;
//   funcss?: string;
//   animation?: string;
//   duration?: number; // in seconds
//   autoHide?: boolean;
//   autoHideDuration?: number;
//   children?: React.ReactNode;
//   state: boolean;
//   setOpen: (state: boolean) => void; // 👈 control from parent
//   width?: string;
//   header?: React.ReactNode;
//   content?: React.ReactNode;
//   footer?: React.ReactNode;
// };

// export default function Notification({
//   position,
//   funcss = '',
//   animation = 'fadeIn',
//   duration = 0.2,
//   autoHide = false,
//   autoHideDuration = 0.2,
//   children,
//   state,
//   setOpen, // 👈 receives the setter from parent
//   width = '450px',
//   header,
//   content,
//   footer,
// }: NotificationProps) {
//   useEffect(() => {
//     if (state && autoHide) {
//       const timer = setTimeout(() => {
//         setOpen(false); // 👈 close from inside
//       }, autoHideDuration * 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [state, autoHide, autoHideDuration, setOpen]);

//   if (!state) return null;

//   return (
//     <div
//       className={`notification ${position} ${funcss}`}
//       style={{ animation: `${duration}s ${animation}`, width }}
//     >
//       {header && <NotificationHeader>{header}</NotificationHeader>}
//       {content && <NotificationContent>{content}</NotificationContent>}
//       {footer && <NotificationFooter>{footer}</NotificationFooter>}
//       {children}
//     </div>
//   );
// }
