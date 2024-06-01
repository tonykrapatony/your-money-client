import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/HomePage/HomePage'
import Login from '../../pages/Login/Login'
import Registration from '../../pages/Registration/Registration'
import Profile from '../../pages/Profile/Profile'
import NotFound from '../../pages/NotFound/NotFound'

import s from './PageContainer.module.scss'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function PageContainer() {
  return (
    <div className={s.page_container}>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/registration' element={<Registration />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer />
    </div>
  )
}
