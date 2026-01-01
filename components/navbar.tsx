"use client"

import { useLanguage } from "@/components/language-context"
import { useState } from "react"

export function Navbar() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const translations: Record<string, Record<string, string>> = {
    en: {
      home: "Home",
      mission: "Our Mission",
      support: "Support Us",
      structure: "Our Structure",
      faq: "FAQ",
    },
    pt: {
      home: "Início",
      mission: "Nossa Missão",
      support: "Nos Apoie",
      structure: "Nossa Estrutura",
      faq: "FAQ",
    },
    es: {
      home: "Inicio",
      mission: "Nuestra Misión",
      support: "Apóyanos",
      structure: "Nuestra Estructura",
      faq: "Preguntas Frecuentes",
    },
    fr: {
      home: "Accueil",
      mission: "Notre Mission",
      support: "Nous Soutenir",
      structure: "Notre Structure",
      faq: "FAQ",
    },
  }

  const t = (key: string) => translations[language]?.[key] || translations.en[key]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-burgundy-950 border-b border-burgundy-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home Link */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-cream-100 font-bold text-xl hover:text-gold-300 transition-colors"
          >
            SEDEVACANTE
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-cream-100 hover:text-gold-300 transition-colors text-sm font-medium"
            >
              {t("home")}
            </button>
            <button
              onClick={() => scrollToSection("funding")}
              className="text-cream-100 hover:text-gold-300 transition-colors text-sm font-medium"
            >
              {t("support")}
            </button>
            <button
              onClick={() => scrollToSection("structure")}
              className="text-cream-100 hover:text-gold-300 transition-colors text-sm font-medium"
            >
              {t("structure")}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-cream-100 hover:text-gold-300 transition-colors text-sm font-medium"
            >
              {t("faq")}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cream-100 hover:text-gold-300 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-burgundy-900/30 py-4 space-y-3">
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left text-cream-100 hover:text-gold-300 transition-colors text-sm font-medium px-2 py-2"
            >
              {t("home")}
            </button>
            <button
              onClick={() => scrollToSection("funding")}
              className="block w-full text-left text-cream-100 hover:text-gold-300 transition-colors text-sm font-medium px-2 py-2"
            >
              {t("support")}
            </button>
            <button
              onClick={() => scrollToSection("structure")}
              className="block w-full text-left text-cream-100 hover:text-gold-300 transition-colors text-sm font-medium px-2 py-2"
            >
              {t("structure")}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="block w-full text-left text-cream-100 hover:text-gold-300 transition-colors text-sm font-medium px-2 py-2"
            >
              {t("faq")}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
