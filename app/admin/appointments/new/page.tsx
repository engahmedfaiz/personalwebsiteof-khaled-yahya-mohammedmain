"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function NewAppointmentPage() {
  const router = useRouter()

  const [date, setDate] = useState<Date | null>(new Date())
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    location: "",
    notes: "",
    status: "scheduled",
    clientId: "",
    lawyerId: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return

    setLoading(true)

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, date }),
    })

    if (res.ok) {
      router.push("/admin/appointments")
    } else {
      const error = await res.json()
      alert("فشل في إنشاء الموعد: " + error.error)
    }

    setLoading(false)
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>إنشاء موعد جديد</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>العنوان</Label>
            <Input name="title" value={form.title} onChange={handleChange} required />
          </div>

          <div>
            <Label>الوصف</Label>
            <Textarea name="description" value={form.description} onChange={handleChange} required />
          </div>

          <div>
            <Label>التاريخ والوقت</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "yyyy-MM-dd HH:mm") : "اختر التاريخ والوقت"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date || undefined} onSelect={setDate}   required={true} />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>المدة (دقائق)</Label>
            <Input type="number" name="duration" value={form.duration} onChange={handleChange} required />
          </div>

          <div>
            <Label>المكان</Label>
            <Input name="location" value={form.location} onChange={handleChange} required />
          </div>

          <div>
            <Label>ملاحظات</Label>
            <Textarea name="notes" value={form.notes} onChange={handleChange} />
          </div>

          <div>
            <Label>الحالة</Label>
            <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">مجدول</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
                <SelectItem value="rescheduled">معاد جدولته</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>رقم العميل (ID)</Label>
              <Input name="clientId" value={form.clientId} onChange={handleChange} required />
            </div>
            <div>
              <Label>رقم المحامي (ID)</Label>
              <Input name="lawyerId" value={form.lawyerId} onChange={handleChange} required />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? "جارٍ الحفظ..." : "إنشاء الموعد"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
