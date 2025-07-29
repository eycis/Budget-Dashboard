import { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/databaseAdmin"; 
import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "@/models/transaction";


export async function GET () {
    try{
        const transactionsRef = dbAdmin.collection("transactions");
        const snapshot = await transactionsRef.get();

        const transactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        
        return NextResponse.json({data: transactions}, {status: 200});
    } catch(error){
        console.error("Error fetching transactions:", error);
        return NextResponse.json({message:"Internal Server Error"}, {status: 500});
    }
};
    
    export async function POST (req: NextRequest){
          try{
            const body = await req.json();
            const { category, type, amount, description} = body;
            const date : string = new Date().toISOString().split("T")[0]; 

            
            if (!category || !type || !amount) {
                return NextResponse.json({ message: "Missing required fields."}, {status: 400});
              }
    
            const newTransaction : Transaction = {
                category,
                type,
                amount,
                date,
                description,
              };
    
              await dbAdmin.collection("transactions").add(newTransaction);
        
              return NextResponse.json({ message: "Transaction added"}, {status: 200});
            } catch (error) {
              console.error("Error adding transaction:", error);
              return NextResponse.json({ message: "Internal Server Error"}, {status: 500});
            }
        };
