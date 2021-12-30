import React from 'react'

const ImageHelper = ({ product }) => {
// eslint-disable-next-line
  const imgUrl = product ? product.image : 'http://localhost:8000/media/images/71mH-O2BplL._AC_UL640_FMwebp_QL65__rAdWJ7X.webp'

  return (
    <div className='rounded border border-success p-2'>
      <img src={product.image}
        style={{ maxHeight: '100%', maxWidth: '100%' }}
        className='mb-3 rounded'
        alt=''/>
    </div>
  )
}

export default ImageHelper
