import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("messages")
      .where("isVisible", "==", true) // 有需要過濾可保留
      .orderBy("createdAt", "desc")
      .limit(50) // ⭐️ 固定 50 筆
      .get();

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify({ messages }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // console.error("[API Error] Get Homepage Messages:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
