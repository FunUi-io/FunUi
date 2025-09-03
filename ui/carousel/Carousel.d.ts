import React, { ReactNode } from 'react';
interface CarouselProps {
    scrollNumber?: number;
    gap?: number;
    funcss?: string;
    children: ReactNode;
    showDashes?: boolean;
}
declare const Carousel: React.FC<CarouselProps>;
export default Carousel;
