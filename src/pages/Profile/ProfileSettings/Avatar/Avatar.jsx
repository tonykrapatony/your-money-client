import React, { useEffect, useState } from 'react'
import { useGetUserQuery, useUpdateUserMutation } from '../../../../redux/usersApi'
import avatarGenerator from '../../../../helpers/avatarGenerator'

import InputFile from '../../../../componets/UI/InputFile/InputFile'
import Button from '../../../../componets/UI/Button/Button'
import Alert from '../../../../componets/UI/Alert/Alert'

import s from './Avatar.module.scss'

export default function Avatar({ data }) {
  const { refetch: refetchUserData } = useGetUserQuery(data.userId);

  const [updateUser, { data: updatedUser, isSuccess: updatedSuccess, isError, error: updatedUserError }] = useUpdateUserMutation();

  const [showAlert, setShowAlert] = useState(false);

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const file = formData.get('photo');
    console.log(file);
    try {
      let img = await avatarGenerator(file);
      console.log(img);
      if (img) {
        try {
          await updateUser({ id: data.userId, photo: img });
          refetchUserData();
          event.target.reset();
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.error('Error while generating an avatar:', error);
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
    <div className={s.avatar}>
      {showAlert && updatedSuccess && <Alert type='success'>{updatedUser.message}</Alert>}
      {showAlert && isError && <Alert type='error'>{updatedUserError.data.message}</Alert>}
      <p className={s.title}>Avatar:</p>
      <img
        src={`${data.photo ? data.photo : "./assets/images/svg/profile_icon.svg"}`}
        alt="profile avatar"
      />
      <form onSubmit={handleUpload}>
        <InputFile name='photo' />
        <Button type='submit'>
          Upload
        </Button>
      </form>
    </div>
  )
}
