import React from 'react'
import IncomesList from '../../../componets/IncomesList/IncomesList'
import ExpensesList from '../../../componets/ExpensesList/ExpensesList'

import s from './Dashboard.module.scss'
import Statistics from './Statistics/Statistics'

export default function Dashboard({ type, userId, currency }) {

  return (
    <div className={s.transactions}>
      <div className={s.title}>
        <p>Dashboard</p>
      </div>
      <div className={s.transactions_row}>
        <div className={s.transactions_col}>
          <IncomesList userId={userId} currency={currency}/>
        </div>
        <div className={s.transactions_col}>
          <ExpensesList filters={false} userId={userId} currency={currency}/>
        </div>
      </div>
      <Statistics userId={userId}/>
    </div>
  )
}
