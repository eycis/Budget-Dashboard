import React from 'react'

const LoginPage = () => {
  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
        <h1 className='dashboard-main'> Log In </h1>
        <p className='transactions-text mt-5'>Username</p>
        <input 
        className='ml-10 px-5 w-1/4 h-10 rounded-2xl bg-[#2a2a2c] text-white text-lg font-title'>
        </input>
        <p className='transactions-text mt-5'>Password</p>
        <input
        className='ml-10 px-5 w-1/4 h-10 rounded-2xl bg-[#2a2a2c] text-white text-lg font-title'>
        </input>  
        <div className='mt-5 ml-24'>
        <button
        className='confirmationCloseButton p-3 w-1/5'>
        Log In
        </button> 
    </div>
    </div>
  )
}

export default LoginPage