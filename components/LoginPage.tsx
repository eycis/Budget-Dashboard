import React, { useState } from 'react'
import ConfirmationModal from './confirmationModal';

const LoginPage = () => {
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const LoginUser = () => {
        setModalVisibility(true);
        //TODO:
        //add link to Dashboard
        
    }

    // const handleOpenModal = () => {
    //     setShowModal(true);
    // }

    const handleCloseModal = () => {
        setModalVisibility(false);
    }


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
        className='confirmationCloseButton p-3 w-1/5'
        onClick= {LoginUser}>
        Log In
        </button> 
        {modalVisibility && (
            <ConfirmationModal
            message={"You were logged in!"}
            onClose={handleCloseModal}
        />
      )}
    </div>
    </div>
  )
}

export default LoginPage