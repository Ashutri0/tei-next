"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabaseClient"

export type Product = {
  id: string
  name: string
  category: string
  subcategory: string
  description: string
  specifications: string[]
  images: string[]
  featured: boolean
  createdAt: string
}

export type QuoteRequest = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  productId: string
  productName: string
  message: string
  status: "pending" | "contacted" | "quoted" | "closed"
  createdAt: string
}

export type ContactMessage = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: string
}

export type SiteSettings = {
  email: string
  phone: string
  address: string[]
  businessHours: string[]
}

export const categories = [
  {
    name: "Mechanical",
    subcategories: ["Pumps", "Valves", "Bearings", "Couplings", "Gearboxes"],
  },
  {
    name: "Electrical",
    subcategories: ["Motors", "Drives", "Transformers", "Switchgear", "Cables"],
  },
  {
    name: "Automation",
    subcategories: ["PLCs", "HMIs", "Sensors", "Actuators", "SCADA Systems"],
  },
  {
    name: "Instrumentation",
    subcategories: ["Flow Meters", "Pressure Gauges", "Temperature Sensors", "Level Indicators", "Analyzers"],
  },
]

const initialProducts: Product[] = [
  {
    id: "1",
    name: "High-Temperature Centrifugal Pump",
    category: "Mechanical",
    subcategory: "Pumps",
    description:
      "Industrial-grade centrifugal pump designed for high-temperature applications in steel mills and power plants. Capable of handling temperatures up to 350°C.",
    specifications: ["Max Temp: 350°C", "Flow Rate: 500 m³/h", "Pressure: 25 bar", "Material: Stainless Steel 316"],
    images: ["/industrial-centrifugal-pump.jpg"],
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Heavy-Duty Ball Valve",
    category: "Mechanical",
    subcategory: "Valves",
    description:
      "Robust ball valve for high-pressure industrial applications. Features metal-to-metal sealing for extreme conditions.",
    specifications: ["Size: DN50-DN300", "Pressure: PN100", "Temperature: -29°C to 200°C", "Body: Carbon Steel"],
    images: ["/industrial-ball-valve.png"],
    featured: true,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Variable Frequency Drive 500kW",
    category: "Electrical",
    subcategory: "Drives",
    description:
      "High-performance VFD for precise motor control in demanding industrial environments. Energy-efficient with regenerative braking.",
    specifications: ["Power: 500kW", "Voltage: 380-480V", "Efficiency: 98%", "Protection: IP55"],
    images: ["/variable-frequency-drive-industrial.jpg"],
    featured: true,
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    name: "Industrial PLC Controller",
    category: "Automation",
    subcategory: "PLCs",
    description:
      "Modular PLC system for complex automation tasks. Supports multiple communication protocols and expansion modules.",
    specifications: [
      "I/O Points: 2048",
      "Cycle Time: 0.5ms",
      "Memory: 4MB",
      "Protocols: Modbus, Profinet, EtherNet/IP",
    ],
    images: ["/industrial-plc-controller.jpg"],
    featured: true,
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    name: "Electromagnetic Flow Meter",
    category: "Instrumentation",
    subcategory: "Flow Meters",
    description:
      "Precision electromagnetic flow meter for conductive liquids. Ideal for process control and billing applications.",
    specifications: ["Accuracy: ±0.2%", "Size: DN10-DN2000", "Liner: PTFE/PFA", "Output: 4-20mA, HART"],
    images: ["/electromagnetic-flow-meter.jpg"],
    featured: false,
    createdAt: "2024-02-15",
  },
  {
    id: "6",
    name: "High-Efficiency IE4 Motor",
    category: "Electrical",
    subcategory: "Motors",
    description:
      "Super premium efficiency motor meeting IE4 standards. Reduced energy consumption and lower operating costs.",
    specifications: ["Power: 75-315kW", "Efficiency: IE4", "Frame: Cast Iron", "Cooling: IC411"],
    images: ["/industrial-electric-motor.jpg"],
    featured: false,
    createdAt: "2024-02-20",
  },
  {
    id: "7",
    name: "Industrial Touch Panel HMI",
    category: "Automation",
    subcategory: "HMIs",
    description: "15-inch industrial touch panel with high-resolution display. Rugged design for harsh environments.",
    specifications: ['Display: 15" TFT', "Resolution: 1024x768", "Protection: IP65", "Temp Range: -20°C to 60°C"],
    images: ["/industrial-hmi-touch-panel.jpg"],
    featured: false,
    createdAt: "2024-03-01",
  },
  {
    id: "8",
    name: "Spherical Roller Bearing",
    category: "Mechanical",
    subcategory: "Bearings",
    description:
      "Self-aligning spherical roller bearing for heavy radial and axial loads. Ideal for steel mill rolling equipment.",
    specifications: ["Bore: 100-500mm", "Load Rating: 2000kN", "Speed: 1500 RPM", "Seal: Labyrinth"],
    images: ["/spherical-roller-bearing-industrial.jpg"],
    featured: false,
    createdAt: "2024-03-05",
  },
]

const initialQuotes: QuoteRequest[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@steelworks.com",
    phone: "+1 555-0123",
    company: "Steel Works Inc.",
    productId: "1",
    productName: "High-Temperature Centrifugal Pump",
    message: "We need 5 units for our new processing line. Please provide pricing and lead time.",
    status: "pending",
    createdAt: "2024-03-10",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@powergen.com",
    phone: "+1 555-0456",
    company: "PowerGen Solutions",
    productId: "3",
    productName: "Variable Frequency Drive 500kW",
    message: "Looking for VFDs for our turbine control system. Need technical consultation.",
    status: "contacted",
    createdAt: "2024-03-08",
  },
]

const initialSettings: SiteSettings = {
  email: "info@tei-solutions.com",
  phone: "+1 (555) 123-4567",
  address: ["123 Industrial Avenue", "Manufacturing District", "City, State 12345"],
  businessHours: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
}

type StoreContextType = {
  products: Product[]
  quotes: QuoteRequest[]
  contacts: ContactMessage[]
  settings: SiteSettings
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  addQuote: (quote: Omit<QuoteRequest, "id" | "createdAt" | "status">) => void
  updateQuoteStatus: (id: string, status: QuoteRequest["status"]) => void
  addContact: (contact: Omit<ContactMessage, "id" | "createdAt" | "status">) => void
  updateContactStatus: (id: string, status: ContactMessage["status"]) => void
  updateSettings: (settings: SiteSettings) => void
}

const StoreContext = createContext<StoreContextType | null>(null)


export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes)
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isUsingSupabase, setIsUsingSupabase] = useState(false)

  useEffect(() => {
    const loadFromSupabase = async () => {
      console.log("🔍 Starting Supabase data load...")
      console.log("🔍 Supabase client:", supabase ? "✅ Available" : "❌ Not available")
      
      if (!supabase) {
        console.error("❌ Supabase is not configured - check .env.local file")
        console.log("❌ Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY")
        setIsHydrated(true)
        return
      }

      try {
        console.log("🔍 Fetching data from Supabase...")
        const [productsResult, quotesResult, contactsResult, settingsResult] = await Promise.all([
          supabase.from("products").select("*").order("created_at", { ascending: true }),
          supabase.from("quotes").select("*").order("created_at", { ascending: false }),
          supabase.from("contacts").select("*").order("created_at", { ascending: false }),
          supabase.from("settings").select("*").limit(1).maybeSingle(),
        ])

        console.log("🔍 Products result:", productsResult.error ? "❌ Error" : `✅ ${productsResult.data?.length || 0} items`)
        console.log("🔍 Quotes result:", quotesResult.error ? "❌ Error" : `✅ ${quotesResult.data?.length || 0} items`)
        console.log("🔍 Contacts result:", contactsResult.error ? "❌ Error" : `✅ ${contactsResult.data?.length || 0} items`)
        console.log("🔍 Settings result:", settingsResult.error ? "❌ Error" : "✅ Found")

        if (productsResult.error) {
          console.error("❌ Products error:", productsResult.error)
        }
        if (quotesResult.error) {
          console.error("❌ Quotes error:", quotesResult.error)
        }
        if (contactsResult.error) {
          console.error("❌ Contacts error:", contactsResult.error)
        }
        if (settingsResult.error) {
          console.error("❌ Settings error:", settingsResult.error)
        }

        const productsData = productsResult.data ?? []
        const quotesData = quotesResult.data ?? []
        const contactsData = contactsResult.data ?? []
        const settingsData = settingsResult.data

        if (productsData.length > 0) {
          setProducts(
            productsData.map((row: any) => ({
              id: String(row.id),
              name: row.name ?? "",
              category: row.category ?? "",
              subcategory: row.subcategory ?? "",
              description: row.description ?? "",
              specifications: row.specifications ?? [],
              images: row.images ?? [],
              featured: Boolean(row.featured),
              createdAt:
                row.created_at ??
                row.createdAt ??
                new Date().toISOString().split("T")[0],
            })),
          )
        }

        if (quotesData.length > 0) {
          setQuotes(
            quotesData.map((row: any) => ({
              id: String(row.id),
              name: row.name ?? "",
              email: row.email ?? "",
              phone: row.phone ?? "",
              company: row.company ?? "",
              productId: String(row.product_id ?? row.productId ?? ""),
              productName: row.product_name ?? row.productName ?? "",
              message: row.message ?? "",
              status: row.status ?? "pending",
              createdAt:
                row.created_at ??
                row.createdAt ??
                new Date().toISOString().split("T")[0],
            })),
          )
        }

        if (contactsData.length > 0) {
          setContacts(
            contactsData.map((row: any) => ({
              id: String(row.id),
              firstName: row.first_name ?? row.firstName ?? "",
              lastName: row.last_name ?? row.lastName ?? "",
              email: row.email ?? "",
              phone: row.phone ?? "",
              company: row.company ?? "",
              message: row.message ?? "",
              status: row.status ?? "new",
              createdAt:
                row.created_at ??
                row.createdAt ??
                new Date().toISOString().split("T")[0],
            })),
          )
        }

        if (settingsData) {
          setSettings({
            email: settingsData.email ?? initialSettings.email,
            phone: settingsData.phone ?? initialSettings.phone,
            address: settingsData.address ?? initialSettings.address,
            businessHours:
              settingsData.business_hours ??
              settingsData.businessHours ??
              initialSettings.businessHours,
          })
        }

        setIsUsingSupabase(true)
        setIsHydrated(true)
      } catch (error) {
        console.error("Error loading from Supabase:", error)
        setIsHydrated(true)
      }
    }

    loadFromSupabase()
  }, [])

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: String(Date.now()),
    }
    console.log("🔍 Adding product:", newProduct.name)
    setProducts((prev) => [...prev, newProduct])

    if (supabase) {
      console.log("🔍 Saving product to Supabase...")
      const dbProduct = {
        id: newProduct.id,
        name: newProduct.name,
        category: newProduct.category,
        subcategory: newProduct.subcategory,
        description: newProduct.description,
        specifications: newProduct.specifications,
        images: newProduct.images,
        featured: newProduct.featured,
        created_at: newProduct.createdAt,
      }

      supabase
        .from("products")
        .insert(dbProduct)
        .then(({ error }) => {
          if (error) {
            console.error("❌ Error inserting product into Supabase:", error)
          } else {
            console.log("✅ Product successfully saved to Supabase")
          }
        })
    } else {
      console.error("❌ Cannot save product - Supabase not available")
    }
  }

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)))

    if (supabase) {
      const dbProduct = {
        name: product.name,
        category: product.category,
        subcategory: product.subcategory,
        description: product.description,
        specifications: product.specifications,
        images: product.images,
        featured: product.featured,
        created_at: product.createdAt,
      }

      supabase
        .from("products")
        .update(dbProduct)
        .eq("id", product.id)
        .then(({ error }) => {
          if (error) {
            console.error("Error updating product in Supabase:", error)
          }
        })
    }
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))

    if (supabase) {
      supabase
        .from("products")
        .delete()
        .eq("id", id)
        .then(({ error }) => {
          if (error) {
            console.error("Error deleting product from Supabase:", error)
          }
        })
    }
  }

  const addQuote = (quote: Omit<QuoteRequest, "id" | "createdAt" | "status">) => {
    const newQuote: QuoteRequest = {
      ...quote,
      id: String(Date.now()),
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    }
    console.log("🔍 Adding quote from:", newQuote.name)
    setQuotes((prev) => [newQuote, ...prev])

    if (supabase) {
      console.log("🔍 Saving quote to Supabase...")
      const dbQuote = {
        id: newQuote.id,
        name: newQuote.name,
        email: newQuote.email,
        phone: newQuote.phone,
        company: newQuote.company,
        product_id: newQuote.productId,
        product_name: newQuote.productName,
        message: newQuote.message,
        status: newQuote.status,
        created_at: newQuote.createdAt,
      }

      supabase
        .from("quotes")
        .insert(dbQuote)
        .then(({ error }) => {
          if (error) {
            console.error("❌ Error inserting quote into Supabase:", error)
          } else {
            console.log("✅ Quote successfully saved to Supabase")
          }
        })
    } else {
      console.error("❌ Cannot save quote - Supabase not available")
    }
  }

  const updateQuoteStatus = (id: string, status: QuoteRequest["status"]) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)))

    if (supabase) {
      supabase
        .from("quotes")
        .update({ status })
        .eq("id", id)
        .then(({ error }) => {
          if (error) {
            console.error("Error updating quote status in Supabase:", error)
          }
        })
    }
  }

  const addContact = (contact: Omit<ContactMessage, "id" | "createdAt" | "status">) => {
    const newContact: ContactMessage = {
      ...contact,
      id: String(Date.now()),
      status: "new",
      createdAt: new Date().toISOString().split("T")[0],
    }
    console.log("🔍 Adding contact from:", newContact.firstName + " " + newContact.lastName)
    setContacts((prev) => [newContact, ...prev])

    if (supabase) {
      console.log("🔍 Saving contact to Supabase...")
      const dbContact = {
        id: newContact.id,
        first_name: newContact.firstName,
        last_name: newContact.lastName,
        email: newContact.email,
        phone: newContact.phone,
        company: newContact.company,
        message: newContact.message,
        status: newContact.status,
        created_at: newContact.createdAt,
      }

      supabase
        .from("contacts")
        .insert(dbContact)
        .then(({ error }) => {
          if (error) {
            console.error("❌ Error inserting contact into Supabase:", error)
          } else {
            console.log("✅ Contact successfully saved to Supabase")
          }
        })
    } else {
      console.error("❌ Cannot save contact - Supabase not available")
    }
  }

  const updateContactStatus = (id: string, status: ContactMessage["status"]) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))

    if (supabase) {
      supabase
        .from("contacts")
        .update({ status })
        .eq("id", id)
        .then(({ error }) => {
          if (error) {
            console.error("Error updating contact status in Supabase:", error)
          }
        })
    }
  }

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings)

    if (supabase) {
      const dbSettings = {
        email: newSettings.email,
        phone: newSettings.phone,
        address: newSettings.address,
        business_hours: newSettings.businessHours,
      }

      supabase
        .from("settings")
        .upsert({ id: "default", ...dbSettings })
        .then(({ error }) => {
          if (error) {
            console.error("Error updating settings in Supabase:", error)
          }
        })
    }
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        quotes,
        contacts,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        addQuote,
        updateQuoteStatus,
        addContact,
        updateContactStatus,
        updateSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
