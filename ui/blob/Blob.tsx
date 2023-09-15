import * as React from 'react';

interface BlobProps {
  height?: string;
  width?: string;
  background?: string;
  funcss?: string;
  shape?: string;
}

const Blob: React.FC<BlobProps> = ({
  height = '',
  width = '',
  background = '',
  funcss = '',
  shape = '',
}) => {
  return (
    <div
      className={`${funcss}`}
      style={{
        height,
        width,
        background: background ? `url(${background})` : '',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: shape,
        transition: '0.3s linear',
      }}
    ></div>
  );
};

export default Blob;
