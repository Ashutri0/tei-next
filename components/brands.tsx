import Link from "next/link"

export function Brands() {
    return (
        <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Brands We Work For
                    </h2>
                </div>

                {/* Logos Grid - Matching the screenshot layout */}
                <div className="mx-auto max-w-7xl px-4 lg:px-8 mb-20">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 justify-items-center">
                        {[
                            { src: "/spirax-sarco.png", alt: "Spirax Sarco", title: "Spirax Sarco" },
                            { src: "/ksb.svg", alt: "KSB", title: "KSB" },
                            { src: "/ebro_Logo.png", alt: "EBRO", title: "EBRO" },
                            { src: "/ARI.png", alt: "ARI", title: "ARI" },
                            { src: "/GEA-Logo.svg", alt: "GEA", title: "GEA" },
                            { src: "/Armstrong.svg", alt: "Armstrong", title: "Armstrong" },
                            { src: "/Watson-McDaniel.png", alt: "Watson McDaniel", title: "Watson McDaniel" },
                            { src: "/Watts.jpg", alt: "Watts", title: "Watts" },
                            { src: "/honeywell-logo.svg", alt: "Honeywell", title: "Honeywell" },
                            { src: "/Bermad-logo-new.webp", alt: "BERMAD", title: "BERMAD" },
                            { src: "/DOROT-logo.png", alt: "DOROT", title: "DOROT" }, // Assuming DOROT is the replacement for Aquestia or correct context
                            { src: "/Baccara-logo.svg", alt: "Baccara", title: "Baccara" },
                            { src: "/Kitz.svg", alt: "KITZ", title: "KITZ" },
                            { src: "/YOSHITAKE.png", alt: "YOSHITAKE", title: "YOSHITAKE" },
                            { src: "/tozen.svg", alt: "Tozen", title: "Tozen" },
                            { src: "/HITACHI.png", alt: "HITACHI", title: "HITACHI" },
                            { src: "/MIYAWAKI_logo.png", alt: "MIYAWAKI", title: "MIYAWAKI" },
                            { src: "/JetStream_logo_web.webp", alt: "JetStream", title: "JetStream" },
                            { src: "/AVK-LOGO.png", alt: "AVK", title: "AVK" },
                            { src: "/VYC.png", alt: "VYC", title: "VYC" },
                            { src: "/definox-logo.webp", alt: "Definox", title: "Definox" },
                        ].map((brand, index) => (
                            <div
                                key={index}
                                className="group flex items-center justify-center w-full aspect-[3/2] p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-50"
                                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                            >
                                <img
                                    src={brand.src}
                                    alt={brand.alt}
                                    title={brand.title || brand.alt}
                                    className="object-contain w-full h-full max-h-16 group-hover:opacity-100 dark:brightness-0 dark:invert dark:group-hover:filter-none transition-all duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed List */}
                <div className="max-w-6xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-16">
                    <div className="text-center mb-12">
                        <h3 className="text-xl font-semibold mb-4 text-slate-500 uppercase tracking-widest text-sm">Global Partners by Region</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* UK */}
                        <RegionCard country="United Kingdom" flag="🇬🇧" delay={0}>
                            <BrandItem name="Spirax Sarco" desc="Steam solutions engineered for excellence." />
                        </RegionCard>

                        {/* Germany */}
                        <RegionCard country="Germany" flag="🇩🇪" delay={100}>
                            <BrandItem name="KSB" desc="High-performance pump and valve systems" />
                            <BrandItem name="EBRO" desc="Advanced valve and automation technology" />
                            <BrandItem name="ARI-Armaturen" desc="Industrial valves made with German precision" />
                            <BrandItem name="GEA" desc="Process engineering and heat transfer specialists" />
                        </RegionCard>

                        {/* USA */}
                        <RegionCard country="United States" flag="🇺🇸" delay={200}>
                            <BrandItem name="Armstrong" desc="Efficient flow control and heat transfer solutions" />
                            <BrandItem name="Mark / Danny / Watson McDaniel" desc="Reliable steam and fluid regulation" />
                            <BrandItem name="Watts" desc="Water safety, flow, and HVAC excellence" />
                            <BrandItem name="Honeywell" desc="Global leader in automation and control" />
                        </RegionCard>

                        {/* Israel */}
                        <RegionCard country="Israel" flag="🇮🇱" delay={300}>
                            <BrandItem name="BERMAD" desc="Smart water control management" />
                            <BrandItem name="DOROT" desc="Advanced control valves for water and irrigation" />
                            <BrandItem name="BACCARA" desc="Precise solutions in automation and fluid control" />
                        </RegionCard>

                        {/* Japan */}
                        <RegionCard country="Japan" flag="🇯🇵" delay={400}>
                            <BrandItem name="OKM, KITZ (KITAZAWA)" desc="World-class valves for critical systems" />
                            <BrandItem name="YOSHITAKE" desc="Steam and pressure control expertise" />
                            <BrandItem name="TOZEN (TOCHEN)" desc="High-performance expansion joints and valves" />
                            <BrandItem name="HITACHI" desc="Reliable engineering for industrial processes" />
                            <BrandItem name="TLV, MIYAWAKI, VENN, TOMOE" desc="Specialized steam and fluid solutions" />
                        </RegionCard>

                        {/* Taiwan */}
                        <RegionCard country="Taiwan" flag="🇹🇼" delay={500}>
                            <BrandItem name="FS Toyama, Jetstream, DSC, 317" desc="Efficient flow systems" />
                            <BrandItem name="SS Mud Relief Valve" desc="Proven protection for demanding environments" />
                        </RegionCard>

                        {/* Others Group 1 */}
                        <RegionCard country="Europe & Beyond" flag="🌍" delay={600}>
                            <div className="mb-4">
                                <h5 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">🇩🇰 Denmark</h5>
                                <BrandItem name="AVK" desc="Durable valves for water, gas, and fire protection" />
                            </div>
                            <div className="mb-4">
                                <h5 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">🇪🇸 Spain</h5>
                                <BrandItem name="VYC" desc="Industrial valve technology trusted worldwide" />
                            </div>
                            <div>
                                <h5 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">🇫🇷 France</h5>
                                <BrandItem name="DEFINOX" desc="Hygienic valves and equipment for food and pharma" />
                            </div>
                        </RegionCard>

                        {/* Others Group 2 */}
                        <RegionCard country="Asia & Specialized" flag="🌏" delay={700}>
                            <div className="mb-4">
                                <h5 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">🇰🇷 South Korea</h5>
                                <BrandItem name="Tisen, Asahikwang (JK), Rotork" desc="Modern automation and valve control systems" />
                            </div>
                            <div>
                                <h5 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">🌍 Additional Trusted Brands</h5>
                                <BrandItem name="GALA Gere, Warco, Vortex Control" desc="Niche solutions for complex flow and control applications" />
                            </div>
                        </RegionCard>

                    </div>
                </div>
            </div>
        </section>
    )
}

function RegionCard({ country, flag, children, delay }: { country: string, flag: string, children: React.ReactNode, delay: number }) {
    return (
        <div
            className="h-full border border-slate-100 dark:border-slate-800 rounded-xl p-6 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100">
                <span className="text-xl">{flag}</span> {country}
            </h3>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    )
}

function BrandItem({ name, desc }: { name: string, desc: string }) {
    return (
        <div className="text-sm">
            <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">{name}</strong>
            <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
        </div>
    )
}
