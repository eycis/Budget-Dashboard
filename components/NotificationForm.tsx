import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch/Switch';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import {Notification} from "@/models/notification";
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';

interface Props{
    register: UseFormRegister<Notification>;
    errors: FieldErrors<Notification>;
}

const NotificationForm = ({register, errors} : Props) => {
    const [ocurringNotification, setOcurringNotification] = useState(false);
  
  return (
    <div className='grid grid-cols-5 gap-3 justify-items-center w-full max-w-6xl mx-auto p-3 h-1/4'>
          <input
            placeholder='Decription'
             {...register("subject", {required: true})}
            className='inputs'
          />
          <input
            placeholder='0,-'
            type="number"
           {...register("amount", {required: true})}
            className='inputs'
          />
          <input
            type="date"
            placeholder='Date'
            {...register("dueDate", {required: true})}
            className='inputs'
          />
          <div className='flex items-center gap-2'>
            <Switch
                {...register("isRecurring", {required: true})}
              onChange={() => setOcurringNotification(!ocurringNotification)}
            />
            <span className='font-title text-sm text-white '>
              {ocurringNotification ? 'Ocurring' : 'One-Time-Thing'}
            </span>
          </div>

            <button type="submit" className="submit-button">
                <CheckCircleIcon className="w-10 h-10" />
            </button>
      </div>
  );
};

export default NotificationForm;
