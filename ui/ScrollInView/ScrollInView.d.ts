import React, { ReactNode } from 'react';
declare const animationVariants: {
    'fade-up': {
        hidden: {
            opacity: number;
            y: number;
        };
        visible: {
            opacity: number;
            y: number;
        };
    };
    'fade-down': {
        hidden: {
            opacity: number;
            y: number;
        };
        visible: {
            opacity: number;
            y: number;
        };
    };
    'fade-in': {
        hidden: {
            opacity: number;
        };
        visible: {
            opacity: number;
        };
    };
    'zoom-in': {
        hidden: {
            scale: number;
            opacity: number;
        };
        visible: {
            scale: number;
            opacity: number;
        };
    };
    'slide-left': {
        hidden: {
            x: number;
            opacity: number;
        };
        visible: {
            x: number;
            opacity: number;
        };
    };
    'slide-right': {
        hidden: {
            x: number;
            opacity: number;
        };
        visible: {
            x: number;
            opacity: number;
        };
    };
};
interface ScrollInViewProps {
    children: ReactNode;
    animationType?: keyof typeof animationVariants;
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
    className?: string;
}
declare const ScrollInView: React.FC<ScrollInViewProps>;
export default ScrollInView;
