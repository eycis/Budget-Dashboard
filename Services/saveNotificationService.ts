import { Notification } from "@/models/notification";

export const SaveNotification = async(newNotification : Notification): Promise<boolean> => {
    try{
          const response = await fetch("api/Notifications", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newNotification),
          });
          if(!response.ok){
            return false;
          }
          return true;
        }
        catch(error){
          console.error("error during appi call", error);
          return false;
        }
      };