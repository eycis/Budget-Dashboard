import { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/databaseAdmin"; 
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
    try{
          
        const userRef = dbAdmin.collection("users");

        const {user, password} = req.body;

        const userQuery = query(userRef, where('name', '==', user), where('password', '==', password));

        const querySnapshot = await getDocs(userQuery);
        
        if (!querySnapshot.empty) {
            res.status(200).json({message: 'user logged in!'});
        } else {
            res.status(401).json({message: 'invalid credential'});
        }
    } catch(error){
        console.error("Error trying to log in", error);
        res.status(500).json({message:"failed due to", error});
    }}
    else{
        res.status(405).json({message:"method not allowed"});
    }
    }
