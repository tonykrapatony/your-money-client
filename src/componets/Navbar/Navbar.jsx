import React from 'react'
import Logo from '../Logo/Logo';
import Authorisation from '../Authorisation/Authorisation';

import s from './Navbar.module.scss';

export default function Navbar() {

  return (
    <div className={s.navbar}>
      <Logo />
      <Authorisation />
    </div>
  )
}
