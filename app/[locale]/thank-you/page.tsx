import { getDictionary, type Locale } from '@/lib/i18n'
import ThankYouPage from '@/components/ThankYouPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | Hoyo Buddy',
  description: 'Thanks for adding Hoyo Buddy, and welcome to an elevated Hoyoverse experience.',
  openGraph: {
    title: 'Thank You | Hoyo Buddy',
    description: 'Thanks for adding Hoyo Buddy, and welcome to an elevated Hoyoverse experience.',
    url: 'https://one.hb.seria.moe/thank-you',
    siteName: 'Hoyo Buddy',
    images: [
      {
        url: 'https://one.hb.seria.moe/preview-thank-you.png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thank You | Hoyo Buddy',
    description: 'Thanks for adding Hoyo Buddy, and welcome to an elevated Hoyoverse experience.',
    images: [
      'https://one.hb.seria.moe/preview-thank-you.png'
    ],
  },
}

export default async function Page({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return <ThankYouPage dict={dict} locale={locale} />
}