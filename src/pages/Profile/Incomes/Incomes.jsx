import React from 'react'
import Form from './Form/Form'
import s from './Incomes.module.scss'
import IncomesList from '../../../componets/IncomesList/IncomesList'

export default function Incomes({ userId, currency }) {
  return (
    <div className={s.incomes}>
      <div className={s.title}>
        <p>Incomes</p>
      </div>
      <Form userId={userId}/>
      <IncomesList userId={userId} currency={currency} showActions={true}/>
    </div>
  )
}
