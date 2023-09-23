import  { ReactNode, HTMLProps, MouseEvent, ChangeEvent } from 'react';
import * as React from 'react';
import { colors } from '../../assets/colors/colors';
import { PiInfo , PiCheck , PiWarning , PiX , PiSpinner } from "react-icons/pi";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
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
  fillDirection?:string;
  fillTextColor?:string;
  buttonFillStyle?:React.CSSProperties ,
  outlineSize?:number ,
  disabled?:boolean ,
  isLoading?:boolean ,
  status?: 'success' | 'warning' | 'info' | 'danger' 
  children?:React.ReactNode
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
  disabled,
  isLoading,
  status,
  children,
  ...rest
}: ButtonProps) {
  const classNames = [
    'button',
    `text-${color}`,
    funcss || '',
    rounded ? 'roundBtn' : '',
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
    outlined ? `outlined text-${color ? color : bg}` : bg || '',
    `${fillAnimation ? `${fillTextColor ? `hover-text-${fillTextColor}`: ''} button-fill fill-${fillDirection ? fillDirection : 'left'}` : '' }`
  ].join(' ');



  return (
  <span {...rest}>
        <button
        disabled={disabled ? disabled : false}
      className={`${classNames} ${startIcon || endIcon ? 'iconic' : ''}`}
      style={{
        height: height || '',
        width: fullWidth ? '100%' : width || '',
        borderRadius: flat ? '0rem' : '',
        border:`${outlined ? `${outlineSize ? `${outlineSize}rem solid ${colors[`${bg}`]}` : `0.12rem solid ${colors[bg]}`}` :'' } `
      }}  
    >
        {
          isLoading &&
          <span  className='rotate'>
                    <PiSpinner/>
          </span>
        }
       
          {status === "success" && <PiCheck />}
    {status === "info" && <PiInfo />}
    {status === "warning" && <PiWarning />}
    {status === "danger" && <PiX />}

      {fillAnimation ? <span className={`button_fill_span ${bg}`} ></span> : ''}
      {startIcon && <span>{startIcon}</span>}
      {text ? text : children}
      {endIcon && <span>{endIcon}</span>}

    </button>
  </span>
  )
}
