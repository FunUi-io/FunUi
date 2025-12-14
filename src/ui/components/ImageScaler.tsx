import React from 'react'

export default function ImageScaler({ 
  funcss = '', 
  size = "100%",
  src = '',
}) {
  return (
    <div 
      className={`image-scaler-container ${funcss}`}
      style={{
        maxWidth: size,
        width: size,
        maxHeight: size,
        height: size,
      }}>
      <img 
        src={src}
        className="image-scaler-img"
        loading="lazy"
        alt=""
      />
    </div>
  );
}