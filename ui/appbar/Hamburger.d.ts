import React from 'react';
interface HamburgerProps {
    isOpen?: boolean;
    toggle?: () => void;
}
declare const Hamburger: React.FC<HamburgerProps>;
export default Hamburger;
