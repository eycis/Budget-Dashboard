import { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/databaseAdmin"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
    try{
        const notificationsRef = dbAdmin.collection("notifications");
        const snapshot = await notificationsRef.get();

        const notifications = snapshot.docs.map((doc) => ({
            id: doc.id,
            dueDate: doc.data().dueDate,
            subject: doc.data().subject,
            isRecurring: doc.data().isRecurring,
            user: doc.data().user,
            amount: doc.data().amount,
        }))
        
        res.status(200).json({notifications});
    } catch(error){
        console.error("Error fetching notifications:", error);
        res.status(500).json({message:"failed to fetch notifications", error});
    }}
    else{
        res.status(405).json({message:"method not allowed"});
    }
    }
