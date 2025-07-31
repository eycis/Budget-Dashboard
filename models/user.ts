export class User  {
    user: string;
    password: string;

    constructor(data : Partial<User>){
        this.user = data.user ? data.user : "";
        this.password = data.password ? data.password : "";
    }
}