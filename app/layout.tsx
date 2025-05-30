import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

export const metadata: Metadata = {
  title: 'Hoyo Buddy | 1st Year Anniversary',
  description: 'Join us in celebrating the 1st anniversary of Hoyo Buddy with special giveaways!',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      <meta property="twitter:image" content="https://one.hb.seria.moe/preview.png"></meta>
      <meta property="twitter:card" content="summary_large_image"></meta>
      <meta property="twitter:title" content="Hoyo Buddy | 1st Year Anniversary"></meta>
      <meta property="twitter:description" content="Join us in celebrating the 1st anniversary of Hoyo Buddy with special giveaways!"></meta>
      <meta property="og:image" content="https://one.hb.seria.moe/preview.png"></meta>
      <meta property="og:site_name" content="Hoyo Buddy"></meta>
      <meta property="og:title" content="Hoyo Buddy | 1st Year Anniversary"></meta>
      <meta property="og:description" content="Join us in celebrating the 1st anniversary of Hoyo Buddy with special giveaways!"></meta>
      <meta property="og:url" content="https://one.hb.seria.moe"></meta>
      <body>{children} <Analytics /> <SpeedInsights /></body>
    </html>
  )
}
