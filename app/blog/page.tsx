// "use client"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   Scale,
//   BookOpen,
//   Calendar,
//   User,
//   ArrowLeft,
//   Eye,
//   MessageCircle,
//   Share2,
//   Clock,
//   Tag,
//   TrendingUp,
//   Star,
// } from "lucide-react"
// import Link from "next/link"

// export default function BlogPage() {
//   const featuredArticle = {
//     id: 1,
//     title: "التطورات الجديدة في قانون الاستثمار اليمني لعام 2024",
//     excerpt: "نظرة شاملة على أحدث التعديلات في قانون الاستثمار وتأثيرها على المستثمرين المحليين والأجانب",
//     content:
//       "يشهد قانون الاستثمار اليمني تطورات مهمة في عام 2024، حيث تم إدخال تعديلات جوهرية تهدف إلى تحسين بيئة الاستثمار وجذب رؤوس الأموال...",
//     author: "خالد يحيى محمد الناصر",
//     date: "2024-01-15",
//     readTime: "8 دقائق",
//     category: "قانون الاستثمار",
//     tags: ["استثمار", "قانون تجاري", "تشريعات جديدة"],
//     views: 1250,
//     image: "/legal-investment-law-article.jpg",
//     featured: true,
//   }

//   const articles = [
//     {
//       id: 2,
//       title: "حقوق المرأة في قانون الأحوال الشخصية: دليل شامل",
//       excerpt: "تفصيل شامل لحقوق المرأة في قانون الأحوال الشخصية والتطورات القانونية الحديثة",
//       author: "فاطمة علي الزهراني",
//       date: "2024-01-10",
//       readTime: "6 دقائق",
//       category: "قانون الأحوال الشخصية",
//       tags: ["حقوق المرأة", "أحوال شخصية", "قانون الأسرة"],
//       views: 890,
//       image: "/womens-rights-law-article.jpg",
//     },
//     {
//       id: 3,
//       title: "التحكيم التجاري الدولي: الفرص والتحديات",
//       excerpt: "استكشاف مزايا التحكيم التجاري كبديل للتقاضي التقليدي في النزاعات التجارية",
//       author: "د. أحمد محمد الشامي",
//       date: "2024-01-05",
//       readTime: "10 دقائق",
//       category: "التحكيم التجاري",
//       tags: ["تحكيم", "قانون تجاري", "نزاعات"],
//       views: 1100,
//       image: "/commercial-arbitration-article.jpg",
//     },
//     {
//       id: 4,
//       title: "أساسيات تأسيس الشركات في اليمن",
//       excerpt: "دليل عملي لرجال الأعمال حول إجراءات تأسيس الشركات والمتطلبات القانونية",
//       author: "محمد سالم الحداد",
//       date: "2024-01-01",
//       readTime: "7 دقائق",
//       category: "قانون الشركات",
//       tags: ["تأسيس شركات", "قانون تجاري", "ريادة أعمال"],
//       views: 750,
//       image: "/company-formation-article.jpg",
//     },
//     {
//       id: 5,
//       title: "الحماية القانونية للملكية الفكرية في العصر الرقمي",
//       excerpt: "كيفية حماية حقوق الملكية الفكرية في ظل التطور التكنولوجي والتجارة الإلكترونية",
//       author: "محمد سالم الحداد",
//       date: "2023-12-28",
//       readTime: "9 دقائق",
//       category: "الملكية الفكرية",
//       tags: ["ملكية فكرية", "تكنولوجيا", "حقوق المؤلف"],
//       views: 650,
//       image: "/intellectual-property-article.jpg",
//     },
//     {
//       id: 6,
//       title: "قانون العمل الجديد: ما يجب أن يعرفه أصحاب العمل",
//       excerpt: "شرح مفصل للتعديلات الجديدة في قانون العمل وتأثيرها على العلاقة بين أصحاب العمل والموظفين",
//       author: "د. أحمد محمد الشامي",
//       date: "2023-12-25",
//       readTime: "8 دقائق",
//       category: "قانون العمل",
//       tags: ["قانون العمل", "حقوق العمال", "علاقات عمل"],
//       views: 920,
//       image: "/labor-law-article.jpg",
//     },
//   ]

//   const categories = [
//     { name: "قانون الاستثمار", count: 12, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
//     { name: "قانون الأحوال الشخصية", count: 8, color: "bg-pink-500/10 text-pink-600 border-pink-500/20" },
//     { name: "التحكيم التجاري", count: 15, color: "bg-green-500/10 text-green-600 border-green-500/20" },
//     { name: "قانون الشركات", count: 10, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
//     { name: "الملكية الفكرية", count: 6, color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
//     { name: "قانون العمل", count: 9, color: "bg-teal-500/10 text-teal-600 border-teal-500/20" },
//   ]

//   const recentNews = [
//     {
//       title: "صدور قرار جديد من المحكمة العليا بشأن النزاعات التجارية",
//       date: "2024-01-12",
//       category: "أخبار قضائية",
//     },
//     {
//       title: "تعديلات مهمة على قانون الشركات تدخل حيز التنفيذ",
//       date: "2024-01-08",
//       category: "تشريعات",
//     },
//     {
//       title: "مؤتمر المحامين العرب يناقش التحديات القانونية المعاصرة",
//       date: "2024-01-05",
//       category: "فعاليات",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       {/* Navigation */}
//       <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
//               <Scale className="w-8 h-8 text-primary" />
//               <span className="text-xl font-bold">المحامي خالد الناصر</span>
//             </Link>

//             <div className="hidden md:flex items-center gap-6">
//               <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
//                 الرئيسية
//               </Link>
//               <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
//                 من نحن
//               </Link>
//               <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
//                 خدماتنا
//               </Link>
//               <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors">
//                 فريق العمل
//               </Link>
//               <Link href="/blog" className="text-primary font-medium">
//                 المقالات
//               </Link>
//               <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
//                 اتصل بنا
//               </Link>
//             </div>

//             <Button asChild className="bg-primary hover:bg-primary/90">
//               <Link href="/contact">احجز استشارة</Link>
//             </Button>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
//         {/* Hero Section */}
//         <section className="text-center space-y-8">
//           <div className="space-y-4">
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
//                 <BookOpen className="w-6 h-6 text-primary" />
//               </div>
//               <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
//               <div className="w-8 h-8 border border-primary rotate-45" />
//               <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
//               <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
//                 <Scale className="w-6 h-6 text-primary" />
//               </div>
//             </div>

//             <h1 className="text-4xl md:text-6xl font-bold text-balance">
//               <span className="bg-gradient-to-l from-primary via-foreground to-primary bg-clip-text text-transparent">
//                 المقالات والأخبار القانونية
//               </span>
//             </h1>
//             <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
//               آخر المستجدات والتحليلات القانونية من خبرائنا لمساعدتكم في فهم التطورات القانونية المعاصرة
//             </p>
//           </div>
//         </section>

//         {/* Featured Article */}
//         <section className="space-y-8">
//           <div className="flex items-center gap-3">
//             <Star className="w-6 h-6 text-primary" />
//             <h2 className="text-2xl font-bold">المقال المميز</h2>
//           </div>

//           <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40 overflow-hidden">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
//               <div className="relative h-64 lg:h-auto">
//                 <img
//                   src={
//                     featuredArticle.image || "/placeholder.svg?height=400&width=600&query=legal investment law article"
//                   }
//                   alt={featuredArticle.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute top-4 right-4">
//                   <Badge className="bg-primary text-primary-foreground">مميز</Badge>
//                 </div>
//               </div>

//               <CardContent className="p-8 lg:p-12 space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                     <Badge variant="secondary" className={categories[0].color}>
//                       {featuredArticle.category}
//                     </Badge>
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-4 h-4" />
//                       <span>{new Date(featuredArticle.date).toLocaleDateString("ar-SA")}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Clock className="w-4 h-4" />
//                       <span>{featuredArticle.readTime}</span>
//                     </div>
//                   </div>

//                   <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
//                     {featuredArticle.title}
//                   </h3>

//                   <p className="text-muted-foreground leading-relaxed">{featuredArticle.excerpt}</p>

//                   <div className="flex items-center justify-between pt-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <User className="w-4 h-4" />
//                         <span>{featuredArticle.author}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <Eye className="w-4 h-4" />
//                         <span>{featuredArticle.views.toLocaleString()}</span>
//                       </div>
//                     </div>

//                     <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10 bg-transparent">
//                       <Link href={`/blog/${featuredArticle.id}`}>
//                         اقرأ المزيد
//                         <ArrowLeft className="w-4 h-4 mr-2" />
//                       </Link>
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </div>
//           </Card>
//         </section>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
//           {/* Articles List */}
//           <div className="lg:col-span-3 space-y-8">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-bold">أحدث المقالات</h2>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <TrendingUp className="w-4 h-4" />
//                 <span>{articles.length} مقال</span>
//               </div>
//             </div>

//             <div className="space-y-8">
//               {articles.map((article, index) => (
//                 <Card
//                   key={article.id}
//                   className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40 overflow-hidden"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
//                     <div className="relative h-48 md:h-auto">
//                       <img
//                         src={
//                           article.image ||
//                           `/placeholder.svg?height=200&width=300&query=${article.category} legal article`
//                         }
//                         alt={article.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>

//                     <CardContent className="md:col-span-2 p-6 space-y-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                           <Badge
//                             variant="secondary"
//                             className={
//                               categories.find((cat) => cat.name === article.category)?.color ||
//                               "bg-gray-500/10 text-gray-600 border-gray-500/20"
//                             }
//                           >
//                             {article.category}
//                           </Badge>
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4" />
//                             <span>{new Date(article.date).toLocaleDateString("ar-SA")}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Clock className="w-4 h-4" />
//                             <span>{article.readTime}</span>
//                           </div>
//                         </div>

//                         <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
//                           {article.title}
//                         </h3>

//                         <p className="text-muted-foreground leading-relaxed text-sm">{article.excerpt}</p>

//                         <div className="flex flex-wrap gap-2">
//                           {article.tags.map((tag, idx) => (
//                             <Badge key={idx} variant="outline" className="text-xs border-primary/20 text-primary">
//                               <Tag className="w-3 h-3 ml-1" />
//                               {tag}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between pt-4 border-t border-border/50">
//                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                           <div className="flex items-center gap-2">
//                             <User className="w-4 h-4" />
//                             <span>{article.author}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Eye className="w-4 h-4" />
//                             <span>{article.views.toLocaleString()}</span>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <Button size="sm" variant="ghost" className="hover:bg-primary/10">
//                             <Share2 className="w-4 h-4" />
//                           </Button>
//                           <Button
//                             asChild
//                             size="sm"
//                             variant="outline"
//                             className="border-primary/30 hover:bg-primary/10 bg-transparent"
//                           >
//                             <Link href={`/blog/${article.id}`}>اقرأ المزيد</Link>
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-8">
//             {/* Categories */}
//             <Card className="bg-card/50 border-primary/20">
//               <CardContent className="p-6 space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   <Tag className="w-5 h-5 text-primary" />
//                   التصنيفات
//                 </h3>
//                 <div className="space-y-3">
//                   {categories.map((category, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
//                     >
//                       <span className="text-sm font-medium">{category.name}</span>
//                       <Badge variant="secondary" className="text-xs">
//                         {category.count}
//                       </Badge>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Recent News */}
//             <Card className="bg-card/50 border-primary/20">
//               <CardContent className="p-6 space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-primary" />
//                   أحدث الأخبار
//                 </h3>
//                 <div className="space-y-4">
//                   {recentNews.map((news, index) => (
//                     <div
//                       key={index}
//                       className="space-y-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
//                     >
//                       <h4 className="text-sm font-medium leading-tight hover:text-primary transition-colors">
//                         {news.title}
//                       </h4>
//                       <div className="flex items-center justify-between text-xs text-muted-foreground">
//                         <span>{news.category}</span>
//                         <span>{new Date(news.date).toLocaleDateString("ar-SA")}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Newsletter Signup */}
//             <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
//               <CardContent className="p-6 space-y-4 text-center">
//                 <MessageCircle className="w-12 h-12 text-primary mx-auto" />
//                 <h3 className="text-lg font-semibold">اشترك في النشرة القانونية</h3>
//                 <p className="text-sm text-muted-foreground">احصل على آخر المستجدات القانونية والمقالات المتخصصة</p>
//                 <Button className="w-full bg-primary hover:bg-primary/90">اشترك الآن</Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Call to Action */}
//         <section className="text-center space-y-8">
//           <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
//             <CardContent className="p-12 space-y-6">
//               <BookOpen className="w-16 h-16 text-primary mx-auto animate-pulse" />
//               <h3 className="text-3xl font-bold">هل تحتاج استشارة قانونية متخصصة؟</h3>
//               <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//                 فريقنا من الخبراء القانونيين جاهز لمساعدتك في جميع احتياجاتك القانونية
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg">
//                   <Link href="/contact">
//                     <MessageCircle className="w-5 h-5 ml-2" />
//                     احجز استشارة مجانية
//                   </Link>
//                 </Button>
//                 <Button
//                   asChild
//                   variant="outline"
//                   size="lg"
//                   className="px-8 py-4 text-lg border-primary/30 hover:bg-primary/10 bg-transparent"
//                 >
//                   <Link href="/services">
//                     <ArrowLeft className="w-5 h-5 ml-2" />
//                     تعرف على خدماتنا
//                   </Link>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </section>
//       </div>
//     </div>
//   )
// }

// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Scale,
//   BookOpen,
//   Calendar,
//   User,
//   ArrowLeft,
//   Eye,
//   Clock,
//   Tag,
//   TrendingUp,
//   Star,
//   Share2,
// } from "lucide-react";
// import Link from "next/link";

// interface Article {
//   _id?: string; // لاحظ: نحول ObjectId إلى string في الـ API أو عند الإرسال
//   title: string;
//   slug: string;
//   content: string;
//   excerpt: string;
//   author: string;
//   category: string;
//   tags: string[];
//   featuredImage?: string;
//   isPublished: boolean;
//   publishedAt?: string; // أو Date، حسب ما ترسل من الـ API
//   createdAt: string;
//   updatedAt: string;
// }

// export default function BlogPage() {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [featured, setFeatured] = useState<Article | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {


//     const fetchArticles = async () => {
//       try {
//         const res = await fetch("/api/articles/public"); // أو المسار الذي توفره في الـ API
//         if (!res.ok) {
//           throw new Error(`فشل جلب المقالات: ${res.status}`);
//         }
//         const data: Article[] = await res.json();
//         // فلتر المقالات المنشورة فقط
//         const published = data.filter((art) => art.isPublished);
//         // يمكنك اختيار أول مقال كمميز
//         const feat =
//           published.find((art) => art.slug === "some-featured-slug") ||
//           published[0] ||
//           null;
//         setFeatured(feat);
//         // استبعد المقال المميز من القائمة العامة
//         const rest = published.filter((art) => art.slug !== feat?.slug);
//         setArticles(rest);
//       } catch (err) {
//         console.error("Error fetching articles:", err);
//         setError(err instanceof Error ? err.message : "خطأ غير معروف");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   if (loading) {
//     return <div className="p-6 text-center">جارٍ تحميل المقالات...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-600">خطأ: {error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       {/* <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <Link
//               href="/"
//               className="flex items-center gap-3 hover:scale-105 transition-transform"
//             >
//               <Scale className="w-8 h-8 text-primary" />
//               <span className="text-xl font-bold">المحامي خالد الناصر</span>
//             </Link>

//             <div className="hidden md:flex items-center gap-6">
//               <Link
//                 href="/"
//                 className="text-muted-foreground hover:text-primary transition-colors"
//               >
//                 الرئيسية
//               </Link>
//               <Link
//                 href="/about"
//                 className="text-muted-foreground hover:text-primary transition-colors"
//               >
//                 من نحن
//               </Link>
//               <Link
//                 href="/services"
//                 className="text-muted-foreground hover:text-primary transition-colors"
//               >
//                 خدماتنا
//               </Link>
//               <Link
//                 href="/team"
//                 className="text-muted-foreground hover:text-primary transition-colors"
//               >
//                 فريق العمل
//               </Link>
//               <Link href="/blog" className="text-primary font-medium">
//                 المقالات
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-muted-foreground hover:text-primary transition-colors"
//               >
//                 اتصل بنا
//               </Link>
//             </div>

//             <Button asChild className="bg-primary hover:bg-primary/90">
//               <Link href="/contact">احجز استشارة</Link>
//             </Button>
//           </div>
//         </div>
//       </nav> */}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
//         {/* قسم المقال المميز */}
//         {featured && (
//           <section className="space-y-8">
//             <div className="flex items-center gap-3">
//               <Star className="w-6 h-6 text-primary" />
//               <h2 className="text-2xl font-bold">المقال المميز</h2>
//             </div>

//             <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40 overflow-hidden">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
//                 <div className="relative h-64 lg:h-auto">
//                   <img
//                     src={featured.featuredImage || "/placeholder.svg"}
//                     alt={featured.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute top-4 right-4">
//                     <Badge className="bg-primary text-primary-foreground">
//                       مميز
//                     </Badge>
//                   </div>
//                 </div>

//                 <CardContent className="p-8 lg:p-12 space-y-6">
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                       <Badge variant="secondary">{featured.category}</Badge>
//                       {featured.publishedAt && (
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           <span>
//                             {new Date(featured.publishedAt).toLocaleDateString(
//                               "ar-SA"
//                             )}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
//                       {featured.title}
//                     </h3>

//                     <p className="text-muted-foreground leading-relaxed">
//                       {featured.excerpt}
//                     </p>

//                     <div className="flex items-center justify-between pt-4">
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                           <User className="w-4 h-4" />
//                           <span>{featured.author}</span>
//                         </div>
//                       </div>

//                       <Button
//                         asChild
//                         variant="outline"
//                         className="border-primary/30 hover:bg-primary/10 hover:text-primary/30 bg-transparent"
//                       >
//                         <Link href={`/blog/${featured.slug}`}>
//                           اقرأ المزيد
//                           <ArrowLeft className="w-4 h-4 mr-2" />
//                         </Link>
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </div>
//             </Card>
//           </section>
//         )}

//         {/* قائمة باقي المقالات */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
//           <div className="lg:col-span-3 space-y-8">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-bold">أحدث المقالات</h2>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <TrendingUp className="w-4 h-4" />
//                 <span>{articles.length} مقال</span>
//               </div>
//             </div>

//             <div className="space-y-8">
//               {articles.map((article) => (
//                 <Card
//                   key={article.slug}
//                   className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40 overflow-hidden"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
//                     <div className="relative h-48 md:h-auto">
//                       <img
//                         src={article.featuredImage || "/placeholder.svg"}
//                         alt={article.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                     <CardContent className="md:col-span-2 p-6 space-y-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                           <Badge variant="secondary">{article.category}</Badge>
//                           {article.publishedAt && (
//                             <div className="flex items-center gap-1">
//                               <Calendar className="w-4 h-4" />
//                               <span>
//                                 {new Date(
//                                   article.publishedAt
//                                 ).toLocaleDateString("ar-SA")}
//                               </span>
//                             </div>
//                           )}
//                         </div>

//                         <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
//                           {article.title}
//                         </h3>

//                         <p className="text-muted-foreground leading-relaxed text-sm">
//                           {article.excerpt}
//                         </p>

//                         <div className="flex flex-wrap gap-2">
//                           {article.tags.map((tag, idx) => (
//                             <Badge
//                               key={idx}
//                               variant="outline"
//                               className="text-xs border-primary/20 text-primary"
//                             >
//                               <Tag className="w-3 h-3 ml-1" />
//                               {tag}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between pt-4 border-t border-border/50">
//                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                           <div className="flex items-center gap-2">
//                             <User className="w-4 h-4" />
//                             <span>{article.author}</span>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             className="hover:bg-primary/10"
//                           >
//                             <Share2 className="w-4 h-4" />
//                           </Button>
//                           <Button
//                             asChild
//                             size="sm"
//                             variant="outline"
//                             className="border-primary/30 hover:bg-primary/10 bg-transparent"
//                           >
//                             <Link href={`/blog/${article.slug}`}>
//                               اقرأ المزيد
//                             </Link>
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           {/* الشريط الجانبي — التصنيفات وغيرها */}
//           <div className="space-y-8">
//             {/* التصنيفات */}
//             <Card className="bg-card/50 border-primary/20">
//               <CardContent className="p-6 space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   <Tag className="w-5 h-5 text-primary" />
//                   التصنيفات
//                 </h3>
//                 <div className="space-y-3">
//                   {/* يمكنك جلب التصنيفات من API أو من بيانات ثابتة */}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Scale,
  Calendar,
  User,
  ArrowLeft,
  Tag,
  TrendingUp,
  Star,
  Share2,
} from "lucide-react";
import Link from "next/link";

interface Article {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featured, setFeatured] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🟢 دالة جلب المقالات من API مباشرة
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/public/articles", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`فشل جلب المقالات: ${res.status}`);
      }
      const data: Article[] = await res.json();

      const published = data.filter((art) => art.isPublished);

      // اختيار مقال مميز
      const feat = published[0] || null;
      setFeatured(feat);

      // استبعاد المقال المميز من القائمة العامة
      const rest = published.filter((art) => art._id !== feat?._id);
      setArticles(rest);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError(err instanceof Error ? err.message : "خطأ غير معروف");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">جارٍ تحميل المقالات...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">خطأ: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* 🟢 المقال المميز */}
        {featured && (
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">المقال المميز</h2>
            </div>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featured.featuredImage || "/placeholder.svg"}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      مميز
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8 lg:p-12 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{featured.category}</Badge>
                      {featured.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(featured.publishedAt).toLocaleDateString(
                              "ar-SA"
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {featured.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>{featured.author}</span>
                        </div>
                      </div>

                      <Button
                        asChild
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/10 hover:text-primary/30 bg-transparent"
                      >
                        <Link href={`/blog/${featured.slug}`}>
                          اقرأ المزيد
                          <ArrowLeft className="w-4 h-4 mr-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </section>
        )}

        {/* 🟢 قائمة باقي المقالات */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">أحدث المقالات</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>{articles.length} مقال</span>
              </div>
            </div>

            <div className="space-y-8">
              {articles.map((article) => (
                <Card
                  key={article._id}
                  className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative h-48 md:h-auto">
                      <img
                        src={article.featuredImage || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="md:col-span-2 p-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="secondary">{article.category}</Badge>
                          {article.publishedAt && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(
                                  article.publishedAt
                                ).toLocaleDateString("ar-SA")}
                              </span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {article.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs border-primary/20 text-primary"
                            >
                              <Tag className="w-3 h-3 ml-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-primary/10"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="border-primary/30 hover:bg-primary/10 bg-transparent"
                          >
                            <Link href={`/blog/${article.slug}`}>
                              اقرأ المزيد
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 🟢 الشريط الجانبي */}
          <div className="space-y-8">
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  التصنيفات
                </h3>
                <div className="space-y-3">
                  {/* لاحقًا تجيب التصنيفات من API */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

