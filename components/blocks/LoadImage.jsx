import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



export default function LoadImage({alt, src, style}) {
  return (
    <LazyLoadImage
    alt={alt}
    effect="blur"
    // style={{display: 'block'}}
    src={src}
    className={`w-full ${style}`}
   />
  )
}
