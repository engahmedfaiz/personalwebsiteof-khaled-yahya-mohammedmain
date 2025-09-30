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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  Save,
  X,
  Phone,
  Mail,
  MapPin,
  Building,
  User,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import type { Client } from "@/lib/models/User";

// دالة لجلب بيانات العميل من API
async function fetchClient(id: string): Promise<Client> {
  const response = await fetch(`/api/clients/${id}`);
  if (!response.ok) {
    throw new Error("فشل في جلب بيانات العميل");
  }
  return response.json();
}

// دالة لتحديث بيانات العميل في API
async function updateClient(id: string, data: any): Promise<Client> {
  const response = await fetch(`/api/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "فشل في تحديث بيانات العميل");
  }

  return response.json();
}

export default function EditClientPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    nationalId: "",
    company: "",
    notes: "",
    isActive: true,
  });

  useEffect(() => {
    loadClientData();
  }, [params.id]);

  const loadClientData = async () => {
    try {
      setLoading(true);
      const clientData = await fetchClient(params.id as string);
      setClient(clientData);
      setFormData({
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address,
        nationalId: clientData.nationalId || "",
        company: clientData.company || "",
        notes: clientData.notes || "",
        isActive: clientData.isActive,
      });
    } catch (error) {
      console.error("Error loading client:", error);
      toast.error("فشل في تحميل بيانات العميل");
      // Fallback to mock data if API fails
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    const mockClient: Client = {
      _id: params.id as string,
      name: "أحمد محمد السعد",
      email: "ahmed.saad@email.com",
      phone: "+966501234567",
      address: "الرياض، حي النخيل، شارع الملك فهد، مبنى رقم 123",
      nationalId: "1234567890",
      company: "",
      notes:
        "عميل مميز، يحتاج متابعة دورية. لديه خبرة في القضايا العقارية ويفضل التواصل عبر الهاتف.",
      cases: ["case1", "case2"],
      isActive: true,
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-15"),
    };

    setClient(mockClient);
    setFormData({
      name: mockClient.name,
      email: mockClient.email,
      phone: mockClient.phone,
      address: mockClient.address,
      nationalId: mockClient.nationalId || "",
      company: mockClient.company || "",
      notes: mockClient.notes || "",
      isActive: mockClient.isActive,
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
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // التحقق من البيانات المطلوبة
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error("الرجاء ملء جميع الحقول الإلزامية");
        return;
      }

      // إرسال البيانات إلى API
      const updatedClient = await updateClient(params.id as string, formData);

      // تحديث البيانات المحلية
      setClient(updatedClient);

      // إظهار رسالة النجاح
      setShowSuccess(true);
      toast.success("تم تحديث بيانات العميل بنجاح");

      // إخفاء رسالة النجاح بعد 3 ثواني
      setTimeout(() => {
        setShowSuccess(false);
        // العودة إلى صفحة التفاصيل بعد النجاح
        router.push(`/admin/clients/${params.id}`);
      }, 2000);
    } catch (error) {
      console.error("Error updating client:", error);
      toast.error(
        error instanceof Error ? error.message : "فشل في تحديث بيانات العميل"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/admin/clients/${params.id}`);
  };

  if (loading || !client) {
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

  return (
    <div className="space-y-6">
      {/* رسالة النجاح */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-5">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">تم تحديث بيانات العميل بنجاح</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/admin/clients" className="hover:text-green-600">
              العملاء
            </Link>
            <ArrowRight className="h-4 w-4" />
            <Link
              href={`/admin/clients/${client._id}`}
              className="hover:text-green-600"
            >
              تفاصيل العميل
            </Link>
            <ArrowRight className="h-4 w-4" />
            <span>تعديل العميل</span>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt={client.name} />
              <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                {formData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                تعديل العميل
              </h1>
              <p className="text-lg text-slate-600">
                تعديل معلومات {client.name}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <Badge
                  className={
                    formData.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {formData.isActive ? "نشط" : "غير نشط"}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {formData.company ? (
                    <Building className="h-3 w-3" />
                  ) : (
                    <User className="h-3 w-3" />
                  )}
                  {formData.company ? "شركة" : ""}
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
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#D4AF37]">معلومات العميل</CardTitle>
                <CardDescription className="text-[#B8860B]">
                  قم بتعديل المعلومات الأساسية للعميل
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* المعلومات الشخصية */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-[#D4AF37]">
                      المعلومات الشخصية
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#B8860B]">
                        الاسم الكامل *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="أدخل الاسم الكامل"
                        disabled={saving}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationalId" className="text-[#B8860B]">
                        رقم الهوية
                      </Label>
                      <Input
                        id="nationalId"
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleInputChange}
                        placeholder="أدخل رقم الهوية"
                        disabled={saving}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-[#B8860B]">
                        اسم الشركة (اختياري)
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="أدخل اسم الشركة"
                        disabled={saving}
                      />
                    </div>
                  </div>

                  {/* معلومات الاتصال */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-[#D4AF37]">
                      معلومات الاتصال
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#B8860B]">
                        رقم الهاتف *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-3 h-4 w-4 text-[#D4AF37]" />
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+966501234567"
                          className="pr-10"
                          disabled={saving}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#B8860B]">
                        البريد الإلكتروني *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-3 h-4 w-4 text-[#D4AF37]" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="example@email.com"
                          className="pr-10"
                          disabled={saving}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-[#B8860B]">
                        العنوان
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute right-3 top-3 h-4 w-4 text-[#D4AF37]" />
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="أدخل العنوان الكامل"
                          className="pr-10"
                          disabled={saving}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* الملاحظات */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#D4AF37]">
                    ملاحظات إضافية
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-[#B8860B]">
                      ملاحظات حول العميل
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="أدخل أي ملاحظات مهمة حول العميل..."
                      rows={4}
                      disabled={saving}
                    />
                  </div>
                </div>

                <Separator />

                {/* الحالة */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold text-[#D4AF37]">
                      حالة العميل
                    </h4>
                    <p className="text-sm text-[#B8860B]">
                      {formData.isActive
                        ? "العميل نشط ويمكن التعامل معه"
                        : "العميل غير نشط ولن يظهر في القوائم"}
                    </p>
                  </div>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={handleSwitchChange}
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
                <CardTitle className="text-lg text-[#D4AF37]">
                  معلومات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#B8860B] font-medium">
                    تاريخ التسجيل:
                  </span>
                  <span className="font-medium text-[#D4AF37]">
                    {new Date(client.createdAt).toLocaleDateString("ar-SA")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#B8860B] font-medium">آخر تحديث:</span>
                  <span className="font-medium text-[#D4AF37]">
                    {new Date().toLocaleDateString("ar-SA")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#B8860B] font-medium">
                    عدد القضايا:
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-[#D4AF37] bg-amber-50 border-amber-200"
                  >
                    {client.cases.length}
                  </Badge>
                </div>
                <Separator />
                <div className="text-xs text-[#B8860B]">
                  <p>سيتم تحديث تاريخ التعديل تلقائياً عند حفظ التغييرات.</p>
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
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={saving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
                <Link href={`/admin/clients/${client._id}`} className="block">
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={saving}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    العودة للتفاصيل
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* التحذيرات */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-lg text-amber-900">
                  تنبيهات مهمة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-amber-800">
                <p>• تأكد من صحة المعلومات قبل الحفظ</p>
                <p>• الحقول marked with * إلزامية</p>
                <p>• سيتم تحديث سجل العميل تلقائياً</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
