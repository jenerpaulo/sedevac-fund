"use client"

import { useLanguage } from "./language-context"
import { LanguageSelector } from "./language-selector"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 px-4 bg-burgundy-900 border-t border-burgundy-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <LanguageSelector variant="footer" />
        </div>
        <p className="text-cream-200/80 text-sm">{t("copyright")}</p>
      </div>
    </footer>
  )
}
