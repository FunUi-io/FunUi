import { ReactNode } from 'react';
import * as React from 'react'
import { TfiCheck, TfiInfoAlt } from "react-icons/tfi";
import { PiInfo , PiCheckCircleDuotone , PiWarning , PiX , PiSpinner } from "react-icons/pi";
interface AlertProps {
  message?: string;
  funcss?: string;
  type?: 'success' | 'info' | 'warning' | 'danger';
  outlined?: boolean;
  fixed?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-middle' | 'bottom-middle' | 'middle';
  fullWidth?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  animation?:string ;
  duration?:string
  raised?:boolean  ,
  card?:boolean,
  variant?:string, 
  flat?:boolean,
  style?:React.CSSProperties
}

export default function Alert({
  message,
  funcss,
  type,
  outlined,
  fixed,
  raised,
  fullWidth,
  isLoading,
  children, 
  animation,
  duration ,
  variant,
  flat,
  card,
  style,
  ...rest
}: AlertProps) {
  return (
    <div className={
      `${fixed ? 'alert-container ' : ''}
       ${fixed === "top-left" ? "top-left" : ""}
      ${fixed === "top-right" ? "top-right" : ""}
      ${fixed === "bottom-left" ? "bottom-left" : ""}
      ${fixed === "bottom-right" ? "bottom-right" : ""}
      ${fixed === "middle" ? "middle-alert" : ""}
      ${fixed === "top-middle" ? "top-middle" : ""}
      ${fixed === "bottom-middle" ? "bottom-middle" : ""}`
    }>
      {outlined ? (
        <div
          style={{
            animation: `${duration ? duration : "0.3"}s ${animation ? animation : "ScaleUp"}`,
            ...style
          }}
          className={`alert ${card ? "card" : ""} ${flat ? "flat" : ""} ${raised ? 'raised' : ''} ${type}-outline

 ${fullWidth ? "width-100-p" : ""}
 `}
 {...rest}
        >
          <div className="alert-icon">
            {!isLoading ? (
              <div className={`text-${type}`}>
                {type === "success" && <PiCheckCircleDuotone />}
                {type === "info" && <PiInfo />}
                {type === "warning" && <PiWarning />}
                {type === "danger" && <PiX />}
              </div>
            ) : (
             <span className='rotate'> <PiSpinner /> </span> 
            )}
          </div>
          <div className="alert-text">
            {message ? message : children ? children : ""}
          </div>
        </div>
      ) : (
        ""
      )}

      {!outlined ? (
        <div
          style={{
            animation: `${duration ? duration : "0.3"}s ${animation ? animation : "ScaleUp"}`,
            ...style
          }}
          className={`alert ${card ? "card" : ""} ${flat ? "flat" : ""} ${raised ? 'raised' : ''}  ${variant ? variant : type} ${funcss || ""}
 ${fullWidth ? "width-100-p" : ""}
`}
        >
          <div className="alert-icon">
            {!isLoading ? (
              <div className={`text-${type}`}>
                  {type === "success" && <PiCheckCircleDuotone />}
                {type === "info" && <PiInfo />}
                {type === "warning" && <PiWarning />}
                {type === "danger" && <PiX />}
              </div>
            ) : (
             <span className='rotate'> <PiSpinner /> </span> 
            )}
          </div>
          <div className="alert-text">
            {message ? message : children ? children : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
