// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Plus,
//   Search,
//   Filter,
//   Eye,
//   Edit,
//   Trash2,
//   Users,
//   Phone,
//   Mail,
//   Building,
//   ArrowRight,
//   BarChart3,
//   Sparkles,
//   X,
//   ChevronDown,
//   ChevronUp,
//   User,
//   Briefcase,
// } from "lucide-react";

// // تعريف نوع العميل
// interface Client {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   nationalId: string;
//   company: string;
//   notes: string;
//   cases: string[];
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export const dynamic = "force-dynamic";

// export default function ClientsPage() {
//   const [clients, setClients] = useState<Client[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [typeFilter, setTypeFilter] = useState<string>("all");
//   const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");
//   const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

//   // استخدام الإحصائيات المطلوبة بدلاً من الحساب
//   const [stats] = useState({
//     total: 67,
//     active: 58,
//     inactive: 9,
//     individuals: 45,
//     companies: 22,
//     totalCases: 145,
//   });

//   // كشف حجم الشاشة بدقة
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const width = window.innerWidth;
//       if (width < 768) {
//         setScreenSize("mobile");
//       } else if (width >= 768 && width < 1024) {
//         setScreenSize("tablet");
//       } else {
//         setScreenSize("desktop");
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         // Mock data - في التطبيق الحقيقي، سيتم جلب البيانات من API
//         const mockClients: Client[] = [
//           {
//             _id: "1",
//             name: "أحمد محمد السعد",
//             email: "ahmed.saad@email.com",
//             phone: "+966501234567",
//             address: "الرياض، حي النخيل، شارع الملك فهد",
//             nationalId: "1234567890",
//             company: "",
//             notes: "عميل مميز، يحتاج متابعة دورية",
//             cases: ["case1", "case2"],
//             isActive: true,
//             createdAt: new Date("2024-01-10"),
//             updatedAt: new Date("2024-01-15"),
//           },
//           {
//             _id: "2",
//             name: "شركة النور للتجارة",
//             email: "info@alnoor-trading.com",
//             phone: "+966112345678",
//             address: "جدة، حي الحمراء، طريق الملك عبدالعزيز",
//             nationalId: "",
//             company: "شركة النور للتجارة",
//             notes: "شركة تجارية كبيرة، تحتاج خدمات قانونية متنوعة",
//             cases: ["case3"],
//             isActive: true,
//             createdAt: new Date("2024-02-01"),
//             updatedAt: new Date("2024-02-05"),
//           },
//           {
//             _id: "3",
//             name: "فاطمة علي الزهراني",
//             email: "fatima.alzahrani@email.com",
//             phone: "+966503456789",
//             address: "الدمام، حي الشاطئ، شارع الأمير محمد",
//             nationalId: "9876543210",
//             company: "",
//             notes: "قضية أحوال شخصية، تحتاج تعامل حساس",
//             cases: ["case4"],
//             isActive: true,
//             createdAt: new Date("2023-12-15"),
//             updatedAt: new Date("2024-01-30"),
//           },
//           {
//             _id: "4",
//             name: "محمد عبدالله القحطاني",
//             email: "mohammed.alqahtani@email.com",
//             phone: "+966504567890",
//             address: "الخبر، حي العليا، شارع الظهران",
//             nationalId: "5678901234",
//             company: "",
//             notes: "عميل سابق، غير نشط حالياً",
//             cases: [],
//             isActive: false,
//             createdAt: new Date("2023-11-20"),
//             updatedAt: new Date("2023-12-01"),
//           },
//           {
//             _id: "5",
//             name: "شركة التقنية المتطورة",
//             email: "contact@tech-advanced.com",
//             phone: "+966113456789",
//             address: "الرياض، حي العليا، طريق العروبة",
//             nationalId: "",
//             company: "شركة التقنية المتطورة",
//             notes: "شركة ناشئة في مجال التقنية",
//             cases: ["case5", "case6", "case7"],
//             isActive: true,
//             createdAt: new Date("2024-03-01"),
//             updatedAt: new Date("2024-03-10"),
//           },
//           {
//             _id: "6",
//             name: "سارة أحمد المحمد",
//             email: "sara.almohammed@email.com",
//             phone: "+966505678901",
//             address: "الرياض، حي المصيف، شارع الثلاثين",
//             nationalId: "3456789012",
//             company: "",
//             notes: "عميلة جديدة، تحتاج متابعة",
//             cases: ["case8"],
//             isActive: true,
//             createdAt: new Date("2024-03-15"),
//             updatedAt: new Date("2024-03-20"),
//           },
//         ];

//         setClients(mockClients);
//       } catch (error) {
//         console.error("خطأ أثناء جلب العملاء:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClients();
//   }, []);

//   // دالة لحذف العميل
//   const handleDeleteClient = async (clientId: string) => {
//     if (confirm("هل أنت متأكد من أنك تريد حذف هذا العميل؟")) {
//       try {
//         const res = await fetch(`/api/clients/${clientId}`, {
//           method: "DELETE",
//         });

//         if (res.ok) {
//           setClients(clients.filter((client) => client._id !== clientId));
//           alert("تم حذف العميل بنجاح");
//         } else {
//           throw new Error("فشل في حذف العميل");
//         }
//       } catch (error) {
//         console.error("Error deleting client:", error);
//         alert("حدث خطأ أثناء حذف العميل");
//       }
//     }
//   };

//   const getStatusVariant = (isActive: boolean) => {
//     return isActive
//       ? {
//           bg: "bg-gradient-to-r from-emerald-50 to-green-50",
//           border: "border-emerald-200",
//           text: "text-emerald-700",
//           icon: "bg-emerald-500",
//           label: "نشط",
//         }
//       : {
//           bg: "bg-gradient-to-r from-red-50 to-pink-50",
//           border: "border-red-200",
//           text: "text-red-700",
//           icon: "bg-red-500",
//           label: "غير نشط",
//         };
//   };

//   const getClientTypeStyle = (client: Client) => {
//     return client.company
//       ? {
//           bg: "bg-gradient-to-r from-purple-50 to-violet-50",
//           border: "border-purple-200",
//           text: "text-purple-700",
//           icon: "bg-purple-500",
//           label: "شركة",
//           iconComponent: Building,
//         }
//       : {
//           bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
//           border: "border-blue-200",
//           text: "text-blue-700",
//           icon: "bg-blue-500",
//           label: "فرد",
//           iconComponent: User,
//         };
//   };

//   const getCasesCountStyle = (count: number) => {
//     if (count === 0) {
//       return {
//         bg: "bg-gradient-to-r from-gray-50 to-slate-50",
//         border: "border-gray-200",
//         text: "text-gray-700",
//         label: "لا توجد قضايا",
//       };
//     } else if (count <= 2) {
//       return {
//         bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
//         border: "border-amber-200",
//         text: "text-amber-700",
//         label: `${count} قضايا`,
//       };
//     } else {
//       return {
//         bg: "bg-gradient-to-r from-orange-50 to-red-50",
//         border: "border-orange-200",
//         text: "text-orange-700",
//         label: `${count} قضايا`,
//       };
//     }
//   };

//   const getAvatarFallback = (name: string, isCompany: boolean) => {
//     if (isCompany) {
//       return <Briefcase className="h-4 w-4" />;
//     }
//     return name.charAt(0);
//   };

//   const filteredClients = clients.filter((client) => {
//     const matchesSearch =
//       client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client.phone.includes(searchTerm) ||
//       (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()));

//     const matchesStatus =
//       statusFilter === "all" ||
//       (statusFilter === "active" && client.isActive) ||
//       (statusFilter === "inactive" && !client.isActive);

//     const matchesType =
//       typeFilter === "all" ||
//       (typeFilter === "individual" && !client.company) ||
//       (typeFilter === "company" && client.company);

//     return matchesSearch && matchesStatus && matchesType;
//   });

//   // Mobile Filter Component
//   const MobileFilters = () => (
//     <div className="lg:hidden space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
//       <div className="grid grid-cols-2 gap-3">
//         <Select value={typeFilter} onValueChange={setTypeFilter}>
//           <SelectTrigger className="bg-white border-gray-300 text-sm">
//             <SelectValue placeholder="نوع العميل" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">جميع الأنواع</SelectItem>
//             <SelectItem value="individual">أفراد</SelectItem>
//             <SelectItem value="company">شركات</SelectItem>
//           </SelectContent>
//         </Select>

//         <Select value={statusFilter} onValueChange={setStatusFilter}>
//           <SelectTrigger className="bg-white border-gray-300 text-sm">
//             <SelectValue placeholder="الحالة" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">جميع الحالات</SelectItem>
//             <SelectItem value="active">نشط</SelectItem>
//             <SelectItem value="inactive">غير نشط</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="flex gap-2">
//         <Button
//           variant="outline"
//           size="sm"
//           className="flex-1"
//           onClick={() => setShowMobileFilters(false)}
//         >
//           <X className="h-4 w-4 ml-1" />
//           إغلاق
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           className="flex-1"
//           onClick={() => {
//             setSearchTerm("");
//             setStatusFilter("all");
//             setTypeFilter("all");
//           }}
//         >
//           إعادة التعيين
//         </Button>
//       </div>
//     </div>
//   );

//   // تصميم مختلف لكل حجم شاشة
//   const renderClients = () => {
//     if (screenSize === "mobile") {
//       return (
//         <div className="space-y-3">
//           {filteredClients.map((client) => {
//             const status = getStatusVariant(client.isActive);
//             const clientType = getClientTypeStyle(client);
//             const casesStyle = getCasesCountStyle(client.cases.length);

//             return (
//               <Card
//                 key={client._id}
//                 className="bg-white border border-gray-200 shadow-xs rounded-xl"
//               >
//                 <CardContent className="p-3">
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-2">
//                       <Avatar className="w-10 h-10 border border-gray-200">
//                         <AvatarImage src="/placeholder.svg" alt={client.name} />
//                         <AvatarFallback className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-sm">
//                           {getAvatarFallback(client.name, !!client.company)}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div
//                         className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${status.bg} ${status.border} ${status.text}`}
//                       >
//                         <div
//                           className={`w-1.5 h-1.5 ${status.icon} rounded-full mr-1`}
//                         ></div>
//                         {status.label}
//                       </div>
//                     </div>
//                     <div className="flex gap-1">
//                       <Link href={`/admin/clients/${client._id}`}>
//                         <Button
//                           size="sm"
//                           className="h-7 w-7 p-0 bg-blue-50 text-blue-600 border border-blue-200"
//                         >
//                           <Eye className="h-3 w-3" />
//                         </Button>
//                       </Link>
//                       <Link href={`/admin/clients/${client._id}/edit`}>
//                         <Button
//                           size="sm"
//                           className="h-7 w-7 p-0 bg-green-50 text-green-600 border border-green-200"
//                         >
//                           <Edit className="h-3 w-3" />
//                         </Button>
//                       </Link>
//                       <Button
//                         size="sm"
//                         className="h-7 w-7 p-0 bg-red-50 text-red-600 border border-red-200"
//                         onClick={() => handleDeleteClient(client._id)}
//                       >
//                         <Trash2 className="h-3 w-3" />
//                       </Button>
//                     </div>
//                   </div>

//                   <h3 className="font-semibold text-sm mb-1 line-clamp-1 text-gray-900">
//                     {client.name}
//                   </h3>
//                   {client.company && (
//                     <p className="text-xs text-gray-600 mb-2 line-clamp-1">
//                       {client.company}
//                     </p>
//                   )}

//                   <div className="flex items-center justify-between mb-2">
//                     <div
//                       className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${clientType.bg} ${clientType.border} ${clientType.text}`}
//                     >
//                       <clientType.iconComponent className="h-3 w-3 mr-1" />
//                       {clientType.label}
//                     </div>
//                     <div
//                       className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${casesStyle.bg} ${casesStyle.border} ${casesStyle.text}`}
//                     >
//                       {casesStyle.label}
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center text-xs text-gray-500">
//                     <div className="flex items-center gap-1">
//                       <Phone className="h-3 w-3" />
//                       <span>{client.phone}</span>
//                     </div>
//                     <div className="text-left">
//                       {new Date(client.createdAt).toLocaleDateString("ar-SA")}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       );
//     } else if (screenSize === "tablet") {
//       return (
//         <div className="w-full overflow-x-auto">
//           <Table className="w-full min-w-[600px]">
//             <TableHeader className="bg-gray-50">
//               <TableRow>
//                 <TableHead className="w-[40%] py-3 text-xs font-medium text-gray-700">
//                   العميل
//                 </TableHead>
//                 <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
//                   النوع
//                 </TableHead>
//                 <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
//                   القضايا
//                 </TableHead>
//                 <TableHead className="w-[20%] py-3 text-xs font-medium text-gray-700 text-center">
//                   الإجراءات
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredClients.map((client) => {
//                 const status = getStatusVariant(client.isActive);
//                 const clientType = getClientTypeStyle(client);

//                 return (
//                   <TableRow
//                     key={client._id}
//                     className="border-b border-gray-100 hover:bg-gray-50"
//                   >
//                     <TableCell className="py-3">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="w-10 h-10 border border-gray-200">
//                           <AvatarImage src="/placeholder.svg" alt={client.name} />
//                           <AvatarFallback className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-sm">
//                             {getAvatarFallback(client.name, !!client.company)}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="min-w-0 flex-1">
//                           <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">
//                             {client.name}
//                           </h4>
//                           {client.company && (
//                             <div className="text-xs text-gray-500 line-clamp-1">
//                               {client.company}
//                             </div>
//                           )}
//                           <div className="text-xs text-gray-500">
//                             {client.phone}
//                           </div>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="py-3 text-center">
//                       <div
//                         className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${clientType.bg} ${clientType.border} ${clientType.text}`}
//                       >
//                         <clientType.iconComponent className="h-3 w-3 mr-1" />
//                         {clientType.label}
//                       </div>
//                     </TableCell>
//                     <TableCell className="py-3 text-center">
//                       <div
//                         className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getCasesCountStyle(client.cases.length).bg} ${getCasesCountStyle(client.cases.length).border} ${getCasesCountStyle(client.cases.length).text}`}
//                       >
//                         {getCasesCountStyle(client.cases.length).label}
//                       </div>
//                     </TableCell>
//                     <TableCell className="py-3 text-center">
//                       <div className="flex justify-center gap-1">
//                         <Link href={`/admin/clients/${client._id}`}>
//                           <Button
//                             size="sm"
//                             className="h-7 w-7 p-0 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
//                           >
//                             <Eye className="h-3 w-3" />
//                           </Button>
//                         </Link>
//                         <Link href={`/admin/clients/${client._id}/edit`}>
//                           <Button
//                             size="sm"
//                             className="h-7 w-7 p-0 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
//                           >
//                             <Edit className="h-3 w-3" />
//                           </Button>
//                         </Link>
//                         <Button
//                           size="sm"
//                           className="h-7 w-7 p-0 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
//                           onClick={() => handleDeleteClient(client._id)}
//                         >
//                           <Trash2 className="h-3 w-3" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </div>
//       );
//     } else {
//       return (
//         <div className="w-full overflow-x-auto">
//           <Table className="w-full min-w-[800px]">
//             <TableHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
//               <TableRow>
//                 <TableHead className="w-[25%] py-4 text-sm font-semibold text-green-900">
//                   العميل
//                 </TableHead>
//                 <TableHead className="w-[15%] py-4 text-sm font-semibold text-green-900 text-center">
//                   النوع
//                 </TableHead>
//                 <TableHead className="w-[15%] py-4 text-sm font-semibold text-green-900 text-center">
//                   الاتصال
//                 </TableHead>
//                 <TableHead className="w-[10%] py-4 text-sm font-semibold text-green-900 text-center">
//                   القضايا
//                 </TableHead>
//                 <TableHead className="w-[10%] py-4 text-sm font-semibold text-green-900 text-center">
//                   الحالة
//                 </TableHead>
//                 <TableHead className="w-[15%] py-4 text-sm font-semibold text-green-900 text-center">
//                   الإجراءات
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredClients.map((client) => {
//                 const status = getStatusVariant(client.isActive);
//                 const clientType = getClientTypeStyle(client);

//                 return (
//                   <TableRow
//                     key={client._id}
//                     className="border-b border-gray-100 hover:bg-gray-50"
//                   >
//                     <TableCell className="py-4">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="w-12 h-12 border border-gray-200">
//                           <AvatarImage src="/placeholder.svg" alt={client.name} />
//                           <AvatarFallback className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600">
//                             {getAvatarFallback(client.name, !!client.company)}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="min-w-0 flex-1">
//                           <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">
//                             {client.name}
//                           </h4>
//                           {client.company && (
//                             <p className="text-xs text-gray-600 line-clamp-1">
//                               {client.company}
//                             </p>
//                           )}
//                           <p className="text-xs text-gray-500 line-clamp-2">
//                             {client.address}
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="py-4 text-center">
//                       <div
//                         className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${clientType.bg} ${clientType.border} ${clientType.text}`}
//                       >
//                         <clientType.iconComponent className="h-3 w-3 mr-2" />
//                         {clientType.label}
//                       </div>
//                     </TableCell>
//                     <TableCell className="py-4 text-center">
//                       <div className="space-y-1">
//                         <div className="text-sm text-gray-700">{client.phone}</div>
//                         <div className="text-xs text-gray-500">{client.email}</div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="py-4 text-center">
//                       <div
//                         className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getCasesCountStyle(client.cases.length).bg} ${getCasesCountStyle(client.cases.length).border} ${getCasesCountStyle(client.cases.length).text}`}
//                       >
//                         {getCasesCountStyle(client.cases.length).label}
//                       </div>
//                     </TableCell>
//                     <TableCell className="py-4 text-center">
//                       <div
//                         className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${status.bg} ${status.border} ${status.text}`}
//                       >
//                         <div
//                           className={`w-2 h-2 ${status.icon} rounded-full mr-2`}
//                         ></div>
//                         {status.label}
//                       </div>
//                     </TableCell>
//                     <TableCell className="py-4 text-center">
//                       <div className="flex justify-center gap-2">
//                         <Link href={`/admin/clients/${client._id}`}>
//                           <Button
//                             size="sm"
//                             className="h-8 w-8 p-0 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
//                           >
//                             <Eye className="h-3 w-3" />
//                           </Button>
//                         </Link>
//                         <Link href={`/admin/clients/${client._id}/edit`}>
//                           <Button
//                             size="sm"
//                             className="h-8 w-8 p-0 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
//                           >
//                             <Edit className="h-3 w-3" />
//                           </Button>
//                         </Link>
//                         <Button
//                           size="sm"
//                           className="h-8 w-8 p-0 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
//                           onClick={() => handleDeleteClient(client._id)}
//                         >
//                           <Trash2 className="h-3 w-3" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </div>
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white p-4 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
//           <p className="text-gray-700">جاري تحميل العملاء...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//             <div className="space-y-2">
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <Link
//                   href="/admin"
//                   className="hover:text-green-600 transition-colors"
//                 >
//                   لوحة التحكم
//                 </Link>
//                 <ArrowRight className="h-4 w-4" />
//                 <span className="text-green-600 font-bold">إدارة العملاء</span>
//               </div>
//               <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2">
//                 <Users className="h-6 w-6 text-green-600" />
//                 إدارة العملاء
//               </h1>
//               <p className="text-gray-600">
//                 إدارة جميع العملاء والشركات المسجلة في النظام
//               </p>
//             </div>
//             <Link href="/admin/clients/new">
//               <Button className="bg-green-600 hover:bg-green-700 text-white transition-colors">
//                 <Plus className="h-4 w-4 ml-2" />
//                 عميل جديد
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 lg:py-6">
//         {/* Stats Grid */}
//         <div
//           className={`grid gap-3 mb-6 ${
//             screenSize === "mobile"
//               ? "grid-cols-2"
//               : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
//           }`}
//         >
//           {[
//             {
//               label: "إجمالي العملاء",
//               value: stats.total,
//               icon: Users,
//               color: "text-green-600",
//               bg: "bg-green-100",
//             },
//             {
//               label: "العملاء النشطون",
//               value: stats.active,
//               icon: User,
//               color: "text-blue-600",
//               bg: "bg-blue-100",
//             },
//             {
//               label: "العملاء غير النشطين",
//               value: stats.inactive,
//               icon: Users,
//               color: "text-red-600",
//               bg: "bg-red-100",
//             },
//             {
//               label: "الأفراد",
//               value: stats.individuals,
//               icon: User,
//               color: "text-amber-600",
//               bg: "bg-amber-100",
//             },
//             {
//               label: "الشركات",
//               value: stats.companies,
//               icon: Building,
//               color: "text-purple-600",
//               bg: "bg-purple-100",
//             },
//             {
//               label: "إجمالي القضايا",
//               value: stats.totalCases,
//               icon: Briefcase,
//               color: "text-cyan-600",
//               bg: "bg-cyan-100",
//             },
//           ].map((stat, idx) => (
//             <Card
//               key={idx}
//               className="bg-white border border-gray-200 shadow-xs"
//             >
//               <CardContent className="p-3 lg:p-4 flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-600 text-xs lg:text-sm mb-1">
//                     {stat.label}
//                   </p>
//                   <p className={`text-lg lg:text-xl font-bold ${stat.color}`}>
//                     {stat.value}
//                   </p>
//                 </div>
//                 <div className={`p-2 ${stat.bg} rounded-lg`}>
//                   <stat.icon
//                     className={`h-4 w-4 lg:h-5 lg:w-5 ${stat.color}`}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Filters Section */}
//         <Card className="bg-white border border-gray-200 mb-6">
//           <CardHeader className="bg-green-50 border-b border-green-100">
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
//                 <Sparkles className="h-5 w-5 text-green-500" />
//                 البحث والتصفية المتقدم
//               </CardTitle>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="lg:hidden"
//                 onClick={() => setShowMobileFilters(!showMobileFilters)}
//               >
//                 <Filter className="h-4 w-4 ml-1" />
//                 الفلاتر
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent className="p-4 lg:p-6">
//             {/* Mobile Search */}
//             <div className="lg:hidden mb-4">
//               <div className="relative">
//                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="ابحث في العملاء..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pr-10 border-gray-300"
//                 />
//               </div>
//             </div>

//             {/* Desktop Filters */}
//             <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-4">
//               <div className="lg:col-span-2">
//                 <div className="relative">
//                   <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     placeholder="ابحث في العملاء..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pr-10 bg-white border-gray-300"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Select value={typeFilter} onValueChange={setTypeFilter}>
//                   <SelectTrigger className="bg-white border-gray-300">
//                     <SelectValue placeholder="نوع العميل" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">جميع الأنواع</SelectItem>
//                     <SelectItem value="individual">أفراد</SelectItem>
//                     <SelectItem value="company">شركات</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                   <SelectTrigger className="bg-white border-gray-300">
//                     <SelectValue placeholder="الحالة" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">جميع الحالات</SelectItem>
//                     <SelectItem value="active">نشط</SelectItem>
//                     <SelectItem value="inactive">غير نشط</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Mobile Filters */}
//             {showMobileFilters && <MobileFilters />}

//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center gap-2">
//                 <BarChart3 className="h-5 w-5 text-green-500" />
//                 <span className="text-sm text-gray-700">
//                   عرض {filteredClients.length} من أصل {clients.length} عميل
//                 </span>
//               </div>
//               <div className="flex gap-2 w-full lg:w-auto">
//                 <Button
//                   variant="outline"
//                   className="hidden lg:flex bg-green-600 text-white hover:bg-green-700 border-green-600"
//                   size="sm"
//                 >
//                   <Filter className="h-4 w-4 ml-2" />
//                   تصفية متقدمة
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="flex-1 lg:flex-initial"
//                   size="sm"
//                   onClick={() => {
//                     setSearchTerm("");
//                     setStatusFilter("all");
//                     setTypeFilter("all");
//                     setShowMobileFilters(false);
//                   }}
//                 >
//                   إعادة التعيين
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Clients List */}
//         <Card className="bg-white border border-gray-200">
//           <CardHeader className="bg-green-50 border-b border-green-100">
//             <CardTitle className="text-lg text-gray-900">
//               قائمة العملاء ({filteredClients.length})
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-3 lg:p-0">
//             {filteredClients.length === 0 ? (
//               <div className="text-center py-8">
//                 <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600">لا توجد عملاء مطابقين للبحث</p>
//               </div>
//             ) : (
//               renderClients()
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Construction,
  ArrowRight,
  Users,
  User,
  Building,
  Briefcase,
  Phone,
  Mail,
  Star,
  Settings,
  Sparkles,
} from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* الهيدر */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl shadow-2xl">
                <Users className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Construction className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 animate-bounce" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            نظام إدارة العملاء
            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              قيد التطوير
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 mb-6 max-w-2xl mx-auto">
            نحن نعمل على تطوير نظام متكامل لإدارة العملاء والشركات
          </p>

          {/* شارة الحالة */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg inline-block">
            <div className="flex items-center gap-3 text-slate-700">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-bold">جاري تطوير النظام</span>
            </div>
          </div>
        </div>

        {/* البطاقة الرئيسية */}
        <Card className="w-full shadow-2xl border-green-200 bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-6 sm:p-8">
            {/* حالة التطوير */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                  حالة التطوير
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      name: "تصميم واجهة العملاء",
                      status: "مكتمل",
                      color: "bg-green-500",
                      percentage: 100,
                    },
                    {
                      name: "نظام إدارة البيانات",
                      status: "مكتمل",
                      color: "bg-green-500",
                      percentage: 100,
                    },
                    {
                      name: "إدارة الملفات الشخصية",
                      status: "قيد العمل",
                      color: "bg-yellow-500",
                      percentage: 80,
                    },
                    {
                      name: "التكامل مع القضايا",
                      status: "قيد العمل",
                      color: "bg-yellow-500",
                      percentage: 65,
                    },
                    {
                      name: "التقارير والإحصائيات",
                      status: "قريباً",
                      color: "bg-blue-500",
                      percentage: 25,
                    },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base font-medium text-slate-700">
                          {item.name}
                        </span>
                        <Badge
                          className={`${
                            item.color === "bg-green-500"
                              ? "bg-green-100 text-green-800"
                              : item.color === "bg-yellow-500"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          } text-xs sm:text-sm`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* الميزات القادمة */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Star className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
                  الميزات القادمة
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    {
                      icon: Users,
                      name: "إدارة العملاء",
                      color: "bg-green-50 text-green-600",
                      desc: "نظام متكامل لإدارة بيانات العملاء",
                    },
                    {
                      icon: Building,
                      name: "الشركات",
                      color: "bg-purple-50 text-purple-600",
                      desc: "إدارة بيانات الشركات والمؤسسات",
                    },
                    {
                      icon: Briefcase,
                      name: "ربط القضايا",
                      color: "bg-blue-50 text-blue-600",
                      desc: "ربط العملاء بالقضايا والمتابعة",
                    },
                    {
                      icon: User,
                      name: "ملفات شخصية",
                      color: "bg-amber-50 text-amber-600",
                      desc: "ملفات شخصية متكاملة للعملاء",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`${item.color} p-3 sm:p-4 rounded-xl border transition-all hover:scale-105 hover:shadow-md`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white rounded-lg">
                          <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <span className="text-sm sm:text-base font-medium">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 pr-10">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* معاينة النظام */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="font-bold text-slate-800 mb-4 text-lg sm:text-xl">
                معاينة نظام العملاء
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {/* بطاقات إحصائية معاينة */}
                {[
                  {
                    label: "إجمالي العملاء",
                    value: "٠",
                    color: "text-green-600",
                    bg: "bg-green-100",
                    icon: Users,
                  },
                  {
                    label: "العملاء النشطون",
                    value: "٠",
                    color: "text-blue-600",
                    bg: "bg-blue-100",
                    icon: User,
                  },
                  {
                    label: "العملاء غير النشطين",
                    value: "٠",
                    color: "text-red-600",
                    bg: "bg-red-100",
                    icon: Users,
                  },
                  {
                    label: "الأفراد",
                    value: "٠",
                    color: "text-amber-600",
                    bg: "bg-amber-100",
                    icon: User,
                  },
                  {
                    label: "الشركات",
                    value: "٠",
                    color: "text-purple-600",
                    bg: "bg-purple-100",
                    icon: Building,
                  },
                  {
                    label: "إجمالي القضايا",
                    value: "٠",
                    color: "text-cyan-600",
                    bg: "bg-cyan-100",
                    icon: Briefcase,
                  },
                ].map((stat, idx) => (
                  <Card
                    key={idx}
                    className="bg-white border border-gray-200 shadow-xs"
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-xs mb-1">
                          {stat.label}
                        </p>
                        <p className={`text-lg font-bold ${stat.color}`}>
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-2 ${stat.bg} rounded-lg`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* رسالة ترحيبية */}
            <div className="text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                نظام إدارة العملاء قادم قريباً!
              </h3>
              <p className="text-xl sm:text-2xl font-bold mb-4">
                سهولة في إدارة جميع عملائك وشركاتك
              </p>
              <p className="text-green-100 text-sm sm:text-base">
                سيكون بإمكانك إدارة بيانات العملاء، متابعة القضايا، وتنظيم
                المعلومات بكل كفاءة
              </p>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الاتصال والدعم */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">
                الدعم الفني
              </h3>
              <p className="text-green-600 font-mono text-sm sm:text-lg">
                +966 123 456 789
              </p>
              <p className="text-slate-500 text-xs mt-2">
                متاح خلال ساعات العمل
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">
                البريد الإلكتروني
              </h3>
              <p className="text-blue-600 text-sm sm:text-base">
                support@lawfirm.com
              </p>
              <p className="text-slate-500 text-xs mt-2">
                للأسئلة والاستفسارات
              </p>
            </CardContent>
          </Card>
        </div>

        {/* أزرار التحكم */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Button
            className="bg-green-600 hover:bg-green-700 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
            onClick={() => window.location.reload()}
          >
            <ArrowRight className="h-5 w-5 ml-2" />
            تحديث الصفحة
          </Button>

          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
            asChild
          >
            <Link href="/admin">
              <Users className="h-5 w-5 ml-2" />
              لوحة التحكم
            </Link>
          </Button>

          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
            asChild
          >
            <Link href="mailto:support@lawfirm.com">
              <Mail className="h-5 w-5 ml-2" />
              طلب دعم
            </Link>
          </Button>
        </div>

        {/* التذييل */}
        <div className="text-center mt-8 pt-6 border-t border-slate-200">
          <p className="text-slate-500 text-sm sm:text-base">
            © 2024 نظام إدارة العملاء - المكاتب القانونية
            <span className="block sm:inline-block mt-1 sm:mt-0 sm:mr-4">
              🚧 قيد التطوير - سيتم الإطلاق قريباً
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
