"use client";

import { useState, useEffect, useMemo } from "react";
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
  UserCheck,
  UserX,
  Briefcase,
  Award,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Calendar,
  Tag,
  BarChart3,
  Sparkles,
  X,
  GraduationCap,
  Star,
  Clock,
} from "lucide-react";

interface TeamMember {
  _id?: string;
  name: string;
  position: string;
  image: string;
  specializations: string[];
  experience: string;
  education: string[];
  achievements: string[];
  phone: string;
  email: string;
  address?: string;
  bio: string;
  training?: string[];
  trainingCourses?: string[];
  expertise?: string[];
  additionalSkills?: string[];
  experienceDetails?: string[];
  trainingPrograms?: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const dynamic = "force-dynamic";

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [specializationFilter, setSpecializationFilter] =
    useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // حساب الإحصائيات ديناميكياً من البيانات
  const stats = useMemo(() => {
    const total = teamMembers.length;
    const active = teamMembers.filter((member) => member.isActive).length;
    const inactive = total - active;

    // حساب التخصصات الفريدة
    const allSpecializations = teamMembers.flatMap(
      (member) => member.specializations
    );
    const uniqueSpecializations = [...new Set(allSpecializations)].length;

    // حساب الخبرة الإجمالية والمتوسطة
    const totalExperience = teamMembers.reduce((sum, member) => {
      // استخراج الرقم من حقل الخبرة (مثال: "5 سنوات" → 5)
      const experienceMatch = member.experience.match(/(\d+)/);
      const exp = experienceMatch ? parseInt(experienceMatch[1]) : 0;
      return sum + exp;
    }, 0);

    const avgExperience =
      total > 0 ? (totalExperience / total).toFixed(1) : "0";

    return {
      total,
      active,
      inactive,
      specializations: uniqueSpecializations,
      totalExperience: `${totalExperience}+ سنة`,
      avgExperience: `${avgExperience} سنة`,
    };
  }, [teamMembers]);

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
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/team", { cache: "no-store" });
      if (!res.ok) throw new Error("فشل في جلب أعضاء الفريق");

      const data = await res.json();

      const normalizedMembers: TeamMember[] = data.map((member: any) => ({
        ...member,
        createdAt: member.createdAt ? new Date(member.createdAt) : new Date(),
        updatedAt: member.updatedAt ? new Date(member.updatedAt) : new Date(),
      }));

      setTeamMembers(normalizedMembers);
    } catch (error) {
      console.error("خطأ أثناء جلب أعضاء الفريق:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العضو؟")) {
      try {
        const res = await fetch(`/api/team/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setTeamMembers(teamMembers.filter((member) => member._id !== id));
          alert("تم حذف العضو بنجاح");
        } else {
          throw new Error("فشل في حذف العضو");
        }
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("حدث خطأ أثناء حذف العضو");
      }
    }
  };

  const getStatusVariant = (isActive: boolean) => {
    return isActive
      ? {
          bg: "bg-gradient-to-r from-emerald-50 to-green-50",
          border: "border-emerald-200",
          text: "text-emerald-700",
          icon: "bg-emerald-500",
          label: "نشط",
        }
      : {
          bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
          border: "border-amber-200",
          text: "text-amber-700",
          icon: "bg-amber-500",
          label: "غير نشط",
        };
  };

  const getSpecializationStyle = (specialization: string) => {
    const styles: Record<string, any> = {
      "القانون التجاري": {
        bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
        border: "border-blue-200",
        text: "text-blue-700",
        icon: "bg-blue-500",
      },
      "القانون المدني": {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50",
        border: "border-purple-200",
        text: "text-purple-700",
        icon: "bg-purple-500",
      },
      "قانون العمل": {
        bg: "bg-gradient-to-r from-emerald-50 to-teal-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        icon: "bg-emerald-500",
      },
      "الأحوال الشخصية": {
        bg: "bg-gradient-to-r from-pink-50 to-rose-50",
        border: "border-pink-200",
        text: "text-pink-700",
        icon: "bg-pink-500",
      },
      "القانون الجنائي": {
        bg: "bg-gradient-to-r from-orange-50 to-red-50",
        border: "border-orange-200",
        text: "text-orange-700",
        icon: "bg-orange-500",
      },
      "القانون الإداري": {
        bg: "bg-gradient-to-r from-indigo-50 to-blue-50",
        border: "border-indigo-200",
        text: "text-indigo-700",
        icon: "bg-indigo-500",
      },
    };
    return (
      styles[specialization] || {
        bg: "bg-gradient-to-r from-gray-50 to-slate-50",
        border: "border-gray-200",
        text: "text-gray-700",
        icon: "bg-gray-500",
      }
    );
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specializations.some((spec) =>
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && member.isActive) ||
      (statusFilter === "inactive" && !member.isActive);

    const matchesSpecialization =
      specializationFilter === "all" ||
      member.specializations.includes(specializationFilter);

    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  // ترتيب الأعضاء
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
        );
      case "name":
        return a.name.localeCompare(b.name);
      case "experience":
        const expA = parseInt(a.experience.match(/(\d+)/)?.[1] || "0");
        const expB = parseInt(b.experience.match(/(\d+)/)?.[1] || "0");
        return expB - expA;
      default:
        return 0;
    }
  });

  // Mobile Filter Component
  const MobileFilters = () => (
    <div className="lg:hidden space-y-4 mb-4 text-black p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-2 gap-3">
        <Select
          value={specializationFilter}
          onValueChange={setSpecializationFilter}
        >
          <SelectTrigger className="bg-white border-gray-300 text-sm">
            <SelectValue placeholder="التخصص" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع التخصصات</SelectItem>
            <SelectItem value="القانون التجاري">القانون التجاري</SelectItem>
            <SelectItem value="القانون المدني">القانون المدني</SelectItem>
            <SelectItem value="قانون العمل">قانون العمل</SelectItem>
            <SelectItem value="الأحوال الشخصية">الأحوال الشخصية</SelectItem>
            <SelectItem value="القانون الجنائي">القانون الجنائي</SelectItem>
            <SelectItem value="القانون الإداري">القانون الإداري</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-white border-gray-300 text-sm">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="active">نشط فقط</SelectItem>
            <SelectItem value="inactive">غير نشط فقط</SelectItem>
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
            setSpecializationFilter("all");
          }}
        >
          إعادة التعيين
        </Button>
      </div>
    </div>
  );

  // تصميم مختلف لكل حجم شاشة
  const renderMembers = () => {
    if (screenSize === "mobile") {
      return (
        <div className="space-y-3">
          {sortedMembers.map((member) => {
            const status = getStatusVariant(member.isActive);
            const mainSpecialization = member.specializations[0];
            const specializationStyle =
              getSpecializationStyle(mainSpecialization);

            return (
              <Card
                key={member._id}
                className="bg-white border border-gray-200 shadow-xs rounded-xl"
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-12 h-12 border border-gray-200">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
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
                      <Link href={`/team/${member._id}`} target="_blank">
                        <Button
                          size="sm"
                          className="h-7 w-7 p-0 bg-blue-50 text-blue-600 border border-blue-200"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Link href={`/admin/team/${member._id}/edit`}>
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
                        onClick={() => handleDeleteMember(member._id!)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {member.position}
                  </p>

                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${specializationStyle.bg} ${specializationStyle.border} ${specializationStyle.text}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 ${specializationStyle.icon} rounded-full mr-1`}
                      ></div>
                      {mainSpecialization}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {member.experience}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </span>
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
                  العضو
                </TableHead>
                <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
                  الحالة
                </TableHead>
                <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
                  الخبرة
                </TableHead>
                <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
                  الإجراءات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMembers.map((member) => {
                const status = getStatusVariant(member.isActive);

                return (
                  <TableRow
                    key={member._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border border-gray-200">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">
                            {member.name}
                          </h4>
                          <div className="text-xs text-gray-500">
                            {member.position}
                          </div>
                        </div>
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
                      <span className="font-semibold text-gray-900">
                        {member.experience}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <div className="flex justify-center gap-1">
                        <Link href={`/team/${member._id}`} target="_blank">
                          <Button
                            size="sm"
                            className="h-7 w-7 p-0 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link href={`/admin/team/${member._id}/edit`}>
                          <Button
                            size="sm"
                            className="h-7 w-7 p-0 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="h-7 w-7 p-0 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                          onClick={() => handleDeleteMember(member._id!)}
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
                  العضو
                </TableHead>
                <TableHead className="w-[15%] py-4 text-sm font-semibold text-blue-900 text-center">
                  المسمى الوظيفي
                </TableHead>
                <TableHead className="w-[15%] py-4 text-sm font-semibold text-blue-900 text-center">
                  التخصصات
                </TableHead>
                <TableHead className="w-[10%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الحالة
                </TableHead>
                <TableHead className="w-[10%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الخبرة
                </TableHead>
                <TableHead className="w-[10%] py-4 text-sm font-semibold text-blue-900 text-center">
                  التواصل
                </TableHead>
                <TableHead className="w-[15%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الإجراءات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMembers.map((member) => {
                const status = getStatusVariant(member.isActive);
                const mainSpecialization = member.specializations[0];
                const specializationStyle =
                  getSpecializationStyle(mainSpecialization);

                return (
                  <TableRow
                    key={member._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 border border-gray-200">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">
                            {member.name}
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {member.bio.substring(0, 60)}...
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <span className="text-sm text-gray-700">
                        {member.position}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${specializationStyle.bg} ${specializationStyle.border} ${specializationStyle.text}`}
                        >
                          <div
                            className={`w-2 h-2 ${specializationStyle.icon} rounded-full mr-2`}
                          ></div>
                          {mainSpecialization}
                        </div>
                        {member.specializations.length > 1 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.specializations.length - 1}
                          </Badge>
                        )}
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
                      <span className="font-bold text-gray-900">
                        {member.experience}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/team/${member._id}`} target="_blank">
                          <Button
                            size="sm"
                            className="h-8 w-8 p-0 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link href={`/admin/team/${member._id}/edit`}>
                          <Button
                            size="sm"
                            className="h-8 w-8 p-0 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="h-8 w-8 p-0 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                          onClick={() => handleDeleteMember(member._id!)}
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
          <p className="text-gray-700">جاري تحميل أعضاء الفريق...</p>
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
                  إدارة فريق العمل
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                إدارة فريق العمل
              </h1>
            </div>
            <Link href="/admin/team/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                <Plus className="h-4 w-4 ml-2" />
                إضافة عضو جديد
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
              label: "إجمالي الأعضاء",
              value: stats.total,
              icon: Users,
              color: "text-blue-600",
              bg: "bg-blue-100",
            },
            {
              label: "النشطين",
              value: stats.active,
              icon: UserCheck,
              color: "text-green-600",
              bg: "bg-green-100",
            },
            {
              label: "غير النشطين",
              value: stats.inactive,
              icon: UserX,
              color: "text-yellow-600",
              bg: "bg-yellow-100",
            },
            {
              label: "التخصصات",
              value: stats.specializations,
              icon: Tag,
              color: "text-purple-600",
              bg: "bg-purple-100",
            },
            {
              label: "إجمالي الخبرة",
              value: stats.totalExperience,
              icon: Briefcase,
              color: "text-red-600",
              bg: "bg-red-100",
            },
            {
              label: "متوسط الخبرة",
              value: stats.avgExperience,
              icon: Award,
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
                <Filter className="h-4 w-4 ml-1" />
                الفلاتر
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            {/* Mobile Search */}
            <div className="lg:hidden mb-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ابحث في الأعضاء..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 bg-white border-gray-300"
                />
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ابحث في الأعضاء..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 bg-white border-gray-300"
                  />
                </div>
              </div>
              <div>
                <Select
                  value={specializationFilter}
                  onValueChange={setSpecializationFilter}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="التخصص" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع التخصصات</SelectItem>
                    <SelectItem value="القانون التجاري">
                      القانون التجاري
                    </SelectItem>
                    <SelectItem value="القانون المدني">
                      القانون المدني
                    </SelectItem>
                    <SelectItem value="قانون العمل">قانون العمل</SelectItem>
                    <SelectItem value="الأحوال الشخصية">
                      الأحوال الشخصية
                    </SelectItem>
                    <SelectItem value="القانون الجنائي">
                      القانون الجنائي
                    </SelectItem>
                    <SelectItem value="القانون الإداري">
                      القانون الإداري
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="active">نشط فقط</SelectItem>
                    <SelectItem value="inactive">غير نشط فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && <MobileFilters />}

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-700">
                  عرض {sortedMembers.length} من أصل {teamMembers.length} عضو
                </span>
              </div>
              <div className="flex gap-2 w-full lg:w-auto">
                <Button
                  variant="outline"
                  className="hidden lg:flex bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                  size="sm"
                >
                  <Filter className="h-4 w-4 ml-2" />
                  تصفية متقدمة
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 lg:flex-initial"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
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

        {/* Members List */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-lg text-gray-900">
              قائمة أعضاء الفريق ({sortedMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-0">
            {sortedMembers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">لا توجد أعضاء مطابقة للبحث</p>
                <Link href="/admin/team/new">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة أول عضو
                  </Button>
                </Link>
              </div>
            ) : (
              renderMembers()
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
