import React, { useEffect, useState } from 'react'
import Avatar from './Avatar/Avatar';
import Security from './Security/Security';
import UserData from './UserData/UserData';

import s from './ProfileSettings.module.scss'


export default function ProfileSettings({ user }) {

  return (
    <div className={s.settings}>
      <div className={s.title}>
        <p>Settings</p>
      </div>
      <div className={s.profile_info} >
        <Avatar data={user} />
        <UserData data={user}/>
        <Security data={user}/>
      </div>
    </div>
  )
}
