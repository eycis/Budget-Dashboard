import React, { ChangeEvent, useEffect, useState } from 'react'
import { Transaction } from '@/models/transaction';
import ConfirmationModal from './confirmationModal';

const Input = () => {
  
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('Expense');
    const [options, setOptions] = useState<string[]>([]);
    const [saveState, setSaveState] = useState<boolean>(false);


    const updateOptions = (value: string) => {
      if (value === 'Savings & Investment') {
        setOptions(['Savings', 'Investment']);
      } else {
        setOptions(['Utilities', 'Fun', 'Friends', 'Clothes', 'Health', 'Transportation', 'Other']);
      }
    };

    useEffect(() => {
      updateOptions(selectedValue);
      }, [selectedValue]);
    
    
    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSelectedValue = (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setSelectedValue(value);
      updateOptions(value);
    }

    const submitTransaction= async () => {

      try {       
          const newTransaction: Transaction = {
              category: (document.getElementById('category') as HTMLSelectElement).value,
              type: (document.getElementById('transactionType') as HTMLSelectElement).value,
              amount: parseFloat((document.getElementById('transactionAmount') as HTMLInputElement).value),
              date: Date.now().toString(),
              description: (document.getElementById('transactionDescription') as HTMLInputElement).value
          };
          console.log("----------------------------------------");
          console.log(newTransaction);
          const response = await fetch("api/submitTransaction", {
            method: "POST", 
            headers: {
              "Content-Type" : "application/json",
            },
            body: JSON.stringify(newTransaction),
          });

          const text = await response.text();
          console.log("response", text);
          const parsedText = JSON.parse(text);
          console.log("parsed", parsedText);

          if (response.ok) {
            console.log("Data byla úspěšně odeslána!");
            setTransactions((prev) => [...prev, newTransaction]); // po testování smazat
            setSaveState(true);
          } else {
            console.error("Chyba při odesílání dat na server.");
            const errorData = await response.json();
            console.log("error data:", errorData);
            setSaveState(false);
          }
      
          handleOpenModal();
          }
        catch(error){
          console.error("chyba při odesílání dat přes api: ", error);
        }};


  return (
    <div className='bg-[#1c1c1e] w-screen h-screen p-5'>
      <p className='dashboard-main'> New Transaction </p>
      <div className='grid grid-cols-4'>
    <div>
      <div className='transactions-text'> Select the type of transaction </div>
      <select
            name = "type"
            className="ml-10 px-5 w-3/4 h-10 text-lg rounded-2xl bg-[#2a2a2c] text-white  font-title"
            id = "transactionType"
            value = {selectedValue}
            onChange = {handleSelectedValue}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
            <option value="Savings & Investment">Savings & Investment</option>
            <option value="Other">Other</option>
          </select>

        </div>
      <div>
      <div className='transactions-text'> Select the category of transaction </div>
      <select
            name = "type"
            className="ml-10 px-5 w-3/4 h-10 rounded-2xl bg-[#2a2a2c] text-white text-lg font-title"
            id = "category"
          >
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
          </select>
        </div>
        <div>
        <div className='transactions-text'> Please select the amount</div>
            <input 
                name = "amount"
                id = "transactionAmount"
                className='ml-10 px-5 w-3/4 h-10 rounded-2xl bg-[#2a2a2c] text-white text-lg font-title'
                placeholder='0,-'>
            </input>
        </div>
        <button 
            onClick={submitTransaction}
            className='input-button '>
            Submit
        </button>
        {showModal && (
            <ConfirmationModal
            message={saveState? "Transaction is saved" : "Please fill out the amount with valid figures"}
            onClose={handleCloseModal}
        />
      )}
      </div>
      <div>
      <div className='transactions-text pt-4'> Add your description</div>
            <input 
                name = "description"
                id = "transactionDescription"
                maxLength={25}
                className='ml-10 px-5 w-3/4 h-10 rounded-2xl bg-[#2a2a2c] text-white text-lg font-title'
                >
            </input>
      </div>
      <p className='transactions-text mt-10' data-aos="fade-down"> Your previous transactions</p>
      <div className='transaction-table mx-5 overflow-y-auto'>
        <div className='grid grid-cols-5 text-center pt-5' data-aos="fade-down">
            <label className='transactions_columns'>Date</label>
            <label className='transactions_columns'>Transaction Type</label>
            <label className='transactions_columns'>Category</label>
            <label className='transactions_columns'>Amount</label>
            <label className='transactions_columns'>Description</label>
        </div>
        {transactions.map((transaction, index) =>(
            <div key = {index}
                className='grid grid-cols-5 mt-3 mx-5 mb-3 p-3 h-max w-auto text-center items-center bg-[#1c1c1e] rounded-lg'>
                <div className='transactionsTableText'>{new Date(parseInt(transaction.date)).toLocaleString()}</div>
                <div className='transactionsTableText'>{transaction.type}</div>
                <div className='transactionsTableText'>{transaction.category}</div>
                <div className='transactionsTableText'>{transaction.amount}</div>
                <div className='transactionsTableText'>{transaction.description || "-"}</div>
            </div>
        ))}
        </div>
      </div>
  )
}

export default Input;