import React from 'react'

const Input = () => {

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <div className='dashboard-main'> New Transaction </div>
      <div className='grid grid-cols-3 gap-3'>
    <div>
      <div className='kpi-name ml-10 font-title text-white pb-3'> Please select the type of transaction </div>
      <select
            // id="employerDropdown"
            className="ml-10 px-5 w-2/4 h-14 rounded-2xl bg-[#2a2a2c] text-white text-xl font-title"
            //value={}
            // onChange={(e) => setSelectedEmployer(e.target.value)}
          >
            <option value="Výdaj">Výdaj</option>
            <option value="Příjem">Příjem</option>
            <option value="Jiné">Jiné</option>
          </select>
        </div>
        <div>
        <div className='kpi-name ml-10 font-title text-white pb-3'> Please select the amount</div>
            <input 
                className='ml-10 px-5 w-3/4 h-16 rounded-2xl bg-[#2a2a2c] text-white text-xl font-title'
                placeholder='0,-'>
            </input>
        </div>
        <button 
            className='input-button '>
            Submit
        </button>
      </div>
      </div>
  )
}

export default Input