import { Transaction } from "@/models/transaction";

export const getTransactions = async(): Promise<{data: Transaction [] | null, message: string}> => {
    try {
        const response = await fetch("api/Transactions");

        const data = await response.json();

        if(!response.ok){
            return {data: null, message: data.message};
        }
     
        return {data: data.data, message: data.message };
    }catch(error){
        console.error("error with loading transactions", error);
        return {data: null, message: "Internal Server Error"};
    }
}
