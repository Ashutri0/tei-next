import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedProducts } from "@/components/featured-products"
import { IndustriesSection } from "@/components/industries-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <FeaturedProducts />
      <IndustriesSection />
      <CTASection />
    </main>
  )
}
