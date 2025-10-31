"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { AlertTriangle, Users, CheckCircle2, Eye, Shield, BarChart3 } from "lucide-react"

const loanApplicationsData = [
  { month: "Jan", approved: 45, rejected: 8, pending: 12 },
  { month: "Feb", approved: 52, rejected: 9, pending: 15 },
  { month: "Mar", approved: 48, rejected: 7, pending: 10 },
  { month: "Apr", approved: 61, rejected: 11, pending: 18 },
  { month: "May", approved: 58, rejected: 10, pending: 14 },
  { month: "Jun", approved: 67, rejected: 12, pending: 16 },
]

const biasMetricsData = [
  { category: "Gender", value: 2.1 },
  { category: "Age", value: 1.8 },
  { category: "Region", value: 2.5 },
  { category: "Farm Size", value: 1.2 },
  { category: "Crop Type", value: 1.5 },
]

const approvalRateByDemographic = [
  { demographic: "Female Farmers", rate: 88, count: 234 },
  { demographic: "Male Farmers", rate: 85, count: 312 },
  { demographic: "Young Farmers (<35)", rate: 82, count: 156 },
  { demographic: "Experienced (35+)", rate: 89, count: 390 },
  { demographic: "Small Farms (<5 acres)", rate: 84, count: 278 },
  { demographic: "Large Farms (5+ acres)", rate: 87, count: 268 },
]

const recentApplications = [
  {
    id: "APP-001",
    name: "Jane Kipchoge",
    amount: 3500,
    status: "approved",
    score: 720,
    demographic: "Female, 32, Western Region",
    riskFactors: [],
  },
  {
    id: "APP-002",
    name: "Samuel Omondi",
    amount: 5000,
    status: "pending",
    score: 650,
    demographic: "Male, 45, Central Region",
    riskFactors: ["Low savings ratio"],
  },
  {
    id: "APP-003",
    name: "Grace Mwangi",
    amount: 2500,
    status: "approved",
    score: 780,
    demographic: "Female, 28, Nairobi",
    riskFactors: [],
  },
  {
    id: "APP-004",
    name: "Peter Kiplagat",
    amount: 4200,
    status: "rejected",
    score: 580,
    demographic: "Male, 52, Rift Valley",
    riskFactors: ["Inconsistent records", "High debt ratio"],
  },
  {
    id: "APP-005",
    name: "Amina Hassan",
    amount: 3000,
    status: "approved",
    score: 710,
    demographic: "Female, 35, Coastal Region",
    riskFactors: [],
  },
]

const biasAlerts = [
  {
    id: 1,
    severity: "warning",
    title: "Gender Disparity Detected",
    description: "Female farmers have 3% lower approval rate than male farmers this month",
    action: "Review scoring factors",
  },
  {
    id: 2,
    severity: "info",
    title: "Regional Bias Check",
    description: "Coastal region applications show 2.1% variance from national average",
    action: "Monitor trend",
  },
  {
    id: 3,
    severity: "success",
    title: "Age Diversity Maintained",
    description: "Approval rates across age groups are within acceptable variance (1.8%)",
    action: "Continue monitoring",
  },
]

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null)

  const totalApplications = loanApplicationsData.reduce(
    (sum, month) => sum + month.approved + month.rejected + month.pending,
    0,
  )
  const totalApproved = loanApplicationsData.reduce((sum, month) => sum + month.approved, 0)
  const approvalRate = ((totalApproved / totalApplications) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">FarmFin Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Bias Monitoring & Compliance</span>
            <Button variant="outline" className="text-sm bg-transparent">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-foreground">{totalApplications}</p>
              </div>
              <Users className="w-8 h-8 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approval Rate</p>
                <p className="text-3xl font-bold text-green-600">{approvalRate}%</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bias Variance</p>
                <p className="text-3xl font-bold text-primary">2.1%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Compliance Score</p>
                <p className="text-3xl font-bold text-blue-600">94/100</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bias-analysis">Bias Analysis</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Loan Applications Trend */}
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Loan Applications Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={loanApplicationsData}>
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
                    <Line type="monotone" dataKey="approved" stroke="var(--chart-1)" strokeWidth={2} />
                    <Line type="monotone" dataKey="rejected" stroke="var(--chart-2)" strokeWidth={2} />
                    <Line type="monotone" dataKey="pending" stroke="var(--chart-3)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Application Status Distribution */}
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Approved", value: totalApproved },
                        { name: "Rejected", value: 65 },
                        { name: "Pending", value: 85 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="var(--chart-1)" />
                      <Cell fill="var(--chart-2)" />
                      <Cell fill="var(--chart-3)" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Approval Rate by Demographic */}
            <Card className="p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Approval Rate by Demographic</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={approvalRateByDemographic}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="demographic"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    stroke="var(--muted-foreground)"
                  />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="rate" fill="var(--chart-1)" name="Approval Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Bias Analysis Tab */}
          <TabsContent value="bias-analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bias Metrics Radar */}
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Bias Variance by Factor</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={biasMetricsData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="category" stroke="var(--muted-foreground)" />
                    <PolarRadiusAxis stroke="var(--muted-foreground)" />
                    <Radar
                      name="Variance %"
                      dataKey="value"
                      stroke="var(--chart-1)"
                      fill="var(--chart-1)"
                      fillOpacity={0.6}
                    />
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

              {/* Bias Metrics Details */}
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Metrics</h3>
                <div className="space-y-4">
                  {biasMetricsData.map((metric, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{metric.category}</p>
                        <p className="text-xs text-muted-foreground">Variance from baseline</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{metric.value}%</p>
                        <Badge variant={metric.value < 2.5 ? "secondary" : "destructive"} className="text-xs mt-1">
                          {metric.value < 2.5 ? "Acceptable" : "Review"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Fairness Principles */}
            <Card className="p-6 border border-border bg-blue-50">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Fairness & Bias Mitigation Strategies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-foreground mb-2">Excluded Factors</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Gender, ethnicity, religion</li>
                    <li>✓ Family status or marital status</li>
                    <li>✓ Political affiliation</li>
                    <li>✓ Disability status</li>
                  </ul>
                </div>
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-foreground mb-2">Included Factors</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Farm yield trends</li>
                    <li>✓ Financial records</li>
                    <li>✓ Repayment history</li>
                    <li>✓ Cooperative participation</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card className="p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Applications</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Score</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Demographic</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app) => (
                      <tr key={app.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-muted-foreground">{app.id}</td>
                        <td className="py-3 px-4 font-medium text-foreground">{app.name}</td>
                        <td className="py-3 px-4 text-foreground">${app.amount}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-blue-100 text-blue-800">{app.score}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              app.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : app.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{app.demographic}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" className="text-primary">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            {biasAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`p-6 border cursor-pointer transition-all ${
                  alert.severity === "warning"
                    ? "border-yellow-200 bg-yellow-50"
                    : alert.severity === "info"
                      ? "border-blue-200 bg-blue-50"
                      : "border-green-200 bg-green-50"
                }`}
                onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {alert.severity === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                    {alert.severity === "info" && <Eye className="w-5 h-5 text-blue-600" />}
                    {alert.severity === "success" && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold mb-1 ${
                        alert.severity === "warning"
                          ? "text-yellow-900"
                          : alert.severity === "info"
                            ? "text-blue-900"
                            : "text-green-900"
                      }`}
                    >
                      {alert.title}
                    </h4>
                    <p
                      className={`text-sm ${
                        alert.severity === "warning"
                          ? "text-yellow-800"
                          : alert.severity === "info"
                            ? "text-blue-800"
                            : "text-green-800"
                      }`}
                    >
                      {alert.description}
                    </p>
                    {expandedAlert === alert.id && (
                      <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                          {alert.action}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
