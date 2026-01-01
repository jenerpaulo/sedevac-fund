"use client"

import { useLanguage } from "./language-context"
import { LanguageSelector } from "./language-selector"
import { Globe } from "lucide-react"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-4 md:px-6 bg-gradient-to-b from-stone-100 to-stone-100">
      {/* Background watermark - subtle globe pattern at very low opacity */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96">
          <svg viewBox="0 0 100 100" className="w-full h-full text-stone-700">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <path d="M 30 50 Q 50 30, 70 50" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <path d="M 30 50 Q 50 70, 70 50" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.3" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Language selector */}
        <div className="absolute top-6 right-6 z-20">
          <LanguageSelector />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column - Video Placeholder */}
          <div className="flex justify-center md:justify-start">
            <div className="flex flex-col w-full max-w-2xl">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                <div className="hidden md:block w-8 border-t border-stone-400"></div>
                <p className="text-sm md:text-base font-medium text-stone-600 tracking-wide whitespace-nowrap">
                  {t("domRodrigoTagline")}
                </p>
                <div className="hidden md:block flex-1 border-t border-stone-400"></div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative aspect-video bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                  {/* Subtle globe watermark inside video container */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.8" />
                      <path
                        d="M 50 10 Q 70 30, 80 50 Q 70 70, 50 90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.6"
                      />
                      <path
                        d="M 50 10 Q 30 30, 20 50 Q 30 70, 50 90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.6"
                      />
                      <circle cx="50" cy="50" r="3" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow relative z-10">
                    <svg className="w-10 h-10 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-0 animate-fade-in-up relative">
            <div className="absolute -left-6 md:-left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-burgundy-700 via-burgundy-600 to-transparent"></div>

            <div className="pl-0 md:pl-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-navy-950 mb-4 leading-tight">
                SEDEVACANTE
              </h1>

              <p className="text-2xl md:text-3xl font-semibold text-burgundy-700 mb-8 leading-relaxed">
                {t("heroTagline")}
              </p>

              <p className="text-lg md:text-xl text-stone-700 leading-relaxed max-w-lg tracking-wide">
                {t("heroDescription")}
              </p>

              <div className="mt-12 flex items-center gap-3 opacity-40">
                <div className="w-1 h-1 bg-stone-500 rounded-full"></div>
                <Globe className="w-5 h-5 text-stone-600 stroke-1" />
                <div className="w-1 h-1 bg-stone-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
