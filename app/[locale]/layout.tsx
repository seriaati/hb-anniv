import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import './globals.css'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Hoyo Buddy | 1st Year Anniversary',
  description: 'Join us in celebrating the 1st anniversary of Hoyo Buddy with special giveaways!',
  generator: 'v0.dev',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta property="twitter:image" content="/preview.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Hoyo Buddy | 1st Year Anniversary" />
        <meta property="twitter:description" content="Join us in celebrating the 1st anniversary of Hoyo Buddy with special giveaways!" />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:site_name" content="Hoyo Buddy" />
        <meta property="og:title" content="Hoyo Buddy | 1st Year Anniversary" />
        <meta property="og:description" content="Join us in celebrating the 1st anniversary of Hoyo Buddy with special giveaways!" />
        <meta property="og:url" content="https://one.hb.seria.moe" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}