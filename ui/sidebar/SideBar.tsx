import { ReactNode, useState, useEffect } from 'react';
import * as React from 'react'


interface FunLoaderProps {
  funcss?: string;
  position?: "left" | "right";
  glassy?: boolean;
  open?:boolean
  header?: ReactNode ,
  content?: ReactNode ,
  footer?: ReactNode ,
  width?:number , 
  fixed?:boolean
}

export default function SideBar({
  funcss,
  position ,
  glassy ,
  header ,
  open ,
  content ,
  footer ,
  width, 
  fixed,
  ...rest
}: FunLoaderProps) {


  
  if(open){
    return (
        <nav className={`fun_side_bar_wrapper ${fixed ? "fixed_sidebar" : ""} ${glassy ? "glassy" : ""}`} {...rest}>
            <div className={`
            fun_sidebar_content ${funcss || ""} ${position || ""} 
            `} 
            style={{
                width: width ? width + "px" : "200px"
            }}>
             <aside>
             {
                    header && 
                    <div> {header} </div>
                }
                {
                    content && 
                    <div>{content}</div>
                }
                {
                    footer && 
                    <div>{footer}</div>
                }
             </aside>
            </div>
        </nav>
      );
  }else{
    return <></>
  }
}
