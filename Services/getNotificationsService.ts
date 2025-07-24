import { Notification } from "@/models/notification";

export const getNotifications = async (): Promise<{data: Notification[] | null, message : string} > => {
    try{
        const response = await fetch("api/Notifications");
        const json = await response.json();

        if(!response.ok){
          return {data: null, message:json.message}
        }

        return {data: json.data, message: json.message} 
      }
      catch(error){
        console.error("error while api call", error);
        return {data: null, message: "Internal Server Error"};
      }
}