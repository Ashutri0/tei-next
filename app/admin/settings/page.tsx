"use client"

import type React from "react"
import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, Phone, MapPin, Clock } from "lucide-react"

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useStore()
  const [formData, setFormData] = useState({
    email: settings.email,
    phone: settings.phone,
    address: settings.address.join("\n"),
    businessHours: settings.businessHours.join("\n"),
  })
  const [isSaved, setIsSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings({
      email: formData.email,
      phone: formData.phone,
      address: formData.address.split("\n").filter((line) => line.trim()),
      businessHours: formData.businessHours.split("\n").filter((line) => line.trim()),
    })
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your site contact information</p>
      </div>

      <Card className="border-border/50 max-w-2xl">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update your business contact details. These will be displayed on the website footer and contact page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="info@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Address (one line per field)
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Industrial Avenue&#10;Manufacturing District&#10;City, State 12345"
                rows={3}
                required
              />
              <p className="text-xs text-muted-foreground">Enter each line of the address on a new line</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessHours" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Business Hours (one per line)
              </Label>
              <Textarea
                id="businessHours"
                value={formData.businessHours}
                onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                placeholder="Monday - Friday: 8:00 AM - 6:00 PM&#10;Saturday: 9:00 AM - 1:00 PM"
                rows={3}
                required
              />
              <p className="text-xs text-muted-foreground">Enter each schedule on a new line</p>
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit">Save Changes</Button>
              {isSaved && (
                <span className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Settings saved successfully
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
