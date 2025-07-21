import React from 'react';
import { Activity } from './Calendar';
type ActivityCardProps = {
    activity: Activity;
    onClick?: (activity: Activity) => void;
};
declare const ActivityCard: React.FC<ActivityCardProps>;
export default ActivityCard;
