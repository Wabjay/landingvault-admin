import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



export default function LoadImage({alt, src, style, height="100%"}) {
  return (
    <div
    className={`relative w-full overflow-hidden ${style}`}
    style={{ height }}
  >
    <LazyLoadImage
      alt={alt}
      effect="blur"
      src={src}
      className="w-full h-full object-cover"
    />
  </div>
  )
}
