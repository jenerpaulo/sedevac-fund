import { HeroSection } from "@/components/hero-section"
import { DigitalStructureSection } from "@/components/digital-structure-section"
import { FundingSection } from "@/components/funding-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/components/language-context"
import { FloatingLanguageSelector } from "@/components/floating-language-selector"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background">
        <HeroSection />
        <DigitalStructureSection />
        <FundingSection />
        <FaqSection />
        <Footer />
        <FloatingLanguageSelector />
      </main>
    </LanguageProvider>
  )
}
