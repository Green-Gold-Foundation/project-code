"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Leaf, TrendingUp, Users, Shield, Zap } from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
  onAbout: () => void
  onGeospatialView: () => void
}

export function LandingPage({ onGetStarted, onAbout, onGeospatialView }: LandingPageProps) {
  const [showHand, setShowHand] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setShowHand(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Nyeri farmer density data
  const nyeriRegions = [
    { name: "Central Nyeri", density: 92, farmers: 15420, avgLoanSize: 85000 },
    { name: "Othaya", density: 78, farmers: 12340, avgLoanSize: 72000 },
    { name: "Murang'a North", density: 85, farmers: 14120, avgLoanSize: 78000 },
    { name: "Tetu", density: 88, farmers: 14780, avgLoanSize: 81000 },
    { name: "Mathira", density: 82, farmers: 13560, avgLoanSize: 75000 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center border-2 border-yellow-500 group-hover:shadow-lg transition-shadow">
              <Leaf className="w-7 h-7 text-yellow-400" />
            </div>
            <span className="text-xl font-bold text-foreground">GOLD LEAF</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-3">
            {[
              { label: "HOME", onClick: () => window.location.reload() },
              { label: "ABOUT", onClick: onAbout },
              { label: "SERVICES", onClick: null },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={item.onClick || undefined}
                disabled={!item.onClick}
                className="text-sm font-bold text-white/90 bg-gray-600/40 backdrop-blur-md px-6 py-2 rounded-full hover:bg-gray-600/60 transition-all duration-300 hover:shadow-lg border border-white/20 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={onGetStarted}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold border-2 border-accent/50 transition-all duration-300 hover:shadow-lg"
          >
            Contact Us
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url(/farm-field-hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content Box */}
          <div className="space-y-8 animate-slide-in-up">
            <div className="bg-green-50/60 backdrop-blur-md rounded-3xl p-8 space-y-6 max-w-md border border-green-200 hover:border-green-300 transition-colors">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-green-900 leading-tight text-balance">
                  EMPOWERING YOUR HARVEST
                </h1>
                <p className="text-xl text-green-700 font-semibold">Fair & Equal Farming Loans</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-full w-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  EXPLORE LOAN OPTIONS
                </Button>
                <Button
                  onClick={onGeospatialView}
                  size="lg"
                  className="bg-green-100 hover:bg-green-200 text-green-900 font-bold text-lg px-8 py-6 rounded-full w-full transition-all duration-300 hover:shadow-lg border border-green-300 hover:border-green-400"
                >
                  VIEW REGION DATA
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 text-green-900">
              {[
                { icon: "⊞", label: "Tailored for Men & Women" },
                { icon: "⊕", label: "Competitive Rates" },
                { icon: "%", label: "Flexible Terms" },
                { icon: "⚘", label: "Growth-Focused Support" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-green-100/30 hover:bg-green-100/50 transition-colors cursor-pointer group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span className="text-yellow-600 text-2xl group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </span>
                  <p className="font-semibold text-sm">{feature.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Animated Hand */}
          <div className="relative h-96 md:h-full flex items-center justify-end pr-8">
            <div
              className={`transition-all duration-1000 ease-out ${
                showHand ? "opacity-100 translate-x-0" : "opacity-0 translate-x-32"
              }`}
            >
              <div className="relative">
                <div className="w-80 h-80 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">🤝</div>
                    <p className="text-green-900 font-bold text-lg">Growing Together</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 to-green-300/30 rounded-full blur-3xl -z-10 animate-pulse-glow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Why Choose FarmFin AI?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering smallholder farmers with fair, transparent, and bias-aware lending solutions
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Fair & Transparent",
                description: "No discriminatory factors. Bias-aware AI ensures equal opportunities for all farmers.",
              },
              {
                icon: TrendingUp,
                title: "Smart Credit Scoring",
                description: "Dynamic credit scores based on farm performance, not just collateral.",
              },
              {
                icon: Users,
                title: "Community Strength",
                description: "Cooperative collateral pools and community lending networks.",
              },
              {
                icon: Zap,
                title: "Quick & Easy",
                description: "Simple record-keeping and instant loan applications.",
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div
                  key={idx}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Ready to Transform Your Farming Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of farmers already using FarmFin AI to grow their businesses with fair, accessible credit.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-6 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground">FarmFin AI</span>
              </div>
              <p className="text-sm text-muted-foreground">Empowering farmers with fair, transparent lending.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Security"] },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              { title: "Support", links: ["Help Center", "Contact", "FAQ"] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-foreground mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 FarmFin AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {["Privacy", "Terms", "Cookies"].map((item, idx) => (
                <a key={idx} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
