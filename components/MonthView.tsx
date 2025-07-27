import React from 'react'

interface Props {
    onSelectMonth : (month: number) => void;
}

const MonthView = ({onSelectMonth} : Props) => {

    const months : string [] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return (
    <div className='bg-[#2a2a2c] rounded-t-3xl w-full h-14 absolute bottom-0 grid grid-cols-12 gap-2'>
        {months.map((month, index) => (
            <button
                key = {month}
                onClick= { () => { console.log("clicked") , onSelectMonth(index + 1)}}>
                {month}
            </button>
        ))}
    </div>
  )
}

export default MonthView