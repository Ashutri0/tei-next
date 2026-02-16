"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, CheckCircle } from "lucide-react"
import { ProductCarousel } from "@/components/product-carousel"

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { products } = useStore()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isReady) {
    return (
      <main className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="h-96 bg-muted rounded-lg animate-pulse" />
        </div>
      </main>
    )
  }

  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <main>
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Back Button */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Image Carousel */}
            <ProductCarousel images={product.images} productName={product.name} />

            {/* Product Info */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">{product.subcategory}</Badge>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{product.name}</h1>

              <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Specifications */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.specifications.map((spec) => (
                      <li key={spec} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-foreground">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`/quote?product=${product.id}`} className="flex-1">
                  <Button size="lg" className="w-full">
                    Request a Quote
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <Card
                    key={relatedProduct.id}
                    className="group overflow-hidden border-border/50 hover:border-border transition-colors"
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={relatedProduct.images?.[0] || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{relatedProduct.subcategory}</p>
                      <h3 className="font-semibold text-foreground line-clamp-1">{relatedProduct.name}</h3>
                      <Link href={`/products/${relatedProduct.id}`} className="mt-3 block">
                        <Button variant="outline" className="w-full bg-transparent" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
