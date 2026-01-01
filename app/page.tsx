import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { DigitalStructureSection } from "@/components/digital-structure-section"
import { FundingSection } from "@/components/funding-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/components/language-context"
import { FloatingLanguageSelector } from "@/components/floating-language-selector"
import { CtaSection } from "@/components/cta-section"

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="funding">
          <FundingSection />
        </div>
        <div id="structure">
          <DigitalStructureSection />
        </div>
        <div id="faq">
          <FaqSection />
        </div>
        <CtaSection />
        <Footer />
        <FloatingLanguageSelector />
      </main>
    </LanguageProvider>
  )
}
