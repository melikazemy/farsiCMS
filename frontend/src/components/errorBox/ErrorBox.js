import React from 'react'
import './ErrorBox.css'
export default function ErrorBox({msg}) {
  return (
    <div>
        <h1 className='empty-error'>
            {msg}
        </h1>
    </div>
  )
}
