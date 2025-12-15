"use server"

import { stripe } from "@/lib/stripe"

// You can set these in your environment variables
const STRIPE_PRICE_IDS = {
  oneTime: {
    usd: process.env.STRIPE_PRICE_ID_USD_ONE_TIME || "",
    eur: process.env.STRIPE_PRICE_ID_EUR_ONE_TIME || "",
    brl: process.env.STRIPE_PRICE_ID_BRL_ONE_TIME || "",
  },
  monthly: {
    usd: {
      25: process.env.STRIPE_PRICE_ID_USD_MONTHLY_25 || "",
      50: process.env.STRIPE_PRICE_ID_USD_MONTHLY_50 || "",
      100: process.env.STRIPE_PRICE_ID_USD_MONTHLY_100 || "",
    },
    eur: {
      25: process.env.STRIPE_PRICE_ID_EUR_MONTHLY_25 || "",
      50: process.env.STRIPE_PRICE_ID_EUR_MONTHLY_50 || "",
      100: process.env.STRIPE_PRICE_ID_EUR_MONTHLY_100 || "",
    },
    brl: {
      25: process.env.STRIPE_PRICE_ID_BRL_MONTHLY_25 || "",
      50: process.env.STRIPE_PRICE_ID_BRL_MONTHLY_50 || "",
      100: process.env.STRIPE_PRICE_ID_BRL_MONTHLY_100 || "",
    },
  },
}

// Product ID (the same product with multiple prices)
const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID || ""

export async function startDonationCheckout(amount: number, currency: "usd" | "eur" | "brl", isMonthly: boolean) {
  const amountInCents = amount * 100

  let priceId: string | undefined

  if (isMonthly) {
    // For monthly, use the specific amount price ID
    const monthlyPrices = STRIPE_PRICE_IDS.monthly[currency]
    priceId = monthlyPrices[amount as 25 | 50 | 100] || ""
  } else {
    // For one-time, use the dynamic price (user can enter any amount)
    priceId = STRIPE_PRICE_IDS.oneTime[currency]
  }

  let sessionConfig: Parameters<typeof stripe.checkout.sessions.create>[0]

  if (isMonthly && priceId) {
    sessionConfig = {
      ui_mode: "embedded",
      redirect_on_completion: "never",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
    }
  } else {
    // For one-time donations, create dynamic price
    sessionConfig = {
      ui_mode: "embedded",
      redirect_on_completion: "never",
      line_items: [
        {
          price_data: {
            currency: currency,
            product: STRIPE_PRODUCT_ID || undefined,
            product_data: STRIPE_PRODUCT_ID
              ? undefined
              : {
                  name: "One-Time Donation - CatholicVacante",
                  description: "One-time donation to support the CatholicVacante mission",
                },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    }
  }

  const session = await stripe.checkout.sessions.create(sessionConfig)

  return session.client_secret!
}
