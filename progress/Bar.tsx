import * as React from 'react';

interface ProgressBarProps {
  funcss?: string;
  progress: number;
  height?: number;
  children?: React.ReactNode;
  content?: React.ReactNode;
  bg?: string;
  lined?: boolean;
  raised?:boolean ,
  rounded?:boolean
}

export default function ProgressBar({
  funcss,
  progress,
  height,
  children,
  content,
  raised,
  rounded,
  bg,
  lined,
}: ProgressBarProps) {
  return (
    <>
      {lined ? (
        <div className={` ${funcss} progressBar lined ${bg}`}>
          {children} {content}
          <div
            className={` ${funcss} ${bg} linedProgress  ${raised ? 'raised' : ''} ${rounded ? 'rounded' : ''}`}
            style={{ width: `${progress < 101 ? progress : ''}%`, height: `${height}px` }}
          ></div>
        </div>
      ) : (
    <div className={`progressBar ${raised ? 'raised' : ''} ${rounded ? 'rounded' : ''}`}>
          <div
            className={` ${funcss} progressInner ${bg} ${rounded ? 'rounded' : ''}`}
            style={{
              width: `${progress < 101 ? progress : ''}%`,
              height: `${height}px`,
              padding: `${progress > 0 ? '0 1rem' : ''}`,
            }}
          >
            {children} {content}
          </div>
        </div>
      )}
    </>
  );
}
