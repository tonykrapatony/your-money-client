import React from 'react'
import s from './Button.module.scss'

export default function Button({ type, children, onclick }) {
  return (
    <>
      {type ? <button type={type} className={s.btn} onClick={onclick}>
        {children}
      </button> : <div type={type} className={s.btn} onClick={onclick}>
        {children}
      </div>
      }
    </>
  )
}
