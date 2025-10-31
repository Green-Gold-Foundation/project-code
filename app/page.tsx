"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing/landing-page"
import { AboutPage } from "@/components/landing/about-page"
import { AuthPage } from "@/components/auth/auth-page"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { NyeriGeospatialPage } from "@/components/landing/nyeri-geospatial-page"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"landing" | "about" | "auth" | "dashboard" | "geospatial">("landing")

  const handleGetStarted = () => {
    setCurrentPage("auth")
  }

  const handleAuthSuccess = () => {
    setCurrentPage("dashboard")
  }

  const handleBackToHome = () => {
    setCurrentPage("landing")
  }

  const handleAbout = () => {
    setCurrentPage("about")
  }

  const handleGeospatialView = () => {
    setCurrentPage("geospatial")
  }

  if (currentPage === "about") {
    return <AboutPage onBack={handleBackToHome} onGetStarted={handleGetStarted} />
  }

  if (currentPage === "auth") {
    return <AuthPage onAuthSuccess={handleAuthSuccess} onBack={handleBackToHome} />
  }

  if (currentPage === "dashboard") {
    return <DashboardPage />
  }

  if (currentPage === "geospatial") {
    return <NyeriGeospatialPage onBack={handleBackToHome} onGetStarted={handleGetStarted} />
  }

  return <LandingPage onGetStarted={handleGetStarted} onAbout={handleAbout} onGeospatialView={handleGeospatialView} />
}
