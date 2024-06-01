import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRegistrationMutation } from '../../../redux/authApi'
import { useNavigate } from 'react-router-dom'
import validationSchema from './validationSchema'

import Input from '../../../componets/UI/Input/Input'
import Button from '../../../componets/UI/Button/Button'
import Alert from '../../../componets/UI/Alert/Alert'

import s from './RegistrationForm.module.scss'

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [registration, {data, isError, isSuccess, error}] = useRegistrationMutation()
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
      await registration(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isError || isSuccess) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        if (isSuccess) {
          navigate('/login');
        }
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
          name='firstName'
          placeholder="Enter first name"
          register={register}
          error={errors.firstName}
          errorMessage={errors.firstName?.message}
        />
        <Input 
          type='text'
          name='lastName'
          placeholder="Enter last name"
          register={register}
          error={errors.lastName}
          errorMessage={errors.lastName?.message}
        />
        <Input 
          type='text'
          name='email'
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          errorMessage={errors.email?.message}
        />
        <Input 
          type='text'
          name='phone'
          placeholder="Enter your phone"
          register={register}
          error={errors.phone}
          errorMessage={errors.phone?.message}
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
      {showAlert && isSuccess && <Alert type='success'>{data.message}</Alert>}
      {showAlert && isError && <Alert type='error'>{error.data.message}</Alert>}
    </>
  )
}
