export class Notification {
    id?: string;
    dueDate: string;
    subject: string;
    isRecurring: boolean;
    user: string;
    amount: number;

    constructor(data: Partial<Notification>){
        this.id = data.id ? data.id : "";
        this.dueDate = data.dueDate? data.dueDate : "";
        this.subject = data.subject? data.subject : "";
        this.amount = data.amount? Number(data.amount) : 0;
        this.isRecurring = data.isRecurring? data.isRecurring : false;
        this.user = data.user? data.user : "";
    }
}