import {db} from "@/config/databaseConfig";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import {dbAdmin} from "@/config/databaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      try{
        const { dueDate, subject, isRecurring, user, amount} = req.body;
        
        if ( !dueDate || !subject || !user || !amount) {
            return res.status(400).json({ message: "Missing required fields." });
          }

        const newNotification = {
            dueDate,
            subject,
            isRecurring,
            user,
            amount
          };

          await dbAdmin.collection("notifications").doc().set(newNotification);
          res.status(201).json({ message: "Notification added"});
        } catch (error) {
          console.error("Error adding transaction:", error);
          res.status(500).json({ message: "Internal Server Error", error });
        }
    }};