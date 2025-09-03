'use client';
import React, { useState } from 'react';

interface HamburgerProps {
  isOpen?: boolean;
  toggle?: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isOpen: controlledOpen, toggle }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleClick = () => {
    if (toggle) {
      toggle();
    } else {
      setInternalOpen(!isOpen);
    }
  };

  return (
    <div className={`navhamburger ${isOpen ? 'navopen' : ''}`} onClick={handleClick}>
      <span className="navline navtop"></span>
      <span className="navline navmiddle"></span>
      <span className="navline navbottom"></span>
    </div>
  );
};

export default Hamburger;
