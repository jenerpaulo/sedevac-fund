"use client"

import { useLanguage } from "./language-context"
import { Globe, ShoppingCart, MessageSquare, Share2 } from "lucide-react"

export function DigitalStructureSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Globe,
      title: t("websiteTitle"),
      descriptions: [t("websiteDesc1"), t("websiteDesc2"), t("websiteDesc3")],
    },
    {
      icon: ShoppingCart,
      title: t("storeTitle"),
      descriptions: [t("storeDesc1"), t("storeDesc2"), t("storeDesc3")],
    },
    {
      icon: MessageSquare,
      title: t("aiChatTitle"),
      descriptions: [t("aiChatDesc1"), t("aiChatDesc2"), t("aiChatDesc3")],
    },
    {
      icon: Share2,
      title: t("socialTitle"),
      descriptions: [t("socialDesc1"), t("socialDesc2")],
    },
  ]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-cream-100 to-cream-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-burgundy-800 mb-8 animate-fade-in-up text-balance">
          {t("digitalStructureTitle")}
        </h2>
        <p className="text-lg text-center text-stone-700 max-w-3xl mx-auto mb-16 leading-relaxed animate-fade-in-up text-pretty">
          {t("digitalStructureIntro")}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white border border-burgundy-600/20 rounded-lg p-8 hover:border-burgundy-600/40 hover:shadow-lg hover:shadow-burgundy-900/10 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-burgundy-700 rounded-lg">
                  <feature.icon className="h-8 w-8 text-gold-300" />
                </div>
                <h3 className="text-xl font-semibold text-burgundy-800">{feature.title}</h3>
              </div>
              <ul className="space-y-3">
                {feature.descriptions.map((desc, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-700">
                    <span className="text-burgundy-600 mt-1">•</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
