"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Scale,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Building,
  Navigation,
  Globe,
  Calendar,
  User,
  FileText,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    caseType: "",
    message: "",
    preferredContact: "phone",
    urgency: "normal",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        caseType: "",
        message: "",
        preferredContact: "phone",
        urgency: "normal",
      })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "الهاتف",
      details: ["770461195", "773611056"],
      description: "متاح 24/7 للحالات الطارئة",
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "البريد الإلكتروني",
      details: ["Khalid77791@gmail.com", "Khalid99661@yahoo.com"],
      description: "نرد خلال 24 ساعة",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "العنوان",
      details: ["اليمن - صنعاء - شارع النصر", "أمام مستشفى المتحدون", "فوق بن عامر للصرافة"],
      description: "موقع مركزي سهل الوصول",
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "ساعات العمل",
      details: ["السبت - الخميس: 8:00 ص - 6:00 م", "الجمعة: 2:00 م - 6:00 م"],
      description: "استشارات طارئة متاحة دائماً",
    },
  ]

  const caseTypes = [
    "قضايا مدنية",
    "قضايا تجارية",
    "قضايا جنائية",
    "أحوال شخصية",
    "قضايا عمالية",
    "قضايا إدارية",
    "تحكيم تجاري",
    "استشارة قانونية",
    "أخرى",
  ]

  const officeFeatures = [
    {
      icon: <Building className="w-5 h-5 text-primary" />,
      title: "مكتب حديث",
      description: "مجهز بأحدث التقنيات",
    },
    {
      icon: <Navigation className="w-5 h-5 text-primary" />,
      title: "موقع مميز",
      description: "في قلب العاصمة صنعاء",
    },
    {
      icon: <Globe className="w-5 h-5 text-primary" />,
      title: "خدمات دولية",
      description: "تعامل مع القضايا الدولية",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-primary" />,
      title: "جودة مضمونة",
      description: "التزام بأعلى المعايير",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      {/* <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
              <Scale className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">المحامي خالد الناصر</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                الرئيسية
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                من نحن
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                خدماتنا
              </Link>
              <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors">
                فريق العمل
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                المقالات
              </Link>
              <Link href="/contact" className="text-primary font-medium">
                اتصل بنا
              </Link>
            </div>

            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contact">احجز استشارة</Link>
            </Button>
          </div>
        </div>
      </nav> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-8 h-8 border border-primary rotate-45" />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
                <Scale className="w-6 h-6 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              <span className="bg-gradient-to-l from-primary via-foreground to-primary bg-clip-text text-transparent">
                اتصل بنا
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              نحن هنا لمساعدتك في جميع احتياجاتك القانونية. تواصل معنا اليوم للحصول على استشارة مجانية
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/50 border-primary/20 hover:border-primary/40"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold">احجز استشارتك المجانية</h2>
                    <p className="text-muted-foreground">املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن</p>
                  </div>

                  {isSubmitted ? (
                    <div className="text-center space-y-6 py-12">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-green-600">تم إرسال رسالتك بنجاح!</h3>
                        <p className="text-muted-foreground">شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            الاسم الكامل *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="border-primary/20 focus:border-primary"
                            placeholder="أدخل اسمك الكامل"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            رقم الهاتف *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="border-primary/20 focus:border-primary"
                            placeholder="رقم الهاتف"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          البريد الإلكتروني *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-primary/20 focus:border-primary"
                          placeholder="البريد الإلكتروني"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="caseType" className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            نوع القضية *
                          </Label>
                          <select
                            id="caseType"
                            name="caseType"
                            value={formData.caseType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-primary/20 rounded-md focus:border-primary focus:outline-none bg-background"
                          >
                            <option value="">اختر نوع القضية</option>
                            {caseTypes.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="urgency" className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            مستوى الأولوية
                          </Label>
                          <select
                            id="urgency"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-primary/20 rounded-md focus:border-primary focus:outline-none bg-background"
                          >
                            <option value="normal">عادي</option>
                            <option value="urgent">عاجل</option>
                            <option value="emergency">طارئ</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">موضوع الاستشارة</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="border-primary/20 focus:border-primary"
                          placeholder="موضوع الاستشارة أو القضية"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">تفاصيل الاستشارة *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="border-primary/20 focus:border-primary resize-none"
                          placeholder="اشرح تفاصيل قضيتك أو استشارتك بالتفصيل..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>طريقة التواصل المفضلة</Label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="phone"
                              checked={formData.preferredContact === "phone"}
                              onChange={handleInputChange}
                              className="text-primary"
                            />
                            <span className="text-sm">هاتف</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="email"
                              checked={formData.preferredContact === "email"}
                              onChange={handleInputChange}
                              className="text-primary"
                            />
                            <span className="text-sm">بريد إلكتروني</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="both"
                              checked={formData.preferredContact === "both"}
                              onChange={handleInputChange}
                              className="text-primary"
                            />
                            <span className="text-sm">كلاهما</span>
                          </label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 py-3 text-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            جاري الإرسال...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            إرسال الاستشارة
                          </div>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Office Features */}
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-semibold">مميزات مكتبنا</h3>
                <div className="space-y-4">
                  {officeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                      <div>
                        <h4 className="font-medium text-sm">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
              <CardContent className="p-6 text-center space-y-4">
                <Phone className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-lg font-semibold">اتصال مباشر</h3>
                <p className="text-sm text-muted-foreground">للحالات الطارئة أو الاستشارات السريعة</p>
                <div className="space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <a href="tel:770461195">
                      <Phone className="w-4 h-4 ml-2" />
                      770461195
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 hover:bg-primary/10 bg-transparent"
                    asChild
                  >
                    <a href="mailto:Khalid77791@gmail.com">
                      <Mail className="w-4 h-4 ml-2" />
                      إرسال إيميل
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  ساعات العمل
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">السبت - الخميس</span>
                    <span className="font-medium">8:00 ص - 6:00 م</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">الجمعة</span>
                    <span className="font-medium">2:00 م - 6:00 م</span>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-primary font-medium text-center">استشارات طارئة: 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive Map */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">موقع المكتب</h2>
            <p className="text-lg text-muted-foreground">يقع مكتبنا في موقع مركزي بصنعاء لسهولة الوصول</p>
          </div>

          <Card className="bg-card/50 border-primary/20 overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-primary/10 to-primary/5">
              {/* Placeholder for interactive map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-primary mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">مكتب المحامي خالد الناصر</h3>
                    <p className="text-muted-foreground">اليمن - صنعاء - شارع النصر</p>
                    <p className="text-sm text-muted-foreground">أمام مستشفى المتحدون - فوق بن عامر للصرافة</p>
                  </div>
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10 bg-transparent">
                    <Navigation className="w-4 h-4 ml-2" />
                    احصل على الاتجاهات
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-8">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
            <CardContent className="p-12 space-y-6">
              <Scale className="w-16 h-16 text-primary mx-auto animate-pulse" />
              <h3 className="text-3xl font-bold">مستعدون لمساعدتك</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                فريقنا من الخبراء القانونيين جاهز لتقديم أفضل الخدمات القانونية لك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg">
                  <Link href="/services">
                    <ArrowLeft className="w-5 h-5 ml-2" />
                    تعرف على خدماتنا
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg border-primary/30 hover:bg-primary/10 bg-transparent"
                >
                  <Link href="/about">تعرف على المكتب</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
