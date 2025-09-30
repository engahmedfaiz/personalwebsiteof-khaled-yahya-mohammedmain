// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Calendar } from "@/components/ui/calendar"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Plus, CalendarIcon, Clock, User, MapPin, Filter } from "lucide-react"
// import type { Appointment } from "@/lib/models/User"

// export const dynamic = "force-dynamic"

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date())
//   const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
//   const [statusFilter, setStatusFilter] = useState("all")

//   useEffect(() => {
//   const fetchAppointments = async () => {
//     try {
//       const res = await fetch("/api/appointments")
//       const data = await res.json()
//       setAppointments(data)
//     } catch (error) {
//       console.error("فشل في جلب المواعيد:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   fetchAppointments()
// }, [])


//   const getStatusBadge = (status: string) => {
//     const statusConfig = {
//       scheduled: { label: "مجدول", color: "bg-blue-100 text-blue-800" },
//       completed: { label: "مكتمل", color: "bg-green-100 text-green-800" },
//       cancelled: { label: "ملغي", color: "bg-red-100 text-red-800" },
//       rescheduled: { label: "معاد جدولته", color: "bg-yellow-100 text-yellow-800" },
//     }
//     const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled
//     return <Badge className={config.color}>{config.label}</Badge>
//   }

//   const getTodayAppointments = () => {
//     const today = new Date()
//     return appointments.filter((apt) => {
//       const aptDate = new Date(apt.date)
//       return aptDate.toDateString() === today.toDateString()
//     })
//   }

//   const getSelectedDateAppointments = () => {
//     return appointments.filter((apt) => {
//       const aptDate = new Date(apt.date)
//       return aptDate.toDateString() === selectedDate.toDateString()
//     })
//   }

//   const filteredAppointments = appointments.filter((apt) => {
//     if (statusFilter === "all") return true
//     return apt.status === statusFilter
//   })

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
//           <div className="h-10 bg-slate-200 rounded w-32 animate-pulse"></div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <Card className="lg:col-span-2 animate-pulse">
//             <CardContent className="p-6">
//               <div className="h-64 bg-slate-200 rounded"></div>
//             </CardContent>
//           </Card>
//           <Card className="animate-pulse">
//             <CardContent className="p-6">
//               <div className="space-y-4">
//                 {[...Array(3)].map((_, i) => (
//                   <div key={i} className="h-16 bg-slate-200 rounded"></div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
//             <CalendarIcon className="h-8 w-8 text-blue-600" />
//             إدارة المواعيد
//           </h1>
//           <p className="text-slate-600 mt-1">إدارة وتنظيم جميع المواعيد والاجتماعات</p>
//         </div>
//         <Link href="/admin/appointments/new">
//           <Button className="bg-blue-600 hover:bg-blue-700">
//             <Plus className="h-4 w-4 mr-2" />
//             موعد جديد
//           </Button>
//         </Link>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-600">مواعيد اليوم</p>
//                 <p className="text-2xl font-bold text-blue-600">{getTodayAppointments().length}</p>
//               </div>
//               <CalendarIcon className="h-8 w-8 text-blue-500" />
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-600">المجدولة</p>
//                 <p className="text-2xl font-bold text-green-400">
//                   {appointments.filter((a) => a.status === "scheduled").length}
//                 </p>
//               </div>
//               <Clock className="h-8 w-8 text-green-500" />
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-600">المكتملة</p>
//                 <p className="text-2xl font-bold text-amber-600">
//                   {appointments.filter((a) => a.status === "completed").length}
//                 </p>
//               </div>
//               <Clock className="h-8 w-8 text-amber-500" />
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-600">الملغية</p>
//                 <p className="text-2xl font-bold text-red-600">
//                   {appointments.filter((a) => a.status === "cancelled").length}
//                 </p>
//               </div>
//               <Clock className="h-8 w-8 text-red-500" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Calendar and Appointments */}
//         <div className="lg:col-span-2">
//           <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "calendar" | "list")}>
//             <div className="flex justify-between items-center mb-4">
//               <TabsList>
//                 <TabsTrigger value="calendar">عرض التقويم</TabsTrigger>
//                 <TabsTrigger value="list">عرض القائمة</TabsTrigger>
//               </TabsList>
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-48 bg-black">
//                   <SelectValue placeholder="تصفية حسب الحالة" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">جميع الحالات</SelectItem>
//                   <SelectItem value="scheduled">مجدولة</SelectItem>
//                   <SelectItem value="completed">مكتملة</SelectItem>
//                   <SelectItem value="cancelled">ملغية</SelectItem>
//                   <SelectItem value="rescheduled">معاد جدولته</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <TabsContent value="calendar">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>التقويم</CardTitle>
//                   <CardDescription>اختر تاريخاً لعرض المواعيد</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex justify-center">
//                     <Calendar
//                       mode="single"
//                       selected={selectedDate}
//                       onSelect={(date) => date && setSelectedDate(date)}
//                       className="rounded-md border"
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Selected Date Appointments */}
//               <Card className="mt-6">
//                 <CardHeader>
//                   <CardTitle>مواعيد يوم {selectedDate.toLocaleDateString("ar-SA")}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {getSelectedDateAppointments().length > 0 ? (
//                       getSelectedDateAppointments().map((appointment) => (
//                         <div key={appointment._id} className="flex items-center justify-between p-4 border rounded-lg">
//                           <div className="flex items-center gap-4">
//                             <div className="flex flex-col items-center">
//                               <Clock className="h-5 w-5 text-slate-400" />
//                               <span className="text-sm font-medium">
//                                 {new Date(appointment.date).toLocaleTimeString("ar-SA", {
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                 })}
//                               </span>
//                             </div>
//                             <div className="flex-1">
//                               <h3 className="font-medium">{appointment.title}</h3>
//                               <p className="text-sm text-slate-500">{appointment.description}</p>
//                               <div className="flex items-center gap-4 mt-2">
//                                 <div className="flex items-center gap-1">
//                                   <User className="h-3 w-3 text-slate-400" />
//                                   <span className="text-xs text-slate-500">أحمد محمد</span>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                   <MapPin className="h-3 w-3 text-slate-400" />
//                                   <span className="text-xs text-slate-500">{appointment.location}</span>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                   <Clock className="h-3 w-3 text-slate-400" />
//                                   <span className="text-xs text-slate-500">{appointment.duration} دقيقة</span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             {getStatusBadge(appointment.status)}
//                             <Link href={`/admin/appointments/${appointment._id}`}>
//                               <Button variant="outline" size="sm">
//                                 التفاصيل
//                               </Button>
//                             </Link>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="text-center py-8">
//                         <CalendarIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
//                         <p className="text-slate-500">لا توجد مواعيد في هذا التاريخ</p>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="list">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>جميع المواعيد</CardTitle>
//                   <CardDescription>قائمة بجميع المواعيد المسجلة</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {filteredAppointments.map((appointment) => (
//                       <div key={appointment._id} className="flex items-center justify-between p-4 border rounded-lg">
//                         <div className="flex items-center gap-4">
//                           <Avatar className="h-10 w-10">
//                             <AvatarImage src="/placeholder.svg" alt="Client" />
//                             <AvatarFallback className="bg-blue-100 text-blue-700">أ</AvatarFallback>
//                           </Avatar>
//                           <div className="flex-1">
//                             <h3 className="font-medium">{appointment.title}</h3>
//                             <p className="text-sm text-slate-500">{appointment.description}</p>
//                             <div className="flex items-center gap-4 mt-2">
//                               <div className="flex items-center gap-1">
//                                 <CalendarIcon className="h-3 w-3 text-slate-400" />
//                                 <span className="text-xs text-slate-500">
//                                   {new Date(appointment.date).toLocaleDateString("ar-SA")}
//                                 </span>
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <Clock className="h-3 w-3 text-slate-400" />
//                                 <span className="text-xs text-slate-500">
//                                   {new Date(appointment.date).toLocaleTimeString("ar-SA", {
//                                     hour: "2-digit",
//                                     minute: "2-digit",
//                                   })}
//                                 </span>
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <MapPin className="h-3 w-3 text-slate-400" />
//                                 <span className="text-xs text-slate-500">{appointment.location}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {getStatusBadge(appointment.status)}
//                           <Link href={`/admin/appointments/${appointment._id}`}>
//                             <Button variant="outline" size="sm">
//                               التفاصيل
//                             </Button>
//                           </Link>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg">مواعيد اليوم</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 {getTodayAppointments().length > 0 ? (
//                   getTodayAppointments().map((appointment) => (
//                     <div key={appointment._id} className="p-3 bg-slate-50 rounded-lg">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="font-medium text-sm">{appointment.title}</span>
//                         {getStatusBadge(appointment.status)}
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-slate-500">
//                         <Clock className="h-3 w-3" />
//                         <span>
//                           {new Date(appointment.date).toLocaleTimeString("ar-SA", {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </span>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-slate-500 text-center py-4">لا توجد مواعيد اليوم</p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <Link href="/admin/appointments/new">
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700">
//                   <Plus className="h-4 w-4 mr-2" />
//                   موعد جديد
//                 </Button>
//               </Link>
//               <Button className="w-full bg-transparent" variant="outline">
//                 <CalendarIcon className="h-4 w-4 mr-2" />
//                 عرض التقويم الشهري
//               </Button>
//               <Button className="w-full bg-transparent" variant="outline">
//                 <Filter className="h-4 w-4 mr-2" />
//                 تصفية متقدمة
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Construction, 
  ArrowRight, 
  CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  Plus,
  Star,
  Settings,
  Phone,
  Mail
} from "lucide-react"

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* الهيدر */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-2xl">
                <CalendarIcon className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Construction className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 animate-bounce" />
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            نظام إدارة المواعيد
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              قيد التطوير
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 mb-6 max-w-2xl mx-auto">
            نحن نعمل على تطوير نظام متكامل لإدارة المواعيد والاجتماعات
          </p>

          {/* شارة الحالة */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg inline-block">
            <div className="flex items-center gap-3 text-slate-700">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-bold">جاري تطوير النظام</span>
            </div>
          </div>
        </div>

        {/* البطاقة الرئيسية */}
        <Card className="w-full shadow-2xl border-blue-200 bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-6 sm:p-8">
            {/* حالة التطوير */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  حالة التطوير
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { name: "تصميم واجهة المواعيد", status: "مكتمل", color: "bg-green-500", percentage: 100 },
                    { name: "نظام التقويم", status: "مكتمل", color: "bg-green-500", percentage: 100 },
                    { name: "إدارة الحالات", status: "قيد العمل", color: "bg-yellow-500", percentage: 75 },
                    { name: "الإشعارات والتذكيرات", status: "قيد العمل", color: "bg-yellow-500", percentage: 60 },
                    { name: "التكامل مع النظام", status: "قريباً", color: "bg-blue-500", percentage: 30 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base font-medium text-slate-700">{item.name}</span>
                        <Badge className={`${item.color === 'bg-green-500' ? 'bg-green-100 text-green-800' : 
                                         item.color === 'bg-yellow-500' ? 'bg-yellow-100 text-yellow-800' : 
                                         'bg-blue-100 text-blue-800'} text-xs sm:text-sm`}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* الميزات القادمة */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Star className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
                  الميزات القادمة
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { 
                      icon: CalendarIcon, 
                      name: "تقويم ذكي", 
                      color: "bg-blue-50 text-blue-600", 
                      desc: "تقويم متكامل لعرض جميع المواعيد" 
                    },
                    { 
                      icon: Clock, 
                      name: "تذكيرات", 
                      color: "bg-green-50 text-green-600", 
                      desc: "نظام تذكير ذكي للمواعيد المهمة" 
                    },
                    { 
                      icon: User, 
                      name: "إدارة العملاء", 
                      color: "bg-purple-50 text-purple-600", 
                      desc: "ربط المواعيد مع بيانات العملاء" 
                    },
                    { 
                      icon: MapPin, 
                      name: "المواقع", 
                      color: "bg-amber-50 text-amber-600", 
                      desc: "إدارة مواقع الاجتماعات المختلفة" 
                    }
                  ].map((item, index) => (
                    <div key={index} className={`${item.color} p-3 sm:p-4 rounded-xl border transition-all hover:scale-105 hover:shadow-md`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white rounded-lg">
                          <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <span className="text-sm sm:text-base font-medium">{item.name}</span>
                      </div>
                      <p className="text-xs text-slate-600 pr-10">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* معاينة النظام */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="font-bold text-slate-800 mb-4 text-lg sm:text-xl">معاينة نظام المواعيد</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* بطاقة إحصائية معاينة */}
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">مواعيد اليوم</p>
                        <p className="text-2xl font-bold text-blue-600">٠</p>
                      </div>
                      <CalendarIcon className="h-8 w-8 text-blue-500 opacity-50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">مجدولة</p>
                        <p className="text-2xl font-bold text-green-600">٠</p>
                      </div>
                      <Clock className="h-8 w-8 text-green-500 opacity-50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">مكتملة</p>
                        <p className="text-2xl font-bold text-amber-600">٠</p>
                      </div>
                      <Clock className="h-8 w-8 text-amber-500 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* رسالة ترحيبية */}
            <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-2">نظام إدارة المواعيد قادم قريباً!</h3>
              <p className="text-xl sm:text-2xl font-bold mb-4">سهولة في جدولة وإدارة جميع مواعيدك</p>
              <p className="text-blue-100 text-sm sm:text-base">
                سيكون بإمكانك إدارة المواعيد، إرسال التذكيرات، ومتابعة الاجتماعات بكل سهولة
              </p>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الاتصال والدعم */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">الدعم الفني</h3>
              <p className="text-blue-600 font-mono text-sm sm:text-lg">+967 780138083</p>
              <p className="text-slate-500 text-xs mt-2">متاح خلال ساعات العمل</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">البريد الإلكتروني</h3>
              <p className="text-green-600 text-sm sm:text-base">FF2173089@gmail.com</p>
              <p className="text-slate-500 text-xs mt-2">للأسئلة والاستفسارات</p>
            </CardContent>
          </Card>
        </div>

        {/* أزرار التحكم */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
            onClick={() => window.location.reload()}
          >
            <ArrowRight className="h-5 w-5 ml-2" />
            تحديث الصفحة
          </Button>
          
          <Button 
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
            asChild
          >
            <Link href="/admin">
              <CalendarIcon className="h-5 w-5 ml-2" />
              لوحة التحكم
            </Link>
          </Button>

          <Button 
            variant="outline" 
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
            asChild
          >
            <Link href="mailto:support@lawfirm.com">
              <Mail className="h-5 w-5 ml-2" />
              طلب دعم
            </Link>
          </Button>
        </div>

        {/* التذييل */}
        <div className="text-center mt-8 pt-6 border-t border-slate-200">
          <p className="text-slate-500 text-sm sm:text-base">
            © 2024 نظام إدارة المواعيد - المكاتب القانونية
            <span className="block sm:inline-block mt-1 sm:mt-0 sm:mr-4">
              🚧 قيد التطوير - سيتم الإطلاق قريباً
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}