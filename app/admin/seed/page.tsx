"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSeed = async () => {
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/seed", { method: "POST" })
      const data = await res.json()
      setMessage(data.message)
    } catch (error) {
      setMessage("حدث خطأ أثناء رفع البيانات")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">رفع البيانات الوهمية</h1>
      <Button onClick={handleSeed} disabled={loading} className="bg-amber-600 hover:bg-amber-700">
        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "إنشاء البيانات"}
      </Button>
      {message && <p className="text-slate-700 mt-2">{message}</p>}
    </div>
  )
}
