"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Scale,
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowRight,
  BarChart3,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Globe,
  Tag,
  X,
} from "lucide-react";

// تعريف أنواع البيانات
interface Case {
  _id: string;
  title: string;
  client: string;
  type: string;
  status: "open" | "in-progress" | "closed" | "pending";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  nextHearing?: Date;
}

interface Activity {
  id: string;
  type: "case" | "client" | "appointment" | "document";
  title: string;
  description: string;
  time: string;
  status: "success" | "warning" | "info";
}

interface DashboardStats {
  totalCases: number;
  activeCases: number;
  totalClients: number;
  todayAppointments: number;
  pendingDocuments: number;
  publishedArticles: number;
  recentActivities: Activity[];
  casesByStatus: { status: string; count: number; color: string }[];
  monthlyStats: { month: string; cases: number; clients: number }[];
  recentCases: Case[];
}

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [timeRange, setTimeRange] = useState<string>("month");

  // كشف حجم الشاشة بدقة
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width >= 768 && width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // في التطبيق الحقيقي، استبدل هذا بطلب API
        const mockStats: DashboardStats = {
          totalCases: 45,
          activeCases: 23,
          totalClients: 67,
          todayAppointments: 8,
          pendingDocuments: 12,
          publishedArticles: 15,
          recentActivities: [
            {
              id: "1",
              type: "case",
              title: "قضية جديدة",
              description: "تم إضافة قضية عقارية جديدة للعميل أحمد محمد",
              time: "منذ 30 دقيقة",
              status: "success",
            },
            {
              id: "2",
              type: "appointment",
              title: "موعد قادم",
              description: "موعد استشارة مع العميلة فاطمة علي في الساعة 3:00 م",
              time: "منذ ساعة",
              status: "warning",
            },
            {
              id: "3",
              type: "document",
              title: "وثيقة جديدة",
              description: "تم رفع عقد إيجار للقضية رقم #2024-001",
              time: "منذ ساعتين",
              status: "info",
            },
            {
              id: "4",
              type: "client",
              title: "عميل جديد",
              description: "تم تسجيل عميل جديد: شركة النور للتجارة",
              time: "منذ 3 ساعات",
              status: "success",
            },
            {
              id: "5",
              type: "case",
              title: "تحديث حالة قضية",
              description: "تم تحديث حالة القضية #2024-015 إلى 'قيد المراجعة'",
              time: "منذ 5 ساعات",
              status: "info",
            },
          ],
          casesByStatus: [
            { status: "مفتوحة", count: 15, color: "bg-blue-500" },
            { status: "قيد المراجعة", count: 8, color: "bg-yellow-500" },
            { status: "مغلقة", count: 22, color: "bg-green-500" },
          ],
          monthlyStats: [
            { month: "يناير", cases: 12, clients: 8 },
            { month: "فبراير", cases: 15, clients: 12 },
            { month: "مارس", cases: 18, clients: 15 },
            { month: "أبريل", cases: 22, clients: 18 },
          ],
          recentCases: [
            {
              _id: "1",
              title: "قضية عقارية - تملك أرض",
              client: "أحمد محمد",
              type: "عقاري",
              status: "open",
              priority: "high",
              assignedTo: "lawyer1",
              createdAt: new Date("2024-03-15"),
              updatedAt: new Date("2024-03-20"),
              nextHearing: new Date("2024-04-05"),
            },
            {
              _id: "2",
              title: "قضية عمل - نزاع تعويض",
              client: "شركة التقنية المتطورة",
              type: "عمل",
              status: "in-progress",
              priority: "medium",
              assignedTo: "lawyer2",
              createdAt: new Date("2024-03-10"),
              updatedAt: new Date("2024-03-18"),
              nextHearing: new Date("2024-03-28"),
            },
            {
              _id: "3",
              title: "قضية تجارية - شراكة",
              client: "عبدالله السعدي",
              type: "تجاري",
              status: "pending",
              priority: "low",
              assignedTo: "lawyer3",
              createdAt: new Date("2024-03-05"),
              updatedAt: new Date("2024-03-15"),
            },
            {
              _id: "4",
              title: "قضية أحوال شخصية - طلاق",
              client: "فاطمة العتيبي",
              type: "أحوال شخصية",
              status: "closed",
              priority: "medium",
              assignedTo: "lawyer4",
              createdAt: new Date("2024-02-20"),
              updatedAt: new Date("2024-03-10"),
            },
          ],
        };

        setStats(mockStats);
      } catch (error) {
        console.error("خطأ أثناء جلب بيانات لوحة القيادة:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusVariant = (status: string) => {
    const variants: Record<string, any> = {
      open: {
        bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
        border: "border-blue-200",
        text: "text-blue-700",
        icon: "bg-blue-500",
        label: "مفتوحة",
      },
      "in-progress": {
        bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
        border: "border-amber-200",
        text: "text-amber-700",
        icon: "bg-amber-500",
        label: "قيد المراجعة",
      },
      closed: {
        bg: "bg-gradient-to-r from-emerald-50 to-green-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        icon: "bg-emerald-500",
        label: "مغلقة",
      },
      pending: {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50",
        border: "border-purple-200",
        text: "text-purple-700",
        icon: "bg-purple-500",
        label: "معلقة",
      },
    };
    return variants[status] || variants.open;
  };

  const getPriorityVariant = (priority: string) => {
    const variants: Record<string, any> = {
      low: {
        bg: "bg-gradient-to-r from-emerald-50 to-green-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        label: "منخفض",
      },
      medium: {
        bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
        border: "border-amber-200",
        text: "text-amber-700",
        label: "متوسط",
      },
      high: {
        bg: "bg-gradient-to-r from-orange-50 to-red-50",
        border: "border-orange-200",
        text: "text-orange-700",
        label: "مرتفع",
      },
      urgent: {
        bg: "bg-gradient-to-r from-red-50 to-pink-50",
        border: "border-red-200",
        text: "text-red-700",
        label: "عاجل",
      },
    };
    return variants[priority] || variants.medium;
  };

  const getCaseTypeStyle = (type: string) => {
    const styles: Record<string, any> = {
      "عقاري": {
        bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
        border: "border-blue-200",
        text: "text-blue-700",
        icon: "bg-blue-500",
      },
      "عمل": {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50",
        border: "border-purple-200",
        text: "text-purple-700",
        icon: "bg-purple-500",
      },
      "تجاري": {
        bg: "bg-gradient-to-r from-emerald-50 to-teal-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        icon: "bg-emerald-500",
      },
      "أحوال شخصية": {
        bg: "bg-gradient-to-r from-pink-50 to-rose-50",
        border: "border-pink-200",
        text: "text-pink-700",
        icon: "bg-pink-500",
      },
    };
    return (
      styles[type] || {
        bg: "bg-gradient-to-r from-gray-50 to-slate-50",
        border: "border-gray-200",
        text: "text-gray-700",
        icon: "bg-gray-500",
      }
    );
  };

  const getActivityIcon = (type: string, status: string) => {
    if (type === "case") {
      return <Scale className={`h-4 w-4 ${status === "success" ? "text-green-600" : status === "warning" ? "text-yellow-600" : "text-blue-600"}`} />;
    } else if (type === "client") {
      return <Users className={`h-4 w-4 ${status === "success" ? "text-green-600" : status === "warning" ? "text-yellow-600" : "text-blue-600"}`} />;
    } else if (type === "appointment") {
      return <Calendar className={`h-4 w-4 ${status === "success" ? "text-green-600" : status === "warning" ? "text-yellow-600" : "text-blue-600"}`} />;
    } else {
      return <FileText className={`h-4 w-4 ${status === "success" ? "text-green-600" : status === "warning" ? "text-yellow-600" : "text-blue-600"}`} />;
    }
  };

  const getActivityStatusColor = (status: string) => {
    return status === "success" 
      ? "bg-green-100" 
      : status === "warning" 
      ? "bg-yellow-100" 
      : "bg-blue-100";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">جاري تحميل بيانات لوحة القيادة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link
                  href="/admin"
                  className="hover:text-blue-600 transition-colors"
                >
                  لوحة التحكم
                </Link>
                <ArrowRight className="h-4 w-4" />
                <span className="text-blue-600 font-bold">لوحة القيادة</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                لوحة القيادة
              </h1>
              <p className="text-gray-600">
                نظرة عامة على نشاط المكتب وإحصائيات القضايا
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-gray-300">
                <Calendar className="h-4 w-4 ml-2" />
                تقرير شهري
              </Button>
              <Link href="/admin/cases/new">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                  <Plus className="h-4 w-4 ml-2" />
                  قضية جديدة
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 lg:py-6">
        {/* Stats Grid */}
        <div
          className={`grid gap-3 mb-6 ${
            screenSize === "mobile"
              ? "grid-cols-2"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          }`}
        >
          {[
            {
              label: "إجمالي القضايا",
              value: stats?.totalCases || 0,
              icon: Scale,
              color: "text-blue-600",
              bg: "bg-blue-100",
              change: "+5%",
              changeColor: "text-green-600",
            },
            {
              label: "القضايا النشطة",
              value: stats?.activeCases || 0,
              icon: AlertCircle,
              color: "text-amber-600",
              bg: "bg-amber-100",
              change: "+2",
              changeColor: "text-green-600",
            },
            {
              label: "إجمالي العملاء",
              value: stats?.totalClients || 0,
              icon: Users,
              color: "text-green-600",
              bg: "bg-green-100",
              change: "+8%",
              changeColor: "text-green-600",
            },
            {
              label: "مواعيد اليوم",
              value: stats?.todayAppointments || 0,
              icon: Calendar,
              color: "text-purple-600",
              bg: "bg-purple-100",
              change: "3 قادمة",
              changeColor: "text-blue-600",
            },
            {
              label: "الوثائق المعلقة",
              value: stats?.pendingDocuments || 0,
              icon: FileText,
              color: "text-red-600",
              bg: "bg-red-100",
              change: "-2",
              changeColor: "text-green-600",
            },
            {
              label: "المقالات المنشورة",
              value: stats?.publishedArticles || 0,
              icon: Globe,
              color: "text-cyan-600",
              bg: "bg-cyan-100",
              change: "+3",
              changeColor: "text-green-600",
            },
          ].map((stat, idx) => (
            <Card
              key={idx}
              className="bg-white border border-gray-200 shadow-xs hover:shadow-sm transition-shadow"
            >
              <CardContent className="p-3 lg:p-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs lg:text-sm mb-1">
                    {stat.label}
                  </p>
                  <p className={`text-lg lg:text-xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className={`text-xs ${stat.changeColor} mt-1`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-2 ${stat.bg} rounded-lg`}>
                  <stat.icon
                    className={`h-4 w-4 lg:h-5 lg:w-5 ${stat.color}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* حالة القضايا */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                حالة القضايا
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-4">
                {stats?.casesByStatus.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{item.status}</span>
                      <span className="text-sm text-gray-500">{item.count}</span>
                    </div>
                    <Progress
                      value={(item.count / (stats?.totalCases || 1)) * 100}
                      className="h-2 bg-gray-100"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* الإجراءات السريعة */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                إجراءات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-6">
              <div className="grid grid-cols-2 gap-3">
                <Link href="/admin/cases/new" className="block">
                  <Button className="w-full h-16 flex-col space-y-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                    <Plus className="h-5 w-5" />
                    <span className="text-xs">قضية جديدة</span>
                  </Button>
                </Link>
                <Link href="/admin/clients/new" className="block">
                  <Button className="w-full h-16 flex-col space-y-2 bg-green-600 hover:bg-green-700 text-white transition-colors">
                    <Users className="h-5 w-5" />
                    <span className="text-xs">عميل جديد</span>
                  </Button>
                </Link>
                <Link href="/admin/appointments/new" className="block">
                  <Button className="w-full h-16 flex-col space-y-2 bg-amber-600 hover:bg-amber-700 text-white transition-colors">
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">موعد جديد</span>
                  </Button>
                </Link>
                <Link href="/admin/articles/new" className="block">
                  <Button className="w-full h-16 flex-col space-y-2 bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">مقال جديد</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* الإحصائيات الشهرية */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                الإحصائيات الشهرية
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-4">
                {stats?.monthlyStats.slice(-4).map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{stat.month}</span>
                    <div className="flex gap-4">
                      <div className="text-right">
                        <div className="text-sm font-semibold text-blue-600">{stat.cases}</div>
                        <div className="text-xs text-gray-500">قضايا</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600">{stat.clients}</div>
                        <div className="text-xs text-gray-500">عملاء</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* الأنشطة الأخيرة */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                الأنشطة الأخيرة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-4">
                {stats?.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-full ${getActivityStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type, activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* أحدث القضايا */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-500" />
                أحدث القضايا
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-4">
                {stats?.recentCases.map((caseItem) => {
                  const status = getStatusVariant(caseItem.status);
                  const priority = getPriorityVariant(caseItem.priority);
                  const caseType = getCaseTypeStyle(caseItem.type);

                  return (
                    <div key={caseItem._id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
                          {caseItem.title}
                        </h4>
                        <div className="flex gap-1">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${status.bg} ${status.border} ${status.text}`}
                          >
                            <div
                              className={`w-1.5 h-1.5 ${status.icon} rounded-full mr-1`}
                            ></div>
                            {status.label}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${caseType.bg} ${caseType.border} ${caseType.text}`}
                        >
                          <div
                            className={`w-1.5 h-1.5 ${caseType.icon} rounded-full mr-1`}
                          ></div>
                          {caseItem.type}
                        </div>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${priority.bg} ${priority.border} ${priority.text}`}
                        >
                          {priority.label}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{caseItem.client}</span>
                        <span>
                          {caseItem.nextHearing
                            ? new Date(caseItem.nextHearing).toLocaleDateString("ar-SA")
                            : "لا يوجد موعد"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}