"use server"

const OPENPIX_APP_ID = process.env.OPENPIX_APP_ID || ""
const OPENPIX_API_URL = "https://api.openpix.com.br/api/v1"

interface OpenPixChargeResponse {
  charge: {
    transactionID: string
    correlationID: string
    value: number
    status: string
    brCode: string
    paymentLinkUrl: string
    qrCodeImage: string
  }
}

interface OpenPixChargeStatusResponse {
  charge: {
    status: string
    transactionID: string
    correlationID: string
  }
}

export async function createOpenPixCharge(
  amountInBRL: number,
  description: string,
): Promise<{
  data?: { transactionID: string; correlationID: string; qrCodeImage: string; brCode: string; paymentLinkUrl: string }
  error?: string
}> {
  try {
    const correlationID = `donation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const response = await fetch(`${OPENPIX_API_URL}/charge`, {
      method: "POST",
      headers: {
        Authorization: OPENPIX_APP_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correlationID,
        value: amountInBRL * 100, // Convert to cents
        comment: description,
        expiresIn: 3600, // 1 hour expiration
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("OpenPix API error:", errorText)
      return { error: "Failed to create PIX charge" }
    }

    const data: OpenPixChargeResponse = await response.json()

    return {
      data: {
        transactionID: data.charge.transactionID,
        correlationID: data.charge.correlationID,
        qrCodeImage: data.charge.qrCodeImage,
        brCode: data.charge.brCode,
        paymentLinkUrl: data.charge.paymentLinkUrl,
      },
    }
  } catch (error) {
    console.error("Error creating OpenPix charge:", error)
    return { error: "Failed to create PIX charge" }
  }
}

export async function checkOpenPixPaymentStatus(correlationID: string): Promise<{ paid: boolean; status: string }> {
  try {
    const response = await fetch(`${OPENPIX_API_URL}/charge/${correlationID}`, {
      method: "GET",
      headers: {
        Authorization: OPENPIX_APP_ID,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return { paid: false, status: "error" }
    }

    const data: OpenPixChargeStatusResponse = await response.json()

    // OpenPix status: ACTIVE, COMPLETED, EXPIRED
    const isPaid = data.charge.status === "COMPLETED"

    return { paid: isPaid, status: data.charge.status }
  } catch (error) {
    console.error("Error checking OpenPix payment status:", error)
    return { paid: false, status: "error" }
  }
}
