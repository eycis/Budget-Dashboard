import React, { useEffect, useState } from 'react'
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import Switch from '@mui/material/Switch/Switch';
import colors from '@/styles/colors';
import { getTransactions } from '@/Services/getTransactionsService';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);


const DoughnutChart = () => {

  const currentMonth = new Date().getMonth() + 1;

  const currentYear = new Date().getFullYear();

  const[monthView, setMonthView] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchData = async() => {
      const data = await getTransactions();
      if(data){
        console.log("data from doughnut:", data);
        setTransactions(data);
      }
    }
  
  useEffect(() => {
    fetchData();
  }, []);

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

    const categories = ['Food', 'Utilities', 'Fun', 'Friends', 'Clothes', 'Health', 'Other', 'Transportation', 'Savings', 'Investment' ];
    let categoriesTotals = categories.map(category => transactions.filter(transaction => transaction.category === category 
      && transaction.type === 'Expense').reduce((sum, transaction) => sum + transaction.amount, 0));


      if(monthView) {
        categoriesTotals = categories.map(category => 
          transactions.filter(transaction => 
            transaction.category === category && 
            transaction.type === 'Expense' &&
            transaction.date.substring(5, 7) == currentMonth.toString() &&
            transaction.date.substring(0, 4) == currentYear.toString()
          )
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

export default DoughnutChart