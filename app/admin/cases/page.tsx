"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Scale,
  Calendar,
  Construction,
  ArrowRight,
} from "lucide-react";
import type { Case } from "@/lib/models/User";

export const dynamic = "force-dynamic";

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("/api/cases", { cache: "no-store" });
        if (!res.ok) throw new Error("فشل في جلب البيانات");
        const data = await res.json();
        setCases(data);
      } catch (error) {
        console.error("خطأ أثناء جلب القضايا:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: {
        label: "مفتوحة",
        color: "bg-blue-100 text-blue-800",
      },
      "in-progress": {
        label: "قيد المراجعة",
        color: "bg-yellow-100 text-yellow-800",
      },
      closed: {
        label: "مغلقة",
        color: "bg-green-100 text-green-800",
      },
      pending: {
        label: "معلقة",
        color: "bg-red-100 text-red-800",
      },
    };
    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.open;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      urgent: { label: "عاجل", color: "bg-red-100 text-red-800" },
      high: { label: "عالي", color: "bg-orange-100 text-orange-800" },
      medium: { label: "متوسط", color: "bg-yellow-100 text-yellow-800" },
      low: { label: "منخفض", color: "bg-green-100 text-green-800" },
    };
    const config =
      priorityConfig[priority as keyof typeof priorityConfig] ||
      priorityConfig.medium;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || caseItem.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || caseItem.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // عرض صفحة قيد التطوير مباشرة
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* شارة قيد التطوير */}
        <div className="flex justify-center mb-8">
          <div className="bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <Construction className="h-5 w-5" />
              <span className="font-bold text-lg">قيد التطوير</span>
            </div>
          </div>
        </div>

        {/* البطاقة الرئيسية */}
        <Card className="w-full shadow-2xl border-amber-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* الهيدر */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Scale className="h-20 w-20 text-amber-600" />
                  <Construction className="h-8 w-8 text-red-500 absolute -top-2 -right-2 animate-bounce" />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">
                نظام إدارة القضايا
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 mb-2">
                قيد التطوير حالياً
              </p>

              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mb-6"></div>

              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                نحن نعمل على تطوير نظام متكامل لإدارة القضايا القانونية ليقدم
                لكم أفضل تجربة استخدام
              </p>
            </div>

            {/* الميزات القادمة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-blue-800 mb-2">عرض القضايا</h3>
                <p className="text-blue-600 text-sm">
                  تصفح جميع القضايا المسجلة في النظام
                </p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-green-800 mb-2">إضافة قضايا</h3>
                <p className="text-green-600 text-sm">
                  إضافة قضايا جديدة بسهولة وسرعة
                </p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-purple-800 mb-2">بحث متقدم</h3>
                <p className="text-purple-600 text-sm">
                  بحث وتصفية متقدمة للقضايا
                </p>
              </div>
            </div>

            {/* حالة التطوير */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Construction className="h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-800 text-lg">
                    حالة التطوير
                  </h3>
                  <p className="text-amber-600">جاري العمل على النظام</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-amber-700">التصميم والتخطيط</span>
                  <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-700">واجهة المستخدم</span>
                  <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-700">التكامل مع الخلفية</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    قيد العمل
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-700">الاختبارات</span>
                  <Badge className="bg-blue-100 text-blue-800">قريباً</Badge>
                </div>
              </div>
            </div>

            {/* الإشعارات */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-slate-800 mb-4 text-lg">
                ماذا يمكنك أن تتوقع؟
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-600">
                    واجهة مستخدم سهلة ومبسطة
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-600">
                    إدارة كاملة للقضايا والمستندات
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-600">
                    تقارير وإحصائيات متقدمة
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-600">
                    دعم كامل للأجهزة المحمولة
                  </span>
                </div>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                className="bg-amber-600 hover:bg-amber-700 px-8 py-3 text-lg"
                onClick={() => window.location.reload()}
              >
                <ArrowRight className="h-5 w-5 ml-2" />
                تحديث الصفحة
              </Button>

              <Button
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3 text-lg"
                asChild
              >
                <Link href="/admin">العودة للرئيسية</Link>
              </Button>
            </div>

            {/* التوقيت المتوقع */}
            <div className="text-center mt-8 pt-6 border-t border-slate-200">
              <p className="text-slate-500 text-sm">
                🗓️ المتوقع الإطلاق خلال:{" "}
                <span className="font-bold text-amber-600">أيام قليلة</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الاتصال */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            للاستفسارات:{" "}
            <span className="text-amber-600">FF2173089@gmail.com</span> | هاتف:{" "}
            <span className="text-amber-600">+967 780138083</span>
          </p>
        </div>
      </div>
    </div>
  );
}
