import React, { useEffect, useState } from 'react';
import notificationData from '@/data/mock_data_notification.json';
import {Notification} from '@/models/notification';
import NotificationSettings from '../NotificationSettings';
import { Transaction } from '@/models/transaction';
import transactionData from '@/data/mock_data.json'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions, LineElement, PointElement } from 'chart.js';
import { types } from 'util';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const UpcomingPayments = () => {
    
    const currentMonth = new Date().getMonth() + 1;

    const currentYear = new Date().getFullYear();

    const [notifications, setNotification] = useState<typeof Notification[]>([]);
    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);

    useEffect(() => {
      //nahrání mock data pro notifications
      setNotification(notificationData.notifications);
      setTransactions(transactionData.transactions);
    }, []);

    const totalIncome = transactionData.transactions.filter(transaction => transaction.type === "income")
    .reduce((sum, transaction) => sum+ transaction.amount, 0);  

    const currentUpcomingPayments= notifications.filter(notification => notification.dueDate.substring(5,7) === currentMonth.toLocaleString() 
    && notification.dueDate.substring(0,4) === currentYear.toLocaleString()).reduce((sum, notification) => sum + notification.amount, 0);
    
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