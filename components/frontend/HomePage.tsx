"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Scale,
  Phone,
  Award,
  Gavel,
  Building,
  FileText,
  Star,
  CheckCircle,
  ArrowLeft,
  Eye,
  Heart,
  Users,
  MessageCircle,
  Mail,
  MapPin,
  Shield,
  Sparkles,
} from "lucide-react";

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
}

interface Stat {
  number: string;
  label: string;
  icon: JSX.Element;
}

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services: Service[] = [
    {
      icon: <MessageCircle className="w-8 h-8 text-primary" />,
      title: "الاستشارات القانونية",
      description: "استشارات قانونية شاملة في جميع المجالات القانونية والشرعية مع ضمان السرية التامة",
      features: ["استشارة فورية", "سرية تامة", "خبرة متخصصة"],
    },
    {
      icon: <Gavel className="w-8 h-8 text-primary" />,
      title: "المرافعة أمام المحاكم",
      description: "تمثيل قانوني احترافي أمام جميع درجات المحاكم بما فيها المحكمة العليا",
      features: ["تمثيل قانوني", "خبرة واسعة", "نتائج مضمونة"],
    },
    {
      icon: <Building className="w-8 h-8 text-primary" />,
      title: "التحكيم التجاري",
      description: "خدمات التحكيم التجاري الدولي وفض المنازعات التجارية بكفاءة عالية",
      features: ["تحكيم دولي", "حلول سريعة", "توفير التكاليف"],
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "الصياغة القانونية",
      description: "صياغة العقود والوثائق القانونية بدقة واحترافية عالية وفقاً للمعايير الدولية",
      features: ["صياغة دقيقة", "مراجعة شاملة", "ضمان قانوني"],
    },
  ];

  const stats: Stat[] = [
    { number: "10+", label: "سنوات خبرة", icon: <Award className="w-6 h-6" /> },
    { number: "500+", label: "قضية ناجحة", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "98%", label: "معدل النجاح", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "دعم متواصل", icon: <Phone className="w-6 h-6" /> },
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Section */}
      <section className="space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-2xl sm:rounded-3xl" />

          <div className="absolute top-10 left-10 opacity-10">
            <div className="w-20 h-20 border-2 border-primary rounded-full flex items-center justify-center">
              <Scale className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="absolute bottom-10 right-10 opacity-10">
            <div className="w-16 h-16 border border-primary rotate-45 flex items-center justify-center">
              <Gavel className="w-6 h-6 text-primary -rotate-45" />
            </div>
          </div>

          <div className="relative text-center space-y-6 sm:space-y-8 max-w-4xl px-4">
            <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
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

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance">
                <span className="bg-gradient-to-l from-primary via-foreground to-primary bg-clip-text text-transparent">
                  العدالة
                </span>
                <br />
                <span className="text-foreground">هي هدفنا</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground text-pretty leading-relaxed max-w-3xl mx-auto">
                محامي ومستشار قانوني متخصص في الشريعة والقانون، مترافع أمام
                المحكمة العليا
                <br />
                <span className="text-primary font-semibold flex items-center justify-center gap-2 mt-2">
                  <Eye className="w-5 h-5" />
                  خبرة تزيد عن 10 عاماً في خدمة العدالة
                  <Heart className="w-5 h-5" />
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group animate-glow"
              >
                <Link href="/contact">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  احجز استشارة مجانية
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 group bg-transparent"
              >
                <Link href="/services">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
                  تعرف على خدماتنا
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
          {stats.map((stat: Stat, index: number) => (
            <Card
              key={index}
              className="bg-card/50 border-primary/20 hover:bg-card/80 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
            >
              <CardContent className="p-4 sm:p-6 text-center space-y-2 sm:space-y-3 relative z-10">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-1 right-1 w-3 h-3 border border-primary/50 rotate-45" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border border-primary/50 rounded-full" />
                </div>
                <div className="text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services Preview */}
        <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-900">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
              <Scale className="w-6 h-6 text-primary animate-pulse" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">
              خدماتنا القانونية
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground text-pretty">
              نقدم مجموعة شاملة من الخدمات القانونية المتخصصة
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {services.slice(0, 4).map((service: Service, index: number) => (
              <Link key={index} href="/services">
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-card/50 border-primary/20 hover:border-primary/40 cursor-pointer relative overflow-hidden h-full">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-2 right-2 w-4 h-4 border border-primary/30 rotate-45" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border border-primary/30 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-primary/20 rounded-full" />
                  </div>
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4 relative z-10">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature: string, idx: number) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20 text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">من نحن</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                مكتب قانوني متخصص في تقديم الخدمات القانونية الشاملة مع
                التزام كامل بقيم العدالة والمهنية. نفخر بخبرتنا الواسعة في
                مختلف المجالات القانونية وسعينا المستمر لتحقيق أفضل النتائج
                لعملائنا.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 bg-transparent"
              >
                <Link href="/about">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  تعرف على المكتب
                </Link>
              </Button>
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
                المتميزة، ونساهم في بناء مجتمع يسوده العدل والقانون.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-8">
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30 hover:scale-[1.01] transition-all duration-300">
          <CardContent className="p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
            <Scale className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto animate-pulse" />
            <h3 className="text-2xl sm:text-3xl font-bold">
              هل تحتاج استشارة قانونية؟
            </h3>
            <p className="text-muted-foreground text-base sm:text-lg">
              احجز موعداً للحصول على استشارة قانونية متخصصة وحلول قانونية
              فعالة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group"
              >
                <Link href="/contact">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  احجز استشارة الآن
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-primary/30 hover:bg-primary/10 bg-transparent"
              >
                <Link href="/team">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  تعرف على فريقنا
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
