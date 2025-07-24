import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { Transaction } from "./models/transaction";


const serviceAccount = JSON.parse(
  fs.readFileSync("config/serviceAccountKeys.json", "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function clearUsersCollection() {
  const snapshot = await db.collection("transactions").get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log("🧹 Kolekce 'transactions' byla vymazána.");
}

clearUsersCollection();

async function importTransactions() {

    const filePath = path.join(__dirname, "data", "mock_data.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(fileData);

    const transactions : Transaction [] = json.transactions;

    if(!Array.isArray(transactions)){
        throw new Error("JSON neobsahuje očekávaná data");
    }

    const promises = transactions.map((tx) =>
        db.collection("transactions").add(tx)
    );

    await Promise.all(promises);
    console.log(" Import dokončen.");
  };

importTransactions().catch(console.error);
