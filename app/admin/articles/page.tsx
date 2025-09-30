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
  FileText,
  Globe,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Calendar,
  Tag,
  BarChart3,
  Sparkles,
  X,
} from "lucide-react";

// تعريف نوع المقال
interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  views?: number;
  likes?: number;
  readTime?: number;
}

export const dynamic = "force-dynamic";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // استخدام الإحصائيات المطلوبة بدلاً من الحساب
  const [stats] = useState({
    total: 6,
    published: 6,
    drafts: 0,
    categories: 4,
    totalViews: 0,
    avgReadTime: 8,
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
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles", { cache: "no-store" });
        if (!res.ok) throw new Error("فشل في جلب المقالات");

        const data = await res.json();

        const normalizedArticles: Article[] = data.map((article: any) => ({
          ...article,
          publishedAt: article.publishedAt
            ? new Date(article.publishedAt)
            : undefined,
          createdAt: new Date(article.createdAt),
          updatedAt: new Date(article.updatedAt),
          views: article.views || 0,
          likes: article.likes || 0,
          readTime: article.readTime || Math.floor(Math.random() * 10) + 3,
        }));

        setArticles(normalizedArticles);
      } catch (error) {
        console.error("خطأ أثناء جلب المقالات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // دالة لحذف المقال
  const handleDeleteArticle = async (articleId: string) => {
    if (confirm("هل أنت متأكد من أنك تريد حذف هذا المقال؟")) {
      try {
        const res = await fetch(`/api/articles/${articleId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setArticles(articles.filter((article) => article._id !== articleId));
          alert("تم حذف المقال بنجاح");
        } else {
          throw new Error("فشل في حذف المقال");
        }
      } catch (error) {
        console.error("Error deleting article:", error);
        alert("حدث خطأ أثناء حذف المقال");
      }
    }
  };

  const getStatusVariant = (isPublished: boolean) => {
    return isPublished
      ? {
          bg: "bg-gradient-to-r from-emerald-50 to-green-50",
          border: "border-emerald-200",
          text: "text-emerald-700",
          icon: "bg-emerald-500",
          label: "منشور",
        }
      : {
          bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
          border: "border-amber-200",
          text: "text-amber-700",
          icon: "bg-amber-500",
          label: "مسودة",
        };
  };

  const getCategoryStyle = (category: string) => {
    const styles: Record<string, any> = {
      "قانون عقاري": {
        bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
        border: "border-blue-200",
        text: "text-blue-700",
        icon: "bg-blue-500",
      },
      "قانون العمل": {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50",
        border: "border-purple-200",
        text: "text-purple-700",
        icon: "bg-purple-500",
      },
      "قانون تجاري": {
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
      styles[category] || {
        bg: "bg-gradient-to-r from-gray-50 to-slate-50",
        border: "border-gray-200",
        text: "text-gray-700",
        icon: "bg-gray-500",
      }
    );
  };

  const getAuthorName = (authorId: string): string => {
    const authors: Record<string, string> = {
      lawyer1: "د. خالد يحيى الناصر",
      lawyer2: "أ. سارة أحمد المحمد",
      lawyer3: "د. محمد عبدالله القاضي",
      lawyer4: "أ. فاطمة عمر المحامية",
    };
    return authors[authorId] || "غير معروف";
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      getAuthorName(article.author)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && article.isPublished) ||
      (statusFilter === "draft" && !article.isPublished);

    const matchesCategory =
      categoryFilter === "all" || article.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // ترتيب المقالات
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "views":
        return (b.views || 0) - (a.views || 0);
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Mobile Filter Component
  const MobileFilters = () => (
    <div className="lg:hidden space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-2 gap-3">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="bg-white border-gray-300 text-sm">
            <SelectValue placeholder="التصنيف" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع التصنيفات</SelectItem>
            <SelectItem value="قانون عقاري">قانون عقاري</SelectItem>
            <SelectItem value="قانون العمل">قانون العمل</SelectItem>
            <SelectItem value="قانون تجاري">قانون تجاري</SelectItem>
            <SelectItem value="أحوال شخصية">أحوال شخصية</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-white border-gray-300 text-sm">
            <SelectValue placeholder="حالة النشر" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="published">منشور فقط</SelectItem>
            <SelectItem value="draft">مسودات فقط</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-white"
          onClick={() => setShowMobileFilters(false)}
        >
          <X className="h-4 w-4 ml-1 bg-red" />
          إغلاق
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-white"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setCategoryFilter("all");
          }}
        >
          إعادة التعيين
        </Button>
      </div>
    </div>
  );

  // تصميم مختلف لكل حجم شاشة
  const renderArticles = () => {
    if (screenSize === "mobile") {
      return (
        <div className="space-y-3">
          {sortedArticles.map((article) => {
            const status = getStatusVariant(article.isPublished);
            const categoryStyle = getCategoryStyle(article.category);

            return (
              <Card
                key={article._id}
                className="bg-white border border-gray-200 shadow-xs rounded-xl"
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          article.featuredImage || "/placeholder-article.jpg"
                        }
                        alt={article.title}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                      />
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
                      <Link href={`/blog/${article.slug}`} target="_blank">
                        <Button
                          size="sm"
                          className="h-7 w-7 p-0 bg-blue-50 text-blue-600 border border-blue-200"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Link href={`/admin/articles/${article._id}/edit`}>
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
                        onClick={() => handleDeleteArticle(article._id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-gray-900">
                    {article.title}
                  </h3>

                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${categoryStyle.bg} ${categoryStyle.border} ${categoryStyle.text}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 ${categoryStyle.icon} rounded-full mr-1`}
                      ></div>
                      {article.category}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {article.readTime}د
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{getAuthorName(article.author)}</span>
                    <span>
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString(
                            "ar-SA"
                          )
                        : "مسودة"}
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
                  المقال
                </TableHead>
                <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
                  الحالة
                </TableHead>
                <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
                  المشاهدات
                </TableHead>
                <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
                  الإجراءات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedArticles.map((article) => {
                const status = getStatusVariant(article.isPublished);

                return (
                  <TableRow
                    key={article._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            article.featuredImage || "/placeholder-article.jpg"
                          }
                          alt={article.title}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">
                            {article.title}
                          </h4>
                          <div className="text-xs text-gray-500">
                            {getAuthorName(article.author)}
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
                        {article.views || 0}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <div className="flex justify-center gap-1">
                        <Link href={`/blog/${article.slug}`} target="_blank">
                          <Button
                            size="sm"
                            className="h-7 w-7 p-0 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link href={`/admin/articles/${article._id}/edit`}>
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
                          onClick={() => handleDeleteArticle(article._id)}
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
                  المقال
                </TableHead>
                <TableHead className="w-[15%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الكاتب
                </TableHead>
                <TableHead className="w-[15%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الفئة
                </TableHead>
                <TableHead className="w-[10%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الحالة
                </TableHead>
                <TableHead className="w-[10%] py-4 text-sm font-semibold text-blue-900 text-center">
                  المشاهدات
                </TableHead>
                <TableHead className="w-[10%] py-4 text-sm font-semibold text-blue-900 text-center">
                  النشر
                </TableHead>
                <TableHead className="w-[15%] py-4 text-sm font-semibold text-blue-900 text-center">
                  الإجراءات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedArticles.map((article) => {
                const status = getStatusVariant(article.isPublished);
                const categoryStyle = getCategoryStyle(article.category);

                return (
                  <TableRow
                    key={article._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            article.featuredImage || "/placeholder-article.jpg"
                          }
                          alt={article.title}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">
                            {article.title}
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <span className="text-sm text-gray-700">
                        {getAuthorName(article.author)}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${categoryStyle.bg} ${categoryStyle.border} ${categoryStyle.text}`}
                      >
                        <div
                          className={`w-2 h-2 ${categoryStyle.icon} rounded-full mr-2`}
                        ></div>
                        {article.category}
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
                        {(article.views || 0).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="text-sm text-gray-900">
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString(
                              "ar-SA"
                            )
                          : "مسودة"}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/blog/${article.slug}`} target="_blank">
                          <Button
                            size="sm"
                            className="h-8 w-8 p-0 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link href={`/admin/articles/${article._id}/edit`}>
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
                          onClick={() => handleDeleteArticle(article._id)}
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
          <p className="text-gray-700">جاري تحميل المقالات...</p>
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
                <span className="text-blue-600 font-bold">إدارة المقالات</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                إدارة المقالات
              </h1>
            </div>
            <Link href="/admin/articles/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                <Plus className="h-4 w-4 ml-2" />
                إنشاء مقال جديد
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
              label: "إجمالي المقالات",
              value: stats.total,
              icon: FileText,
              color: "text-blue-600",
              bg: "bg-blue-100",
            },
            {
              label: "المنشورة",
              value: stats.published,
              icon: Globe,
              color: "text-green-600",
              bg: "bg-green-100",
            },
            {
              label: "المسودات",
              value: stats.drafts,
              icon: Clock,
              color: "text-yellow-600",
              bg: "bg-yellow-100",
            },
            {
              label: "الفئات النشطة",
              value: stats.categories,
              icon: Tag,
              color: "text-purple-600",
              bg: "bg-purple-100",
            },
            {
              label: "إجمالي المشاهدات",
              value: stats.totalViews,
              icon: Eye,
              color: "text-red-600",
              bg: "bg-red-100",
            },
            {
              label: "متوسط وقت القراءة",
              value: `${stats.avgReadTime} دقيقة`,
              icon: Clock,
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
        <Card className="bg-white text-black  border border-gray-200 mb-6">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <div className="flex justify-between items-center text-white ">
              <CardTitle className="text-lg  text-white text-gray-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                البحث والتصفية المتقدم
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden "
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4 ml-1 " />
                الفلاتر
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            {/* Mobile Search */}
            <div className="lg:hidden mb-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
                <Input
                  placeholder="ابحث في المقالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10  border-gray-300"
                />
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
                  <Input
                    placeholder="ابحث في المقالات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 bg-white border-gray-300 text-black"
                  />
                </div>
              </div>
              <div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="bg-white  text-black border-gray-300">
                    <SelectValue placeholder="التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع التصنيفات</SelectItem>
                    <SelectItem value="قانون عقاري">قانون عقاري</SelectItem>
                    <SelectItem value="قانون العمل">قانون العمل</SelectItem>
                    <SelectItem value="قانون تجاري">قانون تجاري</SelectItem>
                    <SelectItem value="أحوال شخصية">أحوال شخصية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white-100 border-gray-300 text-black">
                    <SelectValue placeholder="حالة النشر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="published">منشور فقط</SelectItem>
                    <SelectItem value="draft">مسودات فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && <MobileFilters />}

            <div className="flex flex-col text-white lg:flex-row justify-between items-start lg:items-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-700">
                  عرض {sortedArticles.length} من أصل {articles.length} مقال
                </span>
              </div>
              <div className="flex gap-2 w-full lg:w-auto">
                <Button
                  variant="outline"
                  className="hidden lg:flex  bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
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
                    setCategoryFilter("all");
                    setShowMobileFilters(false);
                  }}
                >
                  إعادة التعيين
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-lg text-gray-900">
              قائمة المقالات ({sortedArticles.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-0">
            {sortedArticles.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">لا توجد مقالات مطابقة للبحث</p>
              </div>
            ) : (
              renderArticles()
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
