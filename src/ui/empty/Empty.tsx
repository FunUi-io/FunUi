'use client'
import * as React from 'react';
import Button from '../button/Button';
import { PiArrowLeft } from 'react-icons/pi';
import Text from '../text/Text';
import Flex from '../flex/Flex';

interface EmptyProps {
  // Header customization
  header?: React.ReactNode | String;
  title?: string | React.ReactNode;
  titleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  
  // Content customization
  content?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Action customization
  action?: React.ReactNode;
  ctaText?: string;
  ctaIcon?: React.ReactNode;
  ctaOnClick?: () => void;
  ctaBg?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  showCta?: boolean;
}

export default function Empty({
  header,
  title = 'No Data Available',
  titleSize = 'xl',
  content,
  description = "There's nothing to display at the moment. Try adjusting your filters or check back later.",
  descriptionSize = 'md',
  action,
  ctaText = 'Go Back',
  ctaIcon = <PiArrowLeft />,
  ctaOnClick,
  ctaBg = 'primary',
  showCta = true,
}: EmptyProps) {
  
  const handleCtaClick = () => {
    if (ctaOnClick) {
      ctaOnClick();
    } else {
      window.history.back();
    }
  };

  return (
    <div>
      <div>
        <div className="central flex p-3">
          <div className="text-center width-600-max">
            <Flex gap={1} direction="column" fit>
              
              {/* Header Section */}
              <div>
                {header ? (
                  header
                ) : (
                  <div>
                    <Text 
                      text={title}
                      size={titleSize}
                      block
                    />
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="article">
                {content ? (
                  content
                ) : (
                  <Text
                    article
                    opacity={4}
                    text={description}
                    size={descriptionSize}
                    block
                  />
                )}
              </div>

              {/* Action Section */}
              {showCta && (
                <div>
                  {action ? (
                    action
                  ) : (
                    <div className="row-flex gap" style={{ justifyContent: 'center', gap: '0.4rem' }}>
                      <Button 
                        startIcon={ctaIcon} 
                        bg={ctaBg} 
                        onClick={handleCtaClick}
                      >
                        {ctaText}
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
}