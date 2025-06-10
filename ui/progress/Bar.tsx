'use client'; 
import * as React from 'react';
import { PiCheck } from 'react-icons/pi';

interface ProgressBarProps {
  funcss?: string;
  progress: number;
  height?: number;
  children?: React.ReactNode;
  content?: ((progress: number) => React.ReactNode) | React.ReactNode;
  bg?: string; // Now CSS class names, e.g. 'primary', 'success'
  raised?: boolean;
  rounded?: boolean;
  type?: 'linear' | 'circle';
  size?: number;
  strokeWidth?: number;
}

export default function ProgressBar({
  funcss,
  progress,
  height = 16,
  children,
  content,
  raised,
  rounded,
  bg = 'primary', // default CSS class name
  type = 'linear',
  size = 60,
  strokeWidth = 6,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const isComplete = clampedProgress >= 100;
  const effectiveBg = isComplete ? 'success' : bg;

  const renderContent = () => {
    if (React.isValidElement(content)) return content;
    if (typeof content === 'function') return content(clampedProgress);
    if (typeof content === 'string') return content;
    return `${clampedProgress}%`;
  };

  if (type === 'circle') {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedProgress / 100) * circumference;

    return (
      <div className={`relative flex justify-center items-center ${funcss}`} style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            stroke="#e5e7eb" // light gray background stroke
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            className={effectiveBg}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.4s ease, stroke 0.3s ease' }}
          />
        </svg>
        <div
          className="absolute text-center font-bold text-sm"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: size,
            height: size,
          }}
        >
          {isComplete ? <PiCheck className="text-success800" size={size / 2.2} /> : renderContent()}
        </div>
      </div>
    );
  }

  // Linear bar
  return (
    <div className={`progressBar ${raised ? 'raised' : ''} ${rounded ? 'rounded' : ''} ${funcss || ''}`}>
      <div
        className={`progressInner ${rounded ? 'rounded' : ''} ${effectiveBg}`}
        style={{
          width: `${clampedProgress}%`,
          height: `${height}px`,
          padding: '0 1rem',
          transition: 'width 0.3s ease, background-color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          fontWeight: 'bold',
          color: '#fff',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {isComplete ? <PiCheck /> : renderContent()} {children}
      </div>
    </div>
  );
}
