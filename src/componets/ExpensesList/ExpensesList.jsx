import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useGetUserExpenseQuery } from '../../redux/expensesApi';

import ExpensesItem from './ExpensesItem/ExpensesItem';

import s from './ExpensesList.module.scss'

export default function ExpensessList({ filters, currency, showActions }) {
  const userId = useSelector((state) => state.auth.userId);

  const {data, isSuccess, isError, error} = useGetUserExpenseQuery(userId);
  const [expenses, setExpenses] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc')

  useEffect(() => {
    if (isSuccess) {
      const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
      setExpenses(sortedData);
    }
  }, [data])

  const sortExpenses = (param) => {
    const sortedData = [...expenses].sort((a, b) => {
      let comparison = 0;
  
      if (param === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (param === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (param === 'value') {
        comparison = a.value - b.value;
      } else if (param === 'category') {
        comparison = a.category.localeCompare(b.category);
      }
  
      return comparison;
    });
  
    // Перевертаємо масив, якщо потрібно сортувати в порядку спадання
    if (sortDirection === 'desc') {
      sortedData.reverse();
    }
  
    setExpenses(sortedData);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  }

  const filterByCategories = (category) => {
    const filteredData = [...data].filter((item) => {
      if (item.category === category) {
        return item
      } else if (category === 'all') {
        return item
      }
    });
    setExpenses(filteredData);
  }

  return (
    <>
      {filters && <div className={s.filters}>
        <p>Show expenses from category:</p>
        <ul>
          <li onClick={() => filterByCategories('all')}>All</li>
          {filters.map((category) => (
            <li key={category} onClick={() => filterByCategories(category)}>{category}</li>
          ))}
        </ul>
      </div>}
      <div className={s.tab_content_table}>
        <div className={s.tab_content_table_head}>
          <div className={s.date} onClick={() => sortExpenses('date')}>
            <p>Date</p>
            <img src="./assets/images/svg/sort_icon.svg" alt="sort" />
          </div>
          <div className={s.title} onClick={() => sortExpenses('title')}>
            <p>Title</p>
            <img src="./assets/images/svg/sort_icon.svg" alt="sort" />
          </div>
          <div className={s.value} onClick={() => sortExpenses('value')}>
            <p>Value</p>
            <img src="./assets/images/svg/sort_icon.svg" alt="sort" />
          </div>
          <div className={s.category} onClick={() => sortExpenses('category')}>
            <p>Category</p>
            <img src="./assets/images/svg/sort_icon.svg" alt="sort" />
          </div>
        </div>
        <ul className={s.tab_content_table_body}>
          {isSuccess && expenses.map((expense) => (
            <ExpensesItem key={expense._id} userId={userId} expense={expense} currency={currency} showActions={showActions}/>
          ))}
          {isError && <li className='error'>Error while fetching data</li>}
        </ul>
      </div>
      <div className={s.total}>
        <p>Total: {isSuccess && expenses.reduce((acc, val) => acc + val.value, 0)} {currency}</p>
      </div>
    </>
  )
}
