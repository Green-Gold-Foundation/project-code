"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts"
import { TrendingUp, DollarSign, Calendar, Percent, CheckCircle2, AlertCircle } from "lucide-react"

const loanProducts = [
  {
    id: 1,
    name: "Community Bank",
    provider: "Community Bank Ltd",
    rate: 8.5,
    minAmount: 500,
    maxAmount: 5000,
    term: 12,
    repaymentFrequency: "Monthly",
    requirements: ["Credit Score > 400", "Farm records for 6 months", "Collateral"],
    features: ["Flexible repayment", "No hidden fees", "Quick approval"],
    approvalTime: "3-5 days",
    successRate: 92,
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 2,
    name: "Agricultural SACCO",
    provider: "Agricultural Savings & Credit Co-operative",
    rate: 7.2,
    minAmount: 1000,
    maxAmount: 10000,
    term: 24,
    repaymentFrequency: "Monthly",
    requirements: ["SACCO membership", "Savings deposit", "Guarantor"],
    features: ["Member benefits", "Dividend returns", "Flexible terms"],
    approvalTime: "5-7 days",
    successRate: 95,
    rating: 4.7,
    reviews: 456,
  },
  {
    id: 3,
    name: "Microfinance Plus",
    provider: "Microfinance Plus",
    rate: 9.0,
    minAmount: 300,
    maxAmount: 3000,
    term: 6,
    repaymentFrequency: "Weekly",
    requirements: ["ID verification", "Phone number", "Basic farm info"],
    features: ["Quick disbursement", "No collateral", "Mobile-friendly"],
    approvalTime: "1-2 days",
    successRate: 88,
    rating: 4.2,
    reviews: 189,
  },
  {
    id: 4,
    name: "Women Farmers Fund",
    provider: "Women Farmers Fund",
    rate: 6.5,
    minAmount: 800,
    maxAmount: 8000,
    term: 18,
    repaymentFrequency: "Monthly",
    requirements: ["Female farmer", "Farm records", "Group membership"],
    features: ["Women-focused", "Training included", "Community support"],
    approvalTime: "4-6 days",
    successRate: 96,
    rating: 4.8,
    reviews: 312,
  },
]

const repaymentScheduleData = [
  { month: 1, principal: 400, interest: 70, balance: 9600 },
  { month: 2, principal: 400, interest: 68, balance: 9200 },
  { month: 3, principal: 400, interest: 66, balance: 8800 },
  { month: 4, principal: 400, interest: 64, balance: 8400 },
  { month: 5, principal: 400, interest: 62, balance: 8000 },
  { month: 6, principal: 400, interest: 60, balance: 7600 },
]

export function LendingMarketplaceComponent() {
  const [selectedLoan, setSelectedLoan] = useState<number | null>(null)
  const [filterRate, setFilterRate] = useState(10)
  const [filterAmount, setFilterAmount] = useState(10000)
  const [filterTerm, setFilterTerm] = useState(24)
  const [appliedLoans, setAppliedLoans] = useState<number[]>([])

  const filteredLoans = loanProducts.filter(
    (loan) => loan.rate <= filterRate && loan.maxAmount >= filterAmount && loan.term >= filterTerm,
  )

  const handleApplyLoan = (loanId: number) => {
    if (!appliedLoans.includes(loanId)) {
      setAppliedLoans([...appliedLoans, loanId])
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Filter Loans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Max Interest Rate: {filterRate}%</label>
            <input
              type="range"
              min="5"
              max="15"
              value={filterRate}
              onChange={(e) => setFilterRate(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Loan Amount: ${filterAmount}</label>
            <input
              type="range"
              min="300"
              max="10000"
              step="500"
              value={filterAmount}
              onChange={(e) => setFilterAmount(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Min Term: {filterTerm} months</label>
            <input
              type="range"
              min="6"
              max="24"
              step="6"
              value={filterTerm}
              onChange={(e) => setFilterTerm(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Showing {filteredLoans.length} of {loanProducts.length} available loans
        </p>
      </Card>

      {/* Loan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLoans.map((loan) => (
          <Card key={loan.id} className="p-6 hover:shadow-lg transition-shadow border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-foreground text-lg">{loan.name}</h4>
                <p className="text-sm text-muted-foreground">{loan.provider}</p>
              </div>
              {appliedLoans.includes(loan.id) && <Badge className="bg-green-100 text-green-800">Applied</Badge>}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Interest Rate</p>
                  <p className="font-semibold text-foreground">{loan.rate}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Loan Amount</p>
                  <p className="font-semibold text-foreground">
                    ${loan.minAmount}-${loan.maxAmount}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Term</p>
                  <p className="font-semibold text-foreground">{loan.term} months</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="font-semibold text-foreground">{loan.successRate}%</p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(loan.rating) ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {loan.rating} ({loan.reviews} reviews)
              </span>
            </div>

            {/* Features */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-foreground mb-2">Key Features:</p>
              <div className="flex flex-wrap gap-1">
                {loan.features.map((feature, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 text-sm bg-transparent">
                    Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{loan.name}</DialogTitle>
                    <DialogDescription>{loan.provider}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Loan Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                        <p className="text-2xl font-bold text-primary">{loan.rate}%</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Approval Time</p>
                        <p className="text-lg font-semibold text-foreground">{loan.approvalTime}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Repayment Frequency</p>
                        <p className="text-lg font-semibold text-foreground">{loan.repaymentFrequency}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                        <p className="text-2xl font-bold text-green-600">{loan.successRate}%</p>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {loan.requirements.map((req, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Repayment Schedule */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Sample Repayment Schedule (6 months)</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={repaymentScheduleData}>
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
                          <Bar dataKey="principal" fill="var(--chart-1)" name="Principal" />
                          <Bar dataKey="interest" fill="var(--chart-2)" name="Interest" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Apply Button */}
                    <Button
                      onClick={() => {
                        handleApplyLoan(loan.id)
                        setSelectedLoan(null)
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={appliedLoans.includes(loan.id)}
                    >
                      {appliedLoans.includes(loan.id) ? "Application Submitted" : "Apply for Loan"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                onClick={() => handleApplyLoan(loan.id)}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
                disabled={appliedLoans.includes(loan.id)}
              >
                {appliedLoans.includes(loan.id) ? "Applied" : "Apply Now"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Applied Loans Summary */}
      {appliedLoans.length > 0 && (
        <Card className="p-6 bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Applications Submitted</h4>
              <p className="text-sm text-blue-800 mb-3">
                You have submitted {appliedLoans.length} loan application(s). Lenders will review your profile and
                contact you within 1-2 business days.
              </p>
              <div className="flex flex-wrap gap-2">
                {appliedLoans.map((loanId) => {
                  const loan = loanProducts.find((l) => l.id === loanId)
                  return (
                    <Badge key={loanId} className="bg-blue-600 text-white">
                      {loan?.name}
                    </Badge>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
