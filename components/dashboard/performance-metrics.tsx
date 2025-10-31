"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  trend?: number
  status?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
}

export function MetricCard({ label, value, unit, trend, status = "neutral", icon }: MetricCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {unit && <p className="text-sm text-muted-foreground">{unit}</p>}
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : trend < 0 ? (
                <TrendingDown className="w-4 h-4 text-red-600" />
              ) : null}
              <span
                className={`text-xs font-medium ${trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : "text-muted-foreground"}`}
              >
                {trend > 0 ? "+" : ""}
                {trend}% vs last month
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
    </Card>
  )
}

export function PerformanceMetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard label="Average Yield" value="2,450" unit="kg" trend={12} status="positive" />
      <MetricCard label="Total Revenue" value="$4,200" trend={8} status="positive" />
      <MetricCard label="Operating Costs" value="$1,850" trend={-5} status="positive" />
      <MetricCard label="Profit Margin" value="56%" trend={15} status="positive" />
    </div>
  )
}
