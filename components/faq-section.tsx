"use client"

import { useLanguage } from "./language-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

export function FaqSection() {
  const { t } = useLanguage()

  const faqs = [
    {
      question: t("faq1Question"),
      answer: t("faq1Answer"),
    },
    {
      question: t("faq2Question"),
      answer: t("faq2Answer"),
    },
    {
      question: t("faq3Question"),
      answer: t("faq3Answer"),
    },
  ]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-stone-300 to-stone-400">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-burgundy-800 mb-12 animate-fade-in-up text-balance">
          {t("faqTitle")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bishops Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up">
            <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-stone-800/30 border-4 border-white">
              <Image
                src="/images/dom-20rodrigo-20silva.jpg"
                alt="Dom Rodrigo da Silva"
                width={400}
                height={500}
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="animate-fade-in-up">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-burgundy-600/20 rounded-lg px-6 data-[state=open]:border-burgundy-600/40 data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="text-burgundy-800 hover:text-burgundy-600 text-left py-6 hover:no-underline font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-700 pb-6 whitespace-pre-line leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
