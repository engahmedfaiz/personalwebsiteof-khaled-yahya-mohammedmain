// import clientPromise from "@/lib/mongodb"
// import { ObjectId } from "mongodb"
// import { NextRequest } from "next/server"

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const body = await req.json()
//   const client = await clientPromise
//   const db = client.db("law_firm")

//   await db.collection("users").updateOne(
//     { _id: new ObjectId(params.id) },
//     { $set: { ...body, updatedAt: new Date() } }
//   )

//   return Response.json({ message: "✅ تم تعديل المستخدم" })
// }

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   const client = await clientPromise
//   const db = client.db("law_firm")

//   await db.collection("users").deleteOne({ _id: new ObjectId(params.id) })

//   return Response.json({ message: "🗑️ تم حذف المستخدم" })
// }

import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { NextRequest } from "next/server"
import { ObjectId } from "mongodb"
import { writeFile } from "fs/promises"
import path from "path"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db("law_firm")
    
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(params.id) },
      { projection: { password: 0 } } // استبعاد كلمة المرور
    )

    if (!user) {
      return Response.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      )
    }

    return Response.json(user)
  } catch (error) {
    return Response.json(
      { error: "فشل في جلب بيانات المستخدم" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData()
    
    const client = await clientPromise
    const db = client.db("law_firm")

    // التحقق من وجود المستخدم
    const existingUser = await db.collection("users").findOne({
      _id: new ObjectId(params.id)
    })

    if (!existingUser) {
      return Response.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      )
    }

    // معالجة رفع الصورة إذا تم توفيرها
    let avatarPath = existingUser.avatar
    const avatarFile = formData.get("avatar") as File | null
    
    if (avatarFile && avatarFile.size > 0) {
      const bytes = await avatarFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const timestamp = Date.now()
      const extension = avatarFile.name.split('.').pop()
      const filename = `avatar_${timestamp}.${extension}`
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars')
      avatarPath = path.join('/uploads/avatars', filename)
      const filePath = path.join(uploadDir, filename)
      
      await writeFile(filePath, buffer)
    }

    // تجهيز بيانات التحديث
    const updateData: any = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      phone: formData.get("phone") as string || null,
      specialization: formData.get("specialization") as string || null,
      experience: formData.get("experience") ? parseInt(formData.get("experience") as string) : null,
      bio: formData.get("bio") as string || null,
      avatar: avatarPath,
      isActive: formData.get("isActive") === "true",
      updatedAt: new Date(),
    }

    // تحديث كلمة المرور فقط إذا تم توفيرها
    const password = formData.get("password") as string
    if (password) {
      updateData.password = await bcrypt.hash(password, 12)
    }

    await db.collection("users").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    )

    return Response.json({ message: "✅ تم تحديث المستخدم بنجاح" })
  } catch (error) {
    console.error("Error updating user:", error)
    return Response.json(
      { error: "حدث خطأ أثناء تحديث المستخدم" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db("law_firm")

    const result = await db.collection("users").deleteOne({
      _id: new ObjectId(params.id)
    })

    if (result.deletedCount === 0) {
      return Response.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      )
    }

    return Response.json({ message: "✅ تم حذف المستخدم بنجاح" })
  } catch (error) {
    return Response.json(
      { error: "حدث خطأ أثناء حذف المستخدم" },
      { status: 500 }
    )
  }
}

// import { NextRequest } from "next/server"
// import clientPromise from "@/lib/mongodb"
// import { ObjectId } from "mongodb"

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const client = await clientPromise
//     const db = client.db("law_firm")
    
//     // التحقق من أن الـ ID صالح
//     if (!ObjectId.isValid(params.id)) {
//       return Response.json(
//         { error: "معرف المستخدم غير صالح" },
//         { status: 400 }
//       )
//     }

//     const user = await db.collection("users").findOne(
//       { _id: new ObjectId(params.id) },
//       { projection: { password: 0 } } // استبعاد كلمة المرور
//     )

//     if (!user) {
//       return Response.json(
//         { error: "المستخدم غير موجود" },
//         { status: 404 }
//       )
//     }

//     // تحويل ObjectId إلى string
//     const userWithStringId = {
//       ...user,
//       _id: user._id.toString(),
//       createdAt: user.createdAt.toISOString(),
//       updatedAt: user.updatedAt.toISOString()
//     }

//     return Response.json(userWithStringId)
//   } catch (error) {
//     console.error("Error fetching user:", error)
//     return Response.json(
//       { error: "فشل في جلب بيانات المستخدم" },
//       { status: 500 }
//     )
//   }
// }