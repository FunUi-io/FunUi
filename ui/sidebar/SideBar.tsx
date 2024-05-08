import { ReactNode, useState, useEffect } from 'react';
import * as React from 'react'
import RowFlex from '../specials/RowFlex';


interface FunLoaderProps {
  funcss?: string;
  position?: "left" | "right";
  glassy?: boolean;
  open?:boolean
  header?: ReactNode ,
  content?: ReactNode ,
  close?: ReactNode ,
  footer?: ReactNode ,
  fixed?:boolean
}

export default function SideBar({
  funcss,
  position ,
  glassy ,
  header ,
  open ,
  content ,
  close,
  footer ,
  fixed,
  ...rest
}: FunLoaderProps) {


  
  if(open){
    return (
        <aside className={`fun_side_bar_wrapper ${fixed ? "fixed_sidebar" : ""} ${glassy ? "glassy" : ""}`} {...rest}>
            <div className={`
            fun_sidebar_content ${funcss || ""} ${position || ""} 
            `} 
           >
              <RowFlex justify='space-between'>
             {
                    header && 
                    <div className="col fit"> {header} </div>
                }
              {close && <div className="close_sidebar">{close} </div>}

              </RowFlex>
                {
                    content && 
                    <div>{content}</div>
                }
                {
                    footer && 
                    <div>{footer}</div>
                }
              </div>
        </aside>
      );
  }else{
    return <></>
  }
}
