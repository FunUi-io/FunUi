import * as React from 'react';

interface SnackbarProps {
  message: string;
  close: React.ReactNode;
  open: boolean;
  position: string;
  funcss?: string;
  animation?: string;
  duration?: number;
  flat?:boolean
}

const SnackBar: React.FC<SnackbarProps> = ({ message, close, open, position, funcss, animation, duration , flat}) => {
  if (open) {
    return (
      <div>
        <div className={`snackbar ${position} ${funcss} ${flat ? "flat" : ""}`} style={{ animation: ` ${duration}s ${animation}` }}>
          <div className="snackbar-content">
            <div className="snackbar-body">
              {message}
            </div>
            {
              close && 
              <div>
              <span className="close-snackbar">
                <span>{close}</span>
              </span>
            </div>
            }
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default SnackBar;
