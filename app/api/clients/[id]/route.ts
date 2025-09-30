import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import type { Client } from '@/lib/models/User'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase()
    const client = await db.collection('clients').findOne({ _id: params.id })
    
    if (!client) {
      return NextResponse.json({ message: 'العميل غير موجود' }, { status: 404 })
    }
    
    return NextResponse.json(client)
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { message: 'فشل في جلب بيانات العميل' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { db } = await connectToDatabase()
    
    // تحديث البيانات مع إضافة تاريخ التحديث
    const updateData = {
      ...data,
      updatedAt: new Date()
    }
    
    const result = await db.collection('clients').updateOne(
      { _id: params.id },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'العميل غير موجود' }, { status: 404 })
    }
    
    // جلب البيانات المحدثة
    const updatedClient = await db.collection('clients').findOne({ _id: params.id })
    
    return NextResponse.json(updatedClient)
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json(
      { message: 'فشل في تحديث بيانات العميل' },
      { status: 500 }
    )
  }
}