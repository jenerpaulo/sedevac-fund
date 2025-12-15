"use client"

import { useState } from "react"
import { useLanguage } from "./language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonationCheckout } from "./donation-checkout"
import { DollarSign, TrendingUp } from "lucide-react"

const GOAL_USD = 4600
const RAISED_USD = 0

const MONTHLY_AMOUNTS = [25, 50, 100]
const ONE_TIME_AMOUNTS = [25, 50, 100, 250, 500]

export function FundingSection() {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50)
  const [customAmount, setCustomAmount] = useState("")
  const [currency, setCurrency] = useState<"usd" | "eur" | "brl">("usd")
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")
  const [showCheckout, setShowCheckout] = useState(false)

  const progressPercentage = Math.min((RAISED_USD / GOAL_USD) * 100, 100)

  const currencySymbols: Record<string, string> = {
    usd: "$",
    eur: "€",
    brl: "R$",
  }

  const getFinalAmount = () => {
    if (donationType === "monthly") {
      return selectedAmount || 0
    }
    if (customAmount) return Number.parseInt(customAmount)
    return selectedAmount || 0
  }

  const handleDonationTypeChange = (type: "one-time" | "monthly") => {
    setDonationType(type)
    setCustomAmount("")
    // Set default to 50 if current selection isn't valid for monthly
    if (type === "monthly" && selectedAmount && !MONTHLY_AMOUNTS.includes(selectedAmount)) {
      setSelectedAmount(50)
    }
  }

  const handleProceedToCheckout = () => {
    if (getFinalAmount() > 0) {
      setShowCheckout(true)
    }
  }

  return (
    <section id="funding" className="py-24 px-4 bg-[#3d0a1e]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-8 animate-fade-in-up text-balance">
          {t("fundingTitle")}
        </h2>
        <p className="text-lg text-center text-cream-100/90 max-w-3xl mx-auto mb-16 leading-relaxed animate-fade-in-up text-pretty">
          {t("fundingIntro")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Setup Costs Card and Progress Bar Card */}
          <div className="space-y-8 animate-fade-in-up">
            <Card className="bg-white/10 backdrop-blur-sm border-gold-600/30">
              <CardHeader>
                <CardTitle className="text-gold-400 flex items-center gap-3">
                  <DollarSign className="h-6 w-6" />
                  {t("setupCosts")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cream-100/80 mb-4">{t("setupCostsDesc")}</p>
                <p className="text-3xl font-bold text-gold-300">$4,600</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-gold-600/30">
              <CardHeader>
                <CardTitle className="text-gold-400 flex items-center gap-3">
                  <TrendingUp className="h-6 w-6" />
                  {t("progressTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-burgundy-900/50 rounded-full h-6 overflow-hidden border border-gold-600/30">
                  <div
                    className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between mt-3 text-cream-100/80">
                  <span>
                    {t("raised")}: ${RAISED_USD.toLocaleString()} USD
                  </span>
                  <span>
                    {t("goal")}: ${GOAL_USD.toLocaleString()} USD
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Donation Form */}
          <div className="animate-fade-in-up">
            {!showCheckout ? (
              <Card className="bg-white/10 backdrop-blur-sm border-gold-600/30">
                <CardContent className="pt-6">
                  <Tabs
                    value={donationType}
                    onValueChange={(v) => handleDonationTypeChange(v as "one-time" | "monthly")}
                  >
                    <TabsList className="grid w-full grid-cols-2 bg-burgundy-900/50 mb-8">
                      <TabsTrigger
                        value="one-time"
                        className="data-[state=active]:bg-gold-500 data-[state=active]:text-navy-950 data-[state=inactive]:text-white"
                      >
                        {t("oneTimeDonation")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="monthly"
                        className="data-[state=active]:bg-gold-500 data-[state=active]:text-navy-950 data-[state=inactive]:text-white"
                      >
                        {t("monthlyDonation")}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="one-time" className="space-y-6">
                      <DonationForm
                        amounts={ONE_TIME_AMOUNTS}
                        selectedAmount={selectedAmount}
                        setSelectedAmount={setSelectedAmount}
                        customAmount={customAmount}
                        setCustomAmount={setCustomAmount}
                        currency={currency}
                        setCurrency={setCurrency}
                        currencySymbols={currencySymbols}
                        t={t}
                        onProceed={handleProceedToCheckout}
                        getFinalAmount={getFinalAmount}
                        showCustomAmount={true}
                      />
                    </TabsContent>

                    <TabsContent value="monthly" className="space-y-6">
                      <DonationForm
                        amounts={MONTHLY_AMOUNTS}
                        selectedAmount={selectedAmount}
                        setSelectedAmount={setSelectedAmount}
                        customAmount={customAmount}
                        setCustomAmount={setCustomAmount}
                        currency={currency}
                        setCurrency={setCurrency}
                        currencySymbols={currencySymbols}
                        t={t}
                        onProceed={handleProceedToCheckout}
                        getFinalAmount={getFinalAmount}
                        isMonthly
                        showCustomAmount={false}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <div>
                <Button
                  variant="ghost"
                  onClick={() => setShowCheckout(false)}
                  className="mb-4 text-white hover:text-cream-100 hover:bg-burgundy-800/50"
                >
                  {t("backToOptions")}
                </Button>
                <DonationCheckout
                  amount={getFinalAmount()}
                  currency={currency}
                  isMonthly={donationType === "monthly"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

interface DonationFormProps {
  amounts: number[]
  selectedAmount: number | null
  setSelectedAmount: (amount: number | null) => void
  customAmount: string
  setCustomAmount: (amount: string) => void
  currency: "usd" | "eur" | "brl"
  setCurrency: (currency: "usd" | "eur" | "brl") => void
  currencySymbols: Record<string, string>
  t: (key: string) => string
  onProceed: () => void
  getFinalAmount: () => number
  isMonthly?: boolean
  showCustomAmount?: boolean // New prop to control custom amount visibility
}

function DonationForm({
  amounts,
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  currency,
  setCurrency,
  currencySymbols,
  t,
  onProceed,
  getFinalAmount,
  isMonthly,
  showCustomAmount = true, // Default to true for backwards compatibility
}: DonationFormProps) {
  return (
    <>
      {/* Currency Selector */}
      <div>
        <label className="block text-sm text-gold-300 mb-2">{t("currency")}</label>
        <div className="flex gap-2">
          {(["usd", "eur", "brl"] as const).map((curr) => (
            <Button
              key={curr}
              variant={currency === curr ? "default" : "outline"}
              onClick={() => setCurrency(curr)}
              className={
                currency === curr
                  ? "bg-gold-500 text-navy-950 hover:bg-gold-400"
                  : "border-gold-600/50 bg-white text-navy-950 hover:bg-cream-100"
              }
            >
              {curr.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Amount Selection */}
      <div>
        <label className="block text-sm text-gold-300 mb-2">{t("selectAmount")}</label>
        <div className={`grid ${amounts.length === 3 ? "grid-cols-3" : "grid-cols-5"} gap-2`}>
          {amounts.map((amount) => (
            <Button
              key={amount}
              variant={selectedAmount === amount && !customAmount ? "default" : "outline"}
              onClick={() => {
                setSelectedAmount(amount)
                setCustomAmount("")
              }}
              className={
                selectedAmount === amount && !customAmount
                  ? "bg-gold-500 text-navy-950 hover:bg-gold-400"
                  : "border-gold-600/50 bg-white text-navy-950 hover:bg-cream-100"
              }
            >
              {currencySymbols[currency]}
              {amount}
            </Button>
          ))}
        </div>
      </div>

      {showCustomAmount && (
        <div>
          <label className="block text-sm text-gold-300 mb-2">{t("customAmount")}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400">{currencySymbols[currency]}</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(null)
              }}
              placeholder="0"
              className="w-full pl-10 pr-4 py-3 bg-burgundy-900/50 border border-gold-600/30 rounded-md text-white placeholder-cream-100/50 focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>
      )}

      {/* Proceed Button */}
      <Button
        onClick={onProceed}
        disabled={getFinalAmount() <= 0}
        className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t("proceedToCheckout")} - {currencySymbols[currency]}
        {getFinalAmount()}
        {isMonthly ? "/mo" : ""}
      </Button>
    </>
  )
}
