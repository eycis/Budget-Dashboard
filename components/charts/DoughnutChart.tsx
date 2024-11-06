import React, { useEffect, useState } from 'react'
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const DoughnutChart = () => {

    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);
    useEffect(() => {
      // nahrání mock data
      setTransactions(transactionsData.transactions);
    }, []);

    const doughnutOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins: {
          legend: {
            position: 'left',
            labels: {
              usePointStyle: true,
              boxWidth: 10,
              padding: 20,
              color: 'white',
            },
          },
        },
        cutout: '70%',
      }

    const categories = ['Food', 'Utilities', 'Fun', 'Friends', 'Clothes', 'Health', 'Other', 'Transportation', 'Savings', 'Investment' ];
    const categoriesTotals = categories.map(category => transactions.filter(transaction => transaction.category === category 
      && transaction.type === 'expense').reduce((sum, transaction) => sum + transaction.amount, 0));
    
      const doughnutData = {
        labels: categories,
        datasets: [
          {
            label: 'Expenses by Category',
            data: categoriesTotals,
            backgroundColor: ['#D32F2F', '#1976D2', '#FBC02D', '#388E3C', '#7B1FA2', '#F57C00', '#9E9E9E', '#C2185B', '#0288D1', '#FBC02D'],
            hoverOffset: 2,
          }
        ],
      };

  return (
    <Doughnut data={doughnutData} options={doughnutOptions} data-aos="fade-up" className='ml-16 mt-5'/>
  )
}

export default DoughnutChart