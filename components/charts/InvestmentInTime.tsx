import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions } from 'chart.js';
import { Transaction } from '@/models/transaction';
import { Bar, Line } from 'react-chartjs-2';

interface Props {
  transactions : Transaction [];
}

const InvestmentInTime = ({transactions} : Props) => {
  
    const dates = Array.from(new Set(transactions.map(transaction => new Date(transaction.date).toLocaleDateString('cz-CZ'))));

    const investment = transactions.filter(transaction => transaction.category === 'Investment').map(transaction => transaction.amount);
    const savings = transactions.filter(transaction => transaction.category === 'Savings').map(transaction => transaction.amount);

    const lineOptions:ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            usePointStyle: true,
            pointStyle: 'line',
            boxWidth: 10,
            padding: 0,
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
          borderColor: "#7A2E3B",
          fill: false,
        },
        {
          label: 'Investments',
          data: investment,
          borderColor:   "#354A5E",
          fill: false,
        }
      ],
    };
  
    return (
        <div className='h-fit w-full'>
        <Line data={lineData} options={lineOptions} />
      </div>
  )
}

export default InvestmentInTime