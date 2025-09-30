"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowRight,
  Plus,
  User,
  Mail,
  Phone,
  Shield,
  Briefcase,
  GraduationCap,
  Save,
  ArrowLeft,
  Users,
  Eye,
  EyeOff,
  Lock,
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

// دالة بديلة للـ toast
const showToast = (message: string, type: "success" | "error" = "success") => {
  console[type === "success" ? "log" : "error"](message);
  alert(message);
};

const SPECIALIZATIONS = [
  "الملكية الفكرية",
  "التجاري والشركات",
  "الجنائي",
  "العقاري",
  "العمل والتأمينات",
  "الأسرة والأحوال الشخصية",
  "الإداري والدستوري",
  "الضرائب والجمارك",
  "البحري والجوي",
  "التأمين",
  "التحكيم الدولي",
  "تقنية المعلومات",
];

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  specialization?: string;
}

export default function NewUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    // البيانات الأساسية
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "lawyer" as "admin" | "lawyer" | "secretary" | "trainee",
    phone: "",

    // البيانات المهنية
    specialization: "",
    experience: "",
    bio: "",

    // الإعدادات
    isActive: true,
    sendWelcomeEmail: true,

    // الصورة
    avatar: "",
  });

  // UploadThings hook
  const { startUpload } = useUploadThing("userAvatar", {
    onClientUploadComplete: (res) => {
      if (res && res[0]?.url) {
        setFormData(prev => ({ ...prev, avatar: res[0].url }));
        showToast("تم رفع الصورة بنجاح", "success");
      }
      setIsUploading(false);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      showToast("فشل في رفع الصورة", "error");
      setIsUploading(false);
    },
  });

  const handleInputChange = (
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // مسح أخطاء التحقق عند التعديل
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // معالجة رفع الصورة
  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      showToast("الملف يجب أن يكون صورة", "error");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      showToast("حجم الصورة يجب أن لا يتجاوز 4MB", "error");
      return;
    }

    setIsUploading(true);
    try {
      await startUpload([file]);
    } catch (error) {
      console.error("Upload error:", error);
      showToast("فشل في رفع الصورة", "error");
      setIsUploading(false);
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

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = "الاسم مطلوب";
    }

    if (!formData.email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "صيغة البريد الإلكتروني غير صحيحة";
    }

    if (!formData.password) {
      errors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "كلمة المرور وتأكيدها غير متطابقين";
    }

    if (formData.role === "lawyer" && !formData.specialization) {
      errors.specialization = "التخصص مطلوب للمحامين";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("يرجى تصحيح الأخطاء في النموذج قبل المتابعة", "error");
      return;
    }

    setLoading(true);
    setSaveStatus("saving");

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        specialization: formData.specialization,
        experience: formData.experience,
        bio: formData.bio,
        avatar: formData.avatar,
        isActive: formData.isActive,
        sendWelcomeEmail: formData.sendWelcomeEmail,
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "فشل في إنشاء المستخدم");
      }

      await res.json();
      setSaveStatus("success");
      showToast("تم إنشاء المستخدم بنجاح", "success");

      setTimeout(() => {
        router.push("/admin/users");
      }, 2000);
    } catch (error) {
      console.error("Error creating user:", error);
      setSaveStatus("error");
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("حدث خطأ أثناء إنشاء المستخدم", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const roleVariant = getRoleVariant(formData.role);

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
                <Link
                  href="/admin/users"
                  className="hover:text-blue-600 transition-colors"
                >
                  إدارة المستخدمين
                </Link>
                <ArrowRight className="h-4 w-4" />
                <span className="text-blue-600 font-bold">مستخدم جديد</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Plus className="h-8 w-8 text-blue-600" />
                إنشاء مستخدم جديد
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link href="/admin/users" className="flex-1 sm:flex-initial">
                <Button
                  variant="outline"
                  className="w-full bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  رجوع للقائمة
                </Button>
              </Link>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <Save className="h-4 w-4 ml-2" />
                إنشاء المستخدم
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* حالة الحفظ */}
        {saveStatus !== "idle" && (
          <Alert
            className={`mb-6 ${
              saveStatus === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : saveStatus === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            {saveStatus === "saving" ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>جاري إنشاء المستخدم...</span>
              </div>
            ) : saveStatus === "success" ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  تم إنشاء المستخدم بنجاح!
                </AlertDescription>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  حدث خطأ أثناء الإنشاء، يرجى المحاولة مرة أخرى
                </AlertDescription>
              </div>
            )}
          </Alert>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  المعلومات الأساسية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Role Selection */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    دور المستخدم *
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                          <IconComponent className="h-5 w-5" />
                          <span className="font-medium text-sm">
                            {role.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      الاسم الكامل *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="أدخل الاسم الكامل"
                      className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors"
                      aria-invalid={!!validationErrors.name}
                    />
                    {validationErrors.name && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      البريد الإلكتروني *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="example@lawfirm.com"
                      className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors"
                      aria-invalid={!!validationErrors.email}
                    />
                    {validationErrors.email && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      رقم الهاتف
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+967 7X XXX XXXX"
                      className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      كلمة المرور *
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="أدخل كلمة المرور"
                        className="bg-gray-50 border-gray-300 text-black pr-10 focus:border-blue-500 transition-colors"
                        aria-invalid={!!validationErrors.password}
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
                    {validationErrors.password && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {validationErrors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      تأكيد كلمة المرور *
                    </Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="أعد إدخال كلمة المرور"
                      className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors"
                      aria-invalid={!!validationErrors.confirmPassword}
                    />
                    {validationErrors.confirmPassword && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {validationErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information - Only for Lawyers */}
            {formData.role === "lawyer" && (
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                  <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-500" />
                    المعلومات المهنية للمحامي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="specialization"
                        className="text-sm font-medium text-gray-700 mb-2 block"
                      >
                        التخصص القانوني *
                      </Label>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => handleInputChange("specialization", value)}
                      >
                        <SelectTrigger 
                          className="bg-gray-50 border-gray-300 text-black"
                          aria-invalid={!!validationErrors.specialization}
                        >
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
                      {validationErrors.specialization && (
                        <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          {validationErrors.specialization}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="experience"
                        className="text-sm font-medium text-gray-700 mb-2 block"
                      >
                        سنوات الخبرة
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleInputChange("experience", value)}
                      >
                        <SelectTrigger className="bg-gray-50 border-gray-300 text-black">
                          <SelectValue placeholder="اختر سنوات الخبرة" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                          ].map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year} {year === 1 ? "سنة" : "سنوات"}
                            </SelectItem>
                          ))}
                          <SelectItem value="15+">أكثر من 15 سنة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="bio"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      نبذة عن المحامي
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="أدخل نبذة مختصرة عن المحامي وخبراته..."
                      rows={4}
                      className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors resize-vertical"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  إعدادات المستخدم
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label
                    htmlFor="isActive"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    تفعيل المستخدم
                  </Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label
                    htmlFor="sendWelcomeEmail"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    إرسال بريد ترحيبي
                  </Label>
                  <Switch
                    id="sendWelcomeEmail"
                    checked={formData.sendWelcomeEmail}
                    onCheckedChange={(checked) => handleInputChange("sendWelcomeEmail", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  صورة المستخدم
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-gray-50">
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                          <span className="text-sm text-gray-600">
                            جاري رفع الصورة...
                          </span>
                        </div>
                      ) : formData.avatar ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={formData.avatar}
                            alt="معاينة الصورة"
                            className="h-20 w-20 object-cover rounded-lg border border-gray-300"
                          />
                          <span className="text-sm text-gray-600">
                            انقر لتغيير الصورة
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <User className="h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            انقر لرفع صورة
                          </span>
                          <span className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 4MB
                          </span>
                        </div>
                      )}
                    </div>
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    disabled={isUploading}
                  />

                  <Button
                    type="button"
                    onClick={() => document.getElementById("avatar-upload")?.click()}
                    disabled={isUploading}
                    variant="outline"
                    className="w-full"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                        جاري الرفع...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 ml-2" />
                        {formData.avatar ? "تغيير الصورة" : "رفع صورة"}
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <Label
                    htmlFor="avatar-url"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    أو أدخل رابط الصورة
                  </Label>
                  <Input
                    id="avatar-url"
                    value={formData.avatar}
                    onChange={(e) => handleInputChange("avatar", e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="bg-gray-50 border-gray-300 text-black"
                  />
                </div>

                {formData.avatar && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleInputChange("avatar", "")}
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                  >
                    <X className="h-4 w-4 ml-2" />
                    إزالة الصورة
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-sm text-gray-900">
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
                    <span>كلمة المرور يجب أن تكون 6 أحرف على الأقل</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>التخصص مطلوب فقط للمحامين</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>سيتم إرسال بريد ترحيبي تلقائياً إذا كان مفعلاً</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}