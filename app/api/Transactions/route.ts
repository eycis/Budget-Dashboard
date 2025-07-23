// import { NextApiRequest, NextApiResponse } from "next";
// import { dbAdmin } from "@/config/databaseAdmin"; 



// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === "GET") {
//     try{
//         const transactionsRef = dbAdmin.collection("transactions");
//         const snapshot = await transactionsRef.get();

//         const transactions = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }))
        
//         res.status(200).json({transactions});
//     } catch(error){
//         console.error("Error fetching transactions:", error);
//         res.status(500).json({message:"failed to fetch transactions", error});
//     }}
//     else{
//         res.status(405).json({message:"method not allowed"});
//     }
//     }

//     import { NextApiRequest, NextApiResponse } from "next";
//     import {dbAdmin} from "@/config/databaseAdmin";
    
//     export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//         if (req.method === "POST") {
//           try{
//             const { category, type, amount, date, description} = req.body;
            
//             if (!category || !type || !amount || !date) {
//                 return res.status(400).json({ message: "Missing required fields." });
//               }
    
//             const newTransaction = {
//                 category,
//                 type,
//                 amount,
//                 date,
//                 description: description || "",
//               };
    
//               await dbAdmin.collection("transactions").doc().set(newTransaction);
        
//               console.log("data z api: ",  category, type, amount, date, description)
//               res.status(201).json({ message: "Transaction added"});
//             } catch (error) {
//               console.error("Error adding transaction:", error);
//               res.status(500).json({ message: "Internal Server Error", error });
//             }
//         }};
