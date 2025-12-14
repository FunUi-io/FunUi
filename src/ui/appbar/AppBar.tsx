'use client';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Hamburger from './Hamburger';
import { useComponentConfiguration } from '../../utils/componentUtils';
import { getDynamicIcon } from '../../utils/getDynamicIcon';

interface NavLink {
  label: string;
  href: string;
  icon?: string;
  iconPosition?: 'prefix' | 'suffix';
  children?: NavLink[];
  active?: boolean;
  className?: string;
}

interface NavbarProps {
  // Layout & Behavior
  fixedTop?: boolean;
  funcss?: string;
  padding?: string;
  fixedBottom?: boolean;
  justify?: string;
  transparent?: boolean;
  
  // Content Sections
  children?: React.ReactNode;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  
  // Sidebar
  sidebarTrigger?: React.ReactNode;
  sideBar?: number;
  hasSidebar?: boolean;
  sidebarOpen?: boolean;
  openSidebar?: () => void;
  
  // Variant Support
  variant?: string;
  
  // Navigation Links
  leftLinks?: NavLink[] | string;
  centerLinks?: NavLink[] | string;
  rightLinks?: NavLink[] | string;
  renderLink?: (link: NavLink, index: number) => React.ReactNode;
  mobileMenuBreakpoint?: number;

  // Logo Customization
  logoType?: 'text' | 'image' | 'both' | 'none';
  logoText?: string;
  logoTextSize?: string;
  logoTextColor?: string;
  logoTextWeight?: string;
  logoUrl?: string;
  logoAlt?: string;
  logoWidth?: string;
  logoHeight?: string;
  logoHref?: string;
  onLogoClick?: () => void;

  // Link Styling
  linkGap?: string;
  linkPadding?: string;
  activeLinkColor?: string;
  dropdownArrow?: boolean;
}

// Parse string to object utility
const parseIfString = <T,>(value: T | string, fallback: T): T => {
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as T;
      if (Array.isArray(fallback) && !Array.isArray(parsed)) {
        console.warn('Parsed value is not an array, using fallback');
        return fallback;
      }
      return parsed;
    } catch (error) {
      console.error('Failed to parse JSON string:', error);
      return fallback;
    }
  }
  
  if (value == null) {
    return fallback;
  }
  
  return value as T;
};

// Dropdown Arrow Icon Component
const DropdownArrow = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    style={{ 
      transition: 'transform 0.3s ease',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
    }}
  >
    <path 
      d="M4 6 L8 10 L12 6" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Link Item Component with Dropdown Support
const LinkItem = ({ 
  link, 
  renderLink,
  linkPadding = '0.5rem 1rem',
  activeLinkColor = 'primary',
  dropdownArrow = true,
  isMobile = false
}: { 
  link: NavLink;
  renderLink?: (link: NavLink, index: number) => React.ReactNode;
  linkPadding?: string;
  activeLinkColor?: string;
  dropdownArrow?: boolean;
  isMobile?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [iconNode, setIconNode] = useState<React.ReactNode>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle dynamic icon loading
  useEffect(() => {
    if (link.icon) {
      getDynamicIcon(link.icon).then(setIconNode);
    } else {
      setIconNode(null);
    }
  }, [link.icon]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const hasChildren = link.children && link.children.length > 0;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isMobile && hasChildren) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren && isMobile) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const linkContent = (
    <span 
      className={`nav_link-content ${link.active ? 'active' : ''} ${link.className || ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: linkPadding,
        color: 'inherit',
        textDecoration: 'none'
      }}
    >
      {/* Prefix Icon */}
      {iconNode && link.iconPosition !== 'suffix' && (
        <span className="nav_link-icon prefix" style={{ display: 'flex', alignItems: 'center' }}>
          {iconNode}
        </span>
      )}
      
      <span className="nav_link-text">{link.label}</span>
      
      {/* Suffix Icon */}
      {iconNode && link.iconPosition === 'suffix' && (
        <span className="nav_link-icon suffix" style={{ display: 'flex', alignItems: 'center' }}>
          {iconNode}
        </span>
      )}
      
      {/* Dropdown Arrow */}
      {hasChildren && dropdownArrow && (
        <span className="nav_link-arrow" style={{ display: 'flex', alignItems: 'center' }}>
          <DropdownArrow isOpen={isOpen} />
        </span>
      )}
    </span>
  );

  // If custom renderer is provided, use it
  if (renderLink) {
    return renderLink(link, 0);
  }

  return (
    <div 
      ref={dropdownRef}
      className={`nav_item ${hasChildren ? 'has-dropdown' : ''} ${isOpen ? 'dropdown-open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative' }}
    >
      <a
        href={link.href}
        className={`nav_link ${link.active ? 'active' : ''}`}
        onClick={handleClick}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {linkContent}
      </a>

      {/* Dropdown Menu */}
      {hasChildren && isOpen && (
        <div className={`nav_dropdown-menu ${isMobile ? 'nav_dropdown-mobile' : ''}`}>
          {link.children!.map((child, index) => (
            <LinkItem 
              key={index}
              link={child}
              renderLink={renderLink}
              linkPadding={linkPadding}
              activeLinkColor={activeLinkColor}
              dropdownArrow={dropdownArrow}
              isMobile={isMobile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Links component to render navigation links
const NavLinks = ({ 
  links, 
  renderLink,
  linkGap = '1rem',
  linkPadding = '0.5rem 1rem',
  activeLinkColor = 'primary',
  dropdownArrow = true,
  isMobile = false
}: { 
  links: NavLink[]; 
  renderLink?: (link: NavLink, index: number) => React.ReactNode;
  linkGap?: string;
  linkPadding?: string;
  activeLinkColor?: string;
  dropdownArrow?: boolean;
  isMobile?: boolean;
}) => {
  if (!links || !Array.isArray(links) || links.length === 0) {
    return null;
  }

  return (
    <div 
      className="nav_links" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: linkGap,
        flexDirection: isMobile ? 'column' : 'row'
      }}
    >
      {links.map((link, index) => (
        <LinkItem
          key={index}
          link={link}
          renderLink={renderLink}
          linkPadding={linkPadding}
          activeLinkColor={activeLinkColor}
          dropdownArrow={dropdownArrow}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

// Logo component with multiple display options
const Logo = ({ 
  type = 'text',
  text = 'MyApp',
  textSize = 'xl',
  textColor = 'primary',
  textWeight = 'bold',
  url = '',
  alt = 'Logo',
  width = '40px',
  height = 'auto',
  href = '/',
  onClick
}: {
  type?: 'text' | 'image' | 'both' | 'none';
  text?: string;
  textSize?: string;
  textColor?: string;
  textWeight?: string;
  url?: string;
  alt?: string;
  width?: string;
  height?: string;
  href?: string;
  onClick?: () => void;
}) => {
  if (type === 'none') return null;

  const logoContent = (
    <div className="logo-content" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      {/* Image Logo */}
      {(type === 'image' || type === 'both') && url && (
        <img 
          src={url} 
          alt={alt}
          style={{ 
            width, 
            height, 
            objectFit: 'contain',
            display: 'block'
          }}
          className="logo-image"
        />
      )}
      
      {/* Text Logo */}
      {(type === 'text' || type === 'both') && text && (
        <span 
          className={`logo-text text-${textSize} text-${textColor} font-${textWeight}`}
          style={{ 
            lineHeight: 1,
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </span>
      )}
    </div>
  );

  // Wrap in link if href provided
  if (href) {
    return (
      <a 
        href={href}
        onClick={onClick}
        style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          display: 'flex',
          alignItems: 'center'
        }}
        className="logo-link"
      >
        {logoContent}
      </a>
    );
  }

  return (
    <div 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="logo-container"
    >
      {logoContent}
    </div>
  );
};

export default function AppBar(localProps: NavbarProps) {
  // Use component configuration with variant support
  const { mergeWithLocal } = useComponentConfiguration('AppBar', localProps.variant);
  
  // Merge with config - LOCAL PROPS OVERRIDE CONFIG
  const { props: mergedProps } = mergeWithLocal(localProps);

  // Parse link props if they're strings
  const parsedLeftLinks = parseIfString<NavLink[]>(mergedProps.leftLinks, []);
  const parsedCenterLinks = parseIfString<NavLink[]>(mergedProps.centerLinks, []);
  const parsedRightLinks = parseIfString<NavLink[]>(mergedProps.rightLinks, []);

  // Use mergedProps directly
  const final = mergedProps;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < (final.mobileMenuBreakpoint || 992);
      setIsMobileScreen(isMobile);
      if (!isMobile) {
        closeMenu(); // close on larger screens
      }
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [final.mobileMenuBreakpoint]);

  // Automatically close menu on route (pathname) change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const Trigger = ({ isOpen }: { isOpen: boolean }) => {
    return <Hamburger isOpen={isOpen} />;
  };

  // Enhanced left section with logo customization
  const renderLeftSection = () => {
    // If custom left content is provided, use it (overrides everything)
    if (final.left) return final.left;

    // Render logo based on configuration
    const shouldRenderLogo = final.logoType && final.logoType !== 'none';
    const hasLeftLinks = parsedLeftLinks.length > 0;

    return (
      <div className="left-section" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Logo */}
        {shouldRenderLogo && (
          <Logo
            type={final.logoType}
            text={final.logoText}
            textSize={final.logoTextSize}
            textColor={final.logoTextColor}
            textWeight={final.logoTextWeight}
            url={final.logoUrl}
            alt={final.logoAlt}
            width={final.logoWidth}
            height={final.logoHeight}
            href={final.logoHref}
            onClick={final.onLogoClick}
          />
        )}
        
        {/* Left navigation links (appear next to logo) */}
        {hasLeftLinks && !isMobileScreen && (
          <NavLinks 
            links={parsedLeftLinks} 
            renderLink={final.renderLink}
            linkGap={final.linkGap}
            linkPadding={final.linkPadding}
            activeLinkColor={final.activeLinkColor}
            dropdownArrow={final.dropdownArrow}
          />
        )}
      </div>
    );
  };

  const renderCenterSection = () => {
    if (final.center) return final.center;
    if (parsedCenterLinks.length > 0 && !isMobileScreen) {
      return (
        <NavLinks 
          links={parsedCenterLinks} 
          renderLink={final.renderLink}
          linkGap={final.linkGap}
          linkPadding={final.linkPadding}
          activeLinkColor={final.activeLinkColor}
          dropdownArrow={final.dropdownArrow}
        />
      );
    }
    return null;
  };

  const renderRightSection = () => {
    if (final.right) return final.right;
    if (parsedRightLinks.length > 0 && !isMobileScreen) {
      return (
        <NavLinks 
          links={parsedRightLinks} 
          renderLink={final.renderLink}
          linkGap={final.linkGap}
          linkPadding={final.linkPadding}
          activeLinkColor={final.activeLinkColor}
          dropdownArrow={final.dropdownArrow}
        />
      );
    }
    return null;
  };

  // Mobile menu content
  const renderMobileMenu = () => {
    if (!isMobileScreen || !isMobileMenuOpen) return null;

    const allLinks = [...parsedLeftLinks, ...parsedCenterLinks, ...parsedRightLinks];
    
    return (
      <div className="nav_mobile-menu">
        <NavLinks 
          links={allLinks} 
          renderLink={final.renderLink}
          linkGap="0.5rem"
          linkPadding="1rem"
          activeLinkColor={final.activeLinkColor}
          dropdownArrow={final.dropdownArrow}
          isMobile={true}
        />
      </div>
    );
  };

  return (
    <>
      <nav
        id='appBar'
        className={`navigation-bar
          ${isMobileMenuOpen ? 'navbar-mobile-open' : ''}
          ${final.funcss || ''}
          ${final.fixedTop ? 'fixed_top_navbar' : ''}
          ${final.sideBar ? 'there_is_sidebar' : ''}
          ${final.transparent ? 'transparent' : ''}
          ${final.fixedBottom ? 'fixedBottom' : ''}
        `}
        style={{
          padding: `${final.padding || ''}`,
          justifyContent: `${final.justify || ''}`,
        }}
      >
        <div className="logoWrapper">
          {renderLeftSection()}
          {isMobileScreen && isMobileMenuOpen && (
            <div className="hover-text-error pointer _closeNav" onClick={closeMenu}>
              <Trigger isOpen={isMobileMenuOpen} />
            </div>
          )}
        </div>

        <div className="linkWrapper">
          {renderCenterSection()}
        </div>
        
        <div className="linkWrapper">
          {renderRightSection()}
        </div>

        {isMobileScreen && !isMobileMenuOpen && (
          <>
            {final.hasSidebar ? 
              <span className="sidebar-trigger pointer hover-text-primary" onClick={final.openSidebar}>
                {final.sidebarTrigger || <Trigger isOpen={final.sidebarOpen} />}
              </span>
              :  
              <span className="sidebar-trigger pointer hover-text-primary" onClick={toggleMenu}>
                {final.sidebarTrigger || <Trigger isOpen={isMobileMenuOpen} />}
              </span>
            }
          </>
        )}
      </nav>
      
      {/* Mobile Menu Overlay */}
      {renderMobileMenu()}
    </>
  );
}