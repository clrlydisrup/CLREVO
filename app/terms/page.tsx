import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 py-8 border-b">
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="text-2xl font-heading font-bold text-primary">CLREVO</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-16">
        <div className="container mx-auto max-w-4xl space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-foreground leading-relaxed">
                By using CLREVO, you agree to use the service responsibly and at your own risk. We provide real-time
                mobility data from multiple providers; availability and accuracy may vary.
              </p>
              <p className="text-xl text-foreground leading-relaxed">
                CLREVO is not the operator of any vehicles or charging stations. Users must follow local laws, respect
                traffic safety, and comply with third-party provider rules.
              </p>
              <p className="text-xl text-foreground leading-relaxed">
                CLRTHRU Technologies reserves the right to update these terms as the service evolves.
              </p>
            </div>
          </div>

          <div className="pt-8">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 font-heading font-semibold">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
