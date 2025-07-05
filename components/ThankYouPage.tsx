"use client"

import LanguageSwitcher from './LanguageSwitcher'
import { Dictionary, Locale } from '@/lib/i18n'
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { List, User, Settings, FileText, ChevronDown } from "lucide-react"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface ThankYouPageProps {
  dict: Dictionary
  locale: Locale
}

export default function ThankYouPage({ dict, locale }: ThankYouPageProps) {
  const { scrollYProgress } = useScroll()
  const meshY1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const meshY2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const meshY3 = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  const gettingStartedRef = useRef<HTMLElement>(null)
  
  const handleFeatureList = () => {
    window.open('https://docs.hb.seria.moe/docs/features', '_blank')
  }

  const handleOpenDocumentation = () => {
    window.open('https://docs.hb.seria.moe/docs/Getting-Started', '_blank')
  }

  const scrollToGettingStarted = () => {
    gettingStartedRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
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
            y: meshY1,
            background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.6) 0%, rgba(236, 72, 153, 0) 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Purple blob */}
        <motion.div
          className="absolute top-1/2 -right-32 w-[45vw] h-[50vh] opacity-25"
          style={{
            y: meshY2,
            background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.6) 0%, rgba(147, 51, 234, 0) 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Blue blob */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-[40vw] h-[45vh] opacity-20"
          style={{
            y: meshY3,
            background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Frosted glass container */}
      <div className="relative z-10 min-h-screen backdrop-blur-[60px] bg-zinc-900/20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative px-4">
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
              {dict.thankYou.title}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {dict.thankYou.description}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.8 }} className="flex justify-center">
              <Badge
                variant="outline"
                className="bg-zinc-800/70 text-white border border-zinc-700/70 hover:border-pink-500/50 text-lg px-4 py-2 backdrop-blur-sm inline-flex items-center gap-2 cursor-pointer transition-all duration-300 hover:bg-zinc-700/80"
                onClick={scrollToGettingStarted}
              >
                <ChevronDown className="w-4 h-4" />
                {dict.thankYou.badge}
              </Badge>
            </motion.div>
          </motion.div>
        </section>

        {/* Getting Started Section */}
        <section ref={gettingStartedRef} className="py-20 px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
            >
              {dict.thankYou.gettingStarted.title}
            </motion.h2>
            
            <div className="grid gap-6 md:gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-zinc-800/70 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-white">{dict.thankYou.gettingStarted.addAccount.title}</h3>
                        <p className="text-zinc-400 mb-3">
                          {dict.thankYou.gettingStarted.addAccount.description}
                        </p>
                        <code className="px-3 py-1 bg-zinc-800/50 rounded text-sm font-mono text-zinc-300">
                          /accounts
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-zinc-800/70 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-white">{dict.thankYou.gettingStarted.generateCards.title}</h3>
                        <p className="text-zinc-400 mb-3">
                          {dict.thankYou.gettingStarted.generateCards.description}
                        </p>
                        <code className="px-3 py-1 bg-zinc-800/50 rounded text-sm font-mono text-zinc-300">
                          /profile
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-zinc-800/70 rounded-lg flex items-center justify-center">
                        <Settings className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-white">{dict.thankYou.gettingStarted.settings.title}</h3>
                        <p className="text-zinc-400 mb-3">
                          {dict.thankYou.gettingStarted.settings.description}
                        </p>
                        <code className="px-3 py-1 bg-zinc-800/50 rounded text-sm font-mono text-zinc-300">
                          /settings
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Action Buttons */}
        <section className="py-4 px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                onClick={handleOpenDocumentation}
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FileText className="w-5 h-5 mr-2" />
                {dict.thankYou.buttons.documentation}
              </Button>
              
              <Button
                onClick={handleFeatureList}
                size="lg"
                className="px-8 py-4 bg-zinc-800/70 hover:bg-zinc-700/80 border border-zinc-700/70 hover:border-zinc-600/70 text-white font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <List className="w-5 h-5 mr-2" />
                {dict.thankYou.buttons.featureList}
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-zinc-800/50 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500">{(dict as any).footer?.copyright || "© 2024 Hoyo Buddy. All rights reserved."}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}