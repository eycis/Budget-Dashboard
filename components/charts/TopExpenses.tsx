import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions, LineElement, PointElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import Switch from '@mui/material/Switch';
import { Bar } from 'react-chartjs-2';
//import { colors } from '@mui/material';
import colors from '@/styles/colors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);
interface Props {
  transactions : Transaction [];
}

const TopExpenses = ({transactions} : Props) => {

  let sortedExpenses = transactions
    .filter(transaction => transaction.type === 'Expense')
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const barData = {
    labels: sortedExpenses.map(expense => expense.category),
    datasets: [
      {
        data: sortedExpenses.map(expense => expense.amount),
        backgroundColor: colors,
      },
    ],
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className='w-full h-full'>
      <Bar data={barData} options={barOptions} className='h-full w-full p-4' />
    </div>
  )
}

export default TopExpenses