import React from 'react'

import s from './Spinner.module.scss'

export default function Spinner() {
  return (
    <div className={s.spinner}>
      {/* <img src="./assets/images/svg/spinner_icon.svg" alt="spinner" /> */}
      <img src="./assets/images/svg/coin_icon.svg" alt="spinner" />
    </div>
  )
}
