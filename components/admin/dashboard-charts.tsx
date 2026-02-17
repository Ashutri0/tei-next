"use client"

import { useMemo } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Colors for charts
const COLORS = [
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
    "#8b5cf6", // violet-500
]

interface DashboardChartsProps {
    quotes: any[]
    contacts: any[]
}

export function DashboardCharts({ quotes, contacts }: DashboardChartsProps) {

    // Prepare data for Weekly Activity (Quotes vs Contacts)
    const activityData = useMemo(() => {
        const last7Days = [...Array(12)].map((_, i) => { // Increased to 12 data points for smoother curve appearance
            const d = new Date()
            d.setDate(d.getDate() - (11 - i))
            return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        })

        return last7Days.map(day => ({
            name: day,
            quotes: Math.floor(Math.random() * 8) + 2, // Mock data with slight baseline
            contacts: Math.floor(Math.random() * 12) + 5, // Mock data
        }))
    }, []) // Removed deps for mock data stability

    // Prepare data for Quote Status Distribution
    const statusData = useMemo(() => {
        const counts: Record<string, number> = {}
        quotes.forEach(q => {
            counts[q.status] = (counts[q.status] || 0) + 1
        })

        // Fallback if no data
        if (Object.keys(counts).length === 0) {
            return [
                { name: "Pending", value: 4 },
                { name: "Contacted", value: 3 },
                { name: "Quoted", value: 2 },
            ]
        }

        return Object.keys(counts).map(status => ({
            name: status.charAt(0).toUpperCase() + status.slice(1),
            value: counts[status]
        }))
    }, [quotes])

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* Performance Area Chart (Main) */}
            <Card className="col-span-2 shadow-sm rounded-3xl border-slate-100 dark:border-slate-800 overflow-hidden">
                <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">Performance</CardTitle>
                            <CardDescription>Quote Requests vs Inquiries</CardDescription>
                        </div>
                        <select className="text-sm border-none bg-slate-50 dark:bg-slate-900 rounded-lg px-2 py-1 outline-none cursor-pointer">
                            <option>Monthly</option>
                            <option>Weekly</option>
                        </select>
                    </div>
                </CardHeader>
                <CardContent className="pl-0 pt-4">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                                    }}
                                    itemStyle={{ fontSize: '12px', fontWeight: '500' }}
                                />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    iconType="circle"
                                    height={36}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="contacts"
                                    name="Inquiries"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorContacts)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="quotes"
                                    name="Quotes"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorQuotes)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Status Donut Chart (Side Widget) */}
            <Card className="col-span-1 shadow-sm rounded-3xl border-slate-100 dark:border-slate-800">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Deals Status</CardTitle>
                    <CardDescription>Current Pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <span className="text-3xl font-bold block">{quotes.length}</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Total</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
