// import clientPromise from "@/lib/mongodb"
// import { ObjectId } from "mongodb"
// import { NextRequest } from "next/server"

// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//   const client = await clientPromise
//   const db = client.db("law_firm")

//   const user = await db.collection("users").findOne({ _id: new ObjectId(params.id) })
//   const newStatus = !user?.isActive

//   await db.collection("users").updateOne(
//     { _id: new ObjectId(params.id) },
//     { $set: { isActive: newStatus, updatedAt: new Date() } }
//   )

//   return Response.json({ message: `تم ${newStatus ? "تفعيل" : "تعطيل"} المستخدم` })
// }

import clientPromise from "@/lib/mongodb"
import { NextRequest } from "next/server"
import { ObjectId } from "mongodb"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db("law_firm")

    // البحث عن المستخدم الحالي
    const user = await db.collection("users").findOne({
      _id: new ObjectId(params.id)
    })

    if (!user) {
      return Response.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      )
    }

    // تبديل حالة المستخدم
    await db.collection("users").updateOne(
      { _id: new ObjectId(params.id) },
      { 
        $set: { 
          isActive: !user.isActive,
          updatedAt: new Date()
        } 
      }
    )

    return Response.json({ 
      message: `✅ تم ${!user.isActive ? 'تفعيل' : 'تعطيل'} المستخدم بنجاح`,
      isActive: !user.isActive
    })
  } catch (error) {
    return Response.json(
      { error: "حدث خطأ أثناء تحديث حالة المستخدم" },
      { status: 500 }
    )
  }
}