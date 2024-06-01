import React, { useEffect, useState } from 'react'
import s from './Input.module.scss'

export default function Input({ type, name, placeholder, register, error, errorMessage, resetField }) {

  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  const inputHandler = (e) => {
    if (e.target.name === 'phone' || e.target.name === 'value') {
      e.target.value = e.target.value.replace(/[^+\-\d]/g, '');
    }
  }

  const toggleVisibility = () => setVisible(!visible);

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
    <div className={s.input_group}>
      <input className={`${error ? s.input_error : ''}`}
        type={`${!visible ? type : 'text' }`}
        placeholder={placeholder}
        name={name}
        {...register(name)}
        onInput={inputHandler}
        max={new Date().toISOString().split('T')[0]}
      />
      {type === 'password' && <div className={s.show}>
        {!visible && type === 'password' && <img src="./assets/images/svg/show_pass_icon.svg" alt="show password" onClick={toggleVisibility}/>}
        {visible && type === 'password' && <img src="./assets/images/svg/hide_pass_icon.svg" alt="hide password" onClick={toggleVisibility}/>}
      </div>}
      {value && <div className={s.reset}>
        <img src="./assets/images/svg/cancel_icon.svg" alt="hide password" onClick={clearValue}/>
      </div>}
      {error && <span className={s.error_msg}>{errorMessage}</span>}
    </div>
  )
}
