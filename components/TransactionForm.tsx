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
            'Transportation', 'Other', 'Salary', 'Second Job', 'Savings', 'Investment'];

  return (
    <div>
        <div className='grid grid-cols-5 gap-3 justify-items-center w-full max-w-6xl mx-auto p-3'>
        <div>
        <select 
            className="input"
            {...register("type", {required: true})}>
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
                <option value="Savings & Investment">Savings & Investment</option>
              </select>
              {errors.type && <p>This field is required</p>}
            </div>
          <div>
          <select
            className="input"
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
                    className='input'
                    placeholder='0,-'>
                </input>
                {errors.category && <p>This field is required</p>}
            </div>
          <div>
            <input 
                {...register("description", {required: true})}
                placeholder='Description'
                maxLength={25}
                className='input'
                >
            </input>
            {errors.category && <p>This field is required</p>}
            </div>
            <button type="submit" className="submit-button">
                <CheckCircleIcon className="w-10 h-10" />
              </button>
        </div>
    </div>
  )
}

export default TransactionForm