"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Leaf, ArrowLeft } from "lucide-react"

interface AuthPageProps {
  onAuthSuccess: () => void
  onBack: () => void
}

export function AuthPage({ onAuthSuccess, onBack }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [farmType, setFarmType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === "admin" && password === "admin") {
      onAuthSuccess()
      return
    }

    // Mock authentication for regular users
    if (email && password && (isLogin || (name && farmType))) {
      onAuthSuccess()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">FarmFin AI</h1>
          </div>
          <p className="text-muted-foreground text-sm">Empowering farmers through fair finance</p>
        </div>

        {/* Auth Card */}
        <Card className="p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">{isLogin ? "Welcome Back" : "Join FarmFin"}</h2>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Sign in to access your dashboard" : "Create your account to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Farm Type</label>
                  <select
                    value={farmType}
                    onChange={(e) => setFarmType(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select farm type</option>
                    <option value="crops">Crops</option>
                    <option value="livestock">Livestock</option>
                    <option value="mixed">Mixed Farming</option>
                    <option value="dairy">Dairy</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-md transition-colors"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-semibold">
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">📊</div>
            <p className="text-xs text-muted-foreground">Track Performance</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">📈</div>
            <p className="text-xs text-muted-foreground">Build Credit</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">💰</div>
            <p className="text-xs text-muted-foreground">Access Loans</p>
          </div>
        </div>
      </div>
    </div>
  )
}
