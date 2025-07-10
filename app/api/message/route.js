// app/api/message/route.js
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
 * 取得 IP（開發時會是 127.0.0.1），本地開發會本地開發還是會顯示 ::1，上 Vercel / Cloudflare：才會是使用者的真實 IP。
 */
function getClientIp(request) {
  // Cloudflare / Vercel 都會傳 x-forwarded-for
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  // 開發環境是 ::1 或 127.0.0.1
  return process.env.NODE_ENV === "development" ? "127.0.0.1" : "unknown";
}

export async function POST(request) {
  try {
    const body = await request.json();

    // 這整段都給 reCAPTCHA 驗證
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
      console.error("reCAPTCHA failed:", verifyData);
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

    // 資料驗證
    if (!nickname.trim() || !message.trim()) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }
    
    if (starShape < 7 || starShape > 14) {
      return Response.json({ error: "Invalid starShape" }, { status: 400 });
    }

    // 寫入 Firestore
    await addDoc(collection(db, "messages"), {
      nickname,
      message,
      starShape,
      starColor,
      createdAt: serverTimestamp(),
      ip,
      isVisible: true,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error saving message:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
