import React from 'react';
interface AvatarGroupProps {
    avatars: React.ReactElement[];
    size?: number;
    overlap?: number;
    maxVisible?: number;
}
export default function CircleGroup({ avatars, size, overlap, maxVisible, }: AvatarGroupProps): React.JSX.Element;
export {};
