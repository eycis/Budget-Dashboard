import React, { useState } from 'react'
import ConfirmationModal from './confirmationModal';
import { getLoginUser } from '@/Services/loginUserService';
import {user} from "@/models/user"

const LoginPage = () => {
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [loginState, setLoginState] = useState<boolean>(false);

    const LoginUser = async () => {
        const user : string = (document.getElementById("user") as HTMLInputElement).value
        const password : string = (document.getElementById("password") as HTMLInputElement).value
        console.log(user);
        console.log(password);
        const result = await getLoginUser({user, password});
        if(!result){
          console.log(result)
          setLoginState(true);
        } 
        setModalVisibility(true);
        
        //TODO:
        //add link to Dashboard, login user- change the visibility of the button to false, display page with logoff option. 
        //all buttons on nav should not be visible until the status of logged is true. 
        
    }

    const handleCloseModal = () => {
        setModalVisibility(false);
    }


  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
        <h1 className='dashboard-main'> Log In </h1>
        <p className='transactions-text mt-5'>Username</p>
        <input 
        className='loginInput'
        name = 'user'
        id = 'user'>
        </input>
        <p className='transactions-text mt-5'>Password</p>
        <input
        className='loginInput'
        name = 'password'
        id = 'password'>
        </input>  
        <div className='mt-5 ml-24'>
        <button
        className='confirmationCloseButton p-3 w-1/5'
        onClick= {LoginUser}>
        Log In
        </button> 
        {modalVisibility && (
            <ConfirmationModal
            message= {loginState? "You were logged in! :) " : "there is something wrong :("}
            onClose={handleCloseModal}
        />
      )}
    </div>
    </div>
  )
}

export default LoginPage