"use client"

import { useLanguage } from "./language-context"
import { LanguageSelector } from "./language-selector"
import { Globe, Play } from "lucide-react"
import { useRef, useState } from "react"

export function HeroSection() {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Replace video URLs here when you have videos for other languages
  const videoMap: Record<string, string> = {
    en: "/videos/videoenglish.mp4", // English video
    pt: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/videobishop-OnLmzlvoCCYIxeax3SVli4NNc9aUMr.mp4",
    es: "/videos/videospanish.mp4", // Spanish video
    fr: "/videos/videofrench.mp4", // French video
  }

  const currentLanguage = useLanguage().language
  const videoSrc = videoMap[currentLanguage] || videoMap.pt

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

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
                  <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:bg-black/20 transition-colors rounded-3xl pointer-events-auto">
                    <Play className="w-16 h-16 text-white fill-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="relative aspect-video rounded-3xl shadow-2xl overflow-hidden w-full"
                  controls
                  controlsList="nodownload"
                  poster="/images/video-poster.jpg"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
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
