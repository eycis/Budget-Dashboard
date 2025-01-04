import { Notification } from "@/models/notification";

export const SaveNotification = async(newNotification : Notification): Promise<boolean> => {
    let saveStatus = false;
    try{
          const response = await fetch("api/saveNotification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newNotification),
          });
          if(response.ok){
            saveStatus = true;
          }
          return saveStatus;
        }
        catch(error){
          console.error("error during appi call", error);
          return saveStatus;
        }
      };