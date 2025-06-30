import { getDictionary, type Locale } from '@/lib/i18n'
import ThankYouPage from '@/components/ThankYouPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | Hoyo Buddy',
  description: 'Thank you for adding Hoyo Buddy to your Discord server! Get started with these helpful commands.',
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