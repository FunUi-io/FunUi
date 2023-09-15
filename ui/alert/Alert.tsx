import { ReactNode } from 'react';
import * as React from 'react'
import { TfiCheck, TfiInfoAlt } from "react-icons/tfi";
import { PiInfo , PiCheck , PiWarning , PiX , PiSpinner } from "react-icons/pi";
interface AlertProps {
  message?: string;
  funcss?: string;
  type?: 'success' | 'info' | 'warning' | 'danger';
  outlined?: boolean;
  fixed?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-middle' | 'bottom-middle' | 'middle';
  fullWidth?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  raised?:boolean
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
            animation: `${0.3}s ${"ScaleUp"}`,
          }}
          className={`alert ${raised ? 'raised' : ''} ${type}-outline

 ${fullWidth ? "width-100-p" : ""}
 `}
        >
          <div className="alert-icon">
            {!isLoading ? (
              <div>
                {type === "success" && <PiCheck />}
                {type === "info" && <PiInfo />}
                {type === "warning" && <PiWarning />}
                {type === "danger" && <PiX />}
              </div>
            ) : (
              <PiSpinner className='rotate'/>
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
            animation: `${0.3}s ${"ScaleUp"}`,
          }}
          className={`alert ${raised ? 'raised' : ''} ${funcss || ""} ${type}
 ${fullWidth ? "width-100-p" : ""}
`}
        >
          <div className="alert-icon">
            {!isLoading ? (
              <div>
                  {type === "success" && <PiCheck />}
                {type === "info" && <PiInfo />}
                {type === "warning" && <PiWarning />}
                {type === "danger" && <PiX />}
              </div>
            ) : (
              <PiSpinner className='rotate'/>
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
