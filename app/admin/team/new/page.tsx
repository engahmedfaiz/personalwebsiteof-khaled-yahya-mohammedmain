"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  ArrowRight,
  Upload,
  Users,
  Save,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUploadThing } from "@/lib/uploadthing";

interface TeamMember {
  name: string;
  position: string;
  image: string;
  specializations: string[];
  experience: string;
  education: string[];
  achievements: string[];
  phone: string;
  email: string;
  address: string;
  bio: string;
  training?: string[];
  trainingCourses?: string[];
  expertise?: string[];
  additionalSkills?: string[];
  experienceDetails?: string[];
  trainingPrograms?: string[];
  isActive: boolean;
}

interface ValidationErrors {
  name?: string;
  position?: string;
  email?: string;
  phone?: string;
  experience?: string;
  bio?: string;
}

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const [formData, setFormData] = useState<TeamMember>({
    name: "",
    position: "",
    image: "",
    specializations: [],
    experience: "",
    education: [],
    achievements: [],
    phone: "",
    email: "",
    address: "",
    bio: "",
    training: [],
    trainingCourses: [],
    expertise: [],
    additionalSkills: [],
    experienceDetails: [],
    trainingPrograms: [],
    isActive: true,
  });

  const [newSpecialization, setNewSpecialization] = useState("");
  const [newEducation, setNewEducation] = useState("");
  const [newAchievement, setNewAchievement] = useState("");
  const [newTraining, setNewTraining] = useState("");
  const [newTrainingCourse, setNewTrainingCourse] = useState("");
  const [newExpertise, setNewExpertise] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newExperienceDetail, setNewExperienceDetail] = useState("");
  const [newTrainingProgram, setNewTrainingProgram] = useState("");

  // UploadThings hook
  const { startUpload } = useUploadThing("teamImage", {
    onClientUploadComplete: (res) => {
      if (res && res[0]?.url) {
        setFormData((prev) => ({ ...prev, image: res[0].url }));
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

  // دالة بديلة للـ toast
  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    console[type === "success" ? "log" : "error"](message);
    alert(message);
  };

  // التحقق من صحة البيانات
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = "الاسم الكامل مطلوب";
    }

    if (!formData.position.trim()) {
      errors.position = "المسمى الوظيفي مطلوب";
    }

    if (!formData.experience.trim()) {
      errors.experience = "سنوات الخبرة مطلوبة";
    }

    if (!formData.bio.trim()) {
      errors.bio = "النبذة الشخصية مطلوبة";
    } else if (formData.bio.trim().length < 50) {
      errors.bio = "النبذة الشخصية يجب أن تكون على الأقل 50 حرفًا";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
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

  const addItem = (
    field: keyof TeamMember,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.trim() && Array.isArray(formData[field])) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
      }));
      setter("");
    }
  };

  const removeItem = (field: keyof TeamMember, index: number) => {
    if (Array.isArray(formData[field])) {
      setFormData((prev) => ({
        ...prev,
        [field]: (prev[field] as string[]).filter((_, i) => i !== index),
      }));
    }
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
      const res = await fetch("/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSaveStatus("success");
        showToast("تم إضافة العضو بنجاح", "success");

        setTimeout(() => {
          router.push("/admin/team");
        }, 2000);
      } else {
        throw new Error("فشل في إضافة العضو");
      }
    } catch (error) {
      console.error("Error adding team member:", error);
      setSaveStatus("error");
      showToast("حدث خطأ أثناء إضافة العضو", "error");
    } finally {
      setLoading(false);
    }
  };

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
                  href="/admin/team"
                  className="hover:text-blue-600 transition-colors"
                >
                  إدارة الفريق
                </Link>
                <ArrowRight className="h-4 w-4" />
                <span className="text-blue-600 font-bold">إضافة عضو جديد</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                إضافة عضو جديد
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ العضو
              </Button>
              <Link href="/admin/team">
                <Button
                  variant="outline"
                  className="bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                >
                  إلغاء
                </Button>
              </Link>
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
                <span>جاري الحفظ...</span>
              </div>
            ) : saveStatus === "success" ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>تم إضافة العضو بنجاح!</AlertDescription>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  حدث خطأ أثناء الحفظ، يرجى المحاولة مرة أخرى
                </AlertDescription>
              </div>
            )}
          </Alert>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* المعلومات الشخصية */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  المعلومات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
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
                      htmlFor="position"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      المسمى الوظيفي *
                    </Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          position: e.target.value,
                        }))
                      }
                      placeholder="أدخل المسمى الوظيفي"
                      className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors"
                      aria-invalid={!!validationErrors.position}
                    />
                    {validationErrors.position && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {validationErrors.position}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      رقم الهاتف *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="أدخل رقم الهاتف"
                      className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors"
                      aria-invalid={!!validationErrors.phone}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {validationErrors.phone}
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="أدخل البريد الإلكتروني"
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
                </div>

                <div>
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    العنوان (اختياري)
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="أدخل العنوان"
                    className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="experience"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    سنوات الخبرة *
                  </Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                    placeholder="أدخل سنوات الخبرة"
                    className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors"
                    aria-invalid={!!validationErrors.experience}
                  />
                  {validationErrors.experience && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.experience}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="bio"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    النبذة الشخصية *
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    placeholder="أدخل نبذة شخصية عن العضو"
                    className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors min-h-[120px]"
                    aria-invalid={!!validationErrors.bio}
                  />
                  {validationErrors.bio && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.bio}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                    <span>عدد الأحرف: {formData.bio.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* التخصصات */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  التخصصات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label
                    htmlFor="specializations"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    إضافة تخصص جديد
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="specializations"
                      value={newSpecialization}
                      onChange={(e) => setNewSpecialization(e.target.value)}
                      placeholder="أدخل تخصص جديد"
                      className="bg-gray-50 border-gray-300 text-black flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem(
                            "specializations",
                            newSpecialization,
                            setNewSpecialization
                          );
                        }
                      }}
                    />
                    <Button
                      onClick={() =>
                        addItem(
                          "specializations",
                          newSpecialization,
                          setNewSpecialization
                        )
                      }
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {formData.specializations.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      التخصصات المضافة ({formData.specializations.length})
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.specializations.map((spec, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                        >
                          {spec}
                          <button
                            type="button"
                            onClick={() => removeItem("specializations", index)}
                            className="hover:text-red-600 transition-colors"
                            aria-label={`إزالة التخصص ${spec}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* المؤهلات العلمية */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  المؤهلات العلمية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label
                    htmlFor="education"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    إضافة مؤهل علمي
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="education"
                      value={newEducation}
                      onChange={(e) => setNewEducation(e.target.value)}
                      placeholder="أدخل مؤهل علمي"
                      className="bg-gray-50 border-gray-300 text-black flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem("education", newEducation, setNewEducation);
                        }
                      }}
                    />
                    <Button
                      onClick={() =>
                        addItem("education", newEducation, setNewEducation)
                      }
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {formData.education.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      المؤهلات العلمية ({formData.education.length})
                    </Label>
                    <div className="space-y-2">
                      {formData.education.map((edu, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <span className="text-gray-800">{edu}</span>
                          <button
                            type="button"
                            onClick={() => removeItem("education", index)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* الإنجازات */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  الإنجازات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label
                    htmlFor="achievements"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    إضافة إنجاز جديد
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="achievements"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="أدخل إنجاز جديد"
                      className="bg-gray-50 border-gray-300 text-black flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem(
                            "achievements",
                            newAchievement,
                            setNewAchievement
                          );
                        }
                      }}
                    />
                    <Button
                      onClick={() =>
                        addItem(
                          "achievements",
                          newAchievement,
                          setNewAchievement
                        )
                      }
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {formData.achievements.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      الإنجازات ({formData.achievements.length})
                    </Label>
                    <div className="space-y-2">
                      {formData.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <span className="text-gray-800">{achievement}</span>
                          <button
                            type="button"
                            onClick={() => removeItem("achievements", index)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* الحالة */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  حالة العضو
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label
                    htmlFor="isActive"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    العضو نشط
                  </Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isActive: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* الصورة الشخصية */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  الصورة الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-gray-50">
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                          <span className="text-sm text-gray-600">
                            جاري رفع الصورة...
                          </span>
                        </div>
                      ) : formData.image ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={formData.image}
                            alt="معاينة الصورة"
                            className="h-20 w-20 object-cover rounded-lg border border-gray-300"
                          />
                          <span className="text-sm text-gray-600">
                            انقر لتغيير الصورة
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
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
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    disabled={isUploading}
                  />

                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
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
                        {formData.image ? "تغيير الصورة" : "رفع صورة"}
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <Label
                    htmlFor="image-url"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    أو أدخل رابط الصورة
                  </Label>
                  <Input
                    id="image-url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                    placeholder="https://example.com/image.jpg"
                    className="bg-gray-50 border-gray-300 text-black"
                  />
                </div>

                {formData.image && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: "" }))
                    }
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                  >
                    <X className="h-4 w-4 ml-2" />
                    إزالة الصورة
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* الدورات التدريبية */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  الدورات التدريبية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label
                    htmlFor="training"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    إضافة دورة تدريبية
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="training"
                      value={newTraining}
                      onChange={(e) => setNewTraining(e.target.value)}
                      placeholder="أدخل دورة تدريبية"
                      className="bg-gray-50 border-gray-300 text-black flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem("training", newTraining, setNewTraining);
                        }
                      }}
                    />
                    <Button
                      onClick={() =>
                        addItem("training", newTraining, setNewTraining)
                      }
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {formData.training && formData.training.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      الدورات التدريبية ({formData.training.length})
                    </Label>
                    <div className="space-y-2">
                      {formData.training.map((training, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <span className="text-gray-800 text-sm">
                            {training}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem("training", index)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* الخبرات المتخصصة */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  الخبرات المتخصصة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label
                    htmlFor="expertise"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    إضافة خبرة متخصصة
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="expertise"
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      placeholder="أدخل خبرة متخصصة"
                      className="bg-gray-50 border-gray-300 text-black flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem("expertise", newExpertise, setNewExpertise);
                        }
                      }}
                    />
                    <Button
                      onClick={() =>
                        addItem("expertise", newExpertise, setNewExpertise)
                      }
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {formData.expertise && formData.expertise.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      الخبرات المتخصصة ({formData.expertise.length})
                    </Label>
                    <div className="space-y-2">
                      {formData.expertise.map((exp, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <span className="text-gray-800 text-sm">{exp}</span>
                          <button
                            type="button"
                            onClick={() => removeItem("expertise", index)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* أزرار الحفظ */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 ml-2" />
                    )}
                    حفظ العضو
                  </Button>
                  <Link href="/admin/team">
                    <Button type="button" variant="outline" className="w-full">
                      إلغاء
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
