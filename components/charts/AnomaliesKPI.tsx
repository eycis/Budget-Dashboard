import React, { useEffect, useState } from 'react'
import { Transaction } from '@/models/transaction';
import { getTransactions } from '@/Services/getTransactionsService';

interface Props {
    transactions : Transaction [];
}


const AnomaliesKPI = ({transactions} : Props) => {

    const currentMonth : number = new Date().getMonth() + 1;
    const currentYear : number = new Date().getFullYear();

    //TODO: zde udělat kalkulaci anomálií a poté vytvořit grafickou komponentu.  Případně opět kalkulaci oddělit do 
    //TODO: lib/calculations pro lepší čitelnost a zde jen zavolat funkci. 
    //TODO: není ani nutné vytvářet graf, jen čistě kalkulaci které předáme číslo. 

    const expensesSum : number = transactions.filter((transaction) => transaction.type === "Expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    const expensesAverage : number = expensesSum / transactions.length;

    const currentExpenses : number  = transactions.filter((transaction) => transaction.type === "Expense" 
        && transaction.date.substring(5,7) == currentMonth.toString().padStart(2, "0")
        && transaction.date.substring(0, 4) == currentYear.toString())
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expensesDeviation : number = Math.round(((currentExpenses - expensesAverage) / expensesAverage) * 100);

    const incomeSum : number = transactions.filter((transaction) => transaction.type === "Income")
        .reduce((sum,transaction) => sum + transaction.amount, 0);
    
    const incomeAverage : number = incomeSum / transactions.length;

    const currentIncome : number = transactions.filter((transaction) => transaction.type === "Income" 
    && transaction.date.substring(5,7) == currentMonth.toString().padStart(2, "0")
    && transaction.date.substring(0, 4) == currentYear.toString())
    .reduce((sum, transaction) => sum + transaction.amount, 0);

    const incomeDeviation : number = Math.round(((currentIncome - incomeAverage) / incomeAverage) * 100);

    const getExpenseClass = () =>
        expensesDeviation < 0 ? 'text-green-500' : 'text-red-500';
    
      const getIncomeClass = () =>
        incomeDeviation >= 0 ? 'text-green-500' : 'text-red-500';
    
      const getArrow = (value: number, isExpense: boolean) => {
        if (value === 0) return '→';
        if (isExpense) return value < 0 ? '↓' : '↑'; 
        return value >= 0 ? '↑' : '↓';
      };
    
      return (
        <div className="grid grid-cols-2 gap-2">
            <p className="dashboard-kpi">
                Spending deviation from average:{' '}
                <span className={`font-semibold ${getExpenseClass()}`}>
                    {getArrow(expensesDeviation, true)} {Math.abs(expensesDeviation)}%
                </span>
                </p>
                <p className="dashboard-kpi">
                Income deviation from average:{' '}
                <span className={`font-semibold ${getIncomeClass()}`}>
                    {getArrow(incomeDeviation, false)} {Math.abs(incomeDeviation)}%
                </span>
            </p>
        </div>
      );
    };
    
    export default AnomaliesKPI;