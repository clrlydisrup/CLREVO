import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import SmartCityTime from "@/components/smart-city-time"
import InteractiveEVMap from "@/components/interactive-ev-map"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute top-8 right-8 z-30">
          <SmartCityTime />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-20 left-10 w-64 h-64 opacity-10" viewBox="0 0 200 200">
            <path
              d="M20 50 Q100 20 180 50 T340 100 Q260 140 180 110 T20 50"
              stroke="#007BFF"
              strokeWidth="2"
              fill="none"
              className="route-animation"
            />
          </svg>
          <svg className="absolute bottom-20 right-10 w-48 h-48 opacity-10" viewBox="0 0 200 200">
            <path
              d="M20 100 Q60 60 100 100 T180 100 Q140 140 100 100 T20 100"
              stroke="#A8E05F"
              strokeWidth="2"
              fill="none"
              className="route-animation"
              style={{ animationDelay: "1s" }}
            />
          </svg>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-heading font-bold text-primary">CLREVO</h1>
                </div>

                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-tight">
                    The Micromobility
                    <br />
                    <span className="text-primary">& EV App</span>
                  </h2>
                  <div className="space-y-2">
                    <p className="text-xl font-heading font-semibold text-primary uppercase tracking-wide">
                      LAUNCHING 9.15 IN OAKLAND, WEST OAKLAND
                    </p>
                    <p className="text-xl font-heading font-semibold text-primary uppercase tracking-wide">
                      & NYC METRO
                    </p>
                  </div>
                </div>

                <p className="text-2xl text-foreground font-medium max-w-lg leading-relaxed">
                  Your city, simplified. Your movement, optimized.
                </p>
              </div>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-xl font-heading font-semibold rounded-full transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link
                  href="https://form.maildroppa.com/?id=c6089241-bfbf-450d-ac64-416d02409579"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Waitlist
                </Link>
              </Button>
            </div>

            <div className="relative flex justify-center">
              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src="/images/clrevo-hero-mockup.png"
                    alt="CLREVO app interface showing route optimization with 340 Wilson Ave destination"
                    width={500}
                    height={600}
                    className="w-full max-w-lg h-auto drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Animated route overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 400 600">
                  <path
                    d="M80 180 Q200 120 320 180 Q380 220 320 280 Q200 340 80 280 Q20 220 80 180"
                    stroke="#007BFF"
                    strokeWidth="4"
                    fill="none"
                    className="route-animation opacity-80"
                  />
                  <path
                    d="M120 400 Q250 350 380 400 Q320 450 250 420 Q180 450 120 400"
                    stroke="#A8E05F"
                    strokeWidth="3"
                    fill="none"
                    className="route-animation opacity-60"
                    style={{ animationDelay: "2s" }}
                  />
                </svg>

                {/* Floating city dots */}
                <div className="absolute top-20 right-10 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                <div
                  className="absolute bottom-32 left-8 w-3 h-3 bg-primary rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-40 left-16 w-2 h-2 bg-warning rounded-full animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive EV Map Section */}
      <InteractiveEVMap />

      {/* One Grid Section */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900">
            One Grid. All Modes. Always Synced.
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl text-gray-700 leading-relaxed">
              E-bikes, scooters, EV chargers, rapid transit — dynamically mapped in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Assemble Your Mobility Stack Section */}
      <section className="px-4 py-20 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900">Assemble Your Mobility Stack</h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Every traveler has a pattern. CLREVO lets you architect it:
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-heading font-bold text-gray-900">Modular Routing</h4>
                <p className="text-base text-gray-700 leading-relaxed">
                  Chain scooters, EVs, and transit nodes in one continuous flow.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-heading font-bold text-gray-900">Proximity Engine</h4>
                <p className="text-base text-gray-700 leading-relaxed">Zero-click detection of what's available now.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-heading font-bold text-gray-900">Predictive Trip Logic</h4>
                <p className="text-base text-gray-700 leading-relaxed">
                  Pre-computed best paths, adaptive to load, cost, or energy levels.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-heading font-bold text-gray-900">Offline Cache Layer</h4>
                <p className="text-base text-gray-700 leading-relaxed">
                  Localized map data persists even in subways, civic corridors, or network dead zones.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Electric First by Design Section */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900">Electric First by Design</h3>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="text-center space-y-4">
              <Badge className="bg-green-600 text-white border-green-600 px-6 py-2 text-lg font-heading font-semibold">
                Battery-Aware Routing
              </Badge>
              <p className="text-lg text-gray-700">EVs and e-bikes are mapped with charge intelligence.</p>
            </div>

            <div className="text-center space-y-4">
              <Badge className="bg-blue-600 text-white border-blue-600 px-6 py-2 text-lg font-heading font-semibold">
                Reliability Indexing
              </Badge>
              <p className="text-lg text-gray-700">AI-scored uptime ensures you connect only to stable assets.</p>
            </div>

            <div className="text-center space-y-4">
              <Badge className="bg-orange-600 text-white border-orange-600 px-6 py-2 text-lg font-heading font-semibold">
                Emission Delta Tracking
              </Badge>
              <p className="text-lg text-gray-700">
                Quantify your carbon offset with every ride — in real metrics, not marketing fluff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Predictive, Not Passive Section */}
      <section className="px-4 py-20 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900">Predictive, Not Passive</h3>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto glow-effect">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-heading font-bold text-gray-900">Capacity Forecasting</h4>
              <p className="text-lg text-gray-700">Charger and dock saturation modeled in advance.</p>
            </div>

            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-2xl font-heading font-bold text-gray-900">Smart Context Switching</h4>
              <p className="text-lg text-gray-700">
                Fastest, safest, or lowest-cost paths, auto-selected or user-forced.
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-heading font-bold text-gray-900">Safety Mesh Alerts</h4>
              <p className="text-lg text-gray-700">
                Ambient signals for hazards, no-go zones, or high-velocity corridors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent, Comparable, Quantified Section */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900">
            Transparent, Comparable, Quantified
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl font-heading font-semibold text-primary">
              Benchmark every trip against private cars, ride-shares, or taxis. See actual time, cost, and emissions
              saved — instantly.
            </p>
          </div>
        </div>
      </section>

      {/* First Smart City Deployments Section */}
      <section className="px-4 py-20 bg-white">
        <div className="container mx-auto max-w-5xl text-center space-y-12">
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900">First Smart City Deployments</h3>
          <p className="text-xl text-gray-700">We're live 9.15 in:</p>

          <div className="space-y-8">
            <Card className="border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 max-w-md mx-auto bg-white">
              <CardContent className="p-8 text-center space-y-3">
                <h4 className="text-2xl font-heading font-bold text-gray-900">New York City Metro</h4>
                <p className="text-lg text-gray-700">(NYC, Jersey City, Newark, NJ)</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 max-w-md mx-auto bg-white">
              <CardContent className="p-8 text-center space-y-3">
                <h4 className="text-2xl font-heading font-bold text-gray-900">Oakland & West Oakland</h4>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute top-10 left-20 w-32 h-32 opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" className="animate-pulse" />
          </svg>
          <svg className="absolute bottom-10 right-20 w-24 h-24 opacity-20" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="30"
              stroke="white"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </svg>
        </div>

        <div className="container mx-auto max-w-5xl text-center space-y-10 relative z-10">
          <div className="space-y-6">
            <h3 className="text-4xl md:text-6xl font-heading font-bold leading-tight text-white">Join the Waitlist</h3>
            <p className="text-2xl font-heading font-semibold text-white">Compile your grid.</p>
          </div>

          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 text-primary px-16 py-6 text-xl font-heading font-bold rounded-full transition-all duration-300 hover:scale-110 glow-effect"
            asChild
          >
            <Link
              href="https://form.maildroppa.com/?id=c6089241-bfbf-450d-ac64-416d02409579"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Waitlist →
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="px-4 py-16 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-4 md:gap-12">
            {/* Left Column - Logo and Tagline */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="text-sm md:text-xl font-heading font-bold text-white">CLREVO</span>
              </div>
              <p className="text-xs md:text-base text-gray-300 font-medium">One grid. All modes. Always on.</p>
            </div>

            {/* Center Column - Navigation Links */}
            <div className="space-y-2 md:space-y-4">
              <nav className="space-y-1 md:space-y-3">
                <Link
                  href="/about"
                  className="block text-xs md:text-base text-gray-300 hover:text-white transition-colors duration-200"
                >
                  • About
                </Link>
                <Link
                  href="/terms"
                  className="block text-xs md:text-base text-gray-300 hover:text-white transition-colors duration-200"
                >
                  • Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="block text-xs md:text-base text-gray-300 hover:text-white transition-colors duration-200"
                >
                  • Privacy Policy
                </Link>
                <Link
                  href="/mobility-stack"
                  className="block text-xs md:text-base text-gray-300 hover:text-white transition-colors duration-200"
                >
                  • Mobility Stack
                </Link>
                <Link
                  href="/contact"
                  className="block text-xs md:text-base text-gray-300 hover:text-white transition-colors duration-200"
                >
                  • Contact
                </Link>
              </nav>
            </div>

            {/* Right Column - Legal/Brand Hierarchy */}
            <div className="space-y-2 md:space-y-4">
              <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                <p className="text-gray-300">© 2025 CLREVO — A Division of CLRTHRU Technologies, Inc.</p>
                <p className="text-gray-400">CLREVO is part of the CLRTHRU Mobility Stack.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
