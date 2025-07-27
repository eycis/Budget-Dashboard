import React, { useEffect, useState } from 'react'
import { Transaction } from '@/models/transaction';
import { calculateAnomalies } from '@/lib/calculations/calculateAnomalies';

interface Props {
    transactions : Transaction [];
}

const AnomaliesKPI = ({transactions} : Props) => {

    const [incomeDeviation, setIncomeDeviation] = useState<number>();
    const [expensesDeviation, setExpensesDeviation] = useState<number>();

    useEffect(() => {
        const fetchData = async () => {
          const { incomeDeviation, expensesDeviation } = await calculateAnomalies(transactions);
          setIncomeDeviation(incomeDeviation);
          setExpensesDeviation(expensesDeviation);
        };
      
        fetchData();
      }, [transactions]);

    const getExpenseClass = () =>
        expensesDeviation! < 0 ? 'text-green-500' : 'text-red-500';
    
      const getIncomeClass = () =>
        incomeDeviation! >= 0 ? 'text-green-500' : 'text-red-500';
    
      const getArrow = (value: number, isExpense: boolean) => {
        if (value === 0) return '→';
        if (isExpense) return value < 0 ? '↓' : '↑'; 
        return value >= 0 ? '↑' : '↓';
      };
    
      return (
        <div className="grid grid-cols-2 gap-2 col-span-2 relative">
            <p className="statistics-kpi">
                Spending deviation from average:{' '} <br/>
                <span className={`font-semibold absolute bottom-2 ${getExpenseClass()}`}>
                    {getArrow(expensesDeviation!, true)} {Math.abs(expensesDeviation!)}%
                </span>
                </p>
                <p className="statistics-kpi">
                Income deviation from average:{' '} <br/>
                <span className={`font-semibold absolute bottom-2 ${getIncomeClass()}`}>
                    {getArrow(incomeDeviation!, false)} {Math.abs(incomeDeviation!)}%
                </span>
            </p>
        </div>
      );
    };
    
    export default AnomaliesKPI;