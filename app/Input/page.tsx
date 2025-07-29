'use client'
import Nav from '@/components/Nav'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Transaction } from '@/models/transaction';
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { getTransactions } from '@/Services/getTransactionsService';
import { saveTransaction } from '@/Services/SaveTransactionService';

const Input = () => {
  
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('Expense');
    const [options, setOptions] = useState<string[]>([]);
    const [saveState, setSaveState] = useState<boolean>(false);


    const updateOptions = (value: string) => {
      if (value === 'Savings & Investment') {
        setOptions(['Savings', 'Investment']);
      }else if(value === "Income"){
          setOptions(['Income', 'Second job', 'other'])
      } 
      else {
        setOptions(['Utilities', 'Fun', 'Friends', 'Clothes', 'Health', 'Transportation', 'Other']);
      }
    };

    const handleSelectedValue = (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setSelectedValue(value);
      updateOptions(value);
    }

    const submitTransaction= async () => {  
          const newTransaction: Transaction = {
              category: (document.getElementById('category') as HTMLSelectElement).value,
              type: (document.getElementById('transactionType') as HTMLSelectElement).value,
              amount: parseFloat((document.getElementById('transactionAmount') as HTMLInputElement).value),
              //TODO: fix date format
              date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2,'0')}`,
              description: (document.getElementById('transactionDescription') as HTMLInputElement).value
          };

          console.log(newTransaction);

          const isSaved = await saveTransaction(newTransaction);

          if (isSaved == true) {
            console.log("data was successfully saved!");
            await fetchData(); 
            setSaveState(true);
          } else {
            console.error("error while sendind the data.");
            setSaveState(false);
          }
          }
        
        useEffect(() => {
          updateOptions(selectedValue);
        }, [selectedValue]);

        const fetchData = async() => {
            const data = await getTransactions();
            if(data.data){
              setTransactions(data.data);
            }
          }
        
        useEffect(() => {
          fetchData();
        }, []);

  return (
    <div className="flex">
      <Nav />
        <div className='bg-[#1c1c1e] min-h-screen relative w-full overflow-hidden'>
          <div className='dashboard-main'> New Transaction </div>
          <div className='grid grid-cols-5 gap-3 justify-items-center w-full max-w-6xl mx-auto p-5'>
          <div>
                {/* <p className='transactions-text'> Please</p> */}
                <select
                      name = "type"
                      className="p-2 rounded-2xl w-[12rem] bg-[#2a2a2c] text-white font-title"
                      id = "transactionType"
                      value = {selectedValue}
                      onChange = {handleSelectedValue}
                    >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
                <option value="Savings & Investment">Savings & Investment</option>
                <option value="Other">Other</option>
              </select>
            </div>
          <div>
          {/* <p className='transactions-text'> Select the category </p> */}
          <select
                name = "type"
                className="p-2 rounded-2xl bg-[#2a2a2c] w-[12rem] text-white font-title"
                id = "category"
                >
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
                </select>
            </div>
            <div>
            {/* <p className='transactions-text'>Select the amount</p> */}
                <input 
                    name = "amount"
                    id = "transactionAmount"
                    className='p-2 rounded-2xl bg-[#2a2a2c] w-[12rem] text-white font-title'
                    placeholder='0,-'>
                </input>
            </div>
          <div>
          {/* <p className='transactions-text'> Add your description</p> */}
                <input 
                    name = "description"
                    id = "transactionDescription"
                    placeholder='description'
                    maxLength={25}
                    className='p-2 rounded-2xl bg-[#2a2a2c] w-[12rem] text-white font-title'
                    >
                </input>
                </div>
            <button 
                onClick={submitTransaction}
                className='font-title text-white hover:text-[#3a3aa3] transition-colors 
                    duration-500 '>
                <CheckCircleIcon className='w-10 h-10' />
            </button>
          </div>
          <p className='transactions-text mt-5 justify-center text-center' data-aos="fade-down"> Your previous transactions</p>
          <div className='transaction-table overflow-y-auto max-h-[500px]'>
            <div className='grid grid-cols-5 gap-5 text-center justify-center pt-5' data-aos="fade-down">
                <label className='transactions_columns'>Date</label>
                <label className='transactions_columns'>Transaction Type</label>
                <label className='transactions_columns'>Category</label>
                <label className='transactions_columns'>Amount</label>
                <label className='transactions_columns'>Description</label>
            </div>
            {transactions.map((transaction, index) =>(
                <div key = {index}
                    className='grid grid-cols-5 gap-5 m-3 text-center items-center bg-[#1c1c1e] rounded-lg hover:bg-[#3a3aa3] transition-colors transition-500 '>
                    <div className='transactionsTableText'>{new Date(transaction.date).toLocaleDateString('cs-CZ')}</div>
                    <div className='transactionsTableText'>{transaction.type}</div>
                    <div className='transactionsTableText'>{transaction.category}</div>
                    <div className='transactionsTableText'>{transaction.amount}</div>
                    <div className='transactionsTableText'>{transaction.description || "-"}</div>
                </div>
            ))}
            </div>
          </div>
      </div>
  )
}

export default Input;