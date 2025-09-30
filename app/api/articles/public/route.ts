// ملف: /app/api/public/articles/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("law_firm");

    // فقط المقالات المنشورة
    const articles = await db
      .collection("articles")
      .find({ isPublished: true })
      .sort({ publishedAt: -1 }) // ترتيب حسب التاريخ
      .toArray();

    // تأكد من تحويل ObjectId إلى string
    const serialized = articles.map((article) => ({
      ...article,
      _id: article._id.toString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error("Error fetching public articles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
