"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { CheckCircle, Info } from "lucide-react"

interface CreditFactor {
  name: string
  score: number
  weight: number
  description: string
  trend: "up" | "down" | "stable"
  details: string[]
}

interface CreditScoreData {
  overallScore: number
  factors: CreditFactor[]
  historicalScores: Array<{ month: string; score: number }>
  recommendations: string[]
}

const mockCreditData: CreditScoreData = {
  overallScore: 82,
  factors: [
    {
      name: "Yield Consistency",
      score: 85,
      weight: 30,
      description: "Stability of your farm production over time",
      trend: "up",
      details: [
        "Average yield: 520 kg/season",
        "Variance: 12% (good stability)",
        "Trend: Improving over 6 months",
        "Last 3 months: 580 kg average",
      ],
    },
    {
      name: "Repayment History",
      score: 90,
      weight: 35,
      description: "Your track record of loan repayments",
      trend: "stable",
      details: [
        "On-time payments: 100%",
        "Total loans repaid: 3",
        "Average repayment time: 18 months",
        "No defaults or late payments",
      ],
    },
    {
      name: "Cooperative Participation",
      score: 75,
      weight: 20,
      description: "Engagement with farming cooperatives",
      trend: "up",
      details: [
        "Member since: 18 months",
        "Participation rate: 75%",
        "Meetings attended: 12/16",
        "Contributions: Regular and on-time",
      ],
    },
    {
      name: "Financial Health",
      score: 78,
      weight: 15,
      description: "Overall financial stability and growth",
      trend: "up",
      details: ["Revenue growth: 15% YoY", "Expense ratio: 42%", "Savings rate: 18%", "Debt-to-income: 0.25"],
    },
  ],
  historicalScores: [
    { month: "Jan", score: 72 },
    { month: "Feb", score: 74 },
    { month: "Mar", score: 76 },
    { month: "Apr", score: 78 },
    { month: "May", score: 80 },
    { month: "Jun", score: 82 },
  ],
  recommendations: [
    "Increase cooperative participation to boost your score further",
    "Maintain your excellent repayment history",
    "Continue recording yield data consistently",
    "Consider diversifying crops to improve yield stability",
  ],
}

export function CreditScoreComponent() {
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    if (score >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200"
    if (score >= 70) return "bg-yellow-50 border-yellow-200"
    if (score >= 60) return "bg-orange-50 border-orange-200"
    return "bg-red-50 border-red-200"
  }

  const radarData = mockCreditData.factors.map((factor) => ({
    name: factor.name.split(" ")[0],
    score: factor.score,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className={`p-8 border-2 ${getScoreBgColor(mockCreditData.overallScore)}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Your Credit Score</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-bold ${getScoreColor(mockCreditData.overallScore)}`}>
                {mockCreditData.overallScore}
              </span>
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {mockCreditData.overallScore >= 80
                ? "Excellent - You qualify for premium lending rates"
                : mockCreditData.overallScore >= 70
                  ? "Good - You have access to competitive lending options"
                  : "Fair - Work on improving your score for better rates"}
            </p>
          </div>
          <div className="flex justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Score", value: mockCreditData.overallScore },
                    { name: "Remaining", value: 100 - mockCreditData.overallScore },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="var(--primary)" />
                  <Cell fill="var(--secondary)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="factors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="factors">Score Factors</TabsTrigger>
          <TabsTrigger value="history">Score History</TabsTrigger>
          <TabsTrigger value="radar">Score Profile</TabsTrigger>
        </TabsList>

        {/* Score Factors Tab */}
        <TabsContent value="factors" className="space-y-4">
          {mockCreditData.factors.map((factor) => (
            <Card
              key={factor.name}
              className="p-6 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setExpandedFactor(expandedFactor === factor.name ? null : factor.name)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{factor.name}</h4>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${factor.trend === "up" ? "bg-green-100 text-green-700" : factor.trend === "down" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}
                    >
                      {factor.trend === "up" ? "↑ Improving" : factor.trend === "down" ? "↓ Declining" : "→ Stable"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-bold ${getScoreColor(factor.score)}`}>{factor.score}</p>
                  <p className="text-xs text-muted-foreground">{factor.weight}% weight</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${factor.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedFactor === factor.name && (
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  {factor.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </TabsContent>

        {/* Score History Tab */}
        <TabsContent value="history">
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-4">Score Trend (Last 6 Months)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockCreditData.historicalScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis domain={[60, 100]} stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ fill: "var(--primary)", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent">
              <p className="text-sm text-foreground font-medium mb-1">Trend Analysis</p>
              <p className="text-sm text-muted-foreground">
                Your credit score has improved by 10 points over the last 6 months, showing consistent growth in all
                factors.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Score Profile Tab */}
        <TabsContent value="radar">
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-4">Score Profile</h4>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="name" stroke="var(--muted-foreground)" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="var(--muted-foreground)" />
                <Radar name="Score" dataKey="score" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">How to Improve Your Score</h4>
            <ul className="space-y-1">
              {mockCreditData.recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm text-blue-800">
                  • {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Explainability Section */}
      <Card className="p-6">
        <h4 className="font-semibold text-foreground mb-4">How Your Credit Score is Calculated</h4>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your FarmFin AI credit score is calculated using a transparent, bias-aware algorithm that considers multiple
            factors specific to agricultural lending:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCreditData.factors.map((factor) => (
              <div key={factor.name} className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground text-sm">{factor.name}</p>
                  <span className="text-xs font-semibold text-primary">{factor.weight}%</span>
                </div>
                <p className="text-xs text-muted-foreground">{factor.description}</p>
              </div>
            ))}
          </div>
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 text-sm">
              Our algorithm is designed to be fair and transparent. We don't use discriminatory factors like gender,
              age, or location. Your score is based solely on your farm's performance and financial behavior.
            </AlertDescription>
          </Alert>
        </div>
      </Card>
    </div>
  )
}
