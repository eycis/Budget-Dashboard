import { Transaction } from "@/models/transaction";
import {isSameMonth} from "@/lib/calculations/isSameMonth"

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
    //TODO: opatřit výjimku v případě, že za minulý měsíc nejsou k dispozici data.
    const difference : number = income - expenses;
    return difference;
}

