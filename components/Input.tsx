import React, { useState } from 'react'
import { Transaction } from '@/models/transation';

const Input = () => {

    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);

    const submitTransaction= () => {
        const newTransaction: typeof Transaction = {
            ...Transaction,
            id: transactions.length + 1,
            category: "kategorie",
            type: (document.getElementById('transactionType') as HTMLSelectElement).value,
            amount: parseFloat((document.getElementById('transactionAmount') as HTMLInputElement).value),
            date: Date.now(),
            description: "popis"
        };

            const updatedTransactions = [...transactions, newTransaction];
            setTransactions(updatedTransactions);
            console.log("transaction:", newTransaction);
            console.log("you saved your transaction");
        }

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <div className='dashboard-main'> New Transaction </div>
      <div className='grid grid-cols-3 gap-3'>
    <div>
      <div className='transactions-text'> Please select the type of transaction </div>
      <select
            name = "type"
            className="ml-10 px-5 w-2/4 h-14 rounded-2xl bg-[#2a2a2c] text-white text-xl font-title"
            id = "transactionType"
            // onChange={(e) => setSelectedEmployer(e.target.value)}
          >
            <option value="Výdaj">Výdaj</option>
            <option value="Příjem">Příjem</option>
            <option value="Jiné">Jiné</option>
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
      </div>
      <div className='transactions-text mt-10'> Your previous transactions</div>
      <div className='transaction-table'>

      </div>
      </div>
  )
}

export default Input;