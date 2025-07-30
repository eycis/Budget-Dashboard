import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { Notification} from "./models/notification";


const serviceAccount = JSON.parse(
  fs.readFileSync("config/serviceAccountKeys.json", "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function clearUsersCollection() {
  const snapshot = await db.collection("notifications").get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log("🧹 Kolekce 'notifications' byla vymazána.");
}

clearUsersCollection();

async function importTransactions() {

    const filePath = path.join(__dirname, "data", "mock_data_notification.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(fileData);

    const notifications: Notification[]  = json.notifications;

    console.log(Array.isArray(notifications)); // true → OK
    if(!Array.isArray(notifications)){
        throw new Error("JSON neobsahuje očekávaná data");
    }

    const promises = notifications.map((tx) =>
        db.collection("notifications").add(tx)
    );

    await Promise.all(promises);
    console.log(" Import dokončen.");
  };

importTransactions().catch(console.error);
