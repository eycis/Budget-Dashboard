import { calculateCashFlow } from '@/lib/calculations/calculateCashFlow';
import { Transaction } from '@/models/transaction';
import React, { useEffect, useState } from 'react'
interface Props {
    transactions : Transaction [];
}

const CashFlow = ({transactions} : Props) => {

    const [cashflow, setCashflow] = useState<number>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await calculateCashFlow(transactions);
            setCashflow(result);
        };
        
        fetchData();
        }, [transactions]);

    const getCashflowClass = () =>
        cashflow! > 0 ? 'text-green-500' : 'text-red-500';
    
    
    const getArrow = (value: number) => {
        if (value === 0) return '→';
        return value >= 0 ? '↑' : '↓';
    };


    return (
        <div className="relative">
            <p className="statistics-kpi">
                Cashflow:{' '} <br/>
                <span className={`font-semibold absolute bottom-2 ${getCashflowClass()}`}>
                    {getArrow(cashflow!)} {Math.abs(cashflow!)}%
                </span>
                </p>
        </div>
      );
}

export default CashFlow