import { getDictionary, type Locale } from '@/lib/i18n'
import HoyoBuddyAnniversary from '@/components/HoyoBuddyAnniversary'

export default async function Page({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return <HoyoBuddyAnniversary dict={dict} locale={locale} />
}