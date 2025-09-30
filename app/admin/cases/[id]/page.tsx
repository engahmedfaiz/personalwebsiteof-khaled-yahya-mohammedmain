"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Edit, Calendar, User, FileText, Clock, MessageSquare } from "lucide-react"
import type { Case } from "@/lib/models/User"

export default function CaseDetailPage() {
  const params = useParams()
  const [caseData, setCaseData] = useState<Case | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - في التطبيق الحقيقي، سيتم جلب البيانات من API
    const mockCase: Case = {
      _id: params.id as string,
      title: "قضية عقارية - نزاع ملكية",
      description:
        "نزاع حول ملكية قطعة أرض في منطقة الرياض بين الطرفين، حيث يدعي كل طرف ملكيته للأرض بناءً على وثائق مختلفة. تتطلب القضية مراجعة شاملة للوثائق العقارية والسجلات الحكومية.",
      clientId: "client1",
      lawyerId: "lawyer1",
      status: "open",
      priority: "high",
      category: "عقاري",
      startDate: new Date("2024-01-15"),
      documents: ["عقد الملكية الأصلي", "صك الأرض", "خريطة المساحة"],
      notes: "تحتاج إلى مراجعة الوثائق العقارية والتأكد من صحة البيانات المقدمة من الطرفين",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-20"),
    }

    setTimeout(() => {
      setCaseData(mockCase)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { label: "مفتوحة", color: "bg-blue-100 text-blue-800" },
      "in-progress": { label: "قيد المراجعة", color: "bg-yellow-100 text-yellow-800" },
      closed: { label: "مغلقة", color: "bg-green-100 text-green-800" },
      pending: { label: "معلقة", color: "bg-red-100 text-red-800" },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.open
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      urgent: { label: "عاجل", color: "bg-red-100 text-red-800" },
      high: { label: "عالي", color: "bg-orange-100 text-orange-800" },
      medium: { label: "متوسط", color: "bg-yellow-100 text-yellow-800" },
      low: { label: "منخفض", color: "bg-green-100 text-green-800" },
    }
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
    return <Badge className={config.color}>{config.label}</Badge>
  }

  if (loading || !caseData) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-slate-200 rounded w-64 animate-pulse"></div>
          <div className="h-10 bg-slate-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/admin/cases" className="hover:text-amber-600">
              القضايا
            </Link>
            <ArrowRight className="h-4 w-4" />
            <span>تفاصيل القضية</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">{caseData.title}</h1>
          <div className="flex items-center gap-4">
            {getStatusBadge(caseData.status)}
            {getPriorityBadge(caseData.priority)}
            <Badge variant="outline">{caseData.category}</Badge>
          </div>
        </div>
        <Link href={`/admin/cases/${caseData._id}/edit`}>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Edit className="h-4 w-4 mr-2" />
            تعديل القضية
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">التفاصيل</TabsTrigger>
              <TabsTrigger value="documents">الوثائق</TabsTrigger>
              <TabsTrigger value="timeline">الجدول الزمني</TabsTrigger>
              <TabsTrigger value="notes">الملاحظات</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>تفاصيل القضية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">الوصف</h3>
                    <p className="text-slate-600 leading-relaxed">{caseData.description}</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">معلومات أساسية</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">رقم القضية:</span>
                          <span className="font-medium">#{caseData._id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">الفئة:</span>
                          <span className="font-medium">{caseData.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">تاريخ البداية:</span>
                          <span className="font-medium">
                            {new Date(caseData.startDate).toLocaleDateString("ar-SA")}
                          </span>
                        </div>
                        {caseData.endDate && (
                          <div className="flex justify-between">
                            <span className="text-slate-600">تاريخ الانتهاء:</span>
                            <span className="font-medium">
                              {new Date(caseData.endDate).toLocaleDateString("ar-SA")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">الأطراف المعنية</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600">العميل:</span>
                          <span className="font-medium">أحمد محمد السعد</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600">المحامي المسؤول:</span>
                          <span className="font-medium">خالد يحيى الناصر</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>الوثائق المرفقة</CardTitle>
                  <CardDescription>جميع الوثائق والملفات المتعلقة بالقضية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-slate-400" />
                          <div>
                            <p className="font-medium">{doc}</p>
                            <p className="text-sm text-slate-500">
                              تم الرفع في {new Date().toLocaleDateString("ar-SA")}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          تحميل
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>الجدول الزمني</CardTitle>
                  <CardDescription>تسلسل الأحداث والإجراءات المتخذة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-px h-12 bg-slate-200"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">تم إنشاء القضية</p>
                        <p className="text-sm text-slate-500">15 يناير 2024</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="w-px h-12 bg-slate-200"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">تم رفع الوثائق الأولية</p>
                        <p className="text-sm text-slate-500">18 يناير 2024</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">في انتظار مراجعة الوثائق</p>
                        <p className="text-sm text-slate-500">20 يناير 2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>الملاحظات</CardTitle>
                  <CardDescription>ملاحظات المحامي والفريق حول القضية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-slate-400" />
                        <span className="font-medium">خالد يحيى الناصر</span>
                        <span className="text-sm text-slate-500">منذ يومين</span>
                      </div>
                      <p className="text-slate-700">{caseData.notes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">معلومات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">آخر تحديث:</span>
                <span className="text-sm font-medium">{new Date(caseData.updatedAt).toLocaleDateString("ar-SA")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">تاريخ الإنشاء:</span>
                <span className="text-sm font-medium">{new Date(caseData.createdAt).toLocaleDateString("ar-SA")}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">عدد الوثائق:</span>
                <span className="text-sm font-medium">{caseData.documents.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-transparent" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                حجز موعد
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                إضافة وثيقة
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                إضافة ملاحظة
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
