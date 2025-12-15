"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, ExternalLink, Loader2, AlertCircle, Info } from "lucide-react"
import { checkOpenPixPaymentStatus } from "@/app/actions/openpix"

interface OpenPixPaymentProps {
  transactionID: string
  correlationID: string
  qrCodeImage: string
  brCode: string
  paymentLinkUrl: string
  onPaymentComplete: () => void
}

export function OpenPixPayment({
  transactionID,
  correlationID,
  qrCodeImage,
  brCode,
  paymentLinkUrl,
  onPaymentComplete,
}: OpenPixPaymentProps) {
  const [copied, setCopied] = useState(false)
  const [checking, setChecking] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const checkStatus = async () => {
    if (checking) return
    setStatusMessage(null)
    try {
      setChecking(true)
      const status = await checkOpenPixPaymentStatus(correlationID)
      if (status.paid) {
        onPaymentComplete()
      } else {
        setStatusMessage("Pagamento ainda não confirmado. Se você já pagou, aguarde um momento e tente novamente.")
      }
    } catch (error) {
      console.error("Error checking payment status:", error)
      setStatusMessage("Erro ao verificar status. Por favor, tente novamente.")
    } finally {
      setChecking(false)
    }
  }

  // Poll for payment status every 3 seconds
  useEffect(() => {
    const interval = setInterval(checkStatus, 3000)
    return () => clearInterval(interval)
  }, [correlationID, onPaymentComplete])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(brCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gold-600/30">
        <CardHeader>
          <CardTitle className="text-navy-950">Pagamento PIX</CardTitle>
          <CardDescription className="text-navy-800">Escaneie o QR Code ou copie o código para pagar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Disclaimer */}
          <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-700 flex gap-2 items-start">
            <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Nota:</strong> O destinatário do pagamento aparecerá como <strong>CatholicVacante</strong>.
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="relative h-64 w-64 rounded-lg border-2 border-gold-500/30 p-2 bg-white">
              <Image src={qrCodeImage || "/placeholder.svg"} alt="QR Code PIX" fill className="object-contain" />
            </div>
          </div>

          {/* Copy-Paste Code */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-navy-950">Ou copie o código PIX:</p>
            <div className="flex gap-2">
              <div className="flex-1 rounded-md border bg-cream-50 p-3 font-mono text-xs break-all text-navy-900">
                {brCode}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="flex-shrink-0 bg-white border-gold-500/50 text-navy-900 hover:bg-cream-100"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Payment Link */}
          <Button
            asChild
            variant="outline"
            className="w-full bg-white border-gold-500/50 text-navy-900 hover:bg-cream-100"
          >
            <a href={paymentLinkUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Abrir no app do banco
            </a>
          </Button>

          {/* Manual Check Button */}
          <div className="space-y-2">
            <Button
              className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950"
              onClick={checkStatus}
              disabled={checking}
            >
              {checking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Já fiz o pagamento"
              )}
            </Button>
            {statusMessage && (
              <p className="text-xs text-center text-amber-600 flex items-center justify-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {statusMessage}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center justify-center gap-2 text-sm text-navy-700">
            {checking && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>Aguardando confirmação automática...</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gold-500/30 bg-cream-50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2 text-navy-950">Como pagar com PIX:</h3>
          <ol className="space-y-2 text-sm text-navy-800">
            <li>1. Abra o app do seu banco</li>
            <li>2. Escolha a opção PIX</li>
            <li>3. Escaneie o QR Code ou cole o código copiado</li>
            <li>4. Confirme o pagamento</li>
            <li>5. Pronto! Você receberá a confirmação automaticamente</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
