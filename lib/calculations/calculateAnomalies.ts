import { Transaction } from "@/models/transaction";

export async function calculateAnomalies(transactions: Transaction[]) 
    : Promise<{incomeDeviation: number, expensesDeviation: number}> {
    const currentMonth : number = new Date().getMonth() + 1;
    const currentYear : number = new Date().getFullYear();

    const expensesSum : number = transactions.filter((transaction) => transaction.type === "Expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expensesAverage : number = expensesSum / transactions.length;

    const currentExpenses : number  = transactions.filter((transaction) => transaction.type === "Expense" 
        && transaction.date.substring(5,7) == currentMonth.toString().padStart(2, "0")
        && transaction.date.substring(0, 4) == currentYear.toString())
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expensesDeviation : number = Math.round(((currentExpenses - expensesAverage) / expensesAverage) * 100);

    const incomeSum : number = transactions.filter((transaction) => transaction.type === "Income")
        .reduce((sum,transaction) => sum + transaction.amount, 0);

    const incomeAverage : number = incomeSum / transactions.length;

    const currentIncome : number = transactions.filter((transaction) => transaction.type === "Income" 
    && transaction.date.substring(5,7) == currentMonth.toString().padStart(2, "0")
    && transaction.date.substring(0, 4) == currentYear.toString())
    .reduce((sum, transaction) => sum + transaction.amount, 0);

    const incomeDeviation : number = Math.round(((currentIncome - incomeAverage) / incomeAverage) * 100);

    return({incomeDeviation, expensesDeviation});
}