import React from 'react'
import { Link } from 'react-router-dom'

import s from './NotFound.module.scss'

export default function NotFound() {
  return (
    <div className={s.not_found}>
      <div className={s.not_found_msg}>
        <div className={s.nail}></div>
        <div className={s.not_found_text}>
          <h2>404</h2>
          <p>Nothing to see here!</p>
          <p>
            <Link to="/">Go to the home page</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
