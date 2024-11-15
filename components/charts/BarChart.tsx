import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import Switch from '@mui/material/Switch';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {

    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);

  useEffect(() => {
    // nahrání mock data
    setTransactions(transactionsData.transactions);
  }, []);

  const sortedExpenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const barData = {
    labels: sortedExpenses.map(expense => expense.category),
    datasets: [
      {
        label: 'Top Expenses',
        data: sortedExpenses.map(expense => expense.amount),
        backgroundColor:  ['#D32F2F', '#1976D2', '#FBC02D', '#388E3C', '#7B1FA2'],
      },
    ],
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
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
    <div className='w-full h-80 mx-auto mt-5'>
      <Bar data={barData} options={barOptions} />
    </div>
  )
}

export default BarChart