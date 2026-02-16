import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, Zap, Cpu, Gauge, ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "What We Offer | Thermal Energy International",
  description:
    "Comprehensive mechanical, electrical, automation, and instrumentation solutions for industrial facilities.",
}

const services = [
  {
    icon: Wrench,
    title: "Mechanical Solutions",
    description:
      "Complete range of mechanical components including pumps, valves, bearings, couplings, and gearboxes for heavy industrial applications.",
    features: [
      "High-temperature pumps for steel mills",
      "Heavy-duty valves and actuators",
      "Industrial bearings and seals",
      "Power transmission equipment",
      "Custom mechanical assemblies",
    ],
    href: "/products?category=Mechanical",
  },
  {
    icon: Zap,
    title: "Electrical Equipment",
    description:
      "Premium electrical equipment from motors and drives to transformers and switchgear, designed for demanding industrial environments.",
    features: [
      "IE4 high-efficiency motors",
      "Variable frequency drives (VFDs)",
      "Power transformers",
      "Medium voltage switchgear",
      "Industrial cables and wiring",
    ],
    href: "/products?category=Electrical",
  },
  {
    icon: Cpu,
    title: "Automation Systems",
    description:
      "State-of-the-art automation solutions including PLCs, HMIs, SCADA systems, and complete control system integration.",
    features: [
      "PLC programming and integration",
      "HMI design and implementation",
      "SCADA system development",
      "Industrial networking",
      "Process control optimization",
    ],
    href: "/products?category=Automation",
  },
  {
    icon: Gauge,
    title: "Instrumentation",
    description:
      "Precision instrumentation for process measurement and control, including flow meters, pressure sensors, and analyzers.",
    features: [
      "Flow measurement solutions",
      "Pressure and temperature sensors",
      "Level measurement devices",
      "Analytical instruments",
      "Calibration services",
    ],
    href: "/products?category=Instrumentation",
  },
]

const benefits = [
  "Technical consultation and engineering support",
  "Customized solutions for your specific needs",
  "Competitive pricing and flexible payment terms",
  "Fast delivery from global logistics network",
  "After-sales support and warranty service",
  "Training and documentation included",
]

export default function ServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              What We Offer
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Comprehensive industrial solutions across four key categories. From individual components to complete
              system integration, we have the expertise and products to meet your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <Card
                key={service.title}
                className="relative overflow-hidden border-border/50 hover:border-border transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="mt-4 text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href}>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      View Products <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Why Choose TEI?</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                With over 25 years of industry experience, we understand the critical nature of industrial operations.
                Our commitment to quality, reliability, and customer service sets us apart.
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/quote">
                  <Button size="lg" className="gap-2">
                    Request a Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted lg:aspect-auto lg:h-full lg:min-h-[500px]">
              <img
                src="/industrial-warehouse-with-equipment-and-machinery.jpg"
                alt="TEI warehouse and equipment"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
