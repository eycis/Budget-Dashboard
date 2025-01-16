import {user} from "@/models/user"

export const getLoginUser = async({user, password}: user): Promise<boolean> => {
    let data = false;
    console.log(user);
        console.log(password);
    try {
        const response = await fetch("api/fetchLoginUser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user, password})
            });
            if(!response.ok){
                console.error("error while fetching the data");
                return data;
            }
            console.log("------------------");
            
            data = true;
            console.log(data);
            return data;
    }catch(error){
        console.error("error with loading transactions", error);
        return data;
    }
}
