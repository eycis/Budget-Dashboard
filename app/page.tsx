'use client'

import React from 'react'
import Dashboard from '@/components/Dashboard';
import Nav from '@/components/Nav';

const Home = () => {
  return(
    <div className="flex">
      <Nav />
      <Dashboard />
    </div>
  )
}

export default Home