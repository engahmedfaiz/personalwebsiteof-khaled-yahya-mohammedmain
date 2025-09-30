import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user?.role !== "admin" && session.user?.role !== "lawyer")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("law_firm")

    const articles = await db.collection("articles").find({}).toArray()

    return NextResponse.json(articles)
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user?.role !== "admin" && session.user?.role !== "lawyer")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const client = await clientPromise
    const db = client.db("law_firm")

    const newArticle = {
      ...body,
      author: session.user.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("articles").insertOne(newArticle)

    return NextResponse.json({ _id: result.insertedId, ...newArticle })
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
