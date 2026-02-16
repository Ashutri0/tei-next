// Mock data for products and categories - can be replaced with database calls later

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

export const products: Product[] = [
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

export const quoteRequests: QuoteRequest[] = [
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
