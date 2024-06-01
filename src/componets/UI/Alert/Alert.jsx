import React from 'react'

import s from './Alert.module.scss'

export default function Alert({ type, children }) {

  return (
    <div className={`${s.alert} ${s[type]}`}>
      {children}
    </div>
  )
}
