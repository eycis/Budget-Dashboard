import { Transaction } from '@/models/transaction';
import React from 'react'

interface Props {
    transactions : Transaction[];
}

const TransactionTable = ({transactions} : Props) => {
  return (
    <div>
        <p className='transactions-text justify-center text-center' data-aos="fade-down"> Your previous transactions</p>
          <div className='transaction-table overflow-y-auto max-h-[500px]'>
            <div className='grid grid-cols-5 gap-5 text-center justify-center pt-3' data-aos="fade-down">
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
  )
}

export default TransactionTable