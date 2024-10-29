import React from 'react'

const Input = () => {

    function submitTransaction(): void {
        console.log("you saved your transaction");
    }

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <div className='dashboard-main'> New Transaction </div>
      <div className='grid grid-cols-3 gap-3'>
    <div>
      <div className='transactions-text'> Please select the type of transaction </div>
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
        <div className='transactions-text'> Please select the amount</div>
            <input 
                className='ml-10 px-5 w-3/4 h-14 rounded-2xl bg-[#2a2a2c] text-white text-xl font-title'
                placeholder='0,-'>
            </input>
        </div>
        <button 
            onClick={submitTransaction}
            className='input-button '>
            Submit
        </button>
      </div>
      <div className='transactions-text mt-10'> Your previous transactions</div>
      <div className='transaction-table'>

      </div>
      </div>
  )
}

export default Input