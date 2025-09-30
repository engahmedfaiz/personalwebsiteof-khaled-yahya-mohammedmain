"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Scale,
  Award,
  Users,
  Eye,
  Heart,
  Target,
  Lightbulb,
  Shield,
  Building,
  Gavel,
  CheckCircle,
  Star,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: <Scale className="w-8 h-8 text-primary" />,
      title: "العدالة والنزاهة",
      description:
        "نؤمن بأن العدالة هي أساس المجتمع المتقدم، ونسعى لتحقيقها في كل قضية نتولاها",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "الثقة والأمانة",
      description:
        "نحافظ على سرية معلومات عملائنا ونتعامل معهم بشفافية ومصداقية تامة",
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "التميز والجودة",
      description:
        "نسعى للتميز في تقديم خدماتنا القانونية وفقاً لأعلى المعايير المهنية",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "خدمة العملاء",
      description:
        "نضع مصلحة عملائنا في المقدمة ونعمل على تحقيق أهدافهم القانونية",
    },
  ];

  const achievements = [
    { number: "15+", label: "سنوات خبرة", icon: <Award className="w-6 h-6" /> },
    {
      number: "500+",
      label: "قضية ناجحة",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    { number: "98%", label: "معدل النجاح", icon: <Star className="w-6 h-6" /> },
    {
      number: "24/7",
      label: "دعم متواصل",
      icon: <Shield className="w-6 h-6" />,
    },
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
              <Link href="/about" className="text-primary font-medium">
                من نحن
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
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
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-8 h-8 border border-primary rotate-45" />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
                <Gavel className="w-6 h-6 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              <span className="bg-gradient-to-l from-primary via-foreground to-primary bg-clip-text text-transparent">
                من نحن
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              مكتب قانوني متخصص في تقديم الخدمات القانونية الشاملة مع التزام
              كامل بقيم العدالة والمهنية
            </p>
          </div>
        </section>

        {/* Office History & Vision */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">تاريخ المكتب</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                تأسس مكتب المحامي خالد يحيى محمد الناصر عام 2008، ومنذ ذلك الحين
                وهو يقدم خدمات قانونية متميزة في مختلف المجالات القانونية. بدأ
                المكتب كممارسة فردية وتطور ليصبح من المكاتب القانونية المرموقة
                في اليمن، حيث يجمع بين الخبرة العملية والمعرفة الأكاديمية
                العميقة في الشريعة والقانون.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                على مدار أكثر من 15 عاماً، نجح المكتب في بناء سمعة طيبة من خلال
                تقديم خدمات قانونية عالية الجودة والتزام صارم بأخلاقيات المهنة.
                نفخر بكوننا شركاء موثوقين لعملائنا في رحلتهم نحو تحقيق العدالة.
              </p>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Scale className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">رؤيتنا</h3>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Eye className="w-5 h-5" />
                  <span className="font-medium">نحو عدالة أفضل</span>
                  <Eye className="w-5 h-5" />
                </div>
              </div>
              <p className="text-center text-muted-foreground leading-relaxed">
                أن نكون المكتب القانوني الرائد في تقديم الخدمات القانونية
                المتميزة، ونساهم في بناء مجتمع يسوده العدل والقانون، من خلال
                تقديم حلول قانونية مبتكرة وفعالة تحقق مصالح عملائنا وتحمي
                حقوقهم.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Mission */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">رسالتنا</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card/50 border-primary/20">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-center gap-2 text-primary mb-4">
                    <Heart className="w-6 h-6" />
                    <span className="text-lg font-medium">
                      التزامنا نحو العدالة
                    </span>
                    <Heart className="w-6 h-6" />
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    نلتزم بتقديم خدمات قانونية احترافية عالية الجودة، تقوم على
                    أسس الشريعة الإسلامية والقانون الوضعي، مع الحفاظ على أعلى
                    معايير النزاهة والشفافية. نسعى لحماية حقوق عملائنا وتحقيق
                    مصالحهم المشروعة من خلال فريق متخصص يتمتع بخبرة واسعة ومعرفة
                    عميقة بالقوانين المحلية والدولية.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Lightbulb className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">قيمنا ومبادئنا</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              القيم التي نؤمن بها وتوجه عملنا اليومي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-card/50 border-primary/20 hover:border-primary/40"
              >
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">إنجازاتنا</h2>
            <p className="text-lg text-muted-foreground">
              أرقام تعكس التزامنا بالتميز والجودة
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((stat, index) => (
              <Card
                key={index}
                className="bg-card/50 border-primary/20 hover:bg-card/80 transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
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
              <h3 className="text-3xl font-bold">هل تحتاج مساعدة قانونية؟</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                نحن هنا لمساعدتك في جميع احتياجاتك القانونية. تواصل معنا اليوم
                للحصول على استشارة مجانية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg"
                >
                  <Link href="/contact">احجز استشارة مجانية</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg border-primary/30 hover:bg-primary/10 bg-transparent"
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
