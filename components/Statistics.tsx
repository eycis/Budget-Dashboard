import React, { useEffect, useState }   from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement} from 'chart.js';
import BarChart from './charts/BarChart';
import ExpensesVIncome from './charts/ExpensesVIncome';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <div className='dashboard-main'> Statistics </div>
      <div className='grid grid-cols-3 gap-2'>
        <div className='statisticsTables'>
        <BarChart/>
        </div>
        <div className='statisticsTables'>
        <ExpensesVIncome/>
        </div>
        <div className='statisticsTables'>
        <BarChart/>
        </div>
        <div className='statisticsTables'>
        <BarChart/>
        </div>
        </div>
      </div>
  )
}

export default Statistics