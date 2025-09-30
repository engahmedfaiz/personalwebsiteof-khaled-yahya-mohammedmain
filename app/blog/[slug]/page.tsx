"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Scale,
  BookOpen,
  Calendar,
  User,
  Eye,
  Share2,
  Clock,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";

interface Article {
  _id: string;
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
  views?: number;
  likes?: number;
  readTime?: string;
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/articles/public/${slug}`);
        if (!res.ok) throw new Error(`فشل جلب المقال: ${res.status}`);
        const data: Article = await res.json();
        setArticle(data);

        // جلب مقالات ذات صلة بنفس التصنيف
        const relatedRes = await fetch(
          `/api/articles?category=${data.category}`
        );
        if (relatedRes.ok) {
          const relatedData: Article[] = await relatedRes.json();
          setRelatedArticles(
            relatedData.filter((art) => art.slug !== data.slug).slice(0, 3)
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطأ غير معروف");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <div className="p-6 text-center">جارٍ تحميل المقال...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        خطأ في جلب المقال: {error}
      </div>
    );
  }

  if (!article) {
    return <div className="p-6 text-center">المقال غير موجود</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/">الرئيسية</Link>
          <span>/</span>
          <Link href="/blog">المقالات</Link>
          <span>/</span>
          <span className="text-foreground">{article.title}</span>
        </div>

        {/* Article Header */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary">{article.category}</Badge>
            {article.publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("ar-SA")}
                </span>
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            )}
            {article.views && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{article.views.toLocaleString()}</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">{article.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium">{article.author}</p>
                <p className="text-sm text-muted-foreground">
                  محامي ومستشار قانوني
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <ThumbsUp className="w-4 h-4 ml-1" />
                {article.likes || 0}
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
              <img
                src={
                  article.featuredImage || "https://via.placeholder.com/600x400"
                }
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related Articles */}
        <div className="mt-12 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            مقالات ذات صلة
          </h3>
          {relatedArticles.length > 0 ? (
            relatedArticles.map((ra) => (
              <Link key={ra._id} href={`/blog/${ra.slug}`}>
                <div className="p-3 rounded-lg hover:bg-secondary/50 cursor-pointer">
                  <h4 className="text-sm font-medium">{ra.title}</h4>
                  <p className="text-xs text-muted-foreground">{ra.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              لا توجد مقالات ذات صلة
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
