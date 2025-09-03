import React from 'react';
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
declare const Slider: React.FC<RangeSliderProps>;
export default Slider;
