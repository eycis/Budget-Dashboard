import * as admin from "firebase-admin";
import * as serviceAccount from "@/config/serviceAccountKey.json";

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

const dbAdmin = admin.firestore();

export {dbAdmin};
