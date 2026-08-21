import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { EcommerceProvider } from '@payloadcms/plugin-ecommerce/client/react'
import { stripeAdapterClient } from '@payloadcms/plugin-ecommerce/payments/stripe'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
<html className={cn(GeistSans.variable, GeistMono.variable, 'scroll-smooth')} lang="en" suppressHydrationWarning>
  <head>
    <InitTheme />
    <link href="/favicon.ico" rel="icon" sizes="32x32" />
    <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
  </head>
  <body>
    <Providers>
  <EcommerceProvider
    currenciesConfig={{
    defaultCurrency: 'USD',
    supportedCurrencies: [
      { code: 'USD', decimals: 2, label: 'US Dollar', symbol: '$' },
    ],
  }}
    paymentMethods={[
      stripeAdapterClient({
        publishableKey:
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      }),
    ]}
  >
    <AdminBar adminBarProps={{ preview: isEnabled }} />
    <Header />
    {children}
    <Footer />
  </EcommerceProvider>
</Providers>
  </body>
</html>
      )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
