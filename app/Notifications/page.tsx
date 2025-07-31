'use client'
import React, { useEffect, useState } from 'react';
import { Notification } from '@/models/notification';
import UpcomingPayments from '@/components/charts/UpcomingPayments';
import { getNotifications } from '@/Services/getNotificationsService';
import { SaveNotification } from '@/Services/saveNotificationService';
import  NotificationForm from "@/components/NotificationForm"
import Nav from '@/components/Nav';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ToastProvider';

const NotificationPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<Notification>();
  const {showToast} = useToast();
  

  const onSubmit = async (data: Notification) => {

    const isSaved = await SaveNotification(data);

      if(isSaved == true){
        showToast("Notification saved", "success");
        setTimeout(() => {
          window.location.href = "/", 300
        })
      } else {
        showToast("Error while saving the data", "error");
      }
    }

  return (
    <div className='flex'>
      <div className='z-[999] relative'>
        <Nav/>
      </div>
        <div className="fixed inset-0 bg-[#161617] flex items-center justify-center z-50 " >
        <div className="bg-[#1c1c1e] rounded-3xl shadow-xl p-8 w-[70rem] h-1/3">
          <div className="text-white font-bold text-2xl mb-6 text-center">
            Create Notification
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <NotificationForm register={register} errors={errors}/>
          </form>
        </div>
  </div>
  </div>
);
};

export default NotificationPage;
