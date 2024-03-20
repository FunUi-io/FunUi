import { ReactNode, HTMLProps } from 'react';
import * as React from 'react'


interface FunLoaderProps {
  funcss?: string;
  position?: "left" | "right";
  glassy?: boolean;
  open?:boolean
  header?: ReactNode ,
  content?: ReactNode ,
  footer?: ReactNode ,
  width?:number
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
  ...rest
}: FunLoaderProps) {
  if(open){
    return (
        <div className={`fun_side_bar ${glassy ? "glassy" : ""}`} {...rest}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque id nam perferendis officiis laboriosam, ullam dolorum odio sint a ratione nulla, voluptatibus quod voluptates error odit ea tempore, assumenda iusto.
            <div className="fun_sidebar_content" style={{
                width: width + "px" || "250px"
            }}>
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
            </div>
        </div>
      );
  }else{
    return <></>
  }
}
