// lib/firebase-admin.js
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// console.log("[Firebase Admin] 正在初始化..."); //debug

// 讀取 .env.local 參數
const serviceAccount = {
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  project_id: process.env.FIREBASE_PROJECT_ID,
};

// console.log("[Firebase Admin] 環境變數載入：", {
//   projectId: serviceAccount.project_id,
//   clientEmail: serviceAccount.client_email,
//   privateKey: serviceAccount.private_key ? "[已載入]" : "[空值]",
// });

// 這行會印出完整 Private Key，正式環境 **務必註解掉！！**
// console.log("[Firebase Admin] Private Key 原始：", process.env.FIREBASE_PRIVATE_KEY);


let adminApp;
try {
  adminApp = !getApps().length
    ? initializeApp({ credential: cert(serviceAccount) })
    : getApp();

  // console.log("[Firebase Admin] 初始化成功");
} catch (error) {
  console.error("[Firebase Admin] 初始化失敗：", error);
}

export const adminDb = getFirestore(adminApp);
