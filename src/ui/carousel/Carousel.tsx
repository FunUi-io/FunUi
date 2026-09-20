'use client';
import React, { useRef, ReactNode, useState, useEffect } from 'react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollNumber?: number;
  gap?: number;
  funcss?: string;
  children: ReactNode;
  showDashes?: boolean;
  allowVerticalOverflow?: boolean;
  itemPadding?: string;
  controlerSize?: number;
  controlerIconSize?: number;
  infiniteScroll?: boolean;
  infiniteScrollSpeed?: number;
  infiniteScrollDirection?: 'left' | 'right' | 'alternate';
  overflowCss?: string;
  overflowPadding?: string;
  justify?: string;
}

// Helper function to detect touch devices
const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0));
};

// Simple Circle component
const Circle: React.FC<{ bordered?: boolean; size?: number; onClick?: () => void; children: ReactNode }> = ({ 
  bordered, 
  size = 2.5, 
  onClick, 
  children 
}) => (
  <div
    onClick={onClick}
    style={{
      width: `${size}rem`,
      height: `${size}rem`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: bordered ? '1px solid var(--borderColor, #ccc)' : 'none',
      cursor: 'pointer',
      background: 'var(--background, white)',
      transition: 'all 0.2s ease'
    }}
  >
    {children}
  </div>
);

// Simple RowFlex component
const RowFlex: React.FC<{ gap?: number; justify?: string; children: ReactNode }> = ({ 
  gap = 0.5, 
  justify = 'flex-start', 
  children 
}) => (
  <div style={{
    display: 'flex',
    gap: `${gap}rem`,
    justifyContent: justify
  }}>
    {children}
  </div>
);

const Carousel: React.FC<CarouselProps> = ({
  scrollNumber = 320,
  gap = 0.5,
  funcss = '',
  showDashes = true,
  allowVerticalOverflow = false,
  itemPadding = '',
  justify = '',
  children,
  controlerSize = 2.5,
  controlerIconSize = 20,
  infiniteScroll = false,
  infiniteScrollSpeed = 50,
  infiniteScrollDirection = 'left',
  overflowPadding = '',
  overflowCss = '',
  ...rest
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState<'start' | 'middle' | 'end'>('start');
  const [isPhone, setIsPhone] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [autoScrollDirection, setAutoScrollDirection] = useState<'left' | 'right'>(
    infiniteScrollDirection === 'right' ? 'right' : 'left'
  );
  const [isPaused, setIsPaused] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);
  const startDelayRef = useRef<boolean>(false);

  const checkScrollable = () => {
    const container = scrollRef.current;
    if (container) {
      setIsScrollable(container.scrollWidth > container.clientWidth);
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [children]);

  // Delay start for smooth initialization
  useEffect(() => {
    if (infiniteScroll && isScrollable) {
      // Wait for layout to settle and then start
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsReady(false);
    }
  }, [infiniteScroll, isScrollable]);

  useEffect(() => {
    setIsPhone(isTouchDevice());
  }, []);

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

  // Smooth auto-scroll animation using requestAnimationFrame
  const smoothAutoScroll = (timestamp: number) => {
    if (!infiniteScroll || !scrollRef.current || isPaused || !isScrollable || !isReady) {
      animationFrameRef.current = null;
      lastTimestampRef.current = 0;
      return;
    }

    const container = scrollRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = scrollWidth - clientWidth;

    // Initialize timestamp on first frame
    if (lastTimestampRef.current === 0) {
      lastTimestampRef.current = timestamp;
      animationFrameRef.current = requestAnimationFrame(smoothAutoScroll);
      return;
    }

    // Calculate time delta for smooth animation
    const deltaTime = timestamp - lastTimestampRef.current;
    lastTimestampRef.current = timestamp;

    // Calculate scroll amount based on speed and time (pixels per second)
    // Cap deltaTime to prevent large jumps after tab switches
    const cappedDeltaTime = Math.min(deltaTime, 100);
    const scrollAmount = (infiniteScrollSpeed * cappedDeltaTime) / 1000;

    let newDirection = autoScrollDirection;

    // Handle alternate direction
    if (infiniteScrollDirection === 'alternate') {
      if (scrollLeft <= 0) {
        newDirection = 'right';
        setAutoScrollDirection('right');
      } else if (scrollLeft >= maxScrollLeft - 1) {
        newDirection = 'left';
        setAutoScrollDirection('left');
      }
    }

    // Perform the scroll
    if (newDirection === 'left') {
      container.scrollLeft -= scrollAmount;
      // Loop back for infinite scroll (non-alternate)
      if (scrollLeft <= 0 && infiniteScrollDirection !== 'alternate') {
        container.scrollLeft = maxScrollLeft;
      }
    } else {
      container.scrollLeft += scrollAmount;
      // Loop back for infinite scroll (non-alternate)
      if (scrollLeft >= maxScrollLeft - 1 && infiniteScrollDirection !== 'alternate') {
        container.scrollLeft = 0;
      }
    }

    animationFrameRef.current = requestAnimationFrame(smoothAutoScroll);
  };

  // Start/stop auto-scroll based on pause state
  useEffect(() => {
    if (infiniteScroll && !isPaused && isScrollable && isReady) {
      lastTimestampRef.current = 0;
      animationFrameRef.current = requestAnimationFrame(smoothAutoScroll);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastTimestampRef.current = 0;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [infiniteScroll, infiniteScrollSpeed, infiniteScrollDirection, isPaused, isScrollable, autoScrollDirection, isReady]);

  useEffect(() => {
    setAutoScrollDirection(infiniteScrollDirection === 'right' ? 'right' : 'left');
  }, [infiniteScrollDirection]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const cloneChildren = () => {
    const childrenArray = React.Children.toArray(children);
    if (childrenArray.length === 0) return children;
    
    const container = scrollRef.current;
    const clonesNeeded = container ? Math.ceil(container.clientWidth * 3 / (scrollNumber || 320)) : 3;
    
    const clonedItems = [];
    for (let i = 0; i < clonesNeeded; i++) {
      clonedItems.push(...childrenArray);
    }
    
    return (
      <>
        {clonedItems.map((child, index) => (
          <div 
            key={index} 
            className="carousel-item" 
            style={{ flexShrink: 0 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="carousel-card">{child}</div>
          </div>
        ))}
      </>
    );
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  return (
    <div 
      ref={containerRef}
      className={`carousel-wrapper`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{padding:   (isScrollable && overflowPadding) ? overflowPadding : itemPadding}}
      {...rest}
    >
      <>
        {!isPhone && isScrollable && !infiniteScroll && (
          <div className='carouselLeft'>
            <Circle bordered size={controlerSize} onClick={() => scroll('left')}>
              <PiCaretLeft className='text-primary' size={controlerIconSize} />
            </Circle>
          </div>
        )}

        <div
          ref={scrollRef}
          className={`carousel-container scrollbar-hide w-full ${funcss} ${isScrollable ? overflowCss : ''}`}
          style={{
            width: '100%',
            gap: gap + 'rem',
            overflowX: 'auto',
            overflowY: 'visible',
            display: 'flex',
            justifyContent: justify ? justify : (isScrollable || isPhone) ? 'flex-start' : 'center',
            scrollSnapType: infiniteScroll ? 'none' : 'x mandatory',
            scrollBehavior: 'smooth',
            cursor: infiniteScroll ? 'grab' : 'default'
          }}
          onScroll={handleScroll}
        >
          {infiniteScroll ? cloneChildren() : (
            React.Children.map(children, (child, index) => (
              <div 
                className="carousel-item" 
                style={{ flexShrink: 0 }}
                onMouseEnter={() => !infiniteScroll && setIsPaused(true)}
                onMouseLeave={() => !infiniteScroll && setIsPaused(false)}
              >
                <div className="carousel-card">{child}</div>
              </div>
            ))
          )}
        </div>

        {!isPhone && isScrollable && !infiniteScroll && (
          <div className='carouselRight'>
            <Circle bordered size={controlerSize} onClick={() => scroll('right')}>
              <PiCaretRight className='text-primary' size={controlerIconSize} />
            </Circle>
          </div>
        )}
      </>

      {(showDashes && isScrollable && !infiniteScroll) && (
        <div className="center padding-top-10">
          <RowFlex gap={0.5} justify="center">
            {['start', 'middle', 'end'].map((pos) => (
              <div
                className={'pointer'}
                key={pos}
                onClick={() => {
                  if (pos === 'start') {
                    scroll('left');
                  } else if (pos === 'middle') {
                    scrollRef.current?.scrollTo({
                      left: scrollRef.current?.scrollWidth / 2,
                      behavior: 'smooth',
                    });
                  } else if (pos === 'end') {
                    scroll('right');
                  }
                }}
                style={{
                  width: '10px',
                  height: '10px',
                  background: scrollPosition === pos ? 'var(--primary, #007bff)' : 'var(--borderColor, #ccc)',
                  borderRadius: '50%',
                  transform: scrollPosition === pos ? 'scale(1.3)' : 'scale(0.9)',
                  transition: 'transform 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </RowFlex>
        </div>
      )}


    </div>
  );
};

export default Carousel;