import { dbAdmin } from "@/config/databaseAdmin"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try{
        const body = await req.json();
        const {user, password} = body;

        const userRef = dbAdmin.collection("users");

        const userQuery = userRef.where('name', '==', user).where('password', '==', password);

        const querySnapshot = await userQuery.get();
        
        if (querySnapshot.empty) {
            NextResponse.json({message: 'invalid credential'}, {status: 401});
        }

        NextResponse.json({message: 'user logged in!'}, {status: 200});
    } catch(error){
        console.error("Error while trying to log in", error);
        NextResponse.json({message:"Internal Server Error"}, {status: 500});
    }
}
