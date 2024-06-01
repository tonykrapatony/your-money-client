import React, { useState } from 'react'

import s from './UserDataItem.module.scss'
import Input from '../../../../../componets/UI/Input/Input'
import Select from '../../../../../componets/UI/Select/Select'

export default function ProfileSettingsItem({ isEdit, title, value, type, name, placeholder, register, resetField, error, errorMessage}) {



  return (
    <div className={s.profile_data_item}>
      <div className={s.value}>
        {!isEdit && <p>{title}: {value}</p>}
        {isEdit && type !== 'select' && <Input
          type={type}
          name={name}
          placeholder={placeholder}
          register={register}
          error={error}
          errorMessage={errorMessage}
          resetField={resetField}
        />}
        {isEdit && type === 'select' && <Select 
          title={title}
          name={name}
          options={['$', '₴', '€']}
          register={register}
          error={error}
          errorMessage={errorMessage}
          resetField={resetField}
        />}
      </div>
    </div>
  )
}
