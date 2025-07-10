"use client";
import { db } from "@/lib/firebase";


export default function BoardPage() {

  console.log("Firebase Firestore db:", db);
  return <div className="mt-16 text-white px-8">Inspiration
  <div>Check console for Firestore db object</div></div>;
}
