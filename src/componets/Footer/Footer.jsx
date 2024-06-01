import React from 'react'
import Authorisation from '../Authorisation/Authorisation'
import Logo from '../Logo/Logo'

import s from './Footer.module.scss'

export default function Footer() {
  return (
    <footer>
      <Logo />
      <Authorisation />
      <div className={s.legal}>
        <p>Developed by Vynohradnyi Ihor: </p>
        <a href="https://www.linkedin.com/in/ihor-vynohradnyi-b97b37153/" target='_blank' rel="noreferrer">
          <img src="./assets/images/svg/linkedin_icon.svg" alt="linkedin" width={35} height={35}/>
        </a>
        <a href="https://github.com/tonykrapatony/" target='_blank' rel="noreferrer">
          <img src="./assets/images/svg/github_icon.svg" alt="github" width={35} height={35}/>
        </a>
      </div>
    </footer>
  )
}
