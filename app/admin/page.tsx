// "use client"

// import AdminLayout from "@/components/layouts/AdminLayout"

// export default function AdminDashboardPage() {
//   return (
//     <AdminLayout>
//       <h1>مرحبًا بك</h1>
//     </AdminLayout>
//   )
// }

import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/dashboard");
}
