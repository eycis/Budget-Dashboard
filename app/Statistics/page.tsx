'use client'

import AnomaliesKPI from '@/components/charts/AnomaliesKPI'
import CashFlow from '@/components/charts/CashFlow'
import ExpensesVIncome from '@/components/charts/ExpensesVIncome'
import InvestmentInTime from '@/components/charts/InvestmentInTime'
import TopExpenses from '@/components/charts/TopExpenses'
import Nav from '@/components/Nav'
import Statistics from '@/components/Statistics'
import { Transaction } from '@/models/transaction'
import { getTransactions } from '@/Services/getTransactionsService'
import React, { useEffect, useState } from 'react'

const StatisticsPage = () => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
  
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
          {/* <Statistics /> */}
          <div className='bg-[#1c1c1e] w-full min-h-screen p-5'>
      <div className='dashboard-main'> Statistics </div>
      <div className='grid grid-cols-2 gap-2 mt-8'>
        <div>
        <p className='font-title text-white ml-5 mb-2'>Top 5 Expenses</p>
        <div className='statisticsTables' data-aos="fade-up">
        <TopExpenses/>
        </div>
        </div>
        <div>
        <div>
        <p className='font-title text-white ml-5 mb-2'> Statistics KPI</p>
        <div className='grid grid-cols-3 gap-2'>
        <AnomaliesKPI transactions = {transactions}/>
        <CashFlow transactions={transactions} />
        </div>
        <p className='font-title text-white ml-5 mb-2 mt-3'>Ratio of Investments, Expenses, and Income</p>
        <div className='statisticsTables' data-aos="fade-up">
        <ExpensesVIncome/>
        </div>
        </div>
        <div>
        <p  className='font-title text-white ml-5 mb-2 mt-3'>Investments in Time</p>
        <div className='statisticsTables' data-aos="fade-up">
        <InvestmentInTime/>
        </div>
        </div>
        </div>
        </div>
        <div>
        {/* <p  className='font-title text-white ml-5 mt-10 mb-2' >Prediction of Balance</p>
        <div className='col-span-1 bg-[#2a2a2c] rounded-3xl p-3' data-aos="fade-right">
        <PredictionChart/>
        </div> */}
        </div>
        </div>
        </div>
    )
}

export default StatisticsPage