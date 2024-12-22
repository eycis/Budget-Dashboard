import React, { useEffect, useMemo, useState } from 'react';
import notificationData from '@/data/mock_data_notification.json';
import {Notification} from '@/models/notification';
import { Transaction } from '@/models/transaction';
import transactionData from '@/data/mock_data.json'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions, LineElement, PointElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const UpcomingPayments = () => {
    
    const currentMonth = new Date().getMonth() + 1;

    const currentYear = new Date().getFullYear();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const getNotifications = async () => {
      try{
        const response = await fetch("api/fetchNotifications");
        if(!response.ok){
          console.error("error while fetching the data");
        }
        const data = await response.json();
        setNotifications(data.notifications);
      }
      catch(error){
        console.error("error while api call", error);
      }
    }

    const getTransactions = async () => {
      try {
        const response = await fetch("api/fetchTransactions");
        if(!response.ok){
          console.error("error while fetching the data");
        }
        const data = await response.json();
        console.log(data.transactions);
        setTransactions(data.transactions);
      }catch(error){
        console.error("error with loading transactions", error);
      }

    }

    useEffect(() => {
      getNotifications();
      getTransactions();
    }, []);

    const totalIncome = useMemo( () => transactions.filter(transaction => transaction.type === "Income")
    .reduce((sum, transaction) => sum+ transaction.amount, 0), [transactions]) ;  


    const currentUpcomingPayments= useMemo( () => notifications.filter((notification) => {
      const month = notification.dueDate.substring(5,7);
      const year = notification.dueDate.substring(0,4);

      return (
        month === currentMonth.toString().padStart(2, "0") &&
        year === currentYear.toString()
      );
    }).reduce((sum, notification) => sum + notification.amount, 0), [notifications] );

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
        labels: ['Upcoming Payments', 'Income'] ,
        datasets: [
          {
            label: 'Upcoming Payments in comparison with Income',
            data: [totalIncome, currentUpcomingPayments],
            backgroundColor: ["#8D6C96",  "#1C8F46"],
            hoverOffset: 2,
          }
        ],
      };

    return (
    <div className='relative w-full h-screen"'>
        <Doughnut data={doughnutData} options={doughnutOptions} className='w-42 h-52  ' />
      </div>
  )
}

export default UpcomingPayments