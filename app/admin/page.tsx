"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, FileText, Clock, MessageSquare } from "lucide-react"

export default function AdminDashboardPage() {
  const { products, quotes, contacts } = useStore()

  const pendingQuotes = quotes.filter((q) => q.status === "pending").length
  const newContacts = contacts.filter((c) => c.status === "new").length
  const totalProducts = products.length
  const featuredProducts = products.filter((p) => p.featured).length

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      description: `${featuredProducts} featured`,
      icon: Package,
    },
    {
      title: "Quote Requests",
      value: quotes.length,
      description: `${pendingQuotes} pending`,
      icon: FileText,
    },
    {
      title: "Contact Messages",
      value: contacts.length,
      description: `${newContacts} new`,
      icon: MessageSquare,
    },
    {
      title: "Response Time",
      value: "24h",
      description: "Average response",
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to the TEI admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Quote Requests */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Recent Quote Requests</CardTitle>
          <CardDescription>Latest requests from customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quotes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No quote requests yet.</p>
            ) : (
              quotes.slice(0, 5).map((quote) => (
                <div
                  key={quote.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{quote.name}</p>
                    <p className="text-xs text-muted-foreground">{quote.company}</p>
                    <p className="text-xs text-muted-foreground">{quote.productName}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        quote.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : quote.status === "contacted"
                            ? "bg-blue-100 text-blue-800"
                            : quote.status === "quoted"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {quote.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{quote.createdAt}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Contact Messages */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Recent Contact Messages</CardTitle>
          <CardDescription>Latest messages from contact form</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No contact messages yet.</p>
            ) : (
              contacts.slice(0, 5).map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{contact.email}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{contact.message}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        contact.status === "new"
                          ? "bg-yellow-100 text-yellow-800"
                          : contact.status === "read"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {contact.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{contact.createdAt}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
