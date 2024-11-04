import React, { useState } from 'react'
import { Transaction } from '@/models/transaction';
import ConfirmationModal from './confirmationModal';

const Input = () => {
  
    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const submitTransaction= () => {
        
        //TODO: pročistit kód, enkapsulace.
        const newTransaction: typeof Transaction = {
            ...Transaction,
            id: transactions.length + 1,
            category: (document.getElementById('category') as HTMLSelectElement).value,
            type: (document.getElementById('transactionType') as HTMLSelectElement).value,
            amount: parseFloat((document.getElementById('transactionAmount') as HTMLInputElement).value),
            date: Date.now().toString(),
            description: "popis"
        };
            handleOpenModal();
            setTransactions((prev) => [...prev, newTransaction]);
            console.log("transaction:", newTransaction);
        }

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <p className='dashboard-main'> New Transaction </p>
      <div className='grid grid-cols-4 gap-2'>
    <div>
      <div className='transactions-text'> Select the type of transaction </div>
      <select
            name = "type"
            className="ml-10 px-5 w-2/4 h-14 rounded-2xl bg-[#2a2a2c] text-white text-xl font-title"
            id = "transactionType"
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
            <option value="Savings & Investment">Savings & Investment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      <div>
      <div className='transactions-text'> Select the category of transaction </div>
      <select
            name = "type"
            className="ml-10 px-5 w-2/4 h-14 rounded-2xl bg-[#2a2a2c] text-white text-xl font-title"
            id = "category"
          >
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Fun">Fun</option>
            <option value="Friends">Friends</option>
            <option value="Clothes">Clothes</option>
            <option value="Healt">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
        <div className='transactions-text'> Please select the amount</div>
            <input 
                name = "amount"
                id = "transactionAmount"
                className='ml-10 px-5 w-3/4 h-14 rounded-2xl bg-[#2a2a2c] text-white text-xl font-title'
                placeholder='0,-'>
            </input>
        </div>
        <button 
            onClick={submitTransaction}
            className='input-button '>
            Submit
        </button>
        {showModal && (
            <ConfirmationModal
          //message="Your transaction was saved"
            onClose={handleCloseModal}
        />
      )}
      </div>
      <p className='transactions-text mt-10' data-aos="fade-down"> Your previous transactions</p>
      <div className='transaction-table'>
        <div className='grid grid-cols-5 ml-10 pt-5' data-aos="fade-down">
            <label>Date</label>
            <label>Transaction Type</label>
            <label>Category</label>
            <label>Amount</label>
            <label>Description</label>
        </div>
        {transactions.map((transaction, index) =>(
            <div key = {index}
                className='grid grid-cols-5 gap-36 mt-3 ml-5 h-max max-w-max items-center bg-[#1c1c1e] pt-3 pb-3 rounded-lg'>
                <div className='ml-4'>{new Date(transaction.date).toLocaleString()}</div>
                <div className='ml-4'>{transaction.type}</div>
                <div className='ml-4'>{transaction.category}</div>
                <div className='ml-4'>{transaction.amount}</div>
                <div>{transaction.description || "NA"}</div>
            </div>
        ))}
        </div>
      </div>
  )
}

export default Input;