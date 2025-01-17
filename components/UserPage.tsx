import React from 'react'

const UserPage = () => {
    
    const logOff = async() => {
        console.log('youre logged off');
    }
  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
        UserPage
        <button
        onClick = {logOff}>
            Log Off
        </button>
    </div>
  )
}

export default UserPage