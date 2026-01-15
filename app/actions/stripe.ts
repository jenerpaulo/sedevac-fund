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
    const monthlyPrices = STRIPE_PRICE_IDS.monthly[currency]
    priceId = monthlyPrices[amount as 25 | 50 | 100] || ""
  } else {
    priceId = STRIPE_PRICE_IDS.oneTime[currency]
  }

  console.log(
    "[v0] Donation checkout - amount:",
    amount,
    "amountInCents:",
    amountInCents,
    "currency:",
    currency,
    "isMonthly:",
    isMonthly,
    "priceId:",
    priceId,
  )

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
      metadata: {
        project: "sedevacante-donations",
        donation_type: "monthly_recurring",
        amount: amount.toString(),
        currency: currency,
      },
    }
  } else if (!isMonthly && priceId) {
    sessionConfig = {
      ui_mode: "embedded",
      redirect_on_completion: "never",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        project: "sedevacante-donations",
        donation_type: "one_time",
        amount: amount.toString(),
        currency: currency,
      },
    }
  } else {
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
                  name: "Doação Única - Sedevacante",
                  description: "Doação única para apoiar a missão Sedevacante e construir presença digital católica",
                  metadata: {
                    project: "sedevacante-donations",
                    type: "donation",
                  },
                },
            unit_amount: Math.max(1, Math.round(amountInCents)), // Ensure unit_amount is always a valid positive number
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        project: "sedevacante-donations",
        donation_type: "one_time",
        amount: amount.toString(),
        currency: currency,
      },
    }
  }

  const session = await stripe.checkout.sessions.create(sessionConfig)

  console.log("[v0] Session created with client_secret:", session.client_secret ? "✓" : "✗")

  return session.client_secret!
}
