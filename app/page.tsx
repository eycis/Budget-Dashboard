'use client'

import React, { useEffect, useState } from 'react'
import { WalletIcon, CurrencyDollarIcon, BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
import DashboardNotifications from '@/components/DashboardNotifications';
import { getTransactions } from '@/Services/getTransactionsService';
import { Transaction } from '@/models/transaction';
import Nav from '@/components/Nav';
import ExpensesDivided from '@/components/charts/ExpensesDivided';
import TransactionsType from '@/components/charts/TransactionsType';
import { getNotifications } from '@/Services/getNotificationsService';
import { Notification } from '@/models/notification';
import { PlusIcon } from '@heroicons/react/24/solid';
import { isSameMonth } from '@/lib/calculations/isSameMonth';
import Switch from '@mui/material/Switch';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [monthView, setMonthView] = useState<boolean>(false);

  const currentMonth = new Date().getMonth() + 1;

  const currentYear = new Date().getFullYear();
  
  const fetchTransactions = async() => {
    const result = await getTransactions();
    if(result.data){
      setTransactions(result.data);
    }
  }

  const fetchNotifications = async() => {
    const result = await getNotifications();
    if(result.data){
      setNotifications(result.data);
    }
  }
  
  useEffect(() => {
    fetchNotifications();
    fetchTransactions();
  }, []);

  //TODO: fix only for current month? 
  let totalExpenses : number = transactions.filter(transaction => transaction.type === "Expense")
  .reduce((sum, transaction) => sum+ transaction.amount, 0);

  let totalIncome : number = transactions.filter(transaction => transaction.type === "Income")
  .reduce((sum, transaction) => sum+ transaction.amount, 0);

  let balance : number  = totalIncome - totalExpenses;

  let investment : number = transactions.filter(transaction => transaction.type === "Savings & Investment")
  .reduce((sum, transaction) => sum + transaction.amount, 0);  

    if(monthView == true)
    {
      investment = transactions.filter(transaction => transaction.type === "Savings & Investment" 
          && isSameMonth(transaction.date, currentMonth, currentYear))
          .reduce((sum, transaction) => sum + transaction.amount, 0);

      totalExpenses = transactions.filter(transaction => transaction.type === 'Expense'
          && isSameMonth(transaction.date, currentMonth, currentYear))
          .reduce((sum, transaction) => sum + transaction.amount, 0);

      totalIncome = transactions.filter(transaction => transaction.type === 'Income' 
        && isSameMonth(transaction.date, currentMonth, currentYear))
        .reduce((sum, transaction) => sum + transaction.amount, 0);

        balance  = totalIncome - totalExpenses;
    }
  

  return (
    <div className="flex">
      <Nav />
        <div className='bg-[#1c1c1e] min-h-screen  w-full relative overflow-hidden'>
          <div className='dashboard-main'> Dashboard </div>
          <div className='absolute right-72 top-12 '>
          <Switch checked={monthView} onChange={() => setMonthView(!monthView)} />
                  <span className="font-title text-white text-sm ml-2">{monthView ? 'Month View' : 'All Records'}</span></div>
          <button onClick={() => {window.location.href = "/Notifications"}}>
            <PlusIcon className='absolute right-10 top-12 h-8 w-8  text-white hover:text-[#3a3aa3] transition-colors 
                    duration-500 '/>
          </button>
            {/* Hlavní grid pro dlaždice */}
            <div className='grid grid-cols-5 gap-3 w-full px-5'> 
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
                <DashboardNotifications notifications={notifications}/>
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