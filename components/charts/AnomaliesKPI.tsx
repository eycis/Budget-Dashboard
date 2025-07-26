import React, { useEffect, useState } from 'react'
import { Transaction } from '@/models/transaction';
import { getTransactions } from '@/Services/getTransactionsService';

interface Props {
    transactions : Transaction [];
}


const AnomaliesKPI = ({transactions} : Props) => {

    //TODO: zde udělat kalkulaci anomálií a poté vytvořit grafickou komponentu.  Případně opět kalkulaci oddělit do 
    //TODO: lib/calculations pro lepší čitelnost a zde jen zavolat funkci. 
    //TODO: není ani nutné vytvářet graf, jen čistě kalkulaci které předáme číslo. 

  return (
    <div>AnomaliesKPI</div>
  )
}

export default AnomaliesKPI