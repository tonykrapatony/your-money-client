import React, { useEffect, useState } from 'react'
import { useGetUserQuery, useUpdateUserMutation } from '../../../../redux/usersApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validationSchema';
import UserDataItem from './UserDataItem/UserDataItem'

import Alert from '../../../../componets/UI/Alert/Alert';

import s from './UserData.module.scss'
import Button from '../../../../componets/UI/Button/Button';

export default function UserData({ data }) {
  const {refetch: refetchUserData} = useGetUserQuery(data._id);

  const [updateUser, {data: updatedUser, isSuccess: updatedSuccess, isError, error: updatedUserError}] = useUpdateUserMutation();

  const [isEdit, setIsEdit] = useState(false);
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
    setIsEdit(!isEdit);
    try {
      await updateUser({id: data._id, ...e});
      Object.keys(data).forEach(element => {
        resetField(element);
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (updatedSuccess || updatedUserError) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        refetchUserData()
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [updatedSuccess, updatedUserError])
  return (
    <div className={s.profile_data}>
      {showAlert && updatedSuccess && <Alert type='success'>{updatedUser.message}</Alert>}
      {showAlert && isError && <Alert type='error'>{updatedUserError.data.message}</Alert>}
      <p className={s.title}>User data:</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UserDataItem
          isEdit={isEdit}
          title="First name"
          value={data.firstName}
          resetField={() => resetField('firstName')}
          type='text'
          name='firstName'
          placeholder={data.firstName}
          register={register}
          error={errors.firstName}
          errorMessage={errors.firstName?.message}
        />
        <UserDataItem
          isEdit={isEdit}
          title="Last name"
          value={data.lastName}
          resetField={() => resetField('lastName')}
          type='text'
          name='lastName'
          placeholder={data.lastName}
          register={register}
          error={errors.lastName}
          errorMessage={errors.lastName?.message}
        />
        <UserDataItem
          isEdit={isEdit}
          title="Email"
          value={data.email}
          resetField={() => resetField('email')}
          type='text'
          name='email'
          placeholder={data.email}
          register={register}
          error={errors.email}
          errorMessage={errors.email?.message}
        />
        <UserDataItem
          isEdit={isEdit}
          title="Phone"
          value={data.phone}
          resetField={() => resetField('phone')}
          type='text'
          name='phone'
          placeholder={data.phone}
          register={register}
          error={errors.phone}
          errorMessage={errors.phone?.message}
        />
        <UserDataItem
          isEdit={isEdit}
          title="Currency"
          value={data.currency}
          resetField={() => resetField('currency')}
          type='select'
          name='currency'
          placeholder={data.currency}
          register={register}
          error={errors.currency}
          errorMessage={errors.currency?.message}
        />
        <Button type='button' onclick={() => setIsEdit(!isEdit)}>
          {!isEdit ? <>
            Edit
            <img src="./assets/images/svg/edit_icon.svg" alt="save" width={20} height={20} />
          </> : <>
            Cancel
            <img src="./assets/images/svg/cancel_icon.svg" alt="save" width={20} height={20} />
          </>
          }
        </Button>
        {isEdit && <Button type='submit'>
          Save
          <img src="./assets/images/svg/save_icon.svg" alt="save" width={20} height={20} />
        </Button>}
      </form>
    </div>
  )
}
