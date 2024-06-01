import React from 'react'
import Form from './Form/Form';
import ExpensessList from '../../../componets/ExpensesList/ExpensesList';

import s from './Expenses.module.scss';
import { categories } from '../../../helpers/categories';

export default function Expenses({ userId, currency }) {
  return (
    <div className={s.expenses}>
      <div className={s.title}>
        <p>Expenses</p>
      </div>
      <Form userId={userId}/>
      <ExpensessList userId={userId} filters={categories} currency={currency} showActions={true}/>
    </div>
  )
}
