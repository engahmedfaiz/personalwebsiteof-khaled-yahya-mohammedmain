// import type { NextApiRequest, NextApiResponse } from "next"
// import clientPromise from "@/lib/mongodb"
// import bcrypt from "bcryptjs"
// import { User, Client, Case } from "@/lib/models/User"

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" })
//   }

//   try {
//     const client = await clientPromise
//     const db = client.db("law_firm")

//     // ====== Users ======
//     const users: User[] = [
//       {
//         name: "خالد الناصر",
//         email: "admin@example.com",
//         password: await bcrypt.hash("123456", 10),
//         role: "admin",
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: "أحمد المحامي",
//         email: "lawyer@example.com",
//         password: await bcrypt.hash("123456", 10),
//         role: "lawyer",
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: "سارة السكرتيرة",
//         email: "secretary@example.com",
//         password: await bcrypt.hash("123456", 10),
//         role: "secretary",
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ]

//     const insertedUsers = await db.collection("users").insertMany(users)

//     // ====== Clients ======
//     const clients: Client[] = [
//       {
//         name: "عميل 1",
//         email: "client1@example.com",
//         phone: "77777777",
//         address: "الرياض، السعودية",
//         cases: [],
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: "عميل 2",
//         email: "client2@example.com",
//         phone: "88888888",
//         address: "جدة، السعودية",
//         cases: [],
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ]

//     const insertedClients = await db.collection("clients").insertMany(clients)

//     // ====== Cases ======
//     const cases: Case[] = [
//       {
//         title: "قضية تجارية",
//         description: "وصف القضية التجارية",
//         clientId: insertedClients.insertedIds["0"].toString(),
//         lawyerId: insertedUsers.insertedIds["1"].toString(),
//         status: "open",
//         priority: "high",
//         category: "commercial",
//         startDate: new Date(),
//         documents: [],
//         notes: "ملاحظات حول القضية",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ]

//     await db.collection("cases").insertMany(cases)

//     res.status(200).json({ message: "تم إنشاء البيانات الوهمية بنجاح" })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: "حدث خطأ أثناء إنشاء البيانات الوهمية" })
//   }
// }// pages/api/seed.ts
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { ObjectId, OptionalId } from "mongodb"
import { User, Client as ClientType, Case as CaseType } from "@/lib/models/User"

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("law_firm")

    // ====== Users ======
    const users: OptionalId<User>[] = [
      {
        name: "خالد الناصر",
        email: "admin@example.com",
        password: await bcrypt.hash("123456", 10),
        role: "admin",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "أحمد المحامي",
        email: "lawyer@example.com",
        password: await bcrypt.hash("123456", 10),
        role: "lawyer",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "سارة السكرتيرة",
        email: "secretary@example.com",
        password: await bcrypt.hash("123456", 10),
        role: "secretary",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("users").deleteMany({})
    const insertedUsers = await db.collection("users").insertMany(users)

    // ====== Clients ======
    const clients: OptionalId<ClientType>[] = [
      {
        name: "عميل 1",
        email: "client1@example.com",
        phone: "77777777",
        address: "الرياض، السعودية",
        cases: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "عميل 2",
        email: "client2@example.com",
        phone: "88888888",
        address: "جدة، السعودية",
        cases: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("clients").deleteMany({})
    const insertedClients = await db.collection("clients").insertMany(clients)

    // ====== Cases ======
    const firstClientId = insertedClients.insertedIds[0]
    const firstLawyerId = insertedUsers.insertedIds[1]

    const cases: OptionalId<CaseType>[] = [
      {
        title: "قضية تجارية",
        description: "وصف القضية التجارية",
        clientId: firstClientId.toString(),
        lawyerId: firstLawyerId.toString(),
        status: "open",
        priority: "high",
        category: "commercial",
        startDate: new Date(),
        documents: [],
        notes: "ملاحظات حول القضية",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("cases").deleteMany({})
    await db.collection("cases").insertMany(cases)

    return new Response(JSON.stringify({ message: "✅ تم إنشاء البيانات الوهمية بنجاح" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Seed error:", error)
    return new Response(JSON.stringify({ message: "❌ حدث خطأ أثناء إنشاء البيانات الوهمية" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
