'use client'

import AnomaliesKPI from '@/components/charts/AnomaliesKPI'
import CashFlow from '@/components/charts/CashFlow'
import ExpensesVIncome from '@/components/charts/ExpensesVIncome'
import InvestmentInTime from '@/components/charts/InvestmentInTime'
import TopExpenses from '@/components/charts/TopExpenses'
import MonthView from '@/components/MonthView'
import Nav from '@/components/Nav'
import { isSameMonth } from '@/lib/calculations/isSameMonth'
import { Transaction } from '@/models/transaction'
import { getTransactions } from '@/Services/getTransactionsService'
import React, { useEffect, useState } from 'react'

const StatisticsPage = () => {

    const [ allTransactions, setAllTransactions] = useState<Transaction[]>();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const currentMonth : number = new Date().getMonth() + 1;
    const currentYear : number = new Date().getFullYear();
    const prevYear : number = new Date().getFullYear();
  
    const fetchData = async() => {
        const data = await getTransactions();
        if(data.data){
          setAllTransactions(data.data);
          setTransactions(data.data);
        }
      }
    
    useEffect(() => {
      fetchData();
    }, []);
    
    //TODO: async 
    //TODO: setTransactions according to selected month and send it via parameter in {} props
    const  handleMonthChange = (month: number) => {
      if(!allTransactions) return;

      const year : number = month > currentMonth ? prevYear : currentYear;

      const filtered = allTransactions.filter((transaction) =>
        isSameMonth(transaction.date, month, year)
      );
      
      console.log(filtered);
      setTransactions(filtered);
    }


    return (
        <div className="flex">
        <Nav />
        <div className='bg-[#1c1c1e] w-full min-h-screen p-5'>
        <div className='dashboard-main'> Statistics </div>
        <div className='grid grid-cols-2 gap-2 mt-8'>
        <div>
        <p className='font-title text-white ml-5 mb-2'>Top 5 Expenses</p>
        <div className='statisticsTables' data-aos="fade-up">
        <TopExpenses transactions = {transactions}/>
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
        <ExpensesVIncome transactions = {transactions}/>
        </div>
        </div>
        <div>
        <p  className='font-title text-white ml-5 mb-2 mt-3'>Investments in Time</p>
        <div className='statisticsTables' data-aos="fade-up">
        <InvestmentInTime transactions = {transactions}/>
        </div>
        </div>
        </div>
        </div>
        <MonthView onSelectMonth={handleMonthChange}/>
        </div>
        </div>
    )
}

export default StatisticsPage