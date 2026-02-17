"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, CheckCircle2, TrendingUp, Search, Bell, ArrowRight, MoreHorizontal, Eye, ChevronDown } from "lucide-react"
import { DashboardCharts } from "@/components/admin/dashboard-charts"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  const { products, quotes, contacts } = useStore()

  const totalProducts = products.length

  // Mock data for trends
  const activeLeads = quotes.length + contacts.length
  const closedDeals = quotes.filter(q => q.status === 'quoted').length

  const stats = [
    {
      title: "Active Leads",
      value: activeLeads,
      trend: "+12%",
      trendUp: true,
      icon: Users,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Total Revenue",
      value: "$96,7M",
      trend: "+12%",
      trendUp: true,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Listing",
      value: totalProducts,
      trend: "+12%",
      trendDown: true,
      icon: FileText,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Total Closed",
      value: closedDeals,
      trend: "+12%",
      trendUp: true,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back, here's your overview.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search..." className="pl-10 w-64 rounded-full bg-white dark:bg-slate-900 border-none shadow-sm" />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-sm relative">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>
          <div className="flex items-center gap-2 pl-2">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-sm">
              <p className="font-semibold text-slate-900 dark:text-white">Admin User</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow rounded-3xl overflow-hidden bg-white dark:bg-slate-900">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-full ${stat.bgColor} ${stat.color} bg-opacity-50`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-slate-500">{stat.title}</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              </div>
              <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.trendDown ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                {stat.trend}
                <TrendingUp className={`ml-1 h-3 w-3 ${stat.trendDown ? 'rotate-180' : ''}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section (Commented out per user pref) */}
      {/* <DashboardCharts quotes={quotes} contacts={contacts} /> */}

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Deals Table (Swapped to Wide Column) */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl bg-white dark:bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Deals</h3>
              <Button variant="ghost" size="sm" asChild className="text-slate-400 hover:text-slate-600">
                <Link href="/admin/quotes">View All <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs font-semibold text-slate-500 uppercase bg-transparent border-b border-dashed border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.slice(0, 5).map((quote) => (
                    <tr key={quote.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors bg-white dark:bg-slate-900">
                      <td className="px-4 py-4">
                        <div className="font-bold text-slate-900 dark:text-white">{quote.name}</div>
                        <div className="text-xs text-slate-400">{quote.company || "Individual"}</div>
                      </td>
                      <td className="px-4 py-4 font-medium text-slate-600 dark:text-slate-300">
                        {quote.productName}
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className={`
                                        pl-2 pr-1 py-1 rounded-lg font-normal gap-1 border-0
                                        ${quote.status === 'pending' ? 'bg-amber-50 text-amber-600' : ''}
                                        ${quote.status === 'contacted' ? 'bg-blue-50 text-blue-600' : ''}
                                        ${quote.status === 'quoted' ? 'bg-emerald-50 text-emerald-600' : ''}
                                        ${!['pending', 'contacted', 'quoted'].includes(quote.status) ? 'bg-slate-100 text-slate-600' : ''}
                                    `}>
                          {quote.status}
                          <ChevronDown className="h-3 w-3 opacity-50" />
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-slate-500">
                        {quote.createdAt}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                          <Eye className="h-4 w-4 text-slate-400" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {quotes.length === 0 && <p className="text-center text-slate-400 py-8">No deals found</p>}
            </div>
          </CardContent>
        </Card>

        {/* Leads Contact List (Swapped to Side Column) */}
        <Card className="lg:col-span-1 border-none shadow-sm rounded-3xl bg-white dark:bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Leads Contact</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-5 w-5 text-slate-400" />
              </Button>
            </div>

            <div className="space-y-4">
              {contacts.slice(0, 5).map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Avatar className="h-10 w-10 border border-white dark:border-slate-700 shadow-sm">
                    <AvatarFallback className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold text-xs">
                      {contact.firstName?.[0]}{contact.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{contact.firstName} {contact.lastName}</p>
                    <p className="text-[10px] text-slate-400 truncate">{contact.email}</p>
                  </div>
                  <div className="text-right">
                    <div className={`h-2 w-2 rounded-full ${contact.status === 'new' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                  </div>
                </div>
              ))}
              {contacts.length === 0 && <p className="text-center text-slate-400 py-4">No contacts found</p>}
            </div>

            <Button className="w-full mt-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 shadow-none border border-slate-200 dark:border-slate-700" variant="outline" asChild>
              <Link href="/admin/contacts">View All Messages</Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
