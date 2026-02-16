import { Factory, Flame, Building2, Droplets, Cog } from "lucide-react"

const industries = [
  {
    icon: Factory,
    name: "Steel Mills",
    description: "Complete solutions for rolling mills, blast furnaces, and steel processing lines.",
  },
  {
    icon: Flame,
    name: "Power Plants",
    description: "Equipment for thermal, hydro, and renewable power generation facilities.",
  },
  {
    icon: Building2,
    name: "Cement Plants",
    description: "Specialized components for kilns, grinding mills, and material handling.",
  },
  {
    icon: Droplets,
    name: "Petrochemical",
    description: "High-performance equipment for refineries and chemical processing.",
  },
  {
    icon: Cog,
    name: "Manufacturing",
    description: "Automation and machinery solutions for diverse manufacturing needs.",
  },
]

export function IndustriesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Industries We Serve</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering specialized solutions across critical industrial sectors
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group relative flex flex-col items-center p-6 rounded-2xl border border-border/50 bg-background hover:border-primary/50 hover:bg-muted/30 transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <industry.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{industry.name}</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
