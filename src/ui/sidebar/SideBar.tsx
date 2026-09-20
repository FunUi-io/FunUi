'use client';
import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import RowFlex from '../specials/RowFlex';
import Text from '../text/Text';
import { usePathname } from 'next/navigation';
import { useVariant } from '../theme/theme';
import Button from '../button/Button';
import Accordion from '../accordion/Accordion';
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from "react-icons/bs";
import Flex from '../flex/Flex';
import ToolTip from '../tooltip/ToolTip';
import Tip from '../tooltip/Tip';
import Carousel from '../carousel/Carousel';

interface SideBarLink {
  uri: string;
  icon?: React.ReactNode;
  text: string;
  section: string;
  onClick?: () => void;
}

interface SideBarProps {
  funcss?: string;
  position?: 'left' | 'right';
  open?: boolean;
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  top?: number;
  sidebarWidth?: number;
  sidebarCss?: string;
  activeCss?: string;
  iconCSS?: string;
  accordionItemCss?: string;
  bodyCss?: string;
  popIcon?: boolean;
  dividers?: boolean;
  links?: SideBarLink[];
  children?: ReactNode;
  onClose?: () => void;
  isAccordion?: boolean;
  togglePrefix?: ReactNode;
  isCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  bottomNavBackground?: string; // New prop for bottom nav background
  bottomNavHeight?: number; // New prop for bottom nav height
}

export default function SideBar({
  funcss = '',
  position = 'left',
  open = false,
  header,
  content,
  footer,
  top = 0,
  sidebarWidth = 250,
  iconCSS = '',
  sidebarCss = '',
  activeCss,
  bodyCss = '',
  popIcon = false,
  dividers = false,
  accordionItemCss,
  links = [],
  children,
  onClose,
  togglePrefix,
  isAccordion = false,
  isCollapsed = true,
  onCollapseChange,
  bottomNavBackground = 'var(--background, white)', // Default background
  bottomNavHeight = 64, // Default height in pixels
}: SideBarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [internalOpen, setInternalOpen] = useState(open);
  const [appBarHeight, setAppBarHeight] = useState('0px');
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { variant } = useVariant();
  const [selectedOption, setselectedOption] = useState('');
  
  // Flatten all links for bottom navigation
  const allLinks = links.reduce<SideBarLink[]>((acc, link) => {
    acc.push(link);
    return acc;
  }, []);

  const updateIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 992);
  }, []);

  useEffect(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, [updateIsMobile]);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    const appBar = document.querySelector('#appBar') as HTMLElement;
    if (appBar) {
      setAppBarHeight(`${appBar.offsetHeight}px`);
    }
  }, []);

  useEffect(() => {
    if (!isMobile || !internalOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isMobile, internalOpen]);

  const handleClose = () => {
    setInternalOpen(false);
    onClose?.();
  };

  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  const groupedLinks = links.reduce<Record<string, SideBarLink[]>>((acc, link) => {
    acc[link.section] = acc[link.section] || [];
    acc[link.section].push(link);
    return acc;
  }, {});

  const isOverlay = isMobile;

  // Prepare accordion items when isAccordion is true
  const accordionItems = isAccordion
    ? Object.entries(groupedLinks).map(([section, sectionLinks]) => ({
      icon: sectionLinks[0]?.icon,
        title: section,
        content: (
          <div className="sidebar-accordion-links">
            {sectionLinks.map((link, index) => {
              const isActive = link.onClick
                ? selectedOption === `${section}-${index}`
                : pathname === link.uri;
              return (
                <div
                  onClick={() => {
                    if (isMobile) {
                      handleClose();
                    }
                    if (link?.onClick) {
                      link.onClick();
                      setselectedOption(`${section}-${index}`);
                    } else {
                      window.location.href = link.uri;
                    }
                  }}
                  key={link.uri}
                >
                  <Button
                    fullWidth
                    small
                    funcss={`sidebar-link ${isActive ? "" : "p-0"} text-left ${
                      isActive ? `primary ${activeCss || ''}` : 'hoverable'
                    }`}
                    startIcon={
                      <span
                        className={`${iconCSS || ''} ${
                          variant === 'standard' || popIcon
                            ? `p-1 ${isActive ? 'primary' : 'lighter text-primary border'} central`
                            : variant === 'minimal' && !isActive
                            ? 'p-1 central lighter text-primary'
                            : ''
                        }`}
                        style={{ lineHeight: 0, borderRadius: '0.4rem' }}
                      >
                        {link.icon}
                      </span>
                    }
                  >
                    {!collapsed && <Text text={link.text} size="sm" weight={400} />}
                  </Button>
                </div>
              );
            })}
          </div>
        ),
      }))
    : [];

  // Get current sidebar width based on collapsed state
  const currentSidebarWidth = collapsed ? 70 : sidebarWidth;
  const collapseIconSize = '18px';

  // Render bottom navigation for mobile
  const renderBottomNav = () => {
    if (!isMobile || allLinks.length === 0) return null;

    return (
      <div
        className="bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: `${bottomNavHeight}px`,
          backgroundColor: bottomNavBackground,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          // padding: '0.5rem 0',
        }}
      >
       <Carousel justify='center'  overflowPadding='0 1.5rem'  showDashes={false} itemPadding='0rem' controlerIconSize={10} controlerSize={1.4}>
         {allLinks.map((link, index) => {
          const isActive = link.onClick
            ? selectedOption === link.section + '-' + index
            : pathname === link.uri;

          return (
            <div
              key={index}
              className="bottom-nav-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: 'fit-content',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                borderRadius: '0.5rem',
                transition: 'all 0.2s ease',
              }}
              onClick={() => {
                if (link?.onClick) {
                  link.onClick();
                  setselectedOption(link.section + '-' + index);
                } else {
                  window.location.href = link.uri;
                }
              }}
            >
              <div
                className="bottom-nav-icon"
                style={{
                  fontSize: '1.25rem',
                  color: isActive ? 'var(--primary, #3b82f6)' : '',
                  marginBottom: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {link.icon}
              </div>
              <div
                className="bottom-nav-text"
                style={{
                  fontSize: '0.75rem',
                  color: isActive ? 'var(--primary, #3b82f6)' : '',
                  fontWeight: isActive ? 600 : 400,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',

                }}
              >
                {link.text}
              </div>
            </div>
          );
        })}
       </Carousel>
      </div>
    );
  };

  return (
    <div className={`sidebar-container ${isOverlay ? '' : 'with-content'}`}>
      {/* Collapsed Sidebar (Desktop only) */}
      {internalOpen && collapsed && !isMobile && (
        <aside
          role="complementary"
          ref={sidebarRef}
          className={`sidebar collapsed ${funcss} ${sidebarCss} ${isOverlay ? 'nav_overlay' : ''}`}
          style={{
            width: isOverlay ? '100%' : `${currentSidebarWidth}px`,
            height: `calc(100vh - ${appBarHeight || top || '0px'})`,
            position: 'fixed',
            top: appBarHeight || top,
            [position]: 0,
            padding: '0.5rem',
            overflow: 'visible',
          }}
        >
          {/* Expand Button at Top */}
          <div  
            className='pointer text-primary text-center p-1 bb mb'
            style={{fontSize:collapseIconSize , lineHeight: 0}}
            onClick={toggleCollapse}
          >
            <BsLayoutSidebarInsetReverse /> 
          </div>

          {/* Collapsed Icons Only */}
          <section className="">
            {links.length > 0 && (
              <Flex direction='column' gap={0.6} alignItems='center' width='100%'>
                {Object.entries(groupedLinks).map(([section, sectionLinks], sectionIndex) => (
                  <Flex key={section} direction='column' gap={0.5} alignItems='center' width='100%'>
                    {sectionLinks.map((link, index) => {
                      const isActive = link.onClick
                        ? selectedOption === `${section}-${index}`
                        : pathname === link.uri;
                      return (
                        <ToolTip
                            key={link.uri}
                            message={link.text}
                        tip='right'
                        >
                          
                          <div
                          onClick={() => {
                            if (isMobile) {
                              handleClose();
                            }
                            if (link?.onClick) {
                              link.onClick();
                              setselectedOption(`${section}-${index}`);
                            } else {
                              window.location.href = link.uri;
                            }
                          }}
                      
                          className='hover-scale-rotate hover-text-primary'
                        >
                          <span
                            className={` pointer ${iconCSS || ''} ${
                              variant === 'standard' || popIcon
                                ? `p-1 ${isActive ? 'text-primary' : 'bg  border'} central`
                                : variant === 'minimal' && !isActive
                                ? 'p-1 central bg'
                                : ''
                            }`}
                            style={{ lineHeight: 0, borderRadius: '0.4rem' , fontSize: collapseIconSize }}
                          >
                            {link.icon}
                          </span>
                        </div>
                        </ToolTip>
                      );
                    })}
                    
                    {/* Add HR between sections except after last one */}
                    {sectionIndex < Object.keys(groupedLinks).length - 1 && (
                      <div className="mt-1 mb-1 bt fit" />
                    )}
                  </Flex>
                ))}
              </Flex>
            )}
          </section>
        </aside>
      )}

      {/* Regular Sidebar (Desktop only) */}
      {internalOpen && !collapsed && !isMobile && (
        <aside
          role="complementary"
          ref={sidebarRef}
          className={`sidebar ${funcss} ${sidebarCss} ${isOverlay ? 'nav_overlay' : ''}`}
          style={{
            width: isOverlay ? '100%' : `${currentSidebarWidth}px`,
            height: `calc(100vh - ${appBarHeight || top || '0px'})`,
            position: 'fixed',
            top: appBarHeight || top,
            [position]: 0,
            padding: '1rem',
          }}
        >
          {/* Header with Collapse Button */}
          <div className="sidebar-header">
            <Flex width='100%' alignItems='center' gap={0.5} justify='space-between'>
              {togglePrefix || <div />}
              <div  
                className='pointer hover-text-primary text-right'
                style={{fontSize:collapseIconSize , lineHeight: 0}}
                onClick={toggleCollapse}
              >
                <BsLayoutSidebarInset  />
              </div>
            </Flex>

            {header && <div>{header}</div>}
          </div>

          <section className="sidebar-body mt-3">
            {links.length > 0 && (
              <nav className="sidebar-links">
                {isAccordion ? (
                  <Accordion
                    itemClass={accordionItemCss}
                    items={accordionItems}
                    allowMultiple={false}
                    contentClass=""
                    titleClass='text-sm'
                    activeClass=""
                  />
                ) : (
                  Object.entries(groupedLinks).map(([section, sectionLinks]) => (
                    <div key={section} className={`sidebar-section ${dividers ? 'bt' : ''} pt-2 pb-2`}>
                      <Text size="xs" uppercase opacity={4} >
                        {section}
                      </Text>
                      {sectionLinks.map((link, index) => {
                        const isActive = link.onClick
                          ? selectedOption === `${section}-${index}`
                          : pathname === link.uri;
                        return (
                          <div
                            onClick={() => {
                              if (isMobile) {
                                handleClose();
                              }
                              if (link?.onClick) {
                                link.onClick();
                                setselectedOption(`${section}-${index}`);
                              } else {
                                window.location.href = link.uri;
                              }
                            }}
                            key={link.uri}
                          >
                            <Button
                              fullWidth
                              small
                              funcss={`sidebar-link text-left ${
                                isActive ? `primary ${activeCss || ''}` : 'hoverable'
                              }`}
                              startIcon={
                                <span
                                  className={`${iconCSS || ''} ${
                                    variant === 'standard' || popIcon
                                      ? `p-1 ${isActive ? 'primary' : 'lighter text-primary border'} central`
                                      : variant === 'minimal' && !isActive
                                      ? 'p-1 central lighter text-primary'
                                      : ''
                                  }`}
                                  style={{ lineHeight: 0, borderRadius: '0.4rem' }}
                                >
                                  {link.icon}
                                </span>
                              }
                            >
                              <Text text={link.text} size="sm" weight={400} />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </nav>
            )}
            {content}
          </section>

          {footer && <footer className="sidebar-footer mt-2">{footer}</footer>}
        </aside>
      )}

      {/* Main Content Area */}
      <main
        className={`main-content ${bodyCss}`}
        style={{
          flex: 1,
          marginLeft: position === 'left' && !isOverlay && internalOpen && !isMobile ? `${currentSidebarWidth}px` : 0,
          marginRight: position === 'right' && !isOverlay && internalOpen && !isMobile ? `${currentSidebarWidth}px` : 0,
          overflowY: 'auto',
          height: '100vh',
          paddingTop: appBarHeight || top,
          paddingBottom: isMobile && allLinks.length > 0 ? `${bottomNavHeight + 20}px` : 0, // Add padding for bottom nav
          transition: 'margin 0.3s ease',
        }}
      >
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      {renderBottomNav()}
    </div>
  );
}

// 'use client';
// import React, {
//   useEffect,
//   useRef,
//   useState,
//   ReactNode,
//   useCallback,
// } from 'react';
// import RowFlex from '../specials/RowFlex';
// import Text from '../text/Text';
// import { usePathname } from 'next/navigation';
// import { useVariant } from '../theme/theme';
// import Button from '../button/Button';
// import Accordion from '../accordion/Accordion';
// import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from "react-icons/bs";
// import Flex from '../flex/Flex';
// import ToolTip from '../tooltip/ToolTip';
// import Tip from '../tooltip/Tip';

// interface SideBarLink {
//   uri: string;
//   icon?: React.ReactNode;
//   text: string;
//   section: string;
//   onClick?: () => void;
// }

// interface SideBarProps {
//   funcss?: string;
//   position?: 'left' | 'right';
//   open?: boolean;
//   header?: ReactNode;
//   content?: ReactNode;
//   footer?: ReactNode;
//   top?: number;
//   sidebarWidth?: number;
//   sidebarCss?: string;
//   activeCss?: string;
//   iconCSS?: string;
//   accordionItemCss?: string;
//   bodyCss?: string;
//   popIcon?: boolean;
//   dividers?: boolean;
//   links?: SideBarLink[];
//   children?: ReactNode;
//   onClose?: () => void;
//   isAccordion?: boolean;
//   togglePrefix?: ReactNode;
//   isCollapsed?: boolean; // New prop
//   onCollapseChange?: (collapsed: boolean) => void; // Optional callback for collapse state changes
// }

// export default function SideBar({
//   funcss = '',
//   position = 'left',
//   open = false,
//   header,
//   content,
//   footer,
//   top = 0,
//   sidebarWidth = 250,
//   iconCSS = '',
//   sidebarCss = '',
//   activeCss,
//   bodyCss = '',
//   popIcon = false,
//   dividers = false,
//   accordionItemCss,
//   links = [],
//   children,
//   onClose,
//   togglePrefix,
//   isAccordion = false,
//   isCollapsed = true, // Default to true as requested
//   onCollapseChange,
// }: SideBarProps) {
//   const [isMobile, setIsMobile] = useState(false);
//   const [internalOpen, setInternalOpen] = useState(open);
//   const [appBarHeight, setAppBarHeight] = useState('0px');
//   const [collapsed, setCollapsed] = useState(isCollapsed); // Initialize with prop
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const { variant } = useVariant();
//   const [selectedOption, setselectedOption] = useState('');
//   const updateIsMobile = useCallback(() => {
//     setIsMobile(window.innerWidth <= 992);
//   }, []);

//   useEffect(() => {
//     updateIsMobile();
//     window.addEventListener('resize', updateIsMobile);
//     return () => window.removeEventListener('resize', updateIsMobile);
//   }, [updateIsMobile]);

//   // Sync internal state with prop changes
//   useEffect(() => {
//     setInternalOpen(open);
//   }, [open]);

//   // Sync collapsed state with prop changes
//   useEffect(() => {
//     setCollapsed(isCollapsed);
//   }, [isCollapsed]);

//   useEffect(() => {
//     const appBar = document.querySelector('#appBar') as HTMLElement;
//     if (appBar) {
//       setAppBarHeight(`${appBar.offsetHeight}px`);
//     }
//   }, []);

//   useEffect(() => {
//     if (!isMobile || !internalOpen) return;

//     const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
//         handleClose();
//       }
//     };

//     document.addEventListener('mousedown', handleOutsideClick);
//     document.addEventListener('touchstart', handleOutsideClick);

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//       document.removeEventListener('touchstart', handleOutsideClick);
//     };
//   }, [isMobile, internalOpen]);

//   const handleClose = () => {
//     setInternalOpen(false);
//     onClose?.();
//   };

//   const toggleCollapse = () => {
//     const newCollapsed = !collapsed;
//     setCollapsed(newCollapsed);
//     onCollapseChange?.(newCollapsed);
//   };

//   const groupedLinks = links.reduce<Record<string, SideBarLink[]>>((acc, link) => {
//     acc[link.section] = acc[link.section] || [];
//     acc[link.section].push(link);
//     return acc;
//   }, {});

//   const isOverlay = isMobile;

//   // Prepare accordion items when isAccordion is true
//   const accordionItems = isAccordion
//     ? Object.entries(groupedLinks).map(([section, sectionLinks]) => ({
//       icon: sectionLinks[0]?.icon,
//         title: section,
//         content: (
//           <div className="sidebar-accordion-links">
//             {sectionLinks.map((link, index) => {
//               const isActive = link.onClick
//                 ? selectedOption === `${section}-${index}`
//                 : pathname === link.uri;
//               return (
//                 <div
//                   onClick={() => {
//                     if (isMobile) {
//                       handleClose();
//                     }
//                     if (link?.onClick) {
//                       link.onClick();
//                       setselectedOption(`${section}-${index}`);
//                     } else {
//                       window.location.href = link.uri;
//                     }
//                   }}
//                   key={link.uri}
//                 >
//                   <Button
//                     fullWidth
//                     small
//                     funcss={`sidebar-link ${isActive ? "" : "p-0"} text-left ${
//                       isActive ? `primary ${activeCss || ''}` : 'hoverable'
//                     }`}
//                     startIcon={
//                       <span
//                         className={`${iconCSS || ''} ${
//                           variant === 'standard' || popIcon
//                             ? `p-1 ${isActive ? 'primary' : 'lighter text-primary border'} central`
//                             : variant === 'minimal' && !isActive
//                             ? 'p-1 central lighter text-primary'
//                             : ''
//                         }`}
//                         style={{ lineHeight: 0, borderRadius: '0.4rem' }}
//                       >
//                         {link.icon}
//                       </span>
//                     }
//                   >
//                     {!collapsed && <Text text={link.text} size="sm" weight={400} />}
//                   </Button>
//                 </div>
//               );
//             })}
//           </div>
//         ),
//       }))
//     : [];

//   // Get current sidebar width based on collapsed state
//   const currentSidebarWidth = collapsed ? 70 : sidebarWidth;
//   const collapseIconSize = '18px';

//   return (
//     <div className={`sidebar-container ${isOverlay ? '' : 'with-content'}`}>
//       {/* Collapsed Sidebar */}
//       {internalOpen && collapsed && (
//         <aside
//           role="complementary"
//           ref={sidebarRef}
//           className={`sidebar collapsed ${funcss} ${sidebarCss} ${isOverlay ? 'nav_overlay' : ''}`}
//           style={{
//             width: isOverlay ? '100%' : `${currentSidebarWidth}px`,
//             height: `calc(100vh - ${appBarHeight || top || '0px'})`,
//             position: 'fixed',
//             top: appBarHeight || top,
//             [position]: 0,
//             padding: '0.5rem',
//             overflow: 'visible',
//           }}
//         >
//           {/* Expand Button at Top */}
//           <div  
//             className='pointer text-primary text-center p-1 bb mb'
//             style={{fontSize:collapseIconSize , lineHeight: 0}}
//             onClick={toggleCollapse}
//           >
//             <BsLayoutSidebarInsetReverse /> 
//           </div>

//           {/* Collapsed Icons Only */}
//           <section className="">
//             {links.length > 0 && (
//               <Flex direction='column' gap={0.6} alignItems='center' width='100%'>
//                 {Object.entries(groupedLinks).map(([section, sectionLinks], sectionIndex) => (
//                   <Flex key={section} direction='column' gap={0.5} alignItems='center' width='100%'>
//                     {sectionLinks.map((link, index) => {
//                       const isActive = link.onClick
//                         ? selectedOption === `${section}-${index}`
//                         : pathname === link.uri;
//                       return (
//                         <ToolTip
//                             key={link.uri}
//                             message={link.text}
//                         tip='right'
//                         >
                          
//                           <div
//                           onClick={() => {
//                             if (isMobile) {
//                               handleClose();
//                             }
//                             if (link?.onClick) {
//                               link.onClick();
//                               setselectedOption(`${section}-${index}`);
//                             } else {
//                               window.location.href = link.uri;
//                             }
//                           }}
                      
//                           className='hover-scale-rotate hover-text-primary'
//                         >
//                           <span
//                             className={` pointer ${iconCSS || ''} ${
//                               variant === 'standard' || popIcon
//                                 ? `p-1 ${isActive ? 'text-primary' : 'bg  border'} central`
//                                 : variant === 'minimal' && !isActive
//                                 ? 'p-1 central bg'
//                                 : ''
//                             }`}
//                             style={{ lineHeight: 0, borderRadius: '0.4rem' , fontSize: collapseIconSize }}
//                           >
//                             {link.icon}
//                           </span>
//                         </div>
//                         </ToolTip>
//                       );
//                     })}
                    
//                     {/* Add HR between sections except after last one */}
//                     {sectionIndex < Object.keys(groupedLinks).length - 1 && (
//                       <div className="mt-1 mb-1 bt fit" />
//                     )}
//                   </Flex>
//                 ))}
//               </Flex>
//             )}
//           </section>
//         </aside>
//       )}

//       {/* Regular Sidebar */}
//       {internalOpen && !collapsed && (
//         <aside
//           role="complementary"
//           ref={sidebarRef}
//           className={`sidebar ${funcss} ${sidebarCss} ${isOverlay ? 'nav_overlay' : ''}`}
//           style={{
//             width: isOverlay ? '100%' : `${currentSidebarWidth}px`,
//             height: `calc(100vh - ${appBarHeight || top || '0px'})`,
//             position: 'fixed',
//             top: appBarHeight || top,
//             [position]: 0,
//             padding: '1rem',
//           }}
//         >
//           {/* Header with Collapse Button */}
//           <div className="sidebar-header">
//             <Flex width='100%' alignItems='center' gap={0.5} justify='space-between'>
//               {togglePrefix || <div />}
//               <div  
//                 className='pointer hover-text-primary text-right'
//                 style={{fontSize:collapseIconSize , lineHeight: 0}}
//                 onClick={toggleCollapse}
//               >
//                 <BsLayoutSidebarInset  />
//               </div>
//             </Flex>

//             {header && <div>{header}</div>}
//           </div>

//           <section className="sidebar-body mt-3">
//             {links.length > 0 && (
//               <nav className="sidebar-links">
//                 {isAccordion ? (
//                   <Accordion
//                     itemClass={accordionItemCss}
//                     items={accordionItems}
//                     allowMultiple={false}
//                     contentClass=""
//                     titleClass='text-sm'
//                     activeClass=""
//                   />
//                 ) : (
//                   Object.entries(groupedLinks).map(([section, sectionLinks]) => (
//                     <div key={section} className={`sidebar-section ${dividers ? 'bt' : ''} pt-2 pb-2`}>
//                       <Text size="sm" >
//                         {section}
//                       </Text>
//                       {sectionLinks.map((link, index) => {
//                         const isActive = link.onClick
//                           ? selectedOption === `${section}-${index}`
//                           : pathname === link.uri;
//                         return (
//                           <div
//                             onClick={() => {
//                               if (isMobile) {
//                                 handleClose();
//                               }
//                               if (link?.onClick) {
//                                 link.onClick();
//                                 setselectedOption(`${section}-${index}`);
//                               } else {
//                                 window.location.href = link.uri;
//                               }
//                             }}
//                             key={link.uri}
//                           >
//                             <Button
//                               fullWidth
//                               small
//                               funcss={`sidebar-link text-left ${
//                                 isActive ? `primary ${activeCss || ''}` : 'hoverable'
//                               }`}
//                               startIcon={
//                                 <span
//                                   className={`${iconCSS || ''} ${
//                                     variant === 'standard' || popIcon
//                                       ? `p-1 ${isActive ? 'primary' : 'lighter text-primary border'} central`
//                                       : variant === 'minimal' && !isActive
//                                       ? 'p-1 central lighter text-primary'
//                                       : ''
//                                   }`}
//                                   style={{ lineHeight: 0, borderRadius: '0.4rem' }}
//                                 >
//                                   {link.icon}
//                                 </span>
//                               }
//                             >
//                               <Text text={link.text} size="sm" weight={400} />
//                             </Button>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   ))
//                 )}
//               </nav>
//             )}
//             {content}
//           </section>

//           {footer && <footer className="sidebar-footer mt-2">{footer}</footer>}
//         </aside>
//       )}

//       <main
//         className={`main-content ${bodyCss}`}
//         style={{
//           flex: 1,
//           marginLeft: position === 'left' && !isOverlay && internalOpen ? `${currentSidebarWidth}px` : 0,
//           marginRight: position === 'right' && !isOverlay && internalOpen ? `${currentSidebarWidth}px` : 0,
//           overflowY: 'auto',
//           height: '100vh',
//           paddingTop: appBarHeight || top,
//           transition: 'margin 0.3s ease',
//         }}
//       >
//         {children}
//       </main>
//     </div>
//   );
// }


// // 'use client';
// // import React, {
// //   useEffect,
// //   useRef,
// //   useState,
// //   ReactNode,
// //   useCallback,
// // } from 'react';
// // import RowFlex from '../specials/RowFlex';
// // import Text from '../text/Text';
// // import { usePathname } from 'next/navigation';
// // import { useVariant } from '../theme/theme';
// // import Button from '../button/Button';
// // import  Accordion from '../accordion/Accordion';

// // interface SideBarLink {
// //   uri: string;
// //   icon?: React.ReactNode;
// //   text: string;
// //   section: string;
// //   onClick?: () => void;
// // }

// // interface SideBarProps {
// //   funcss?: string;
// //   position?: 'left' | 'right';
// //   open?: boolean;
// //   header?: ReactNode;
// //   content?: ReactNode;
// //   footer?: ReactNode;
// //   top?: number;
// //   sidebarWidth?: number;
// //   sidebarCss?: string;
// //   activeCss?: string;
// //   iconCSS?: string;
// //   accordionItemCss?: string;
// //   bodyCss?: string;
// //   popIcon?: boolean;
// //   dividers?: boolean;
// //   links?: SideBarLink[];
// //   children?: ReactNode;
// //   onClose?: () => void;
// //   isAccordion?: boolean;
// // }

// // export default function SideBar({
// //   funcss = '',
// //   position = 'left',
// //   open = false,
// //   header,
// //   content,
// //   footer,
// //   top = 0,
// //   sidebarWidth = 250,
// //   iconCSS = '',
// //   sidebarCss = '',
// //   activeCss,
// //   bodyCss = '',
// //   popIcon = false,
// //   dividers = false,
// //   accordionItemCss,
// //   links = [],
// //   children,
// //   onClose,
// //   isAccordion = false,
// // }: SideBarProps) {
// //   const [isMobile, setIsMobile] = useState(false);
// //   const [internalOpen, setInternalOpen] = useState(open);
// //   const [appBarHeight, setAppBarHeight] = useState('0px');
// //   const pathname = usePathname();
// //   const sidebarRef = useRef<HTMLDivElement>(null);
// //   const { variant } = useVariant();
// //   const [selectedOption, setselectedOption] = useState('');
// //   const updateIsMobile = useCallback(() => {
// //     setIsMobile(window.innerWidth <= 992);
// //   }, []);

// //   useEffect(() => {
// //     updateIsMobile();
// //     window.addEventListener('resize', updateIsMobile);
// //     return () => window.removeEventListener('resize', updateIsMobile);
// //   }, [updateIsMobile]);

// //   // Sync internal state with prop changes
// //   useEffect(() => {
// //     setInternalOpen(open);
// //   }, [open]);

// //   useEffect(() => {
// //     const appBar = document.querySelector('#appBar') as HTMLElement;
// //     if (appBar) {
// //       setAppBarHeight(`${appBar.offsetHeight}px`);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (!isMobile || !internalOpen) return;

// //     const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
// //       if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
// //         handleClose();
// //       }
// //     };

// //     document.addEventListener('mousedown', handleOutsideClick);
// //     document.addEventListener('touchstart', handleOutsideClick);

// //     return () => {
// //       document.removeEventListener('mousedown', handleOutsideClick);
// //       document.removeEventListener('touchstart', handleOutsideClick);
// //     };
// //   }, [isMobile, internalOpen]);

// //   const handleClose = () => {
// //     setInternalOpen(false);
// //     onClose?.();
// //   };

// //   const groupedLinks = links.reduce<Record<string, SideBarLink[]>>((acc, link) => {
// //     acc[link.section] = acc[link.section] || [];
// //     acc[link.section].push(link);
// //     return acc;
// //   }, {});

// //   const isOverlay = isMobile;

// //   // Prepare accordion items when isAccordion is true
// //   const accordionItems = isAccordion
// //     ? Object.entries(groupedLinks).map(([section, sectionLinks]) => ({
// //       icon: sectionLinks[0]?.icon,
// //         title: section,
// //         content: (
// //           <div className="sidebar-accordion-links">
// //             {sectionLinks.map((link, index) => {
// //               const isActive = link.onClick
// //                 ? selectedOption === `${section}-${index}`
// //                 : pathname === link.uri;
// //               return (
// //                 <div
// //                   onClick={() => {
// //                     if (isMobile) {
// //                       handleClose();
// //                     }
// //                     if (link?.onClick) {
// //                       link.onClick();
// //                       setselectedOption(`${section}-${index}`);
// //                     } else {
// //                       window.location.href = link.uri;
// //                     }
// //                   }}
// //                   key={link.uri}
// //                 >
// //                   <Button
// //                     fullWidth
// //                     small
// //                     funcss={`sidebar-link ${isActive ? "" : "p-0"} text-left ${
// //                       isActive ? `primary ${activeCss || ''}` : 'hoverable'
// //                     }`}
// //                     startIcon={
// //                       <span
// //                         className={`${iconCSS || ''} ${
// //                           variant === 'standard' || popIcon
// //                             ? `p-1 ${isActive ? 'primary' : 'lighter text-primary border'} central`
// //                             : variant === 'minimal' && !isActive
// //                             ? 'p-1 central lighter text-primary'
// //                             : ''
// //                         }`}
// //                         style={{ lineHeight: 0, borderRadius: '0.4rem' }}
// //                       >
// //                         {link.icon}
// //                       </span>
// //                     }
// //                   >
// //                     <Text text={link.text} size="sm" weight={400} />
// //                   </Button>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         ),
// //       }))
// //     : [];

// //   return (
// //     <div className={`sidebar-container ${isOverlay ? '' : 'with-content'}`}>
// //       {internalOpen && (
// //         <aside
// //           role="complementary"
// //           ref={sidebarRef}
// //           className={`sidebar ${funcss} ${sidebarCss} ${isOverlay ? 'nav_overlay' : ''}`}
// //           style={{
// //             width: isOverlay ? '100%' : `${sidebarWidth}px`,
// //             height: `calc(100vh - ${appBarHeight || top || '0px'})`,
// //             position: 'fixed',
// //             top: appBarHeight || top,
// //             [position]: 0,
// //             padding: '1rem',
// //           }}
// //         >
// //             {header && <div>{header}</div>}

// //           <section className="sidebar-body mt-3">
// //             {links.length > 0 && (
// //               <nav className="sidebar-links">
// //                 {isAccordion ? (
// //                   <Accordion
// //                   itemClass={accordionItemCss}
// //                     items={accordionItems}
// //                     allowMultiple={false}
// //                     contentClass=""
// //                     titleClass='text-sm'
// //                     activeClass=""
// //                   />
// //                 ) : (
// //                   Object.entries(groupedLinks).map(([section, sectionLinks]) => (
// //                     <div key={section} className={`sidebar-section ${dividers ? 'bt' : ''} pt-2 pb-2`}>
// //                       <Text size="sm" >
// //                         {section}
// //                       </Text>
// //                       {sectionLinks.map((link, index) => {
// //                         const isActive = link.onClick
// //                           ? selectedOption === `${section}-${index}`
// //                           : pathname === link.uri;
// //                         return (
// //                           <div
// //                             onClick={() => {
// //                               if (isMobile) {
// //                                 handleClose();
// //                               }
// //                               if (link?.onClick) {
// //                                 link.onClick();
// //                                 setselectedOption(`${section}-${index}`);
// //                               } else {
// //                                 window.location.href = link.uri;
// //                               }
// //                             }}
// //                             key={link.uri}
// //                           >
// //                             <Button
// //                               fullWidth
// //                               small
// //                               funcss={`sidebar-link text-left ${
// //                                 isActive ? `primary ${activeCss || ''}` : 'hoverable'
// //                               }`}
// //                               startIcon={
// //                                 <span
// //                                   className={`${iconCSS || ''} ${
// //                                     variant === 'standard' || popIcon
// //                                       ? `p-1 ${isActive ? 'primary' : 'lighter text-primary border'} central`
// //                                       : variant === 'minimal' && !isActive
// //                                       ? 'p-1 central lighter text-primary'
// //                                       : ''
// //                                   }`}
// //                                   style={{ lineHeight: 0, borderRadius: '0.4rem' }}
// //                                 >
// //                                   {link.icon}
// //                                 </span>
// //                               }
// //                             >
// //                               <Text text={link.text} size="sm" weight={400} />
// //                             </Button>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   ))
// //                 )}
// //               </nav>
// //             )}
// //             {content}
// //           </section>

// //           {footer && <footer className="sidebar-footer mt-2">{footer}</footer>}
// //         </aside>
// //       )}

// //       <main
// //         className={`main-content ${bodyCss}`}
// //         style={{
// //           flex: 1,
// //           marginLeft: position === 'left' && !isOverlay && internalOpen ? `${sidebarWidth}px` : 0,
// //           marginRight: position === 'right' && !isOverlay && internalOpen ? `${sidebarWidth}px` : 0,
// //           overflowY: 'auto',
// //           height: '100vh',
// //           paddingTop: appBarHeight || top,
// //           transition: 'margin 0.3s ease',
// //         }}
// //       >
// //         {children}
// //       </main>
// //     </div>
// //   );
// // }
// 'use client';
// import React, {
//   useEffect,
//   useRef,
//   useState,
//   ReactNode,
//   useCallback,
// } from 'react';
// import RowFlex from '../specials/RowFlex';
// import Text from '../text/Text';
// import { usePathname } from 'next/navigation';
// import { useVariant } from '../theme/theme';
// import Button from '../button/Button';
// import Accordion from '../accordion/Accordion';
// import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from "react-icons/bs";
// import Flex from '../flex/Flex';
// import ToolTip from '../tooltip/ToolTip';
// import Tip from '../tooltip/Tip';

// interface SideBarLink {
//   uri: string;
//   icon?: React.ReactNode;
//   text: string;
//   section: string;
//   onClick?: () => void;
// }

// interface SideBarProps {
//   funcss?: string;
//   position?: 'left' | 'right';
//   open?: boolean;
//   header?: ReactNode;
//   content?: ReactNode;
//   footer?: ReactNode;
//   top?: number;
//   sidebarWidth?: number;
//   sidebarCss?: string;
//   activeCss?: string;
//   iconCSS?: string;
//   accordionItemCss?: string;
//   bodyCss?: string;
//   popIcon?: boolean;
//   dividers?: boolean;
//   links?: SideBarLink[];
//   children?: ReactNode;
//   onClose?: () => void;
//   isAccordion?: boolean;
//   togglePrefix?: ReactNode;
// }

// export default function SideBar({
//   funcss = '',
//   position = 'left',
//   open = false,
//   header,
//   content,
//   footer,
//   top = 0,
//   sidebarWidth = 250,
//   iconCSS = '',
//   sidebarCss = '',
//   activeCss,
//   bodyCss = '',
//   popIcon = false,
//   dividers = false,
//   accordionItemCss,
//   links = [],
//   children,
//   onClose,
//   togglePrefix,
//   isAccordion = false,
// }: SideBarProps) {
//   const [isMobile, setIsMobile] = useState(false);
//   const [internalOpen, setInternalOpen] = useState(open);
//   const [appBarHeight, setAppBarHeight] = useState('0px');
//   const [collapsed, setCollapsed] = useState(false);
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const { variant } = useVariant();
//   const [selectedOption, setselectedOption] = useState('');
//   const updateIsMobile = useCallback(() => {
//     setIsMobile(window.innerWidth <= 992);
//   }, []);

//   useEffect(() => {
//     updateIsMobile();
//     window.addEventListener('resize', updateIsMobile);
//     return () => window.removeEventListener('resize', updateIsMobile);
//   }, [updateIsMobile]);

//   // Sync internal state with prop changes
//   useEffect(() => {
//     setInternalOpen(open);
//   }, [open]);

//   useEffect(() => {
//     const appBar = document.querySelector('#appBar') as HTMLElement;
//     if (appBar) {
//       setAppBarHeight(`${appBar.offsetHeight}px`);
//     }
//   }, []);

//   useEffect(() => {
//     if (!isMobile || !internalOpen) return;

//     const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
//         handleClose();
//       }
//     };

//     document.addEventListener('mousedown', handleOutsideClick);
//     document.addEventListener('touchstart', handleOutsideClick);

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//       document.removeEventListener('touchstart', handleOutsideClick);
//     };
//   }, [isMobile, internalOpen]);

//   const handleClose = () => {
//     setInternalOpen(false);
//     onClose?.();
//   };

//   const toggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   const groupedLinks = links.reduce<Record<string, SideBarLink[]>>((acc, link) => {
//     acc[link.section] = acc[link.section] || [];
//     acc[link.section].push(link);
//     return acc;
//   }, {});

//   const isOverlay = isMobile;

//   // Prepare accordion items when isAccordion is true
//   const accordionItems = isAccordion
//     ? Object.entries(groupedLinks).map(([section, sectionLinks]) => ({
//       icon: sectionLinks[0]?.icon,
//         title: section,
//         content: (
//           <div className="sidebar-accordion-links">
//             {sectionLinks.map((link, index) => {
//               const isActive = link.onClick
//                 ? selectedOption === `${section}-${index}`
//                 : pathname === link.uri;
//               return (
//                 <div
//                   onClick={() => {
//                     if (isMobile) {
//                       handleClose();
//                     }
//                     if (link?.onClick) {
//                       link.onClick();
//                       setselectedOption(`${section}-${index}`);
//                     } else {
//                       window.location.href = link.uri;
//                     }
//                   }}
//                   key={link.uri}
//                 >
//                   <Button
//                     fullWidth
//                     small
//                     funcss={`sidebar-link ${isActive ? "" : "p-0"} text-left ${
//                       isActive ? `primary ${activeCss || ''}` : 'hoverable'
//                     }`}
//                     startIcon={
//                       <span
//                         className={`${iconCSS || ''} ${
//                           variant === 'standard' || popIcon
//                             ? `p-1 ${isActive ? 'primary' : 'lighter text-primary border'} central`
//                             : variant === 'minimal' && !isActive
//                             ? 'p-1 central lighter text-primary'
//                             : ''
//                         }`}
//                         style={{ lineHeight: 0, borderRadius: '0.4rem' }}
//                       >
//                         {link.icon}
//                       </span>
//                     }
//                   >
//                     {!collapsed && <Text text={link.text} size="sm" weight={400} />}
//                   </Button>
//                 </div>
//               );
//             })}
//           </div>
//         ),
//       }))
//     : [];

//   // Get current sidebar width based on collapsed state
//   const currentSidebarWidth = collapsed ? 70 : sidebarWidth;
//   const collapseIconSize = '18px'

//   return (
//     <div className={`sidebar-container ${isOverlay ? '' : 'with-content'}`}>
//       {/* Collapsed Sidebar */}
//       {internalOpen && collapsed && (
//         <aside
//           role="complementary"
//           ref={sidebarRef}
//           className={`sidebar collapsed ${funcss} ${sidebarCss} ${isOverlay ? 'nav_overlay' : ''}`}
//           style={{
//             width: isOverlay ? '100%' : `${currentSidebarWidth}px`,
//             height: `calc(100vh - ${appBarHeight || top || '0px'})`,
//             position: 'fixed',
//             top: appBarHeight || top,
//             [position]: 0,
//             padding: '0.5rem',
//             // overflow: 'auto',
//             overflow:"visible"
//           }}
//         >
//           {/* Expand Button at Top */}
              
         
//               <div  
//           className='pointer text-primary text-center p-1 bb mb'
//           style={{fontSize:collapseIconSize , lineHeight: 0}}
//           onClick={toggleCollapse}
//           >
          
//             <BsLayoutSidebarInsetReverse /> 
//           </div>


//           {/* Collapsed Icons Only */}
//           <section className="">
//             {links.length > 0 && (
//               <Flex direction='column' gap={0.6} alignItems='center' width='100%'>
//                 {Object.entries(groupedLinks).map(([section, sectionLinks], sectionIndex) => (
//                   <Flex direction='column' gap={0.5} alignItems='center' width='100%'>
//                     {sectionLinks.map((link, index) => {
//                       const isActive = link.onClick
//                         ? selectedOption === `${section}-${index}`
//                         : pathname === link.uri;
//                       return (
//                         <div
//                           onClick={() => {
//                             if (isMobile) {
//                               handleClose();
//                             }
//                             if (link?.onClick) {
//                               link.onClick();
//                               setselectedOption(`${section}-${index}`);
//                             } else {
//                               window.location.href = link.uri;
//                             }
//                           }}
//                           key={link.uri}
//                           className='hover-scale'
//                         >
//                                 <span
//                               className={` pointer ${iconCSS || ''} ${
//                                 variant === 'standard' || popIcon
//                                   ? `p-1 ${isActive ? 'text-primary' : 'bg  border'} central`
//                                   : variant === 'minimal' && !isActive
//                                   ? 'p-1 central bg'
//                                   : ''
//                               }`}
//                               style={{ lineHeight: 0, borderRadius: '0.4rem' , fontSize: collapseIconSize }}
//                             >
//                               {link.icon}
//                             </span>
       
//                           {/* </Button> */}
//                         </div>
//                       );
//                     })}
                    
//                     {/* Add HR between sections except after last one */}
//                     {sectionIndex < Object.keys(groupedLinks).length - 1 && (
//                       <div className="mt-1 mb-1 bt fit" />
//                     )}
//                   </Flex>
//                 ))}
//               </Flex>
//             )}
//           </section>
//         </aside>
//       )}

//       {/* Regular Sidebar */}
//       {internalOpen && !collapsed && (
//         <aside
//           role="complementary"
//           ref={sidebarRef}
//           className={`sidebar ${funcss} ${sidebarCss} ${isOverlay ? 'nav_overlay' : ''}`}
//           style={{
//             width: isOverlay ? '100%' : `${currentSidebarWidth}px`,
//             height: `calc(100vh - ${appBarHeight || top || '0px'})`,
//             position: 'fixed',
//             top: appBarHeight || top,
//             [position]: 0,
//             padding: '1rem',
//           }}
//         >
//           {/* Header with Collapse Button */}
//           <div className="sidebar-header">
//                  <Flex width='100%' alignItems='center' gap={0.5} justify='space-between'>
//           {togglePrefix || <div />}
//                   <div  
//           className='pointer hover-text-primary text-right'
//           style={{fontSize:collapseIconSize , lineHeight: 0}}
//           onClick={toggleCollapse}
//           >
//        <BsLayoutSidebarInset  />
//           </div>
//           </Flex>

//               {header && <div>{header}</div>}

//           </div>

//           <section className="sidebar-body mt-3">
//             {links.length > 0 && (
//               <nav className="sidebar-links">
//                 {isAccordion ? (
//                   <Accordion
//                   itemClass={accordionItemCss}
//                     items={accordionItems}
//                     allowMultiple={false}
//                     contentClass=""
//                     titleClass='text-sm'
//                     activeClass=""
//                   />
//                 ) : (
//                   Object.entries(groupedLinks).map(([section, sectionLinks]) => (
//                     <div key={section} className={`sidebar-section ${dividers ? 'bt' : ''} pt-2 pb-2`}>
//                       <Text size="sm" >
//                         {section}
//                       </Text>
//                       {sectionLinks.map((link, index) => {
//                         const isActive = link.onClick
//                           ? selectedOption === `${section}-${index}`
//                           : pathname === link.uri;
//                         return (
//                           <div
//                             onClick={() => {
//                               if (isMobile) {
//                                 handleClose();
//                               }
//                               if (link?.onClick) {
//                                 link.onClick();
//                                 setselectedOption(`${section}-${index}`);
//                               } else {
//                                 window.location.href = link.uri;
//                               }
//                             }}
//                             key={link.uri}
//                           >
//                             <Button
//                               fullWidth
//                               small
//                               funcss={`sidebar-link text-left ${
//                                 isActive ? `primary ${activeCss || ''}` : 'hoverable'
//                               }`}
//                               startIcon={
//                                 <span
//                                   className={`${iconCSS || ''} ${
//                                     variant === 'standard' || popIcon
//                                       ? `p-1 ${isActive ? 'primary' : 'lighter text-primary border'} central`
//                                       : variant === 'minimal' && !isActive
//                                       ? 'p-1 central lighter text-primary'
//                                       : ''
//                                   }`}
//                                   style={{ lineHeight: 0, borderRadius: '0.4rem' }}
//                                 >
//                                   {link.icon}
//                                 </span>
//                               }
//                             >
//                               <Text text={link.text} size="sm" weight={400} />
//                             </Button>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   ))
//                 )}
//               </nav>
//             )}
//             {content}
//           </section>

//           {footer && <footer className="sidebar-footer mt-2">{footer}</footer>}
//         </aside>
//       )}

//       <main
//         className={`main-content ${bodyCss}`}
//         style={{
//           flex: 1,
//           marginLeft: position === 'left' && !isOverlay && internalOpen ? `${currentSidebarWidth}px` : 0,
//           marginRight: position === 'right' && !isOverlay && internalOpen ? `${currentSidebarWidth}px` : 0,
//           overflowY: 'auto',
//           height: '100vh',
//           paddingTop: appBarHeight || top,
//           transition: 'margin 0.3s ease',
//         }}
//       >
//         {children}
//       </main>
//     </div>
//   );
// }