import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import SmartCityTime from "@/components/smart-city-time"
import Link from "next/link"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="relative w-full">
            <Image
              src="/images/clrevo-hero-new.png"
              alt="CLREVO - Move Smarter. The smart mobility platform designed for you."
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />

            {/* CTA Button Overlay */}
            <div className="absolute bottom-12 left-8 md:left-16 lg:left-24">
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-12 py-6 text-xl font-heading font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-cyan-500/50"
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
          </div>
        </div>
      </section>

      <div className="bg-black border-b border-gray-800 py-6">
        <div className="container mx-auto max-w-7xl px-4 flex justify-end">
          <Suspense fallback={<div className="text-white text-sm">Loading...</div>}>
            <SmartCityTime />
          </Suspense>
        </div>
      </div>

      {/* One Grid Section */}
      <section className="px-4 py-24 bg-black border-t border-gray-800">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white">
            One Grid. All Modes. <span className="text-cyan-400">Always Synced.</span>
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl text-gray-400 leading-relaxed">
              E-bikes, scooters, EV chargers, rapid transit — dynamically mapped in real time.
            </p>
          </div>
        </div>
      </section>

      {/* How CLREVO Works Section */}
      <section className="px-4 py-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h3 className="text-4xl md:text-6xl font-heading font-bold text-white">
              How <span className="text-cyan-400">CLREVO</span> Works
            </h3>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              One app. Every mode. Real-time updates. Your city, simplified.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-heading font-bold text-white">All Modes, One View</h4>
                <p className="text-lg text-gray-400 leading-relaxed">
                  E-bikes, scooters, EV chargers, transit, car shares. Stop juggling apps—see everything at once.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-heading font-bold text-white">Real-Time Everything</h4>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Live availability, battery levels, wait times, and charger status. No guessing, no surprises.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-heading font-bold text-white">Smart Routes</h4>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Mix and match modes for the fastest, cheapest, or greenest route. CLREVO optimizes for you.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-heading font-bold text-white">Compare Costs Instantly</h4>
                <p className="text-lg text-gray-400 leading-relaxed">
                  See prices side-by-side. Choose what fits your budget and schedule—you're in control.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-heading font-bold text-white">Track Your Impact</h4>
                <p className="text-lg text-gray-400 leading-relaxed">
                  See your carbon savings and cost reductions. Every trip counts toward a cleaner city.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-heading font-bold text-white">Works Offline</h4>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Subway tunnels? No problem. Your routes stay cached and ready, even without signal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Your Impact Section */}
      <section className="px-4 py-24 bg-black border-t border-gray-800">
        <div className="container mx-auto max-w-5xl text-center space-y-12">
          <h3 className="text-4xl md:text-6xl font-heading font-bold text-white">
            Your <span className="text-cyan-400">Impact</span>
          </h3>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-2xl text-gray-400 leading-relaxed">
              Every trip with CLREVO makes a difference. Track your carbon savings, cost reductions, and time saved in
              real-time.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="space-y-2 p-6 rounded-xl border border-gray-800 bg-gray-900/30 hover:border-cyan-500/50 transition-all duration-300">
                <div className="text-5xl font-bold text-cyan-400">12.5</div>
                <div className="text-lg text-gray-400">lbs CO₂ saved per trip</div>
              </div>
              <div className="space-y-2 p-6 rounded-xl border border-gray-800 bg-gray-900/30 hover:border-cyan-500/50 transition-all duration-300">
                <div className="text-5xl font-bold text-cyan-400">$8</div>
                <div className="text-lg text-gray-400">avg. cost savings</div>
              </div>
              <div className="space-y-2 p-6 rounded-xl border border-gray-800 bg-gray-900/30 hover:border-cyan-500/50 transition-all duration-300">
                <div className="text-5xl font-bold text-cyan-400">15</div>
                <div className="text-lg text-gray-400">min faster commute</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon to Your City Section */}
      <section className="px-4 py-24 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
        </div>

        <div className="container mx-auto max-w-5xl text-center space-y-16 relative z-10">
          {/* Launch Cities */}
          <div className="space-y-12">
            <h3 className="text-4xl md:text-6xl font-heading font-bold text-white">
              Coming Soon to Your <span className="text-cyan-400">City</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-10 text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-heading font-bold text-white">NYC Metro</h4>
                  <p className="text-lg text-gray-400">New York, Jersey City, Newark</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-10 text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-heading font-bold text-white">Bay Area</h4>
                  <p className="text-lg text-gray-400">Oakland & West Oakland</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-10 pt-8">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl font-heading font-bold leading-tight text-white">
                Join the Waitlist
              </h3>
              <p className="text-2xl font-heading font-semibold text-cyan-400">Compile your grid.</p>
            </div>

            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-16 py-6 text-xl font-heading font-bold rounded-full transition-all duration-300 hover:scale-110 shadow-2xl shadow-cyan-500/50"
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
        </div>
      </section>

      {/* Footer Section */}
      <footer className="px-4 py-16 bg-black border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-4 md:gap-12">
            {/* Left Column - Logo and Tagline */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 md:w-5 md:h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="text-sm md:text-xl font-heading font-bold text-white">CLREVO</span>
              </div>
              <p className="text-xs md:text-base text-gray-400 font-medium">One grid. All modes. Always on.</p>
            </div>

            {/* Center Column - Navigation Links */}
            <div className="space-y-2 md:space-y-4">
              <nav className="space-y-1 md:space-y-3">
                <Link
                  href="/about"
                  className="block text-xs md:text-base text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  • About
                </Link>
                <Link
                  href="/terms"
                  className="block text-xs md:text-base text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  • Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="block text-xs md:text-base text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  • Privacy Policy
                </Link>
                <Link
                  href="/mobility-stack"
                  className="block text-xs md:text-base text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  • Mobility Stack
                </Link>
                <Link
                  href="/contact"
                  className="block text-xs md:text-base text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  • Contact
                </Link>
              </nav>
            </div>

            {/* Right Column - Legal/Brand Hierarchy */}
            <div className="space-y-2 md:space-y-4">
              <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                <p className="text-gray-400">© 2025 CLREVO — A Division of CLRTHRU Technologies, Inc.</p>
                <p className="text-gray-500">CLREVO is part of the CLRTHRU Mobility Stack.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
