"use client"

import { useLanguage, type Language } from "./language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
]

export function LanguageSelector({ variant = "default" as "default" | "footer" }: { variant?: "default" | "footer" }) {
  const { language, setLanguage } = useLanguage()
  const currentLang = languages.find((l) => l.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant === "footer" ? "ghost" : "outline"}
          className={
            variant === "footer"
              ? "text-gold-300 hover:text-gold-200 hover:bg-burgundy-800 border-gold-600/30"
              : "bg-background/10 backdrop-blur-sm border-burgundy-700/50 text-burgundy-900 hover:text-burgundy-950 hover:bg-background/20 gap-2"
          }
        >
          <span className="text-xl">{currentLang?.flag}</span>
          <span className="font-medium">{currentLang?.name}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-burgundy-900 border-gold-600/30">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-3 cursor-pointer hover:bg-burgundy-800 ${
              language === lang.code ? "bg-burgundy-800 text-gold-400" : "text-cream-100"
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
