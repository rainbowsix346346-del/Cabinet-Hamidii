import { useState } from 'react';

/**
 * تصویر امن: lazy، ابعاد مشخص، بدون referrer، و جایگزین در صورت خطا.
 * @param {{src:string, alt:string, width:number, height:number, eager?:boolean, className?:string}} props
 */
export default function SafeImage({ src, alt, width, height, eager = false, className }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className={`img-fallback ${className || ''}`} role="img" aria-label={alt}>{alt}</div>;
  }
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : 'auto'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
