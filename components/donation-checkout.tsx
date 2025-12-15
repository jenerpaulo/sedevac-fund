"use client"

import { useState, useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startDonationCheckout } from "@/app/actions/stripe"
import { createOpenPixCharge } from "@/app/actions/openpix"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CreditCard, QrCode, Loader2 } from "lucide-react"
import { OpenPixPayment } from "./openpix-payment"
import { useLanguage } from "./language-context"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface DonationCheckoutProps {
  amount: number
  currency: "usd" | "eur" | "brl"
  isMonthly: boolean
}

export function DonationCheckout({ amount, currency, isMonthly }: DonationCheckoutProps) {
  const { t } = useLanguage()
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | null>(currency === "brl" ? null : "card")
  const [pixData, setPixData] = useState<{
    transactionID: string
    correlationID: string
    qrCodeImage: string
    brCode: string
    paymentLinkUrl: string
  } | null>(null)
  const [loadingPix, setLoadingPix] = useState(false)
  const [pixError, setPixError] = useState<string | null>(null)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const fetchClientSecret = useCallback(() => {
    return startDonationCheckout(amount, currency, isMonthly)
  }, [amount, currency, isMonthly])

  const handlePixPayment = async () => {
    setLoadingPix(true)
    setPixError(null)
    try {
      const result = await createOpenPixCharge(
        amount,
        isMonthly ? "Doação Mensal - CatholicVacante" : "Doação Única - CatholicVacante",
      )
      if (result.error) {
        setPixError(result.error)
      } else if (result.data) {
        setPixData(result.data)
        setPaymentMethod("pix")
      }
    } catch (error) {
      setPixError("Falha ao criar cobrança PIX. Por favor, tente novamente.")
    } finally {
      setLoadingPix(false)
    }
  }

  const handlePaymentComplete = () => {
    setPaymentComplete(true)
  }

  // Show payment complete message
  if (paymentComplete) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6 text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">{t("paymentConfirmed")}</h3>
          <p className="text-green-700">{t("thankYouDonation")}</p>
        </CardContent>
      </Card>
    )
  }

  // For BRL currency, show payment method selection first
  if (currency === "brl" && paymentMethod === null) {
    return (
      <Card className="bg-white border-gold-600/30">
        <CardHeader>
          <CardTitle className="text-navy-950">{t("choosePaymentMethod")}</CardTitle>
          <CardDescription className="text-navy-800">
            {t("selectPaymentMethod")} R${amount}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => setPaymentMethod("card")}
            className="w-full h-16 bg-navy-900 hover:bg-navy-800 text-white flex items-center justify-center gap-3"
          >
            <CreditCard className="h-6 w-6" />
            <span className="text-lg">{t("creditCard")}</span>
          </Button>

          <Button
            onClick={handlePixPayment}
            disabled={loadingPix}
            className="w-full h-16 bg-[#32BCAD] hover:bg-[#2aa89b] text-white flex items-center justify-center gap-3"
          >
            {loadingPix ? <Loader2 className="h-6 w-6 animate-spin" /> : <QrCode className="h-6 w-6" />}
            <span className="text-lg">PIX</span>
          </Button>

          {pixError && <p className="text-red-600 text-sm text-center">{pixError}</p>}
        </CardContent>
      </Card>
    )
  }

  // Show PIX payment interface
  if (paymentMethod === "pix" && pixData) {
    return (
      <div>
        <Button
          variant="ghost"
          onClick={() => {
            setPaymentMethod(null)
            setPixData(null)
          }}
          className="mb-4 text-navy-900 hover:text-navy-700 hover:bg-cream-100"
        >
          {t("backToPaymentMethods")}
        </Button>
        <OpenPixPayment
          transactionID={pixData.transactionID}
          correlationID={pixData.correlationID}
          qrCodeImage={pixData.qrCodeImage}
          brCode={pixData.brCode}
          paymentLinkUrl={pixData.paymentLinkUrl}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    )
  }

  // Show Stripe checkout for card payments
  return (
    <div>
      {currency === "brl" && (
        <Button
          variant="ghost"
          onClick={() => setPaymentMethod(null)}
          className="mb-4 text-navy-900 hover:text-navy-700 hover:bg-cream-100"
        >
          {t("backToPaymentMethods")}
        </Button>
      )}
      <div id="checkout" className="bg-background rounded-lg overflow-hidden">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  )
}
