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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Phone,
  Mail,
  User,
  Building,
  Briefcase,
  GraduationCap,
  Calendar,
  Shield,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Sparkles,
  X,
} from "lucide-react";

// تعريف نوع المستخدم
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "lawyer" | "secretary" | "trainee";
  phone?: string;
  avatar?: string;
  specialization?: string;
  experience?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const dynamic = "force-dynamic";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [specializationFilter, setSpecializationFilter] =
    useState<string>("all");
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // استخدام الإحصائيات المطلوبة بدلاً من الحساب
  const [stats] = useState({
    total: 24,
    active: 20,
    inactive: 4,
    admins: 2,
    lawyers: 12,
    secretaries: 6,
    trainees: 4,
  });

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
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        if (!res.ok) throw new Error("فشل في جلب المستخدمين");

        const data = await res.json();

        const normalizedUsers: User[] = data.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        }));

        setUsers(normalizedUsers);
      } catch (error) {
        console.error("خطأ أثناء جلب المستخدمين:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // دالة لحذف المستخدم
  const handleDeleteUser = async (userId: string) => {
    if (confirm("هل أنت متأكد من أنك تريد حذف هذا المستخدم؟")) {
      try {
        const res = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setUsers(users.filter((user) => user._id !== userId));
          alert("تم حذف المستخدم بنجاح");
        } else {
          throw new Error("فشل في حذف المستخدم");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("حدث خطأ أثناء حذف المستخدم");
      }
    }
  };

  // دالة لتغيير حالة المستخدم
  const handleToggleUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}/toggle`, {
        method: "PATCH",
      });

      if (res.ok) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isActive: !user.isActive } : user
          )
        );
        alert("تم تغيير حالة المستخدم بنجاح");
      } else {
        throw new Error("فشل في تغيير حالة المستخدم");
      }
    } catch (error) {
      console.error("Error toggling user:", error);
      alert("حدث خطأ أثناء تغيير حالة المستخدم");
    }
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

  const getRoleVariant = (role: string) => {
    const variants: Record<string, any> = {
      admin: {
        bg: "bg-gradient-to-r from-red-50 to-pink-50",
        border: "border-red-200",
        text: "text-red-700",
        icon: "bg-red-500",
        label: "مدير النظام",
        iconComponent: Shield,
      },
      lawyer: {
        bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
        border: "border-blue-200",
        text: "text-blue-700",
        icon: "bg-blue-500",
        label: "محامي",
        iconComponent: Briefcase,
      },
      secretary: {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50",
        border: "border-purple-200",
        text: "text-purple-700",
        icon: "bg-purple-500",
        label: "سكرتير",
        iconComponent: User,
      },
      trainee: {
        bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
        border: "border-amber-200",
        text: "text-amber-700",
        icon: "bg-amber-500",
        label: "متدرب",
        iconComponent: GraduationCap,
      },
    };
    return variants[role] || variants.lawyer;
  };

  const getSpecializationStyle = (specialization?: string) => {
    if (!specialization) {
      return {
        bg: "bg-gradient-to-r from-gray-50 to-slate-50",
        border: "border-gray-200",
        text: "text-gray-700",
        label: "بدون تخصص",
      };
    }

    const styles: Record<string, any> = {
      "القانون التجاري": {
        bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
        border: "border-blue-200",
        text: "text-blue-700",
      },
      "قانون العمل": {
        bg: "bg-gradient-to-r from-green-50 to-emerald-50",
        border: "border-green-200",
        text: "text-green-700",
      },
      "القانون العقاري": {
        bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
        border: "border-amber-200",
        text: "text-amber-700",
      },
      "أحوال شخصية": {
        bg: "bg-gradient-to-r from-pink-50 to-rose-50",
        border: "border-pink-200",
        text: "text-pink-700",
      },
    };
    return (
      styles[specialization] || {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50",
        border: "border-purple-200",
        text: "text-purple-700",
      }
    );
  };

  const getAvatarFallback = (name: string, role: string) => {
    if (role === "admin") return <Shield className="h-4 w-4" />;
    if (role === "lawyer") return <Briefcase className="h-4 w-4" />;
    if (role === "secretary") return <User className="h-4 w-4" />;
    if (role === "trainee") return <GraduationCap className="h-4 w-4" />;
    return name.charAt(0);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.specialization &&
        user.specialization.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    const matchesSpecialization =
      specializationFilter === "all" ||
      user.specialization === specializationFilter ||
      (!user.specialization && specializationFilter === "none");

    return (
      matchesSearch && matchesStatus && matchesRole && matchesSpecialization
    );
  });

  // Mobile Filter Component
  const MobileFilters = () => (
    <div className="lg:hidden space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-2 gap-3">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="text-black bg-white border-gray-300 text-sm">
            <SelectValue placeholder="الدور" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأدوار</SelectItem>
            <SelectItem value="admin">مدير النظام</SelectItem>
            <SelectItem value="lawyer">محامي</SelectItem>
            <SelectItem value="secretary">سكرتير</SelectItem>
            <SelectItem value="trainee">متدرب</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="text-black bg-white border-gray-300 text-sm">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="active">مفعل</SelectItem>
            <SelectItem value="inactive">معطل</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={specializationFilter}
          onValueChange={setSpecializationFilter}
        >
          <SelectTrigger className="text-black bg-white border-gray-300 text-sm">
            <SelectValue placeholder="التخصص" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع التخصصات</SelectItem>
            <SelectItem value="القانون التجاري">القانون التجاري</SelectItem>
            <SelectItem value="قانون العمل">قانون العمل</SelectItem>
            <SelectItem value="القانون العقاري">القانون العقاري</SelectItem>
            <SelectItem value="أحوال شخصية">أحوال شخصية</SelectItem>
            <SelectItem value="none">بدون تخصص</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => setShowMobileFilters(false)}
        >
          <X className="h-4 w-4 ml-1" />
          إغلاق
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setRoleFilter("all");
            setSpecializationFilter("all");
          }}
        >
          إعادة التعيين
        </Button>
      </div>
    </div>
  );

  // تصميم مختلف لكل حجم شاشة
  const renderUsers = () => {
    if (screenSize === "mobile") {
      return (
        <div className="space-y-3">
          {filteredUsers.map((user) => {
            const status = getStatusVariant(user.isActive);
            const role = getRoleVariant(user.role);
            const specialization = getSpecializationStyle(user.specialization);

            return (
              <Card
                key={user._id}
                className="bg-white border border-gray-200 shadow-xs rounded-xl"
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10 border border-gray-200">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-sm">
                          {getAvatarFallback(user.name, user.role)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${status.bg} ${status.border} ${status.text}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 ${status.icon} rounded-full mr-1`}
                        ></div>
                        {status.label}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Link href={`/admin/users/${user._id}`}>
                        <Button
                          size="sm"
                          className="h-7 w-7 p-0 bg-blue-50 text-blue-600 border border-blue-200"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Link href={`/admin/users/${user._id}/edit`}>
                        <Button
                          size="sm"
                          className="h-7 w-7 p-0 bg-green-50 text-green-600 border border-green-200"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className="h-7 w-7 p-0 bg-red-50 text-red-600 border border-red-200"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-sm mb-1 line-clamp-1 text-gray-900">
                    {user.name}
                  </h3>

                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${role.bg} ${role.border} ${role.text}`}
                    >
                      <role.iconComponent className="h-3 w-3 mr-1" />
                      {role.label}
                    </div>
                    {user.specialization && (
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${specialization.bg} ${specialization.border} ${specialization.text}`}
                      >
                        {specialization.label}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate max-w-[120px]">
                        {user.email}
                      </span>
                    </div>
                    <div className="text-left">
                      {new Date(user.createdAt).toLocaleDateString("ar-SA")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      );
    } else if (screenSize === "tablet") {
      return (
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-[600px]">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[40%] py-3 text-xs font-medium text-gray-700">
                  المستخدم
                </TableHead>
                <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
                  الدور
                </TableHead>
                <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
                  الحالة
                </TableHead>
                <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
                  الإجراءات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const status = getStatusVariant(user.isActive);
                const role = getRoleVariant(user.role);

                return (
                  <TableRow
                    key={user._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border border-gray-200">
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                          />
                          <AvatarFallback className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-sm">
                            {getAvatarFallback(user.name, user.role)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">
                            {user.name}
                          </h4>
                          <div className="text-xs text-gray-500">
                            {user.email}
                          </div>
                          {user.specialization && (
                            <div className="text-xs text-gray-400">
                              {user.specialization}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${role.bg} ${role.border} ${role.text}`}
                      >
                        <role.iconComponent className="h-3 w-3 mr-1" />
                        {role.label}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${status.bg} ${status.border} ${status.text}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 ${status.icon} rounded-full mr-1`}
                        ></div>
                        {status.label}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <div className="flex justify-center gap-1">
                        <Link href={`/admin/users/${user._id}`}>
                          <Button
                            size="sm"
                            className="h-7 w-7 p-0 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link href={`/admin/users/${user._id}/edit`}>
                          <Button
                            size="sm"
                            className="h-7 w-7 p-0 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="h-7 w-7 p-0 bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
                          onClick={() => handleToggleUser(user._id)}
                        >
                          {user.isActive ? "تعطيل" : "تفعيل"}
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 w-7 p-0 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      );
    } else {
      return (
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <TableHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <TableRow>
                <TableHead className="w-[25%] py-4 text-sm font-semibold text-blue-900">
                  المستخدم
                </TableHead>
                <TableHead className="w-[15%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الدور
                </TableHead>
                <TableHead className="w-[15%] py-4 text-sm font-semibold text-blue-900 text-center">
                  التخصص
                </TableHead>
                <TableHead className="w-[10%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الحالة
                </TableHead>
                <TableHead className="w-[10%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الخبرة
                </TableHead>
                <TableHead className="w-[15%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الإجراءات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const status = getStatusVariant(user.isActive);
                const role = getRoleVariant(user.role);
                const specialization = getSpecializationStyle(
                  user.specialization
                );

                return (
                  <TableRow
                    key={user._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 border border-gray-200">
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                          />
                          <AvatarFallback className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600">
                            {getAvatarFallback(user.name, user.role)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">
                            {user.name}
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-1">
                            {user.email}
                          </p>
                          {user.phone && (
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {user.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${role.bg} ${role.border} ${role.text}`}
                      >
                        <role.iconComponent className="h-3 w-3 mr-2" />
                        {role.label}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${specialization.bg} ${specialization.border} ${specialization.text}`}
                      >
                        {specialization.label}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${status.bg} ${status.border} ${status.text}`}
                      >
                        <div
                          className={`w-2 h-2 ${status.icon} rounded-full mr-2`}
                        ></div>
                        {status.label}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="text-sm text-gray-900">
                        {user.experience ? `${user.experience} سنة` : "-"}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/admin/users/${user._id}`}>
                          <Button
                            size="sm"
                            className="h-8 w-8 p-0 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link href={`/admin/users/${user._id}/edit`}>
                          <Button
                            size="sm"
                            className="h-8 w-8 p-0 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="h-8 w-8 p-0 bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
                          onClick={() => handleToggleUser(user._id)}
                        >
                          {user.isActive ? "تعطيل" : "تفعيل"}
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 w-8 p-0 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">جاري تحميل المستخدمين...</p>
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
                <span className="text-blue-600 font-bold">
                  إدارة المستخدمين
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                إدارة المستخدمين
              </h1>
              <p className="text-gray-600">
                إدارة فريق العمل والمستخدمين في النظام القانوني
              </p>
            </div>
            <Link href="/admin/users/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                <Plus className="h-4 w-4 ml-2" />
                مستخدم جديد
              </Button>
            </Link>
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
              label: "إجمالي المستخدمين",
              value: stats.total,
              icon: Users,
              color: "text-blue-600",
              bg: "bg-blue-100",
            },
            {
              label: "المستخدمين النشطين",
              value: stats.active,
              icon: CheckCircle,
              color: "text-green-600",
              bg: "bg-green-100",
            },
            {
              label: "المستخدمين المعطلين",
              value: stats.inactive,
              icon: Users,
              color: "text-red-600",
              bg: "bg-red-100",
            },
            {
              label: "المدراء",
              value: stats.admins,
              icon: Shield,
              color: "text-purple-600",
              bg: "bg-purple-100",
            },
            {
              label: "المحامون",
              value: stats.lawyers,
              icon: Briefcase,
              color: "text-amber-600",
              bg: "bg-amber-100",
            },
            {
              label: "السكرتارية",
              value: stats.secretaries,
              icon: User,
              color: "text-cyan-600",
              bg: "bg-cyan-100",
            },
          ].map((stat, idx) => (
            <Card
              key={idx}
              className="bg-white border border-gray-200 shadow-xs"
            >
              <CardContent className="p-3 lg:p-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs lg:text-sm mb-1">
                    {stat.label}
                  </p>
                  <p className={`text-lg lg:text-xl font-bold ${stat.color}`}>
                    {stat.value}
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

        {/* Filters Section */}
        <Card className="bg-white border border-gray-200 mb-6">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                البحث والتصفية المتقدم
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4 ml-1 " />
                الفلاتر
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 ">
            {/* Mobile Search */}
            <div className="lg:hidden mb-4">
              <div className="relative ">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ابحث في المستخدمين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-black pr-10 border-gray-300"
                />
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ابحث في المستخدمين..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-black pr-10 bg-white border-gray-300"
                  />
                </div>
              </div>
              <div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="text-black bg-white border-gray-300">
                    <SelectValue placeholder="الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأدوار</SelectItem>
                    <SelectItem value="admin">مدير النظام</SelectItem>
                    <SelectItem value="lawyer">محامي</SelectItem>
                    <SelectItem value="secretary">سكرتير</SelectItem>
                    <SelectItem value="trainee">متدرب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="text-black bg-white border-gray-300">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="active">مفعل</SelectItem>
                    <SelectItem value="inactive">معطل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={specializationFilter}
                  onValueChange={setSpecializationFilter}
                >
                  <SelectTrigger className="text-black bg-white border-gray-300">
                    <SelectValue placeholder="التخصص" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع التخصصات</SelectItem>
                    <SelectItem value="القانون التجاري">
                      القانون التجاري
                    </SelectItem>
                    <SelectItem value="قانون العمل">قانون العمل</SelectItem>
                    <SelectItem value="القانون العقاري">
                      القانون العقاري
                    </SelectItem>
                    <SelectItem value="أحوال شخصية">أحوال شخصية</SelectItem>
                    <SelectItem value="none">بدون تخصص</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && <MobileFilters />}

            <div className="flex flex-col lg:flex-row text-white justify-between items-start lg:items-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-700">
                  عرض {filteredUsers.length} من أصل {users.length} مستخدم
                </span>
              </div>
              <div className="flex gap-2 w-full lg:w-auto">
                <Button
                  variant="outline"
                  className="hidden lg:flex bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                  size="sm"
                >
                  <Filter className="h-4 w-4 ml-2 text-black" />
                  تصفية متقدمة
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 lg:flex-initial"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setRoleFilter("all");
                    setSpecializationFilter("all");
                    setShowMobileFilters(false);
                  }}
                >
                  إعادة التعيين
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-lg text-gray-900">
              قائمة المستخدمين ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-0">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">لا توجد مستخدمين مطابقين للبحث</p>
              </div>
            ) : (
              renderUsers()
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
