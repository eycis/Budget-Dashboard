import React, { useEffect, useState } from 'react'
import { WalletIcon, CurrencyDollarIcon, BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
import transactionsData from '@/data/mock_data.json';
import LineChart from '@/components/charts/LineChart';
import DoughnutChart from './charts/DoughnutChart';
import NotificationData from './Notifications';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {

  const [notifications, setNotification] = useState<typeof Notification[]>([]);
  useEffect(() => {
    // nahrání mock data
    // setNotification(NotificationData.notifications);
  }, []);


  //KPIs:

  const totalExpenses = transactionsData.transactions.filter(transaction => transaction.type === "expense")
  .reduce((sum, transaction) => sum+ transaction.amount, 0);

  const totalIncome = transactionsData.transactions.filter(transaction => transaction.type === "income")
  .reduce((sum, transaction) => sum+ transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  const investment = transactionsData.transactions.filter(transaction => transaction.type === "Savings & Investment")
  .reduce((sum, transaction) => sum + transaction.amount, 0);  

 
  //-------------------------------------------------------------------------------------

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <p className='dashboard-main'> Dashboard </p>
      
      {/* Hlavní grid pro dlaždice */}
      <div className='grid grid-cols-5 gap-3 w-full'>
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
          <div className='row-span-2 bg-[#2a2a2c] text-white rounded-lg px-1 overflow-y-auto' data-aos="fade-left">
            <h2 className='font-title text-xl text-center font-bold text-white mt-5'>Upcoming Payments</h2>
              <div className='bg-[#444447] hover:bg-[#3a3aa3] transition-colors duration-500 h-min w-full rounded-xl mt-3'>
                <p className='h-1/3 w-full font-title text-center pt-2 text-sm'>- Due 15. 10. 2024 - </p>
                <p className='h-2/3 w-full text-2xl font-title text-center mt-1 pb-2'> car payment </p>
              </div>
            </div>
          
          {/* Grafy */}
          <div className='dashboard-plots col-span-2' data-aos="fade-down">
            <LineChart />
          </div>
          <div className='dashboard-plots col-span-2' data-aos="fade-down">
            <DoughnutChart />
          </div>
          </div>
          </div>
  )
}

export default Dashboard;