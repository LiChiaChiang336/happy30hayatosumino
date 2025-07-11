import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // 解析 query string
  const limit = Number(searchParams.get("limit") || 10);
  const order = searchParams.get("order") || "desc";
  // const startAfterTimestamp = searchParams.get("startAfter"); // 格式："2025-07-10T12:34:56Z"
  const startAfterParam = searchParams.get("startAfter");

  console.log(
    "[Board API] limit:",
    limit,
    "order:",
    order,
    "startAfter:",
    startAfterParam
  ); // 這裡除錯

  try {
    const collectionRef = adminDb.collection("messages");

    console.log("[Board API] 正在查詢 Firestore..."); // 這裡除錯

    // 建立初始 query
    let query = collectionRef
      .where("isVisible", "==", true)
      .orderBy("createdAt", order); // 直接用 asc / desc

    // 加上 startAfter 篩選
    if (startAfterParam) {
      const startAfterDate = new Date(startAfterParam);
      if (!isNaN(startAfterDate)) {
        console.log(
          "[Board API] 使用 startAfter:",
          startAfterDate.toISOString()
        ); // 這裡除錯
        query = query.startAfter(startAfterDate); // Firestore 支援 Date 型別
      } else {
        console.warn("[Board API] 無效的 startAfter:", startAfterParam);
      }
    }

    // 設定筆數限制
    query = query.limit(limit);
    console.log("[Board API] 正在查詢 Firestore..."); // 這裡除錯
    const snapshot = await query.get();
    console.log("[Board API] 查詢成功，共取得：", snapshot.size, "筆"); // 這裡除錯

    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        nickname: data.nickname,
        message: data.message,
        starColor: data.starColor,
        starShape: data.starShape,
        date: data.createdAt.toDate().toISOString().split("T")[0],
        createdAt: data.createdAt.toDate().toISOString(), // ⬅給前端做分頁用
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
