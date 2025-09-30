import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const teamMembers = await db
      .collection('teamMembers')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'فشل في جلب بيانات الفريق' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();
    
    const newMember = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection('teamMembers').insertOne(newMember);
    
    return NextResponse.json({ 
      _id: result.insertedId,
      ...newMember 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: 'فشل في إضافة العضو' }, { status: 500 });
  }
}