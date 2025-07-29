'use client'
import Nav from '@/components/Nav'
import React, { useEffect, useState } from 'react'
import { Transaction } from '@/models/transaction';
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { getTransactions } from '@/Services/getTransactionsService';
import { saveTransaction } from '@/Services/SaveTransactionService';
import { useToast } from '@/components/ToastProvider';
import TransactionTable from '@/components/TransactionTable';
import { useForm } from 'react-hook-form';
import TransactionForm from '@/components/TransactionForm';


const Input = () => {
  
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const {showToast} = useToast();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Transaction>();


    const onSubmit = async(data: Transaction) => {
      try{
        const result : boolean = await saveTransaction(data);

        if(result === true){
          //TODO: update Transactions
          await fetchData();
          reset();
          showToast("Transaction saved successfully!", "success");
        }else{
          showToast("Error while saving the data", "error");
        }
      }catch(error){
        showToast("Internal Server Error", "error");
      }
    }

    const fetchData = async() => {
        const result = await getTransactions();
        if(result.data){
          const sorted : Transaction []= result.data.sort((a, b)=> {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          });
          setTransactions(sorted);
        }else{
          showToast("Error while saving the data", "error");
        }
      }
    
    useEffect(() => {
      fetchData();
    }, []);

    return (
      <div className="flex">
        <Nav />
        <div className="bg-[#1c1c1e] h-screen w-full flex flex-col overflow-hidden">
          <div className="dashboard-main">New Transaction</div>
    
          {/* FORM */}
          <div className="p-5 max-w-6xl mx-auto w-full">
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TransactionForm register={register} errors={errors} />
            </form>
            </div>
          </div>
    
          {/* TABULKA */}
          <div className="flex-1 px-5">
            <TransactionTable transactions={transactions} />
          </div>
        </div>
      </div>
    )
  }
    

export default Input;

