import React from 'react'
import './style.css'

function Button({onClick, text, width}) {
  return (
    <div className='custom-btn' style={{width:width}} onClick={onClick}>
      {text}</div>
  )
}

export default Button
