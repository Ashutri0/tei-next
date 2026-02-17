"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Send, Clock, Shield } from "lucide-react"

export default function QuotePage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("product")
  const { products, addQuote } = useStore()

  const [selectedProduct, setSelectedProduct] = useState(productId || "")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (productId) {
      setSelectedProduct(productId)
    }
  }, [productId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const product = products.find((p) => p.id === selectedProduct)

    addQuote({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      productId: selectedProduct,
      productName: product?.name || "Unknown Product",
      message: formData.message,
    })

    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <main className="py-24 bg-background">
        <div className="mx-auto max-w-2xl px-4 lg:px-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Quote Request Submitted</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Thank you for your interest! Our team will review your request and get back to you within 24-48 business
            hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: "", email: "", phone: "", company: "", message: "" })
                setSelectedProduct("")
              }}
            >
              Submit Another Request
            </Button>
            <Button variant="outline" className="bg-transparent" asChild>
              <a href="/products">Browse More Products</a>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Request a Quote</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Fill out the form below and our team will prepare a customized quote for your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Quote Request Form</CardTitle>
                  <CardDescription>Please provide your details and product requirements.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="product">Select Product *</Label>
                      <Select value={selectedProduct} onValueChange={setSelectedProduct} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Personal Info */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Company Inc."
                          required
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Requirements</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your specific requirements, quantities needed, delivery timeline, etc."
                        rows={5}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Quote Request
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Fast Response</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        We respond to all quote requests within 24-48 business hours.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Secure & Private</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Your information is kept confidential and never shared with third parties.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">No Obligation</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Receive a customized quote with no commitment required.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Product Preview */}
              {selectedProduct && (
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Selected Product</h3>
                    {(() => {
                      const product = products.find((p) => p.id === selectedProduct)
                      if (!product) return null
                      return (
                        <div className="flex gap-4">
                          <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground line-clamp-2">{product.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {product.category} - {product.subcategory}
                            </p>
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
