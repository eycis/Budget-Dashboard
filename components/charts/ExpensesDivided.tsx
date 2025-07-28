import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import Switch from '@mui/material/Switch/Switch';
import colors from '@/styles/colors';
import { isSameMonth } from '@/lib/calculations/isSameMonth';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

interface Props {
  transactions: Transaction [];
 }

const ExpensesDivided = ({transactions} : Props) => {

  const currentMonth = new Date().getMonth() + 1;

  const currentYear = new Date().getFullYear();

  const[monthView, setMonthView] = useState(false);
    

    const doughnutOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              boxWidth: 20,
              padding: 10,
              color: 'white',
            },
          },
        },
        cutout: '80%',
      }

    const categories : string [] = transactions.map(transaction => transaction.category)
      .filter((value, index, self) => self.indexOf(value) == index);
    let categoriesTotals = categories.map(category => transactions.filter(transaction => transaction.category === category 
      && transaction.type === 'Expense').reduce((sum, transaction) => sum + transaction.amount, 0));


      if(monthView) {
        categoriesTotals = categories.map(category => 
          transactions.filter(transaction => 
            transaction.category === category && 
            transaction.type === 'Expense' && isSameMonth(transaction.date, currentMonth, currentYear))
            .reduce((sum, transaction) => sum + transaction.amount, 0)
        );
      }
    
      const doughnutData = {
        labels: categories,
        datasets: [
          {
            label: 'Expenses by Category',
            data: categoriesTotals,
            backgroundColor: colors,
            hoverOffset: 2,
          }
        ],
      };

  return (
    <div>
      <div className='flex items-center'>
        <Switch checked={monthView} onChange={() => setMonthView(!monthView)} />
        <span className="font-title text-sm ml-2">{monthView ? 'Month View' : 'All Records'}</span>
      </div>
      <div>
        <Doughnut data={doughnutData} options={doughnutOptions} data-aos="fade-up" className='pt-3 w-full flex flex-col items-center' />
      </div>
    </div>
  )
}

export default ExpensesDivided