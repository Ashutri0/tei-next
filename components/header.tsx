"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import NextImage from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "What We Offer", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <NextImage
            src="/tei-logo.png"
            alt="TEI Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <button className="lg:hidden" onClick={() => setOpen(true)}>
          <Menu className="h-7 w-7" />
        </button>

        {/* desktop */}
        <div className="hidden lg:flex gap-8 items-center">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.name}
            </Link>
          ))}
          <Button size="sm">Request Quote</Button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[9999] bg-white transition-all duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {/* top bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <NextImage
            src="/tei-logo.png"
            alt="TEI Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <button onClick={() => setOpen(false)}>
            <X className="h-7 w-7" />
          </button>
        </div>

        {/* menu center */}
        <div className="flex flex-col items-center justify-center h-[85vh] gap-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-3xl font-semibold transition ${pathname === item.href
                ? "text-primary"
                : "text-gray-700 hover:text-primary"
                }`}
            >
              {item.name}
            </Link>
          ))}

          <Button
            size="lg"
            className="mt-6 px-8 py-6 text-lg"
            onClick={() => setOpen(false)}
          >
            Request Quote
          </Button>
        </div>
      </div>
    </header>
  )
}
