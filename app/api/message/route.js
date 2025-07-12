export const runtime = "nodejs";

// 現在改用 admin SDK，原本 client SDK 的 import 已註解
// import { db } from "@/lib/firebase";`
import { adminDb } from "@/lib/firebase-admin";

// 新增這行，取得 admin SDK 的 Timestamp
import { Timestamp } from "firebase-admin/firestore";

// 原本是 firebase/firestore (client SDK)
// import {
//   collection,
//   addDoc,
//   serverTimestamp,
//   query,
//   where,
//   getDocs,
//   Timestamp,
// } from "firebase/firestore";

/**
 * 防止 XSS：簡單替換 < > & 等符號
 */
function sanitizeString(str) {
  return String(str).replace(/[<>&"'`]/g, (char) => {
    const map = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#39;",
      "`": "&#96;",
    };
    return map[char] || char;
  });
}

/**
 * 取得 IP：
 * - Cloudflare / Vercel：x-forwarded-for
 * - 開發環境：127.0.0.1 或 ::1
 */
function getClientIp(request) {
  // Cloudflare / Vercel 都會傳 x-forwarded-for
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return process.env.NODE_ENV === "development" ? "127.0.0.1" : "unknown";
}

export async function POST(request) {
  try {
    const body = await request.json();

    /**
     * Google reCAPTCHA 驗證
     */
    const recaptchaToken = body.recaptchaToken;
    if (!recaptchaToken) {
      return Response.json(
        { error: "Missing reCAPTCHA token" },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      }
    );

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      // console.error("reCAPTCHA failed:", verifyData);
      return Response.json({ error: "reCAPTCHA failed" }, { status: 400 });
    }
    // 這整段都給 reCAPTCHA 驗證

    // 防機器人：檢查 trap 欄位（honeypot）
    if (body.trap && body.trap.trim() !== "") {
      return Response.json({ error: "Bot detected" }, { status: 400 });
    }

    // 取得留言資訊
    const nickname = sanitizeString(body.nickname || "");
    const message = sanitizeString(body.message || "");
    const starShape = parseInt(body.starShape, 10) || 7;
    const starColor = sanitizeString(body.starColor || "");
    const ip = getClientIp(request);

    /**
     * 查詢今天是否已留言過
     */
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    // 轉成 Firestore timestamp
    const startTimestamp = Timestamp.fromDate(startOfDay);
    const endTimestamp = Timestamp.fromDate(endOfDay);

    // 查詢是否今天已留言，原本 client SDK 寫法（已註解保留）
    // const messagesRef = collection(db, "messages");
    // const ipQuery = query(
    //   messagesRef,
    //   where("ip", "==", ip),
    //   where("createdAt", ">=", startTimestamp),
    //   where("createdAt", "<", endTimestamp)
    // );

    // const querySnapshot = await getDocs(ipQuery);

    // 如果今天已經有留言 → 回傳錯誤
    // if (!querySnapshot.empty) {
    //   return Response.json(
    //     { error: "Already submitted today" },
    //     { status: 400 }
    //   );
    // }

    /**
     * 改為 admin SDK 查詢 messages collection
     */
    const messagesRef = adminDb.collection("messages");
    const ipQuery = messagesRef
      .where("ip", "==", ip)
      .where("createdAt", ">=", startTimestamp)
      .where("createdAt", "<", endTimestamp);

    const querySnapshot = await ipQuery.get();

    // 如果今天已經有留言 → 回傳錯誤
    if (!querySnapshot.empty) {
      return Response.json(
        { error: "Already submitted today" },
        { status: 400 }
      );
    }

    /**
     * 表格資料驗證
     */
    if (!nickname.trim() || !message.trim()) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    if (starShape < 7 || starShape > 14) {
      return Response.json({ error: "Invalid starShape" }, { status: 400 });
    }

    /**
     * 寫入 Firestore
     * - 原本 client SDK 寫法（已註解保留）
     */
    // await addDoc(collection(db, "messages"), {
    //   nickname,
    //   message,
    //   starShape,
    //   starColor,
    //   createdAt: serverTimestamp(),
    //   ip,
    //   isVisible: true,
    // });

    await messagesRef.add({
      nickname,
      message,
      starShape,
      starColor,
      createdAt: Timestamp.now(), // admin SDK 的 Timestamp
      ip,
      isVisible: true,
    });

    return Response.json({ success: true });
  } catch (error) {
    // console.error("Error saving message:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
