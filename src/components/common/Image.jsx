import { useState } from 'react';
import './Image.css';

/**
 * Editorial Image primitive with fallback handling, aspect ratio support, and zoom effects
 */
export const Image = ({
  src,
  alt,
  aspectRatio, // '4-5', '16-9', '1-1', '3-4', or undefined for natural height
  hoverZoom = false,
  overlay = false,
  className = '',
  objectFit = 'cover',
  fallbackText = 'Loomshine Garment Care',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClass = aspectRatio ? `loom-image-wrapper--aspect-${aspectRatio}` : '';
  const zoomClass = hoverZoom ? 'loom-image--hover-zoom' : '';

  return (
    <div className={`loom-image-wrapper ${aspectClass} ${className}`.trim()}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt || 'Loomshine garment care visual'}
          loading="lazy"
          className={`loom-image ${zoomClass}`}
          style={{ objectFit }}
          onError={() => setHasError(true)}
          {...props}
        />
      ) : (
        <div className="loom-image-fallback">
          <span>{fallbackText}</span>
        </div>
      )}
      {overlay && <div className="loom-image-overlay" />}
    </div>
  );
};

export default Image;
