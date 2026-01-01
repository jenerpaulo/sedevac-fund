"use client"

import { useLanguage } from "./language-context"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  const { t } = useLanguage()

  const handleScrollToFunding = () => {
    const fundingSection = document.getElementById("funding")
    if (fundingSection) {
      fundingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-2xl mx-auto text-center">
        <Button
          onClick={handleScrollToFunding}
          className="bg-burgundy-800 hover:bg-burgundy-900 text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
        >
          {t("donateForPhase1")}
        </Button>
      </div>
    </section>
  )
}
