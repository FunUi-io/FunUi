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
  visibleLinks?:boolean,
  sidebarTrigger?:React.ReactNode ,
  transparent?:Boolean
  sideBar?:number
  width?:string
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
  sideBar,
  width ,
  visibleLinks ,
  sidebarTrigger ,
  transparent
}: NavbarProps) {
  return (
    <div>
      <nav
        className={`
          navigation-bar ${funcss ? funcss : ''}
          ${fixedTop ? 'fixed_top_navbar' : ''}
          ${sideBar ? 'there_is_sidebar' : ''}
          ${transparent ? 'transparent' : ''}
          ${fixedBottom ? 'fixedBottom' : ''}
        `}
        style={{ padding: `${padding ? padding : ''}`, justifyContent: `${justify ? justify : ''}`}}
      >
        <div>
            {left}
        </div>
        <div  className={` linkWrapper ${visibleLinks ? "visibleLinks" : ""}`}>
            {center}
        </div>
        <div  className={`linkWrapper ${visibleLinks ? "visibleLinks" : ""}`}>
        {right} 
        </div>
        {sidebarTrigger ? <span className='sidebar-trigger'>{sidebarTrigger}</span> : ''}
      </nav>
    </div>
  );
}
