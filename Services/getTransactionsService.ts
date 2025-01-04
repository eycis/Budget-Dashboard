import { Transaction } from "@/models/transaction";

export const getTransactions = async(): Promise<Transaction [] | null> => {
    try {
        const response = await fetch("api/fetchTransactions");
        if(!response.ok){
        console.error("error while fetching the data");
        }
        const data = await response.json();
        return data.transactions;
    }catch(error){
        console.error("error with loading transactions", error);
        return null;
    }
}
