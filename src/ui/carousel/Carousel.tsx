'use client';
import React, { useRef, ReactNode, useState, useEffect } from 'react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import Circle from '../specials/Circle';
import RowFlex from '../specials/RowFlex';
import { isTouchDevice } from '../../utils/Functions';

interface CarouselProps {
  scrollNumber?: number;
  gap?: number;
  funcss?: string;
  children: ReactNode;
  showDashes?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  scrollNumber = 320,
  gap = 0.5,
  funcss = '',
  showDashes = true,
  children,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState<'start' | 'middle' | 'end'>('start');
  const [isPhone, setIsPhone] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);


  const checkScrollable = () => {
    const container = scrollRef.current;
    if (container) {
      setIsScrollable(container.scrollWidth > container.clientWidth);
    }
  };
  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable); // Also listen to window resize
    return () => window.removeEventListener('resize', checkScrollable);
  }, [children]);
  

  useEffect(() => {
    if (isTouchDevice()) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  }, []);

  // Track scroll position
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = scrollWidth - clientWidth;

    if (scrollLeft === 0) {
      setScrollPosition('start');
    } else if (scrollLeft >= maxScrollLeft - 10) {
      setScrollPosition('end');
    } else {
      setScrollPosition('middle');
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === 'left' ? -scrollNumber : scrollNumber,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className={`carousel-wrapper ${funcss}`}>
      <RowFlex gap={1} wrap="nowrap" alignItems="center">
        {!isPhone && isScrollable && (
          <div>
            <Circle onClick={() => scroll('left')}>
              <PiCaretLeft size={24} />
            </Circle>
          </div>
        )}

        <div
          ref={scrollRef}
          className={`carousel-container scrollbar-hide w-full`}
          style={{
            width: '100%',
            gap: gap + 'rem',
            overflowX: 'auto',
            display: 'flex',
            justifyItems: (isScrollable || isPhone) ? 'flex-start' : 'center',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
          }}
        >
          {React.Children.map(children, (child) => (
            <div className="carousel-item" style={{ flexShrink: 0 }}>
              <div className="carousel-card">{child}</div>
            </div>
          ))}
        </div>

        {!isPhone && isScrollable && (
          <div>
            <Circle onClick={() => scroll('right')}>
              <PiCaretRight size={24} />
            </Circle>
          </div>
        )}
      </RowFlex>

      {/* Dashes below the carousel */}
      {
        (showDashes && isScrollable) && (
          <div className="center padding-top-10">
          <RowFlex gap={0.5} justify="center">
            {['start', 'middle', 'end'].map((pos) => (
              <div
              className={'pointer '}
                key={pos}
                onClick={() => {
                  if(pos === 'start') {
                   scroll('left')
                  } else if(pos === 'middle') {
                    scrollRef.current?.scrollTo({
                      left: scrollRef.current?.scrollWidth / 2,
                      behavior: 'smooth',
                    });
                  } else if(pos === 'end') {
                    scroll('right')
                  }
                }}
                style={{
                  width: '10px',
                  height: '10px',
                  background: scrollPosition === pos ? 'var(--primary)' : 'var(--borderColor)',
                  borderRadius: '50%',
                  transform: scrollPosition === pos ? 'scale(1.3)' : 'scale(0.9)',
                  transition: 'transform 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </RowFlex>
        </div> 
        )
      }
    </div>
  );
};

export default Carousel;
