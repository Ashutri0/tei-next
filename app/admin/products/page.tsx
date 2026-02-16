"use client"

import type React from "react"

import { useState } from "react"
import { useStore, categories, type Product } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, Pencil, Trash2, Star } from "lucide-react"

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id)
  }

  const handleToggleFeatured = (product: Product) => {
    updateProduct({ ...product, featured: !product.featured })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[75vh] flex flex-col p-0">
            <DialogHeader className="px-6 py-4 border-b border-border/50 shrink-0">
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the product details below.</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 px-6 py-4">
              <ProductForm
                onClose={() => setIsAddDialogOpen(false)}
                onSave={(product) => {
                  addProduct(product)
                  setIsAddDialogOpen(false)
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Product List ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img
                            src={product.images?.[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate max-w-[200px]">{product.name}</p>
                          {product.images.length > 1 && (
                            <p className="text-xs text-muted-foreground">{product.images.length} images</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{product.subcategory}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFeatured(product)}
                        className={product.featured ? "text-yellow-500" : "text-muted-foreground"}
                      >
                        <Star className={`h-4 w-4 ${product.featured ? "fill-current" : ""}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] max-h-[75vh] flex flex-col p-0">
                            <DialogHeader className="px-6 py-4 border-b border-border/50 shrink-0">
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>Update the product details.</DialogDescription>
                            </DialogHeader>
                            <div className="overflow-y-auto flex-1 px-6 py-4">
                              <ProductForm
                                product={editingProduct || undefined}
                                onClose={() => setEditingProduct(null)}
                                onSave={(updated) => {
                                  updateProduct(updated as Product)
                                  setEditingProduct(null)
                                }}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductForm({
  product,
  onClose,
  onSave,
}: {
  product?: Product
  onClose: () => void
  onSave: (product: Omit<Product, "id"> | Product) => void
}) {
  const [formData, setFormData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    category: product?.category || "",
    subcategory: product?.subcategory || "",
    description: product?.description || "",
    specifications: product?.specifications?.join("\n") || "",
    images: product?.images || [],
    imageUrl: "",
    featured: product?.featured || false,
    createdAt: product?.createdAt || new Date().toISOString().split("T")[0],
  })

  const [selectedCategory, setSelectedCategory] = useState(formData.category)
  const subcategories = categories.find((c) => c.name === selectedCategory)?.subcategories || []

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const dataUrl = reader.result as string
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, dataUrl],
          }))
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleAddImageUrl = () => {
    if (formData.imageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, formData.imageUrl],
        imageUrl: "",
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.images.length === 0) {
      alert("Please add at least one image")
      return
    }

    const productData = {
      ...formData,
      specifications: formData.specifications.split("\n").filter((s) => s.trim()),
      imageUrl: undefined,
    }

    if (product) {
      onSave(productData as Product)
    } else {
      const { id, imageUrl, ...newProduct } = productData
      onSave(newProduct)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => {
              setFormData({ ...formData, category: value, subcategory: "" })
              setSelectedCategory(value)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.name} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subcategory">Subcategory</Label>
          <Select
            value={formData.subcategory}
            onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specifications">Specifications (one per line)</Label>
        <Textarea
          id="specifications"
          value={formData.specifications}
          onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
          placeholder="Max Temp: 350°C&#10;Flow Rate: 500 m³/h"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Product Images (Upload Multiple)</Label>
        <div className="space-y-3">
          {/* Image Previews */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-lg border border-border group">
                  <img src={img} alt={`Preview ${idx + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-white text-xs font-semibold">Remove</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Section */}
          <div>
            <Label htmlFor="image-upload" className="block text-xs text-muted-foreground mb-2">
              Upload Images (Multiple)
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="cursor-pointer"
            />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or Add URL</span>
            </div>
          </div>

          {/* URL Input */}
          <div className="flex gap-2">
            <Input
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/product-image.jpg"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddImageUrl}
              disabled={!formData.imageUrl.trim()}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label htmlFor="featured">Featured Product</Label>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" className="bg-transparent" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Product</Button>
      </DialogFooter>
    </form>
  )
}
