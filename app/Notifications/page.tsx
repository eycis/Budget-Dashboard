'use client'

import Nav from '@/components/Nav'
import NotificationSettings from '@/components/NotificationSettings'
import React from 'react'

const NotificationPage = () => {
  return (
    <div className='flex'>
        <Nav/>
        <NotificationSettings/>
    </div>
  )
}

export default NotificationPage