import * as React from 'react';
interface ListItemProps {
  children?: React.ReactNode;
  funcss?: string; 
  animation?: string
  anchorPlacement? : string
}


export default function Animation({
  children,
  funcss,
  animation , 
  anchorPlacement,
  ...rest
}: ListItemProps) {

    return (
        <div  data-aos-anchor-placement={anchorPlacement || ""} className={`list ${funcss ? funcss : ''}`} {...rest} data-aos={animation ? animation : "fade-up"}>
        {children}
 </div>
    )

}
