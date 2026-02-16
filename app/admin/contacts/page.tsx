"use client"

import { useState } from "react"
import { useStore, type ContactMessage } from "@/lib/store"
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
import { Search, Eye, Mail, Phone, Building2, User } from "lucide-react"

const statusOptions: ContactMessage["status"][] = ["new", "read", "replied"]

const statusColors: Record<ContactMessage["status"], string> = {
  new: "bg-yellow-100 text-yellow-800",
  read: "bg-blue-100 text-blue-800",
  replied: "bg-green-100 text-green-800",
}

export default function AdminContactsPage() {
  const { contacts, updateContactStatus } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null)

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || contact.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (contactId: string, newStatus: ContactMessage["status"]) => {
    updateContactStatus(contactId, newStatus)
    if (selectedContact?.id === contactId) {
      setSelectedContact({ ...selectedContact, status: newStatus })
    }
  }

  const newCount = contacts.filter((c) => c.status === "new").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Contact Messages</h1>
        <p className="text-muted-foreground mt-1">Manage contact form submissions ({newCount} new)</p>
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

      {/* Contacts Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Contact Messages ({filteredContacts.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No contact messages found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="font-medium text-foreground">
                            {contact.firstName} {contact.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">{contact.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{contact.company || "-"}</TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground truncate max-w-[200px]">{contact.message}</p>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={contact.status}
                          onValueChange={(value) => handleStatusChange(contact.id, value as ContactMessage["status"])}
                        >
                          <SelectTrigger className="w-[100px] h-8">
                            <Badge className={`${statusColors[contact.status]} border-0`}>{contact.status}</Badge>
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
                      <TableCell className="text-muted-foreground">{contact.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedContact(contact)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Contact Message Details</DialogTitle>
                              <DialogDescription>
                                Message from {selectedContact?.firstName} {selectedContact?.lastName}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedContact && (
                              <div className="space-y-6">
                                {/* Contact Info */}
                                <div className="space-y-3">
                                  <h4 className="text-sm font-semibold text-foreground">Contact Information</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                      <User className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-foreground">
                                        {selectedContact.firstName} {selectedContact.lastName}
                                      </span>
                                    </div>
                                    {selectedContact.company && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{selectedContact.company}</span>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <a
                                        href={`mailto:${selectedContact.email}`}
                                        className="text-primary hover:underline"
                                      >
                                        {selectedContact.email}
                                      </a>
                                    </div>
                                    {selectedContact.phone && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <a
                                          href={`tel:${selectedContact.phone}`}
                                          className="text-primary hover:underline"
                                        >
                                          {selectedContact.phone}
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-3">
                                  <h4 className="text-sm font-semibold text-foreground">Message</h4>
                                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">
                                    {selectedContact.message}
                                  </p>
                                </div>

                                {/* Status */}
                                <div className="space-y-3">
                                  <h4 className="text-sm font-semibold text-foreground">Status</h4>
                                  <Select
                                    value={selectedContact.status}
                                    onValueChange={(value) =>
                                      handleStatusChange(selectedContact.id, value as ContactMessage["status"])
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
                                    <a href={`mailto:${selectedContact.email}`}>
                                      <Mail className="h-4 w-4" />
                                      Send Email
                                    </a>
                                  </Button>
                                  {selectedContact.phone && (
                                    <Button variant="outline" className="flex-1 gap-2 bg-transparent" asChild>
                                      <a href={`tel:${selectedContact.phone}`}>
                                        <Phone className="h-4 w-4" />
                                        Call
                                      </a>
                                    </Button>
                                  )}
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
