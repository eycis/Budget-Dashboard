import React, { useEffect, useState } from 'react'
import { WalletIcon, CurrencyDollarIcon, BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import transactionsData from '@/data/mock_data.json';
import { Transaction } from '@/models/transaction';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {

  //KPIs:

  const totalExpenses = transactionsData.transactions.filter(transaction => transaction.type === "expense")
  .reduce((sum, transaction) => sum+ transaction.amount, 0);

  const totalIncome = transactionsData.transactions.filter(transaction => transaction.type === "income")
  .reduce((sum, transaction) => sum+ transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  const investment = transactionsData.transactions.filter(transaction => transaction.type === "Savings & Investment")
  .reduce((sum, transaction) => sum + transaction.amount, 0);

  //--------------------------------------------------------------------------------------

  const [transactions, setTransactions] = useState<typeof Transaction[]>([]);

  const options:ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
          boxWidth: 20,
          padding: 15,
          color: 'white',
        },
      },
    },
  };

    useEffect(() => {
      // nahrání mock data
      setTransactions(transactionsData.transactions);
    }, []);
    
    // extrakce dat do proměnných:
    const dates = Array.from(new Set(transactions.map(transaction => new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }))));
    const incomeData = transactions.filter(transaction => transaction.type === 'income').map(transaction => transaction.amount);
    const expenseData = transactions.filter(transaction => transaction.type === 'expense').map(transaction => transaction.amount);
    const investmentData = transactions.filter(transaction => transaction.type === "Savings & Investment").map(transaction => transaction.amount)

    const data = {
      labels: dates,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: 'blue',
          fill: false,
        },
        {
          label: 'Expenses',
          data: expenseData,
          borderColor: 'red',
          fill: false,
        },
        {
          label: "Savings & Investment",
          data: investmentData,
          borderColor: 'green',
          fill: false,
        },
      ],
    };

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <div className='dashboard-main'> Dashboard </div>
      <div className='grid grid-cols-4 gap-3 pt-5 w-3/4'>
        <div className='dashboard-kpi' data-aos="fade-right">
          <WalletIcon className="kpi-icons" />
            <div className='kpi-name'>
              Balance
            </div>
          <div className='dashboard-figures'>
            {balance}$
          </div>
        </div>
        <div className='dashboard-kpi' data-aos="fade-right">
          <CurrencyDollarIcon className="kpi-icons" />
          <div className='kpi-name'>
            Income
          </div>
          <div className='dashboard-figures'>
            {totalIncome}$
          </div>
        </div>
        <div className='dashboard-kpi' data-aos="fade-right">
          <CreditCardIcon className="kpi-icons" />
          <div className='kpi-name'>
            Expenses
          </div>
          <div className='dashboard-figures'>
            {totalExpenses}$
          </div>
        </div>
        <div className='dashboard-kpi' data-aos="fade-right">
          <BanknotesIcon className="kpi-icons" />
          <div className='kpi-name'>
            Savings
          </div>
          <div className='dashboard-figures'>
            {investment}$
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5 w-3/4'>
      <div className='dashboard-lineplot' data-aos="fade-down">
        <Line data={data} options={options} className='px-2 mt-5' data-aos="fade-up" />
      </div>
      <div className='dashboard-lineplot' data-aos="fade-down">
        pie plot
      </div>
      </div>
      </div>
  )
}

export default Dashboard;