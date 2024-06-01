import React, { useEffect, useState } from 'react'
import { useDeleteIncomeMutation, useGetUserIncomeQuery } from '../../../redux/incomesApi'
import Alert from '../../UI/Alert/Alert';

import s from './IncomesItem.module.scss'


export default function IncomesItem({ userId, income, currency, showActions }) {
  const { _id, date, title, value } = income;
  const { refetch: refetchIncomes } = useGetUserIncomeQuery(userId);
  const [deleteIncome, { isSuccess: isDelSuccess, isError: isDelError }] = useDeleteIncomeMutation(userId);

  const [showAlert, setShowAlert] = useState(false);

  const deleteIncomeHandler = async (e) => {
    console.log(e)
    try {
      await deleteIncome(e);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isDelSuccess || isDelError) {
      if (isDelSuccess) {
        refetchIncomes();
      } else {
        setShowAlert(true);
        const timer = setTimeout(() => {
          setShowAlert(false);
        }, 3000);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [isDelSuccess, isDelError])

  return (
    <>
      <li className={s.tab_content_table_item} key={_id}>
        <div className={s.date}>{new Date(date).toLocaleDateString()}</div>
        <div className={s.title}>{title}</div>
        <div className={s.value}>{value} {currency}</div>
        <div className={s.actions}>
          {showActions && <img src="./assets/images/svg/delete_icon.svg" alt="delete" onClick={() => deleteIncomeHandler(_id)} />}
        </div>
      </li>
      {showAlert && isDelError && <Alert type='error'>Error while deleting income</Alert>}
    </>
  )
}
