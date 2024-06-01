import React from 'react'
import LoginForm from './LoginForm/LoginForm'

import s from './Login.module.scss'

export default function Login() {
  return (
    <div className={s.login}>
      <h2>Login</h2>
      <p>To login, please fill out the form below</p>
      <LoginForm />
    </div>
  )
}
