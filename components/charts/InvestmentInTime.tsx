import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions, LineElement, PointElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import Switch from '@mui/material/Switch';
import { Bar, Line } from 'react-chartjs-2';


const InvestmentInTime = () => {
  
    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);

    useEffect(() => {
        // nahrání mock data
        setTransactions(transactionsData.transactions);
      }, []);
      

      const dates = Array.from(new Set(transactions.map(transaction => new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }))));

      const investment = transactions.filter(transaction => transaction.category === 'Investment').map(transaction => transaction.amount);
      const savings = transactions.filter(transaction => transaction.category === 'Savings').map(transaction => transaction.amount);

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

      const lineData = {
        labels: dates,
        datasets: [
          {
            label: 'Savings',
            data: savings,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Investments',
            data: investment,
            borderColor: 'red',
            fill: false,
          }
        ],
      };
  
    return (
        <div>
        <Line data={lineData} options={lineOptions} className='px-2 mt-5 h-full w-full' />
      </div>
  )
}

export default InvestmentInTime