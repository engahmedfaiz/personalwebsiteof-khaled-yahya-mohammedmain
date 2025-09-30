// import clientPromise from "@/lib/mongodb"
// import bcrypt from "bcryptjs"
// import { NextRequest } from "next/server"

// export async function GET() {
//   const client = await clientPromise
//   const db = client.db("law_firm")
//   const users = await db.collection("users").find().toArray()
//   return Response.json(users)
// }

// export async function POST(req: NextRequest) {
//   const body = await req.json()
//   const client = await clientPromise
//   const db = client.db("law_firm")

//   const hashedPassword = await bcrypt.hash(body.password, 10)

//   const newUser = {
//     ...body,
//     password: hashedPassword,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }

//   await db.collection("users").insertOne(newUser)
//   return Response.json({ message: "✅ تم إنشاء المستخدم بنجاح" }, { status: 201 })
// }

import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { NextRequest } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("law_firm")
    const users = await db.collection("users")
      .find({})
      .project({ password: 0 }) // استبعاد كلمة المرور من النتائج
      .sort({ createdAt: -1 })
      .toArray()
    
    return Response.json(users)
  } catch (error) {
    return Response.json(
      { error: "فشل في جلب بيانات المستخدمين" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    
    const client = await clientPromise
    const db = client.db("law_firm")

    // التحقق من وجود المستخدم بنفس البريد الإلكتروني
    const existingUser = await db.collection("users").findOne({
      email: formData.get("email") as string
    })

    if (existingUser) {
      return Response.json(
        { error: "البريد الإلكتروني مسجل مسبقاً" },
        { status: 400 }
      )
    }

    // معالجة رفع الصورة
    let avatarPath = null
    const avatarFile = formData.get("avatar") as File | null
    
    if (avatarFile && avatarFile.size > 0) {
      const bytes = await avatarFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // إنشاء اسم فريد للملف
      const timestamp = Date.now()
      const extension = avatarFile.name.split('.').pop()
      const filename = `avatar_${timestamp}.${extension}`
      
      // المسار لحفظ الصورة
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars')
      avatarPath = path.join('/uploads/avatars', filename)
      const filePath = path.join(uploadDir, filename)
      
      // حفظ الملف
      await writeFile(filePath, buffer)
    }

    // تجهيز بيانات المستخدم
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: await bcrypt.hash(formData.get("password") as string, 12),
      role: formData.get("role") as "admin" | "lawyer" | "secretary" | "trainee",
      phone: formData.get("phone") as string || null,
      specialization: formData.get("specialization") as string || null,
      experience: formData.get("experience") ? parseInt(formData.get("experience") as string) : null,
      bio: formData.get("bio") as string || null,
      avatar: avatarPath,
      isActive: formData.get("isActive") === "true",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // إدخال المستخدم في قاعدة البيانات
    const result = await db.collection("users").insertOne(userData)

    // إرسال بريد ترحيبي إذا طلب
    const sendWelcomeEmail = formData.get("sendWelcomeEmail") === "true"
    if (sendWelcomeEmail) {
      await sendWelcomeEmailToUser(userData)
    }

    return Response.json(
      { 
        message: "✅ تم إنشاء المستخدم بنجاح",
        userId: result.insertedId 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Error creating user:", error)
    return Response.json(
      { error: "حدث خطأ أثناء إنشاء المستخدم" },
      { status: 500 }
    )
  }
}

// دالة مساعدة لإرسال البريد الترحيبي
async function sendWelcomeEmailToUser(user: any) {
  // هنا يمكنك إضافة خدمة إرسال البريد الإلكتروني
  // مثل SendGrid, Mailchimp, إلخ
  console.log(`إرسال بريد ترحيبي إلى: ${user.email}`)
  
  // مثال:
  // await emailService.sendWelcomeEmail(user.email, user.name, user.role)
}