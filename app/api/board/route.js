import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get("limit") || 10);
  const order = searchParams.get("order") || "desc";
  const startAfterTimestamp = searchParams.get("startAfter"); // 格式："2025-07-10T12:34:56Z"

  console.log(
    "[Board API] limit:",
    limit,
    "order:",
    order,
    "startAfter:",
    startAfterTimestamp
  ); // ✅ 這裡除錯

  try {
    console.log("[Board API] 正在查詢 Firestore..."); // ✅ 這裡除錯

    let query = adminDb
      .collection("messages")
      .where("isVisible", "==", true)
      .orderBy("createdAt", order === "desc" ? "desc" : "asc")
      .limit(limit);

    // 如果有傳 startAfter，轉成 Date 再加上 startAfter
    if (startAfterTimestamp) {
      const startAfterDate = new Date(startAfterTimestamp);
      console.log("[Board API] 使用 startAfter:", startAfterDate.toISOString());
      query = query.startAfter(startAfterDate);
    }

    const snapshot = await query.get();

    console.log("[Board API] 查詢成功，共取得：", snapshot.size, "筆"); // ✅ 這裡除錯

    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        nickname: data.nickname,
        message: data.message,
        starColor: data.starColor,
        starShape: data.starShape,
        date: data.createdAt.toDate().toISOString().split("T")[0],
        createdAt: data.createdAt.toDate().toISOString(), // ⬅️ 給前端做分頁用
      };
    });

    return new Response(JSON.stringify({ messages }), { status: 200 });
  } catch (error) {
    console.error("[Board API 錯誤]", error);
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
    });
  }
}
