export type Notification = {
    id?: string,
    dueDate: string,
    subject: string,
    isRecurring: boolean,
    user: string,
    amount: number,
}