import * as React from 'react';

interface NavbarProps {
  fixedTop?: boolean;
  funcss?: string;
  padding?: string;
  fixedBottom?: boolean;
  justify?: string;
  children?: React.ReactNode;
  left?:React.ReactNode
  center?:React.ReactNode
  right?:React.ReactNode 
  visibleLinks:boolean,
  sidebarTrigger:React.ReactNode
}

export default function AppBar({
  fixedTop,
  funcss,
  padding,
  fixedBottom,
  justify,
  children,
  left ,
  center,
  right ,
  visibleLinks ,
  sidebarTrigger
}: NavbarProps) {
  return (
    <div>
      <nav
        className={`
          navigation-bar ${funcss ? funcss : ''}
          ${fixedTop ? 'fixedTop' : ''}
          ${fixedBottom ? 'fixedBottom' : ''}
        `}
        style={{ padding: `${padding ? padding : ''}`, justifyContent: `${justify ? justify : ''}` }}
      >
        <div>
            {left}
        </div>
        <div  className={`${funcss} linkWrapper ${visibleLinks ? "visibleLinks" : ""}`}>
            {center}
        </div>
        <div  className={`${funcss} linkWrapper ${visibleLinks ? "visibleLinks" : ""}`}>
        {right} 
        </div>
        {sidebarTrigger ? <span className='sidebar-trigger'>{sidebarTrigger}</span> : ''}
      </nav>
    </div>
  );
}
