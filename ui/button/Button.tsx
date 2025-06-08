
import  { ReactNode, HTMLProps, MouseEvent, ChangeEvent } from 'react';
import * as React from 'react';
import { PiInfo , PiCheck , PiWarning , PiX , PiSpinner } from "react-icons/pi";


interface ButtonProps {
  color?: string;
  bg?: string;
  funcss?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  text?: string;
  rounded?: boolean;
  raised?: boolean;
  height?: string;
  width?: string;
  float?: boolean;
  hoverUp?: boolean;
  fullWidth?: boolean;
  outlined?: boolean;
  small?: boolean;
  smaller?: boolean;
  big?: boolean;
  bigger?: boolean;
  jumbo?: boolean;
  flat?: boolean;
  hoverNone?: boolean;
  fillAnimation?:boolean;
  bold?:boolean;
  hoverless?:boolean;
  fillDirection?:string;
  fillTextColor?:string;
  buttonFillStyle?:React.CSSProperties ,
  outlineSize?:number ,
  isLoading?:boolean ,
  status?: 'success' | 'warning' | 'info' | 'danger' 
  children?:React.ReactNode, 
  style?:React.CSSProperties ,
  onClick?: () => void
}

export default function Button({
  color,
  bg,
  funcss,
  startIcon,
  endIcon,
  text,
  rounded,
  raised,
  height,
  width,
  float,
  hoverUp,
  fullWidth,
  outlined,
  small,
  hoverless,
  smaller,
  big,
  bigger,
  jumbo,
  flat,
  hoverNone,
  fillAnimation ,
  fillDirection,
  fillTextColor,
  outlineSize,
  isLoading,
  status,
  children,
  bold ,
  style,
  onClick,
  ...rest
}: ButtonProps) {
  function removeNumbers(text:string) {
  return text.replace(/[0-9]/g, '');
}
function hasNumberAbove(text:string) {
  const matches = text.match(/\d+/g); // find all numbers in the string
  if (!matches) return false;

  return matches.some(num => parseInt(num) >= 400);
}

function hasNumber(text:string) {
  return /\d/.test(text);
}


  const classNames = [
    'button',
    `text-${color ? color : !hasNumber(bg) && !outlined ? "white" : hasNumberAbove(bg) && !outlined ? "white" : removeNumbers(bg) }`,
    funcss || '',
    rounded ? 'roundBtn' : '',
    hoverless ? 'hoverless' : '',
    bold ? 'text-bold' : '',
    float ? 'floatBtn' : '',
    raised ? 'raisedBtn' : '',
    hoverUp ? 'hover-up' : '',
    flat ? 'flat' : '',
    hoverNone ? 'hoverNone' : '',
    small ? 'smallBtn' :
     smaller ? 'smallerBtn' : '',
    big ? 'bigBtn' : '',
    bigger ? 'biggerBtn' : '',
    jumbo ? 'jumboBtn' : '',
    outlined ? `outlined outline-${bg || ''	} text-${color ? color : removeNumbers(bg)}` : bg || '',
    `${fillAnimation ? `${fillTextColor ? `hover-text-${fillTextColor}`: ''} button-fill fill-${fillDirection ? fillDirection : 'left'}` : '' }`
  ].join(' ');



  return (
  <span >
        <button
      className={`${classNames} ${startIcon || endIcon || status || isLoading ? 'iconic' : ''}`}
      style={{
        height: height || '',
        width: fullWidth ? '100%' : width || '',
        borderRadius: flat ? '0rem' : '',
        ...style
      }}  
      onClick={onClick}
      {...rest}
    >
      
        {
          isLoading &&
          <span  className='rotate btn_left_icon' style={{lineHeight:"0"}}>
                    <PiSpinner/>
          </span>
        }
    {
      status &&
      <span  className=' btn_left_icon' style={{lineHeight:"0"}}>
      {status === "success" && <PiCheck />}
{status === "info" && <PiInfo />}
{status === "warning" && <PiWarning />}
{status === "danger" && <PiX />}
</span>
    }
      {fillAnimation ? <span  className={`button_fill_span ${bg}`} ></span> : ''}
      {startIcon && <span className="btn_left_icon" style={{lineHeight:"0"}}>{startIcon}</span>}
      {text ? text : children}
      {endIcon && <span className="btn_right_icon" style={{lineHeight:"0"}}>{endIcon}</span>}

    </button>
  </span>
  )
}
