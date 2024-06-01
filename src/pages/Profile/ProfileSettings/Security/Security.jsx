import React, { useEffect, useState } from 'react'

import Button from '../../../../componets/UI/Button/Button'

import s from './Security.module.scss'
import Input from '../../../../componets/UI/Input/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchema from './validationSchema'
import { useGetUserQuery, useUpdateUserPasswordMutation } from '../../../../redux/usersApi'
import Alert from '../../../../componets/UI/Alert/Alert'

export default function Security({ data }) {
  const {refetch: refetchUserData} = useGetUserQuery(data._id);
  const [updateUserPassword, {data: updatedPassword, isSuccess, isError, error}] = useUpdateUserPasswordMutation()
  console.log(isSuccess);
  console.log(error)
  const [showAlert, setShowAlert] = useState(false);
  const {
    resetField,
    register, 
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema())
  })

  const onSubmit = async (e) => {
    console.log(data._id)
    try {
      await updateUserPassword({id: data._id, ...e});
      Object.keys(e).forEach(element => {
        console.log(element)
        resetField(element);
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSuccess || isError) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        refetchUserData()
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isSuccess, isError])

  return (
    <div className={s.security}>
      {showAlert &&  isError && <Alert type='error'>{error.data.message}</Alert>}
      {showAlert &&  isSuccess && <Alert type='success'>{updatedPassword.message}</Alert>}
      <p className={s.title}>Security:</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          type='password'
          name='password'
          placeholder='Enter old password'
          register={register}
          error={errors.password}
          errorMessage={errors.password?.message}
          resetField={resetField}
        />
        <Input 
          type='password'
          name='newpassword'
          placeholder='Enter new password'
          register={register}
          error={errors.newpassword}
          errorMessage={errors.newpassword?.message}
          resetField={resetField}
        />
        <Button type='submit'>
          Change password
        </Button>
      </form>
    </div>
  )
}
