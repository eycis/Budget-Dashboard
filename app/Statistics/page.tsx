'use client'

import AnomaliesKPI from '@/components/charts/AnomaliesKPI'
import Nav from '@/components/Nav'
import Statistics from '@/components/Statistics'
import { Transaction } from '@/models/transaction'
import { getTransactions } from '@/Services/getTransactionsService'
import React, { useEffect, useState } from 'react'

const StatisticsPage = () => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
  
    const fetchData = async() => {
        const data = await getTransactions();
        if(data.data){
          setTransactions(data.data);
        }
      }
    
    useEffect(() => {
      fetchData();
    }, []);


    return (
        <div className="flex">
          <Nav />
          <Statistics />
          <AnomaliesKPI transactions = {transactions}/>
        </div>
    )
}

export default StatisticsPage