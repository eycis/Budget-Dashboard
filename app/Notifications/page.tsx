'use client'
import React, { useEffect, useState } from 'react';
import { Notification } from '@/models/notification';
import Switch from '@mui/material/Switch/Switch';
import UpcomingPayments from '@/components/charts/UpcomingPayments';
import { getNotifications } from '@/Services/getNotificationsService';
import { SaveNotification } from '@/Services/saveNotificationService';
import  NotificationForm from "@/components/NotificationForm"
import Nav from '@/components/Nav';
import { useForm } from 'react-hook-form';

const NotificationPage = () => {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [ocurringNotification, setOcurringNotification] = useState(false);
  const [saveState, setSaveState] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Notification>();
  

  //const currentDay = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2,'0')}`; 

  useEffect( () => {
    const fetchData = async () => {
      const data = await getNotifications();
      if(data.data) {
        //const filteredNotifications = notifications.filter((notification) => notification.user === "user1" && notification.dueDate >= currentDay)
        setNotifications(data.data);
      }
    }
    fetchData();
  }, []);

  const onSubmit = async (data: Notification) => {
      const isSaved = await SaveNotification(data);

      if(isSaved == true){
        console.log("notification saved!");
        setSaveState(true);
        getNotifications();
      } else {
        console.error("error while sending the data");
        setSaveState(false);
      }
      }

  return (
    <div className="flex">
      <Nav />
        <div className="bg-[#1c1c1e] h-screen w-full flex flex-col overflow-hidden">
          <div className="dashboard-main">Create Notification</div>
            <div className="p-5 max-w-6xl mx-auto w-full">
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <NotificationForm register={register} errors={errors} />
                </form>
              </div>
          </div>
          {/* <div className='h-full justify-center items-center '>
            <p className='transactions-text'>Upcoming Payments in comparison with your Total Income</p>
            <UpcomingPayments />
          </div> */}
        </div>
        </div>
  );
};

export default NotificationPage;
