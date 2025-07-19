'use client';

import React, { ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const animationVariants = {
  'fade-up': { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  'fade-down': { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  'fade-in': { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  'zoom-in': { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
  'slide-left': { hidden: { x: 20, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  'slide-right': { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } },
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

const ScrollInView: React.FC<ScrollInViewProps> = ({
  children,
  animationType = 'fade-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  once = false,
  className = '',
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [inView, once, controls]);

  const variants = animationVariants[animationType] || animationVariants['fade-up'];

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{
        delay,
        duration,
        ease: 'linear', // SMOOTH and STRAIGHT
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollInView;
