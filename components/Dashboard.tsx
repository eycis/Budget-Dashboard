import React from 'react'
import { WalletIcon, CurrencyDollarIcon, BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <div className='dashboard-main'> Dashboard </div>
      <div className='grid grid-cols-4 gap-3 pt-5 w-3/4'>
        <div className='dashboard-kpi'>
          <WalletIcon className="kpi-icons" />
            <div className='kpi-name'>
              Balance
            </div>
          <div className='dashboard-figures'>
            15113$
          </div>
        </div>
        <div className='dashboard-kpi'>
          <CurrencyDollarIcon className="kpi-icons" />
          <div className='kpi-name'>
            Income
          </div>
          <div className='dashboard-figures'>
            11$
          </div>
        </div>
        <div className='dashboard-kpi'>
          <BanknotesIcon className="kpi-icons" />
          <div className='kpi-name'>
            Savings
          </div>
          <div className='dashboard-figures'>
            151$
          </div>
        </div>
        <div className='dashboard-kpi'>
          <CreditCardIcon className="kpi-icons" />
          <div className='kpi-name'>
            Expenses
          </div>
          <div className='dashboard-figures'>
            15611$
          </div>
        </div>
      </div>
      </div>
  )
}

export default Dashboard;