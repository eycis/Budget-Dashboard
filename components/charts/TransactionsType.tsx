import React, { useState } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import Switch from '@mui/material/Switch';
import { isSameMonth } from '@/lib/calculations/isSameMonth';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  transactions: Transaction[];
}

const TransactionsType = ({transactions}: Props) => {

  const currentMonth = new Date().getMonth() + 1;

  const currentYear = new Date().getFullYear();

  const[monthView, setMonthView] = useState<boolean>(false);

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

  //TODO: sort dates:
  const dates = Array.from(new Set(transactions.map(transaction => new Date(transaction.date).toLocaleDateString('cs-CZ')))).sort();
  let incomeData = transactions.filter(transaction => transaction.type === 'Income').map(transaction => transaction.amount);
  let expenseData = transactions.filter(transaction => transaction.type === 'Expense').map(transaction => transaction.amount);
  let investmentData = transactions.filter(transaction => transaction.type === "Savings & Investment").map(transaction => transaction.amount)


  if(monthView == true)
  {
    investmentData = transactions.filter(transaction => transaction.type === "Savings & Investment" 
        && isSameMonth(transaction.date, currentMonth, currentYear))
        .map(transaction => transaction.amount)
    expenseData = transactions.filter(transaction => transaction.type === 'Expense'
        && isSameMonth(transaction.date, currentMonth, currentYear))
        .map(transaction => transaction.amount)
    incomeData = transactions.filter(transaction => transaction.type === 'Income' 
      && isSameMonth(transaction.date, currentMonth, currentYear))
      .map(transaction => transaction.amount)
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
        <Switch checked={monthView} onChange={() => setMonthView(!monthView)} />
        <span className="font-title text-sm ml-2">{monthView ? 'Month View' : 'All Records'}</span>
      <Line data={lineData} options={lineOptions} className='px-2 mt-3 h-screen w-full' />
    </div>
    )
};

export default TransactionsType;
