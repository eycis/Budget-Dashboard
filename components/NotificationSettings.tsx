import React, { useState } from 'react';
import { Notification } from '@/models/notification';
import Switch from '@mui/material/Switch/Switch';
import ConfirmationModal from './confirmationModal';
import DashboardNotifications from './DashboardNotifications';
import UpcomingPayments from './charts/UpcomingPayments';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [ocurringNotification, setOcurringNotification] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const createNotification = () => {
    handleOpenModal();
  };

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <p className='dashboard-main'>Notifications Settings</p>
      <div className='grid grid-cols-2 col-span-2 gap-2'>
        <div>
          <p className='transactions-text'>Description of Notification</p>
          <input
            className='ml-10 px-5 w-3/5 h-10 rounded-2xl bg-[#2a2a2c] text-white text-lg font-title'
          />
          <p className='transactions-text mt-7'>Set the amount</p>
          <input
            className='ml-10 px-5 w-1/4 h-10 rounded-2xl bg-[#2a2a2c] text-white text-lg font-title'
          />
          <div className='grid grid-cols-2 w-fit'>
            <div>
              <p className='transactions-text mt-7'>Will the transaction will be reoccuring?</p>
            </div>
            <div className='mt-7'>
              <Switch
                className='ml-28'
                checked={ocurringNotification}
                onChange={() => setOcurringNotification(!ocurringNotification)}
              />
              <span className='font-title text-sm text-white '>
                {ocurringNotification ? 'Ocurring' : 'One-Time-Thing'}
              </span>
            </div>
            {ocurringNotification && (
              <div className='flex items-center space-x-4' data-aos='fade-up'>
                <p className='transactions-text mt-7'>Please select the date</p>
                <input
                  type='date'
                  className='bg-[#3e3e42] rounded-2xl font-title text-white px-2 h-2/3 mt-3'
                />
              </div>
            )}
          </div>
          <button
            onClick={createNotification}
            data-aos='fade-down'
            className='p-4 mt-7 ml-10 bg-white rounded-2xl font-title font-bold text-black text-xl hover:bg-[#3a3aa3] transition-colors duration-500'
          >
            Create Notification
          </button>
          {showModal && (
            <ConfirmationModal message='Notification saved!' onClose={handleCloseModal} />
          )}
        </div>
        {/* Pravá dlaždice rozdělena na dvě části: DashboardNotifications a UpcomingPayments */}
        <div className='grid grid-rows-2 h-[80vh] gap-8 mr-8'>
          <div className='h-full overflow-hidden'>
            <DashboardNotifications />
          </div>
          <div className='h-full flex flex-col justify-start items-center -ml-56 '>
            <p className='transactions-text'>Upcoming Payments in comparison with your Total Income</p>
            <UpcomingPayments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
