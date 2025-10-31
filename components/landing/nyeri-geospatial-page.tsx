"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowLeft, Leaf, BarChart3, Users, DollarSign } from "lucide-react"

interface NyeriGeospatialPageProps {
  onBack: () => void
  onGetStarted: () => void
}

export function NyeriGeospatialPage({ onBack, onGetStarted }: NyeriGeospatialPageProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  // Nyeri farmer density data
  const nyeriRegions = [
    {
      name: "Central Nyeri",
      density: 92,
      farmers: 15420,
      avgLoanSize: 85000,
      color: "from-red-500 to-red-600",
      coordinates: { top: "30%", left: "45%" },
    },
    {
      name: "Othaya",
      density: 78,
      farmers: 12340,
      avgLoanSize: 72000,
      color: "from-orange-500 to-orange-600",
      coordinates: { top: "35%", left: "55%" },
    },
    {
      name: "Murang'a North",
      density: 85,
      farmers: 14120,
      avgLoanSize: 78000,
      color: "from-yellow-500 to-yellow-600",
      coordinates: { top: "50%", left: "40%" },
    },
    {
      name: "Tetu",
      density: 88,
      farmers: 14780,
      avgLoanSize: 81000,
      color: "from-lime-500 to-lime-600",
      coordinates: { top: "55%", left: "60%" },
    },
    {
      name: "Mathira",
      density: 82,
      farmers: 13560,
      avgLoanSize: 75000,
      color: "from-green-500 to-green-600",
      coordinates: { top: "70%", left: "50%" },
    },
  ]

  const totalFarmers = nyeriRegions.reduce((sum, r) => sum + r.farmers, 0)
  const avgDensity = Math.round(nyeriRegions.reduce((sum, r) => sum + r.density, 0) / nyeriRegions.length)
  const totalLoanPool = nyeriRegions.reduce((sum, r) => sum + r.farmers * r.avgLoanSize, 0)

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url('/nyeri-farm-field.jpg')`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none" />

      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="flex items-center gap-2 text-foreground hover:bg-primary/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-bold text-foreground">GOLD LEAF</span>
          </div>
          <Button onClick={onGetStarted} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-white/40">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-primary" />
              <h1 className="text-5xl font-bold text-foreground">Nyeri Region Geospatial Data</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore real-time farmer density, community size, and lending opportunities across Nyeri's regions. This
              public data helps identify the best opportunities for fair lending based on regional demographics.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/40 to-primary/30 backdrop-blur-md border border-primary/50 hover:border-primary/80 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-primary" />
                <p className="text-sm text-muted-foreground">Total Farmers</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{(totalFarmers / 1000).toFixed(1)}K</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/40 to-accent/30 backdrop-blur-md border border-accent/50 hover:border-accent/80 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-6 h-6 text-accent" />
                <p className="text-sm text-muted-foreground">Avg Density</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{avgDensity}%</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/40 to-green-500/30 backdrop-blur-md border border-green-500/50 hover:border-green-500/80 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-6 h-6 text-green-600" />
                <p className="text-sm text-muted-foreground">Total Loan Pool</p>
              </div>
              <p className="text-3xl font-bold text-foreground">KSh {(totalLoanPool / 1e9).toFixed(1)}B</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/40 to-blue-500/30 backdrop-blur-md border border-blue-500/50 hover:border-blue-500/80 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                <p className="text-sm text-muted-foreground">Regions Covered</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{nyeriRegions.length}</p>
            </div>
          </div>

          {/* Map and Details Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <div className="relative w-full bg-white/35 backdrop-blur-md rounded-2xl border border-primary/40 overflow-hidden p-8 aspect-video">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-green-100/10 to-blue-100/20" />

                {/* Regions as Interactive Points */}
                <div className="relative w-full h-full">
                  {nyeriRegions.map((region, idx) => (
                    <div key={idx} className="absolute group cursor-pointer" style={region.coordinates}>
                      {/* Animated Background Circle */}
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${region.color} animate-pulse`}
                        style={{
                          width: `${Math.max(40, region.density / 2)}px`,
                          height: `${Math.max(40, region.density / 2)}px`,
                          opacity: 0.4,
                        }}
                      />

                      {/* Clickable Marker */}
                      <button
                        onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 transform group-hover:scale-125 border-2 border-white shadow-lg bg-gradient-to-r ${region.color}`}
                      >
                        {region.density}%
                      </button>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-foreground text-background px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {region.name}
                      </div>
                    </div>
                  ))}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md rounded-lg p-4 border border-white/60">
                    <p className="text-xs font-bold text-foreground mb-3">Farmer Density Heatmap</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-foreground">85-100%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-foreground">70-84%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-foreground">&lt;70%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Region Details Sidebar */}
            <div className="space-y-4 bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 h-fit">
              <h3 className="text-xl font-bold text-foreground mb-4">Regions</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {nyeriRegions.map((region, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                    className={`w-full p-4 rounded-xl transition-all duration-300 border-2 text-left ${
                      selectedRegion === region.name
                        ? `bg-gradient-to-r ${region.color} text-white border-primary`
                        : "bg-white/50 backdrop-blur-sm border-primary/30 hover:border-primary/60 text-foreground"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold">{region.name}</h4>
                      <span className="text-sm font-semibold">{region.density}%</span>
                    </div>
                    <div className="text-xs opacity-75 space-y-1">
                      <p>👥 {region.farmers.toLocaleString()} farmers</p>
                      <p>💰 Avg: KSh {region.avgLoanSize.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed View */}
          {selectedRegion && (
            <div className="mt-12 p-8 rounded-2xl bg-white/40 backdrop-blur-md border border-primary/40 animate-slide-in-up">
              {nyeriRegions
                .filter((r) => r.name === selectedRegion)
                .map((region) => (
                  <div key={region.name} className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">{region.name}</h2>
                      <p className="text-muted-foreground">Detailed metrics and lending opportunities</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-xl bg-primary/40 backdrop-blur-sm border border-primary/50">
                        <p className="text-sm text-muted-foreground mb-2">Farmer Density</p>
                        <p className="text-4xl font-bold text-primary">{region.density}%</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {region.density > 85
                            ? "Very High - Strong community"
                            : region.density > 75
                              ? "High - Active region"
                              : "Moderate - Growing market"}
                        </p>
                      </div>

                      <div className="p-6 rounded-xl bg-accent/40 backdrop-blur-sm border border-accent/50">
                        <p className="text-sm text-muted-foreground mb-2">Active Farmers</p>
                        <p className="text-4xl font-bold text-accent">{(region.farmers / 1000).toFixed(1)}K</p>
                        <div className="mt-3 w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-accent rounded-full h-2 transition-all"
                            style={{ width: `${(region.farmers / totalFarmers) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-green-500/40 backdrop-blur-sm border border-green-500/50">
                        <p className="text-sm text-muted-foreground mb-2">Avg Loan Size</p>
                        <p className="text-4xl font-bold text-green-600">
                          KSh {(region.avgLoanSize / 1000).toFixed(0)}K
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Total pool: KSh {((region.farmers * region.avgLoanSize) / 1e9).toFixed(2)}B
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60">
                        <h3 className="font-bold text-foreground mb-4">Lending Insights</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>✓ High demand for seasonal loans</li>
                          <li>✓ Strong cooperative participation</li>
                          <li>✓ Diverse crop varieties</li>
                          <li>✓ Reliable repayment history</li>
                        </ul>
                      </div>

                      <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60">
                        <h3 className="font-bold text-foreground mb-4">Opportunities</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>🌱 Agricultural input financing</li>
                          <li>📊 Equipment leasing programs</li>
                          <li>🤝 Cooperative lending pools</li>
                          <li>💼 Working capital solutions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Data Visualization - Regional Comparison */}
          <div className="mt-12 p-8 rounded-2xl bg-white/40 backdrop-blur-md border border-primary/40">
            <h2 className="text-2xl font-bold text-foreground mb-8">Regional Comparison</h2>
            <div className="space-y-6">
              {nyeriRegions.map((region) => (
                <div key={region.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-foreground">{region.name}</h3>
                    <span className="text-sm font-bold text-primary">{region.density}%</span>
                  </div>
                  <div className="w-full h-3 bg-secondary/40 rounded-full overflow-hidden border border-white/30">
                    <div
                      className={`h-full bg-gradient-to-r ${region.color} transition-all duration-500`}
                      style={{ width: `${region.density}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center py-12 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Access Credit?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              This geospatial data is available to everyone. Sign in to create your farm profile and unlock personalized
              credit opportunities tailored to your region and farming practice.
            </p>
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-6 rounded-full transition-all hover:scale-105"
            >
              Sign In Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-card/40 backdrop-blur-md border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 FarmFin AI. Geospatial data is publicly available. Personalized insights available upon sign-in.
          </p>
        </div>
      </footer>
    </div>
  )
}
