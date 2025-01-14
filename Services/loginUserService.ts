import {user} from "@/models/user"

export const getLoginUser = async({user, password}: user): Promise<boolean> => {
    let data = false;
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

            data = true;
            return data;
    }catch(error){
        console.error("error with loading transactions", error);
        return data;
    }
}
