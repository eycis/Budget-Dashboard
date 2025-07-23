import {user} from "@/models/user"

export const getLoginUser = async({user, password}: user): Promise<boolean> => {
    try {
        const response = await fetch("api/Login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user, password})
            });

            if(!response.ok){
                console.error("error while fetching the data");
                return false;
            }
            return true;
    }catch(error){
        console.error("error with loading transactions", error);
        return false;
    }
}
