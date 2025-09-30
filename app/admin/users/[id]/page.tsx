"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  User,
  Mail,
  Phone,
  Shield,
  Briefcase,
  GraduationCap,
  Calendar,
  Clock,
  Edit,
  ArrowLeft,
  Users,
  MapPin,
  Award,
  FileText,
  Activity,
} from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "lawyer" | "secretary" | "trainee";
  phone?: string;
  avatar?: string;
  specialization?: string;
  experience?: number;
  bio?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId) {
      loadUser();
    }
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users/${userId}`, { cache: "no-store" });

      if (!res.ok) throw new Error("فشل في جلب بيانات المستخدم");

      const userData = await res.json();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
      alert("حدث خطأ أثناء تحميل بيانات المستخدم");
    } finally {
      setLoading(false);
    }
  };

  const getRoleVariant = (role: string) => {
    const variants: Record<string, any> = {
      admin: {
        bg: "bg-gradient-to-r from-red-50 to-pink-50",
        border: "border-red-200",
        text: "text-red-700",
        icon: Shield,
        label: "مدير النظام",
      },
      lawyer: {
        bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
        border: "border-blue-200",
        text: "text-blue-700",
        icon: Briefcase,
        label: "محامي",
      },
      secretary: {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50",
        border: "border-purple-200",
        text: "text-purple-700",
        icon: User,
        label: "سكرتير",
      },
      trainee: {
        bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
        border: "border-amber-200",
        text: "text-amber-700",
        icon: GraduationCap,
        label: "متدرب",
      },
    };
    return variants[role] || variants.lawyer;
  };

  const getStatusVariant = (isActive: boolean) => {
    return isActive
      ? {
          bg: "bg-gradient-to-r from-emerald-50 to-green-50",
          border: "border-emerald-200",
          text: "text-emerald-700",
          icon: "bg-emerald-500",
          label: "مفعل",
        }
      : {
          bg: "bg-gradient-to-r from-red-50 to-pink-50",
          border: "border-red-200",
          text: "text-red-700",
          icon: "bg-red-500",
          label: "معطل",
        };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">جاري تحميل بيانات المستخدم...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700">المستخدم غير موجود</p>
          <Link href="/admin/users" className="mt-4 inline-block">
            <Button className="bg-blue-600 hover:bg-blue-700">
              العودة إلى القائمة
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const roleVariant = getRoleVariant(user.role);
  const statusVariant = getStatusVariant(user.isActive);
  const RoleIcon = roleVariant.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                <Link
                  href="/admin/users"
                  className="hover:text-blue-600 transition-colors"
                >
                  إدارة المستخدمين
                </Link>
                <ArrowRight className="h-4 w-4" />
                <span className="text-blue-600 font-bold">تفاصيل المستخدم</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                تفاصيل المستخدم
              </h1>
              <p className="text-gray-600">
                عرض المعلومات الكاملة والتفاصيل الخاصة بالمستخدم
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/users/${user._id}/edit`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Edit className="h-4 w-4 ml-2" />
                  تعديل المستخدم
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="outline" className="border-gray-300">
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  رجوع للقائمة
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - User Profile */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-lg">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-2xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-bold text-gray-900 mt-4">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${roleVariant.bg} ${roleVariant.border} ${roleVariant.text}`}
                    >
                      <RoleIcon className="h-4 w-4 mr-2" />
                      {roleVariant.label}
                    </div>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusVariant.bg} ${statusVariant.border} ${statusVariant.text}`}
                    >
                      <div
                        className={`w-2 h-2 ${statusVariant.icon} rounded-full mr-2`}
                      ></div>
                      {statusVariant.label}
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {user.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">رقم الهاتف</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">تاريخ الإنشاء</p>
                      <p className="font-medium">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>

                  {user.lastLogin && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">آخر تسجيل دخول</p>
                        <p className="font-medium">{formatDateTime(user.lastLogin)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  الإجراءات السريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/admin/users/${user._id}/edit`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 ml-2" />
                    تعديل البيانات
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 ml-2" />
                  إرسال رسالة
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 ml-2" />
                  عرض السجل
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - User Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Information */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                  المعلومات المهنية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700">الدور الوظيفي</Label>
                    <div
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-sm ${roleVariant.bg} ${roleVariant.border} ${roleVariant.text}`}
                    >
                      <RoleIcon className="h-4 w-4 mr-2" />
                      {roleVariant.label}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700">حالة الحساب</Label>
                    <div
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-sm ${statusVariant.bg} ${statusVariant.border} ${statusVariant.text}`}
                    >
                      <div
                        className={`w-2 h-2 ${statusVariant.icon} rounded-full mr-2`}
                      ></div>
                      {statusVariant.label}
                    </div>
                  </div>

                  {user.role === "lawyer" && (
                    <>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-gray-700">التخصص</Label>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            {user.specialization || "غير محدد"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-gray-700">سنوات الخبرة</Label>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <Award className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            {user.experience ? `${user.experience} سنة` : "غير محدد"}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {user.bio && (
                  <div className="mt-6 space-y-2">
                    <Label className="text-sm font-medium text-gray-700">نبذة عن المستخدم</Label>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-green-500" />
                  معلومات الحساب
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-700">الاسم الكامل</Label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-700">البريد الإلكتروني</Label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{user.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-700">رقم الهاتف</Label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{user.phone || "غير متوفر"}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-700">تاريخ آخر تحديث</Label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{formatDateTime(user.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Stats */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="bg-amber-50 border-b border-amber-100">
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-amber-500" />
                  إحصائيات النشاط
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">قضية نشطة</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">45</div>
                    <div className="text-sm text-gray-600">مهمة مكتملة</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-gray-600">مستندات</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">96%</div>
                    <div className="text-sm text-gray-600">معدل النشاط</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Label component for consistent styling
const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);