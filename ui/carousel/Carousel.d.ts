import React, { ReactNode } from 'react';
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
}
declare const Carousel: React.FC<CarouselProps>;
export default Carousel;
