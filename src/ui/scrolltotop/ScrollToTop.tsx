'use client';
import React, { useEffect, useState } from 'react';
import { FaCaretUp } from 'react-icons/fa';
import View from '../view/View';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling down 200px
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <View
      onClick={scrollToTop}
      funcss='round-edge primary pointer'
      height='40px'
      width='40px'
      display='flex'
      justifyContent='center'
      alignItems='center'
      position='fixed'
      bottom='20px'
      right='20px'
      zIndex={200}
    >
      <FaCaretUp size={24} />
    </View>
  );
};

export default ScrollToTop;
