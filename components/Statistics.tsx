import React, { useEffect, useState }   from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement} from 'chart.js';
import ExpensesVIncome from './charts/ExpensesVIncome';
import PredictionChart from './charts/PredictionChart';
import InvestmentInTime from './charts/InvestmentInTime';
import TopExpenses from './charts/TopExpenses';


const Statistics = () => {

      //upravit výšku pro normální obrazovky.

  return (
    <div className='bg-[#1c1c1e] w-full h-screen p-5'>
      <div className='dashboard-main'> Statistics </div>
      <div className='grid grid-cols-2 gap-2'>
        <div>
        <p className='font-title text-white ml-5 mb-2'>Top 5 Expenses</p>
        <div className='statisticsTables' data-aos="fade-up">
        <TopExpenses/>
        </div>
        </div>
        <div>
        <div>
        <p className='font-title text-white ml-5 mb-2'>Ratio of Investments, Expenses, and Income</p>
        <div className='statisticsTables' data-aos="fade-up">
        <ExpensesVIncome/>
        </div>
        </div>
        <div>
        <p  className='font-title text-white ml-5 mb-2'>Investments in Time</p>
        <div className='statisticsTables' data-aos="fade-up">
        <InvestmentInTime/>
        </div>
        </div>
        </div>
        </div>
        <div>
        {/* <p  className='font-title text-white ml-5 mt-10 mb-2' >Prediction of Balance</p>
        <div className='col-span-1 bg-[#2a2a2c] rounded-3xl p-3' data-aos="fade-right">
        <PredictionChart/>
        </div> */}
        </div>
        </div>
  )
}

export default Statistics