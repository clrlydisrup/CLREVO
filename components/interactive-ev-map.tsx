"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ChargingStation {
  id: string
  name: string
  latitude: number
  longitude: number
  address: string
  connectorTypes: string[]
  status: "available" | "occupied" | "unknown"
  distance?: number
  powerKW?: number
  network?: string
}

export default function InteractiveEVMap() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [zipCode, setZipCode] = useState("")
  const [chargingStations, setChargingStations] = useState<ChargingStation[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null)
  const [locationError, setLocationError] = useState("")
  const [map, setMap] = useState<any>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<any[]>([])

  const OPENCHARGE_API_KEY = "3a223543-50de-44a7-b819-3565b44f4394"

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !map) {
      import("leaflet").then((L) => {
        const mapInstance = L.map(mapRef.current!).setView([37.7749, -122.4194], 12)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "",
        }).addTo(mapInstance)

        setMap(mapInstance)
      })
    }
  }, [map])

  useEffect(() => {
    if (map && chargingStations.length > 0) {
      markersRef.current.forEach((marker) => map.removeLayer(marker))
      markersRef.current = []

      import("leaflet").then((L) => {
        chargingStations.forEach((station) => {
          const customIcon = L.divIcon({
            html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                     <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                     </svg>
                   </div>`,
            className: "custom-marker",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })

          const marker = L.marker([station.latitude, station.longitude], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
              <div class="p-3 min-w-[200px]">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <h3 class="font-bold text-sm text-gray-900">${station.name}</h3>
                </div>
                <p class="text-xs text-gray-600 mb-2">${station.address}</p>
                <div class="flex justify-between items-center text-xs">
                  <span class="text-blue-600 font-medium">${station.distance?.toFixed(1)} mi</span>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">${station.status}</span>
                </div>
                ${station.powerKW ? `<p class="text-xs text-purple-600 mt-1 font-medium">${station.powerKW} kW</p>` : ""}
              </div>
            `)
            .on("click", () => setSelectedStation(station))

          markersRef.current.push(marker)
        })

        if (chargingStations.length > 0) {
          const group = new L.featureGroup(markersRef.current)
          map.fitBounds(group.getBounds().pad(0.1))
        }
      })
    }
  }, [map, chargingStations])

  // Get user's current location
  const getCurrentLocation = () => {
    setLoading(true)
    setLocationError("")
    console.log("[v0] Getting current location...")

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("[v0] Got coordinates:", position.coords.latitude, position.coords.longitude)
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setUserLocation(location)

        if (map) {
          map.setView([location.lat, location.lng], 13)
        }

        fetchChargingStations(location.lat, location.lng)
      },
      (error) => {
        console.log("[v0] Geolocation error:", error)
        setLocationError("Unable to retrieve your location. Please try entering your zip code.")
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  // Convert zip code to coordinates
  const handleZipCodeSubmit = async () => {
    if (!zipCode.trim()) return

    setLoading(true)
    setLocationError("")

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${zipCode}&countrycodes=us&limit=1`,
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const location = {
          lat: Number.parseFloat(data[0].lat),
          lng: Number.parseFloat(data[0].lon),
        }
        setUserLocation(location)

        if (map) {
          map.setView([location.lat, location.lng], 13)
        }

        fetchChargingStations(location.lat, location.lng)
      } else {
        setLocationError("Invalid zip code. Please try again.")
        setLoading(false)
      }
    } catch (error) {
      setLocationError("Error processing zip code. Please try again.")
      setLoading(false)
      console.error("Geocoding error:", error)
    }
  }

  // Fetch charging stations from OpenCharge API
  const fetchChargingStations = async (lat: number, lng: number) => {
    console.log("[v0] Fetching charging stations for:", lat, lng)
    try {
      const response = await fetch(
        `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&latitude=${lat}&longitude=${lng}&distance=15&maxresults=50&key=${OPENCHARGE_API_KEY}`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch charging stations")
      }

      const data = await response.json()
      console.log("[v0] Received stations:", data.length)

      const stations: ChargingStation[] = data.map((station: any) => ({
        id: station.ID.toString(),
        name: station.AddressInfo?.Title || "Charging Station",
        latitude: station.AddressInfo?.Latitude || 0,
        longitude: station.AddressInfo?.Longitude || 0,
        address:
          `${station.AddressInfo?.AddressLine1 || ""}, ${station.AddressInfo?.Town || ""}, ${station.AddressInfo?.StateOrProvince || ""}`.trim(),
        connectorTypes: station.Connections?.map((conn: any) => conn.ConnectionType?.Title).filter(Boolean) || [],
        status: station.StatusType?.IsOperational ? "available" : "unknown",
        distance: calculateDistance(lat, lng, station.AddressInfo?.Latitude || 0, station.AddressInfo?.Longitude || 0),
        powerKW: station.Connections?.[0]?.PowerKW || null,
        network: station.OperatorInfo?.Title || "Unknown Network",
      }))

      setChargingStations(stations.sort((a, b) => (a.distance || 0) - (b.distance || 0)))
      setLoading(false)
    } catch (error) {
      console.error("Error fetching charging stations:", error)
      setLocationError("Error loading charging stations. Please try again.")
      setLoading(false)
    }
  }

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 3959 // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <section className="px-4 py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-500 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              CLREVO LIVE NETWORK
            </div>
            <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Experience the CLREVO App
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              See how CLREVO revolutionizes urban mobility. Find EV charging stations, plan optimal routes, and power
              your journey with our live network.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div className="relative flex justify-center">
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                {/* iPhone Frame with CLREVO branding */}
                <div className="relative w-80 h-[640px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-2 shadow-2xl shadow-blue-500/30">
                  <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                    {/* iPhone Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>

                    {/* CLREVO App Interface */}
                    <div className="w-full h-full bg-white relative">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-6 py-2 bg-white text-black text-xs font-medium">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <div className="flex gap-1">
                            <div className="w-1 h-3 bg-black rounded-full"></div>
                            <div className="w-1 h-3 bg-black rounded-full"></div>
                            <div className="w-1 h-3 bg-black rounded-full"></div>
                            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                          </div>
                          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L3 14.42l-.85-1.47zm2.83-2.83L6.83 9.3l1.06 1.06-1.06 1.06-.85-.85zm8.02.02l1.48.85-1.48.85-.85-1.48.85-1.22zm-4 0l.85 1.22-.85 1.48-1.48-.85 1.48-.85zm8 0l1.48.85-1.48.85-.85-1.48.85-1.22z" />
                          </svg>
                          <div className="w-6 h-3 border border-black rounded-sm">
                            <div className="w-4 h-1 bg-green-500 rounded-sm m-0.5"></div>
                          </div>
                        </div>
                      </div>

                      {/* CLREVO App Header */}
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                          </div>
                          <div>
                            <h1 className="text-white font-bold text-lg">CLREVO</h1>
                            <p className="text-blue-100 text-xs">Find Charging Stations</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          </button>
                          <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Search Bar */}
                      <div className="px-4 py-3 bg-gray-50 border-b">
                        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5S13.09 5 9.5 5 5 7.01 5 9.5 7.01 14 9.5 14c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                          </svg>
                          <input
                            type="text"
                            placeholder="Search for charging stations..."
                            className="flex-1 text-sm bg-transparent outline-none text-gray-700"
                          />
                        </div>
                      </div>

                      {/* Map Container */}
                      <div className="relative flex-1" style={{ height: "400px" }}>
                        <div ref={mapRef} className="w-full h-full" />

                        {/* Map Overlay Controls */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                            </svg>
                          </button>
                          <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </button>
                        </div>

                        {/* Bottom Sheet Preview */}
                        {selectedStation && (
                          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-4 transform transition-transform duration-300">
                            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-sm">{selectedStation.name}</h4>
                                <p className="text-xs text-gray-600 mt-1">{selectedStation.address}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                                    Available
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {selectedStation.distance?.toFixed(1)} mi
                                  </span>
                                </div>
                              </div>
                              <button className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7v2H3V4h3.5l1-1h5l1 1H17z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Loading Overlay */}
                        {loading && (
                          <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-blue-600 font-semibold text-sm">Finding stations...</p>
                          </div>
                        )}
                      </div>

                      {/* Bottom Navigation */}
                      <div className="bg-white border-t border-gray-200 px-6 py-3">
                        <div className="flex justify-around">
                          <button className="flex flex-col items-center gap-1">
                            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                            <span className="text-xs text-blue-600 font-medium">Map</span>
                          </button>
                          <button className="flex flex-col items-center gap-1">
                            <div className="w-6 h-6 bg-gray-200 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7v2H3V4h3.5l1-1h5l1 1H17z" />
                              </svg>
                            </div>
                            <span className="text-xs text-gray-500">Routes</span>
                          </button>
                          <button className="flex flex-col items-center gap-1">
                            <div className="w-6 h-6 bg-gray-200 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                            <span className="text-xs text-gray-500">Profile</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-2 border-blue-200 shadow-xl bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">Test CLREVO Live</h4>
                      <p className="text-sm text-gray-600">Experience our real-time EV network</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={getCurrentLocation}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 rounded-xl"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          Locating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                          </svg>
                          Use My Location
                        </div>
                      )}
                    </Button>

                    <div className="flex gap-3">
                      <Input
                        type="text"
                        placeholder="Enter ZIP code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleZipCodeSubmit()}
                        className="flex-1 border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3"
                      />
                      <Button
                        onClick={handleZipCodeSubmit}
                        disabled={loading || !zipCode.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl"
                      >
                        Search
                      </Button>
                    </div>
                  </div>

                  {locationError && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                      <p className="text-red-600 text-sm font-medium">{locationError}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Enhanced Station List with CLREVO styling */}
              {chargingStations.length > 0 && (
                <Card className="border-2 border-green-200 shadow-xl bg-gradient-to-br from-white to-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">
                          Live Network ({chargingStations.length} stations)
                        </h4>
                        <p className="text-sm text-gray-600">Real-time availability</p>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {chargingStations.slice(0, 10).map((station) => (
                        <div
                          key={station.id}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                            selectedStation?.id === station.id
                              ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg"
                              : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                          }`}
                          onClick={() => setSelectedStation(selectedStation?.id === station.id ? null : station)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <h5 className="font-bold text-gray-900 text-base">{station.name}</h5>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{station.address}</p>
                              {station.network && (
                                <p className="text-xs text-blue-600 font-medium mb-2">⚡ {station.network}</p>
                              )}
                              {station.connectorTypes.length > 0 && (
                                <div className="flex gap-1 flex-wrap">
                                  {station.connectorTypes.slice(0, 2).map((type, index) => (
                                    <Badge key={index} className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200">
                                      {type}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-right ml-4">
                              <Badge className="text-xs font-semibold bg-green-500 text-white mb-2">⚡ Available</Badge>
                              <p className="text-lg font-bold text-gray-900">{station.distance?.toFixed(1)}</p>
                              <p className="text-xs text-gray-500">miles</p>
                              {station.powerKW && (
                                <p className="text-xs text-purple-600 font-medium mt-1">{station.powerKW} kW</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
