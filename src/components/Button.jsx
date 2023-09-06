import React from 'react'

function Button({text, type, width=100}) {
  return (
    <button type={type} className='w-[{width}px] bg-primary rounded text-xs px-7 py-3'>{text}</button>
  )
}

export default Button