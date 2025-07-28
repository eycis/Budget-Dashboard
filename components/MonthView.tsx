import React from 'react'
import {format, subMonths} from "date-fns";

interface Props {
    onSelectMonth : (month: number, year: number) => void;
}

const MonthView = ({onSelectMonth} : Props) => {

    const today = new Date(); 
    const lastSixMonths = Array.from({length: 6}, (_, i) => {
        const date = subMonths(today, i);
        return {
            label: format(date, "MMM yyyy"),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
    }).reverse();

  return (
    <div className='bg-[#2a2a2c] absolute bottom-0 grid grid-cols-6 gap-4 place-items-center justify-center rounded-t-3xl w-full h-14 '>
        {lastSixMonths.map(({label, month, year}) => (
            <button
                key = {`${month}-${year}`}
                onClick= { () => onSelectMonth(month, year)}
                className='font-title text-white hover:text-[#3a3aa3] transition-colors duration-500'>
                {label}
            </button>
        ))}
    </div>
  )
}

export default MonthView