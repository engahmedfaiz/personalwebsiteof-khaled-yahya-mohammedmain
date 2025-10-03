// // ملف: /app/api/public/articles/route.ts
// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("law_firm");

//     // فقط المقالات المنشورة
//     const articles = await db
//       .collection("articles")
//       .find({ isPublished: true })
//       .sort({ publishedAt: -1 }) // ترتيب حسب التاريخ
//       .toArray();

//     // تأكد من تحويل ObjectId إلى string
//     const serialized = articles.map((article) => ({
//       ...article,
     
//     }));

//     return NextResponse.json(serialized);
//   } catch (error) {
//     console.error("Error fetching public articles:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// ملف: /app/api/public/articles/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic"; // ✅ منع الكاش

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

    // ✅ تحويل ObjectId وتواريخ إلى string
    const serialized = articles.map((article) => ({
      ...article,
      _id: article._id.toString(),
      publishedAt: article.publishedAt
        ? new Date(article.publishedAt).toISOString()
        : null,
      createdAt: article.createdAt
        ? new Date(article.createdAt).toISOString()
        : null,
      updatedAt: article.updatedAt
        ? new Date(article.updatedAt).toISOString()
        : null,
    }));

    return NextResponse.json(serialized, { status: 200 });
  } catch (error) {
    console.error("Error fetching public articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
