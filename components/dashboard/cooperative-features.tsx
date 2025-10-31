"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Users, TrendingUp, Lock, CheckCircle, Plus } from "lucide-react"

interface CooperativeMember {
  id: string
  name: string
  joinDate: string
  contribution: number
  status: "active" | "inactive"
  creditScore: number
}

interface CollateralPool {
  id: string
  name: string
  totalValue: number
  members: number
  utilizationRate: number
  status: "active" | "pending"
}

interface CommunityLoan {
  id: string
  borrower: string
  amount: number
  purpose: string
  status: "active" | "completed" | "pending"
  repaymentProgress: number
  guarantors: string[]
}

const mockCooperativeData = {
  members: [
    { id: "1", name: "John Kipchoge", joinDate: "Jan 2023", contribution: 500, status: "active", creditScore: 85 },
    { id: "2", name: "Mary Wanjiru", joinDate: "Mar 2023", contribution: 750, status: "active", creditScore: 92 },
    { id: "3", name: "Peter Omondi", joinDate: "Jun 2023", contribution: 600, status: "active", creditScore: 78 },
    { id: "4", name: "Grace Kiplagat", joinDate: "Aug 2023", contribution: 450, status: "inactive", creditScore: 65 },
  ],
  pools: [
    {
      id: "1",
      name: "Emergency Fund",
      totalValue: 8500,
      members: 12,
      utilizationRate: 35,
      status: "active",
    },
    {
      id: "2",
      name: "Equipment Collateral",
      totalValue: 15000,
      members: 8,
      utilizationRate: 60,
      status: "active",
    },
    {
      id: "3",
      name: "Seasonal Input Fund",
      totalValue: 5200,
      members: 6,
      utilizationRate: 45,
      status: "pending",
    },
  ],
  loans: [
    {
      id: "1",
      borrower: "John Kipchoge",
      amount: 3000,
      purpose: "Buy improved seeds",
      status: "active",
      repaymentProgress: 65,
      guarantors: ["Mary Wanjiru", "Peter Omondi"],
    },
    {
      id: "2",
      borrower: "Mary Wanjiru",
      amount: 5000,
      purpose: "Irrigation system",
      status: "active",
      repaymentProgress: 40,
      guarantors: ["John Kipchoge", "Grace Kiplagat"],
    },
    {
      id: "3",
      borrower: "Peter Omondi",
      amount: 2000,
      purpose: "Fertilizer purchase",
      status: "completed",
      repaymentProgress: 100,
      guarantors: ["Mary Wanjiru"],
    },
  ],
}

const poolUtilizationData = mockCooperativeData.pools.map((pool) => ({
  name: pool.name,
  utilization: pool.utilizationRate,
  available: 100 - pool.utilizationRate,
}))

const memberContributionData = mockCooperativeData.members.map((member) => ({
  name: member.name.split(" ")[0],
  contribution: member.contribution,
}))

export function CooperativeFeaturesComponent() {
  const [openDialog, setOpenDialog] = useState<"join" | "contribute" | "request" | null>(null)
  const [formData, setFormData] = useState({ amount: "", purpose: "", guarantors: "" })

  const handleJoinCooperative = () => {
    setOpenDialog(null)
    setFormData({ amount: "", purpose: "", guarantors: "" })
  }

  const handleContribute = () => {
    setOpenDialog(null)
    setFormData({ amount: "", purpose: "", guarantors: "" })
  }

  const handleRequestLoan = () => {
    setOpenDialog(null)
    setFormData({ amount: "", purpose: "", guarantors: "" })
  }

  const totalPoolValue = mockCooperativeData.pools.reduce((sum, pool) => sum + pool.totalValue, 0)
  const activeMembers = mockCooperativeData.members.filter((m) => m.status === "active").length
  const activeLoanAmount = mockCooperativeData.loans
    .filter((l) => l.status === "active")
    .reduce((sum, l) => sum + l.amount, 0)

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Members</p>
              <p className="text-3xl font-bold text-foreground">{activeMembers}</p>
            </div>
            <Users className="w-8 h-8 text-primary opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Pool Value</p>
              <p className="text-3xl font-bold text-foreground">${totalPoolValue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Loans</p>
              <p className="text-3xl font-bold text-foreground">${activeLoanAmount.toLocaleString()}</p>
            </div>
            <Lock className="w-8 h-8 text-primary opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Status</p>
              <p className="text-lg font-bold text-green-600">Active Member</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="pools">Collateral Pools</TabsTrigger>
          <TabsTrigger value="loans">Community Loans</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Cooperative Members</h3>
            <Button
              onClick={() => setOpenDialog("join")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </div>

          <div className="space-y-3">
            {mockCooperativeData.members.map((member) => (
              <Card key={member.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Joined {member.joinDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${member.contribution}</p>
                    <p className="text-sm text-muted-foreground">Credit: {member.creditScore}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Collateral Pools Tab */}
        <TabsContent value="pools" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Collateral Pools</h3>
            <Button
              onClick={() => setOpenDialog("contribute")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Contribute
            </Button>
          </div>

          <div className="space-y-4">
            {mockCooperativeData.pools.map((pool) => (
              <Card key={pool.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{pool.name}</h4>
                      <Badge variant={pool.status === "active" ? "default" : "secondary"}>{pool.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{pool.members} members contributing</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${pool.totalValue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Value</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Utilization Rate</span>
                    <span className="font-semibold">{pool.utilizationRate}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${pool.utilizationRate}%` }}
                    ></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Community Loans Tab */}
        <TabsContent value="loans" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Community Loans</h3>
            <Button
              onClick={() => setOpenDialog("request")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Request Loan
            </Button>
          </div>

          <div className="space-y-4">
            {mockCooperativeData.loans.map((loan) => (
              <Card key={loan.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{loan.borrower}</h4>
                      <Badge
                        variant={
                          loan.status === "active" ? "default" : loan.status === "completed" ? "secondary" : "outline"
                        }
                      >
                        {loan.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${loan.amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Repayment Progress</span>
                    <span className="font-semibold">{loan.repaymentProgress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${loan.repaymentProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Guarantors</p>
                  <div className="flex flex-wrap gap-2">
                    {loan.guarantors.map((guarantor) => (
                      <Badge key={guarantor} variant="outline">
                        {guarantor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-4">Pool Utilization</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={poolUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="utilization" fill="var(--chart-1)" name="Utilized %" />
                <Bar dataKey="available" fill="var(--chart-2)" name="Available %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-4">Member Contributions</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={memberContributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="contribution" fill="var(--primary)" name="Contribution ($)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Benefits Card */}
      <Card className="p-6 bg-accent/10 border-accent">
        <h4 className="font-semibold text-foreground mb-3">Cooperative Benefits</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">Access to shared collateral pools for better loan terms</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">Community-backed loans with peer guarantors</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">Lower interest rates through collective bargaining</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">Emergency fund access for crop failures or emergencies</span>
          </li>
        </ul>
      </Card>

      {/* Join Cooperative Dialog */}
      <Dialog open={openDialog === "join"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Member to Cooperative</DialogTitle>
            <DialogDescription>Add a new farmer to your cooperative</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="member-name">Member Name</Label>
              <Input id="member-name" placeholder="Enter member name" />
            </div>
            <div>
              <Label htmlFor="member-phone">Phone Number</Label>
              <Input id="member-phone" placeholder="Enter phone number" />
            </div>
            <div>
              <Label htmlFor="initial-contribution">Initial Contribution ($)</Label>
              <Input id="initial-contribution" type="number" placeholder="Enter amount" />
            </div>
            <Button
              onClick={handleJoinCooperative}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Send Invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contribute Dialog */}
      <Dialog open={openDialog === "contribute"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contribute to Collateral Pool</DialogTitle>
            <DialogDescription>Add funds to strengthen the cooperative</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pool-select">Select Pool</Label>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                <option>Emergency Fund</option>
                <option>Equipment Collateral</option>
                <option>Seasonal Input Fund</option>
              </select>
            </div>
            <div>
              <Label htmlFor="contribution-amount">Contribution Amount ($)</Label>
              <Input
                id="contribution-amount"
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <Button
              onClick={handleContribute}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Contribute Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Loan Dialog */}
      <Dialog open={openDialog === "request"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Community Loan</DialogTitle>
            <DialogDescription>Borrow from the cooperative with peer guarantors</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="loan-amount">Loan Amount ($)</Label>
              <Input
                id="loan-amount"
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="loan-purpose">Purpose</Label>
              <Textarea
                id="loan-purpose"
                placeholder="Describe what you need the loan for"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="guarantors">Proposed Guarantors</Label>
              <Input
                id="guarantors"
                placeholder="Enter member names (comma-separated)"
                value={formData.guarantors}
                onChange={(e) => setFormData({ ...formData, guarantors: e.target.value })}
              />
            </div>
            <Button
              onClick={handleRequestLoan}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
