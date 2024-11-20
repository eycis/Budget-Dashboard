import React, { useEffect, useState } from 'react'
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import Switch from '@mui/material/Switch';
import { colors } from '@mui/material';



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const LineChart = () => {

    const currentMonth = new Date().getMonth() + 1;

    let currentYear = new Date().getFullYear();

    const[monthView, setMonthView] = useState(false);
    
    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);
    useEffect(() => {
      // nahrání mock data
      setTransactions(transactionsData.transactions);
    }, []);

    const lineOptions:ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              usePointStyle: true,
              pointStyle: 'line',
              boxWidth: 10,
              padding: 10,
              color: 'white',
            },
          },
        },
      };

    const dates = Array.from(new Set(transactions.map(transaction => new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }))));
    let incomeData = transactions.filter(transaction => transaction.type === 'income').map(transaction => transaction.amount);
    let expenseData = transactions.filter(transaction => transaction.type === 'expense').map(transaction => transaction.amount);
    let investmentData = transactions.filter(transaction => transaction.type === "Savings & Investment").map(transaction => transaction.amount)

 
    if(monthView == true)
    {
      investmentData = transactions.filter(transaction => transaction.type === "Savings & Investment" 
          && (transaction.date.substring(5,7) == currentMonth.toLocaleString()) && (transaction.date.substring(0,4) == currentYear.toString()))
          .map(transaction => transaction.amount)
      expenseData = transactions.filter(transaction => transaction.type === 'expense'
          && (transaction.date.substring(5,7) == currentMonth.toLocaleString()) && (transaction.date.substring(0,4) == currentYear.toString()))
          .map(transaction => transaction.amount);
      incomeData = transactions.filter(transaction => transaction.type === 'income' 
        && (transaction.date.substring(5,7) == currentMonth.toLocaleString()) && (transaction.date.substring(0,4) == currentYear.toString()))
        .map(transaction => transaction.amount);
    }


    const lineData = {
      labels: dates,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: "#C12AA1",
          fill: false,
        },
        {
          label: 'Expenses',
          data: expenseData,
          borderColor: "#D9822F",
          fill: false,
        },
        {
          label: "Savings & Investment",
          data: investmentData,
          borderColor: "#1FA14B",
          fill: false,
        },
      ],
    };

    return (
      <div>
      <div className='flex items-center'>
        <Switch checked={monthView} onChange={() => setMonthView(!monthView)} />
        <span className="font-title text-sm ml-2">{monthView ? 'Month View' : 'All Records'}</span>
      </div>
      <Line data={lineData} options={lineOptions} className='px-2 mt-3 h-full w-full' />
    </div>
    )
};

export default LineChart;
