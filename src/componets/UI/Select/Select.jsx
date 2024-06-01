import React, { useState } from 'react'
import s from './Select.module.scss'

export default function Select({ title, name, options, register, error, errorMessage, resetField}) {
  const [value, setValue] = useState('');

  register(name, {
    onChange: (e) => {
      setValue(e.target.value);
    },
  });

  const clearValue = () => {
    setValue('');
    resetField();
  };

  return (
    <div className={s.select_group}>
      <select
        className={`${error ? s.select_error : ''}`}
        name={name}
        {...register(name)}
        defaultValue={''}
      >
        <option value="" disabled>{title}</option>
        {options.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      {value && <div className={s.reset}>
        <img src="./assets/images/svg/cancel_icon.svg" alt="hide password" onClick={clearValue}/>
      </div>}
      {error && <span className={s.error_msg}>{errorMessage}</span>}
    </div>
  )
}
