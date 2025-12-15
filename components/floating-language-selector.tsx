"use client"

import { useEffect, useState } from "react"
import { useLanguage, type Language } from "./language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
]

export function FloatingLanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const currentLang = languages.find((l) => l.code === language)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (roughly 100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 animate-fade-in">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-burgundy-800/90 hover:bg-burgundy-700 backdrop-blur-sm border border-gold-500/50 text-gold-300 shadow-lg shadow-black/30 flex flex-col items-center gap-1 h-auto py-3 px-4">
            <Globe className="h-5 w-5" />
            <span className="text-lg">{currentLang?.flag}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="left" className="bg-burgundy-900 border-gold-600/30">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center gap-3 cursor-pointer hover:bg-burgundy-800 ${
                language === lang.code ? "bg-burgundy-800 text-gold-400" : "text-gold-200"
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
