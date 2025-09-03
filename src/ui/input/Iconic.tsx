import React, { ReactNode } from 'react';

interface IconicInputProps {
  funcss?: string;
  children?: ReactNode;
  input?: ReactNode;
  iconicBg?: string;
  leftIcon?:ReactNode;
  rightIcon?:ReactNode
}

export default function IconicInput({
  funcss,
  children,
  leftIcon,
  rightIcon,
  input,
  iconicBg,
}: IconicInputProps) {
  return (
    <div className={`icon-container ${funcss}`}>
      {leftIcon ? 
        <div
          className="leftIcon"
          style={{
            backgroundColor: iconicBg || '',
            border: iconicBg ? `0.1rem ${iconicBg} solid` : '',
          }}
        >
          {leftIcon ? leftIcon : ''}
        </div>
     : ''}
     <div className={
      `icon_input_wrapper  ${leftIcon ? 'lefticon' : ''} ${rightIcon ? 'righticon' : ''}`
     }> {input}</div>
      {rightIcon ? 
        <div className="rightIcon" style={{ backgroundColor: iconicBg || '' }}>
          {rightIcon ? rightIcon : ''}
        </div>
       : ''}
    </div>
  );
}
