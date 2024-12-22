export type Notification = {
    id?: number,
    dueDate: string,
    subject: string,
    isRecurring: boolean,
    user: string,
    amount: number,
}