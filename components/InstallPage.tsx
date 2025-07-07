"use client"

import LanguageSwitcher from './LanguageSwitcher'
import { Dictionary, Locale } from '@/lib/i18n'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlusCircle, AppWindow } from "lucide-react"
import Image from "next/image"

interface InstallPageProps {
  dict: Dictionary
  locale: Locale
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function InstallPage({ dict, locale }: InstallPageProps) {
  
  const handleAddToServer = () => {
    window.open('https://discord.com/oauth2/authorize?client_id=1000045812522430626&permissions=311296&scope=bot+applications.commands&redirect_uri=https://one.hb.seria.moe/thank-you&response_type=code', '_blank')
  }

  const handleAddToApps = () => {
    window.open('https://discord.com/oauth2/authorize?client_id=1000045812522430626&permissions=311296&scope=applications.commands&integration_type=1', '_blank')
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher currentLocale={locale} />
      </div>
      
      {/* Colorful background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Pink blob */}
        <motion.div
          className="absolute -top-32 left-1/4 w-[50vw] h-[60vh] opacity-30"
          style={{
            background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.6) 0%, rgba(236, 72, 153, 0) 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Purple blob */}
        <motion.div
          className="absolute top-1/2 -right-32 w-[45vw] h-[50vh] opacity-25"
          style={{
            background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.6) 0%, rgba(147, 51, 234, 0) 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Blue blob */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-[40vw] h-[45vh] opacity-20"
          style={{
            background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Frosted glass container */}
      <div className="relative z-10 min-h-screen backdrop-blur-[60px] bg-zinc-900/20 flex items-center justify-center">
        {/* Hero Section */}
        <section className="relative px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-8"
            >
              <Image
                src="/logo.png"
                alt="Hoyo Buddy Logo"
                width={120}
                height={120}
                className="mx-auto mb-6 relative z-10"
              />
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {dict.installPage.title}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {(dict.installPage as any).description}
            </motion.p>

            <motion.div
              className="mt-12"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <div className="flex flex-col items-center">
                  <Button
                    onClick={handleAddToServer}
                    size="lg"
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    {dict.installPage.addToServer}
                  </Button>
                  <p className="text-sm text-zinc-400 mt-2">{dict.installPage.addToServerSubtitle}</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button
                    onClick={handleAddToApps}
                    size="lg"
                    className="px-8 py-4 bg-zinc-800/70 hover:bg-zinc-700/80 border border-zinc-700/70 hover:border-zinc-600/70 text-white font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  >
                    <AppWindow className="w-5 h-5 mr-2" />
                    {dict.installPage.addToApps}
                  </Button>
                  <p className="text-sm text-zinc-400 mt-2">{dict.installPage.addToAppsSubtitle}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
