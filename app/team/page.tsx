// // // "use client";
// // // import { Card, CardContent } from "@/components/ui/card";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Scale,
// // //   Gavel,
// // //   Shield,
// // //   Users,
// // //   Phone,
// // //   Mail,
// // //   Award,
// // //   GraduationCap,
// // //   Briefcase,
// // //   Star,
// // //   BookOpen,
// // //   MessageCircle,
// // //   ArrowLeft,
// // // } from "lucide-react";
// // // import Link from "next/link";

// // // export default function TeamPage() {
// // //   const teamMembers = [
// // //     {
// // //       name: "خالد يحيى محمد الناصر",
// // //       position: "المحامي الأستاذ والمدير",
// // //       image: "/khaled.png",
// // //       specializations: [
// // //         "القانون المدني",
// // //         "القانون التجاري",
// // //         "التحكيم الدولي",
// // //         "الشريعة الإسلامية",
// // //       ],
// // //       experience: "15+ سنة",
// // //       education: [
// // //         "ليسانس شريعة وقانون - جامعة صنعاء (2008)",
// // //         "دورة التحكيم التجاري الدولي - المركز العربي لإعداد المحكمين",
// // //         "دورة إدارة القضية والصياغة القانونية",
// // //       ],
// // //       achievements: [
// // //         "مترافع أمام المحكمة العليا",
// // //         "محكم تجاري دولي معتمد",
// // //         "عضو نقابة المحامين اليمنيين",
// // //         "نائب رئيس لجنة الرقابة والتفتيش",
// // //       ],
// // //       phone: "770461195",
// // //       email: "Khalid77791@gmail.com",
// // //       bio: "محامي ومستشار قانوني متخصص في الشريعة والقانون مع خبرة واسعة في التحكيم التجاري الدولي والمرافعة أمام المحاكم. يتمتع بسمعة طيبة في تقديم الاستشارات القانونية الشاملة وحل النزاعات بطرق مبتكرة وفعالة.",
// // //     },
// // //     {
// // //       name: "د. أحمد محمد الشامي",
// // //       position: "مستشار قانوني أول",
// // //       image: "/senior-arab-legal-consultant.jpg",
// // //       specializations: [
// // //         "القانون الإداري",
// // //         "قانون الاستثمار",
// // //         "القانون الدولي",
// // //         "قانون الشركات",
// // //       ],
// // //       experience: "12+ سنة",
// // //       education: [
// // //         "دكتوراه في القانون العام - جامعة القاهرة",
// // //         "ماجستير القانون الإداري - جامعة عين شمس",
// // //         "ليسانس حقوق - جامعة صنعاء",
// // //       ],
// // //       achievements: [
// // //         "خبير في قانون الاستثمار",
// // //         "مستشار قانوني لعدة شركات كبرى",
// // //         "محاضر في كلية الحقوق",
// // //         "مؤلف عدة كتب قانونية",
// // //       ],
// // //       phone: "773611056",
// // //       email: "ahmed.shami@example.com",
// // //       bio: "مستشار قانوني متخصص في القانون الإداري وقانون الاستثمار مع خبرة أكاديمية وعملية واسعة. يقدم استشارات متخصصة للشركات والمؤسسات الحكومية في مجال الاستثمار والقانون الإداري.",
// // //     },
// // //     {
// // //       name: "فاطمة علي الزهراني",
// // //       position: "محامية متخصصة في الأحوال الشخصية",
// // //       image: "/professional-arab-female-lawyer.jpg",
// // //       specializations: [
// // //         "قانون الأحوال الشخصية",
// // //         "قانون الأسرة",
// // //         "حقوق المرأة",
// // //         "قانون الميراث",
// // //       ],
// // //       experience: "8+ سنوات",
// // //       education: [
// // //         "ماجستير في قانون الأحوال الشخصية - جامعة الأزهر",
// // //         "ليسانس شريعة وقانون - جامعة صنعاء",
// // //         "دبلوم في حقوق الإنسان",
// // //       ],
// // //       achievements: [
// // //         "متخصصة في قضايا الأسرة",
// // //         "ناشطة في مجال حقوق المرأة",
// // //         "عضو الجمعية النسائية للحقوقيات",
// // //         "خبيرة في قانون الميراث الشرعي",
// // //       ],
// // //       phone: "777123456",
// // //       email: "fatima.zahrani@example.com",
// // //       bio: "محامية متخصصة في قانون الأحوال الشخصية وقضايا الأسرة مع اهتمام خاص بحقوق المرأة والطفل. تتمتع بخبرة واسعة في التعامل مع القضايا الحساسة وتقديم الدعم القانوني والنفسي للعملاء.",
// // //     },
// // //     {
// // //       name: "محمد سالم الحداد",
// // //       position: "محامي متخصص في القانون التجاري",
// // //       image: "/young-arab-commercial-lawyer.jpg",
// // //       specializations: [
// // //         "القانون التجاري",
// // //         "قانون الشركات",
// // //         "العقود التجارية",
// // //         "الملكية الفكرية",
// // //       ],
// // //       experience: "6+ سنوات",
// // //       education: [
// // //         "ماجستير في القانون التجاري - جامعة بيروت العربية",
// // //         "ليسانس حقوق - جامعة عدن",
// // //         "دبلوم في الملكية الفكرية",
// // //       ],
// // //       achievements: [
// // //         "خبير في تأسيس الشركات",
// // //         "مستشار قانوني لرجال الأعمال",
// // //         "متخصص في العقود التجارية",
// // //         "خبرة في قضايا الملكية الفكرية",
// // //       ],
// // //       phone: "775987654",
// // //       email: "mohammed.haddad@example.com",
// // //       bio: "محامي شاب ومتحمس متخصص في القانون التجاري وقانون الشركات. يساعد رجال الأعمال والشركات في تأسيس أعمالهم وحماية حقوقهم التجارية والفكرية بأحدث الطرق القانونية.",
// // //     },
// // //   ];

// // //   const teamStats = [
// // //     {
// // //       number: "4",
// // //       label: "محامون متخصصون",
// // //       icon: <Users className="w-6 h-6" />,
// // //     },
// // //     {
// // //       number: "35+",
// // //       label: "سنوات خبرة مجمعة",
// // //       icon: <Award className="w-6 h-6" />,
// // //     },
// // //     {
// // //       number: "8",
// // //       label: "مجالات تخصص",
// // //       icon: <BookOpen className="w-6 h-6" />,
// // //     },
// // //     {
// // //       number: "100%",
// // //       label: "التزام بالمهنية",
// // //       icon: <Star className="w-6 h-6" />,
// // //     },
// // //   ];

// // //   return (
// // //     <div className="min-h-screen bg-background text-foreground">
// // //       {/* Navigation */}
// // //       {/* <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border/50">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex items-center justify-between h-16">
// // //             <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
// // //               <Scale className="w-8 h-8 text-primary" />
// // //               <span className="text-xl font-bold">المحامي خالد الناصر</span>
// // //             </Link>

// // //             <div className="hidden md:flex items-center gap-6">
// // //               <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
// // //                 الرئيسية
// // //               </Link>
// // //               <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
// // //                 من نحن
// // //               </Link>
// // //               <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
// // //                 خدماتنا
// // //               </Link>
// // //               <Link href="/team" className="text-primary font-medium">
// // //                 فريق العمل
// // //               </Link>
// // //               <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
// // //                 المقالات
// // //               </Link>
// // //               <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
// // //                 اتصل بنا
// // //               </Link>
// // //             </div>

// // //             <Button asChild className="bg-primary hover:bg-primary/90">
// // //               <Link href="/contact">احجز استشارة</Link>
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </nav> */}

// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
// // //         {/* Hero Section */}
// // //         <section className="text-center space-y-8">
// // //           <div className="space-y-4">
// // //             <div className="flex items-center justify-center gap-4 mb-6">
// // //               <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
// // //                 <Users className="w-6 h-6 text-primary" />
// // //               </div>
// // //               <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
// // //               <div className="w-8 h-8 border border-primary rotate-45" />
// // //               <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
// // //               <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
// // //                 <Scale className="w-6 h-6 text-primary" />
// // //               </div>
// // //             </div>

// // //             <h1 className="text-4xl md:text-6xl font-bold text-balance">
// // //               <span className="bg-gradient-to-l from-primary via-foreground to-primary bg-clip-text text-transparent">
// // //                 فريق العمل
// // //               </span>
// // //             </h1>
// // //             <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
// // //               فريق من المحامين والمستشارين القانونيين المتخصصين يعملون بتفان
// // //               لتحقيق أفضل النتائج لعملائنا
// // //             </p>
// // //           </div>
// // //         </section>

// // //         {/* Team Stats */}
// // //         <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
// // //           {teamStats.map((stat, index) => (
// // //             <Card
// // //               key={index}
// // //               className="bg-card/50 border-primary/20 hover:bg-card/80 transition-all duration-300 hover:scale-105 group"
// // //             >
// // //               <CardContent className="p-6 text-center space-y-3">
// // //                 <div className="text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center">
// // //                   {stat.icon}
// // //                 </div>
// // //                 <div className="text-3xl font-bold text-primary">
// // //                   {stat.number}
// // //                 </div>
// // //                 <div className="text-sm text-muted-foreground">
// // //                   {stat.label}
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           ))}
// // //         </section>

// // //         {/* Team Members */}
// // //         <section className="space-y-12">
// // //           <div className="text-center space-y-4">
// // //             <h2 className="text-3xl font-bold">أعضاء الفريق</h2>
// // //             <p className="text-lg text-muted-foreground">
// // //               تعرف على فريقنا المتخصص من المحامين والمستشارين القانونيين
// // //             </p>
// // //           </div>

// // //           <div className="space-y-12">
// // //             {teamMembers.map((member, index) => (
// // //               <Card
// // //                 key={index}
// // //                 className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40"
// // //               >
// // //                 <CardContent className="p-8 lg:p-12">
// // //                   <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
// // //                     {/* Profile Image and Basic Info */}
// // //                     <div className="lg:col-span-1 space-y-6">
// // //                       <div className="relative">
// // //                         <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full animate-pulse" />
// // //                         <div className="relative w-48 h-48 mx-auto lg:w-full lg:h-auto lg:aspect-square">
// // //                           <img
// // //                             src={member.image || "/placeholder.svg"}
// // //                             alt={member.name}
// // //                             className="w-full h-full object-cover rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
// // //                           />
// // //                         </div>
// // //                       </div>

// // //                       <div className="text-center lg:text-right space-y-3">
// // //                         <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
// // //                           {member.name}
// // //                         </h3>
// // //                         <p className="text-primary font-medium">
// // //                           {member.position}
// // //                         </p>
// // //                         <div className="flex items-center justify-center lg:justify-start gap-2">
// // //                           <Briefcase className="w-4 h-4 text-primary" />
// // //                           <span className="text-sm text-muted-foreground">
// // //                             {member.experience}
// // //                           </span>
// // //                         </div>
// // //                       </div>

// // //                       {/* Contact Info */}
// // //                       <div className="space-y-3 pt-4 border-t border-border/50">
// // //                         <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
// // //                           <Phone className="w-4 h-4 text-primary" />
// // //                           <span>{member.phone}</span>
// // //                         </div>
// // //                         <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
// // //                           <Mail className="w-4 h-4 text-primary" />
// // //                           <span className="break-all">{member.email}</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     {/* Detailed Information */}
// // //                     <div className="lg:col-span-3 space-y-8">
// // //                       {/* Bio */}
// // //                       <div className="space-y-4">
// // //                         <h4 className="text-lg font-semibold flex items-center gap-2">
// // //                           <Users className="w-5 h-5 text-primary" />
// // //                           نبذة شخصية
// // //                         </h4>
// // //                         <p className="text-muted-foreground leading-relaxed">
// // //                           {member.bio}
// // //                         </p>
// // //                       </div>

// // //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //                         {/* Specializations */}
// // //                         <div className="space-y-4">
// // //                           <h4 className="text-lg font-semibold flex items-center gap-2">
// // //                             <Gavel className="w-5 h-5 text-primary" />
// // //                             التخصصات
// // //                           </h4>
// // //                           <div className="flex flex-wrap gap-2">
// // //                             {member.specializations.map((spec, idx) => (
// // //                               <Badge
// // //                                 key={idx}
// // //                                 variant="secondary"
// // //                                 className="bg-primary/10 text-primary border-primary/20"
// // //                               >
// // //                                 {spec}
// // //                               </Badge>
// // //                             ))}
// // //                           </div>
// // //                         </div>

// // //                         {/* Achievements */}
// // //                         <div className="space-y-4">
// // //                           <h4 className="text-lg font-semibold flex items-center gap-2">
// // //                             <Award className="w-5 h-5 text-primary" />
// // //                             الإنجازات
// // //                           </h4>
// // //                           <ul className="space-y-2">
// // //                             {member.achievements.map((achievement, idx) => (
// // //                               <li
// // //                                 key={idx}
// // //                                 className="flex items-start gap-2 text-sm text-muted-foreground"
// // //                               >
// // //                                 <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
// // //                                 {achievement}
// // //                               </li>
// // //                             ))}
// // //                           </ul>
// // //                         </div>
// // //                       </div>

// // //                       {/* Education */}
// // //                       <div className="space-y-4">
// // //                         <h4 className="text-lg font-semibold flex items-center gap-2">
// // //                           <GraduationCap className="w-5 h-5 text-primary" />
// // //                           المؤهلات العلمية
// // //                         </h4>
// // //                         <ul className="space-y-2">
// // //                           {member.education.map((edu, idx) => (
// // //                             <li
// // //                               key={idx}
// // //                               className="flex items-start gap-2 text-sm text-muted-foreground"
// // //                             >
// // //                               <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
// // //                               {edu}
// // //                             </li>
// // //                           ))}
// // //                         </ul>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* Why Choose Our Team */}
// // //         <section className="space-y-8">
// // //           <div className="text-center space-y-4">
// // //             <h2 className="text-3xl font-bold">لماذا تختار فريقنا؟</h2>
// // //             <p className="text-lg text-muted-foreground">
// // //               مميزات تجعلنا الخيار الأمثل لخدماتكم القانونية
// // //             </p>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // //             {[
// // //               {
// // //                 icon: <Shield className="w-8 h-8 text-primary" />,
// // //                 title: "خبرة متنوعة",
// // //                 description:
// // //                   "فريق متخصص في مختلف المجالات القانونية لتغطية شاملة لاحتياجاتكم",
// // //               },
// // //               {
// // //                 icon: <Users className="w-8 h-8 text-primary" />,
// // //                 title: "عمل جماعي",
// // //                 description:
// // //                   "نعمل كفريق واحد لضمان أفضل النتائج وتقديم خدمة متكاملة",
// // //               },
// // //               {
// // //                 icon: <Star className="w-8 h-8 text-primary" />,
// // //                 title: "التزام بالجودة",
// // //                 description:
// // //                   "نلتزم بأعلى معايير الجودة والمهنية في جميع خدماتنا القانونية",
// // //               },
// // //             ].map((feature, index) => (
// // //               <Card
// // //                 key={index}
// // //                 className="text-center hover:scale-105 transition-all duration-300 bg-card/50 border-primary/20 hover:border-primary/40"
// // //               >
// // //                 <CardContent className="p-8 space-y-4">
// // //                   <div className="flex justify-center">{feature.icon}</div>
// // //                   <h3 className="text-xl font-semibold">{feature.title}</h3>
// // //                   <p className="text-muted-foreground leading-relaxed">
// // //                     {feature.description}
// // //                   </p>
// // //                 </CardContent>
// // //               </Card>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* Call to Action */}
// // //         <section className="text-center space-y-8">
// // //           <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
// // //             <CardContent className="p-12 space-y-6">
// // //               <Users className="w-16 h-16 text-primary mx-auto animate-pulse" />
// // //               <h3 className="text-3xl font-bold">تواصل مع فريقنا</h3>
// // //               <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
// // //                 فريقنا المتخصص جاهز لمساعدتك في جميع احتياجاتك القانونية. تواصل
// // //                 معنا اليوم للحصول على استشارة مجانية
// // //               </p>
// // //               <div className="flex flex-col sm:flex-row gap-4 justify-center">
// // //                 <Button
// // //                   asChild
// // //                   size="lg"
// // //                   className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg"
// // //                 >
// // //                   <Link href="/contact">
// // //                     <MessageCircle className="w-5 h-5 ml-2" />
// // //                     تواصل معنا الآن
// // //                   </Link>
// // //                 </Button>
// // //                 <Button
// // //                   asChild
// // //                   variant="outline"
// // //                   size="lg"
// // //                   className="px-8 py-4 text-lg border-primary/30 hover:bg-primary/10 bg-transparent"
// // //                 >
// // //                   <Link href="/services">
// // //                     <ArrowLeft className="w-5 h-5 ml-2" />
// // //                     تعرف على خدماتنا
// // //                   </Link>
// // //                 </Button>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         </section>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Scale,
// //   Gavel,
// //   Shield,
// //   Users,
// //   Phone,
// //   Mail,
// //   Award,
// //   GraduationCap,
// //   Briefcase,
// //   Star,
// //   BookOpen,
// //   MessageCircle,
// //   ArrowLeft,
// // } from "lucide-react";
// // import Link from "next/link";

// // export default function TeamPage() {
// //   const teamMembers = [
// //     {
// //       name: "خالد يحيى محمد الناصر",
// //       position: "المحامي الأستاذ والمدير",
// //       image: "/khaled.png",
// //       specializations: [
// //         "القانون المدني",
// //         "القانون التجاري",
// //         "التحكيم الدولي",
// //         "الشريعة الإسلامية",
// //       ],
// //       experience: "15+ سنة",
// //       education: [
// //         "ليسانس شريعة وقانون - جامعة صنعاء (2008)",
// //         "دورة التحكيم التجاري الدولي - المركز العربي لإعداد المحكمين",
// //         "دورة إدارة القضية والصياغة القانونية",
// //       ],
// //       achievements: [
// //         "مترافع أمام المحكمة العليا",
// //         "محكم تجاري دولي معتمد",
// //         "عضو نقابة المحامين اليمنيين",
// //         "نائب رئيس لجنة الرقابة والتفتيش",
// //       ],
// //       phone: "770461195",
// //       email: "Khalid77791@gmail.com",
// //       bio: "محامي ومستشار قانوني متخصص في الشريعة والقانون مع خبرة واسعة في التحكيم التجاري الدولي والمرافعة أمام المحاكم. يتمتع بسمعة طيبة في تقديم الاستشارات القانونية الشاملة وحل النزاعات بطرق مبتكرة وفعالة.",
// //     },

// //     // المحامين الجدد المضافين بنفس النمط
// //     {
// //       name: "نصر حسن عبدالله جارالله",
// //       position: "سكرتارية مكتب المحامي/خالد الناصر",
// //       image: "/lawyer1.jpg",
// //       specializations: ["جميع اقسام القانون وتخصصاته"],
// //       experience: "5+ سنوات",
// //       education: [
// //         "ليسانس شريعه وقانون-كلية الشريعه والقانون-جامعة صنعاء",
// //         "دبلوم سكرتارية",
// //       ],
// //       achievements: [
// //         "عضو نقابة المحاميين اليمنيين",
// //         "متخصص في الشريعة الإسلامية",
// //       ],
// //       phone: "773456789",
// //       email: "naser.jarallah@example.com",
// //       bio: "محامي ومستشار قانوني متخصص في الشريعه الاسلاميه مع خبره واسعه في الترافع امام المحاكم بجميع انواعها ودراجتها. يتميز بالخبرة الواسعة في المجال القانوني.",
// //     },
// //     {
// //       name: "ايمن علي احمد القربي",
// //       position: "محامي متدرب",
// //       image: "/lawyer2.jpg",
// //       specializations: ["القانون المدني", "القانون الجنائي", "صياغة الدعاوى"],
// //       experience: "3+ سنوات",
// //       education: [
// //         "بكالوريوس الليسانس في القانون - جامعة صنعاء (2017-2021)",
// //         "دفعة 45 - دفعة العدل والسلام",
// //       ],
// //       achievements: [
// //         "عضو نقابة المحاميين اليمنيين - صنعاء",
// //         "متخصص في صياغة الدعاوى والدفوع",
// //       ],
// //       phone: "770776323",
// //       email: "ayman.alqurashi@example.com",
// //       bio: "محامي شاب طموح، حاصل على البكالوريوس الليسانس في القانون من جامعة صنعاء عام 2021. يتمتع بخبرة عملية وتدريبية مكثفة في المجال القانوني، ويطمح لتطوير مهاراته والمساهمة في تحقيق العدالة.",
// //       training: [
// //         "دورات في التطبيقات القضائية",
// //         "دورة صياغة الدعاوى والرد عليها",
// //         "دورة صياغة الدفوع والرد عليها",
// //         "دورة إجراءات تقديم الدعاوى أمام المحكمة",
// //         "دورة التقاضي وفن المرافعة",
// //         "دورة قسمة التركات",
// //         "دورة صياغة العقود",
// //         "دورة الضبطية القضائية والإدارية",
// //       ],
// //     },
// //     {
// //       name: "ناصر علي مبخوت أبونسران",
// //       position: "محامي ومستشار قانوني",
// //       image: "/lawyer3.jpg",
// //       specializations: [
// //         "القانون المدني",
// //         "القانون التجاري",
// //         "الاستشارات القانونية",
// //       ],
// //       experience: "7+ سنوات",
// //       education: ["ليسانس شريعة وقانون- جامعة صنعاء"],
// //       achievements: ["عضو بنقابة المحامين اليمنيين"],
// //       phone: "777797147",
// //       email: "Nasser.abonasran@gmail.com",
// //       address: "أمانة العاصمة-بني الحارث - الخميس",
// //       bio: "محامي ومستشار قانوني محترف يتمتع بخبرة واسعة في المجال القانوني. متخصص في تقديم الاستشارات القانونية والترافع أمام المحاكم.",
// //     },
// //     {
// //       name: "شرف عبده احمد حلبوب",
// //       position: "محامي ومستشار قانوني",
// //       image: "/lawyer4.jpg",
// //       specializations: ["حقوق الإنسان", "القانون الدولي", "القانون المدني"],
// //       experience: "6+ سنوات",
// //       education: [
// //         "ليسانس شريعه وقانون-كلية الشريعه والقانون-جامعة صنعاء",
// //         "دبلوم حقوق الانسان - مركز الدراسات والبحوث - جامعة صنعاء",
// //         "دبلوم تمريض عالي",
// //         "دبلوم مساعد طبيب",
// //         "دبلوم برامج تطبيقيه",
// //       ],
// //       achievements: [
// //         "عضو نقابة المحاميين اليمنيين-صنعاء",
// //         "خريج برنامج القيادات الشابة UNDP6 التابع لبرنامج الأمم المتحدة الإنمائي",
// //       ],
// //       phone: "00967774266744",
// //       email: "sharafkn2022@gmail.com",
// //       bio: "محامي متعدد المهارات يتمتع بخلفية متنوعة في القانون والتمريض وحقوق الإنسان. يمتلك خبرة في إدارة المشاريع والمحاسبة.",
// //       additionalSkills: ["دورات محاسبة وادارة مشاريع"],
// //     },
// //     {
// //       name: "أحمد ياسين الجبيحي",
// //       position: "محام ومستشار قانوني",
// //       image: "/lawyer5.jpg",
// //       specializations: ["القانون الإنساني", "مراقبة الجودة", "إدارة المشاريع"],
// //       experience: "8+ سنوات",
// //       education: ["ليسانس قانون - جامعة صنعاء"],
// //       achievements: [
// //         "عضو في نقابة المحامين اليمنيين",
// //         "مدرب مدربين معتمد (PTM)",
// //       ],
// //       phone: "775123456",
// //       email: "ahmed.aljabeehi@example.com",
// //       bio: "محام ومستشار قانوني سابقاً كباحث ميداني في مركز دراسات، ثم ضابط جودة في مشروع الصحة الانجابية، ثم مراقب ميداني في مشروع توزيع الغذاء العام ومشروع الاستجابة السريعة والطارئة للنازحين.",
// //       experienceDetails: [
// //         "باحث ميداني في مركز دراسات",
// //         "ضابط جودة في مشروع الصحة الانجابية",
// //         "مراقب ميداني في مشروع توزيع الغذاء العام (GFD)",
// //         "مراقب ميداني في مشروع الاستجابة السريعة والطارئة للنازحين (RRM)",
// //       ],
// //       trainingPrograms: [
// //         "برنامج التوعية المجتمعية بمعايير اسفير للأعمال الاغاثية والاستجابة الانسانية",
// //         "البرنامج التدريبي للحقوق والحريات",
// //         "برنامج إدارة المشاريع التنموية للمنظمات المانحة",
// //         "برنامج (PTM) مدرب مدربين معتمد",
// //       ],
// //     },
// //     {
// //       name: "عدنان ناصر علي شراح",
// //       position: "محامي ومستشار قانوني",
// //       image: "/lawyer6.jpg",
// //       specializations: ["التحكيم الدولي", "صياغة العقود", "تدريب المحامين"],
// //       experience: "6+ سنوات",
// //       education: ["ليسانس شريعة وقانون- جامعة صنعاء"],
// //       achievements: [
// //         "عضو بنقابة المحامين اليمنيين",
// //         "عضو ملتقى القانونين",
// //         "خبير في مجال التحكيم الدولي",
// //       ],
// //       phone: "783935388",
// //       email: "adananadanan12@gmail.com",
// //       bio: "محامي ومستشار قانوني يتمتع بخبرة تزيد عن ست سنوات في مجال المحاماة. خبير في التحكيم الدولي ومدرب للمحامين تحت التدريب.",
// //       expertise: [
// //         "خبير في مجال التحكيم الدولي",
// //         "مدرب المحامين تحت التدريب",
// //         "خبرة في مجال المحاماه لاكثر من ست سنوات",
// //       ],
// //       trainingCourses: [
// //         "دورة صياغة العقود",
// //         "دورة فن اعداد العرائض والدفوع",
// //         "دوره في مجال التحكيم",
// //       ],
// //     },
// //   ];

// //   const teamStats = [
// //     {
// //       number: "10",
// //       label: "محامون متخصصون",
// //       icon: <Users className="w-6 h-6" />,
// //     },
// //     {
// //       number: "65+",
// //       label: "سنوات خبرة مجمعة",
// //       icon: <Award className="w-6 h-6" />,
// //     },
// //     {
// //       number: "15+",
// //       label: "مجالات تخصص",
// //       icon: <BookOpen className="w-6 h-6" />,
// //     },
// //     {
// //       number: "100%",
// //       label: "التزام بالمهنية",
// //       icon: <Star className="w-6 h-6" />,
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-background text-foreground">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
// //         {/* Hero Section */}
// //         <section className="text-center space-y-8">
// //           <div className="space-y-4">
// //             <div className="flex items-center justify-center gap-4 mb-6">
// //               <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
// //                 <Users className="w-6 h-6 text-primary" />
// //               </div>
// //               <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
// //               <div className="w-8 h-8 border border-primary rotate-45" />
// //               <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
// //               <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
// //                 <Scale className="w-6 h-6 text-primary" />
// //               </div>
// //             </div>

// //             <h1 className="text-4xl md:text-6xl font-bold text-balance">
// //               <span className="bg-gradient-to-l from-primary via-foreground to-primary bg-clip-text text-transparent">
// //                 فريق العمل
// //               </span>
// //             </h1>
// //             <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
// //               فريق متكامل من المحامين والمستشارين القانونيين المتخصصين يعملون
// //               بتفان لتحقيق أفضل النتائج لعملائنا بمختلف التخصصات القانونية
// //             </p>
// //           </div>
// //         </section>

// //         {/* Team Stats */}
// //         <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
// //           {teamStats.map((stat, index) => (
// //             <Card
// //               key={index}
// //               className="bg-card/50 border-primary/20 hover:bg-card/80 transition-all duration-300 hover:scale-105 group"
// //             >
// //               <CardContent className="p-6 text-center space-y-3">
// //                 <div className="text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center">
// //                   {stat.icon}
// //                 </div>
// //                 <div className="text-3xl font-bold text-primary">
// //                   {stat.number}
// //                 </div>
// //                 <div className="text-sm text-muted-foreground">
// //                   {stat.label}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </section>

// //         {/* Team Members */}
// //         <section className="space-y-12">
// //           <div className="text-center space-y-4">
// //             <h2 className="text-3xl font-bold">أعضاء الفريق</h2>
// //             <p className="text-lg text-muted-foreground">
// //               تعرف على فريقنا المتكامل من المحامين والمستشارين القانونيين
// //               المتخصصين
// //             </p>
// //           </div>

// //           <div className="space-y-12">
// //             {teamMembers.map((member, index) => (
// //               <Card
// //                 key={index}
// //                 className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40"
// //               >
// //                 <CardContent className="p-8 lg:p-12">
// //                   <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
// //                     {/* Profile Image and Basic Info */}
// //                     <div className="lg:col-span-1 space-y-6">
// //                       <div className="relative">
// //                         <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full animate-pulse" />
// //                         <div className="relative w-48 h-48 mx-auto lg:w-full lg:h-auto lg:aspect-square">
// //                           <img
// //                             src={member.image || "/placeholder.svg"}
// //                             alt={member.name}
// //                             className="w-full h-full object-cover rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
// //                           />
// //                         </div>
// //                       </div>

// //                       <div className="text-center lg:text-right space-y-3">
// //                         <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
// //                           {member.name}
// //                         </h3>
// //                         <p className="text-primary font-medium">
// //                           {member.position}
// //                         </p>
// //                         <div className="flex items-center justify-center lg:justify-start gap-2">
// //                           <Briefcase className="w-4 h-4 text-primary" />
// //                           <span className="text-sm text-muted-foreground">
// //                             {member.experience}
// //                           </span>
// //                         </div>
// //                       </div>

// //                       {/* Contact Info */}
// //                       <div className="space-y-3 pt-4 border-t border-border/50">
// //                         <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
// //                           <Phone className="w-4 h-4 text-primary" />
// //                           <span>{member.phone}</span>
// //                         </div>
// //                         <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
// //                           <Mail className="w-4 h-4 text-primary" />
// //                           <span className="break-all">{member.email}</span>
// //                         </div>
// //                         {member.address && (
// //                           <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground">
// //                             <span>📍 {member.address}</span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>

// //                     {/* Detailed Information */}
// //                     <div className="lg:col-span-3 space-y-8">
// //                       {/* Bio */}
// //                       <div className="space-y-4">
// //                         <h4 className="text-lg font-semibold flex items-center gap-2">
// //                           <Users className="w-5 h-5 text-primary" />
// //                           نبذة شخصية
// //                         </h4>
// //                         <p className="text-muted-foreground leading-relaxed">
// //                           {member.bio}
// //                         </p>
// //                       </div>

// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //                         {/* Specializations */}
// //                         <div className="space-y-4">
// //                           <h4 className="text-lg font-semibold flex items-center gap-2">
// //                             <Gavel className="w-5 h-5 text-primary" />
// //                             التخصصات
// //                           </h4>
// //                           <div className="flex flex-wrap gap-2">
// //                             {member.specializations.map((spec, idx) => (
// //                               <Badge
// //                                 key={idx}
// //                                 variant="secondary"
// //                                 className="bg-primary/10 text-primary border-primary/20"
// //                               >
// //                                 {spec}
// //                               </Badge>
// //                             ))}
// //                           </div>
// //                         </div>

// //                         {/* Achievements */}
// //                         <div className="space-y-4">
// //                           <h4 className="text-lg font-semibold flex items-center gap-2">
// //                             <Award className="w-5 h-5 text-primary" />
// //                             الإنجازات
// //                           </h4>
// //                           <ul className="space-y-2">
// //                             {member.achievements.map((achievement, idx) => (
// //                               <li
// //                                 key={idx}
// //                                 className="flex items-start gap-2 text-sm text-muted-foreground"
// //                               >
// //                                 <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
// //                                 {achievement}
// //                               </li>
// //                             ))}
// //                           </ul>
// //                         </div>
// //                       </div>

// //                       {/* Education */}
// //                       <div className="space-y-4">
// //                         <h4 className="text-lg font-semibold flex items-center gap-2">
// //                           <GraduationCap className="w-5 h-5 text-primary" />
// //                           المؤهلات العلمية
// //                         </h4>
// //                         <ul className="space-y-2">
// //                           {member.education.map((edu, idx) => (
// //                             <li
// //                               key={idx}
// //                               className="flex items-start gap-2 text-sm text-muted-foreground"
// //                             >
// //                               <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
// //                               {edu}
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>

// //                       {/* Additional Sections for Specific Members */}
// //                       {member.training && (
// //                         <div className="space-y-4">
// //                           <h4 className="text-lg font-semibold flex items-center gap-2">
// //                             <BookOpen className="w-5 h-5 text-primary" />
// //                             الدورات التدريبية
// //                           </h4>
// //                           <div className="flex flex-wrap gap-2">
// //                             {member.training.map((course, idx) => (
// //                               <Badge
// //                                 key={idx}
// //                                 variant="outline"
// //                                 className="border-primary/30 text-muted-foreground"
// //                               >
// //                                 {course}
// //                               </Badge>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}

// //                       {member.trainingCourses && (
// //                         <div className="space-y-4">
// //                           <h4 className="text-lg font-semibold flex items-center gap-2">
// //                             <BookOpen className="w-5 h-5 text-primary" />
// //                             الدورات التدريبية
// //                           </h4>
// //                           <div className="flex flex-wrap gap-2">
// //                             {member.trainingCourses.map((course, idx) => (
// //                               <Badge
// //                                 key={idx}
// //                                 variant="outline"
// //                                 className="border-primary/30 text-muted-foreground"
// //                               >
// //                                 {course}
// //                               </Badge>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}

// //                       {member.expertise && (
// //                         <div className="space-y-4">
// //                           <h4 className="text-lg font-semibold flex items-center gap-2">
// //                             <Star className="w-5 h-5 text-primary" />
// //                             الخبرات المتخصصة
// //                           </h4>
// //                           <ul className="space-y-2">
// //                             {member.expertise.map((exp, idx) => (
// //                               <li
// //                                 key={idx}
// //                                 className="flex items-start gap-2 text-sm text-muted-foreground"
// //                               >
// //                                 <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
// //                                 {exp}
// //                               </li>
// //                             ))}
// //                           </ul>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </section>

// //         {/* Why Choose Our Team */}
// //         <section className="space-y-8">
// //           <div className="text-center space-y-4">
// //             <h2 className="text-3xl font-bold">لماذا تختار فريقنا؟</h2>
// //             <p className="text-lg text-muted-foreground">
// //               مميزات تجعلنا الخيار الأمثل لخدماتكم القانونية
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {[
// //               {
// //                 icon: <Shield className="w-8 h-8 text-primary" />,
// //                 title: "خبرة متنوعة",
// //                 description:
// //                   "فريق متخصص في مختلف المجالات القانونية لتغطية شاملة لاحتياجاتكم",
// //               },
// //               {
// //                 icon: <Users className="w-8 h-8 text-primary" />,
// //                 title: "عمل جماعي",
// //                 description:
// //                   "نعمل كفريق واحد لضمان أفضل النتائج وتقديم خدمة متكاملة",
// //               },
// //               {
// //                 icon: <Star className="w-8 h-8 text-primary" />,
// //                 title: "التزام بالجودة",
// //                 description:
// //                   "نلتزم بأعلى معايير الجودة والمهنية في جميع خدماتنا القانونية",
// //               },
// //             ].map((feature, index) => (
// //               <Card
// //                 key={index}
// //                 className="text-center hover:scale-105 transition-all duration-300 bg-card/50 border-primary/20 hover:border-primary/40"
// //               >
// //                 <CardContent className="p-8 space-y-4">
// //                   <div className="flex justify-center">{feature.icon}</div>
// //                   <h3 className="text-xl font-semibold">{feature.title}</h3>
// //                   <p className="text-muted-foreground leading-relaxed">
// //                     {feature.description}
// //                   </p>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </section>

// //         {/* Call to Action */}
// //         <section className="text-center space-y-8">
// //           <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
// //             <CardContent className="p-12 space-y-6">
// //               <Users className="w-16 h-16 text-primary mx-auto animate-pulse" />
// //               <h3 className="text-3xl font-bold">تواصل مع فريقنا</h3>
// //               <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
// //                 فريقنا المتكامل من المحامين المتخصصين جاهز لمساعدتك في جميع
// //                 احتياجاتك القانونية. تواصل معنا اليوم للحصول على استشارة مجانية
// //                 من الخبير المناسب لتخصصك.
// //               </p>
// //               <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //                 <Button
// //                   asChild
// //                   size="lg"
// //                   className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg"
// //                 >
// //                   <Link href="/contact">
// //                     <MessageCircle className="w-5 h-5 ml-2" />
// //                     تواصل معنا الآن
// //                   </Link>
// //                 </Button>
// //                 <Button
// //                   asChild
// //                   variant="outline"
// //                   size="lg"
// //                   className="px-8 py-4 text-lg border-primary/30 hover:bg-primary/10 bg-transparent"
// //                 >
// //                   <Link href="/services">
// //                     <ArrowLeft className="w-5 h-5 ml-2" />
// //                     تعرف على خدماتنا
// //                   </Link>
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Scale,
//   Gavel,
//   Shield,
//   Users,
//   Phone,
//   Mail,
//   Award,
//   GraduationCap,
//   Briefcase,
//   Star,
//   BookOpen,
//   MessageCircle,
//   ArrowLeft,
// } from "lucide-react";
// import Link from "next/link";

// interface TeamMember {
//   _id?: string;
//   name: string;
//   position: string;
//   image: string;
//   specializations: string[];
//   experience: string;
//   education: string[];
//   achievements: string[];
//   phone: string;
//   email: string;
//   address?: string;
//   bio: string;
//   training?: string[];
//   trainingCourses?: string[];
//   expertise?: string[];
//   additionalSkills?: string[];
//   experienceDetails?: string[];
//   trainingPrograms?: string[];
//   isActive: boolean;
// }

// export default function TeamPage() {
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTeamMembers();
//   }, []);

//   const fetchTeamMembers = async () => {
//     try {
//       const res = await fetch("/api/team");
//       if (res.ok) {
//         const data = await res.json();
//         // تصفية الأعضاء النشطين فقط
//         const activeMembers = data.filter(
//           (member: TeamMember) => member.isActive
//         );
//         setTeamMembers(activeMembers);
//       } else {
//         throw new Error("فشل في جلب بيانات الفريق");
//       }
//     } catch (error) {
//       console.error("Error fetching team members:", error);
//       // في حالة الخطأ، استخدم البيانات الافتراضية
//       setTeamMembers(getDefaultTeamMembers());
//     } finally {
//       setLoading(false);
//     }
//   };

//   // بيانات افتراضية في حالة فشل جلب البيانات من الـ API
//   const getDefaultTeamMembers = (): TeamMember[] => [
//     {
//       _id: "1",
//       name: "خالد يحيى محمد الناصر",
//       position: "المحامي الأستاذ والمدير",
//       image: "/khaled.png",
//       specializations: [
//         "القانون المدني",
//         "القانون التجاري",
//         "التحكيم الدولي",
//         "الشريعة الإسلامية",
//       ],
//       experience: "15+ سنة",
//       education: [
//         "ليسانس شريعة وقانون - جامعة صنعاء (2008)",
//         "دورة التحكيم التجاري الدولي - المركز العربي لإعداد المحكمين",
//         "دورة إدارة القضية والصياغة القانونية",
//       ],
//       achievements: [
//         "مترافع أمام المحكمة العليا",
//         "محكم تجاري دولي معتمد",
//         "عضو نقابة المحامين اليمنيين",
//         "نائب رئيس لجنة الرقابة والتفتيش",
//       ],
//       phone: "770461195",
//       email: "Khalid77791@gmail.com",
//       bio: "محامي ومستشار قانوني متخصص في الشريعة والقانون مع خبرة واسعة في التحكيم التجاري الدولي والمرافعة أمام المحاكم. يتمتع بسمعة طيبة في تقديم الاستشارات القانونية الشاملة وحل النزاعات بطرق مبتكرة وفعالة.",
//       isActive: true,
//     },
//     {
//       _id: "2",
//       name: "نصر حسن عبدالله جارالله",
//       position: "سكرتارية مكتب المحامي/خالد الناصر",
//       image: "/lawyer1.jpg",
//       specializations: ["جميع اقسام القانون وتخصصاته"],
//       experience: "5+ سنوات",
//       education: [
//         "ليسانس شريعه وقانون-كلية الشريعه والقانون-جامعة صنعاء",
//         "دبلوم سكرتارية",
//       ],
//       achievements: [
//         "عضو نقابة المحاميين اليمنيين",
//         "متخصص في الشريعة الإسلامية",
//       ],
//       phone: "773456789",
//       email: "naser.jarallah@example.com",
//       bio: "محامي ومستشار قانوني متخصص في الشريعه الاسلاميه مع خبره واسعه في الترافع امام المحاكم بجميع انواعها ودراجتها. يتميز بالخبرة الواسعة في المجال القانوني.",
//       isActive: true,
//     },
//     {
//       _id: "3",
//       name: "ايمن علي احمد القربي",
//       position: "محامي متدرب",
//       image: "/lawyer2.jpg",
//       specializations: ["القانون المدني", "القانون الجنائي", "صياغة الدعاوى"],
//       experience: "3+ سنوات",
//       education: [
//         "بكالوريوس الليسانس في القانون - جامعة صنعاء (2017-2021)",
//         "دفعة 45 - دفعة العدل والسلام",
//       ],
//       achievements: [
//         "عضو نقابة المحاميين اليمنيين - صنعاء",
//         "متخصص في صياغة الدعاوى والدفوع",
//       ],
//       phone: "770776323",
//       email: "ayman.alqurashi@example.com",
//       bio: "محامي شاب طموح، حاصل على البكالوريوس الليسانس في القانون من جامعة صنعاء عام 2021. يتمتع بخبرة عملية وتدريبية مكثفة في المجال القانوني، ويطمح لتطوير مهاراته والمساهمة في تحقيق العدالة.",
//       training: [
//         "دورات في التطبيقات القضائية",
//         "دورة صياغة الدعاوى والرد عليها",
//         "دورة صياغة الدفوع والرد عليها",
//         "دورة إجراءات تقديم الدعاوى أمام المحكمة",
//         "دورة التقاضي وفن المرافعة",
//         "دورة قسمة التركات",
//         "دورة صياغة العقود",
//         "دورة الضبطية القضائية والإدارية",
//       ],
//       isActive: true,
//     },
//     {
//       _id: "4",
//       name: "ناصر علي مبخوت أبونسران",
//       position: "محامي ومستشار قانوني",
//       image: "/lawyer3.jpg",
//       specializations: [
//         "القانون المدني",
//         "القانون التجاري",
//         "الاستشارات القانونية",
//       ],
//       experience: "7+ سنوات",
//       education: ["ليسانس شريعة وقانون- جامعة صنعاء"],
//       achievements: ["عضو بنقابة المحامين اليمنيين"],
//       phone: "777797147",
//       email: "Nasser.abonasran@gmail.com",
//       address: "أمانة العاصمة-بني الحارث - الخميس",
//       bio: "محامي ومستشار قانوني محترف يتمتع بخبرة واسعة في المجال القانوني. متخصص في تقديم الاستشارات القانونية والترافع أمام المحاكم.",
//       isActive: true,
//     },
//     {
//       _id: "5",
//       name: "شرف عبده احمد حلبوب",
//       position: "محامي ومستشار قانوني",
//       image: "/lawyer4.jpg",
//       specializations: ["حقوق الإنسان", "القانون الدولي", "القانون المدني"],
//       experience: "6+ سنوات",
//       education: [
//         "ليسانس شريعه وقانون-كلية الشريعه والقانون-جامعة صنعاء",
//         "دبلوم حقوق الانسان - مركز الدراسات والبحوث - جامعة صنعاء",
//         "دبلوم تمريض عالي",
//         "دبلوم مساعد طبيب",
//         "دبلوم برامج تطبيقيه",
//       ],
//       achievements: [
//         "عضو نقابة المحاميين اليمنيين-صنعاء",
//         "خريج برنامج القيادات الشابة UNDP6 التابع لبرنامج الأمم المتحدة الإنمائي",
//       ],
//       phone: "00967774266744",
//       email: "sharafkn2022@gmail.com",
//       bio: "محامي متعدد المهارات يتمتع بخلفية متنوعة في القانون والتمريض وحقوق الإنسان. يمتلك خبرة في إدارة المشاريع والمحاسبة.",
//       additionalSkills: ["دورات محاسبة وادارة مشاريع"],
//       isActive: true,
//     },
//     {
//       _id: "6",
//       name: "أحمد ياسين الجبيحي",
//       position: "محام ومستشار قانوني",
//       image: "/lawyer5.jpg",
//       specializations: ["القانون الإنساني", "مراقبة الجودة", "إدارة المشاريع"],
//       experience: "8+ سنوات",
//       education: ["ليسانس قانون - جامعة صنعاء"],
//       achievements: [
//         "عضو في نقابة المحامين اليمنيين",
//         "مدرب مدربين معتمد (PTM)",
//       ],
//       phone: "775123456",
//       email: "ahmed.aljabeehi@example.com",
//       bio: "محام ومستشار قانوني سابقاً كباحث ميداني في مركز دراسات، ثم ضابط جودة في مشروع الصحة الانجابية، ثم مراقب ميداني في مشروع توزيع الغذاء العام ومشروع الاستجابة السريعة والطارئة للنازحين.",
//       experienceDetails: [
//         "باحث ميداني في مركز دراسات",
//         "ضابط جودة في مشروع الصحة الانجابية",
//         "مراقب ميداني في مشروع توزيع الغذاء العام (GFD)",
//         "مراقب ميداني في مشروع الاستجابة السريعة والطارئة للنازحين (RRM)",
//       ],
//       trainingPrograms: [
//         "برنامج التوعية المجتمعية بمعايير اسفير للأعمال الاغاثية والاستجابة الانسانية",
//         "البرنامج التدريبي للحقوق والحريات",
//         "برنامج إدارة المشاريع التنموية للمنظمات المانحة",
//         "برنامج (PTM) مدرب مدربين معتمد",
//       ],
//       isActive: true,
//     },
//     {
//       _id: "7",
//       name: "عدنان ناصر علي شراح",
//       position: "محامي ومستشار قانوني",
//       image: "/lawyer6.jpg",
//       specializations: ["التحكيم الدولي", "صياغة العقود", "تدريب المحامين"],
//       experience: "6+ سنوات",
//       education: ["ليسانس شريعة وقانون- جامعة صنعاء"],
//       achievements: [
//         "عضو بنقابة المحامين اليمنيين",
//         "عضو ملتقى القانونين",
//         "خبير في مجال التحكيم الدولي",
//       ],
//       phone: "783935388",
//       email: "adananadanan12@gmail.com",
//       bio: "محامي ومستشار قانوني يتمتع بخبرة تزيد عن ست سنوات في مجال المحاماة. خبير في التحكيم الدولي ومدرب للمحامين تحت التدريب.",
//       expertise: [
//         "خبير في مجال التحكيم الدولي",
//         "مدرب المحامين تحت التدريب",
//         "خبرة في مجال المحاماه لاكثر من ست سنوات",
//       ],
//       trainingCourses: [
//         "دورة صياغة العقود",
//         "دورة فن اعداد العرائض والدفوع",
//         "دوره في مجال التحكيم",
//       ],
//       isActive: true,
//     },
//   ];

//   const teamStats = [
//     {
//       number: teamMembers.length.toString(),
//       label: "محامون متخصصون",
//       icon: <Users className="w-6 h-6" />,
//     },
//     {
//       number: "65+",
//       label: "سنوات خبرة مجمعة",
//       icon: <Award className="w-6 h-6" />,
//     },
//     {
//       number: "15+",
//       label: "مجالات تخصص",
//       icon: <BookOpen className="w-6 h-6" />,
//     },
//     {
//       number: "100%",
//       label: "التزام بالمهنية",
//       icon: <Star className="w-6 h-6" />,
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background text-foreground">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
//           {/* Loading Skeleton */}
//           <section className="text-center space-y-8">
//             <div className="space-y-4">
//               <div className="flex items-center justify-center gap-4 mb-6">
//                 <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
//                   <Users className="w-6 h-6 text-primary" />
//                 </div>
//                 <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
//                 <div className="w-8 h-8 border border-primary rotate-45" />
//                 <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
//                 <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
//                   <Scale className="w-6 h-6 text-primary" />
//                 </div>
//               </div>

//               <div className="h-12 bg-muted rounded w-1/2 mx-auto animate-pulse"></div>
//               <div className="h-6 bg-muted rounded w-2/3 mx-auto animate-pulse"></div>
//             </div>
//           </section>

//           {/* Loading Team Members */}
//           <section className="space-y-12">
//             {[...Array(3)].map((_, index) => (
//               <Card key={index} className="animate-pulse">
//                 <CardContent className="p-8 lg:p-12">
//                   <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
//                     <div className="lg:col-span-1 space-y-6">
//                       <div className="w-48 h-48 bg-muted rounded-full mx-auto"></div>
//                       <div className="space-y-3">
//                         <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
//                         <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
//                       </div>
//                     </div>
//                     <div className="lg:col-span-3 space-y-6">
//                       <div className="h-4 bg-muted rounded w-full"></div>
//                       <div className="h-4 bg-muted rounded w-5/6"></div>
//                       <div className="h-4 bg-muted rounded w-4/6"></div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </section>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
//         {/* Hero Section */}
//         <section className="text-center space-y-8">
//           <div className="space-y-4">
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
//                 <Users className="w-6 h-6 text-primary" />
//               </div>
//               <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
//               <div className="w-8 h-8 border border-primary rotate-45" />
//               <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
//               <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
//                 <Scale className="w-6 h-6 text-primary" />
//               </div>
//             </div>

//             <h1 className="text-4xl md:text-6xl font-bold text-balance">
//               <span className="bg-gradient-to-l from-primary via-foreground to-primary bg-clip-text text-transparent">
//                 فريق العمل
//               </span>
//             </h1>
//             <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
//               فريق متكامل من المحامين والمستشارين القانونيين المتخصصين يعملون
//               بتفان لتحقيق أفضل النتائج لعملائنا بمختلف التخصصات القانونية
//             </p>
//           </div>
//         </section>

//         {/* Team Stats */}
//         <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//           {teamStats.map((stat, index) => (
//             <Card
//               key={index}
//               className="bg-card/50 border-primary/20 hover:bg-card/80 transition-all duration-300 hover:scale-105 group"
//             >
//               <CardContent className="p-6 text-center space-y-3">
//                 <div className="text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center">
//                   {stat.icon}
//                 </div>
//                 <div className="text-3xl font-bold text-primary">
//                   {stat.number}
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   {stat.label}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </section>

//         {/* Team Members */}
//         <section className="space-y-12">
//           <div className="text-center space-y-4">
//             <h2 className="text-3xl font-bold">أعضاء الفريق</h2>
//             <p className="text-lg text-muted-foreground">
//               تعرف على فريقنا المتكامل من المحامين والمستشارين القانونيين
//               المتخصصين
//             </p>
//           </div>

//           <div className="space-y-12">
//             {teamMembers.map((member, index) => (
//               <Card
//                 key={member._id || index}
//                 className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40"
//               >
//                 <CardContent className="p-8 lg:p-12">
//                   <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
//                     {/* Profile Image and Basic Info */}
//                     <div className="lg:col-span-1 space-y-6">
//                       <div className="relative">
//                         <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full animate-pulse" />
//                         <div className="relative w-48 h-48 mx-auto lg:w-full lg:h-auto lg:aspect-square">
//                           <img
//                             src={member.image || "/placeholder.svg"}
//                             alt={member.name}
//                             className="w-full h-full object-cover rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
//                           />
//                         </div>
//                       </div>

//                       <div className="text-center lg:text-right space-y-3">
//                         <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
//                           {member.name}
//                         </h3>
//                         <p className="text-primary font-medium">
//                           {member.position}
//                         </p>
//                         <div className="flex items-center justify-center lg:justify-start gap-2">
//                           <Briefcase className="w-4 h-4 text-primary" />
//                           <span className="text-sm text-muted-foreground">
//                             {member.experience}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Contact Info */}
//                       <div className="space-y-3 pt-4 border-t border-border/50">
//                         <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
//                           <Phone className="w-4 h-4 text-primary" />
//                           <span>{member.phone}</span>
//                         </div>
//                         <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
//                           <Mail className="w-4 h-4 text-primary" />
//                           <span className="break-all">{member.email}</span>
//                         </div>
//                         {member.address && (
//                           <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground">
//                             <span>📍 {member.address}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Detailed Information */}
//                     <div className="lg:col-span-3 space-y-8">
//                       {/* Bio */}
//                       <div className="space-y-4">
//                         <h4 className="text-lg font-semibold flex items-center gap-2">
//                           <Users className="w-5 h-5 text-primary" />
//                           نبذة شخصية
//                         </h4>
//                         <p className="text-muted-foreground leading-relaxed">
//                           {member.bio}
//                         </p>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         {/* Specializations */}
//                         <div className="space-y-4">
//                           <h4 className="text-lg font-semibold flex items-center gap-2">
//                             <Gavel className="w-5 h-5 text-primary" />
//                             التخصصات
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {member.specializations.map((spec, idx) => (
//                               <Badge
//                                 key={idx}
//                                 variant="secondary"
//                                 className="bg-primary/10 text-primary border-primary/20"
//                               >
//                                 {spec}
//                               </Badge>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Achievements */}
//                         <div className="space-y-4">
//                           <h4 className="text-lg font-semibold flex items-center gap-2">
//                             <Award className="w-5 h-5 text-primary" />
//                             الإنجازات
//                           </h4>
//                           <ul className="space-y-2">
//                             {member.achievements.map((achievement, idx) => (
//                               <li
//                                 key={idx}
//                                 className="flex items-start gap-2 text-sm text-muted-foreground"
//                               >
//                                 <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
//                                 {achievement}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>

//                       {/* Education */}
//                       <div className="space-y-4">
//                         <h4 className="text-lg font-semibold flex items-center gap-2">
//                           <GraduationCap className="w-5 h-5 text-primary" />
//                           المؤهلات العلمية
//                         </h4>
//                         <ul className="space-y-2">
//                           {member.education.map((edu, idx) => (
//                             <li
//                               key={idx}
//                               className="flex items-start gap-2 text-sm text-muted-foreground"
//                             >
//                               <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
//                               {edu}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       {/* Additional Sections for Specific Members */}
//                       {member.training && member.training.length > 0 && (
//                         <div className="space-y-4">
//                           <h4 className="text-lg font-semibold flex items-center gap-2">
//                             <BookOpen className="w-5 h-5 text-primary" />
//                             الدورات التدريبية
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {member.training.map((course, idx) => (
//                               <Badge
//                                 key={idx}
//                                 variant="outline"
//                                 className="border-primary/30 text-muted-foreground"
//                               >
//                                 {course}
//                               </Badge>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {member.trainingCourses &&
//                         member.trainingCourses.length > 0 && (
//                           <div className="space-y-4">
//                             <h4 className="text-lg font-semibold flex items-center gap-2">
//                               <BookOpen className="w-5 h-5 text-primary" />
//                               الدورات التدريبية
//                             </h4>
//                             <div className="flex flex-wrap gap-2">
//                               {member.trainingCourses.map((course, idx) => (
//                                 <Badge
//                                   key={idx}
//                                   variant="outline"
//                                   className="border-primary/30 text-muted-foreground"
//                                 >
//                                   {course}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </div>
//                         )}

//                       {member.expertise && member.expertise.length > 0 && (
//                         <div className="space-y-4">
//                           <h4 className="text-lg font-semibold flex items-center gap-2">
//                             <Star className="w-5 h-5 text-primary" />
//                             الخبرات المتخصصة
//                           </h4>
//                           <ul className="space-y-2">
//                             {member.expertise.map((exp, idx) => (
//                               <li
//                                 key={idx}
//                                 className="flex items-start gap-2 text-sm text-muted-foreground"
//                               >
//                                 <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
//                                 {exp}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Why Choose Our Team */}
//         <section className="space-y-8">
//           <div className="text-center space-y-4">
//             <h2 className="text-3xl font-bold">لماذا تختار فريقنا؟</h2>
//             <p className="text-lg text-muted-foreground">
//               مميزات تجعلنا الخيار الأمثل لخدماتكم القانونية
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Shield className="w-8 h-8 text-primary" />,
//                 title: "خبرة متنوعة",
//                 description:
//                   "فريق متخصص في مختلف المجالات القانونية لتغطية شاملة لاحتياجاتكم",
//               },
//               {
//                 icon: <Users className="w-8 h-8 text-primary" />,
//                 title: "عمل جماعي",
//                 description:
//                   "نعمل كفريق واحد لضمان أفضل النتائج وتقديم خدمة متكاملة",
//               },
//               {
//                 icon: <Star className="w-8 h-8 text-primary" />,
//                 title: "التزام بالجودة",
//                 description:
//                   "نلتزم بأعلى معايير الجودة والمهنية في جميع خدماتنا القانونية",
//               },
//             ].map((feature, index) => (
//               <Card
//                 key={index}
//                 className="text-center hover:scale-105 transition-all duration-300 bg-card/50 border-primary/20 hover:border-primary/40"
//               >
//                 <CardContent className="p-8 space-y-4">
//                   <div className="flex justify-center">{feature.icon}</div>
//                   <h3 className="text-xl font-semibold">{feature.title}</h3>
//                   <p className="text-muted-foreground leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center space-y-8">
//           <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
//             <CardContent className="p-12 space-y-6">
//               <Users className="w-16 h-16 text-primary mx-auto animate-pulse" />
//               <h3 className="text-3xl font-bold">تواصل مع فريقنا</h3>
//               <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//                 فريقنا المتكامل من المحامين المتخصصين جاهز لمساعدتك في جميع
//                 احتياجاتك القانونية. تواصل معنا اليوم للحصول على استشارة مجانية
//                 من الخبير المناسب لتخصصك.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button
//                   asChild
//                   size="lg"
//                   className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg"
//                 >
//                   <Link href="/contact">
//                     <MessageCircle className="w-5 h-5 ml-2" />
//                     تواصل معنا الآن
//                   </Link>
//                 </Button>
//                 <Button
//                   asChild
//                   variant="outline"
//                   size="lg"
//                   className="px-8 py-4 text-lg border-primary/30 hover:bg-primary/10 bg-transparent"
//                 >
//                   <Link href="/services">
//                     <ArrowLeft className="w-5 h-5 ml-2" />
//                     تعرف على خدماتنا
//                   </Link>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </section>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Scale,
  Gavel,
  Shield,
  Users,
  Phone,
  Mail,
  Award,
  GraduationCap,
  Briefcase,
  Star,
  BookOpen,
  MessageCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

interface TeamMember {
  _id?: string;
  name: string;
  position: string;
  image: string;
  specializations: string[];
  experience: string;
  education: string[];
  achievements: string[];
  phone: string;
  email: string;
  address?: string;
  bio: string;
  training?: string[];
  trainingCourses?: string[];
  expertise?: string[];
  additionalSkills?: string[];
  experienceDetails?: string[];
  trainingPrograms?: string[];
  isActive: boolean;
  createdAt?: string;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch("/api/team");
      if (res.ok) {
        const data = await res.json();
        // تصفية الأعضاء النشطين فقط وترتيبهم من الأقدم إلى الأحدث
        const activeMembers = data
          .filter((member: TeamMember) => member.isActive)
          .sort((a: TeamMember, b: TeamMember) => {
            // إذا كان هناك تاريخ إنشاء، نستخدمه للترتيب (الأقدم أولاً)
            if (a.createdAt && b.createdAt) {
              return (
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
              );
            }
            // إذا لم يكن هناك تاريخ إنشاء، نستخدم الـ ID افتراضياً (الأقدم أولاً)
            return (a._id || "").localeCompare(b._id || "");
          });
        setTeamMembers(activeMembers);
      } else {
        throw new Error("فشل في جلب بيانات الفريق");
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      // في حالة الخطأ، استخدم البيانات الافتراضية
      setTeamMembers(getDefaultTeamMembers());
    } finally {
      setLoading(false);
    }
  };

  // بيانات افتراضية في حالة فشل جلب البيانات من الـ API
  const getDefaultTeamMembers = (): TeamMember[] => [
    {
      _id: "1",
      name: "خالد يحيى محمد الناصر",
      position: "المحامي الأستاذ والمدير",
      image: "/khaled.png",
      specializations: [
        "القانون المدني",
        "القانون التجاري",
        "التحكيم الدولي",
        "الشريعة الإسلامية",
      ],
      experience: "15+ سنة",
      education: [
        "ليسانس شريعة وقانون - جامعة صنعاء (2008)",
        "دورة التحكيم التجاري الدولي - المركز العربي لإعداد المحكمين",
        "دورة إدارة القضية والصياغة القانونية",
      ],
      achievements: [
        "مترافع أمام المحكمة العليا",
        "محكم تجاري دولي معتمد",
        "عضو نقابة المحامين اليمنيين",
        "نائب رئيس لجنة الرقابة والتفتيش",
      ],
      phone: "770461195",
      email: "Khalid77791@gmail.com",
      bio: "محامي ومستشار قانوني متخصص في الشريعة والقانون مع خبرة واسعة في التحكيم التجاري الدولي والمرافعة أمام المحاكم. يتمتع بسمعة طيبة في تقديم الاستشارات القانونية الشاملة وحل النزاعات بطرق مبتكرة وفعالة.",
      isActive: true,
      createdAt: "2023-01-01T00:00:00.000Z", // أقدم عضو
    },
    {
      _id: "2",
      name: "نصر حسن عبدالله جارالله",
      position: "سكرتارية مكتب المحامي/خالد الناصر",
      image: "/lawyer1.jpg",
      specializations: ["جميع اقسام القانون وتخصصاته"],
      experience: "5+ سنوات",
      education: [
        "ليسانس شريعه وقانون-كلية الشريعه والقانون-جامعة صنعاء",
        "دبلوم سكرتارية",
      ],
      achievements: [
        "عضو نقابة المحاميين اليمنيين",
        "متخصص في الشريعة الإسلامية",
      ],
      phone: "773456789",
      email: "naser.jarallah@example.com",
      bio: "محامي ومستشار قانوني متخصص في الشريعه الاسلاميه مع خبره واسعه في الترافع امام المحاكم بجميع انواعها ودراجتها. يتميز بالخبرة الواسعة في المجال القانوني.",
      isActive: true,
      createdAt: "2023-03-15T00:00:00.000Z",
    },
    {
      _id: "3",
      name: "ايمن علي احمد القربي",
      position: "محامي متدرب",
      image: "/lawyer2.jpg",
      specializations: ["القانون المدني", "القانون الجنائي", "صياغة الدعاوى"],
      experience: "3+ سنوات",
      education: [
        "بكالوريوس الليسانس في القانون - جامعة صنعاء (2017-2021)",
        "دفعة 45 - دفعة العدل والسلام",
      ],
      achievements: [
        "عضو نقابة المحاميين اليمنيين - صنعاء",
        "متخصص في صياغة الدعاوى والدفوع",
      ],
      phone: "770776323",
      email: "ayman.alqurashi@example.com",
      bio: "محامي شاب طموح، حاصل على البكالوريوس الليسانس في القانون من جامعة صنعاء عام 2021. يتمتع بخبرة عملية وتدريبية مكثفة في المجال القانوني، ويطمح لتطوير مهاراته والمساهمة في تحقيق العدالة.",
      training: [
        "دورات في التطبيقات القضائية",
        "دورة صياغة الدعاوى والرد عليها",
        "دورة صياغة الدفوع والرد عليها",
        "دورة إجراءات تقديم الدعاوى أمام المحكمة",
        "دورة التقاضي وفن المرافعة",
        "دورة قسمة التركات",
        "دورة صياغة العقود",
        "دورة الضبطية القضائية والإدارية",
      ],
      isActive: true,
      createdAt: "2023-06-20T00:00:00.000Z",
    },
    {
      _id: "4",
      name: "ناصر علي مبخوت أبونسران",
      position: "محامي ومستشار قانوني",
      image: "/lawyer3.jpg",
      specializations: [
        "القانون المدني",
        "القانون التجاري",
        "الاستشارات القانونية",
      ],
      experience: "7+ سنوات",
      education: ["ليسانس شريعة وقانون- جامعة صنعاء"],
      achievements: ["عضو بنقابة المحامين اليمنيين"],
      phone: "777797147",
      email: "Nasser.abonasran@gmail.com",
      address: "أمانة العاصمة-بني الحارث - الخميس",
      bio: "محامي ومستشار قانوني محترف يتمتع بخبرة واسعة في المجال القانوني. متخصص في تقديم الاستشارات القانونية والترافع أمام المحاكم.",
      isActive: true,
      createdAt: "2023-09-10T00:00:00.000Z",
    },
    {
      _id: "5",
      name: "شرف عبده احمد حلبوب",
      position: "محامي ومستشار قانوني",
      image: "/lawyer4.jpg",
      specializations: ["حقوق الإنسان", "القانون الدولي", "القانون المدني"],
      experience: "6+ سنوات",
      education: [
        "ليسانس شريعه وقانون-كلية الشريعه والقانون-جامعة صنعاء",
        "دبلوم حقوق الانسان - مركز الدراسات والبحوث - جامعة صنعاء",
        "دبلوم تمريض عالي",
        "دبلوم مساعد طبيب",
        "دبلوم برامج تطبيقيه",
      ],
      achievements: [
        "عضو نقابة المحاميين اليمنيين-صنعاء",
        "خريج برنامج القيادات الشابة UNDP6 التابع لبرنامج الأمم المتحدة الإنمائي",
      ],
      phone: "00967774266744",
      email: "sharafkn2022@gmail.com",
      bio: "محامي متعدد المهارات يتمتع بخلفية متنوعة في القانون والتمريض وحقوق الإنسان. يمتلك خبرة في إدارة المشاريع والمحاسبة.",
      additionalSkills: ["دورات محاسبة وادارة مشاريع"],
      isActive: true,
      createdAt: "2023-11-05T00:00:00.000Z",
    },
    {
      _id: "6",
      name: "أحمد ياسين الجبيحي",
      position: "محام ومستشار قانوني",
      image: "/lawyer5.jpg",
      specializations: ["القانون الإنساني", "مراقبة الجودة", "إدارة المشاريع"],
      experience: "8+ سنوات",
      education: ["ليسانس قانون - جامعة صنعاء"],
      achievements: [
        "عضو في نقابة المحامين اليمنيين",
        "مدرب مدربين معتمد (PTM)",
      ],
      phone: "775123456",
      email: "ahmed.aljabeehi@example.com",
      bio: "محام ومستشار قانوني سابقاً كباحث ميداني في مركز دراسات، ثم ضابط جودة في مشروع الصحة الانجابية، ثم مراقب ميداني في مشروع توزيع الغذاء العام ومشروع الاستجابة السريعة والطارئة للنازحين.",
      experienceDetails: [
        "باحث ميداني في مركز دراسات",
        "ضابط جودة في مشروع الصحة الانجابية",
        "مراقب ميداني في مشروع توزيع الغذاء العام (GFD)",
        "مراقب ميداني في مشروع الاستجابة السريعة والطارئة للنازحين (RRM)",
      ],
      trainingPrograms: [
        "برنامج التوعية المجتمعية بمعايير اسفير للأعمال الاغاثية والاستجابة الانسانية",
        "البرنامج التدريبي للحقوق والحريات",
        "برنامج إدارة المشاريع التنموية للمنظمات المانحة",
        "برنامج (PTM) مدرب مدربين معتمد",
      ],
      isActive: true,
      createdAt: "2024-01-15T00:00:00.000Z",
    },
    {
      _id: "7",
      name: "عدنان ناصر علي شراح",
      position: "محامي ومستشار قانوني",
      image: "/lawyer6.jpg",
      specializations: ["التحكيم الدولي", "صياغة العقود", "تدريب المحامين"],
      experience: "6+ سنوات",
      education: ["ليسانس شريعة وقانون- جامعة صنعاء"],
      achievements: [
        "عضو بنقابة المحامين اليمنيين",
        "عضو ملتقى القانونين",
        "خبير في مجال التحكيم الدولي",
      ],
      phone: "783935388",
      email: "adananadanan12@gmail.com",
      bio: "محامي ومستشار قانوني يتمتع بخبرة تزيد عن ست سنوات في مجال المحاماة. خبير في التحكيم الدولي ومدرب للمحامين تحت التدريب.",
      expertise: [
        "خبير في مجال التحكيم الدولي",
        "مدرب المحامين تحت التدريب",
        "خبرة في مجال المحاماه لاكثر من ست سنوات",
      ],
      trainingCourses: [
        "دورة صياغة العقود",
        "دورة فن اعداد العرائض والدفوع",
        "دوره في مجال التحكيم",
      ],
      isActive: true,
      createdAt: "2024-02-20T00:00:00.000Z", // أحدث عضو
    },
  ];

  const teamStats = [
    {
      number: teamMembers.length.toString(),
      label: "محامون متخصصون",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "65+",
      label: "سنوات خبرة مجمعة",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "15+",
      label: "مجالات تخصص",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      number: "100%",
      label: "التزام بالمهنية",
      icon: <Star className="w-6 h-6" />,
    },
  ];

  const toggleExpand = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // دالة لترتيب الأعضاء من الأقدم إلى الأحدث
  const sortMembersByDate = (members: TeamMember[]) => {
    return members.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return (a._id || "").localeCompare(b._id || "");
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Loading Skeleton */}
          <section className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="w-8 h-8 border border-primary rotate-45" />
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="h-12 bg-muted rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-6 bg-muted rounded w-2/3 mx-auto animate-pulse"></div>
            </div>
          </section>

          {/* Loading Team Members */}
          <section className="space-y-12">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    <div className="lg:col-span-1 space-y-6">
                      <div className="w-48 h-48 bg-muted rounded-full mx-auto"></div>
                      <div className="space-y-3">
                        <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
                      </div>
                    </div>
                    <div className="lg:col-span-3 space-y-6">
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                      <div className="h-4 bg-muted rounded w-4/6"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>
      </div>
    );
  }

  // ترتيب الأعضاء من الأقدم إلى الأحدث
  const sortedMembers = sortMembersByDate([...teamMembers]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-6 h-6 sm:w-8 sm:h-8 border border-primary rotate-45" />
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary rounded-full flex items-center justify-center">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-l from-primary via-foreground to-primary bg-clip-text text-transparent">
                فريق العمل
              </span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              فريق متكامل من المحامين والمستشارين القانونيين المتخصصين يعملون
              بتفان لتحقيق أفضل النتائج لعملائنا بمختلف التخصصات القانونية
            </p>
          </div>
        </section>

        {/* Team Stats */}
        <section className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {teamStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-card/50 border-primary/20 hover:bg-card/80 transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
                <div className="text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-3xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Team Members */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">أعضاء الفريق</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              تعرف على فريقنا المتكامل من المحامين والمستشارين القانونيين
              المتخصصين
            </p>
            
          </div>

          <div className="space-y-6">
            {sortedMembers.map((member, index) => (
              <Card
                key={member._id || index}
                className="group hover:shadow-xl transition-all duration-500 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40"
              >
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Profile Image and Basic Info */}
                    <div className="w-full lg:w-1/4 space-y-4">
                      <div className="relative mx-auto lg:mx-0 max-w-[200px]">
                        <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full" />
                        <div className="relative w-full aspect-square">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="w-full h-full object-cover rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="text-center lg:text-right space-y-2">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {member.name}
                        </h3>
                        <p className="text-primary font-medium text-sm">
                          {member.position}
                        </p>
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                          <Briefcase className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {member.experience}
                          </span>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 pt-3 border-t border-border/50">
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                          <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="break-all text-xs sm:text-sm">
                            {member.phone}
                          </span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                          <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="break-all text-xs sm:text-sm">
                            {member.email}
                          </span>
                        </div>
                        {member.address && (
                          <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
                            <span className="text-xs sm:text-sm">
                              📍 {truncateText(member.address, 30)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Detailed Information */}
                    <div className="w-full lg:w-3/4 space-y-6">
                      {/* Bio */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          نبذة شخصية
                        </h4>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                          {expandedMember === member._id
                            ? member.bio
                            : truncateText(member.bio, 150)}
                          {member.bio.length > 150 && (
                            <button
                              onClick={() =>
                                toggleExpand(member._id || index.toString())
                              }
                              className="text-primary hover:text-primary/80 transition-colors mr-2 text-sm"
                            >
                              {expandedMember === member._id
                                ? "عرض أقل"
                                : "عرض المزيد"}
                            </button>
                          )}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Specializations */}
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold flex items-center gap-2">
                            <Gavel className="w-5 h-5 text-primary" />
                            التخصصات
                          </h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {member.specializations.map((spec, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm py-1"
                              >
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            الإنجازات
                          </h4>
                          <ul className="space-y-1">
                            {member.achievements
                              .slice(
                                0,
                                expandedMember === member._id ? undefined : 3
                              )
                              .map((achievement, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-xs sm:text-sm">
                                    {achievement}
                                  </span>
                                </li>
                              ))}
                            {member.achievements.length > 3 &&
                              expandedMember !== member._id && (
                                <button
                                  onClick={() =>
                                    toggleExpand(member._id || index.toString())
                                  }
                                  className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1"
                                >
                                  <ChevronDown className="w-4 h-4" />
                                  عرض المزيد ({member.achievements.length - 3})
                                </button>
                              )}
                          </ul>
                        </div>
                      </div>

                      {/* Education */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          المؤهلات العلمية
                        </h4>
                        <ul className="space-y-1">
                          {member.education
                            .slice(
                              0,
                              expandedMember === member._id ? undefined : 2
                            )
                            .map((edu, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-xs sm:text-sm">
                                  {edu}
                                </span>
                              </li>
                            ))}
                          {member.education.length > 2 &&
                            expandedMember !== member._id && (
                              <button
                                onClick={() =>
                                  toggleExpand(member._id || index.toString())
                                }
                                className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1"
                              >
                                <ChevronDown className="w-4 h-4" />
                                عرض المزيد ({member.education.length - 2})
                              </button>
                            )}
                        </ul>
                      </div>

                      {/* Additional Sections - Show only when expanded */}
                      {expandedMember === member._id && (
                        <>
                          {/* Training */}
                          {member.training && member.training.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-lg font-semibold flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-primary" />
                                الدورات التدريبية
                              </h4>
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {member.training.map((course, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="border-primary/30 text-muted-foreground text-xs sm:text-sm py-1"
                                  >
                                    {course}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Expertise */}
                          {member.expertise && member.expertise.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-lg font-semibold flex items-center gap-2">
                                <Star className="w-5 h-5 text-primary" />
                                الخبرات المتخصصة
                              </h4>
                              <ul className="space-y-1">
                                {member.expertise.map((exp, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                      {exp}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}

                      {/* Expand/Collapse Button */}
                      <div className="pt-4 border-t border-border/50">
                        <button
                          onClick={() =>
                            toggleExpand(member._id || index.toString())
                          }
                          className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1"
                        >
                          {expandedMember === member._id ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              عرض مختصر
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              عرض التفاصيل الكاملة
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Our Team */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">
              لماذا تختار فريقنا؟
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              مميزات تجعلنا الخيار الأمثل لخدماتكم القانونية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8 text-primary" />,
                title: "خبرة متنوعة",
                description:
                  "فريق متخصص في مختلف المجالات القانونية لتغطية شاملة لاحتياجاتكم",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "عمل جماعي",
                description:
                  "نعمل كفريق واحد لضمان أفضل النتائج وتقديم خدمة متكاملة",
              },
              {
                icon: <Star className="w-8 h-8 text-primary" />,
                title: "التزام بالجودة",
                description:
                  "نلتزم بأعلى معايير الجودة والمهنية في جميع خدماتنا القانونية",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:scale-105 transition-all duration-300 bg-card/50 border-primary/20 hover:border-primary/40"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-8">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
            <CardContent className="p-8 sm:p-12 space-y-6">
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto" />
              <h3 className="text-2xl sm:text-3xl font-bold">
                تواصل مع فريقنا
              </h3>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                فريقنا المتكامل من المحامين المتخصصين جاهز لمساعدتك في جميع
                احتياجاتك القانونية. تواصل معنا اليوم للحصول على استشارة مجانية
                من الخبير المناسب لتخصصك.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-6 py-3 text-base"
                >
                  <Link href="/contact">
                    <MessageCircle className="w-5 h-5 ml-2" />
                    تواصل معنا الآن
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-6 py-3 text-base border-primary/30 hover:bg-primary/10"
                >
                  <Link href="/services">
                    <ArrowLeft className="w-5 h-5 ml-2" />
                    تعرف على خدماتنا
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
