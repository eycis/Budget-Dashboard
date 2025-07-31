'use client'

import React, { useState } from 'react'
import { getLoginUser } from '@/Services/loginUserService';
import { useToast } from '@/components/ToastProvider';
import { useForm } from 'react-hook-form';
import { User } from '@/models/user';
import Login from '@/components/Login';

  const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const {showToast} = useToast();

    const onSubmit = async (data: User) => {

        const result = await getLoginUser(data);
        if(result){
          // setLoginStateMessage(true);
          // setLoginState(true);
          window.location.href = "/";
        }else{
          showToast("Incorrect username or password", "error");
        }
        
        //TODO:
        //add link to Dashboard, login user- change the visibility of the button to false, display page with logoff option. 
        //all buttons on nav should not be visible until the status of logged is true. 
        
    }

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
        <h1 className='dashboard-main'> Log In </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Login register={register} errors={errors} /> 
        </form>
    </div>
  )
}

export default LoginPage