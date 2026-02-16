"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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

const STORAGE_KEYS = {
  products: "tei_products",
  quotes: "tei_quotes",
  contacts: "tei_contacts",
  settings: "tei_settings",
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes)
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEYS.products)
      const storedQuotes = localStorage.getItem(STORAGE_KEYS.quotes)
      const storedContacts = localStorage.getItem(STORAGE_KEYS.contacts)
      const storedSettings = localStorage.getItem(STORAGE_KEYS.settings)

      if (storedProducts) setProducts(JSON.parse(storedProducts))
      if (storedQuotes) setQuotes(JSON.parse(storedQuotes))
      if (storedContacts) setContacts(JSON.parse(storedContacts))
      if (storedSettings) setSettings(JSON.parse(storedSettings))
    } catch (error) {
      console.error("Error loading from localStorage:", error)
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage on changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products))
    }
  }, [products, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.quotes, JSON.stringify(quotes))
    }
  }, [quotes, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.contacts, JSON.stringify(contacts))
    }
  }, [contacts, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings))
    }
  }, [settings, isHydrated])

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: String(Date.now()),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const addQuote = (quote: Omit<QuoteRequest, "id" | "createdAt" | "status">) => {
    const newQuote: QuoteRequest = {
      ...quote,
      id: String(Date.now()),
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setQuotes((prev) => [newQuote, ...prev])
  }

  const updateQuoteStatus = (id: string, status: QuoteRequest["status"]) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)))
  }

  const addContact = (contact: Omit<ContactMessage, "id" | "createdAt" | "status">) => {
    const newContact: ContactMessage = {
      ...contact,
      id: String(Date.now()),
      status: "new",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setContacts((prev) => [newContact, ...prev])
  }

  const updateContactStatus = (id: string, status: ContactMessage["status"]) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))
  }

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings)
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
