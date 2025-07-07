import { getDictionary, type Locale } from '@/lib/i18n'
import InstallPage from '@/components/InstallPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Install | Hoyo Buddy',
  description: 'Install Hoyo Buddy to your Discord server or authorize it for your account.',
  openGraph: {
    title: 'Install | Hoyo Buddy',
    description: 'Install Hoyo Buddy to your Discord server or authorize it for your account.',
    url: 'https://one.hb.seria.moe/install',
    siteName: 'Hoyo Buddy',
    images: [
      {
        url: 'https://one.hb.seria.moe/preview-install.png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Install | Hoyo Buddy',
    description: 'Install Hoyo Buddy to your Discord server or authorize it for your account.',
    images: 'https://one.hb.seria.moe/preview-install.png',
  },
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
