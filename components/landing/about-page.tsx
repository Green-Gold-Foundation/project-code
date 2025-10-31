"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Users, Shield, Zap, ArrowLeft, CheckCircle } from "lucide-react"

interface AboutPageProps {
  onBack: () => void
  onGetStarted: () => void
}

export function AboutPage({ onBack, onGetStarted }: AboutPageProps) {
  const [expandedStory, setExpandedStory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Back</span>
          </button>

          <span className="text-xl font-bold text-foreground">GOLD LEAF</span>

          <Button onClick={onGetStarted} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Building Financial Trust for Africa's Farmers
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Empowering smallholder farmers with digital financial identities — because trust should be built on data,
            not bias.
          </p>
        </div>
      </section>

      {/* Mary's Story */}
      <section className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Mary</h2>
            <p className="text-lg text-muted-foreground">A story that reflects millions of farmers across Africa</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
              <div className="space-y-4 text-foreground">
                <p className="text-lg leading-relaxed">
                  Every season, Mary grows enough maize in Nyeri to feed her family and sell surplus. She's a skilled,
                  reliable farmer with consistent harvests.
                </p>
                <p className="text-lg leading-relaxed">
                  But when she applies for a loan, the system rejects her — not because she's unqualified, but because
                  she has no formal financial records.
                </p>
                <p className="text-lg font-semibold text-primary mt-6">
                  Mary represents millions of women farmers locked out of opportunity.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-red-50 border border-red-200">
                <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  The Problem
                </h3>
                <p className="text-red-800">
                  Rejected by traditional banking despite consistent farming success and reliable harvest records.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-green-50 border border-green-200">
                <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  The Solution
                </h3>
                <p className="text-green-800">
                  GREENGOLD transforms everyday farming data into verified financial identity and fair credit access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Crisis */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">The Hidden Crisis in African Agriculture</h2>
            <p className="text-lg text-muted-foreground">Why millions of capable farmers cannot access credit</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Food Production", stat: "70%", desc: "produced by smallholder farmers" },
              { label: "Credit Access", stat: "<10%", desc: "can access formal credit" },
              { label: "Market Size", stat: "250M+", desc: "farmers need solutions" },
              { label: "Workforce", stat: "60%", desc: "of Africa's employment" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-primary/20 hover:border-primary/60 transition-all text-center"
              >
                <p className="text-3xl font-bold text-primary mb-2">{item.stat}</p>
                <p className="font-semibold text-foreground mb-1">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Traditional Banking Fails */}
      <section className="py-20 bg-white/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Traditional Banking Fails Farmers</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "No Collateral",
                desc: "Most smallholder farmers lack land titles or formal assets that banks require for loan approval.",
              },
              {
                title: "Invisible Transactions",
                desc: "Their economic activity — M-Pesa payments, barter trades, cash sales — remains scattered and unrecorded.",
              },
              {
                title: "Gender Bias",
                desc: "Women farmers face additional barriers: smaller land holdings, no documentation, and systematic discrimination.",
              },
              {
                title: "The Poverty Trap",
                desc: "Without credit, farmers can't invest in better seeds or tools — leading to low yields and perpetual under-investment.",
              },
            ].map((barrier, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-red-900 mb-3">{barrier.title}</h3>
                <p className="text-red-800">{barrier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GREENGOLD Solution */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Introducing GREENGOLD</h2>
            <p className="text-xl text-muted-foreground">
              A Smart Financial Management Platform That Builds Digital Trust
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              {[
                {
                  num: "01",
                  title: "Track & Record",
                  desc: "Farmers easily log transactions via mobile app or USSD — accessible even without internet connectivity.",
                },
                {
                  num: "02",
                  title: "AI Analysis",
                  desc: "Our bias-aware AI engine analyzes patterns from M-Pesa data, cooperative records, and farming inputs.",
                },
                {
                  num: "03",
                  title: "Credit Score",
                  desc: "A verified, dynamic credit score emerges — reflecting real farming performance and repayment capacity.",
                },
                {
                  num: "04",
                  title: "Access Credit",
                  desc: "Farmers present their digital identity to SACCOs and lenders, unlocking fair loan terms.",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 p-6 rounded-xl bg-white/50 border border-primary/20 hover:border-primary/40 transition-colors group"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <span className="text-lg font-bold text-primary">{step.num}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
              <h3 className="text-2xl font-bold text-foreground mb-6">Platform Features</h3>
              <ul className="space-y-4">
                {[
                  "Mobile & USSD access for all farmers",
                  "Real-time transaction tracking",
                  "Bias-aware credit scoring",
                  "Cooperative verification",
                  "M-Pesa integration",
                  "Transparent score breakdown",
                  "Fair lending standards",
                  "Community support",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Success Stories</h2>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 max-w-2xl mx-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-green-900 mb-2">Sara's Transformation</h3>
              <p className="text-green-800 font-semibold">From rejected applicant to verified farmer</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span className="text-red-600">✕</span> Before GREENGOLD
                </h4>
                <ul className="space-y-3">
                  {[
                    "No formal credit history",
                    "Rejected by 3 different banks",
                    "Using poor-quality seeds",
                    "Limited harvest yields",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-green-800">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span className="text-green-600">✓</span> After GREENGOLD
                </h4>
                <ul className="space-y-3">
                  {[
                    "Built verified digital profile in 6 months",
                    "Accessed micro-loan from local SACCO",
                    "Purchased certified seeds and fertilizer",
                    "Increased yield by 30% in first season",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-green-800">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-white/60 border border-green-300 italic text-green-900">
              "GREENGOLD gave me proof of what I've always known — that I'm a good farmer and a reliable borrower. Now
              the banks know it too."
            </div>
          </div>
        </div>
      </section>

      {/* Market & Impact */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Market Opportunity & Impact Potential</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
              <h3 className="text-xl font-bold text-primary mb-4">Starting Point</h3>
              <p className="text-foreground mb-4">East Africa, where M-Pesa and digital payments power rural trade.</p>
              <p className="text-3xl font-bold text-primary">5%</p>
              <p className="text-muted-foreground">adoption rate = 12M+ verified farmers</p>
            </div>

            <div className="p-8 rounded-2xl bg-accent/10 border border-accent/30">
              <h3 className="text-xl font-bold text-accent mb-4">Primary Impact</h3>
              <p className="text-foreground">Millions of women gaining access to fair credit for the first time.</p>
              <div className="mt-6 space-y-2">
                <p className="text-sm text-muted-foreground">Women farmers: 50%+</p>
                <p className="text-sm text-muted-foreground">Youth farmers: 40%+</p>
                <p className="text-sm text-muted-foreground">Underserved regions: 100%</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-green-500/10 border border-green-500/20">
              <h3 className="text-xl font-bold text-green-700 mb-4">Economic Growth</h3>
              <p className="text-foreground">Increased farm investment and productivity across Africa.</p>
              <p className="text-sm text-muted-foreground mt-6">Average yield increase: 25-35%</p>
              <p className="text-sm text-muted-foreground">Income growth: 20-40%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 bg-white/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Sustainable Business Model</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Commission Model",
                desc: "Small commission when verified farmers access partner loans through our platform",
              },
              {
                title: "Premium Dashboards",
                desc: "SACCOs and banks pay for advanced analytics to assess farmers transparently",
              },
              {
                title: "Cooperative Subscriptions",
                desc: "Premium tier for cooperatives to manage group funds and track member performance",
              },
            ].map((model, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200"
              >
                <h3 className="text-lg font-bold text-blue-900 mb-3">{model.title}</h3>
                <p className="text-blue-800">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Makes Us Unique</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Bias-Aware AI Engine",
                desc: "Specifically designed to counter gender and social biases in credit scoring",
              },
              {
                icon: Users,
                title: "Community-Collateral Model",
                desc: "Leverages cooperative membership and peer verification for women farmers",
              },
              {
                icon: Zap,
                title: "Multi-Access Design",
                desc: "From USSD for rural users to PWA for youth — meeting farmers where they are",
              },
            ].map((unique, idx) => {
              const Icon = unique.icon
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white/60 border border-primary/20 hover:border-primary/60 transition-all hover:shadow-lg text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-lg bg-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{unique.title}</h3>
                  <p className="text-muted-foreground">{unique.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Join the Agricultural Revolution</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be part of a movement empowering millions of farmers with fair, transparent, and bias-aware financial
            access.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-6 rounded-full"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 GREENGOLD. Building trust through data. Empowering farmers through fairness.
          </p>
        </div>
      </footer>
    </div>
  )
}
