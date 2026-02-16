import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Factory, Zap, Settings } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-muted-foreground ring-1 ring-border/50 hover:ring-border/80 transition-colors">
              Trusted by 500+ industrial facilities worldwide
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
            Industrial Solutions for <span className="text-primary">Maximum Efficiency</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Thermal Energy International provides comprehensive mechanical, electrical, and automation solutions for
            steel mills, power plants, cement plants, and industrial facilities worldwide.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-4">
            <Link href="/products">
              <Button size="lg" className="gap-2">
                View Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/quote">
              <Button variant="outline" size="lg">
                Request Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { icon: Factory, label: "Industrial Facilities", value: "500+" },
              { icon: Settings, label: "Products Delivered", value: "10,000+" },
              { icon: Zap, label: "Years Experience", value: "25+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border/50 bg-muted/30 p-6"
              >
                <stat.icon className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
