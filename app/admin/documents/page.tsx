"use client";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload,
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  Trash2,
  FolderOpen,
  File,
  ImageIcon,
  Calendar,
  FileSpreadsheet,
} from "lucide-react";
import type { Document } from "@/lib/models/User";

export const dynamic = "force-dynamic";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    // Mock data - في التطبيق الحقيقي، سيتم جلب البيانات من API
    const mockDocuments: Document[] = [
      {
        _id: "1",
        name: "عقد الملكية الأصلي",
        originalName: "ownership_contract_original.pdf",
        path: "/documents/ownership_contract_original.pdf",
        size: 2048576, // 2MB
        type: "application/pdf",
        caseId: "case1",
        clientId: "client1",
        uploadedBy: "lawyer1",
        tags: ["عقد", "ملكية", "عقاري"],
        isPublic: false,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        _id: "2",
        name: "صك الأرض",
        originalName: "land_deed.pdf",
        path: "/documents/land_deed.pdf",
        size: 1536000, // 1.5MB
        type: "application/pdf",
        caseId: "case1",
        clientId: "client1",
        uploadedBy: "lawyer1",
        tags: ["صك", "أرض", "عقاري"],
        isPublic: false,
        createdAt: new Date("2024-01-18"),
        updatedAt: new Date("2024-01-18"),
      },
      {
        _id: "3",
        name: "خريطة المساحة",
        originalName: "survey_map.jpg",
        path: "/documents/survey_map.jpg",
        size: 3072000, // 3MB
        type: "image/jpeg",
        caseId: "case1",
        clientId: "client1",
        uploadedBy: "lawyer2",
        tags: ["خريطة", "مساحة", "عقاري"],
        isPublic: true,
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        _id: "4",
        name: "عقد الشراكة التجارية",
        originalName: "partnership_agreement.docx",
        path: "/documents/partnership_agreement.docx",
        size: 512000, // 512KB
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        caseId: "case2",
        clientId: "client2",
        uploadedBy: "lawyer1",
        tags: ["عقد", "شراكة", "تجاري"],
        isPublic: false,
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-01"),
      },
      {
        _id: "5",
        name: "البيانات المالية",
        originalName: "financial_data.xlsx",
        path: "/documents/financial_data.xlsx",
        size: 1024000, // 1MB
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        caseId: "case2",
        clientId: "client2",
        uploadedBy: "lawyer2",
        tags: ["مالية", "بيانات", "تجاري"],
        isPublic: false,
        createdAt: new Date("2024-02-05"),
        updatedAt: new Date("2024-02-05"),
      },
    ];

    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 1000);
  }, []);

  const getFileIcon = (type: string) => {
    if (type.includes("pdf"))
      return <FileText className="h-5 w-5 text-red-500" />;
    if (type.includes("image"))
      return <ImageIcon className="h-5 w-5 text-green-500" />;
    if (type.includes("spreadsheet") || type.includes("excel"))
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    if (type.includes("word") || type.includes("document"))
      return <FileText className="h-5 w-5 text-blue-500" />;
    return <File className="h-5 w-5 text-slate-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getDocumentCategory = (doc: Document) => {
    if (doc.caseId) return "قضية";
    if (doc.clientId) return "عميل";
    return "عام";
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesType = typeFilter === "all" || doc.type.includes(typeFilter);
    const matchesCategory =
      categoryFilter === "all" ||
      (categoryFilter === "case" && doc.caseId) ||
      (categoryFilter === "client" && doc.clientId && !doc.caseId) ||
      (categoryFilter === "general" && !doc.caseId && !doc.clientId);

    return matchesSearch && matchesType && matchesCategory;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-slate-200 rounded w-32 animate-pulse"></div>
        </div>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <FolderOpen className="h-8 w-8 text-purple-600" />
            إدارة الوثائق
          </h1>
          <p className="text-slate-600 mt-1">
            إدارة وتنظيم جميع الوثائق والملفات
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Upload className="h-4 w-4 mr-2" />
              رفع وثيقة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>رفع وثيقة جديدة</DialogTitle>
              <DialogDescription>
                اختر الملف وأدخل المعلومات المطلوبة
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file">الملف</Label>
                <Input id="file" type="file" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="name">اسم الوثيقة</Label>
                <Input
                  id="name"
                  placeholder="أدخل اسم الوثيقة"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="tags">العلامات</Label>
                <Input
                  id="tags"
                  placeholder="علامة1، علامة2، علامة3"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="case">القضية المرتبطة (اختياري)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر قضية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="case1">
                      قضية عقارية - نزاع ملكية
                    </SelectItem>
                    <SelectItem value="case2">
                      قضية تجارية - خلاف شراكة
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="client">العميل المرتبط (اختياري)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر عميل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client1">أحمد محمد السعد</SelectItem>
                    <SelectItem value="client2">شركة النور للتجارة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="public" />
                <Label htmlFor="public">
                  وثيقة عامة (يمكن للجميع الوصول إليها)
                </Label>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  رفع الوثيقة
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsUploadOpen(false)}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">إجمالي الوثائق</p>
                <p className="text-2xl font-bold text-purple-600">
                  {documents.length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">وثائق القضايا</p>
                <p className="text-2xl font-bold text-amber-600">
                  {documents.filter((d) => d.caseId).length}
                </p>
              </div>
              <FolderOpen className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">الوثائق العامة</p>
                <p className="text-2xl font-bold text-green-600">
                  {documents.filter((d) => d.isPublic).length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">الحجم الإجمالي</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatFileSize(
                    documents.reduce((total, doc) => total + doc.size, 0)
                  )}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="البحث في الوثائق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="نوع الملف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="image">صور</SelectItem>
                <SelectItem value="word">Word</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="case">وثائق القضايا</SelectItem>
                <SelectItem value="client">وثائق العملاء</SelectItem>
                <SelectItem value="general">وثائق عامة</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              تصفية متقدمة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>الوثائق ({filteredDocuments.length})</CardTitle>
          <CardDescription>
            قائمة بجميع الوثائق المرفوعة في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الوثيقة</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>الحجم</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead>العلامات</TableHead>
                <TableHead>تاريخ الرفع</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getFileIcon(document.type)}
                      <div>
                        <div className="font-medium">{document.name}</div>
                        <div className="text-sm text-slate-500">
                          {document.originalName}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {document.type.split("/")[1]?.toUpperCase() || "FILE"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatFileSize(document.size)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getDocumentCategory(document)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {document.tags.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {document.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{document.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(document.createdAt).toLocaleDateString("ar-SA")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" title="معاينة">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="تحميل">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
