"use client"

import { useLanguage } from "./language-context"
import { LanguageSelector } from "./language-selector"
import { Globe, Play } from "lucide-react"
import { useRef, useState } from "react"

export function HeroSection() {
  const { language, t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const getVideoSource = () => {
    switch (language) {
      case "pt":
        return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/videobishop-OnLmzlvoCCYIxeax3SVli4NNc9aUMr.mp4"
      case "fr":
        return "/videos/bispo-fr.mp4"
      case "en":
      case "es": // Spanish uses English version
      default:
        return "/videos/bispo-eng.mp4"
    }
  }

  const videoSrc = getVideoSource()

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {
          // Silently catch abort errors from play/pause conflicts
        })
      } else {
        videoRef.current.pause()
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-4 md:px-6 bg-gradient-to-b from-stone-100 to-stone-100">
      {/* Background watermark - subtle globe pattern at very low opacity */}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Language selector */}
        <div className="absolute -top-20 right-6 z-20">
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

              <div className="relative group cursor-pointer" onClick={handlePlayClick}>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                {!isPlaying && (
                  <div className="absolute bottom-4 right-4 z-10 group-hover:scale-110 transition-transform rounded-full pointer-events-none">
                    <div className="bg-white/70 hover:bg-white p-2 rounded-full">
                      <Play className="w-5 h-5 text-burgundy-950 fill-burgundy-950" />
                    </div>
                  </div>
                )}
                <video
                  ref={videoRef}
                  className="relative aspect-video rounded-3xl shadow-2xl overflow-hidden w-full cursor-pointer"
                  controls
                  controlsList="nodownload"
                  poster="/images/video-poster.jpg"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
