import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedProducts } from "@/components/featured-products"
import { IndustriesSection } from "@/components/industries-section"
import { CTASection } from "@/components/cta-section"
import { Brands } from "@/components/brands"

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <FeaturedProducts />
      <IndustriesSection />
      <Brands />
      <CTASection />
    </main>
  )
}
