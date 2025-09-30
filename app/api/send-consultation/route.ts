import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, caseType, message } = body

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "البريد الإلكتروني غير صحيح" }, { status: 400 })
    }

    // Here you would integrate with your email service
    // For now, we'll simulate sending an email
    const emailContent = `
      طلب استشارة قانونية جديد:
      
      الاسم: ${name}
      البريد الإلكتروني: ${email}
      رقم الهاتف: ${phone}
      نوع القضية: ${caseType || "غير محدد"}
      
      تفاصيل الاستشارة:
      ${message}
      
      تاريخ الطلب: ${new Date().toLocaleString("ar-SA")}
    `

    // Log the consultation request (in production, send actual email)
    console.log("New consultation request:", {
      name,
      email,
      phone,
      caseType,
      message,
      timestamp: new Date().toISOString(),
    })

    // In production, you would use a service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - AWS SES
    // - Resend
    // Example with Resend:
    /*
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'website@yourdomain.com',
      to: 'Khalid77791@gmail.com',
      subject: `طلب استشارة قانونية من ${name}`,
      text: emailContent,
    })
    */

    return NextResponse.json(
      {
        success: true,
        message: "تم إرسال طلب الاستشارة بنجاح. سنتواصل معك قريباً.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error sending consultation request:", error)
    return NextResponse.json({ error: "حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى." }, { status: 500 })
  }
}
