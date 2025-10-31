"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, FileText, TrendingUp, Users } from "lucide-react"

export function QuickActionsCard() {
  const actions = [
    { icon: Plus, label: "Record Yield", color: "text-green-600" },
    { icon: FileText, label: "View Reports", color: "text-blue-600" },
    { icon: TrendingUp, label: "Analyze Trends", color: "text-purple-600" },
    { icon: Users, label: "Join Cooperative", color: "text-orange-600" },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon
          return (
            <Button
              key={i}
              variant="outline"
              className="h-auto py-3 flex flex-col items-center gap-2 hover:bg-secondary bg-transparent"
            >
              <Icon className={`w-5 h-5 ${action.color}`} />
              <span className="text-xs font-medium text-center">{action.label}</span>
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
