//import {db} from "@/config/databaseConfig";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import {dbAdmin} from "@/config/databaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
      try{
        const body = await req.json();
        const { dueDate, subject, isRecurring, user, amount} = body;
        
        if ( !dueDate || !subject || !user || !amount) {
            return NextResponse.json({ message: "Missing required fields."}, {status: 400});
        }

        const newNotification = {
            dueDate,
            subject,
            isRecurring,
            user,
            amount
          };

        await dbAdmin.collection("notifications").add(newNotification);

        NextResponse.json({ message: "Notification added"}, {status: 200});
        } catch (error) {
          console.error("Error adding transaction:", error);
          NextResponse.json({ message: "Internal Server Error"}, {status: 500});
        }
    };
    
    export async function GET() {
        try{
            const docData = await dbAdmin.collection("notifications").get();

            if(docData.empty){
                NextResponse.json({message:"No notifications found"}, {status: 204})
            }
    
            const notifications = docData.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            
            NextResponse.json({data: notifications}, {status: 200});
        } catch(error){
            console.error("Error fetching notifications:", error);
            NextResponse.json({message:"failed to fetch notifications"}, {status:500});
        }
    };
        
    