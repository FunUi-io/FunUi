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
import { PiX } from 'react-icons/pi';
import Link from 'next/link';

interface SideBarLink {
  uri: string;
  icon: React.ReactNode;
  text: string;
  section: string;
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
  bodyCss?: string;
  popIcon?:boolean;
  dividers?:boolean;
  links?: SideBarLink[];
  children?: ReactNode;
  onClose?: () => void;
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
  links = [],
  children,
  onClose,
}: SideBarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [internalOpen, setInternalOpen] = useState(open);
  const [appBarHeight, setAppBarHeight] = useState('0px');
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const updateIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 992);
    
  }, []);

  useEffect(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, [updateIsMobile]);

  // Sync internal state with prop changes
  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

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

  const groupedLinks = links.reduce<Record<string, SideBarLink[]>>((acc, link) => {
    acc[link.section] = acc[link.section] || [];
    acc[link.section].push(link);
    return acc;
  }, {});

  const isOverlay = isMobile;

  return (
    <div className={`sidebar-container ${isOverlay ? '' : 'with-content'}`}>
      {internalOpen && (
        <aside
          role="complementary"
          ref={sidebarRef}
          className={`sidebar ${funcss} ${sidebarCss}  ${isOverlay ? 'nav_overlay' : ''}`}
          style={{
            width: isOverlay ? '100%' : `${sidebarWidth}px`,
            height: `calc(100vh - ${appBarHeight || top || '0px'})`,
            position: 'fixed',
            top: appBarHeight || top,
            [position]: 0,
            padding: '1rem',
          }}
        >
              {/* {isMobile && (
              <div
                className="hover-text-error pointer"
                onClick={handleClose}
                style={{ cursor: 'pointer' }}
              >
                {close || <PiX size={25}/>}
              </div>
            )} */}

          <RowFlex justify="space-between" funcss="pl-2 pr-2">
            {header && <div>{header}</div>}
        
          </RowFlex>

          <section className="sidebar-body mt-3">
            {links.length > 0 && (
              <nav className="sidebar-links">
                {Object.entries(groupedLinks).map(([section, sectionLinks]) => (
                  <div key={section} className={`sidebar-section ${dividers ? "bt" : ""} pt-2 pb-2`}>
                    <Text size="sm" funcss="opacity-6 p-1 pl-2 pr-2">{section}</Text>
                    {sectionLinks.map(link => {
                      const isActive = pathname === link.uri;
                      return (
                        <Link onClick={() => {
                          if(isMobile){
                            handleClose()
                          }
                        }} key={link.uri} href={link.uri}>
                          <div   className={`p-1 pl-2 pr-2 sidebar-link  ${
                            isActive ? `primary50 outline-primary200 ${activeCss || ''}` : 'hoverable'
                          }`}>
                            <span className={`${iconCSS || '' } ${popIcon ? `p-1 border lighter central` : ""}`} style={{ lineHeight: 0  , borderRadius:"0.4rem"}}>{link.icon}</span>
                            <Text text={link.text} size="sm" weight={400} />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            )}
            {content}
          </section>

          {footer && <footer className="sidebar-footer mt-2">{footer}</footer>}
        </aside>
      )}

      <main
        className={`main-content ${bodyCss}`}
        style={{
          flex: 1,
          marginLeft: position === 'left' && !isOverlay && internalOpen ? `${sidebarWidth}px` : 0,
          marginRight: position === 'right' && !isOverlay && internalOpen ? `${sidebarWidth}px` : 0,
          overflowY: 'auto',
          height: '100vh',
          paddingTop: appBarHeight || top,
          transition: 'margin 0.3s ease',
        }}
      >
        {children}
      </main>
    </div>
  );
}