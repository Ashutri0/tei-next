"use client"

import { useState } from "react"
import { useStore, type QuoteRequest } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Mail, Phone, Building2 } from "lucide-react"

const statusOptions: QuoteRequest["status"][] = ["pending", "contacted", "quoted", "closed"]

const statusColors: Record<QuoteRequest["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  quoted: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
}

export default function AdminQuotesPage() {
  const { quotes, updateQuoteStatus } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || quote.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (quoteId: string, newStatus: QuoteRequest["status"]) => {
    updateQuoteStatus(quoteId, newStatus)
    if (selectedQuote?.id === quoteId) {
      setSelectedQuote({ ...selectedQuote, status: newStatus })
    }
  }

  const pendingCount = quotes.filter((q) => q.status === "pending").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Quote Requests</h1>
        <p className="text-muted-foreground mt-1">Manage customer quote requests ({pendingCount} pending)</p>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, company, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Quote Requests ({filteredQuotes.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No quote requests found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="font-medium text-foreground">{quote.name}</p>
                          <p className="text-xs text-muted-foreground">{quote.company}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground truncate max-w-[200px]">{quote.productName}</p>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={quote.status}
                          onValueChange={(value) => handleStatusChange(quote.id, value as QuoteRequest["status"])}
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <Badge className={`${statusColors[quote.status]} border-0`}>{quote.status}</Badge>
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{quote.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedQuote(quote)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Quote Request Details</DialogTitle>
                              <DialogDescription>Request from {selectedQuote?.name}</DialogDescription>
                            </DialogHeader>
                            {selectedQuote && (
                              <div className="space-y-6">
                                {/* Customer Info */}
                                <div className="space-y-3">
                                  <h4 className="text-sm font-semibold text-foreground">Customer Information</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Building2 className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-foreground">{selectedQuote.company}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <a
                                        href={`mailto:${selectedQuote.email}`}
                                        className="text-primary hover:underline"
                                      >
                                        {selectedQuote.email}
                                      </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Phone className="h-4 w-4 text-muted-foreground" />
                                      <a href={`tel:${selectedQuote.phone}`} className="text-primary hover:underline">
                                        {selectedQuote.phone}
                                      </a>
                                    </div>
                                  </div>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-3">
                                  <h4 className="text-sm font-semibold text-foreground">Requested Product</h4>
                                  <p className="text-sm text-muted-foreground">{selectedQuote.productName}</p>
                                </div>

                                {/* Message */}
                                <div className="space-y-3">
                                  <h4 className="text-sm font-semibold text-foreground">Message</h4>
                                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                    {selectedQuote.message || "No additional message provided."}
                                  </p>
                                </div>

                                {/* Status */}
                                <div className="space-y-3">
                                  <h4 className="text-sm font-semibold text-foreground">Status</h4>
                                  <Select
                                    value={selectedQuote.status}
                                    onValueChange={(value) =>
                                      handleStatusChange(selectedQuote.id, value as QuoteRequest["status"])
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {statusOptions.map((status) => (
                                        <SelectItem key={status} value={status}>
                                          {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                  <Button variant="outline" className="flex-1 gap-2 bg-transparent" asChild>
                                    <a href={`mailto:${selectedQuote.email}`}>
                                      <Mail className="h-4 w-4" />
                                      Send Email
                                    </a>
                                  </Button>
                                  <Button variant="outline" className="flex-1 gap-2 bg-transparent" asChild>
                                    <a href={`tel:${selectedQuote.phone}`}>
                                      <Phone className="h-4 w-4" />
                                      Call
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
