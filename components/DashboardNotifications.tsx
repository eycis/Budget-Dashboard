import React, { useEffect, useState } from 'react'
import notificationData from '@/data/mock_data_notification.json';
import {Notification} from '@/models/notification';

const DashboardNotifications = () => {

    const [notifications, setNotification] = useState<typeof Notification[]>([]);

    useEffect(() => {
      //nahrání mock data pro notifications
      setNotification(notificationData.notifications);
    }, []);
  
    const filteredNotifications = notificationData.notifications.filter((notification) => notification.user ==="User1")
  return (
    <div className='row-span-2 h-screen max-h-[608px] bg-[#2a2a2c] text-white rounded-lg px-1' data-aos="fade-left">
      <h2 className='font-title text-xl text-center font-bold text-white pt-5'>Upcoming Payments</h2>
        {filteredNotifications.map((notification, index) => (
          <div key = {index} className='bg-[#444447] hover:bg-[#3a3aa3] transition-colors duration-500 h-min w-full rounded-xl mt-3'>
            <div className='h-1/3 w-full font-title text-center pt-2 text-sm'> {notification.dueDate}</div>
            <div className='h-1/3 w-full text-lg font-title text-center mt-1'>{notification.subject}</div>
            <div className='h-1/3 w-full text-sm font-title text-center mt-1 pb-2'>{notification.amount},-</div>
          </div>
        ))}
    </div>
  )
}

export default DashboardNotifications