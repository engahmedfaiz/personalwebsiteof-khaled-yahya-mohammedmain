"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Save,
  Eye,
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon,
  Loader2,
  Send,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { generateSlug } from "@/lib/generateSlug";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUploadThing } from "@/lib/uploadthing";

export const dynamic = "force-dynamic";

interface ArticleData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  isPublished: boolean;
  publishedAt?: string;
}

interface ValidationErrors {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  featuredImage?: string;
}

// دالة بديلة للـ toast
const showToast = (message: string, type: "success" | "error" = "success") => {
  console[type === "success" ? "log" : "error"](message);
  alert(message);
};

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [isUploading, setIsUploading] = useState(false);

  // UploadThings hook
  const { startUpload } = useUploadThing("articleImage", {
    onClientUploadComplete: (res) => {
      if (res && res[0]?.url) {
        setFeaturedImage(res[0].url);
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

  // توليد slug عند تغيير العنوان
  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
    // توليد slug تلقائياً من العنوان
    if (value.trim()) {
      const newSlug = generateSlug(value);
      setSlug(newSlug);
    } else {
      setSlug("");
    }
  }, []);

  // التحقق من صحة البيانات
  const validateForm = useCallback((): boolean => {
    const errors: ValidationErrors = {};

    if (!title.trim()) {
      errors.title = "العنوان مطلوب";
    } else if (title.trim().length < 5) {
      errors.title = "العنوان يجب أن يكون على الأقل 5 أحرف";
    }

    if (!excerpt.trim()) {
      errors.excerpt = "المقتطف مطلوب";
    } else if (excerpt.trim().length < 10) {
      errors.excerpt = "المقتطف يجب أن يكون على الأقل 10 أحرف";
    }

    if (!content.trim()) {
      errors.content = "محتوى المقال مطلوب";
    } else if (content.trim().length < 50) {
      errors.content = "محتوى المقال يجب أن يكون على الأقل 50 حرفًا";
    }

    if (!category) {
      errors.category = "الفئة مطلوبة";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [title, excerpt, content, category]);

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

  // إضافة علامة
  const addTag = useCallback(() => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  }, [tagInput, tags]);

  // إزالة علامة
  const removeTag = useCallback(
    (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove));
    },
    [tags]
  );

  // معالجة الضغط على مفتاح Enter
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag();
      }
    },
    [addTag]
  );

  // وظائف تنسيق النص
  const applyTextFormat = useCallback(
    (format: string) => {
      const textarea = document.getElementById(
        "content"
      ) as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      let newText = content;
      let newCursorPos = end;

      switch (format) {
        case "bold":
          if (selectedText) {
            newText =
              content.substring(0, start) +
              `**${selectedText}**` +
              content.substring(end);
            newCursorPos = start + selectedText.length + 4;
          } else {
            newText =
              content.substring(0, start) +
              "**نص غامق**" +
              content.substring(end);
            newCursorPos = start + 10;
          }
          break;

        case "italic":
          if (selectedText) {
            newText =
              content.substring(0, start) +
              `*${selectedText}*` +
              content.substring(end);
            newCursorPos = start + selectedText.length + 2;
          } else {
            newText =
              content.substring(0, start) +
              "*نص مائل*" +
              content.substring(end);
            newCursorPos = start + 8;
          }
          break;

        case "underline":
          if (selectedText) {
            newText =
              content.substring(0, start) +
              `<u>${selectedText}</u>` +
              content.substring(end);
            newCursorPos = start + selectedText.length + 7;
          } else {
            newText =
              content.substring(0, start) +
              "<u>نص تحته خط</u>" +
              content.substring(end);
            newCursorPos = start + 15;
          }
          break;

        case "h1":
          if (selectedText) {
            newText =
              content.substring(0, start) +
              `# ${selectedText}` +
              content.substring(end);
            newCursorPos = start + selectedText.length + 2;
          } else {
            newText =
              content.substring(0, start) +
              "# العنوان الرئيسي" +
              content.substring(end);
            newCursorPos = start + 15;
          }
          break;

        case "h2":
          if (selectedText) {
            newText =
              content.substring(0, start) +
              `## ${selectedText}` +
              content.substring(end);
            newCursorPos = start + selectedText.length + 3;
          } else {
            newText =
              content.substring(0, start) +
              "## العنوان الثانوي" +
              content.substring(end);
            newCursorPos = start + 16;
          }
          break;

        case "h3":
          if (selectedText) {
            newText =
              content.substring(0, start) +
              `### ${selectedText}` +
              content.substring(end);
            newCursorPos = start + selectedText.length + 4;
          } else {
            newText =
              content.substring(0, start) +
              "### عنوان فرعي" +
              content.substring(end);
            newCursorPos = start + 12;
          }
          break;
      }

      setContent(newText);

      // إعادة ضبط مؤشر الكتابة بعد التحديث
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [content]
  );

  // حفظ/نشر المقال
  const handleSave = async (publish = false) => {
    if (!validateForm()) {
      showToast("يرجى تصحيح الأخطاء في النموذج قبل المتابعة", "error");
      return;
    }

    setIsSaving(true);
    setSaveStatus("saving");

    try {
      const articleData: ArticleData = {
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        featuredImage,
        isPublished: publish,
        publishedAt: publish ? new Date().toISOString() : undefined,
      };

      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 409) {
          setValidationErrors((prev) => ({
            ...prev,
            slug: "الرابط المختصر موجود مسبقًا، يرجى اختيار رابط آخر",
          }));
          throw new Error("الرابط المختصر موجود مسبقًا");
        }
        throw new Error(errorData.error || "فشل في إنشاء المقال");
      }

      await res.json();
      setSaveStatus("success");
      showToast(
        publish ? "تم نشر المقال بنجاح" : "تم حفظ المسودة بنجاح",
        "success"
      );

      setTimeout(() => {
        router.push("/admin/articles");
      }, 2000);
    } catch (error) {
      console.error("Error saving article:", error);
      setSaveStatus("error");
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("حدث خطأ أثناء حفظ المقال", "error");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // معاينة المقال
  const handlePreview = () => {
    if (!validateForm()) {
      showToast("يرجى ملء الحقول المطلوبة قبل المعاينة", "error");
      return;
    }

    sessionStorage.setItem(
      "articlePreview",
      JSON.stringify({
        title,
        excerpt,
        content,
        category,
        tags,
        featuredImage,
      })
    );

    window.open(`/admin/articles/preview?slug=${slug}`, "_blank");
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
                  href="/admin/articles"
                  className="hover:text-blue-600 transition-colors"
                >
                  إدارة المقالات
                </Link>
                <ArrowRight className="h-4 w-4" />
                <span className="text-blue-600 font-bold">إنشاء مقال جديد</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Plus className="h-8 w-8 text-blue-600" />
                إنشاء مقال جديد
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                onClick={handlePreview}
                disabled={isSaving}
                variant="outline"
                className="bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <Eye className="h-4 w-4 ml-2" />
                معاينة
              </Button>
              <Button
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ كمسودة
              </Button>
              <Button
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 text-white transition-colors"
              >
                <Send className="h-4 w-4 ml-2" />
                نشر المقال
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
                <span>جاري الحفظ...</span>
              </div>
            ) : saveStatus === "success" ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  {isPublished
                    ? "تم نشر المقال بنجاح!"
                    : "تم حفظ المسودة بنجاح!"}
                </AlertDescription>
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
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  محتوى المقال
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div>
                  <Label
                    htmlFor="title"
                    className=" text-sm  font-medium text-gray-700 mb-2 block"
                  >
                    عنوان المقال *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="أدخل عنوان المقال"
                    className="bg-gray-50 border-gray-300 text-black focus:border-blue-500 transition-colors"
                    aria-invalid={!!validationErrors.title}
                  />
                  {validationErrors.title && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="slug"
                    className="text-black text-sm font-medium text-gray-700 mb-2 block"
                  >
                    الرابط المختصر (Slug) *
                  </Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="article-url-slug"
                    className="bg-gray-50 text-black border-gray-300 focus:border-blue-500 transition-colors font-mono"
                    dir="ltr"
                    aria-invalid={!!validationErrors.slug}
                  />
                  {validationErrors.slug && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.slug}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="excerpt"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    المقتطف *
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="وصف مختصر للمقال يظهر في قائمة المقالات"
                    className=" text-black bg-gray-50 border-gray-300 focus:border-blue-500 transition-colors min-h-[100px]"
                    aria-invalid={!!validationErrors.excerpt}
                  />
                  {validationErrors.excerpt && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.excerpt}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="content"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    محتوى المقال *
                  </Label>
                  <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                    {/* شريط الأدوات */}
                    <div className="border-b border-gray-200 p-3 bg-gray-50">
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          type="button"
                          onClick={() => applyTextFormat("bold")}
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          title="نص غامق"
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => applyTextFormat("italic")}
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          title="نص مائل"
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => applyTextFormat("underline")}
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          title="نص تحته خط"
                        >
                          <Underline className="h-4 w-4" />
                        </Button>
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>
                        <Button
                          type="button"
                          onClick={() => applyTextFormat("h1")}
                          size="sm"
                          variant="outline"
                          className="h-8 px-2"
                          title="عنوان رئيسي"
                        >
                          <Heading1 className="h-4 w-4 ml-1" />
                          H1
                        </Button>
                        <Button
                          type="button"
                          onClick={() => applyTextFormat("h2")}
                          size="sm"
                          variant="outline"
                          className="h-8 px-2"
                          title="عنوان ثانوي"
                        >
                          <Heading2 className="h-4 w-4 ml-1" />
                          H2
                        </Button>
                        <Button
                          type="button"
                          onClick={() => applyTextFormat("h3")}
                          size="sm"
                          variant="outline"
                          className="h-8 px-2"
                          title="عنوان فرعي"
                        >
                          <Heading3 className="h-4 w-4 ml-1" />
                          H3
                        </Button>
                      </div>
                    </div>

                    {/* حقل المحتوى */}
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="اكتب محتوى المقال هنا... يمكنك استخدام التنسيقات أعلاه"
                      className="text-black border-0 focus:ring-0 min-h-[400px] resize-vertical bg-white focus:bg-gray-50 transition-colors"
                      aria-invalid={!!validationErrors.content}
                    />
                  </div>
                  {validationErrors.content && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.content}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                    <span>
                      عدد الكلمات:{" "}
                      {content.trim() ? content.trim().split(/\s+/).length : 0}
                    </span>
                    <span>عدد الأحرف: {content.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  إعدادات النشر
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label
                    htmlFor="publish"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    نشر المقال
                  </Label>
                  <Switch
                    id="publish"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    الفئة *
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger
                      className="bg-gray-50 border-gray-300 text-black"
                      aria-invalid={!!validationErrors.category}
                    >
                      <SelectValue placeholder="اختر فئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="قانون عقاري">قانون عقاري</SelectItem>
                      <SelectItem value="قانون العمل">قانون العمل</SelectItem>
                      <SelectItem value="قانون تجاري">قانون تجاري</SelectItem>
                      <SelectItem value="أحوال شخصية">أحوال شخصية</SelectItem>
                      <SelectItem value="قانون جنائي">قانون جنائي</SelectItem>
                      <SelectItem value="قانون إداري">قانون إداري</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.category && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.category}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  العلامات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label
                    htmlFor="tags"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    إضافة علامة
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="أدخل علامة"
                      className="text-black bg-gray-50 border-gray-300 flex-1"
                    />
                    <Button
                      onClick={addTag}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      إضافة
                    </Button>
                  </div>
                </div>

                {tags.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      العلامات المضافة ({tags.length})
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-red-600 transition-colors"
                            aria-label={`إزالة العلامة ${tag}`}
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

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  الصورة المميزة
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
                      ) : featuredImage ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={featuredImage}
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
                        {featuredImage ? "تغيير الصورة" : "رفع صورة"}
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <Label
                    htmlFor="featured-image-url"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    أو أدخل رابط الصورة
                  </Label>
                  <Input
                    id="featured-image-url"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="text-black bg-gray-50 border-gray-300"
                  />
                </div>

                {featuredImage && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFeaturedImage("")}
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                  >
                    <X className="h-4 w-4 ml-2" />
                    إزالة الصورة
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
