import { Transaction } from '@/models/transaction';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import React, { useEffect, useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface Props{
    register: UseFormRegister<Transaction>;
    errors: FieldErrors<Transaction>;
}

const TransactionForm = ({register, errors}: Props) => {

    const options: string[] = ['Utilities', 'Fun', 'Friends', 'Clothes', 'Health', 
            'Transportation', 'Other', 'Salary', 'Second Job', 'Other', 'Savings', 'Investment'];

  return (
    <div>
        <div className='grid grid-cols-5 gap-3 justify-items-center w-full max-w-6xl mx-auto p-3'>
        <div>
        <select 
            className="p-2 rounded-2xl w-[12rem] bg-[#2a2a2c] text-white font-title"
            {...register("type", {required: true})}>
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
                <option value="Savings & Investment">Savings & Investment</option>
              </select>
              {errors.type && <p>This field is required</p>}
            </div>
          <div>
          <select
            className="p-2 rounded-2xl bg-[#2a2a2c] w-[12rem] text-white font-title"
            {...register("category", {required: true})}>
            {errors.category && <p>This field is required</p>}
                {options?.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
                </select>
            </div>
            <div>
                <input 
                    {...register("amount", {required: true})}
                    className='p-2 rounded-2xl bg-[#2a2a2c] w-[12rem] text-white font-title'
                    placeholder='0,-'>
                </input>
                {errors.category && <p>This field is required</p>}
            </div>
          <div>
            <input 
                {...register("description", {required: true})}
                placeholder='Description'
                maxLength={25}
                className='p-2 rounded-2xl bg-[#2a2a2c] w-[12rem] text-white font-title'
                >
            </input>
            {errors.category && <p>This field is required</p>}
            </div>
            <button type="submit" className="font-title text-white hover:text-[#3a3aa3] transition-colors duration-500">
                <CheckCircleIcon className="w-10 h-10" />
              </button>
        </div>
    </div>
  )
}

export default TransactionForm