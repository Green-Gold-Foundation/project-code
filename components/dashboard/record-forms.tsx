"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from "lucide-react"

interface Record {
  id: string
  type: "yield" | "expense" | "sale"
  value: string
  date: string
  description?: string
  timestamp: Date
}

export function RecordForms() {
  const [records, setRecords] = useState<Record[]>([
    { id: "1", type: "yield", value: "450 kg", date: "Today", description: "Maize harvest", timestamp: new Date() },
    {
      id: "2",
      type: "expense",
      value: "-$120",
      date: "Yesterday",
      description: "Fertilizer purchase",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "3",
      type: "sale",
      value: "+$850",
      date: "2 days ago",
      description: "Sold to market",
      timestamp: new Date(Date.now() - 172800000),
    },
  ])

  const [openDialog, setOpenDialog] = useState<"yield" | "expense" | "sale" | null>(null)
  const [successMessage, setSuccessMessage] = useState("")

  // Yield Form State
  const [yieldForm, setYieldForm] = useState({ crop: "", quantity: "", unit: "kg", date: "", notes: "" })

  // Expense Form State
  const [expenseForm, setExpenseForm] = useState({ category: "", amount: "", date: "", description: "" })

  // Sale Form State
  const [saleForm, setSaleForm] = useState({
    crop: "",
    quantity: "",
    unit: "kg",
    pricePerUnit: "",
    buyer: "",
    date: "",
    notes: "",
  })

  const handleYieldSubmit = () => {
    if (yieldForm.crop && yieldForm.quantity) {
      const newRecord: Record = {
        id: Date.now().toString(),
        type: "yield",
        value: `${yieldForm.quantity} ${yieldForm.unit}`,
        date: "Today",
        description: `${yieldForm.crop} harvest${yieldForm.notes ? ": " + yieldForm.notes : ""}`,
        timestamp: new Date(),
      }
      setRecords([newRecord, ...records])
      setYieldForm({ crop: "", quantity: "", unit: "kg", date: "", notes: "" })
      setOpenDialog(null)
      setSuccessMessage("Yield record added successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleExpenseSubmit = () => {
    if (expenseForm.category && expenseForm.amount) {
      const newRecord: Record = {
        id: Date.now().toString(),
        type: "expense",
        value: `-$${expenseForm.amount}`,
        date: "Today",
        description: `${expenseForm.category}${expenseForm.description ? ": " + expenseForm.description : ""}`,
        timestamp: new Date(),
      }
      setRecords([newRecord, ...records])
      setExpenseForm({ category: "", amount: "", date: "", description: "" })
      setOpenDialog(null)
      setSuccessMessage("Expense record added successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleSaleSubmit = () => {
    if (saleForm.crop && saleForm.quantity && saleForm.pricePerUnit) {
      const totalAmount = (Number.parseFloat(saleForm.quantity) * Number.parseFloat(saleForm.pricePerUnit)).toFixed(2)
      const newRecord: Record = {
        id: Date.now().toString(),
        type: "sale",
        value: `+$${totalAmount}`,
        date: "Today",
        description: `${saleForm.crop} sold to ${saleForm.buyer || "buyer"}${saleForm.notes ? ": " + saleForm.notes : ""}`,
        timestamp: new Date(),
      }
      setRecords([newRecord, ...records])
      setSaleForm({ crop: "", quantity: "", unit: "kg", pricePerUnit: "", buyer: "", date: "", notes: "" })
      setOpenDialog(null)
      setSuccessMessage("Sale record added successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={() => setOpenDialog("yield")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
        >
          + Record Yield
        </Button>
        <Button
          onClick={() => setOpenDialog("expense")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
        >
          + Record Expense
        </Button>
        <Button
          onClick={() => setOpenDialog("sale")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
        >
          + Record Sale
        </Button>
      </div>

      {/* Recent Records */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Records</h3>
        <div className="space-y-3">
          {records.slice(0, 10).map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground capitalize">{record.type}</p>
                <p className="text-sm text-muted-foreground">{record.description || record.date}</p>
              </div>
              <p className={`font-semibold ${record.type === "expense" ? "text-destructive" : "text-primary"}`}>
                {record.value}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Yield Form Dialog */}
      <Dialog open={openDialog === "yield"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Yield</DialogTitle>
            <DialogDescription>Add a new yield record for your farm</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="crop">Crop Type</Label>
              <Select value={yieldForm.crop} onValueChange={(value) => setYieldForm({ ...yieldForm, crop: value })}>
                <SelectTrigger id="crop">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="beans">Beans</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="sorghum">Sorghum</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={yieldForm.quantity}
                  onChange={(e) => setYieldForm({ ...yieldForm, quantity: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select value={yieldForm.unit} onValueChange={(value) => setYieldForm({ ...yieldForm, unit: value })}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="bags">Bags</SelectItem>
                    <SelectItem value="tons">Tons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={yieldForm.date}
                onChange={(e) => setYieldForm({ ...yieldForm, date: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes..."
                value={yieldForm.notes}
                onChange={(e) => setYieldForm({ ...yieldForm, notes: e.target.value })}
              />
            </div>

            <Button
              onClick={handleYieldSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Save Yield Record
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Expense Form Dialog */}
      <Dialog open={openDialog === "expense"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Expense</DialogTitle>
            <DialogDescription>Add a new farm expense</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Expense Category</Label>
              <Select
                value={expenseForm.category}
                onValueChange={(value) => setExpenseForm({ ...expenseForm, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fertilizer">Fertilizer</SelectItem>
                  <SelectItem value="seeds">Seeds</SelectItem>
                  <SelectItem value="labor">Labor</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="water">Water/Irrigation</SelectItem>
                  <SelectItem value="pesticides">Pesticides</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                step="0.01"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="expense-date">Date</Label>
              <Input
                id="expense-date"
                type="date"
                value={expenseForm.date}
                onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add details about this expense..."
                value={expenseForm.description}
                onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
              />
            </div>

            <Button
              onClick={handleExpenseSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Save Expense Record
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sale Form Dialog */}
      <Dialog open={openDialog === "sale"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Sale</DialogTitle>
            <DialogDescription>Add a new sale transaction</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="sale-crop">Crop Type</Label>
              <Select value={saleForm.crop} onValueChange={(value) => setSaleForm({ ...saleForm, crop: value })}>
                <SelectTrigger id="sale-crop">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="beans">Beans</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="sorghum">Sorghum</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sale-quantity">Quantity</Label>
                <Input
                  id="sale-quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={saleForm.quantity}
                  onChange={(e) => setSaleForm({ ...saleForm, quantity: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sale-unit">Unit</Label>
                <Select value={saleForm.unit} onValueChange={(value) => setSaleForm({ ...saleForm, unit: value })}>
                  <SelectTrigger id="sale-unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="bags">Bags</SelectItem>
                    <SelectItem value="tons">Tons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="price">Price Per Unit ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price per unit"
                step="0.01"
                value={saleForm.pricePerUnit}
                onChange={(e) => setSaleForm({ ...saleForm, pricePerUnit: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="buyer">Buyer Name (Optional)</Label>
              <Input
                id="buyer"
                placeholder="Enter buyer name"
                value={saleForm.buyer}
                onChange={(e) => setSaleForm({ ...saleForm, buyer: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="sale-date">Date</Label>
              <Input
                id="sale-date"
                type="date"
                value={saleForm.date}
                onChange={(e) => setSaleForm({ ...saleForm, date: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="sale-notes">Notes (Optional)</Label>
              <Textarea
                id="sale-notes"
                placeholder="Add any additional notes..."
                value={saleForm.notes}
                onChange={(e) => setSaleForm({ ...saleForm, notes: e.target.value })}
              />
            </div>

            <Button
              onClick={handleSaleSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Save Sale Record
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
