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
  openGraph: {
    title: 'Hoyo Buddy | 1st Year Anniversary',
    description: 'Join us in celebrating the 1st anniversary of Hoyo Buddy with special giveaways!',
    url: 'https://one.hb.seria.moe',
    siteName: 'Hoyo Buddy',
    images: [
      {
        url: 'https://one.hb.seria.moe/preview-anniv.png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hoyo Buddy | 1st Year Anniversary',
    description: 'Join us in celebrating the 1st anniversary of Hoyo Buddy with special giveaways!',
    images: 'https://one.hb.seria.moe/preview-anniv.png',
  },
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
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}