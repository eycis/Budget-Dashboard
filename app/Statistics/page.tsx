'use client'

import AnomaliesKPI from '@/components/charts/AnomaliesKPI'
import CashFlow from '@/components/charts/CashFlow'
import ExpensesVIncome from '@/components/charts/ExpensesVIncome'
import InvestmentInTime from '@/components/charts/InvestmentInTime'
import TopExpenses from '@/components/charts/TopExpenses'
import MonthView from '@/components/MonthView'
import Nav from '@/components/Nav'
import { useToast } from '@/components/ToastProvider'
import { isSameMonth } from '@/lib/calculations/isSameMonth'
import { Transaction } from '@/models/transaction'
import { getTransactions } from '@/Services/getTransactionsService'
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react'

const StatisticsPage = () => {

    const [ allTransactions, setAllTransactions] = useState<Transaction[]>();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const {showToast} = useToast();
  
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

    const resetView = () => {
      setTransactions(allTransactions!);
    }
    
    const  handleMonthChange = (month: number, year: number) => {
      if(!allTransactions) return;

      const filtered = allTransactions.filter((transaction) =>
        isSameMonth(transaction.date, month, year)
      );

      if(filtered.length === 0) {showToast("No data for selected parameters", "error")}
      
      setTransactions(filtered);
    }


    return (
        <div className="flex">
          <Nav />
          <div className='bg-[#1c1c1e] min-h-screen w-full relative overflow-hidden'>
            <div className='dashboard-main'> Statistics </div>
                <button
                  className='font-title text-white hover:text-[#3a3aa3] transition-colors 
                    duration-500 absolute right-20 top-10'
                  onClick={() => resetView()}>
                  <ArrowPathIcon className='w-7 h-7'/>
                </button>
                <div className='grid grid-cols-2 gap-2 mt-8 p-5 items-stretch flex-1 '>
                  <div className='flex flex-col h-full'>
                    <p className='statistics-labels'>Top 5 Expenses</p>
                      <div className='statisticsTables flex-1' data-aos="fade-up">
                        <TopExpenses transactions = {transactions}/>
                      </div>
                  </div>
                <div>
                  <div>
                    <p className='statistics-labels'> Statistics KPI</p>
                      <div className='grid grid-cols-3 gap-2'>
                        <AnomaliesKPI transactions = {transactions}/>
                        <CashFlow transactions={transactions} />
                      </div>
                    <p className='statistics-labels'>Ratio of Investments, Expenses, and Income</p>
                      <div className='statisticsTables' data-aos="fade-up">
                        <ExpensesVIncome transactions = {transactions}/>
                      </div>
                    </div>
                  <div>
                    <p  className='statistics-labels'>Investments in Time</p>
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