import { Transaction } from "@/models/transaction";

export async function getExpensesAnomalies(transaction: Transaction[]) {
    const currentMonth : number = new Date().getMonth() + 1;
    const currentYear : number = new Date().getFullYear();

//     const expensesSum : number = transactions.filter((transaction) => transaction.type === "Expense")
//         .reduce((sum, transaction) => sum + transaction.amount, 0);
    
//     const expensesAverage : number = expensesSum / transactions.length;

//     const currentExpenses : number  = transactions.filter((transaction) => transaction.type === "Expense" 
//         && transaction.date.substring(5,7) == currentMonth.toString().padStart(2, "0")
//         && transaction.date.substring(0, 4) == currentYear.toString())
//         .reduce((sum, transaction) => sum + transaction.amount, 0);

//     const expensesDeviation : number = Math.round(((currentExpenses - expensesAverage) / expensesAverage) * 100);
}