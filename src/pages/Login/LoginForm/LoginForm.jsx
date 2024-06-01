import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../../../redux/authApi'
import { setUser } from '../../../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validationSchema';

import Input from '../../../componets/UI/Input/Input'
import Button from '../../../componets/UI/Button/Button'
import Alert from '../../../componets/UI/Alert/Alert';

import s from './LoginForm.module.scss'

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, {data, isError, isSuccess, error}] = useLoginMutation()
  console.log(error)
  const [showAlert, setShowAlert] = useState(false);

  const {
    register, 
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema())
  })

  const onSubmit = async (data) => {    
    try {
      await login(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isError || isSuccess) {
      setShowAlert(true);

      if (isSuccess) {
        const { token, userId } = data;
        dispatch(setUser({ token,  userId}));
        navigate('/profile');
      }

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isError, isSuccess])

  return (
    <>
      <form className={s.registration_form} autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Input 
          type='text'
          name='email'
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          errorMessage={errors.email?.message}
        />
        <Input 
          type='password'
          name='password'
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          errorMessage={errors.password?.message}
        />
        <Button type='submit'>Submit</Button>
      </form>
      {/* {showAlert && isError && <Alert type='error' >{error.data.message}</Alert>}     */}
    </>
  )
}
