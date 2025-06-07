'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { PiList, PiX } from 'react-icons/pi';


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
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileScreen(isMobile);
      if (!isMobile) {
        setIsMobileMenuOpen(false); // auto-close on large screens
      }
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={`
        navigation-bar
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

        {/* Show close icon only when mobile and menu is open */}
        {isMobileScreen && isMobileMenuOpen && (
          <div className="hover-text-error pointer _closeNav" onClick={closeMenu}>
            <PiX size={25} />
          </div>
        )}
      </div>

      <div className="linkWrapper">{center}</div>
      <div className="linkWrapper">{right}</div>

      {/* Show trigger only when mobile and menu is not open */}
      {isMobileScreen && !isMobileMenuOpen && (
        <span className="sidebar-trigger pointer hover-text-primary" onClick={toggleMenu}>
          {sidebarTrigger || <PiList size={30} />}
        </span>
      )}
    </nav>
  );
}
