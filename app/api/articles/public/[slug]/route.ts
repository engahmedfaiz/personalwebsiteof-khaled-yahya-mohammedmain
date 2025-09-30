import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db("law_firm")

    const article = await db
      .collection("articles")
      .findOne({ slug: params.slug, isPublished: true })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json({ ...article, _id: article._id.toString() })
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
