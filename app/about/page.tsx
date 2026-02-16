import type { Metadata } from "next"
import { CheckCircle, Users, Globe, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Thermal Energy International",
  description: "Learn about TEI's 25+ years of experience providing industrial solutions to facilities worldwide.",
}

const values = [
  {
    icon: CheckCircle,
    title: "Quality First",
    description: "We source only the highest quality components from certified manufacturers worldwide.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Our dedicated team provides personalized service and technical support at every step.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serving industrial facilities across 50+ countries with reliable logistics and support.",
  },
  {
    icon: Award,
    title: "Industry Expertise",
    description: "25+ years of specialized knowledge in industrial equipment and automation systems.",
  },
]

const milestones = [
  { year: "1998", title: "Company Founded", description: "Started as a small mechanical parts supplier" },
  { year: "2005", title: "Electrical Division", description: "Expanded into electrical equipment and drives" },
  { year: "2012", title: "Automation Services", description: "Added PLC programming and SCADA systems" },
  { year: "2018", title: "Global Expansion", description: "Opened distribution centers in 3 continents" },
  { year: "2024", title: "500+ Clients", description: "Serving major industrial facilities worldwide" },
]

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              About Thermal Energy International
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              For over 25 years, TEI has been a trusted partner for industrial facilities seeking reliable mechanical,
              electrical, and automation solutions. Our commitment to quality and service has made us a leader in the
              industry.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Mission</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                To provide industrial facilities with the highest quality equipment and solutions that maximize
                operational efficiency, reduce downtime, and ensure long-term reliability. We believe in building
                lasting partnerships with our clients through exceptional service and technical expertise.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our team of engineers and industry specialists work closely with each client to understand their unique
                challenges and deliver customized solutions that meet their specific requirements.
              </p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
              <img
                src="/industrial-facility-control-room-with-engineers.jpg"
                alt="TEI engineering team at work"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Core Values</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and define how we serve our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Journey</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              From a small parts supplier to a global industrial solutions provider.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      {milestone.year}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{milestone.title}</h3>
                    <p className="mt-1 text-muted-foreground">{milestone.description}</p>
                  </div>
                  <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary hidden md:flex" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
