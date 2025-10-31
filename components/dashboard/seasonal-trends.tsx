"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const seasonalData = [
  { month: "Jan", yield: 380, rainfall: 45, temperature: 22 },
  { month: "Feb", yield: 420, rainfall: 52, temperature: 24 },
  { month: "Mar", yield: 520, rainfall: 65, temperature: 26 },
  { month: "Apr", yield: 480, rainfall: 72, temperature: 28 },
  { month: "May", yield: 600, rainfall: 85, temperature: 30 },
  { month: "Jun", yield: 650, rainfall: 78, temperature: 29 },
  { month: "Jul", yield: 620, rainfall: 68, temperature: 28 },
  { month: "Aug", yield: 580, rainfall: 55, temperature: 27 },
]

export function SeasonalTrendsCard() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Seasonal Trends & Patterns</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={seasonalData}>
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
          <Line type="monotone" dataKey="yield" stroke="var(--chart-1)" name="Yield (kg)" strokeWidth={2} />
          <Line type="monotone" dataKey="rainfall" stroke="var(--chart-3)" name="Rainfall (mm)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
