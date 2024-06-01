import React from 'react'
import { Link } from 'react-router-dom'

import s from './Logo.module.scss'

export default function Logo() {
  return (
    <Link to="/" className={s.logo}>
      <img src="./assets/images/svg/logo.svg" alt="logo icon" width={50} height={50}/>
      YM
    </Link>
  )
}
