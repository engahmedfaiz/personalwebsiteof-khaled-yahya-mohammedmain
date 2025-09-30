// app/api/articles/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    const client = await clientPromise;
    const db = client.db("law_firm");

    const article = await db
      .collection("articles")
      .findOne({ _id: new ObjectId(params.id)  });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // تحويل _id إلى string
    const { _id, ...articleData } = article;
    return NextResponse.json({ ...articleData, _id: _id.toString() });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    const client = await clientPromise;
    const db = client.db("law_firm");
    
    const body = await request.json();

    // التحقق من أن Slug فريد (مع استبعاد نفس المقالة)
    if (body.slug) {
      const existingArticle = await db
        .collection("articles")
        .findOne({ slug: body.slug, _id: { $ne: new ObjectId(params.id) } });
      
      if (existingArticle) {
        return NextResponse.json(
          { error: "Slug already exists" },
          { status: 409 }
        );
      }
    }

    const updateData: any = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    if (body.isPublished && !body.publishedAt) {
      updateData.publishedAt = new Date().toISOString();
    }

    const result = await db
      .collection("articles")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("law_firm");

    const result = await db
      .collection("articles")
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
