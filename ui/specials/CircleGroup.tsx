'use client';
import React from 'react';

interface AvatarGroupProps {
  avatars: React.ReactElement[]; // Or you can accept props data instead
  size?: number;
  overlap?: number; // how much they overlap in rem
  maxVisible?: number; // optional limit
}

export default function CircleGroup({
  avatars,
  size = 2,
  overlap = 0.8,
  maxVisible = avatars.length,
}: AvatarGroupProps) {
  const displayed = avatars.slice(0, maxVisible);
  const extra = avatars.length - maxVisible;

  return (
    <div className="flex" style={{ direction: 'ltr' }}>
      {displayed.map((avatar, i) => (
        <div
          key={i}
          style={{
            marginLeft: i === 0 ? '0' : `-${overlap}rem`,
            zIndex: avatars.length - i,
          }}
        >
          {React.cloneElement(avatar, { size })}
        </div>
      ))}
      {extra > 0 && (
        <div
          className="avatar lighter text-small flex "
          style={{
            width: `${size}rem`,
            height: `${size}rem`,
            marginLeft: `-${overlap}rem`,
            zIndex: 0,

          }}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
