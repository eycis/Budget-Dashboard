import React, { useEffect, useState } from 'react'
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const LineChart = () => {
    
    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);
    useEffect(() => {
      // nahrání mock data
      setTransactions(transactionsData.transactions);
    }, []);

    const lineOptions:ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
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

    const dates = Array.from(new Set(transactions.map(transaction => new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }))));
    const incomeData = transactions.filter(transaction => transaction.type === 'income').map(transaction => transaction.amount);
    const expenseData = transactions.filter(transaction => transaction.type === 'expense').map(transaction => transaction.amount);
    const investmentData = transactions.filter(transaction => transaction.type === "Savings & Investment").map(transaction => transaction.amount)

    const lineData = {
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

    return <Line data={lineData} options={lineOptions} data-aos="fade-up" className='mt-2 px-2 h-full w-full'/>;
};

export default LineChart;
