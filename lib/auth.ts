// import type { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcryptjs"
// import clientPromise from "./mongodb"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         try {
//           const client = await clientPromise
//           const db = client.db("law_firm")

//           const user = await db.collection("users").findOne({
//             email: credentials.email,
//           })

//           if (!user || !user.isActive) {
//             return null
//           }

//           const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

//           if (!isPasswordValid) {
//             return null
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             role: user.role,
//           }
//         } catch (error) {
//           console.error("Auth error:", error)
//           return null
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.sub
//         session.user.role = token.role
//       }
//       return session
//     },
//   },
//   pages: {
//     signIn: "/admin/login",
//   },
// }
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import clientPromise from "./mongodb"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const client = await clientPromise
          const db = client.db("law_firm")

          const user = await db.collection("users").findOne({ email: credentials.email })

          // تحقق من وجود المستخدم وتفعيله
          if (!user || !user.isActive) return null

          // تحقق من كلمة المرور
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          if (!isPasswordValid) return null

          // يتم إرجاع البيانات المطلوبة فقط
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // عند تسجيل الدخول، خزّن role و id في التوكن
      if (user) {
        token.id = user.id
        token.role = user.role
        token.name = user.name
        token.email = user.email
      }
      return token
    },

    async session({ session, token }) {
      // عند كل طلب Session، خزّن id و role في session.user
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/admin/login", // صفحة تسجيل الدخول المخصصة
  },
}
