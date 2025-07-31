import React, { useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { User } from '@/models/user';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  register: UseFormRegister<User>;
  errors: FieldErrors<User>;
}

const Login = ({register, errors} : Props) => {

  return (
    <div className='items-center justify-center text-center'>
      <p className='transactions-text mt-5'>Username</p>
          <input 
            {...register("user", {required: true})}
            className='input'>
          </input>
          {errors.user && <p>This field is required</p>}
          <p className='transactions-text mt-5'>Password</p>
          <input
            {...register("password", {required: true})}
            className='input'
            type="password">
          </input>  
          {errors.password && <p>This field is required</p>}
          <div className='mt-10'>
          <button
            type="submit"
            className='submit-button'>
            <ArrowDownCircleIcon className='h-10 w-10'></ArrowDownCircleIcon>
          </button>
      </div>
    </div>
  )
};

export default Login;