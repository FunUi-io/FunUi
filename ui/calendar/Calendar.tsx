'use client';
import React, { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { PiCaretLeft, PiCaretRight, PiPlus, PiCircle, PiChecks } from 'react-icons/pi';
import Avatar from '../avatar/Avatar';
import Circle from '../specials/Circle';
import RowFlex from '../specials/RowFlex';
import Input from '../input/Input';
import Button from '../button/Button';
import Text from '../text/Text';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface Activity {
  id: string;
  title: string;
  date: Date;
  color?: string;
}

interface CalendarProps {
  activities: Activity[];
  onAdd?: (date: Date) => void;
  onActivityClick?: (activity: Activity) => void;
  onDateClick?: (date: Date) => void;
  funcss?: string;
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Sunday, 1=Monday, etc.
  renderActivity?: (activity: Activity) => React.ReactNode;
  showAdjacentMonths?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  activities,
  onAdd,
  onActivityClick,
  onDateClick,
  funcss = '',
  weekStart = 0,
  renderActivity,
  showAdjacentMonths = true,
  minDate,
  maxDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Memoized calculations
  const { days, monthActivities } = useMemo(() => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    
    // Calculate days grid
    const firstDay = startOfMonth.day();
    const daysBefore = (firstDay - weekStart + 7) % 7;
    const daysInMonth = currentMonth.daysInMonth();
    const totalDays = Math.ceil((daysBefore + daysInMonth) / 7) * 7;
    
    const days: (Dayjs | null)[] = [];
    
    // Previous month days
    for (let i = daysBefore - 1; i >= 0; i--) {
      const date = startOfMonth.subtract(i + 1, 'day');
      days.push(showAdjacentMonths ? date : null);
    }
    
    // Current month days
    for (let i = 0; i < daysInMonth; i++) {
      days.push(startOfMonth.add(i, 'day'));
    }
    
    // Next month days
    const remaining = totalDays - days.length;
    for (let i = 0; i < remaining; i++) {
      const date = endOfMonth.add(i + 1, 'day');
      days.push(showAdjacentMonths ? date : null);
    }
    
    // Group activities by date
    const monthActivities: Record<string, Activity[]> = {};
    activities.forEach(activity => {
      const date = dayjs(activity.date);
      if (date.isSame(currentMonth, 'month') || 
          (showAdjacentMonths && (date.isBefore(endOfMonth) && date.isAfter(startOfMonth)))) {
        const key = date.format('YYYY-MM-DD');
        if (!monthActivities[key]) monthActivities[key] = [];
        monthActivities[key].push(activity);
      }
    });
    
    return { days, monthActivities };
  }, [currentMonth, activities, weekStart, showAdjacentMonths]);

  // Navigation handlers
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const goToToday = () => setCurrentMonth(dayjs());
  
  // Date handlers
  const handleDateClick = (date: Dayjs) => {
    if (isDateDisabled(date)) return;
    
    setSelectedDate(date.toDate());
    onDateClick?.(date.toDate());
  };

  const handleAdd = (e: React.MouseEvent, date: Dayjs) => {
    e.stopPropagation();
    if (isDateDisabled(date)) return;
    onAdd?.(date.toDate());
  };

  // Utility functions
  const isDateDisabled = (date: Dayjs) => {
    return (
      (minDate && date.isBefore(dayjs(minDate), 'day')) ||
      (maxDate && date.isAfter(dayjs(maxDate), 'day'))
    );
  };

  const isToday = (date: Dayjs) => date.isSame(dayjs(), 'day');
  const isSelected = (date: Dayjs) => selectedDate && date.isSame(selectedDate, 'day');
  const isCurrentMonth = (date: Dayjs) => date.isSame(currentMonth, 'month');

  // Weekday headers
  const weekdays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = dayjs().day((weekStart + i) % 7);
      days.push(day.format('dd'));
    }
    return days;
  }, [weekStart]);

  return (
    <div className={`calendar ${funcss}`}>
      <div className="calendar-header">
        <Avatar funcss='border' onClick={prevMonth} aria-label="Previous month">
          <PiCaretLeft />
        </Avatar>
        
        <div className="calendar-title">

  <Input 
    value={currentMonth.month()}
    onChange={(e) => {
      const newMonth = currentMonth.month(parseInt(e.target.value));
      setCurrentMonth(newMonth);
    }}
    type="text" 
    label="Select Month" 
    borderless
    fullWidth
    funcss='round-edge'
    select
    options={[
      { value: "", text: "-- Select month --" },
      { value: "0", text: "January" },
      { value: "1", text: "February" },
      { value: "2", text: "March" },
      { value: "3", text: "April" },
      { value: "4", text: "May" },
      { value: "5", text: "June" },
      { value: "6", text: "July" },
      { value: "7", text: "August" },
      { value: "8", text: "September" },
      { value: "9", text: "October" },
      { value: "10", text: "November" },
      { value: "11", text: "December" }
    ]}
  />
<Input 
  type="text" 
  label="Select Year" 
   funcss='round-edge'
  fullWidth
  borderless
  select
  value={currentMonth.year().toString()}
  onChange={(e) => {
    const newYear = currentMonth.year(parseInt(e.target.value));
    setCurrentMonth(newYear);
  }}
  options={Array.from({ length: 21 }, (_, i) => {
    const year = dayjs().year() - 10 + i;
    return {
      value: year.toString(),
      text: year.toString(),
    };
  })}
/>


  <Button bg='lighter border' onClick={goToToday}>Today</Button>
</div>

        
        <Avatar funcss='border' onClick={nextMonth} aria-label="Next month">
          <PiCaretRight />
        </Avatar>
      </div>

      <div className="calendar-weekdays">
        {weekdays.map((d, i) => (
          <div key={i} className="weekday-header">{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((date, index) => {
          if (!date) return <div key={index} className="calendar-cell empty" />;
          
          const key = date.format('YYYY-MM-DD');
          const activitiesToday = monthActivities[key] || [];
          const disabled = isDateDisabled(date);
          const today = isToday(date);
          const selected = isSelected(date);
          const currentMonth = isCurrentMonth(date);
          
          return (
            <div
              key={key}
              className={`calendar-cell ${
                !currentMonth ? 'adjacent-month' : ''} ${
                disabled ? 'disabled' : ''} ${
                today ? 'today' : ''} ${
                selected ? 'selected' : ''}`
              }
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => setHoveredDate(key)}
              onMouseLeave={() => setHoveredDate(null)}
              aria-disabled={disabled}
              aria-label={date.format('MMMM D, YYYY')}
              role="button"
              tabIndex={0}
            >
              <div className="day-number">
               <RowFlex justify='space-between' align='center' gap={0.5}>
              <Text 
              text= {date.date()}
              color={today ? 'primary' : ''} 
              size='xl'
              />
               {today && <PiChecks className="text-success" />}
               </RowFlex>
              </div>

              <div className="activities">
                {activitiesToday.slice(0, 2).map(activity => (
                  <div
                    key={activity.id}
                    className="activity-tag"
                    style={{ backgroundColor: activity.color || '#e0e0e0' }}
                    onClick={e => {
                      e.stopPropagation();
                      onActivityClick?.(activity);
                    }}
                  >
                    {renderActivity ? renderActivity(activity) : activity.title}
                  </div>
                ))}
                {activitiesToday.length > 2 && (
                  <div className="activity-more">
                    +{activitiesToday.length - 2} more
                  </div>
                )}
              </div>

              {hoveredDate === key && !disabled && (
                <div 
                  className="add-icon" 
                  onClick={e => handleAdd(e, date)}
                  aria-label={`Add event on ${date.format('MMMM D')}`}
                >
                 <Circle hoverable funcss='card bg'>
                 <PiPlus />
                 </Circle>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;