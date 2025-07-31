import React, { useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { User } from '@/models/user';

interface Props {
  register: UseFormRegister<User>;
  errors: FieldErrors<User>;
}

const Login = ({register, errors} : Props) => {

  return (
    <div>
      <p className='transactions-text mt-5'>Username</p>
          <input 
            {...register("user", {required: true})}
            className='input'>
          </input>
          {errors.user && <p>This field is required</p>}
          <p className='transactions-text mt-5'>Password</p>
          <input
            {...register("password", {required: true})}
            className='input'>
          </input>  
          {errors.password && <p>This field is required</p>}
          <div className='mt-5 ml-24'>
          <button
            type="submit"
            className='submit-button'>
            Log In
          </button>
      </div>
    </div>
  )
};

export default Login;