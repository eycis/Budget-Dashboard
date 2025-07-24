import React, { useEffect, useRef, useState }   from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement, ArcElement, ChartOptions } from 'chart.js';
import { Transaction } from '@/models/transaction';
import { Line } from 'react-chartjs-2';
import Switch from '@mui/material/Switch/Switch';
import { getTransactions } from '@/Services/getTransactionsService';
import colors from '@/styles/colors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const ExpensesVIncome = () => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [monthView, setMonthView] = useState<boolean>(false);
    const currentMonth : number = new Date().getMonth() + 1;
    const currentYear : number = new Date().getFullYear();
    const chartRef = useRef<ChartJS<'line'> | null>(null);
    //const [gradient, setGradient] = useState<string | CanvasGradient>('#9C1F8B');

     const fetchData = async() => {
         const result = await getTransactions();
         if(result.data){
           setTransactions(result.data);
         }
       }
     
     useEffect(() => {
       fetchData();
     }, []);

    const filtered = monthView? transactions.filter((transaction) => {
      const month = parseInt(transaction.date.substring(5,7));
      const year = parseInt(transaction.date.substring(0,4));
      return month === currentMonth && year === currentYear;
    }) : transactions;

    const expenseData = filtered.filter((transaction) => transaction.type == "Expense")
      .map((transaction) => ({date: transaction.date, amount: transaction.amount}))

    const incomeData = filtered.filter((transaction) => transaction.type == "Income")
    .map((transaction) => ({date: transaction.date, amount: transaction.amount}))

    const investmentsData = filtered.filter((transaction) => transaction.type == "Savings & Investments")
    .map((transaction) => ({date: transaction.date, amount: transaction.amount}))

    const dates = Array.from(
      new Set([...expenseData, ...incomeData, ...investmentsData].map((transaction) => 
      new Date(transaction.date).toLocaleDateString("cs-CZ")))).sort();
    
    const getTotalsByDate = (data: {date: string, amount: number} []) => {
      const totals: Record<string, number> = {}
      data.forEach((item) => {
        const dateKey = new Date(item.date).toLocaleDateString("cs-CZ");
        totals[dateKey] = (totals[dateKey] || 0) + item.amount;
      });
      return dates.map((date) => totals[date] || 0);
    }
    

    const types = transactions.map(transaction => transaction.type).filter((value, index, self) => self.indexOf(value)===index);

    let typesTotal = types.map(type => transactions.filter(transaction=> transaction.type === type).
    reduce((sum,transaction) => sum + transaction.amount, 0));

        
    if(monthView) {
        typesTotal = types.map(type => transactions.filter(transaction=> transaction.type === type &&
           transaction.date.substring(5, 7) == currentMonth.toString() &&
           transaction.date.substring(0, 4) == currentYear.toString()).
            reduce((sum,transaction) => sum + transaction.amount, 0));
     }

    const chartData = {
      labels: dates,
      datasets: [
        {
          label: "Expenses",
          data: getTotalsByDate(expenseData),
          backgroundColor: colors[0],
          borderColor: colors[0],
          tension: 0.3,
          fill: false,
        },
        {
          label: "Income",
          data: getTotalsByDate(incomeData),
          backgroundColor: colors[1],
          borderColor: colors[1],
          fill: false,
          tension: 0.3,
        },
        {
          label: "Savings & Investments",
          data: getTotalsByDate(investmentsData),
          backgroundColor: colors[2],
          borderColor: colors[2],
          fill: false,
          tension: 0.3,
        },
      ], 
    };

    const options : ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend:{
          labels: {
            color: "white",
          }
        },
      },
      scales:{
        y:{
          ticks:{ color:"#aaa"},
          grid: { display: false},
          },
        x:{
          ticks:{ color:"#aaa"},
          grid: { display: false},
          },
        },
      };

    return (
      <div>
        <div className='flex w-full h-fit'>
            <Line ref={chartRef} data={chartData} options={options} className=' flex flex-col items-center w-auto' />
            </div>
            <div className='flex items-center justify-center'>
            <Switch checked={monthView} onChange={() => setMonthView(!monthView)} />
            <span className="font-title text-sm ml-2 text-white">{monthView ? 'Month View' : 'All Records'}</span></div>
        </div>
    )
}

export default ExpensesVIncome