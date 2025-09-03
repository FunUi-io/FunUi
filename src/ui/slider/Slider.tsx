'use client';
import React, { useState, useRef } from 'react';
import { getCssVariableValue } from '../../utils/getCssVariable';


type RangeSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  height?: number;
  onChange: (value: number) => void;
  label?: string;
  showTooltip?: boolean;
  funcss?: string;
};

const Slider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  height = 6,
  label,
  showTooltip = true,
  funcss = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percent = ((value - min) / (max - min)) * 100;
  let pColor = getCssVariableValue("primary")

  return (
    <div className={`range-slider-container ${funcss}`}>

      <div className="range-wrapper">
        {showTooltip && (
          <div
            className={`range-tooltip ${isDragging ? 'visible' : ''}`}
            style={{ left: `calc(${percent}% - 20px)` }}
          >
            {value}%
          </div>
        )}

<input
  type="range"
  min={min}
  max={max}
  step={step}
  value={value}
  onChange={handleChange}
  onMouseDown={() => setIsDragging(true)}
  onMouseUp={() => setIsDragging(false)}
  onTouchStart={() => setIsDragging(true)}
  onTouchEnd={() => setIsDragging(false)}
  className="range-slider"
  style={{
    background: `linear-gradient(to right, ${pColor} 0%, ${pColor} ${percent}%, var(--lighter) ${percent}%, var(--lighter) 100%)`,
    height: `${height}px`,
  }}
/>

      </div>

    </div>
  );
};

export default Slider;
