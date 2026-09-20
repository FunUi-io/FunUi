'use client';
import * as React from 'react';
import { createPortal } from 'react-dom';

interface ToolTipProps {
  funcss?: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  message?: React.ReactNode;
  animation?: string;
  duration?: number;
  tip?: 'top' | 'bottom' | 'left' | 'right';
  usePortal?: boolean;
  disabled?: boolean;
  delay?: number;
}

export default function ToolTip({ 
  funcss, 
  children, 
  content, 
  message, 
  animation, 
  duration, 
  tip = 'top',
  usePortal = true,
  disabled = false,
  delay = 200,
  ...rest 
}: ToolTipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = React.useRef(true);

  const text = message || content || children;

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    // Don't show tooltip if disabled
    if (disabled) return;
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Add delay before showing tooltip
    timeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;
      
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        
        let x = rect.left + (rect.width / 2);
        let y = rect.top;
        
        if (tip === 'bottom') {
          y = rect.bottom;
        } else if (tip === 'left') {
          x = rect.left;
          y = rect.top + (rect.height / 2);
        } else if (tip === 'right') {
          x = rect.right;
          y = rect.top + (rect.height / 2);
        }
        
        const scrollX = typeof window !== 'undefined' ? window.scrollX : 0;
        const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
        
        setCoords({ x: x + scrollX, y: y + scrollY });
        setIsVisible(true);
      }
    }, delay);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Clear timeout if mouse leaves before tooltip shows
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsVisible(false);
  };

  // Prevent event propagation that could interfere with charts
  const handleMouseMove = (e: React.MouseEvent) => {
    // Don't stop propagation - let events flow naturally
    // This allows chart interactions to work properly
  };

  const isBrowser = typeof window !== 'undefined';
  
  const tooltipStyle: React.CSSProperties = isBrowser ? {
    position: 'fixed',
    top: coords.y,
    left: coords.x,
    zIndex: 10000, // Higher than dropdown to avoid conflicts
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden', // Proper hiding
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
    pointerEvents: 'none', // Critical: don't interfere with mouse events
    willChange: isVisible ? 'opacity' : 'auto', // Performance optimization
    transform: tip === 'top' ? 'translate(-50%, calc(-100% - 8px))' :
               tip === 'bottom' ? 'translate(-50%, 8px)' :
               tip === 'left' ? 'translate(calc(-100% - 8px), -50%)' :
               'translate(8px, -50%)',
  } : {};

  // Only render portal content when actually visible
  const shouldRenderPortal = isBrowser && usePortal && text && isVisible;

  return (
    <>
      <span
        ref={triggerRef}
        className={`tooltip ${funcss || ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          display: 'inline-block', // Ensure proper boundary calculation
          position: 'relative',
        }}
        {...rest}
      >
        {!usePortal && text && isVisible && (
          <div 
            className={`tip tip-${tip}`}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              zIndex: 1,
            }}
          >
            {text}
          </div>
        )}
        {children && children !== text ? children : null}
      </span>
      
      {shouldRenderPortal && createPortal(
        <div 
          className={`tip tip-${tip}`} 
          style={tooltipStyle}
          role="tooltip"
          aria-hidden="true"
        >
          {text}
        </div>,
        document.body
      )}
    </>
  );
}

// 'use client';
// import * as React from 'react';
// import { createPortal } from 'react-dom';

// interface ToolTipProps {
//   funcss?: string;
//   children?: React.ReactNode;
//   content?: React.ReactNode;
//   message?: React.ReactNode;
//   animation?: string;
//   duration?: number;
//   tip?: 'top' | 'bottom' | 'left' | 'right';
//   usePortal?: boolean;
// }

// export default function ToolTip({ 
//   funcss, 
//   children, 
//   content, 
//   message, 
//   animation, 
//   duration, 
//   tip = 'top',
//   usePortal = true,
//   ...rest 
// }: ToolTipProps) {
//   const [isVisible, setIsVisible] = React.useState(false);
//   const [coords, setCoords] = React.useState({ x: 0, y: 0 });
//   const triggerRef = React.useRef<HTMLSpanElement>(null);

//   const text = message || content || children;

//   const handleMouseEnter = () => {
//     if (triggerRef.current) {
//       const rect = triggerRef.current.getBoundingClientRect();
      
//       let x = rect.left + (rect.width / 2);
//       let y = rect.top;
      
//       if (tip === 'bottom') {
//         y = rect.bottom;
//       } else if (tip === 'left') {
//         x = rect.left;
//         y = rect.top + (rect.height / 2);
//       } else if (tip === 'right') {
//         x = rect.right;
//         y = rect.top + (rect.height / 2);
//       }
      
//       // Safely get scroll position
//       const scrollX = typeof window !== 'undefined' ? window.scrollX : 0;
//       const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      
//       setCoords({ x: x + scrollX, y: y + scrollY });
//       setIsVisible(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsVisible(false);
//   };

//   // Don't render portal-related JSX during SSR
//   const isBrowser = typeof window !== 'undefined';
  
//   const tooltipStyle: React.CSSProperties = isBrowser ? {
//     position: 'fixed',
//     top: coords.y,
//     left: coords.x,
//     zIndex: 9999,
//     opacity: isVisible ? 1 : 0,
//     transition: 'opacity 0.2s ease',
//     pointerEvents: 'none',
//     transform: tip === 'top' ? 'translate(-50%, -100%)' :
//                tip === 'bottom' ? 'translate(-50%, 0)' :
//                tip === 'left' ? 'translate(-100%, -50%)' :
//                'translate(0, -50%)',
//   } : {};

//   return (
//     <>
//       <span
//         ref={triggerRef}
//         className={`tooltip ${funcss}`}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         {...rest}
//       >
//         {!usePortal && text && (
//           <div className={`tip tip-${tip}`}>
//             {text}
//           </div>
//         )}
//         {children && children !== text ? children : null}
//       </span>
      
//       {isBrowser && usePortal && text && isVisible && createPortal(
//         <div className={`tip tip-${tip}`} style={tooltipStyle}>
//           {text}
//         </div>,
//         document.body
//       )}
//     </>
//   );
// }




// 'use client';
// import * as React from 'react';
// import { createPortal } from 'react-dom';

// interface ToolTipProps {
//   funcss?: string;
//   children?: React.ReactNode;
//   content?: React.ReactNode;
//   message?: React.ReactNode;
//   animation?: string;
//   duration?: number;
//   tip?: 'top' | 'bottom' | 'left' | 'right';
//   usePortal?: boolean;
// }

// export default function ToolTip({ 
//   funcss, 
//   children, 
//   content, 
//   message, 
//   animation, 
//   duration, 
//   tip = 'top',
//   usePortal = true,
//   ...rest 
// }: ToolTipProps) {
//   const [isVisible, setIsVisible] = React.useState(false);
//   const [coords, setCoords] = React.useState({ x: 0, y: 0 });
//   const [isMounted, setIsMounted] = React.useState(false);
//   const triggerRef = React.useRef<HTMLSpanElement>(null);
//   const tooltipRef = React.useRef<HTMLDivElement>(null);
//   const portalContainerRef = React.useRef<HTMLDivElement | null>(null);

//   const text = message || content || children;

//   const updateTooltipPosition = React.useCallback(() => {
//     if (!triggerRef.current || !isMounted) return;

//     const rect = triggerRef.current.getBoundingClientRect();
//     const scrollX = window.scrollX;
//     const scrollY = window.scrollY;

//     let x = rect.left + (rect.width / 2);
//     let y = rect.top;
    
//     if (tip === 'bottom') {
//       y = rect.bottom;
//     } else if (tip === 'left') {
//       x = rect.left;
//       y = rect.top + (rect.height / 2);
//     } else if (tip === 'right') {
//       x = rect.right;
//       y = rect.top + (rect.height / 2);
//     }

//     setCoords({ 
//       x: x + scrollX, 
//       y: y + scrollY 
//     });
//   }, [tip, isMounted]);

//   const handleMouseEnter = () => {
//     if (!isMounted) setIsMounted(true);
//     requestAnimationFrame(() => {
//       updateTooltipPosition();
//       setIsVisible(true);
//     });
//   };

//   const handleMouseLeave = () => {
//     setIsVisible(false);
//     // Don't immediately unmount, let the transition finish
//     setTimeout(() => {
//       if (!isVisible) {
//         setIsMounted(false);
//       }
//     }, 200); // Match the transition duration
//   };

//   // Handle scroll and resize to update position
//   React.useEffect(() => {
//     if (!isVisible || !usePortal || !isMounted) return;

//     const handleScrollResize = () => {
//       updateTooltipPosition();
//     };

//     window.addEventListener('scroll', handleScrollResize, { passive: true });
//     window.addEventListener('resize', handleScrollResize);

//     return () => {
//       window.removeEventListener('scroll', handleScrollResize);
//       window.removeEventListener('resize', handleScrollResize);
//     };
//   }, [isVisible, usePortal, updateTooltipPosition, isMounted]);

//   // Update position when tooltip becomes visible
//   React.useEffect(() => {
//     if (isVisible && usePortal && isMounted) {
//       updateTooltipPosition();
//     }
//   }, [isVisible, usePortal, updateTooltipPosition, isMounted]);

//   // Create a stable portal container
//   React.useEffect(() => {
//     if (usePortal && isMounted && !portalContainerRef.current && typeof document !== 'undefined') {
//       const container = document.createElement('div');
//       container.id = `tooltip-portal-${Date.now()}`;
//       document.body.appendChild(container);
//       portalContainerRef.current = container;
//     }

//     return () => {
//       if (portalContainerRef.current && portalContainerRef.current.parentNode) {
//         portalContainerRef.current.parentNode.removeChild(portalContainerRef.current);
//       }
//     };
//   }, [usePortal, isMounted]);

//   const tooltipStyle: React.CSSProperties = {
//     position: 'fixed',
//     top: `${coords.y}px`,
//     left: `${coords.x}px`,
//     zIndex: 9999,
//     opacity: isVisible ? 1 : 0,
//     transition: 'opacity 0.2s ease',
//     pointerEvents: 'none',
//     transform: tip === 'top' ? 'translate(-50%, -100%)' :
//                tip === 'bottom' ? 'translate(-50%, 0)' :
//                tip === 'left' ? 'translate(-100%, -50%)' :
//                'translate(0, -50%)',
//     visibility: isVisible ? 'visible' : 'hidden',
//   };

//   const nonPortalTooltipStyle: React.CSSProperties = {
//     position: 'absolute',
//     zIndex: 9999,
//     opacity: isVisible ? 1 : 0,
//     transition: 'opacity 0.2s ease',
//     pointerEvents: 'none',
//     visibility: isVisible ? 'visible' : 'hidden',
//     whiteSpace: 'nowrap',
//   };

//   // Apply positioning for non-portal tooltips
//   if (!usePortal) {
//     if (tip === 'top') {
//       nonPortalTooltipStyle.bottom = '100%';
//       nonPortalTooltipStyle.left = '50%';
//       nonPortalTooltipStyle.transform = 'translateX(-50%)';
//     } else if (tip === 'bottom') {
//       nonPortalTooltipStyle.top = '100%';
//       nonPortalTooltipStyle.left = '50%';
//       nonPortalTooltipStyle.transform = 'translateX(-50%)';
//     } else if (tip === 'left') {
//       nonPortalTooltipStyle.right = '100%';
//       nonPortalTooltipStyle.top = '50%';
//       nonPortalTooltipStyle.transform = 'translateY(-50%)';
//     } else if (tip === 'right') {
//       nonPortalTooltipStyle.left = '100%';
//       nonPortalTooltipStyle.top = '50%';
//       nonPortalTooltipStyle.transform = 'translateY(-50%)';
//     }
//   }

//   // Render portal tooltip
//   let portalTooltip = null;
//   if (typeof document !== 'undefined' && usePortal && isMounted && text && portalContainerRef.current) {
//     portalTooltip = createPortal(
//       <div 
//         className={`tip tip-${tip}`} 
//         style={tooltipStyle}
//         ref={tooltipRef}
//       >
//         {text}
//       </div>,
//       portalContainerRef.current
//     );
//   }

//   return (
//     <>
//       <span
//         ref={triggerRef}
//         className={`tooltip ${funcss || ''}`}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         style={{ position: 'relative', display: 'inline-block' }}
//         {...rest}
//       >
//         {!usePortal && text && (
//           <div 
//             className={`tip tip-${tip}`} 
//             style={nonPortalTooltipStyle}
//           >
//             {text}
//           </div>
//         )}
//         {children && children !== text ? children : null}
//       </span>
      
//       {portalTooltip}
//     </>
//   );
// }

// import * as React from 'react';
// import Tip from './Tip';

// interface ToolTipProps {
//   funcss?: string;
//   children?: React.ReactNode;
//   content?: React.ReactNode;
//   message?: React.ReactNode;
//   animation?: string;
//   duration?: number;
// }

// export default function ToolTip({ funcss, children, content, message, animation, duration, ...rest }: ToolTipProps) {
//   const text = message || content || children;
//   return (
//     <span
//       className={`tooltip ${funcss}`}
//       {...rest}
//     >
//       {text && <Tip tip="top" content={text} animation={animation} duration={duration} />}
//     </span>
//   );
// }

