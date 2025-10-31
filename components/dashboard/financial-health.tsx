"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function FinancialHealthCard() {
  const metrics = [
    { label: "Revenue Growth", value: 78, status: "good" },
    { label: "Cost Control", value: 65, status: "fair" },
    { label: "Debt Ratio", value: 42, status: "good" },
    { label: "Liquidity", value: 55, status: "fair" },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Financial Health Score</h3>

      <div className="space-y-6">
        {metrics.map((metric, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{metric.label}</span>
              <div className="flex items-center gap-2">
                {metric.status === "good" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                )}
                <span className="text-sm font-semibold text-foreground">{metric.value}%</span>
              </div>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Overall Score: 60/100</span>
          <br />
          <span className="text-muted-foreground">
            Your farm is performing well. Focus on improving cost control to increase profitability.
          </span>
        </p>
      </div>
    </Card>
  )
}
