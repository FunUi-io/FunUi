'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // <-- Updated import
import Hamburger from './Hamburger';

interface NavbarProps {
  fixedTop?: boolean;
  funcss?: string;
  padding?: string;
  fixedBottom?: boolean;
  justify?: string;
  children?: React.ReactNode;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  sidebarTrigger?: React.ReactNode;
  transparent?: boolean;
  sideBar?: number;
  hasSidebar?: boolean;
  sidebarOpen?: boolean;
  openSidebar?: () => void;
}

export default function AppBar({
  fixedTop,
  funcss,
  padding,
  fixedBottom,
  justify,
  left,
  center,
  right,
  sideBar,
  sidebarTrigger,
  transparent,
  hasSidebar,
  openSidebar,
  sidebarOpen = false
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const pathname = usePathname(); // <-- New hook to detect path changes

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 992;
      setIsMobileScreen(isMobile);
      if (!isMobile) {
        closeMenu(); // close on larger screens
      }
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatically close menu on route (pathname) change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const Trigger = ({ isOpen }: { isOpen: boolean }) => {
    return <Hamburger isOpen={isOpen} />;
  };

  return (
    <nav
    // the id will be used to get the height for the sidebar in the sidebar file
    id='appBar'
      className={`navigation-bar
        ${isMobileMenuOpen ? 'navbar-mobile-open' : ''}
        ${funcss || ''}
        ${fixedTop ? 'fixed_top_navbar' : ''}
        ${sideBar ? 'there_is_sidebar' : ''}
        ${transparent ? 'transparent' : ''}
        ${fixedBottom ? 'fixedBottom' : ''}
      `}
      style={{
        padding: `${padding || ''}`,
        justifyContent: `${justify || ''}`,
      }}
    >
      <div className="logoWrapper">
        {left}
        {isMobileScreen && isMobileMenuOpen && (
          <div className="hover-text-error pointer _closeNav" onClick={closeMenu}>
            <Trigger isOpen={isMobileMenuOpen} />
          </div>
        )}
      </div>

      <div className="linkWrapper">{center}</div>
      <div className="linkWrapper">{right}</div>

      {isMobileScreen && !isMobileMenuOpen && (
       <>
       {
        hasSidebar ? 
         <span className="sidebar-trigger pointer hover-text-primary" onClick={openSidebar}>
          {sidebarTrigger  || <Trigger isOpen={sidebarOpen} />}
        </span>
        :  <span className="sidebar-trigger pointer hover-text-primary" onClick={toggleMenu}>
          {sidebarTrigger || <Trigger isOpen={isMobileMenuOpen} />}
        </span>
       }
       </>
      )}
    </nav>
  );
}
