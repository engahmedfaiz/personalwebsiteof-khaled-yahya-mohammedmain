import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: User["role"]
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    role: string
  }

  interface JWT {
    role?: string
    sub?: string
  }
}
