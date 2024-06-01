import React, { useEffect, useState } from 'react'

import Alert from '../../UI/Alert/Alert';

import s from './ExpensesItem.module.scss'
import { useDeleteExpenseMutation, useGetUserExpenseQuery } from '../../../redux/expensesApi';

export default function ExpensessItem({ userId, expense, currency, showActions }) {
  const { _id, date, title, value, category } = expense;
  const { refetch: refetchIncomes } = useGetUserExpenseQuery(userId);
  const [deleteExpense, { data: delData, isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteExpenseMutation(userId);

  const [showAlert, setShowAlert] = useState(false);

  const deleteIncomeHandler = async (e) => {
    console.log(e)
    try {
      await deleteExpense(e);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isDelSuccess || isDelError) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        if (isDelSuccess) {
          refetchIncomes();
        } 
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isDelSuccess, isDelError])

  return (
    <>
      {showAlert && isDelError && <Alert type='error'>{delError.data.message}</Alert>}
      {showAlert && isDelSuccess && <Alert type='success'>{delData.message}</Alert>}
      <li className={s.tab_content_table_item} key={_id}>
        <div className={s.date}>{new Date(date).toLocaleDateString()}</div>
        <div className={s.title}>{title}</div>
        <div className={s.value}>{value} {currency}</div>
        <div className={s.category}>{category}</div>
        <div className={s.actions}>
          {showActions && <img src="./assets/images/svg/delete_icon.svg" alt="delete" onClick={() => deleteIncomeHandler(_id)} />}
        </div>
      </li>
    </>
  )
}
