'use client'

import Login from '@/components/Login'
import Nav from '@/components/Nav'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex'>
        <Nav/>
        <Login/>
    </div>
  )
}

export default LoginPage