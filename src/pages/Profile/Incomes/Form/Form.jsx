import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import validationSchema from './validationSchema'
import { useAddIncomeMutation, useGetUserIncomeQuery } from '../../../../redux/incomesApi'

import Button from '../../../../componets/UI/Button/Button'
import Input from '../../../../componets/UI/Input/Input'
import Alert from '../../../../componets/UI/Alert/Alert'

import s from './Form.module.scss'

export default function Form({ userId }) {

  const { refetch: refetchIncomes } = useGetUserIncomeQuery(userId);
  const [addIncome, { data: addedIncome, isLoading, isSuccess, isError, error }] = useAddIncomeMutation(userId)
  const [showAlert, setShowAlert] = useState(false);

  const {
    resetField,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema())
  })

  const onSubmit = async (data) => {
    data.userId = userId;
    try {
      await addIncome(data);
      Object.keys(data).forEach(element => {
        resetField(element);
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isError || isSuccess) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        refetchIncomes();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isError, isSuccess])

  return (
    <>
      {showAlert && isError && <Alert type='error'>{error.data.message}</Alert>}
      {showAlert && isSuccess && <Alert type='success'>{addedIncome.message}</Alert>}
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='date'
          name='date'
          placeholder="Enter date"
          register={register}
          error={errors.date}
          errorMessage={errors.date?.message}
        />
        <Input
          type='text'
          name='title'
          placeholder="Enter title"
          register={register}
          error={errors.title}
          errorMessage={errors.title?.message}
        />
        <Input
          type='text'
          name='value'
          placeholder="Enter value"
          register={register}
          error={errors.value}
          errorMessage={errors.value?.message}
        />
        <Button type='submit'>Add income</Button>
      </form>
    </>
  )
}
