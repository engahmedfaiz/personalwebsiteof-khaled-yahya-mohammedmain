"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Scale, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface ConsultationFormProps {
  onSuccess?: () => void
}

export default function ConsultationFormComponent({ onSuccess }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/send-consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          caseType: "",
          message: "",
        })
        onSuccess?.()
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "حدث خطأ في إرسال الطلب",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30 hover:shadow-2xl transition-all duration-500">
      <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="relative">
            <Scale className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-l from-primary to-foreground bg-clip-text text-transparent">
            نموذج طلب استشارة
          </h3>
          <p className="text-muted-foreground text-pretty text-sm sm:text-base">
            املأ النموذج وسنتواصل معك في أقرب وقت لتقديم الاستشارة القانونية المناسبة
          </p>
        </div>

        {submitStatus.type && (
          <div
            className={`p-3 sm:p-4 rounded-lg border animate-in slide-in-from-top-2 duration-300 ${
              submitStatus.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {submitStatus.type === "success" ? (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="font-medium text-sm sm:text-base">{submitStatus.message}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-foreground">
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 hover:border-primary/40 text-sm sm:text-base"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-foreground">
                رقم الهاتف <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="أدخل رقم هاتفك"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 hover:border-primary/40 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 hover:border-primary/40 text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground">نوع القضية</label>
            <Input
              placeholder="مثال: قضية تجارية، استشارة قانونية، تحكيم، صياغة عقود..."
              value={formData.caseType}
              onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
              className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 hover:border-primary/40 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground">
              تفاصيل الاستشارة <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="اكتب تفاصيل قضيتك أو استشارتك هنا... كلما كانت التفاصيل أكثر دقة، كانت الاستشارة أكثر فعالية"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-background/50 border-primary/20 focus:border-primary resize-none transition-all duration-300 hover:border-primary/40 text-sm sm:text-base"
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02] group disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-2 sm:py-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 ml-2 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                إرسال طلب الاستشارة
              </>
            )}
          </Button>

          <div className="text-center text-xs sm:text-sm text-muted-foreground">
            <p>سنتواصل معك خلال 24 ساعة من إرسال الطلب</p>
          </div>
        </form>

        <div className="pt-4 sm:pt-6 border-t border-primary/20">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">تخصصاتنا القانونية:</p>
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors text-xs"
              >
                استشارات قانونية
              </Badge>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors text-xs"
              >
                تحكيم تجاري
              </Badge>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors text-xs"
              >
                مرافعة قضائية
              </Badge>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors text-xs"
              >
                صياغة قانونية
              </Badge>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors text-xs"
              >
                قانون تجاري
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
