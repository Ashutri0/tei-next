"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StoreProvider } from "@/lib/store"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isAdminRoute = pathname?.startsWith("/admin")

  return (
    <StoreProvider>
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && <Footer />}
    </StoreProvider>
  )
}
