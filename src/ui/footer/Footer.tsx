'use client';
import React, { useEffect, useState } from 'react';
import { 
  PiFacebookLogo, 
  PiInstagramLogo, 
  PiTwitterLogo, 
  PiYoutubeLogo, 
  PiLinkedinLogo, 
  PiGithubLogo,
  PiPhone,
  PiMapPin,
  PiEnvelope
} from 'react-icons/pi';
import { getDynamicIcon } from '../../utils/getDynamicIcon';
import { useComponentConfiguration } from '../../utils/componentUtils';
import Text from '../text/Text';

type LinkItem = {
  label: string;
  url: string;
  external?: boolean;
  icon?: string;
};

type LinkSection = {
  title: string;
  links: LinkItem[];
};

type SocialMedia = {
  facebook?: React.ReactNode | string;
  instagram?: React.ReactNode | string;
  twitter?: React.ReactNode | string;
  x?: React.ReactNode | string;
  youtube?: React.ReactNode | string;
  linkedin?: React.ReactNode | string;
  github?: React.ReactNode | string;
  [key: string]: React.ReactNode | string | undefined;
};

type FooterProps = {
  // Logo Props
  logo?: React.ReactNode;
  logoUrl?: string;
  logoSize?: string;
  logoClass?: string;
  logoLinkUrl?: string;
  
  // Company Info
  companyName?: string;
  description?: React.ReactNode | string;
  descriptionClass?: string;
  descriptionVariant?: string;
  year?: number | string;
  showYear?: boolean;
  showRightsReserved?: boolean;
  copyrightText?: string;
  
  // Link Sections (accepts array or JSON string)
  sections?: LinkSection[] | string;
  
  // Legal Links
  privacyUrl?: string;
  termsUrl?: string;
  cookiesUrl?: string;
  privacyText?: string;
  termsText?: string;
  cookiesText?: string;
  
  // Social Media URLs
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  xUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  
  // Social Media Icons (string for dynamic or ReactNode)
  facebookIcon?: React.ReactNode | string;
  instagramIcon?: React.ReactNode | string;
  twitterIcon?: React.ReactNode | string;
  xIcon?: React.ReactNode | string;
  youtubeIcon?: React.ReactNode | string;
  linkedinIcon?: React.ReactNode | string;
  githubIcon?: React.ReactNode | string;
  
  // Or use socialMedia object
  socialMedia?: SocialMedia;
  socialIconSize?: number;
  
  // Contact Info
  email?: string;
  phone?: string;
  address?: string;
  showContactInfo?: boolean;
  emailIcon?: React.ReactNode | string;
  phoneIcon?: React.ReactNode | string;
  addressIcon?: React.ReactNode | string;
  
  // Layout & Styling
  bg?: string;
  textColor?: string;
  borderColor?: string;
  linkHoverColor?: string;
  layout?: 'default' | 'centered' | 'compact' | 'stacked';
  showDivider?: boolean;
  padding?: string;
  gap?: string;
  maxWidth?: string;
  
  // Responsive Props
  mobileBreakpoint?: string;
  tabletBreakpoint?: string;
  
  // Custom Classes
  funcss?: string;
  containerClass?: string;
  topSectionClass?: string;
  bottomSectionClass?: string;
  sectionTitleClass?: string;
  linkClass?: string;
  socialContainerClass?: string;
  legalLinksClass?: string;
  
  // Additional
  children?: React.ReactNode;
  variant?: string;
};

const Footer: React.FC<FooterProps> = (localProps) => {
  // Use component configuration with variant
  const { mergeWithLocal } = useComponentConfiguration('Footer', localProps.variant);
  const { props: final } = mergeWithLocal(localProps);
  
  const currentYear = final.year || new Date().getFullYear();
  
  // State for dynamic icons
  const [loadedIcons, setLoadedIcons] = useState<{[key: string]: React.ReactNode}>({});
  
  // Parse sections if it's a JSON string
  const sections: LinkSection[] = React.useMemo(() => {
    if (!final.sections) return [];
    if (typeof final.sections === 'string') {
      try {
        return JSON.parse(final.sections);
      } catch (e) {
        console.error('Failed to parse sections JSON:', e);
        return [];
      }
    }
    return final.sections;
  }, [final.sections]);
  
  // Helper function to check if something is a React element
  function isReactElement(node: any): node is React.ReactElement {
    return React.isValidElement(node);
  }
  
  // Load dynamic icons
  useEffect(() => {
    const iconsToLoad: {[key: string]: string} = {};
    
    // Social icons
    if (typeof final.facebookIcon === 'string') iconsToLoad.facebook = final.facebookIcon;
    if (typeof final.instagramIcon === 'string') iconsToLoad.instagram = final.instagramIcon;
    if (typeof final.twitterIcon === 'string') iconsToLoad.twitter = final.twitterIcon;
    if (typeof final.xIcon === 'string') iconsToLoad.x = final.xIcon;
    if (typeof final.youtubeIcon === 'string') iconsToLoad.youtube = final.youtubeIcon;
    if (typeof final.linkedinIcon === 'string') iconsToLoad.linkedin = final.linkedinIcon;
    if (typeof final.githubIcon === 'string') iconsToLoad.github = final.githubIcon;
    
    // Contact icons
    if (typeof final.emailIcon === 'string') iconsToLoad.email = final.emailIcon;
    if (typeof final.phoneIcon === 'string') iconsToLoad.phone = final.phoneIcon;
    if (typeof final.addressIcon === 'string') iconsToLoad.address = final.addressIcon;
    
    // Social media object
    if (final.socialMedia) {
      Object.entries(final.socialMedia).forEach(([key, value]) => {
        if (typeof value === 'string') {
          iconsToLoad[`socialMedia_${key}`] = value;
        }
      });
    }
    
    // Load all dynamic icons
    const loadIcons = async () => {
      const loaded: {[key: string]: React.ReactNode} = {};
      
      for (const [key, iconString] of Object.entries(iconsToLoad)) {
        const icon = await getDynamicIcon(iconString);
        if (icon) {
          loaded[key] = icon;
        }
      }
      
      setLoadedIcons(loaded);
    };
    
    if (Object.keys(iconsToLoad).length > 0) {
      loadIcons();
    }
  }, [final.facebookIcon, final.instagramIcon, final.twitterIcon, final.xIcon, final.youtubeIcon, final.linkedinIcon, final.githubIcon, final.emailIcon, final.phoneIcon, final.addressIcon, final.socialMedia]);
  
  // Get icon - either from prop (ReactNode), dynamic loaded icon, or default
  const getIcon = (
    iconProp: React.ReactNode | string | undefined,
    iconKey: string,
    defaultIcon: React.ReactNode
  ): React.ReactNode => {
    if (isReactElement(iconProp)) {
      return iconProp;
    }
    if (typeof iconProp === 'string' && loadedIcons[iconKey]) {
      return loadedIcons[iconKey];
    }
    return defaultIcon;
  };
  
  // Build social links array
  const socialLinks = React.useMemo(() => {
    const links: Array<{url: string; icon: React.ReactNode; label: string}> = [];
    
    if (final.facebookUrl) {
      links.push({
        url: final.facebookUrl,
        icon: getIcon(final.facebookIcon, 'facebook', <PiFacebookLogo />),
        label: 'Facebook'
      });
    }
    
    if (final.instagramUrl) {
      links.push({
        url: final.instagramUrl,
        icon: getIcon(final.instagramIcon, 'instagram', <PiInstagramLogo />),
        label: 'Instagram'
      });
    }
    
    if (final.twitterUrl) {
      links.push({
        url: final.twitterUrl,
        icon: getIcon(final.twitterIcon, 'twitter', <PiTwitterLogo />),
        label: 'Twitter'
      });
    }
    
    if (final.xUrl) {
      links.push({
        url: final.xUrl,
        icon: getIcon(final.xIcon, 'x', <PiTwitterLogo />),
        label: 'X'
      });
    }
    
    if (final.youtubeUrl) {
      links.push({
        url: final.youtubeUrl,
        icon: getIcon(final.youtubeIcon, 'youtube', <PiYoutubeLogo />),
        label: 'YouTube'
      });
    }
    
    if (final.linkedinUrl) {
      links.push({
        url: final.linkedinUrl,
        icon: getIcon(final.linkedinIcon, 'linkedin', <PiLinkedinLogo />),
        label: 'LinkedIn'
      });
    }
    
    if (final.githubUrl) {
      links.push({
        url: final.githubUrl,
        icon: getIcon(final.githubIcon, 'github', <PiGithubLogo />),
        label: 'GitHub'
      });
    }
    
    // Add socialMedia object links
    if (final.socialMedia) {
      Object.entries(final.socialMedia).forEach(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('http')) {
          const iconKey = `socialMedia_${key}`;
          const icon = loadedIcons[iconKey] || <PiGithubLogo />;
          links.push({
            url: value,
            icon,
            label: key.charAt(0).toUpperCase() + key.slice(1)
          });
        }
      });
    }
    
    return links;
  }, [
    final.facebookUrl, final.instagramUrl, final.twitterUrl, final.xUrl, final.youtubeUrl, final.linkedinUrl, final.githubUrl,
    final.facebookIcon, final.instagramIcon, final.twitterIcon, final.xIcon, final.youtubeIcon, final.linkedinIcon, final.githubIcon,
    final.socialMedia, loadedIcons
  ]);
  
  const legalLinks = [
    ...(final.privacyUrl ? [{ url: final.privacyUrl, text: final.privacyText }] : []),
    ...(final.termsUrl ? [{ url: final.termsUrl, text: final.termsText }] : []),
    ...(final.cookiesUrl ? [{ url: final.cookiesUrl, text: final.cookiesText }] : []),
  ];
  
  const getCopyrightText = () => {
    if (final.copyrightText) return final.copyrightText;
    
    let text = '';
    if (final.showYear) text += `© ${currentYear} `;
    text += final.companyName || 'Company';
    if (final.showRightsReserved) text += '. All rights reserved.';
    
    return text;
  };
  
  // Get layout classes
  const getLayoutClasses = () => {
    const classes = ['funui-footer'];
    
    if (final.layout) classes.push(`funui-footer--${final.layout}`);
    if (final.funcss) classes.push(final.funcss);
    
    return classes.join(' ');
  };

  return (
    <footer 
      className={getLayoutClasses()}
      style={{
        backgroundColor: final.bg,
        color: final.textColor,
        padding: final.padding,
      }}
      data-testid="footer"
    >
      <div 
        className={`funui-footer__container ${final.containerClass || ''}`}
        style={{
          maxWidth: final.maxWidth,
          '--link-hover-color': final.linkHoverColor,
        } as React.CSSProperties}
      >
        {/* Top Section */}
        <div 
          className={`funui-footer__top ${final.topSectionClass || ''}`}
          data-testid="footer-top"
        >
          {/* Brand Section */}
          <div className="funui-footer__brand">
            {(final.logo || final.logoUrl) && (
              <a 
                href={final.logoLinkUrl || '/'}
                className={`funui-footer__logo-link ${final.logoClass || ''}`}
                aria-label={final.companyName || 'Home'}
              >
                {final.logo ? (
                  <div className="funui-footer__logo-custom">{final.logo}</div>
                ) : final.logoUrl ? (
                  <img 
                    src={final.logoUrl} 
                    width={final.logoSize || 100}
                    alt={`${final.companyName || 'Company'} logo`}
                    className="funui-footer__logo-image"
                    loading="lazy"
                  />
                ) : null}
              </a>
            )}
            
            {final.description && (
              <div 
                className={`funui-footer__description ${final.descriptionClass || ''}`}
                data-testid="footer-description"
              >
             <Text 
             variant={final.descriptionVariant || ""}
             text=   {typeof final.description === 'string' ? (
                  <p>{final.description}</p>
                ) : (
                  final.description
                )}
             />
              </div>
            )}
            
            {/* Contact Info */}
            {final.showContactInfo && (final.email || final.phone || final.address) && (
              <div className="funui-footer__contact" data-testid="footer-contact">
                {final.email && (
                  <div className="funui-footer__contact-item">
                    <span className="funui-footer__contact-icon">
                      {getIcon(final.emailIcon, 'email', <PiEnvelope />)}
                    </span>
                    <a 
                      href={`mailto:${final.email}`} 
                      className="funui-footer__contact-link"
                    >
                      {final.email}
                    </a>
                  </div>
                )}
                {final.phone && (
                  <div className="funui-footer__contact-item">
                    <span className="funui-footer__contact-icon">
                      {getIcon(final.phoneIcon, 'phone', <PiPhone />)}
                    </span>
                    <a 
                      href={`tel:${final.phone}`} 
                      className="funui-footer__contact-link"
                    >
                      {final.phone}
                    </a>
                  </div>
                )}
                {final.address && (
                  <div className="funui-footer__contact-item">
                    <span className="funui-footer__contact-icon">
                      {getIcon(final.addressIcon, 'address', <PiMapPin />)}
                    </span>
                    <span className="funui-footer__contact-text">{final.address}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div 
                className={`funui-footer__socials ${final.socialContainerClass || ''}`}
                data-testid="footer-socials"
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="funui-footer__social-link"
                  >
                    <span className="funui-footer__social-icon">
                      {React.isValidElement(social.icon) 
                        ? React.cloneElement(social.icon as React.ReactElement<any>, { 
                            size: final.socialIconSize || 20 
                          })
                        : social.icon}
                    </span>
                    <span className="funui-footer__social-label sr-only">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {/* Link Sections */}
          {sections.length > 0 && sections.map((section, sectionIndex) => (
            <div 
              key={sectionIndex} 
              className="funui-footer__section"
              data-testid={`footer-section-${sectionIndex}`}
            >
              <div 
                className={`funui-footer__section-title ${final.sectionTitleClass || ''}`}
              >
                {section.title}
              </div>
              <ul className="funui-footer__links">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="funui-footer__link-item">
                    <a
                      href={link.url}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className={`funui-footer__link ${final.linkClass || ''}`}
                    >
                      {link.icon && (
                        <span className="funui-footer__link-icon">
                          {link.icon}
                        </span>
                      )}
                      <span className="funui-footer__link-text">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {final.children && (
            <div className="funui-footer__children">
              {final.children}
            </div>
          )}
        </div>
        
        {/* Divider */}
        {final.showDivider && (
          <div 
            className="funui-footer__divider"
            data-testid="footer-divider"
          />
        )}
        
        {/* Bottom Section */}
        <div 
          className={`funui-footer__bottom ${final.bottomSectionClass || ''}`}
          data-testid="footer-bottom"
        >
          <div className="funui-footer__copyright">
            {getCopyrightText()}
          </div>
          
          {legalLinks.length > 0 && (
            <div 
              className={`funui-footer__legal ${final.legalLinksClass || ''}`}
              data-testid="footer-legal"
            >
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="funui-footer__legal-link"
                >
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;