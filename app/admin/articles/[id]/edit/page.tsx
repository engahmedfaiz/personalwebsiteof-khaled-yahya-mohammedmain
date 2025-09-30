// "use client";

// import type React from "react";
// import { useState, useCallback, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Badge } from "@/components/ui/badge";
// import {
//   ArrowRight,
//   Save,
//   Eye,
//   Upload,
//   X,
//   AlertCircle,
//   CheckCircle,
//   Image as ImageIcon,
//   Loader2,
//   Calendar,
//   User,
//   Tag,
// } from "lucide-react";
// import Link from "next/link";
// import { generateSlug } from "@/lib/generateSlug";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useUploadThing } from "@/lib/uploadthing";
// import { Badge as UiBadge } from "@/components/ui/badge";

// interface Article {
//   id: string;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   category: string;
//   tags: string[];
//   featuredImage: string;
//   isPublished: boolean;
//   publishedAt?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ValidationErrors {
//   title?: string;
//   slug?: string;
//   excerpt?: string;
//   content?: string;
//   category?: string;
//   featuredImage?: string;
// }

// const showToast = (message: string, type: "success" | "error" = "success") => {
//   console[type === "success" ? "log" : "error"](message);
// };

// export default function EditArticlePage() {
//   const router = useRouter();
//   const params = useParams();
//   const articleId = params.id as string;

//   const [article, setArticle] = useState<Article | null>(null);
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [excerpt, setExcerpt] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("");
//   const [tags, setTags] = useState<string[]>([]);
//   const [tagInput, setTagInput] = useState("");
//   const [isPublished, setIsPublished] = useState(false);
//   const [featuredImage, setFeaturedImage] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
//     {}
//   );
//   const [saveStatus, setSaveStatus] = useState<
//     "idle" | "saving" | "success" | "error"
//   >("idle");
//   const [isUploading, setIsUploading] = useState(false);

//   // UploadThings hook
//   const { startUpload } = useUploadThing("articleImage", {
//     onClientUploadComplete: (res) => {
//       if (res && res[0]?.url) {
//         setFeaturedImage(res[0].url);
//         showToast("تم رفع الصورة بنجاح", "success");
//       }
//       setIsUploading(false);
//     },
//     onUploadError: (error) => {
//       console.error("Upload error:", error);
//       showToast("فشل في رفع الصورة", "error");
//       setIsUploading(false);
//     },
//   });

//   // جلب بيانات المقال
//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const res = await fetch(`/api/articles/${articleId}`);
//         if (!res.ok) throw new Error("فشل في تحميل المقال");

//         const articleData = await res.json();
//         setArticle(articleData);

//         // تعبئة الحقول بالبيانات
//         setTitle(articleData.title);
//         setSlug(articleData.slug);
//         setExcerpt(articleData.excerpt);
//         setContent(articleData.content);
//         setCategory(articleData.category);
//         setTags(articleData.tags || []);
//         setIsPublished(articleData.isPublished);
//         setFeaturedImage(articleData.featuredImage || "");
//       } catch (error) {
//         console.error("Error fetching article:", error);
//         showToast("فشل في تحميل المقال", "error");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (articleId) {
//       fetchArticle();
//     }
//   }, [articleId]);

//   // توليد slug عند تغيير العنوان
//   const handleTitleChange = useCallback(
//     (value: string) => {
//       setTitle(value);

//       if (!slug || slug === generateSlug(title)) {
//         const newSlug = generateSlug(value);
//         setSlug(newSlug);
//       }
//     },
//     [slug, title]
//   );

//   // التحقق من صحة البيانات
//   const validateForm = useCallback((): boolean => {
//     const errors: ValidationErrors = {};

//     if (!title.trim()) {
//       errors.title = "العنوان مطلوب";
//     } else if (title.trim().length < 5) {
//       errors.title = "العنوان يجب أن يكون على الأقل 5 أحرف";
//     }

//     if (!slug.trim()) {
//       errors.slug = "الرابط المختصر مطلوب";
//     } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
//       errors.slug =
//         "الرابط المختصر يجب أن يحتوي على أحرف لاتينية صغيرة وأرقام وشرطات فقط";
//     }

//     if (!excerpt.trim()) {
//       errors.excerpt = "المقتطف مطلوب";
//     } else if (excerpt.trim().length < 10) {
//       errors.excerpt = "المقتطف يجب أن يكون على الأقل 10 أحرف";
//     }

//     if (!content.trim()) {
//       errors.content = "محتوى المقال مطلوب";
//     } else if (content.trim().length < 50) {
//       errors.content = "محتوى المقال يجب أن يكون على الأقل 50 حرفًا";
//     }

//     if (!category) {
//       errors.category = "الفئة مطلوبة";
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   }, [title, slug, excerpt, content, category]);

//   // معالجة رفع الصورة
//   const handleImageUpload = async (files: FileList | null) => {
//     if (!files || files.length === 0) return;

//     const file = files[0];

//     if (!file.type.startsWith("image/")) {
//       showToast("الملف يجب أن يكون صورة", "error");
//       return;
//     }

//     if (file.size > 4 * 1024 * 1024) {
//       showToast("حجم الصورة يجب أن لا يتجاوز 4MB", "error");
//       return;
//     }

//     setIsUploading(true);

//     try {
//       await startUpload([file]);
//     } catch (error) {
//       console.error("Upload error:", error);
//       showToast("فشل في رفع الصورة", "error");
//       setIsUploading(false);
//     }
//   };

//   // إضافة علامة
//   const addTag = useCallback(() => {
//     const trimmedTag = tagInput.trim();
//     if (trimmedTag && !tags.includes(trimmedTag)) {
//       const newTags = [...tags, trimmedTag];
//       setTags(newTags);
//       setTagInput("");
//     }
//   }, [tagInput, tags]);

//   // إزالة علامة
//   const removeTag = useCallback(
//     (tagToRemove: string) => {
//       setTags(tags.filter((tag) => tag !== tagToRemove));
//     },
//     [tags]
//   );

//   // معالجة الضغط على مفتاح Enter
//   const handleKeyPress = useCallback(
//     (e: React.KeyboardEvent) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         addTag();
//       }
//     },
//     [addTag]
//   );

//   // حفظ التعديلات
//   const handleSave = async (publish = false) => {
//     if (!validateForm()) {
//       showToast("يرجى تصحيح الأخطاء في النموذج قبل المتابعة", "error");
//       return;
//     }

//     setIsSaving(true);
//     setSaveStatus("saving");

//     try {
//       const articleData = {
//         title,
//         slug,
//         excerpt,
//         content,
//         category,
//         tags,
//         featuredImage,
//         isPublished: publish,
//         publishedAt:
//           publish && !article?.publishedAt
//             ? new Date().toISOString()
//             : article?.publishedAt,
//       };

//       const res = await fetch(`/api/articles/${articleId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(articleData),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();

//         if (res.status === 409) {
//           setValidationErrors((prev) => ({
//             ...prev,
//             slug: "الرابط المختصر موجود مسبقًا، يرجى اختيار رابط آخر",
//           }));
//           throw new Error("الرابط المختصر موجود مسبقًا");
//         }

//         throw new Error(errorData.error || "فشل في تحديث المقال");
//       }

//       const updatedArticle = await res.json();
//       console.log("Article updated:", updatedArticle);

//       setSaveStatus("success");
//       showToast(
//         publish ? "تم تحديث ونشر المقال بنجاح" : "تم حفظ التعديلات بنجاح",
//         "success"
//       );

//       setTimeout(() => {
//         router.push("/admin/articles");
//       }, 2000);
//     } catch (error) {
//       console.error("Error updating article:", error);
//       setSaveStatus("error");

//       if (error instanceof Error) {
//         showToast(error.message, "error");
//       } else {
//         showToast("حدث خطأ أثناء تحديث المقال", "error");
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // معاينة المقال
//   const handlePreview = () => {
//     if (!validateForm()) {
//       showToast("يرجى ملء الحقول المطلوبة قبل المعاينة", "error");
//       return;
//     }

//     sessionStorage.setItem(
//       "articlePreview",
//       JSON.stringify({
//         title,
//         excerpt,
//         content,
//         category,
//         tags,
//         featuredImage,
//       })
//     );

//     window.open(`/admin/articles/preview?slug=${slug}`, "_blank");
//   };

//   // حذف المقال
//   const handleDelete = async () => {
//     if (
//       !confirm(
//         "هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء."
//       )
//     ) {
//       return;
//     }

//     try {
//       const res = await fetch(`/api/articles/${articleId}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         throw new Error("فشل في حذف المقال");
//       }

//       showToast("تم حذف المقال بنجاح", "success");
//       router.push("/admin/articles");
//     } catch (error) {
//       console.error("Error deleting article:", error);
//       showToast("فشل في حذف المقال", "error");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
//           <p>جاري تحميل المقال...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!article) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-600" />
//           <h2 className="text-xl font-bold mb-2">المقال غير موجود</h2>
//           <p className="text-gray-600 mb-4">لم يتم العثور على المقال المطلوب</p>
//           <Link
//             href="/admin/articles"
//             className="text-indigo-600 hover:underline"
//           >
//             العودة إلى قائمة المقالات
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div className="space-y-2">
//           <div className="flex items-center gap-2 text-sm text-slate-600">
//             <Link
//               href="/admin/articles"
//               className="hover:text-indigo-600 transition-colors"
//             >
//               المقالات
//             </Link>
//             <ArrowRight className="h-4 w-4" />
//             <span>تعديل المقال</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <h1 className="text-3xl font-bold text-slate-800">تعديل المقال</h1>
//             <UiBadge variant={article.isPublished ? "default" : "secondary"}>
//               {article.isPublished ? "منشور" : "مسودة"}
//             </UiBadge>
//           </div>

//           {/* معلومات المقال */}
//           <div className="flex items-center gap-4 text-sm text-slate-600">
//             <div className="flex items-center gap-1">
//               <Calendar className="h-4 w-4" />
//               <span>
//                 أنشئ في:{" "}
//                 {new Date(article.createdAt).toLocaleDateString("ar-SA")}
//               </span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Tag className="h-4 w-4" />
//               <span>
//                 آخر تعديل:{" "}
//                 {new Date(article.updatedAt).toLocaleDateString("ar-SA")}
//               </span>
//             </div>
//             {article.publishedAt && (
//               <div className="flex items-center gap-1">
//                 <Eye className="h-4 w-4" />
//                 <span>
//                   نشر في:{" "}
//                   {new Date(article.publishedAt).toLocaleDateString("ar-SA")}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <Button variant="outline" onClick={handlePreview} disabled={isSaving}>
//             <Eye className="h-4 w-4 mr-2" />
//             معاينة
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => handleSave(false)}
//             disabled={isSaving}
//           >
//             <Save className="h-4 w-4 mr-2" />
//             حفظ التعديلات
//           </Button>
//           <Button
//             onClick={() => handleSave(true)}
//             disabled={isSaving}
//             className="bg-indigo-600 hover:bg-indigo-700"
//           >
//             <Eye className="h-4 w-4 mr-2" />
//             {article.isPublished ? "تحديث النشر" : "نشر المقال"}
//           </Button>
//           <Button
//             variant="destructive"
//             onClick={handleDelete}
//             disabled={isSaving}
//           >
//             <X className="h-4 w-4 mr-2" />
//             حذف
//           </Button>
//         </div>
//       </div>

//       {/* حالة الحفظ */}
//       {saveStatus !== "idle" && (
//         <Alert
//           className={
//             saveStatus === "error"
//               ? "bg-red-50 border-red-200"
//               : "bg-green-50 border-green-200"
//           }
//         >
//           {saveStatus === "saving" ? (
//             <div className="flex items-center">
//               <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//               <span>جاري حفظ التعديلات...</span>
//             </div>
//           ) : saveStatus === "success" ? (
//             <div className="flex items-center">
//               <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
//               <AlertDescription>
//                 {isPublished
//                   ? "تم تحديث ونشر المقال بنجاح!"
//                   : "تم حفظ التعديلات بنجاح!"}
//               </AlertDescription>
//             </div>
//           ) : (
//             <div className="flex items-center">
//               <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
//               <AlertDescription>
//                 حدث خطأ أثناء الحفظ، يرجى المحاولة مرة أخرى
//               </AlertDescription>
//             </div>
//           )}
//         </Alert>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>محتوى المقال</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label htmlFor="title">عنوان المقال *</Label>
//                 <Input
//                   id="title"
//                   value={title}
//                   onChange={(e) => handleTitleChange(e.target.value)}
//                   placeholder="أدخل عنوان المقال"
//                   className="mt-1"
//                   aria-invalid={!!validationErrors.title}
//                 />
//                 {validationErrors.title && (
//                   <p className="text-red-600 text-sm mt-1 flex items-center">
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     {validationErrors.title}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="slug">الرابط المختصر (Slug) *</Label>
//                 <Input
//                   id="slug"
//                   value={slug}
//                   onChange={(e) => setSlug(e.target.value)}
//                   placeholder="article-url-slug"
//                   className="mt-1"
//                   dir="ltr"
//                   aria-invalid={!!validationErrors.slug}
//                 />
//                 {validationErrors.slug && (
//                   <p className="text-red-600 text-sm mt-1 flex items-center">
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     {validationErrors.slug}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="excerpt">المقتطف *</Label>
//                 <Textarea
//                   id="excerpt"
//                   value={excerpt}
//                   onChange={(e) => setExcerpt(e.target.value)}
//                   placeholder="وصف مختصر للمقال يظهر في قائمة المقالات"
//                   className="mt-1"
//                   rows={3}
//                   aria-invalid={!!validationErrors.excerpt}
//                 />
//                 {validationErrors.excerpt && (
//                   <p className="text-red-600 text-sm mt-1 flex items-center">
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     {validationErrors.excerpt}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="content">محتوى المقال *</Label>
//                 <div className="mt-1 border rounded-lg">
//                   <div className="border-b p-2 bg-slate-50">
//                     <div className="flex items-center gap-2">
//                       <Button variant="ghost" size="sm" type="button">
//                         <strong>B</strong>
//                       </Button>
//                       <Button variant="ghost" size="sm" type="button">
//                         <em>I</em>
//                       </Button>
//                       <Button variant="ghost" size="sm" type="button">
//                         <u>U</u>
//                       </Button>
//                       <div className="w-px h-6 bg-slate-300"></div>
//                       <Button variant="ghost" size="sm" type="button">
//                         H1
//                       </Button>
//                       <Button variant="ghost" size="sm" type="button">
//                         H2
//                       </Button>
//                       <Button variant="ghost" size="sm" type="button">
//                         H3
//                       </Button>
//                     </div>
//                   </div>
//                   <Textarea
//                     id="content"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     placeholder="اكتب محتوى المقال هنا..."
//                     className="border-0 focus-visible:ring-0 min-h-[400px] resize-vertical"
//                     aria-invalid={!!validationErrors.content}
//                   />
//                 </div>
//                 {validationErrors.content && (
//                   <p className="text-red-600 text-sm mt-1 flex items-center">
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     {validationErrors.content}
//                   </p>
//                 )}
//                 <p className="text-sm text-slate-500 mt-1">
//                   عدد الكلمات:{" "}
//                   {content.trim() ? content.trim().split(/\s+/).length : 0}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* إحصائيات سريعة */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg">إحصائيات المقال</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-sm text-slate-600">عدد الكلمات:</span>
//                 <span className="font-medium">
//                   {content.trim() ? content.trim().split(/\s+/).length : 0}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-sm text-slate-600">عدد العلامات:</span>
//                 <span className="font-medium">{tags.length}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-sm text-slate-600">الحالة:</span>
//                 <UiBadge variant={isPublished ? "default" : "secondary"}>
//                   {isPublished ? "منشور" : "مسودة"}
//                 </UiBadge>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg">إعدادات النشر</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="publish">نشر المقال</Label>
//                 <Switch
//                   id="publish"
//                   checked={isPublished}
//                   onCheckedChange={setIsPublished}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="category">الفئة *</Label>
//                 <Select value={category} onValueChange={setCategory}>
//                   <SelectTrigger
//                     className="mt-1"
//                     aria-invalid={!!validationErrors.category}
//                   >
//                     <SelectValue placeholder="اختر فئة" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="قانون عقاري">قانون عقاري</SelectItem>
//                     <SelectItem value="قانون العمل">قانون العمل</SelectItem>
//                     <SelectItem value="قانون تجاري">قانون تجاري</SelectItem>
//                     <SelectItem value="أحوال شخصية">أحوال شخصية</SelectItem>
//                     <SelectItem value="قانون جنائي">قانون جنائي</SelectItem>
//                     <SelectItem value="قانون إداري">قانون إداري</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {validationErrors.category && (
//                   <p className="text-red-600 text-sm mt-1 flex items-center">
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     {validationErrors.category}
//                   </p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg">العلامات</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label htmlFor="tags">إضافة علامة</Label>
//                 <div className="flex gap-2 mt-1">
//                   <Input
//                     id="tags"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="أدخل علامة"
//                   />
//                   <Button onClick={addTag} size="sm">
//                     إضافة
//                   </Button>
//                 </div>
//               </div>

//               {tags.length > 0 && (
//                 <div>
//                   <Label>العلامات المضافة ({tags.length})</Label>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {tags.map((tag, index) => (
//                       <Badge
//                         key={index}
//                         variant="secondary"
//                         className="flex items-center gap-1"
//                       >
//                         {tag}
//                         <button
//                           type="button"
//                           onClick={() => removeTag(tag)}
//                           className="ml-1 hover:text-red-600 transition-colors"
//                           aria-label={`إزالة العلامة ${tag}`}
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg">الصورة المميزة</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex flex-col gap-2">
//                 <Label htmlFor="image-upload" className="cursor-pointer">
//                   <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
//                     {isUploading ? (
//                       <div className="flex flex-col items-center gap-2">
//                         <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//                         <span className="text-sm text-slate-600">
//                           جاري رفع الصورة...
//                         </span>
//                       </div>
//                     ) : featuredImage ? (
//                       <div className="flex flex-col items-center gap-2">
//                         <img
//                           src={featuredImage}
//                           alt="معاينة الصورة"
//                           className="h-20 w-20 object-cover rounded"
//                         />
//                         <span className="text-sm text-slate-600">
//                           انقر لتغيير الصورة
//                         </span>
//                       </div>
//                     ) : (
//                       <div className="flex flex-col items-center gap-2">
//                         <ImageIcon className="h-8 w-8 text-slate-400" />
//                         <span className="text-sm text-slate-600">
//                           انقر لرفع صورة
//                         </span>
//                         <span className="text-xs text-slate-500">
//                           PNG, JPG, GIF up to 4MB
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </Label>
//                 <Input
//                   id="image-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e.target.files)}
//                   className="hidden"
//                   disabled={isUploading}
//                 />

//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() =>
//                     document.getElementById("image-upload")?.click()
//                   }
//                   disabled={isUploading}
//                   className="w-full"
//                 >
//                   {isUploading ? (
//                     <>
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       جاري الرفع...
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="h-4 w-4 mr-2" />
//                       {featuredImage ? "تغيير الصورة" : "رفع صورة"}
//                     </>
//                   )}
//                 </Button>
//               </div>

//               <div>
//                 <Label htmlFor="featured-image-url">أو أدخل رابط الصورة</Label>
//                 <Input
//                   id="featured-image-url"
//                   value={featuredImage}
//                   onChange={(e) => setFeaturedImage(e.target.value)}
//                   placeholder="https://example.com/image.jpg"
//                   className="mt-1"
//                 />
//               </div>

//               {featuredImage && (
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setFeaturedImage("")}
//                   className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
//                 >
//                   <X className="h-4 w-4 mr-2" />
//                   إزالة الصورة
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
  Calendar,
  User,
  Tag,
  Trash2,
  Edit,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { generateSlug } from "@/lib/generateSlug";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUploadThing } from "@/lib/uploadthing";

export const dynamic = "force-dynamic";

interface ArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
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

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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

  // جلب بيانات المقال
  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;

      try {
        setIsLoading(true);
        const res = await fetch(`/api/articles/${articleId}`);

        if (!res.ok) {
          if (res.status === 404) {
            showToast("المقال غير موجود", "error");
            return;
          }
          throw new Error("فشل في تحميل المقال");
        }

        const articleData = await res.json();
        setArticle(articleData);

        // تعبئة الحقول بالبيانات
        setTitle(articleData.title || "");
        setSlug(articleData.slug || "");
        setExcerpt(articleData.excerpt || "");
        setContent(articleData.content || "");
        setCategory(articleData.category || "");
        setTags(articleData.tags || []);
        setIsPublished(articleData.isPublished || false);
        setFeaturedImage(articleData.featuredImage || "");
      } catch (error) {
        console.error("Error fetching article:", error);
        showToast("فشل في تحميل المقال", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  // توليد slug عند تغيير العنوان
  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);

      if (!slug || slug === generateSlug(title)) {
        const newSlug = generateSlug(value);
        setSlug(newSlug);
      }
    },
    [slug, title]
  );

  // التحقق من صحة البيانات
  const validateForm = useCallback((): boolean => {
    const errors: ValidationErrors = {};

    if (!title.trim()) {
      errors.title = "العنوان مطلوب";
    } else if (title.trim().length < 5) {
      errors.title = "العنوان يجب أن يكون على الأقل 5 أحرف";
    }

    if (!slug.trim()) {
      errors.slug = "الرابط المختصر مطلوب";
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
  }, [title, slug, excerpt, content, category]);

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
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
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

  // حفظ التعديلات
  const handleSave = async (publish = false) => {
    if (!validateForm()) {
      showToast("يرجى تصحيح الأخطاء في النموذج قبل المتابعة", "error");
      return;
    }

    setIsSaving(true);
    setSaveStatus("saving");

    try {
      const articleData = {
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        featuredImage,
        isPublished: publish,
        publishedAt:
          publish && !article?.publishedAt
            ? new Date().toISOString()
            : article?.publishedAt,
      };

      const res = await fetch(`/api/articles/${articleId}`, {
        method: "PUT",
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

        throw new Error(errorData.error || "فشل في تحديث المقال");
      }

      const updatedArticle = await res.json();
      console.log("Article updated:", updatedArticle);

      setSaveStatus("success");
      showToast(
        publish ? "تم تحديث ونشر المقال بنجاح" : "تم حفظ التعديلات بنجاح",
        "success"
      );

      setTimeout(() => {
        router.push("/admin/articles");
      }, 2000);
    } catch (error) {
      console.error("Error updating article:", error);
      setSaveStatus("error");

      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("حدث خطأ أثناء تحديث المقال", "error");
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
        isPublished,
        slug,
      })
    );

    window.open(`/admin/articles/preview?slug=${slug}`, "_blank");
  };

  // حذف المقال
  const handleDelete = async () => {
    if (
      !confirm(
        "هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/articles/${articleId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("فشل في حذف المقال");
      }

      showToast("تم حذف المقال بنجاح", "success");
      router.push("/admin/articles");
    } catch (error) {
      console.error("Error deleting article:", error);
      showToast("فشل في حذف المقال", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-700">جاري تحميل المقال...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">المقال غير موجود</h2>
          <p className="text-gray-600 mb-4">لم يتم العثور على المقال المطلوب</p>
          <Link
            href="/admin/articles"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            العودة إلى قائمة المقالات
          </Link>
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
                <Link href="/admin" className="hover:text-blue-600 transition-colors">لوحة التحكم</Link>
                <ArrowRight className="h-4 w-4" />
                <Link href="/admin/articles" className="hover:text-blue-600 transition-colors">إدارة المقالات</Link>
                <ArrowRight className="h-4 w-4" />
                <span className="text-blue-600 font-bold">تعديل المقال</span>
              </div>
              <div className="flex items-center gap-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Edit className="h-8 w-8 text-blue-600" />
                  تعديل المقال
                </h1>
                <Badge variant={article.isPublished ? "default" : "secondary"} className="text-sm">
                  {article.isPublished ? "منشور" : "مسودة"}
                </Badge>
              </div>

              {/* معلومات المقال */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    أنشئ في: {new Date(article.createdAt).toLocaleDateString("ar-SA")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>
                    آخر تعديل: {new Date(article.updatedAt).toLocaleDateString("ar-SA")}
                  </span>
                </div>
                {article.publishedAt && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>
                      نشر في: {new Date(article.publishedAt).toLocaleDateString("ar-SA")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                variant="outline"
                onClick={handlePreview}
                disabled={isSaving}
                className="bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Eye className="h-4 w-4 ml-2" />
                معاينة
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ التعديلات
              </Button>
              <Button
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Eye className="h-4 w-4 ml-2" />
                {article.isPublished ? "تحديث النشر" : "نشر المقال"}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isSaving}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="h-4 w-4 ml-2" />
                حذف
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* حالة الحفظ */}
        {saveStatus !== "idle" && (
          <Alert className={`mb-6 ${
            saveStatus === "error" 
              ? "bg-red-50 border-red-200 text-red-800" 
              : saveStatus === "success" 
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}>
            {saveStatus === "saving" ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>جاري حفظ التعديلات...</span>
              </div>
            ) : saveStatus === "success" ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  {isPublished ? "تم تحديث ونشر المقال بنجاح!" : "تم حفظ التعديلات بنجاح!"}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  محتوى المقال
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
                    عنوان المقال *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="أدخل عنوان المقال"
                    className="bg-gray-50 border-gray-300 focus:border-blue-500 transition-colors"
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
                  <Label htmlFor="slug" className="text-sm font-medium text-gray-700 mb-2 block">
                    الرابط المختصر (Slug) *
                  </Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="article-url-slug"
                    className="bg-gray-50 border-gray-300 focus:border-blue-500 transition-colors font-mono"
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
                  <Label htmlFor="excerpt" className="text-sm font-medium text-gray-700 mb-2 block">
                    المقتطف *
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="وصف مختصر للمقال يظهر في قائمة المقالات"
                    className="bg-gray-50 border-gray-300 focus:border-blue-500 transition-colors min-h-[100px]"
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
                  <Label htmlFor="content" className="text-sm font-medium text-gray-700 mb-2 block">
                    محتوى المقال *
                  </Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="اكتب محتوى المقال هنا..."
                    className="bg-gray-50 border-gray-300 focus:border-blue-500 transition-colors min-h-[400px]"
                    aria-invalid={!!validationErrors.content}
                  />
                  {validationErrors.content && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.content}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    عدد الكلمات: {content.trim() ? content.trim().split(/\s+/).length : 0}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* إحصائيات سريعة */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  إحصائيات المقال
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">عدد الكلمات:</span>
                  <span className="font-medium text-gray-900">
                    {content.trim() ? content.trim().split(/\s+/).length : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">عدد العلامات:</span>
                  <span className="font-medium text-gray-900">{tags.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">الحالة:</span>
                  <Badge variant={isPublished ? "default" : "secondary"}>
                    {isPublished ? "منشور" : "مسودة"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="text-lg text-gray-900">
                  إعدادات النشر
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label htmlFor="publish" className="text-sm font-medium text-gray-700 cursor-pointer">
                    نشر المقال
                  </Label>
                  <Switch
                    id="publish"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2 block">
                    الفئة *
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger 
                      className="bg-gray-50 border-gray-300"
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
                  <Label htmlFor="tags" className="text-sm font-medium text-gray-700 mb-2 block">
                    إضافة علامة
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="أدخل علامة"
                      className="bg-gray-50 border-gray-300 flex-1"
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
                          <span className="text-sm text-gray-600">جاري رفع الصورة...</span>
                        </div>
                      ) : featuredImage ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={featuredImage}
                            alt="معاينة الصورة"
                            className="h-20 w-20 object-cover rounded-lg border border-gray-300"
                          />
                          <span className="text-sm text-gray-600">انقر لتغيير الصورة</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-600">انقر لرفع صورة</span>
                          <span className="text-xs text-gray-500">PNG, JPG, GIF up to 4MB</span>
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
                    variant="outline"
                    onClick={() => document.getElementById("image-upload")?.click()}
                    disabled={isUploading}
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
                  <Label htmlFor="featured-image-url" className="text-sm font-medium text-gray-700 mb-2 block">
                    أو أدخل رابط الصورة
                  </Label>
                  <Input
                    id="featured-image-url"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="bg-gray-50 border-gray-300"
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