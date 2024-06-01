import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../../redux/usersApi';

import Dashboard from './Dashboard/Dashboard';
import Incomes from './Incomes/Incomes';
import Expenses from './Expenses/Expenses';
import ProfileSettings from './ProfileSettings/ProfileSettings';
import ProfileNavigation from '../../componets/ProfileNavigation/ProfileNavigation';
import Spinner from '../../componets/UI/Spinner/Spinner';

import s from './Profile.module.scss'

export default function Profile() {
  const isAuth = useSelector((state) => state.auth);
  const { data: user, isLoading, isError, isSuccess } = useGetUserQuery(isAuth?.userId);
  
  const [tabList, setTabList] = useState({
    dashboard: true,
    incomes: false,
    expenses: false,
    settings: false,
  })

  const tabListSwitcher = (field) => {
    setTabList((prevState) => (Object.keys(prevState).reduce((acc, key) => {
      acc[key] = (key === field);
      return acc;
    }, {})));
  }

  return (
    <div className={s.profile_page}>
      {isLoading && <Spinner />}
      {isSuccess &&
        <>
          <ProfileNavigation
            firstName={user.firstName}
            lastName={user.lastName}
            photo={user.photo}
            tabListSwitcher={tabListSwitcher}
          />
          <div className={s.profile_page_tabs}>
            <div className={s.profile_page_tab}>
              {tabList.dashboard && <Dashboard userId={isAuth.userId} currency={user.currency}/>}
              {tabList.incomes && <Incomes userId={isAuth.userId} currency={user.currency}/>}
              {tabList.expenses && <Expenses userId={isAuth.userId} currency={user.currency}/>}
              {tabList.settings && <ProfileSettings user={user} currency={user.currency}/>}
            </div>
          </div>
        </>
      }
      {isError && <p>Error</p>}
    </div>
  )
}
