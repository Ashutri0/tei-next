"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, Factory, Zap, Settings } from "lucide-react"

const slides = [
  {
    image: "/steel-mill-industrial-plant-at-sunset.jpg",
    title: "Steel Mill Solutions",
  },
  {
    image: "/modern-power-plant-with-cooling-towers.jpg",
    title: "Power Plant Excellence",
  },
  {
    image: "/cement-factory-industrial-machinery.jpg",
    title: "Cement Plant Innovation",
  },
  {
    image: "/petrochemical-refinery-at-night-with-lights.jpg",
    title: "Petrochemical Engineering",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-8">
            <div className="inline-flex rounded-full px-4 py-1.5 text-sm leading-6 text-muted-foreground ring-1 ring-border/50 bg-background/80 backdrop-blur-sm">
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

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/products">
              <Button size="lg" className="gap-2">
                View Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/quote">
              <Button variant="outline" size="lg" className="bg-background/80 backdrop-blur-sm">
                Request Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2">
          <button
            onClick={() => {
              setIsAutoPlaying(false)
              prevSlide()
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2 px-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentSlide(index)
                }}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentSlide ? "w-6 bg-primary" : "bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => {
              setIsAutoPlaying(false)
              nextSlide()
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Carousel Indicators */}
        <div className="mt-8 flex justify-center gap-2 md:hidden">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false)
                setCurrentSlide(index)
              }}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide ? "w-6 bg-primary" : "bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-3xl">
          {[
            { icon: Factory, label: "Industrial Facilities", value: "500+" },
            { icon: Settings, label: "Products Delivered", value: "10,000+" },
            { icon: Zap, label: "Years Experience", value: "25+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm p-4"
            >
              <stat.icon className="h-8 w-8 text-primary shrink-0" />
              <div>
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
