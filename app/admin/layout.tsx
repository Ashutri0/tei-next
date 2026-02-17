"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { StoreProvider } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, FileText, LogOut, ChevronRight, User, MessageSquare, Settings } from "lucide-react"
import Image from "next/image"

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Quote Requests", href: "/admin/quotes", icon: FileText },
  { name: "Contact Messages", href: "/admin/contacts", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [user, isLoading, router, pathname])

  // Show nothing while loading
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  // Allow login page to render without auth
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Require auth for all other admin pages
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-border bg-muted/30 lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="relative h-8 w-auto aspect-[3/1]">
                <Image
                  src="/tei-logo.png"
                  alt="TEI Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 bg-transparent"
              onClick={() => {
                logout()
                router.push("/admin/login")
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 transition-all duration-300 min-h-screen">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 lg:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              TEI<span className="text-primary">.</span>
            </span>
            <span className="text-sm text-muted-foreground">Admin</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout()
              router.push("/admin/login")
            }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </header>

        {/* Mobile Navigation */}
        <nav className="flex items-center gap-1 border-b border-border px-4 py-2 overflow-x-auto lg:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AuthProvider>
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </AuthProvider>
    </StoreProvider>
  )
}
