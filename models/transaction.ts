export class Transaction  {
    id?: string;
    type: string;
    category: string;
    amount: number;
    date: string;
    description?: string;


    constructor(data: Partial<Transaction>){
        this.id = data.id ? data.id : "";
        this.type = data.type? data.type : "";
        this.category = data.category? data.category : "";
        this.amount = data.amount? Number(data.amount) : 0;
        this.date = data.date? data.date : "";
        this.description = data.description;
    }
}