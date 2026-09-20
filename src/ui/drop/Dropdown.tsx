'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface DropdownItem {
  label: React.ReactNode;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  position?: Position;
  button: React.ReactNode;
  items: DropdownItem[];
  closableOnlyOutside?: boolean;
  className?: string;
  menuClassName?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  usePortal?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  position = 'bottom',
  button,
  items,
  closableOnlyOutside = false,
  className = '',
  menuClassName = '',
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  usePortal = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  // Calculate position when opening
  useEffect(() => {
    if (!open || !triggerRef.current) {
      setMenuStyle({});
      return;
    }

    const calculatePosition = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const styles: React.CSSProperties = {
        width: width || undefined,
        minWidth: minWidth || undefined,
        maxWidth: maxWidth || undefined,
        height: height || undefined,
        minHeight: minHeight || undefined,
        maxHeight: maxHeight || undefined,
        zIndex: 9999,
      };

      if (usePortal) {
        styles.position = 'fixed';

        // Use viewport‑relative coordinates – NO scrollY/scrollX added
        switch (position) {
          case 'top':
            styles.top = rect.top;
            styles.left = rect.left + rect.width / 2;
            styles.transform = 'translateX(-50%) translateY(-100%)'; // place above, centered
            break;
          case 'bottom':
            styles.top = rect.bottom;
            styles.left = rect.left + rect.width / 2;
            styles.transform = 'translateX(-50%)';
            break;
          case 'top-left':
            styles.top = rect.top;
            styles.left = rect.left;
            styles.transform = 'translateY(-100%)'; // place above
            break;
          case 'top-right':
            styles.top = rect.top;
            styles.left = rect.right;
            styles.transform = 'translateY(-100%)'; // place above
            break;
          case 'bottom-left':
            styles.top = rect.bottom;
            styles.left = rect.left;
            break;
          case 'bottom-right':
            styles.top = rect.bottom;
            styles.left = rect.right;
            break;
          case 'left':
            styles.top = rect.top;
            styles.left = rect.left;
            styles.transform = 'translateX(-100%)'; // place to the left
            break;
          case 'right':
            styles.top = rect.top;
            styles.left = rect.right;
            break;
        }
      } else {
        // Non‑portal mode: use absolute positioning inside the (assumed) relative container
        // You might need to ensure the container has position: relative.
        styles.position = 'absolute';
        // Here you would use offset values relative to the container.
        // For simplicity, we'll just copy the same logic without scroll offsets,
        // but note that getBoundingClientRect gives viewport coordinates,
        // which are not directly usable with absolute positioning unless the container is fixed/absolute.
        // A production version would need a more robust approach.
        // For now, we keep the original (flawed) logic, but you should consider
        // using a proper positioning library or always using the portal.
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
          const relativeTop = rect.top - containerRect.top;
          const relativeLeft = rect.left - containerRect.left;
          switch (position) {
            case 'top':
              styles.top = relativeTop;
              styles.left = relativeLeft + rect.width / 2;
              styles.transform = 'translateX(-50%) translateY(-100%)';
              break;
            case 'bottom':
              styles.top = rect.bottom - containerRect.top;
              styles.left = relativeLeft + rect.width / 2;
              styles.transform = 'translateX(-50%)';
              break;
            case 'top-left':
              styles.top = relativeTop;
              styles.left = relativeLeft;
              styles.transform = 'translateY(-100%)';
              break;
            case 'top-right':
              styles.top = relativeTop;
              styles.left = rect.right - containerRect.left;
              styles.transform = 'translateY(-100%)';
              break;
            case 'bottom-left':
              styles.top = rect.bottom - containerRect.top;
              styles.left = relativeLeft;
              break;
            case 'bottom-right':
              styles.top = rect.bottom - containerRect.top;
              styles.left = rect.right - containerRect.left;
              break;
            case 'left':
              styles.top = relativeTop;
              styles.left = relativeLeft;
              styles.transform = 'translateX(-100%)';
              break;
            case 'right':
              styles.top = relativeTop;
              styles.left = rect.right - containerRect.left;
              break;
          }
        }
      }

      return styles;
    };

    setMenuStyle(calculatePosition());

    // Update on window resize
    const handleResize = () => {
      setMenuStyle(calculatePosition());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open, usePortal, position, width, minWidth, maxWidth, height, minHeight, maxHeight]);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current || !menuRef.current || !open) return;

      const target = event.target as Node;
      const isClickInsideTrigger = containerRef.current.contains(target);
      const isClickInsideMenu = menuRef.current.contains(target);

      if (!isClickInsideTrigger && !isClickInsideMenu) {
        setOpen(false);
      }
    };

    if (open) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 10);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }

    return undefined;
  }, [open]);

  // Handle scroll to hide dropdown (optional – you may remove this if you want it to stay open)
  useEffect(() => {
    const handleScroll = () => {
      if (open) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    return undefined;
  }, [open]);

  // Toggle open state
  const toggleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(prev => !prev);
  }, []);

  const handleItemClick = (item: DropdownItem, e: React.MouseEvent) => {
    e.stopPropagation();

    if (item.disabled) return;

    item.onClick?.();

    if (!closableOnlyOutside) {
      setOpen(false);
    }
  };

  const renderMenu = () => {
    if (!open) return null;

    return (
      <div
        ref={menuRef}
        className={`dropdown-menu ${position} ${menuClassName}`}
        style={menuStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.divider ? (
              <div className="dropdown-divider" />
            ) : (
              <div
                className={`dropdown-item ${item.disabled ? 'disabled' : ''}`}
                onClick={(e) => handleItemClick(item, e)}
              >
                {item.startIcon && (
                  <span className="dropdown-item-icon">{item.startIcon}</span>
                )}
                <span className="dropdown-item-label">{item.label}</span>
                {item.endIcon && (
                  <span className="dropdown-item-icon">{item.endIcon}</span>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={`dropdown-container ${className}`}>
      <div
        ref={triggerRef}
        onClick={toggleOpen}
        style={{ cursor: 'pointer' }}
        className="dropdown-trigger"
      >
        {button}
      </div>

      {open && (
        <>
          {usePortal ? (
            createPortal(renderMenu(), document.body)
          ) : (
            renderMenu()
          )}
        </>
      )}
    </div>
  );
};

export default Dropdown;

// 'use client';
// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { createPortal } from 'react-dom';

// type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// interface DropdownItem {
//   label: React.ReactNode;
//   onClick?: () => void;
//   startIcon?: React.ReactNode;
//   endIcon?: React.ReactNode;
//   disabled?: boolean;
//   divider?: boolean;
// }

// interface DropdownProps {
//   position?: Position;
//   button: React.ReactNode;
//   items: DropdownItem[];
//   closableOnlyOutside?: boolean;
//   className?: string;
//   menuClassName?: string;
//   width?: string;
//   minWidth?: string;
//   maxWidth?: string;
//   height?: string;
//   minHeight?: string;
//   maxHeight?: string;
//   usePortal?: boolean;
// }

// const Dropdown: React.FC<DropdownProps> = ({
//   position = 'bottom',
//   button,
//   items,
//   closableOnlyOutside = false,
//   className = '',
//   menuClassName = '',
//   width,
//   minWidth,
//   maxWidth,
//   height,
//   minHeight,
//   maxHeight,
//   usePortal = true,
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLDivElement>(null);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const [open, setOpen] = useState(false);
//   const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

//   // Calculate position when opening
//   useEffect(() => {
//     if (!open || !triggerRef.current) {
//       setMenuStyle({});
//       return;
//     }

//     const calculatePosition = () => {
//       const rect = triggerRef.current!.getBoundingClientRect();
//       const scrollY = window.scrollY;
//       const scrollX = window.scrollX;

//       const styles: React.CSSProperties = {
//         width: width || undefined,
//         minWidth: minWidth || undefined,
//         maxWidth: maxWidth || undefined,
//         height: height || undefined,
//         minHeight: minHeight || undefined,
//         maxHeight: maxHeight || undefined,
//         zIndex: 9999,
//       };

//       if (usePortal) {
//         styles.position = 'fixed';
        
//         // Calculate position for portal mode
//         switch (position) {
//           case 'top':
//             styles.top = rect.top + scrollY;
//             styles.left = rect.left + scrollX + (rect.width / 2);
//             styles.transform = 'translateX(-50%)';
//             break;
//           case 'bottom':
//             styles.top = rect.bottom + scrollY;
//             styles.left = rect.left + scrollX + (rect.width / 2);
//             styles.transform = 'translateX(-50%)';
//             break;
//           case 'top-left':
//             styles.top = rect.top + scrollY;
//             styles.left = rect.left + scrollX;
//             break;
//           case 'top-right':
//             styles.top = rect.top + scrollY;
//             styles.left = rect.right + scrollX;
//             break;
//           case 'bottom-left':
//             styles.top = rect.bottom + scrollY;
//             styles.left = rect.left + scrollX;
//             break;
//           case 'bottom-right':
//             styles.top = rect.bottom + scrollY;
//             styles.left = rect.right + scrollX;
//             break;
//           case 'left':
//             styles.top = rect.top + scrollY;
//             styles.left = rect.left + scrollX;
//             break;
//           case 'right':
//             styles.top = rect.top + scrollY;
//             styles.left = rect.right + scrollX;
//             break;
//         }
//       }

//       return styles;
//     };

//     setMenuStyle(calculatePosition());

//     // Update on window resize
//     const handleResize = () => {
//       setMenuStyle(calculatePosition());
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [open, usePortal, position, width, minWidth, maxWidth, height, minHeight, maxHeight]);

//   // Handle clicks outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (!containerRef.current || !menuRef.current || !open) return;
      
//       const target = event.target as Node;
//       const isClickInsideTrigger = containerRef.current.contains(target);
//       const isClickInsideMenu = menuRef.current.contains(target);
      
//       if (!isClickInsideTrigger && !isClickInsideMenu) {
//         setOpen(false);
//       }
//     };

//     if (open) {
//       const timer = setTimeout(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//       }, 10);
      
//       return () => {
//         clearTimeout(timer);
//         document.removeEventListener('mousedown', handleClickOutside);
//       };
//     }
    
//     return undefined;
//   }, [open]);

//   // Handle scroll to hide dropdown
//   useEffect(() => {
//     const handleScroll = () => {
//       if (open) {
//         setOpen(false);
//       }
//     };

//     if (open) {
//       window.addEventListener('scroll', handleScroll, { passive: true });
//       return () => window.removeEventListener('scroll', handleScroll);
//     }
    
//     return undefined;
//   }, [open]);

//   // Toggle open state
//   const toggleOpen = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     e.preventDefault();
    
//     setOpen(prev => !prev);
//   }, []);

//   const handleItemClick = (item: DropdownItem, e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     if (item.disabled) return;
    
//     item.onClick?.();
    
//     if (!closableOnlyOutside) {
//       setOpen(false);
//     }
//   };

//   const renderMenu = () => {
//     if (!open) return null;
    
//     return (
//       <div
//         ref={menuRef}
//         className={`dropdown-menu ${position} ${menuClassName}`}
//         style={menuStyle}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {items.map((item, index) => (
//           <React.Fragment key={index}>
//             {item.divider ? (
//               <div className="dropdown-divider" />
//             ) : (
//               <div
//                 className={`dropdown-item ${item.disabled ? 'disabled' : ''}`}
//                 onClick={(e) => handleItemClick(item, e)}
//               >
//                 {item.startIcon && (
//                   <span className="dropdown-item-icon">
//                     {item.startIcon}
//                   </span>
//                 )}
//                 <span className="dropdown-item-label">{item.label}</span>
//                 {item.endIcon && (
//                   <span className="dropdown-item-icon">
//                     {item.endIcon}
//                   </span>
//                 )}
//               </div>
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={`dropdown-container ${className}`}
//     >
//       <div
//         ref={triggerRef}
//         onClick={toggleOpen}
//         style={{ cursor: 'pointer' }}
//         className="dropdown-trigger"
//       >
//         {button}
//       </div>
      
//       {open && (
//         <>
//           {usePortal ? (
//             createPortal(renderMenu(), document.body)
//           ) : (
//             renderMenu()
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Dropdown;






// 'use client'; 
// import React, { useState, useRef, useEffect } from 'react';

// type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// interface DropdownItem {
//   label: React.ReactNode;
//   onClick?: () => void;
//   startIcon?: React.ReactNode;
//   endIcon?: React.ReactNode;
//   disabled?: boolean;
//   divider?: boolean;
// }

// interface DropdownProps {
//   position?: Position;
//   button: React.ReactNode;
//   items: DropdownItem[];
//   hoverable?: boolean;
//   openOnHover?: boolean;
//   closableOnlyOutside?: boolean;
//   className?: string;
//   menuClassName?: string;
//   width?: string;
//   minWidth?: string;
//   maxWidth?: string;
//   height?: string;
//   minHeight?: string;
//   maxHeight?: string;
// }

// const Dropdown: React.FC<DropdownProps> = ({
//   position = 'bottom',
//   button,
//   items,
//   hoverable = true,
//   openOnHover = true,
//   closableOnlyOutside = false,
//   className = '',
//   menuClassName = '',
//   width,
//   minWidth,
//   maxWidth,
//   height,
//   minHeight,
//   maxHeight,
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (openOnHover) return;

//     const handleClickOutside = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [openOnHover]);

//   const showMenu = openOnHover || open;

//   const menuStyle: React.CSSProperties = {
//     width,
//     minWidth,
//     maxWidth,
//     height,
//     minHeight,
//     maxHeight,
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={`dropdown-container ${className}`}
//       onMouseEnter={() => openOnHover && setOpen(true)}
//       onMouseLeave={() => openOnHover && setOpen(false)}
//     >
//       <div
//         onClick={() => !openOnHover && setOpen(!open)}
//         style={{ cursor: !openOnHover ? 'pointer' : undefined }}
//       >
//         {button}
//       </div>
      
//       {showMenu && (
//         <div
//           className={`dropdown-menu ${position} ${menuClassName}`}
//           style={menuStyle}
//         >
//           {items.map((item, index) => (
//             <React.Fragment key={index}>
//               {item.divider ? (
//                 <div className="dropdown-divider" />
//               ) : (
//                 <div
//                   className={`dropdown-item ${item.disabled ? 'disabled' : ''} ${!hoverable ? 'no-hover' : ''}`}
//                   onClick={() => {
//                     if (item.disabled) return;
//                     if (!closableOnlyOutside) {
//                       item.onClick?.();
//                       if (!openOnHover) setOpen(false);
//                     }
//                   }}
//                 >
//                   {item.startIcon && (
//                     <span className="dropdown-item-icon">
//                       {item.startIcon}
//                     </span>
//                   )}
//                   <span className="dropdown-item-label">{item.label}</span>
//                   {item.endIcon && (
//                     <span className="dropdown-item-icon">
//                       {item.endIcon}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dropdown;