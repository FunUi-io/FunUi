import React from 'react';
export type Activity = {
    id: string;
    title: string;
    date: Date;
    color?: string;
    funcss?: string;
    data?: any;
    footer?: React.ReactNode;
};
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
declare const Calendar: React.FC<CalendarProps>;
export default Calendar;
