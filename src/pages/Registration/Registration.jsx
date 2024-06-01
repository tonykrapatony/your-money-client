import React from 'react'
import RegistrationForm from './RegistrationForm/RegistrationForm'

import s from './Registration.module.scss'


export default function Registration() {
  return (
    <div className={s.registration}>
      <h2>Registration</h2>
      <p>To register, please fill out the form below</p>
      <RegistrationForm />
    </div>
  )
}
