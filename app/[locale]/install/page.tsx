import { getDictionary, type Locale } from '@/lib/i18n'
import InstallPage from '@/components/InstallPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Install | Hoyo Buddy',
  description: 'Install Hoyo Buddy to your Discord server or authorize it for your account.',
}

export default async function Page({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return <InstallPage dict={dict} locale={locale} />
}
