import React, { useEffect, useState }   from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import Switch from '@mui/material/Switch';
import { Bar } from 'react-chartjs-2';
import BarChart from './charts/BarChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <div className='dashboard-main'> Statistics </div>
        <BarChart/>
      </div>
  )
}

export default Statistics