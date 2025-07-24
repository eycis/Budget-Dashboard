import React, { useEffect, useMemo, useState } from 'react';
import {Notification} from '@/models/notification';
import { Transaction } from '@/models/transaction';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions, LineElement, PointElement, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getNotifications } from '@/Services/getNotificationsService';
import { getTransactions } from '@/Services/getTransactionsService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);


const UpcomingPayments = () => {
    
    const currentMonth = new Date().getMonth() + 1;

    const currentYear = new Date().getFullYear();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect( () => {
      const fetchNotificationData = async () => {
        const notificationData = await getNotifications();
        if(notificationData.data) {
          setNotifications(notificationData.data);
        }
      }

      const fetchTransactionData = async() => {
      const transactionsData = await getTransactions();
      if(transactionsData.data){
        setTransactions(transactionsData.data);
      }
      }

      fetchTransactionData();
      fetchNotificationData();
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