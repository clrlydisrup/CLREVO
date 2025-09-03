"use client"

import { useState, useEffect } from "react"

export default function SmartCityTime() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [location, setLocation] = useState<string>("Loading...")
  const [timezone, setTimezone] = useState<string>("America/New_York")

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          console.log("[v0] Got coordinates:", latitude, longitude)

          try {
            // Try OpenStreetMap Nominatim API first (free and reliable)
            const nominatimResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            )
            const nominatimData = await nominatimResponse.json()
            console.log("[v0] Nominatim response:", nominatimData)

            // Extract city name from various possible fields
            const cityName =
              nominatimData.address?.city ||
              nominatimData.address?.town ||
              nominatimData.address?.village ||
              nominatimData.address?.county ||
              nominatimData.display_name?.split(",")[0] ||
              "PLANET EARTH"

            console.log("[v0] Detected city:", cityName)
            setLocation(cityName)

            // Get timezone from browser or try to detect from coordinates
            const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
            setTimezone(detectedTimezone)
            console.log("[v0] Using timezone:", detectedTimezone)
          } catch (error) {
            console.log("[v0] Location detection failed:", error)
            setTimezone("America/New_York")
            setLocation("PLANET EARTH")
          }
        },
        (error) => {
          console.log("[v0] Geolocation failed:", error)
          setTimezone("America/New_York")
          setLocation("PLANET EARTH")
        },
      )
    } else {
      setTimezone("America/New_York")
      setLocation("PLANET EARTH")
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    if (!timezone) return "00:00:00"

    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(date)
    } catch (error) {
      // Fallback to local time if timezone is invalid
      return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(date)
    }
  }

  const formatDate = (date: Date) => {
    if (!timezone) return "Loading..."

    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(date)
    } catch (error) {
      // Fallback to local date if timezone is invalid
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(date)
    }
  }

  return (
    <div className="flex flex-col items-end space-y-1 text-right">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-mono text-gray-600 uppercase tracking-wider">{location}</span>
      </div>
      <div className="font-mono text-lg font-bold text-gray-900">{formatTime(currentTime)}</div>
      <div className="font-mono text-sm text-gray-500 uppercase tracking-wide">{formatDate(currentTime)}</div>
    </div>
  )
}
