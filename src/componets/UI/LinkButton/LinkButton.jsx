import React from 'react'
import { Link } from 'react-router-dom'

import s from "./LinkButton.module.scss";

export default function LinkButton({ path, children}) {
  return (
    <Link to={path} className={s.link_button}>
      <span>{children}</span>
    </Link>
  )
}
