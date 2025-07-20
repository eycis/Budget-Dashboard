import React, { useEffect, useState }   from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions, LineElement, PointElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import { Doughnut, Line } from 'react-chartjs-2';
import { getTransactions } from '@/Services/getTransactionsService';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const PredictionChart = () => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchData = async() => {
          const data = await getTransactions();
          if(data){
            setTransactions(data);
          }
        }
      
      useEffect(() => {
        fetchData();
      }, []);
  

    const dates = Array.from(new Set(transactions.map(transaction => new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }))));
    
    let cumulativeBalance = 0;
    
    const balanceData = dates.map(date => {

      const dailyTransactions = transactions.filter(transaction => new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) === date);
      
      const dailyIncome = dailyTransactions.filter(transaction => transaction.type === 'income').reduce((sum, transaction) => sum + transaction.amount, 0);
      
      const dailyExpenses = dailyTransactions.filter(transaction => transaction.type === 'expense').reduce((sum, transaction) => sum + transaction.amount, 0);
      
      cumulativeBalance += dailyIncome - dailyExpenses;
      
      return cumulativeBalance;
    });

    
    const avgIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) / dates.length;
    
    const avgExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) / dates.length;
    
    const avgMonthlyChange = avgIncome - avgExpenses;


    //Následná predikce pro následující půl rok: 
    const forecastMonths = 6; 
    const futureDates = Array.from({ length: forecastMonths }, (_, i) => {
        const date = new Date();
        
        date.setMonth(date.getMonth() + i + 1);
        
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    });
    
    const futureBalanceData = Array.from({ length: forecastMonths }, (_, i) => cumulativeBalance + (i + 1) * avgMonthlyChange);

    const lineData = {
        labels: [...dates, ...futureDates],
        datasets: [
          {
            label: 'Balance History',
            data: balanceData,
            borderColor:  "#A526E1",
            fill: false,
          },
          {
            label: 'Balance Forecast',
            data: [...balanceData, ...futureBalanceData],
            borderColor: 'green',
            fill: "#1FA14B",
            borderDash: [5, 5],
          },
        ],
      };
    
      const lineOptions: ChartOptions<'line'> = {
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
        <div className='w-full aspect-[2/1]'>
        <Line data={lineData} options={lineOptions} />
      </div>
    );
}

export default PredictionChart