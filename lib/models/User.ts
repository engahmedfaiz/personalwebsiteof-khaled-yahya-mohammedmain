import { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  role: "admin" | "lawyer" | "secretary" | "trainee"
  phone?: string
  avatar?: string
  specialization?: string
  experience?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Case {
  _id?: ObjectId
  title: string
  description: string
  clientId: string
  lawyerId: string
  status: "open" | "in-progress" | "closed" | "pending"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  startDate: Date
  endDate?: Date
  documents: string[]
  notes: string
  createdAt: Date
  updatedAt: Date
}

export interface Client {
  _id?: ObjectId
  name: string
  email: string
  phone: string
  address: string
  nationalId?: string
  company?: string
  notes?: string
  cases: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  _id?: string | ObjectId
  title: string
  description?: string
  clientId: string
  lawyerId: string
  date: Date
  duration: number // in minutes
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  location?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Document {
  _id?: string | ObjectId
  name: string
  originalName: string
  path: string
  size: number
  type: string
  caseId?: string
  clientId?: string
  uploadedBy: string
  tags: string[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Article {
  _id?: ObjectId
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  featuredImage?: string
  isPublished: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}
