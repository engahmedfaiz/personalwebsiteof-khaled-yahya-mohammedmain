"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  X,
  Calendar,
  User,
  FileText,
  Building,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";

// أنواع البيانات المحدثة
interface Case {
  _id?: string;
  title: string;
  description: string;
  clientId: string;
  lawyerId: string;
  status: "open" | "in-progress" | "closed" | "pending";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  startDate: Date;
  endDate?: Date;
  documents: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface Lawyer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
}

// دالة لجلب بيانات القضية من API
async function fetchCase(id: string): Promise<Case> {
  const response = await fetch(`/api/cases/${id}`);
  if (!response.ok) {
    throw new Error("فشل في جلب بيانات القضية");
  }
  return response.json();
}

// دالة لجلب قائمة العملاء
async function fetchClients(): Promise<Client[]> {
  const response = await fetch("/api/clients?active=true");
  if (!response.ok) {
    throw new Error("فشل في جلب قائمة العملاء");
  }
  return response.json();
}

// دالة لجلب قائمة المحامين
async function fetchLawyers(): Promise<Lawyer[]> {
  const response = await fetch("/api/lawyers?active=true");
  if (!response.ok) {
    throw new Error("فشل في جلب قائمة المحامين");
  }
  return response.json();
}

// دالة لتحديث بيانات القضية في API
async function updateCase(id: string, data: any): Promise<Case> {
  const response = await fetch(`/api/cases/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "فشل في تحديث بيانات القضية");
  }

  return response.json();
}

export default function EditCasePage() {
  const params = useParams();
  const router = useRouter();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clientId: "",
    lawyerId: "",
    status: "open" as Case["status"],
    priority: "medium" as Case["priority"],
    category: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  useEffect(() => {
    loadCaseData();
    loadClients();
    loadLawyers();
  }, [params.id]);

  const loadCaseData = async () => {
    try {
      setLoading(true);
      const caseData = await fetchCase(params.id as string);
      setCaseData(caseData);
      setFormData({
        title: caseData.title,
        description: caseData.description,
        clientId: caseData.clientId,
        lawyerId: caseData.lawyerId,
        status: caseData.status,
        priority: caseData.priority,
        category: caseData.category,
        startDate: caseData.startDate
          ? new Date(caseData.startDate).toISOString().split("T")[0]
          : "",
        endDate: caseData.endDate
          ? new Date(caseData.endDate).toISOString().split("T")[0]
          : "",
        notes: caseData.notes || "",
      });
    } catch (error) {
      console.error("Error loading case:", error);
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadClients = async () => {
    try {
      const clientsData = await fetchClients();
      setClients(clientsData);
    } catch (error) {
      console.error("Error loading clients:", error);
      setClients([
        {
          _id: "1",
          name: "أحمد محمد السعد",
          email: "ahmed.saad@email.com",
          phone: "+966501234567",
        },
        {
          _id: "2",
          name: "شركة التقنية المتطورة",
          email: "tech@company.com",
          phone: "+966502345678",
        },
      ]);
    }
  };

  const loadLawyers = async () => {
    try {
      const lawyersData = await fetchLawyers();
      setLawyers(lawyersData);
    } catch (error) {
      console.error("Error loading lawyers:", error);
      setLawyers([
        {
          _id: "1",
          name: "المحامي سعود العتيبي",
          email: "saud@lawfirm.com",
          phone: "+966503456789",
          specialization: "قانون عقاري",
        },
        {
          _id: "2",
          name: "المحامية نورة القحطاني",
          email: "nora@lawfirm.com",
          phone: "+966504567890",
          specialization: "أحوال شخصية",
        },
      ]);
    }
  };

  const loadMockData = () => {
    const mockCase: Case = {
      _id: params.id as string,
      title: "قضية عقد عقاري - تزوير في العقد",
      description:
        "قضية تتعلق بتزوير في عقد بيع عقار بمنطقة الرياض، مع وجود مزاعم بالاحتيال من قبل البائع.",
      clientId: "1",
      lawyerId: "1",
      status: "in-progress",
      priority: "high",
      category: "قانون عقاري",
      startDate: new Date("2024-01-15"),
      endDate: undefined,
      documents: ["doc1.pdf", "doc2.pdf"],
      notes:
        "يوجد شهود مهمون يحتاجون للاستدعاء. المستندات المطلوبة: العقد الأصلي، سند الملكية، تقارير الخبراء.",
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-20"),
    };

    setCaseData(mockCase);
    setFormData({
      title: mockCase.title,
      description: mockCase.description,
      clientId: mockCase.clientId,
      lawyerId: mockCase.lawyerId,
      status: mockCase.status,
      priority: mockCase.priority,
      category: mockCase.category,
      startDate: mockCase.startDate
        ? new Date(mockCase.startDate).toISOString().split("T")[0]
        : "",
      endDate: mockCase.endDate
        ? new Date(mockCase.endDate).toISOString().split("T")[0]
        : "",
      notes: mockCase.notes,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = "عنوان القضية مطلوب";
    }

    if (!formData.description.trim()) {
      errors.description = "وصف القضية مطلوب";
    }

    if (!formData.clientId) {
      errors.clientId = "اختيار العميل مطلوب";
    }

    if (!formData.lawyerId) {
      errors.lawyerId = "اختيار المحامي مطلوب";
    }

    if (!formData.category.trim()) {
      errors.category = "تصنيف القضية مطلوب";
    }

    if (!formData.startDate) {
      errors.startDate = "تاريخ بداية القضية مطلوب";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const updateData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      };

      const updatedCase = await updateCase(params.id as string, updateData);

      setCaseData(updatedCase);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        router.push(`/admin/cases/${params.id}`);
      }, 2000);
    } catch (error) {
      console.error("Error updating case:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/admin/cases/${params.id}`);
  };

  const getStatusBadge = (status: Case["status"]) => {
    const statusConfig = {
      open: { label: "مفتوحة", class: "bg-blue-100 text-blue-800" },
      "in-progress": {
        label: "قيد التنفيذ",
        class: "bg-yellow-100 text-yellow-800",
      },
      closed: { label: "مغلقة", class: "bg-green-100 text-green-800" },
      pending: { label: "معلقة", class: "bg-gray-100 text-gray-800" },
    };
    const config = statusConfig[status] || {
      label: status,
      class: "bg-gray-100 text-gray-800",
    };
    return config;
  };

  const getPriorityBadge = (priority: Case["priority"]) => {
    const priorityConfig = {
      low: { label: "منخفض", class: "bg-green-100 text-green-800" },
      medium: { label: "متوسط", class: "bg-yellow-100 text-yellow-800" },
      high: { label: "عالي", class: "bg-orange-100 text-orange-800" },
      urgent: { label: "حرج", class: "bg-red-100 text-red-800" },
    };
    const config = priorityConfig[priority] || {
      label: priority,
      class: "bg-gray-100 text-gray-800",
    };
    return config;
  };

  if (loading || !caseData) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-slate-200 rounded w-64 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-slate-200 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-slate-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-10 bg-slate-200 rounded w-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-10 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedClient = clients.find(
    (client) => client._id === formData.clientId
  );
  const selectedLawyer = lawyers.find(
    (lawyer) => lawyer._id === formData.lawyerId
  );
  const statusConfig = getStatusBadge(formData.status);
  const priorityConfig = getPriorityBadge(formData.priority);

  return (
    <div className="space-y-6">
      {/* رسالة النجاح */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-5">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">تم تحديث بيانات القضية بنجاح</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/admin/cases" className="hover:text-indigo-600">
              القضايا
            </Link>
            <ArrowRight className="h-4 w-4" />
            <Link
              href={`/admin/cases/${caseData._id}`}
              className="hover:text-indigo-600"
            >
              تفاصيل القضية
            </Link>
            <ArrowRight className="h-4 w-4" />
            <span>تعديل القضية</span>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 bg-indigo-100">
              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xl">
                <FileText className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                تعديل القضية
              </h1>
              <p className="text-lg text-slate-600">تعديل معلومات القضية</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className={statusConfig.class}>
                  {statusConfig.label}
                </Badge>
                <Badge className={priorityConfig.class}>
                  أولوية: {priorityConfig.label}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {caseData.startDate
                    ? new Date(caseData.startDate).toLocaleDateString("ar-SA")
                    : "غير محدد"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={saving}>
            <X className="h-4 w-4 mr-2" />
            إلغاء
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* المعلومات الأساسية */}
            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-600">
                  المعلومات الأساسية
                </CardTitle>
                <CardDescription className="text-indigo-500">
                  المعلومات الأساسية للقضية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-indigo-700">
                    عنوان القضية *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل عنوان القضية"
                    disabled={saving}
                  />
                  {validationErrors.title && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-indigo-700">
                    وصف القضية *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل وصفاً مفصلاً للقضية..."
                    rows={4}
                    disabled={saving}
                  />
                  {validationErrors.description && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-indigo-700">
                    تصنيف القضية *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger disabled={saving}>
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="قانون عقاري">قانون عقاري</SelectItem>
                      <SelectItem value="قانون العمل">قانون العمل</SelectItem>
                      <SelectItem value="قانون تجاري">قانون تجاري</SelectItem>
                      <SelectItem value="أحوال شخصية">أحوال شخصية</SelectItem>
                      <SelectItem value="قانون جنائي">قانون جنائي</SelectItem>
                      <SelectItem value="قانون إداري">قانون إداري</SelectItem>
                      <SelectItem value="قضاء إداري">قضاء إداري</SelectItem>
                      <SelectItem value="منازعات عقارية">
                        منازعات عقارية
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.category && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.category}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* الأطراف المعنية */}
            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-600">
                  الأطراف المعنية
                </CardTitle>
                <CardDescription className="text-indigo-500">
                  العميل والمحامي المسؤول
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="clientId" className="text-indigo-700">
                      العميل *
                    </Label>
                    <Select
                      value={formData.clientId}
                      onValueChange={(value) =>
                        handleSelectChange("clientId", value)
                      }
                    >
                      <SelectTrigger disabled={saving}>
                        <SelectValue placeholder="اختر العميل" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client._id} value={client._id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.clientId && (
                      <p className="text-red-600 text-sm flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.clientId}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lawyerId" className="text-indigo-700">
                      المحامي المسؤول *
                    </Label>
                    <Select
                      value={formData.lawyerId}
                      onValueChange={(value) =>
                        handleSelectChange("lawyerId", value)
                      }
                    >
                      <SelectTrigger disabled={saving}>
                        <SelectValue placeholder="اختر المحامي" />
                      </SelectTrigger>
                      <SelectContent>
                        {lawyers.map((lawyer) => (
                          <SelectItem key={lawyer._id} value={lawyer._id}>
                            {lawyer.name} - {lawyer.specialization}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.lawyerId && (
                      <p className="text-red-600 text-sm flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.lawyerId}
                      </p>
                    )}
                  </div>
                </div>

                {/* معلومات العميل */}
                {selectedClient && (
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700">
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-indigo-900">
                          {selectedClient.name}
                        </h4>
                        <div className="flex flex-wrap gap-4 text-sm text-indigo-700 mt-1">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {selectedClient.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {selectedClient.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* معلومات المحامي */}
                {selectedLawyer && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-green-100 text-green-700">
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-900">
                          {selectedLawyer.name}
                        </h4>
                        <div className="flex flex-wrap gap-4 text-sm text-green-700 mt-1">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {selectedLawyer.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {selectedLawyer.email}
                          </span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {selectedLawyer.specialization}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* الحالة والتواريخ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-600">
                  الحالة والتواريخ
                </CardTitle>
                <CardDescription className="text-indigo-500">
                  إدارة حالة القضية وتواريخها
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-indigo-700">
                      حالة القضية
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value as Case["status"])
                      }
                    >
                      <SelectTrigger disabled={saving}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">مفتوحة</SelectItem>
                        <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                        <SelectItem value="pending">معلقة</SelectItem>
                        <SelectItem value="closed">مغلقة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-indigo-700">
                      مستوى الأولوية
                    </Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        handleSelectChange(
                          "priority",
                          value as Case["priority"]
                        )
                      }
                    >
                      <SelectTrigger disabled={saving}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">منخفض</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="high">عالي</SelectItem>
                        <SelectItem value="urgent">حرج</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-indigo-700">
                      تاريخ البداية *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-3 h-4 w-4 text-indigo-600" />
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                        className="pr-10"
                        disabled={saving}
                      />
                    </div>
                    {validationErrors.startDate && (
                      <p className="text-red-600 text-sm flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.startDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-indigo-700">
                      تاريخ الانتهاء
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-3 h-4 w-4 text-indigo-600" />
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="pr-10"
                        disabled={saving}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* الملاحظات */}
            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-600">
                  ملاحظات إضافية
                </CardTitle>
                <CardDescription className="text-indigo-500">
                  أي ملاحظات أو تفاصيل إضافية حول القضية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-indigo-700">
                    ملاحظات
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="أدخل أي ملاحظات مهمة حول القضية..."
                    rows={4}
                    disabled={saving}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* معلومات سريعة */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-indigo-600">
                  معلومات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-indigo-700 font-medium">
                    تاريخ الإنشاء:
                  </span>
                  <span className="font-medium text-indigo-600">
                    {caseData.createdAt
                      ? new Date(caseData.createdAt).toLocaleDateString("ar-SA")
                      : "غير محدد"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-indigo-700 font-medium">
                    آخر تحديث:
                  </span>
                  <span className="font-medium text-indigo-600">
                    {caseData.updatedAt
                      ? new Date(caseData.updatedAt).toLocaleDateString("ar-SA")
                      : "غير محدد"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-indigo-700 font-medium">
                    المستندات:
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-indigo-600 bg-indigo-50"
                  >
                    {caseData.documents?.length || 0} ملف
                  </Badge>
                </div>
                <Separator />
                <div className="text-xs text-indigo-600">
                  <p>سيتم تحديث تاريخ التعديل تلقائياً عند حفظ التغييرات.</p>
                </div>
              </CardContent>
            </Card>

            {/* حالة القضية */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-indigo-600">
                  حالة القضية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="text-sm font-medium text-indigo-700">
                    الحالة الحالية
                  </span>
                  <Badge className={statusConfig.class}>
                    {statusConfig.label}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="text-sm font-medium text-indigo-700">
                    مستوى الأولوية
                  </span>
                  <Badge className={priorityConfig.class}>
                    {priorityConfig.label}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="text-sm font-medium text-indigo-700">
                    المدة المنقضية
                  </span>
                  <span className="text-sm font-medium text-indigo-700">
                    {(() => {
                      if (!formData.startDate) return "غير محدد";
                      const startDate = new Date(formData.startDate);
                      const today = new Date();
                      const diffTime = today.getTime() - startDate.getTime();
                      const diffDays = Math.floor(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                      return `${diffDays} يوم`;
                    })()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* إجراءات سريعة */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">
                  إجراءات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <X className="h-4 w-4 mr-2" />
                  إلغاء التعديلات
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
                <Link href={`/admin/cases/${caseData._id}`} className="block">
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={saving}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    معاينة القضية
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
