import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = params;
    
    console.log('🔍 جلب بيانات العضو بالمعرف:', id);
    
    // التحقق من صحة الـ ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'معرف غير صالح' }, { status: 400 });
    }
    
    const teamMember = await db
      .collection('teamMembers')
      .findOne({ _id: new ObjectId(id) });
    
    if (!teamMember) {
      return NextResponse.json({ error: 'العضو غير موجود' }, { status: 404 });
    }
    
    // تحويل _id إلى string لتجنب مشاكل التسلسل
    const serializedMember = {
      ...teamMember,
      _id: teamMember._id.toString()
    };
    
    console.log('✅ تم جلب بيانات العضو بنجاح');
    return NextResponse.json(serializedMember);
  } catch (error) {
    console.error('❌ خطأ في جلب بيانات العضو:', error);
    return NextResponse.json({ error: 'فشل في جلب بيانات العضو' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = params;
    const body = await request.json();
    
    console.log('✏️ محاولة تحديث العضو بالمعرف:', id);
    console.log('📦 البيانات المرسلة:', body);
    
    // التحقق من صحة الـ ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'معرف غير صالح' }, { status: 400 });
    }
    
    // تنظيف البيانات - إزالة _id إذا كان مرسلاً
    const { _id, ...cleanData } = body;
    
    const updateData = {
      ...cleanData,
      updatedAt: new Date(),
    };
    
    console.log('🔄 بيانات التحديث النهائية:', updateData);
    
    const result = await db
      .collection('teamMembers')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
    
    console.log('📝 نتيجة التحديث:', result);
    
    if (!result) {
      return NextResponse.json({ error: 'العضو غير موجود' }, { status: 404 });
    }
    
    // تحويل _id إلى string
    const updatedMember = {
      ...result,
      _id: result._id.toString()
    };
    
    console.log('✅ تم تحديث العضو بنجاح');
    return NextResponse.json(updatedMember);
  } catch (error: any) {
    console.error('❌ خطأ في تحديث العضو:', error);
    console.error('🔧 تفاصيل الخطأ:', error.message);
    
    return NextResponse.json({ 
      error: 'فشل في تحديث العضو',
      details: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = params;
    
    console.log('🗑️ محاولة حذف العضو بالمعرف:', id);
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'معرف غير صالح' }, { status: 400 });
    }
    
    const result = await db
      .collection('teamMembers')
      .deleteOne({ _id: new ObjectId(id) });
    
    console.log('📝 نتيجة الحذف:', result);
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'العضو غير موجود' }, { status: 404 });
    }
    
    console.log('✅ تم حذف العضو بنجاح');
    return NextResponse.json({ message: 'تم حذف العضو بنجاح' });
  } catch (error) {
    console.error('❌ خطأ في حذف العضو:', error);
    return NextResponse.json({ error: 'فشل في حذف العضو' }, { status: 500 });
  }
}