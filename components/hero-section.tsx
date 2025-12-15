"use client"

import { useLanguage } from "./language-context"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { LanguageSelector } from "./language-selector"

export function HeroSection() {
  const { t } = useLanguage()

  const scrollToFunding = () => {
    document.getElementById("funding")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/churchbg.webp')`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-burgundy-950/90" />

      <div className="absolute top-6 right-6 z-20 animate-fade-in">
        <LanguageSelector />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-4 max-w-4xl mx-auto animate-fade-in-up flex flex-col items-center">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-[0.15em] text-gold-400 mb-6 text-balance">
          SEDEVACANTE
        </h1>

        <p className="text-xl md:text-3xl lg:text-4xl text-gold-200/90 mb-12 font-light tracking-wide max-w-3xl text-pretty">
          {t("tagline")}
        </p>

        <Button
          onClick={scrollToFunding}
          size="lg"
          className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300 hover:scale-105 shadow-lg shadow-gold-500/30"
        >
          {t("donateNow")}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-gold-400/60" />
      </div>
    </section>
  )
}
