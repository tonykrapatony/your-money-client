import React, { useEffect, useState } from 'react'

import s from './IncomesList.module.scss'
import { useGetUserIncomeQuery } from '../../redux/incomesApi'
import IncomesItem from './IncomesItem/IncomesItem';

export default function IncomesList({ userId, currency, showActions }) {
  // console.log(userId)
  const { data, isSuccess, isError } = useGetUserIncomeQuery(userId);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
      setIncomes(sortedData);
    }
  }, [data])  

  return (
    <>
      <div className={s.tab_content_table}>
        <div className={s.tab_content_table_head}>
          <div className={s.date}>Date</div>
          <div className={s.title}>Title</div>
          <div className={s.value}>Value</div>
          <div className={s.actions}></div>
        </div>
        <ul className={s.tab_content_table_body}>
          {incomes.length > 0 && incomes.map((income) => (
            <IncomesItem key={income._id} userId={userId} income={income} currency={currency} showActions={showActions}/>
          ))}
          {isError && <li className='error'>Error while fetching data</li>}
        </ul>
      </div>
      <div className={s.total}>
        <p>Total: {incomes.length > 0 && incomes.reduce((acc, val) => acc + val.value, 0)} {currency}</p>
      </div>
    </>
  )
}
