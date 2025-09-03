'use client';
import React, { useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { PiCaretLeft, PiCaretRight, PiPlus, PiCircle, PiChecks, PiEmpty } from 'react-icons/pi';
import Avatar from '../avatar/Avatar';
import Circle from '../specials/Circle';
import RowFlex from '../specials/RowFlex';
import Input from '../input/Input';
import Button from '../button/Button';
import Text from '../text/Text';
import ActivityCard from './ActivityCard';
import View from '../view/View';
import Dropdown from '../drop/Dropdown';
import { HiOutlineDotsVertical } from "react-icons/hi";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export type Activity  = {
  id: string;
  title: string;
  date: Date;
  color?: string;
  funcss?: string;
  data?: any;
  footer?: React.ReactNode;
}

interface CalendarProps {
  activities: Activity[];
  onAdd?: (date: Date) => void;
  onActivityClick?: (activity: Activity) => void;
  onDateClick?: (date: Date) => void;
  funcss?: string;
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
  const [showMoreActivities, setShowMoreActivities] = useState(false);

  // ✅ NEW: View mode state
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const startOfWeek = currentMonth.startOf('week').add(weekStart, 'day');

  const { days, monthActivities } = useMemo(() => {
    let days: (Dayjs | null)[] = [];

    if (viewMode === 'month') {
      const startOfMonth = currentMonth.startOf('month');
      const endOfMonth = currentMonth.endOf('month');
      const firstDay = startOfMonth.day();
      const daysBefore = (firstDay - weekStart + 7) % 7;
      const daysInMonth = currentMonth.daysInMonth();
      const totalDays = Math.ceil((daysBefore + daysInMonth) / 7) * 7;

      for (let i = daysBefore - 1; i >= 0; i--) {
        const date = startOfMonth.subtract(i + 1, 'day');
        days.push(showAdjacentMonths ? date : null);
      }
      for (let i = 0; i < daysInMonth; i++) {
        days.push(startOfMonth.add(i, 'day'));
      }
      const remaining = totalDays - days.length;
      for (let i = 0; i < remaining; i++) {
        const date = endOfMonth.add(i + 1, 'day');
        days.push(showAdjacentMonths ? date : null);
      }
    } else {
      // ✅ Week View: only 7 days
      for (let i = 0; i < 7; i++) {
        days.push(startOfWeek.add(i, 'day'));
      }
    }

    const monthActivities: Record<string, Activity[]> = {};
    activities.forEach(activity => {
      const date = dayjs(activity.date);
      const key = date.format('YYYY-MM-DD');

      if (
        viewMode === 'month' &&
        (date.isSame(currentMonth, 'month') || (showAdjacentMonths &&
        (date.isBefore(currentMonth.endOf('month')) && date.isAfter(currentMonth.startOf('month')))))
      ) {
        if (!monthActivities[key]) monthActivities[key] = [];
        monthActivities[key].push(activity);
      }

      if (viewMode === 'week' && date.isSame(startOfWeek, 'week')) {
        if (!monthActivities[key]) monthActivities[key] = [];
        monthActivities[key].push(activity);
      }
    });

    return { days, monthActivities };
  }, [currentMonth, activities, viewMode, weekStart, showAdjacentMonths]);

  const prevPeriod = () =>
    setCurrentMonth(currentMonth.subtract(1, viewMode === 'month' ? 'month' : 'week'));
  const nextPeriod = () =>
    setCurrentMonth(currentMonth.add(1, viewMode === 'month' ? 'month' : 'week'));
  const goToToday = () => setCurrentMonth(dayjs());

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

  const isDateDisabled = (date: Dayjs) =>
    (minDate && date.isBefore(dayjs(minDate), 'day')) ||
    (maxDate && date.isAfter(dayjs(maxDate), 'day'));

  const isToday = (date: Dayjs) => date.isSame(dayjs(), 'day');
  const isSelected = (date: Dayjs) => selectedDate && date.isSame(selectedDate, 'day');

  const weekdays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = dayjs().day((weekStart + i) % 7);
      days.push(day.format('dd'));
    }
    return days;
  }, [weekStart]);


  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const updateViewMode = () => {
    const small = window.innerWidth < 768;
    setIsMobile(small);
    setViewMode(small ? 'week' : 'month');
  };

  updateViewMode(); // initial check
  window.addEventListener('resize', updateViewMode);
  return () => window.removeEventListener('resize', updateViewMode);
}, []);



  return (
    <div className={`calendar ${funcss}`}>
      <div className="calendar-header">
        <Avatar funcss="border" onClick={prevPeriod}>
          <PiCaretLeft />
        </Avatar>

        <div className="calendar-title">
          <RowFlex gap={1} align="center">
            <Input
              type="text"
              select
              value={currentMonth.month().toString()}
              onChange={(e) =>
                setCurrentMonth(currentMonth.month(parseInt(e.target.value)))
              }
              options={Array.from({ length: 12 }, (_, i) => ({
                value: i.toString(),
                text: dayjs().month(i).format('MMMM'),
              }))}
              borderless
              funcss="round-edge"
            />

            <Input
              type="text"
              select
              value={currentMonth.year().toString()}
              onChange={(e) =>
                setCurrentMonth(currentMonth.year(parseInt(e.target.value)))
              }
              options={Array.from({ length: 21 }, (_, i) => {
                const year = dayjs().year() - 10 + i;
                return { value: year.toString(), text: year.toString() };
              })}
              borderless
              funcss="round-edge"
            />
            
            <Dropdown
      direction="dropdown"
      position='right'
      openOnHover={false}
      button={
        <Avatar>
          <HiOutlineDotsVertical />
        </Avatar>
      }
      items={[
        {
          label: <span className="text-sm">Today</span>,
          onClick: () => goToToday(),
        },
        {
          label: <div className="text-sm" onClick={() =>
            setViewMode(viewMode === 'month' ? 'week' : 'month')
          }>
                {viewMode === 'month' ? 'Switch to Week' : 'Switch to Month'}
          </div>,
        },
      ]}
    />
           
            
          </RowFlex>
        </div>

        <Avatar funcss="border" onClick={nextPeriod}>
          <PiCaretRight />
        </Avatar>
      </div>

      <div className="calendar-weekdays">
        {weekdays.map((d, i) => (
          <div key={i} className="weekday-header">
            {d}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((date, index) => {
          if (!date || (viewMode === 'month' && !date.isSame(currentMonth, 'month'))) {
            return <div key={index} className="calendar-cell empty" />;
          }

          const key = date.format('YYYY-MM-DD');
          const activitiesToday = monthActivities[key] || [];
          const disabled = isDateDisabled(date);
          const today = isToday(date);
          const selected = isSelected(date);

          return (
            <div
              key={key}
              className={`calendar-cell hoverable ${disabled ? 'disabled' : ''} ${today ? 'today' : ''} ${selected ? 'selected' : ''}`}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => setHoveredDate(key)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              <div className={`day-number ${today ? 'today' : ''}`}>
              {date.date()} 
              </div>

             {
              !isMobile && (
                <div className="activities ">
                {activitiesToday.slice(0, showMoreActivities ? activitiesToday.length : 3).map((activity) => (
                  <ActivityCard activity={activity}  onClick={(e) => {
                    onActivityClick?.(activity);
                  }}/>
                ))}
                {activitiesToday.length > 3 && (
                  <Button smaller funcss='p-0' color="primary" onClick={() => setShowMoreActivities(!showMoreActivities)}>
                    {showMoreActivities ? 'Show Less' : <>+{activitiesToday.length - 3} more</>}
                  </Button>
                )}
              </div>
              )
             }

              {hoveredDate === key && !disabled && (
                <div className="add-icon hide-small" onClick={(e) => handleAdd(e, date)}>
                  <Circle bg='primary'>
                    <PiPlus />
                  </Circle>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isMobile && selectedDate && (
  <div className="calendar-activities-mobile p-1">
  <RowFlex gap={0.5} justify="space-between" align="center" className="mt-3 mb-2">
  <Text
      text={dayjs(selectedDate).format('dddd, MMMM D')}
      weight={600}
      funcss="mb-2"
    />


        <div  onClick={(e) => handleAdd(e, dayjs(selectedDate))}>
        <Circle bg="primary">
        <PiPlus />
        </Circle>
        </div>

  </RowFlex>
    {(monthActivities[dayjs(selectedDate).format('YYYY-MM-DD')] || []).map((activity) => (
  <ActivityCard activity={activity} onClick={(e) => {
    onActivityClick?.(activity);
  }}/>
    ))}
    {(monthActivities[dayjs(selectedDate).format('YYYY-MM-DD')] || []).length === 0 && (
     <View funcss='mt-2 text-center'>
     <div> <PiEmpty size={30}/></div>
       <Text text="No activities for this day." size="sm" opacity={2} />
       <div className="mt-2">
        <span onClick={(e) => handleAdd(e, dayjs(selectedDate))}>
        <Button  small bg='lighter' startIcon={<PiPlus />}>Add Activity</Button>
        </span>
       </div>
     </View>
    )}
  </div>
)}

    </div>
  );
};

export default Calendar;
