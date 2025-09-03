import React from 'react';
interface DatePickerProps {
    mode?: 'single' | 'interval';
    funcss?: string;
    onSelect?: (value: Date | [Date, Date]) => void;
    value?: Date | [Date, Date];
    className?: string;
}
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
