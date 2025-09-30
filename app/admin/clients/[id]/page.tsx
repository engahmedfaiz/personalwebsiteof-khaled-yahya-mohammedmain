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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ArrowRight,
  Plus,
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  IdCard,
  Save,
  ArrowLeft,
  Users,
} from "lucide-react";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clientType, setClientType] = useState<"individual" | "company">(
    "individual"
  );
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: clientType,
        }),
      });

      if (res.ok) {
        alert("تم إنشاء العميل بنجاح");
        router.push("/admin/clients");
      } else {
        throw new Error("فشل في إنشاء العميل");
      }
    } catch (error) {
      console.error("Error creating client:", error);
      alert("حدث خطأ أثناء إنشاء العميل");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link
                  href="/admin"
                  className="hover:text-green-600 transition-colors"
                >
                  لوحة التحكم
                </Link>
                <ArrowRight className="h-4 w-4" />
                <Link
                  href="/admin/clients"
                  className="hover:text-green-600 transition-colors"
                >
                  إدارة العملاء
                </Link>
                <ArrowRight className="h-4 w-4" />
                <span className="text-green-600 font-bold">عميل جديد</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-6 w-6 text-green-600" />
                إنشاء عميل جديد
              </h1>
              <p className="text-gray-600">
                أضف عميلاً جديداً إلى نظام إدارة العملاء
              </p>
            </div>
            <Link href="/admin/clients">
              <Button variant="outline" className="border-gray-300">
                <ArrowLeft className="h-4 w-4 ml-2" />
                رجوع للقائمة
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-6 lg:py-8">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
              <Plus className="h-5 w-5 text-green-500" />
              معلومات العميل الأساسية
            </CardTitle>
            <CardDescription>
              أدخل المعلومات الأساسية للعميل الجديد
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    نوع العميل
                  </Label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setClientType("individual")}
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        clientType === "individual"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 bg-white text-gray-600 hover:border-green-300"
                      }`}
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">فرد</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setClientType("company")}
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        clientType === "company"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 bg-white text-gray-600 hover:border-green-300"
                      }`}
                    >
                      <Building className="h-5 w-5" />
                      <span className="font-medium">شركة</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <Label
                    htmlFor="isActive"
                    className="text-sm font-medium text-gray-700"
                  >
                    حالة العميل
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {formData.isActive ? "نشط" : "غير نشط"}
                    </span>
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        handleInputChange("isActive", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Personal/Company Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <User className="h-4 w-4 text-gray-500" />
                    {clientType === "individual"
                      ? "اسم العميل *"
                      : "اسم الشركة *"}
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={
                      clientType === "individual"
                        ? "أدخل اسم العميل"
                        : "أدخل اسم الشركة"
                    }
                    className="bg-white border-gray-300"
                  />
                </div>

                {clientType === "company" && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Building className="h-4 w-4 text-gray-500" />
                      اسم الشركة بالكامل *
                    </Label>
                    <Input
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      placeholder="أدخل اسم الشركة بالكامل"
                      className="bg-white border-gray-300"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4 text-gray-500" />
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@email.com"
                    className="bg-white border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4 text-gray-500" />
                    رقم الهاتف *
                  </Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    className="bg-white border-gray-300"
                  />
                </div>

                {clientType === "individual" && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="nationalId"
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <IdCard className="h-4 w-4 text-gray-500" />
                      رقم الهوية الوطنية
                    </Label>
                    <Input
                      id="nationalId"
                      value={formData.nationalId}
                      onChange={(e) =>
                        handleInputChange("nationalId", e.target.value)
                      }
                      placeholder="10 أرقام"
                      className="bg-white border-gray-300"
                    />
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-gray-500" />
                  العنوان
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="أدخل العنوان الكامل..."
                  rows={3}
                  className="bg-white border-gray-300 resize-none"
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label
                  htmlFor="notes"
                  className="text-sm font-medium text-gray-700"
                >
                  ملاحظات إضافية
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="أي ملاحظات إضافية حول العميل..."
                  rows={4}
                  className="bg-white border-gray-300 resize-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <Link href="/admin/clients" className="flex-1 sm:flex-initial">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-300"
                    disabled={loading}
                  >
                    إلغاء
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="flex-1 sm:flex-initial bg-green-600 hover:bg-green-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 ml-2" />
                      حفظ العميل
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="bg-white border border-gray-200 mt-6">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-sm text-gray-900 flex items-center gap-2">
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
                <span>تأكد من صحة رقم الهاتف والبريد الإلكتروني</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span>يمكنك تغيير حالة العميل من نشط إلى غير نشط لاحقاً</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span>أضف ملاحظات واضحة لتسهيل المتابعة لاحقاً</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
