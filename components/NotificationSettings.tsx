import React, { useEffect, useState } from 'react';
import { Notification } from '@/models/notification';
import Switch from '@mui/material/Switch/Switch';
import ConfirmationModal from './confirmationModal';
import UpcomingPayments from './charts/UpcomingPayments';
import { getNotifications } from '@/Services/getNotificationsService';
import { SaveNotification } from '@/Services/saveNotificationService';

const NotificationSettings = () => {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [ocurringNotification, setOcurringNotification] = useState(false);
  const [saveState, setSaveState] = useState(false);

  const currentDay = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2,'0')}`; 

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect( () => {
    const fetchData = async () => {
      const data = await getNotifications();
      if(data) {
        setNotifications(data);
        const filteredNotifications = notifications.filter((notification) => notification.user === "user1" && notification.dueDate >= currentDay)
        setNotifications(filteredNotifications);
      }
    }
    fetchData();
  }, []);

  const createNotification = async () => {
      const newNotification: Notification = {
        dueDate : (document.getElementById('dueDate') as HTMLInputElement).value,
        subject : (document.getElementById('notificationDescription') as HTMLInputElement).value,
        isRecurring : ocurringNotification,
        user: 'user1',
        amount: (document.getElementById('amount') as HTMLInputElement).valueAsNumber,
      };

      const isSaved = await SaveNotification(newNotification);

      if(isSaved == true){
        console.log("notification saved!");
        setSaveState(true);
        getNotifications();
      } else {
        console.error("error while sending the data");
        setSaveState(false);
      }
        handleOpenModal();
      }

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <p className='dashboard-main'>Notifications Settings</p>
      <div className='grid grid-cols-2 gap-2'>
        <div>
        <div className='grid grid-cols-2 w-full'>
          <p className='transactions-text'>Description of Notification</p>
          <input
            name = 'notificationDescription'
            id = "notificationDescription"
            className='ml-10 px-5 w-3/5 h-fit rounded-2xl bg-[#2a2a2c] text-white font-title'
          />
          <p className='transactions-text'>Set the amount</p>
          <input
            name = 'amount'
            type = 'number'
            id = "amount"
            className='ml-10 px-5 w-3/5 h-fit rounded-2xl bg-[#2a2a2c] text-white font-title'
          />
          <p className='transactions-text'>Reoccuring transaction</p>
            <div className='flex items-center gap-2 ml-10'>
              <Switch
                name = 'isReccuring'
                id = "isRecurring"
                checked={ocurringNotification}
                onChange={() => setOcurringNotification(!ocurringNotification)}
              />
              <span className='font-title text-sm text-white '>
                {ocurringNotification ? 'Ocurring' : 'One-Time-Thing'}
              </span>
            </div>
                <p className='transactions-text'>Date of payment</p>
                <div className='flex items-center gap-2 ml-10'>
                <input
                  type='date'
                  name= 'dueDate'
                  id = "dueDate"
                  className='bg-[#3e3e42] rounded-full text-white px-2 h-2/4'
                />
              </div>
          </div>
          <button
            onClick={createNotification}
            data-aos='fade-down'
            className='p-3 mt-5 bg-white rounded-2xl font-title font-bold text-black hover:bg-[#3a3aa3] transition-colors duration-500'
          >
            Create Notification
          </button>
          {showModal && (
            <ConfirmationModal message= {saveState? 'Notification saved!': 'Something went wrong!'} onClose={handleCloseModal} />
          )}
        </div>
          <div className='h-full justify-center items-center '>
            <p className='transactions-text'>Upcoming Payments in comparison with your Total Income</p>
            <UpcomingPayments />
          </div>
        </div>
      </div>
  );
};

export default NotificationSettings;
