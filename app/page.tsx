'use client'

import React, { useEffect, useState } from 'react'
import { WalletIcon, CurrencyDollarIcon, BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
// import DashboardNotifications from './DashboardNotifications';
import { getTransactions } from '@/Services/getTransactionsService';
import { Transaction } from '@/models/transaction';
import Nav from '@/components/Nav';
import ExpensesDivided from '@/components/charts/ExpensesDivided';
import TransactionsType from '@/components/charts/TransactionsType';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {

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

  //TODO: fix only for current month? 
  const totalExpenses = transactions.filter(transaction => transaction.type === "Expense")
  .reduce((sum, transaction) => sum+ transaction.amount, 0);

  const totalIncome = transactions.filter(transaction => transaction.type === "Income")
  .reduce((sum, transaction) => sum+ transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  const investment = transactions.filter(transaction => transaction.type === "Savings & Investment")
  .reduce((sum, transaction) => sum + transaction.amount, 0);  

  return (
    <div className="flex">
      <Nav />
        <div className='bg-[#1c1c1e] min-h-screen  w-full relative overflow-hidden'>
          <div className='dashboard-main'> Dashboard </div>
            {/* Hlavní grid pro dlaždice */}
            <div className='grid grid-cols-5 gap-3 w-full p-5'> 
              {/* Levá část - KPIs a grafy */}
              <div className='col-span-4 grid grid-cols-4 gap-3'>
                {/* KPI dlaždice */}
                <div className='dashboard-kpi' data-aos="fade-right">
                  <WalletIcon className="kpi-icons" />
                  <div className='kpi-name pt-6'>
                    Balance
                  </div>
                  <div className='dashboard-figures'>
                    {balance}$
                  </div>
                </div>
                <div className='dashboard-kpi' data-aos="fade-right">
                  <CurrencyDollarIcon className="kpi-icons" />
                  <div className='kpi-name pt-6'>
                    Income
                  </div>
                  <div className='dashboard-figures'>
                    {totalIncome}$
                  </div>
                </div>
                <div className='dashboard-kpi' data-aos="fade-right">
                  <CreditCardIcon className="kpi-icons" />
                  <div className='kpi-name pt-6'>
                    Expenses
                  </div>
                  <div className='dashboard-figures'>
                    {totalExpenses}$
                  </div>
                </div>
                <div className='dashboard-kpi' data-aos="fade-right">
                  <BanknotesIcon className="kpi-icons" />
                  <div className='kpi-name'>
                    Savings & Investment
                  </div>
                  <div className='dashboard-figures'>
                    {investment}$
                  </div>
                </div>
                </div>
                {/* Pravá dlaždice pro připomínky následujících transakcí */}
                {/* <DashboardNotifications/> */}
                {/* Grafy */}
                <div className='dashboard-plots col-span-2' data-aos="fade-down">
                  <TransactionsType transactions = {transactions} />
                </div>
                <div className='dashboard-plots col-span-2 ' data-aos="fade-down">
                  <ExpensesDivided transactions = {transactions} />
                </div>
              </div>
            </div>
          </div>
  )
}

export default Dashboard;