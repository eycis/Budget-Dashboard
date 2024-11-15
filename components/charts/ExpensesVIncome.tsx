import React, { useEffect, useState }   from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import { Doughnut } from 'react-chartjs-2';


const ExpensesVIncome = () => {

    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);

    useEffect(() => {
    // nahrání mock data
    setTransactions(transactionsData.transactions);
    }, []);

    const totalExpenses = transactionsData.transactions.filter(transaction => transaction.type === "expense")
    .reduce((sum, transaction) => sum+ transaction.amount, 0);

    const totalIncome = transactionsData.transactions.filter(transaction => transaction.type === "income")
    .reduce((sum, transaction) => sum+ transaction.amount, 0);  

    const types = transactions.map(transaction => transaction.type).filter((value, index, self) => self.indexOf(value)===index);

    const typesTotal = types.map(type => transactions.filter(transaction=> transaction.type === type).
    reduce((sum,transaction) => sum + transaction.amount, 0));

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

      const doughnutData = {
        labels: types,
        datasets: [
          {
            label: 'Expenses by Category',
            data: typesTotal,
            backgroundColor: ['#D32F2F', '#1976D2','#FBC02D'],
            hoverOffset: 2,
          }
        ],
      };

    return (
        <div className=''>
        <Doughnut data={doughnutData} options={doughnutOptions} data-aos="fade-up" className=' pt-8 w-32 h-72 flex flex-col items-center' />
      </div>
    )
}

export default ExpensesVIncome