'use client';
import React, { useRef, ReactNode, useState, useEffect } from 'react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import Circle from '../specials/Circle';
import RowFlex from '../specials/RowFlex';
import { isTouchDevice } from '../../utils/Functions';

interface CarouselProps {

scrollNumber?: number;
gap?:number;
funcss?: string;
children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ scrollNumber = 320, gap = 0.5, funcss  = '',  children   }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === 'left' ? -scrollNumber : scrollNumber,
      behavior: 'smooth',
    });
  };
  const [isPhone, setisPhone] = useState(false)
    useEffect(() => {
    if (isTouchDevice()) {
      setisPhone(true)
    } else {
      setisPhone(false)
    }
  }, []);

  return (
    <RowFlex gap={1} wrap="nowrap" alignItems="center">
     {
        !isPhone &&
      <div >
        <Circle  onClick={() => scroll('left')}>
          <PiCaretLeft size={24} />
        </Circle>
      </div>
     }

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className={`carousel-container scrollbar-hide w-full ${funcss}`}
        style={{width:"100%" , gap:gap + "rem"}}
      >
        {React.Children.map(children, (child) => (
          <div className="carousel-item">
            <div className="carousel-card">{child}</div>
          </div>
        ))}
      </div>

    {
        !isPhone &&
           <div>
        <Circle  onClick={() => scroll('right')}>
          <PiCaretRight size={24} />
        </Circle>
      </div>
    }
    </RowFlex>
  );
};

export default Carousel;
