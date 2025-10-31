"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Leaf } from "lucide-react"
import { PerformanceMetricsGrid } from "./performance-metrics"
import { FinancialHealthCard } from "./financial-health"
import { SeasonalTrendsCard } from "./seasonal-trends"
import { QuickActionsCard } from "./quick-actions"
import { RecordForms } from "./record-forms"
import { CreditScoreComponent } from "./credit-score"
import { CooperativeFeaturesComponent } from "./cooperative-features"
import { LendingMarketplaceComponent } from "./lending-marketplace"

const performanceData = [
  { month: "Jan", yield: 400, expenses: 240 },
  { month: "Feb", yield: 450, expenses: 260 },
  { month: "Mar", yield: 520, expenses: 280 },
  { month: "Apr", yield: 480, expenses: 290 },
  { month: "May", yield: 600, expenses: 310 },
  { month: "Jun", yield: 650, expenses: 320 },
]

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">FarmFin AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, Farmer</span>
            <Button variant="outline" className="text-sm bg-transparent">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <PerformanceMetricsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <SeasonalTrendsCard />
          </div>
          <div>
            <QuickActionsCard />
          </div>
        </div>

        <div className="mt-8">
          <FinancialHealthCard />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="records">Records</TabsTrigger>
            <TabsTrigger value="credit">Credit Score</TabsTrigger>
            <TabsTrigger value="cooperative">Cooperative</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Farm Performance (6 Months)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="yield" fill="var(--chart-1)" name="Yield (kg)" />
                  <Bar dataKey="expenses" fill="var(--chart-2)" name="Expenses ($)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <RecordForms />
          </TabsContent>

          {/* Credit Score Tab */}
          <TabsContent value="credit" className="space-y-6">
            <CreditScoreComponent />
          </TabsContent>

          {/* Cooperative Tab */}
          <TabsContent value="cooperative" className="space-y-6">
            <CooperativeFeaturesComponent />
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <LendingMarketplaceComponent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
