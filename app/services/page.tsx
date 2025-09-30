"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Scale,
  Gavel,
  Shield,
  Building,
  FileText,
  Users,
  BookOpen,
  GraduationCap,
  Phone,
  ArrowLeft,
  CheckCircle,
  Star,
  Award,
  MessageCircle,
  Briefcase,
  Search,
  PenTool,
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const mainServices = [
    {
      icon: <MessageCircle className="w-10 h-10 text-primary" />,
      title: "الاستشارات القانونية",
      description:
        "نقدم استشارات قانونية شاملة في جميع المجالات القانونية والشرعية مع ضمان السرية التامة والمهنية العالية",
      features: ["استشارة فورية", "سرية تامة", "خبرة متخصصة", "متابعة مستمرة"],
      scope:
        "تشمل الاستشارات القانونية في القانون المدني، التجاري، الجنائي، الأحوال الشخصية، العمل، والقانون الإداري",
      benefits: [
        "حلول قانونية مبتكرة",
        "توفير الوقت والجهد",
        "تجنب المشاكل القانونية",
        "اتخاذ قرارات مدروسة",
      ],
    },
    {
      icon: <Gavel className="w-10 h-10 text-primary" />,
      title: "المرافعة أمام المحاكم",
      description:
        "تمثيل قانوني احترافي أمام جميع درجات المحاكم بما فيها المحكمة العليا مع خبرة واسعة في إدارة القضايا",
      features: ["تمثيل قانوني", "خبرة واسعة", "نتائج مضمونة", "متابعة شاملة"],
      scope:
        "المرافعة أمام المحاكم الابتدائية، الاستئنافية، والعليا في جميع أنواع القضايا المدنية والتجارية والجنائية",
      benefits: [
        "دفاع قوي ومؤثر",
        "استراتيجيات قانونية محكمة",
        "خبرة في إجراءات التقاضي",
        "حماية حقوق العملاء",
      ],
    },
    {
      icon: <Building className="w-10 h-10 text-primary" />,
      title: "التحكيم التجاري",
      description:
        "خدمات التحكيم التجاري الدولي وفض المنازعات التجارية بكفاءة عالية وفقاً للمعايير الدولية",
      features: ["تحكيم دولي", "حلول سريعة", "توفير التكاليف", "خبرة متخصصة"],
      scope:
        "التحكيم في المنازعات التجارية، عقود الاستثمار، المشاريع الكبرى، والنزاعات الدولية",
      benefits: [
        "بديل فعال للتقاضي",
        "سرعة في الفصل",
        "مرونة في الإجراءات",
        "تنفيذ دولي للأحكام",
      ],
    },
    {
      icon: <PenTool className="w-10 h-10 text-primary" />,
      title: "الصياغة القانونية",
      description:
        "صياغة العقود والوثائق القانونية بدقة واحترافية عالية وفقاً للمعايير الدولية والقوانين المحلية",
      features: ["صياغة دقيقة", "مراجعة شاملة", "ضمان قانوني", "تحديث مستمر"],
      scope:
        "صياغة العقود التجارية، اتفاقيات الشراكة، عقود العمل، الوثائق القانونية، واللوائح الداخلية",
      benefits: [
        "حماية قانونية شاملة",
        "تجنب النزاعات",
        "وضوح في الالتزامات",
        "مطابقة للقوانين",
      ],
    },
    {
      icon: <Search className="w-10 h-10 text-primary" />,
      title: "البحوث القانونية",
      description:
        "إعداد بحوث ودراسات قانونية متخصصة تساعد في اتخاذ القرارات القانونية المدروسة والمبنية على أسس علمية",
      features: ["بحوث متخصصة", "تحليل قانوني", "مراجع موثقة", "توصيات عملية"],
      scope:
        "البحوث في القانون المقارن، الدراسات التشريعية، تحليل الأحكام القضائية، والاستشارات الأكاديمية",
      benefits: [
        "فهم عميق للقضايا",
        "قرارات مدروسة",
        "أساس علمي قوي",
        "حلول مبتكرة",
      ],
    },
    {
      icon: <GraduationCap className="w-10 h-10 text-primary" />,
      title: "التدريب القانوني",
      description:
        "برامج تدريبية متخصصة في المجالات القانونية المختلفة لتطوير المهارات القانونية والمهنية",
      features: ["برامج متخصصة", "مدربون خبراء", "شهادات معتمدة", "تطبيق عملي"],
      scope:
        "التدريب على المرافعة، الصياغة القانونية، التحكيم، وإدارة المكاتب القانونية",
      benefits: ["تطوير المهارات", "خبرة عملية", "شبكة مهنية", "تحديث المعرفة"],
    },
  ];

  const specializations = [
    { name: "القانون المدني", icon: <Scale className="w-5 h-5" /> },
    { name: "القانون التجاري", icon: <Building className="w-5 h-5" /> },
    { name: "القانون الجنائي", icon: <Shield className="w-5 h-5" /> },
    { name: "قانون الأحوال الشخصية", icon: <Users className="w-5 h-5" /> },
    { name: "قانون العمل", icon: <Briefcase className="w-5 h-5" /> },
    { name: "القانون الإداري", icon: <FileText className="w-5 h-5" /> },
    { name: "القانون الدولي", icon: <Award className="w-5 h-5" /> },
    { name: "قانون الاستثمار", icon: <Star className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      {/* <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
              <Scale className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">المحامي خالد الناصر</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                الرئيسية
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                من نحن
              </Link>
              <Link href="/services" className="text-primary font-medium">
                خدماتنا
              </Link>
              <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors">
                فريق العمل
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                المقالات
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                اتصل بنا
              </Link>
            </div>

            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contact">احجز استشارة</Link>
            </Button>
          </div>
        </div>
      </nav> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
                <Gavel className="w-6 h-6 text-primary" />
              </div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-8 h-8 border border-primary rotate-45" />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
                <Scale className="w-6 h-6 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              <span className="bg-gradient-to-l from-primary via-foreground to-primary bg-clip-text text-transparent">
                خدماتنا القانونية
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              نقدم مجموعة شاملة من الخدمات القانونية المتخصصة لتلبية جميع
              احتياجاتكم القانونية بأعلى معايير الجودة والمهنية
            </p>
          </div>
        </section>

        {/* Main Services */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">خدماتنا الأساسية</h2>
            <p className="text-lg text-muted-foreground">
              خدمات قانونية متكاملة تغطي جميع المجالات القانونية
            </p>
          </div>

          <div className="space-y-12">
            {mainServices.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] bg-card/50 border-primary/20 hover:border-primary/40"
              >
                <CardContent className="p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Service Header */}
                    <div className="lg:col-span-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <h4 className="text-lg font-semibold">
                              نطاق الخدمة
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.scope}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-primary" />
                            <h4 className="text-lg font-semibold">الفوائد</h4>
                          </div>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Specializations */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">مجالات التخصص</h2>
            <p className="text-lg text-muted-foreground">
              نتخصص في مختلف فروع القانون لتقديم خدمة شاملة
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specializations.map((spec, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/50 border-primary/20 hover:border-primary/40"
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {spec.icon}
                  </div>
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                    {spec.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">كيف نعمل</h2>
            <p className="text-lg text-muted-foreground">
              منهجية عمل واضحة لضمان أفضل النتائج
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "الاستشارة الأولية",
                desc: "تقييم شامل لحالتكم القانونية",
              },
              {
                step: "02",
                title: "وضع الاستراتيجية",
                desc: "تطوير خطة عمل مخصصة",
              },
              {
                step: "03",
                title: "التنفيذ",
                desc: "تطبيق الحلول القانونية المناسبة",
              },
              {
                step: "04",
                title: "المتابعة",
                desc: "ضمان تحقيق النتائج المطلوبة",
              },
            ].map((process, index) => (
              <Card
                key={index}
                className="text-center hover:scale-105 transition-all duration-300 bg-card/50 border-primary/20"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold">
                      {process.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {process.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-8">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
            <CardContent className="p-12 space-y-6">
              <Scale className="w-16 h-16 text-primary mx-auto animate-pulse" />
              <h3 className="text-3xl font-bold">
                هل تحتاج خدماتنا القانونية؟
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                تواصل معنا اليوم للحصول على استشارة مجانية وتعرف على كيف يمكننا
                مساعدتك في تحقيق أهدافك القانونية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg"
                >
                  <Link href="/contact">
                    <Phone className="w-5 h-5 ml-2" />
                    احجز استشارة مجانية
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg border-primary/30 hover:bg-primary/10 bg-transparent"
                >
                  <Link href="/about">
                    <ArrowLeft className="w-5 h-5 ml-2" />
                    تعرف على المكتب
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
