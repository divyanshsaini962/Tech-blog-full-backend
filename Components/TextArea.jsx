import React from 'react'

const input = ({rows, value, onChange,name,label,placeholder}) => {
  return (
    <div className='space-y-1'>
        <label>{label}</label>
        <textarea 
          rows={rows} 
          value={value}
          onChange={onChange}
          name={name} 
          placeholder={placeholder} 
          className='w-full bg-primeColorLight p-3 rounded-lg'/>
    </div>
  )
}

export default input