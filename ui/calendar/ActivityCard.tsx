'use client';
import React from 'react';
import { Activity } from './Calendar';
import Text from '../text/Text';

type ActivityCardProps = {
  activity: Activity;
  onClick?: (activity: Activity) => void;
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  return (
    <div
      className={`activity-tag animated slide-up ${activity.funcss || ''}`}
      style={{ backgroundColor: activity.color || '' }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(activity);
      }}
    >
      <Text text={activity.title} size="xs" block truncate={2} />
      {activity.footer && <div>{activity.footer}</div>}
    </div>
  );
};

export default ActivityCard;
