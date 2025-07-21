'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import Avatar from '../avatar/Avatar';
import { PiCaretLeft, PiCaretRight, PiX, PiXCircle } from 'react-icons/pi';

interface DatePickerProps {
  mode?: 'single' | 'interval';
  funcss?: string;
  onSelect?: (value: Date | [Date, Date]) => void;
  value?: Date | [Date, Date];
  className?: string;
}

type Selection = Date | [Date, Date | null] | null;

const DatePicker: React.FC<DatePickerProps> = ({
  mode = 'single',
  onSelect,
  value,
  funcss,
  className = '',
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selected, setSelected] = useState<Selection>(value || null);

  const daysInMonth = currentMonth.daysInMonth();
  const firstDay = currentMonth.startOf('month').day(); // 0 = Sunday

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // padding
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(currentMonth.date(i).toDate());
  }

  const handleSelect = (date: Date) => {
    if (mode === 'single') {
      setSelected(date);
      onSelect?.(date);
    } else if (mode === 'interval') {
      if (!selected || !Array.isArray(selected)) {
        setSelected([date, null]);
      } else {
        const [start, end] = selected;
        if (!end) {
          const range: [Date, Date] =
            dayjs(date).isBefore(dayjs(start)) ? [date, start] : [start, date];
          setSelected(range);
          onSelect?.(range);
        } else {
          setSelected([date, null]); // restart
        }
      }
    }
  };

  const isSelected = (date: Date) => {
    if (!selected) return false;
    if (mode === 'single' && selected instanceof Date) {
      return dayjs(selected).isSame(date, 'day');
    }
    if (Array.isArray(selected)) {
      const [start, end] = selected;
      if (start && end) {
        return (
          dayjs(date).isSame(start, 'day') ||
          dayjs(date).isSame(end, 'day') ||
          (dayjs(date).isAfter(start) && dayjs(date).isBefore(end))
        );
      }
      return dayjs(date).isSame(start, 'day');
    }
    return false;
  };

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));

  const handleClear = () => {
    setSelected(null);
    onSelect?.(mode === 'single' ? null as unknown as Date : null as unknown as [Date, Date]);
  };

  const formatDate = (date: Date | null | undefined) =>
    date ? dayjs(date).format('MMM D, YYYY') : '...';

  return (
    <div className={`datepicker ${funcss} ${className}`}>
      <div className="datepicker-header">
        <Avatar onClick={prevMonth}><PiCaretLeft /></Avatar>
        <span>{currentMonth.format('MMMM YYYY')}</span>
        <Avatar onClick={nextMonth}><PiCaretRight /></Avatar>
      </div>

      {selected && (
        <div className="datepicker-selected">
          <span className="interval-display">
            {mode === 'single' && selected instanceof Date && (
              <>Selected: {formatDate(selected)}</>
            )}
            {mode === 'interval' && Array.isArray(selected) && (
              <div className='text-sm'>
                {selected[1]
                  ? `${formatDate(selected[0])} to ${formatDate(selected[1])}`
                  : ` ${formatDate(selected[0])} - End date`}
              </div>
            )}
          </span>
          <div style={{lineHeight:"0"}}>
          <PiX className="clear-icon" onClick={handleClear} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      )}

      <div className="datepicker-weekdays">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="datepicker-grid">
        {days.map((date, idx) => {
          const isSelectedClass = date && isSelected(date) ? 'selected' : '';
          const isInRangeClass =
            date && isSelected(date) && Array.isArray(selected) ? 'in-range' : '';
          return (
            <div
              key={idx}
              onClick={() => date && handleSelect(date)}
          
            >
             {
              date && 
              <Avatar funcss={`borderless datepicker-day ${!date ? 'empty' : ''} ${isSelectedClass} ${isInRangeClass}`}>
              {date ? dayjs(date).date() : ''}
              </Avatar>
             }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;
