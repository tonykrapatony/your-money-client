import React from 'react'
import s from './InputFile.module.scss'

export default function InputFile({ type, name, placeholder, register, error, errorMessage }) {
  const inputHandler = (e) => {
    if (e.target.name === 'phone' || e.target.name === 'value') {
      e.target.value = e.target.value.replace(/[^+\-\d]/g, '');
    }
  }
  return (
    <div className={s.input_group}>
      <input 
        type='file'
        name={name}
        accept='image/png, image/jpeg'
      />
    </div>
  )
}
