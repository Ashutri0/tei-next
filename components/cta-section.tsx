import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
            Ready to Optimize Your Operations?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Contact our team of experts to discuss your industrial equipment needs and get a customized solution.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote">
              <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
