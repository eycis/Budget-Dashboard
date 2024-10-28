import React from 'react'
import { WalletIcon, CurrencyDollarIcon, BanknotesIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
  return (
    <div className='bg-[#1c1c1e] absolute w-full h-full  overflow-y-scroll flex justify-start'>
      <div className='text-white font-title font-bold p-5 text-5xl'> Dashboard
      <div className='grid grid-cols-4 gap-5 pt-5'>
        <div className='dashboard-kpi'>
          <WalletIcon className="h-6 w-6 text-white" />
          Balance
        </div>
        <div className='dashboard-kpi'>
          <CurrencyDollarIcon className="h-6 w-6 text-white" />
          Income
        </div>
        <div className='dashboard-kpi'>
          <BanknotesIcon className="h-6 w-6 text-white" />
          Savings
        </div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard;