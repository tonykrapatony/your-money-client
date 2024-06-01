import React, { useState } from 'react'
import s from './ProfileNavigation.module.scss'

export default function ProfileNavigation({ firstName, lastName, photo, tabListSwitcher }) {
  const [mobileVisibility, setMobileVisibility] = useState(false);
  return (
    <div className={`${s.navigation} ${mobileVisibility ? s.open : ''}`}>
      <div className={s.profile}>
        <img src={`${photo ? photo : "./assets/images/svg/profile_icon.svg"}`} alt="Profile" />
        <h1>{firstName} {lastName}</h1>
      </div>
      <ul className={s.nav_list}>
        <li className={s.nav_item} onClick={() => {setMobileVisibility(!mobileVisibility); tabListSwitcher('dashboard')}}>
          <div className={s.nav_icon}>
            <img src="./assets/images/svg/statistic_icon.svg" alt="statistic" />
          </div>
          <p>Dahsboard</p>
        </li>
        <li className={s.nav_item} onClick={() => {setMobileVisibility(!mobileVisibility); tabListSwitcher('incomes')}}>
          <div className={s.nav_icon}>
            <img src="./assets/images/svg/incomes_icon.svg" alt="Incomes" />
          </div>
          <p>Incomes</p>
        </li>
        <li className={s.nav_item} onClick={() => {setMobileVisibility(!mobileVisibility); tabListSwitcher('expenses')}}>
          <div className={s.nav_icon}>
            <img src="./assets/images/svg/expenses_icon.svg" alt="Expenses" />
          </div>
          <p>Expenses</p>
        </li>
        <li className={s.nav_item} onClick={() => {setMobileVisibility(!mobileVisibility); tabListSwitcher('settings')}}>
          <div className={s.nav_icon}>
            <img src="./assets/images/svg/settings_icon.svg" alt="Settings" />
          </div>
          <p>Settings</p>
        </li>
      </ul>
      <div className={s.nav_btn} onClick={() => setMobileVisibility(!mobileVisibility)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
