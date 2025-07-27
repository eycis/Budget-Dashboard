import { Transaction } from "@/models/transaction";

export async function calculateCashFlow(transactions: Transaction[]) : Promise<number> {

    const currentMonth : number = new Date().getMonth() + 1;
    const currentYear : number = new Date().getFullYear();
    const prevMonth : number = currentMonth === 1? 12 : currentMonth - 1 ;

    const currentCashflow : number = getCalculations(transactions, currentMonth, currentYear);
    const previousCashflow : number = getCalculations(transactions, prevMonth, currentYear);

    const cashflowChange : number = ((currentCashflow - previousCashflow) / Math.abs(previousCashflow) * 100);

    return cashflowChange;

}

const getCalculations = (transactions : Transaction[], month: number, year: number) : number => {
    const expenses : number  = transactions.filter((transaction) => transaction.type === "Expense" 
    && isSameMonth(transaction.date, month, year))
    .reduce((sum, transaction) => sum + transaction.amount, 0);

    const income : number = transactions.filter((transaction) => transaction.type === "Income" 
    && isSameMonth(transaction.date, month, year))
    .reduce((sum, transaction) => sum + transaction.amount, 0);

    const difference : number = income - expenses;

    return difference;
}

const isSameMonth = (date: string, month : number, year: number) => {
    date.substring(5,7) == month.toString().padStart(2, "0")
    && date.substring(0, 4) == year.toString()
}
