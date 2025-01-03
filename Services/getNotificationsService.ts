import { Notification } from "@/models/notification";

export const getNotifications = async (): Promise<Notification[] | null > => {
    try{
        const response = await fetch("api/fetchNotifications");
        if(!response.ok){
          console.error("error while fetching the data");
          return null;
        }
        const data = await response.json();
        return data.notifications; 
      }
      catch(error){
        console.error("error while api call", error);
        return null;
      }
}