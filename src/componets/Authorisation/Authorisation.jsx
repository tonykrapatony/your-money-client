import React from 'react'
import LinkButton from '../UI/LinkButton/LinkButton'

import s from './Authorisation.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../UI/Button/Button';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Authorisation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.auth);

  const logoutHandler = async () => {
    dispatch(logout());
    navigate('/');
  }

  return (
    <div className={s.authorisation}>
      {!isAuth && <>
        <LinkButton path="/login">
          Login
        </LinkButton>
        <LinkButton path="/registration">
          Registration
        </LinkButton>
      </>}
      {isAuth && <>
        <LinkButton path="/profile">
          Profile
        </LinkButton>
        <Button onclick={logoutHandler}>
          Logout
        </Button>
      </>}
    </div>
  )
}
