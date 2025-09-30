"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  Save,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Shield,
  Briefcase,
  GraduationCap,
  Eye,
  EyeOff,
  Lock,
  Calendar,
  Trash2,
  Users,
} from "lucide-react";

const SPECIALIZATIONS = [
  "الملكية الفكرية",
  "التجاري والشركات",
  "الجنائي",
  "العمل والتأمينات",
  "العقاري",
  "الأسرة والأحوال الشخصية",
  "الإداري والدستوري",
  "الضرائب والجمارك",
  "البحري والجوي",
  "التأمين",
  "التحكيم الدولي",
  "تقنية المعلومات",
];

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

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "lawyer" as "admin" | "lawyer" | "secretary" | "trainee",
    phone: "",
    specialization: "",
    experience: "",
    bio: "",
    isActive: true,
  });

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
      
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
        role: userData.role || "lawyer",
        phone: userData.phone || "",
        specialization: userData.specialization || "",
        experience: userData.experience?.toString() || "",
        bio: userData.bio || "",
        isActive: userData.isActive !== false,
      });

      if (userData.avatar) {
        setAvatarPreview(userData.avatar);
      }
    } catch (error) {
      console.error("Error loading user:", error);
      alert("حدث خطأ أثناء تحميل بيانات المستخدم");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("حجم الصورة يجب أن يكون أقل من 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("الملف يجب أن يكون صورة");
        return;
      }

      setNewAvatar(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setNewAvatar(null);
    setAvatarPreview(user?.avatar || null);
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

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "الاسم مطلوب";
    }

    if (!formData.email.trim()) {
      return "البريد الإلكتروني مطلوب";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "صيغة البريد الإلكتروني غير صحيحة";
    }

    if (formData.password && formData.password.length < 6) {
      return "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (formData.role === "lawyer" && !formData.specialization) {
      return "التخصص مطلوب للمحامين";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setSaving(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("role", formData.role);
      submitData.append("phone", formData.phone);
      submitData.append("specialization", formData.specialization);
      submitData.append("experience", formData.experience);
      submitData.append("bio", formData.bio);
      submitData.append("isActive", formData.isActive.toString());

      if (formData.password) {
        submitData.append("password", formData.password);
      }

      if (newAvatar) {
        submitData.append("avatar", newAvatar);
      }

      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: submitData,
      });

      if (res.ok) {
        alert("تم تحديث بيانات المستخدم بنجاح");
        router.push("/admin/users");
      } else {
        throw new Error("فشل في تحديث المستخدم");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("حدث خطأ أثناء تحديث المستخدم");
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!confirm("هل تريد إرسال رابط إعادة تعيين كلمة المرور إلى هذا المستخدم؟")) {
      return;
    }

    try {
      const res = await fetch(`/api/users/${userId}/reset-password`, {
        method: "POST",
      });

      if (res.ok) {
        alert("تم إرسال رابط إعادة تعيين كلمة المرور بنجاح");
      } else {
        throw new Error("فشل في إرسال رابط إعادة التعيين");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("حدث خطأ أثناء إرسال رابط إعادة التعيين");
    }
  };

  const handleDeleteUser = async () => {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.")) {
      return;
    }

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("تم حذف المستخدم بنجاح");
        router.push("/admin/users");
      } else {
        throw new Error("فشل في حذف المستخدم");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("حدث خطأ أثناء حذف المستخدم");
    }
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

  const roleVariant = getRoleVariant(formData.role);
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
                <span className="text-blue-600 font-bold">تعديل المستخدم</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                تعديل المستخدم
              </h1>
              <p className="text-gray-600">
                تعديل بيانات المستخدم والإعدادات في النظام
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                onClick={handleDeleteUser}
              >
                <Trash2 className="h-4 w-4 ml-2" />
                حذف المستخدم
              </Button>
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
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              تعديل بيانات المستخدم
            </CardTitle>
            <CardDescription>
              قم بتعديل المعلومات الأساسية والمهنية للمستخدم
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Info Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-20 h-20 border-2 border-gray-300">
                  <AvatarImage src={avatarPreview || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-4">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${roleVariant.bg} ${roleVariant.border} ${roleVariant.text}`}
                    >
                      <RoleIcon className="h-4 w-4 mr-2" />
                      {roleVariant.label}
                    </div>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        user.isActive
                          ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 text-emerald-700"
                          : "bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-700"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          user.isActive ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      ></div>
                      {user.isActive ? "مفعل" : "معطل"}
                    </div>
                    <div className="text-sm text-gray-500">
                      <Calendar className="h-4 w-4 inline ml-1" />
                      أنشئ في {new Date(user.createdAt).toLocaleDateString("ar-SA")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar Upload */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="avatar" className="text-sm font-medium text-gray-700">
                    صورة المستخدم
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="max-w-xs"
                    />
                    {newAvatar && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeAvatar}
                        className="sm:self-start"
                      >
                        إزالة التغيير
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG بحد أقصى 5MB
                  </p>
                </div>
              </div>

              {/* Role Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    دور المستخدم
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "lawyer", icon: Briefcase, label: "محامي" },
                      { value: "secretary", icon: User, label: "سكرتير" },
                      { value: "trainee", icon: GraduationCap, label: "متدرب" },
                      { value: "admin", icon: Shield, label: "مدير النظام" },
                    ].map((role) => {
                      const IconComponent = role.icon;
                      const isSelected = formData.role === role.value;
                      const variant = getRoleVariant(role.value);

                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => handleInputChange("role", role.value)}
                          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                            isSelected
                              ? `${variant.border} ${variant.bg} ${variant.text}`
                              : "border-gray-300 bg-white text-gray-600 hover:border-blue-300"
                          }`}
                        >
                          <IconComponent className="h-6 w-6" />
                          <span className="font-medium text-sm">{role.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      حالة المستخدم
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {formData.isActive ? "مفعل" : "معطل"}
                      </span>
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    الاسم الكامل *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="أدخل الاسم الكامل"
                    className="bg-white border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    البريد الإلكتروني *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@lawfirm.com"
                    className="bg-white border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    رقم الهاتف
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    className="bg-white border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-gray-500" />
                    كلمة المرور الجديدة
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="اتركها فارغة للحفاظ على كلمة المرور الحالية"
                      className="pr-10 bg-white border-gray-300"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Professional Information - Only for Lawyers */}
              {formData.role === "lawyer" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">المعلومات المهنية للمحامي</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="specialization" className="text-sm font-medium text-gray-700">
                        التخصص القانوني *
                      </Label>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => handleInputChange("specialization", value)}
                      >
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue placeholder="اختر التخصص القانوني" />
                        </SelectTrigger>
                        <SelectContent>
                          {SPECIALIZATIONS.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                        سنوات الخبرة
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleInputChange("experience", value)}
                      >
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue placeholder="اختر سنوات الخبرة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">غير محدد</SelectItem>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year} {year === 1 ? "سنة" : "سنوات"}
                            </SelectItem>
                          ))}
                          <SelectItem value="15+">أكثر من 15 سنة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                  نبذة عن المستخدم
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="أدخل نبذة مختصرة عن المستخدم وخبراته..."
                  rows={4}
                  className="bg-white border-gray-300 resize-none"
                />
              </div>

              {/* Security Section */}
              <div className="space-y-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold text-amber-900">إعدادات الأمان</h3>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-white rounded-lg border border-amber-200">
                  <div>
                    <h4 className="font-medium text-gray-900">إعادة تعيين كلمة المرور</h4>
                    <p className="text-sm text-gray-600">
                      إرسال رابط إعادة تعيين كلمة المرور إلى بريد المستخدم
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    onClick={handleResetPassword}
                  >
                    إرسال رابط التعيين
                  </Button>
                </div>

                {user.lastLogin && (
                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>آخر تسجيل دخول: {new Date(user.lastLogin).toLocaleString("ar-SA")}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <Link href="/admin/users" className="flex-1 sm:flex-initial">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-300"
                    disabled={saving}
                  >
                    إلغاء
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 ml-2" />
                      حفظ التغييرات
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="bg-white border border-gray-200 mt-6">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <CardTitle className="text-sm text-gray-900 flex items-center gap-2">
              💡 نصائح سريعة
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span>الحقول المميزة بـ * إلزامية</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span>اترك حقل كلمة المرور فارغاً للحفاظ على الكلمة الحالية</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span>التخصص مطلوب فقط للمحامين</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span>يمكن إرسال رابط إعادة تعيين كلمة المرور من قسم الأمان</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}