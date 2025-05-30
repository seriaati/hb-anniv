"use client"

import LanguageSwitcher from './LanguageSwitcher'
import { Dictionary, Locale } from '@/lib/i18n'
import { useEffect, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Zap, Server, Star, RefreshCw, Link, Gift, Heart } from "lucide-react"
import Image from "next/image"

// Consistent animation variants
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

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      const currentValue = Math.floor(progress * end)
      if (ref.current) {
        ref.current.textContent = currentValue.toLocaleString()
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return <span ref={ref}>0</span>
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
}: {
  icon: any
  label: string
  value: number
  suffix?: string
}) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 group">
        <CardContent className="p-6 text-center">
          <Icon className="w-8 h-8 mx-auto mb-3 text-zinc-400 group-hover:text-white transition-colors" />
          <div className="text-2xl font-bold text-white mb-1">
            <AnimatedCounter end={value} />
            {suffix}
          </div>
          <div className="text-zinc-400 text-sm">{label}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function PersonCard({ name, role, avatar }: { name: string; role: string; avatar: string }) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 group">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/70">
              <Image
                src={avatar || "/placeholder.svg"}
                alt={name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h3 className="font-semibold text-white mb-1">{name}</h3>
          <p className="text-zinc-400 text-sm">{role}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TimelineItem({ date, event, isLast = false }: { date: string; event: string; isLast?: boolean }) {
  return (
    <motion.div variants={fadeInUp} className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex-shrink-0"></div>
        {!isLast && <div className="w-0.5 h-16 bg-zinc-700/50 mt-2"></div>}
      </div>
      <div className="pb-8">
        <p className="text-zinc-400 text-sm mb-1">{date}</p>
        <p className="text-white font-medium">{event}</p>
      </div>
    </motion.div>
  )
}

export default function HoyoBuddyAnniversary({
  dict,
  locale
}: {
  dict: Dictionary
  locale: Locale
}) {
  const { scrollYProgress } = useScroll()
  const meshY1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const meshY2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const meshY3 = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Reference for scroll-based animations
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const timelineRef = useRef(null)
  const teamRef = useRef(null)
  const supportersRef = useRef(null)
  const translatorsRef = useRef(null)
  const thanksRef = useRef(null)
  const giveawayRef = useRef(null)

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
        <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-4">
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
              {dict.hero.title}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {dict.hero.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.8 }}>
              <Badge
                variant="outline"
                className="bg-zinc-800/70 text-white border border-zinc-700/70 hover:border-pink-500/50 text-lg px-4 py-2 backdrop-blur-sm"
              >
                {dict.hero.badge}
              </Badge>
            </motion.div>
          </motion.div>
        </section>

        {/* Community Stats */}
        <section ref={statsRef} className="py-20 px-4 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight"
              variants={fadeInUp}
            >
              {dict.stats.title}
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <StatCard icon={Zap} label={dict.stats.commands} value={1598} />
              <StatCard icon={Server} label={dict.stats.servers} value={8293} />
              <StatCard icon={Users} label={dict.stats.users} value={19252} />
              <StatCard icon={Star} label={dict.stats.stars} value={124} />
              <StatCard icon={RefreshCw} label={dict.stats.updates} value={3247} />
              <StatCard icon={Link} label={dict.stats.accounts} value={33316} />
            </div>
          </motion.div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="py-20 px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight"
              variants={fadeInUp}
            >
              {dict.timeline.title}
            </motion.h2>

            <div className="max-w-2xl mx-auto">
              <TimelineItem date="October 23, 2023" event={dict.timeline.events.project_started} />
              <TimelineItem date="June 7, 2024" event={dict.timeline.events.first_release} />
              <TimelineItem date="November 23, 2024" event={dict.timeline.events.reached_3000} />
              <TimelineItem date="February 12, 2025" event={dict.timeline.events.reached_6000} />
              <TimelineItem date="June 7, 2025" event={dict.timeline.events.anniversary} isLast={true} />
            </div>
          </motion.div>
        </section>

        {/* Thank You - Team Members */}
        <section ref={teamRef} className="py-20 px-4 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight"
              variants={fadeInUp}
            >
              {dict.team.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/70">
                        <Image
                          src="/avatars/seria.png"
                          alt="seria"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">seria</h3>
                    <p className="text-zinc-400 text-sm">{dict.team.roles.developer}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/70">
                        <Image
                          src="/avatars/ayasaku_.png"
                          alt="ayasaku_"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Aya Saku</h3>
                    <p className="text-zinc-400 text-sm">{dict.team.roles.designer}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/70">
                        <Image
                          src="/avatars/hydrogened.png"
                          alt="hydrogened"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Hydrogened</h3>
                    <p className="text-zinc-400 text-sm">{dict.team.roles.pr}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/70">
                        <Image
                          src="/avatars/charaanimates.png"
                          alt="charraanimates"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Chara Animates</h3>
                    <p className="text-zinc-400 text-sm">{dict.team.roles.documentation}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Thank You - Supporters */}
        <section ref={supportersRef} className="py-20 px-4 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight"
              variants={fadeInUp}
            >
              {dict.supporters.title}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <PersonCard name="Lucas" role="50$" avatar="/avatars/nemboi.png" />
              <PersonCard name="hakatashi" role="43$" avatar="/avatars/hakatashi.png" />
              <PersonCard name="bunny" role="30$" avatar="/avatars/bunny.gg.png" />
              <PersonCard name="Syaoran" role="$21" avatar="/avatars/syaorandesu.png" />
              <PersonCard name="FichteFoll" role="10$" avatar="/avatars/fichtefoll.png" />
              <PersonCard name="Crystal Arrow" role="5$" avatar="/avatars/crystalarrow.png" />
              <PersonCard name="Chara Animates" role="5$" avatar="/avatars/charaanimates.png" />
              <PersonCard name="Wocardo" role="5$" avatar="/avatars/wocardo.png" />
              <PersonCard name="Trollerr" role="1$" avatar="/avatars/trollerr.png" />
            </div>

            <motion.p className="text-center text-zinc-300 mt-12 text-lg leading-relaxed" variants={fadeInUp}>
              {dict.supporters.description}
            </motion.p>

            <motion.div className="text-center mt-8" variants={fadeInUp}>
              <Button
                size="lg"
                className="bg-zinc-800/70 hover:bg-zinc-700/70 text-white text-lg px-8 py-3 rounded-full font-semibold border border-zinc-700/70 hover:border-pink-500/50 shadow-lg hover:shadow-pink-500/10 transition-all duration-300 backdrop-blur-sm"
                onClick={() => window.open("https://github.com/seriaati#support-my-work", "_blank")}
              >
                {dict.supporters.button}
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Thank You - Translators */}
        <section ref={translatorsRef} className="py-20 px-4 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight"
              variants={fadeInUp}
            >
              {dict.translators.title}
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <PersonCard name="Ayase" role={dict.translators.languages.indonesian} avatar="/avatars/ayase_meguri.png" />
              <PersonCard name="Chara Animates" role={dict.translators.languages.vietnamese} avatar="/avatars/charaanimates.png" />
              <PersonCard name="Dinnerbone_3rd" role={dict.translators.languages.chinese_simplified} avatar="/avatars/db3_lost_mind.png" />
              <PersonCard name="Ditroit" role={dict.translators.languages.spanish} avatar="/avatars/ditroit.png" />
              <PersonCard name="Aya Saku" role={dict.translators.languages.chinese_traditional} avatar="/avatars/ayasaku_.png" />
              <PersonCard name="Lucas" role={dict.translators.languages.french} avatar="/avatars/nemboi.png" />
              <PersonCard name="Eden" role={dict.translators.languages.dutch} avatar="/avatars/perfectdelusions.png" />
              <PersonCard name="kakakaaa" role={dict.translators.languages.japanese} avatar="/avatars/ka.kaka.png" />
              <PersonCard name="Trollerr" role={dict.translators.languages.vietnamese} avatar="/avatars/trollerr.png" />
              <PersonCard name="Fuji" role={dict.translators.languages.indonesian} avatar="/avatars/monoceruse.png" />
              <PersonCard name="DarkAngel" role={dict.translators.languages.arabic} avatar="/avatars/q3yb.png" />
              <PersonCard name="DarkAssassin" role={dict.translators.languages.russian} avatar="/avatars/darkassassin.png" />
              <PersonCard name="ニャオハ" role={dict.translators.languages.french} avatar="/avatars/c330x.png" />
              <PersonCard name="Ginn" role={dict.translators.languages.chinese_traditional} avatar="/avatars/g1nn.png" />
              <PersonCard name="Anubhav" role={dict.translators.languages.hindi} avatar="/avatars/anubhav.png" />
            </div>

            <motion.p className="text-center text-zinc-300 mt-12 text-lg leading-relaxed" variants={fadeInUp}>
              {dict.translators.description}
            </motion.p>

            <motion.div className="text-center mt-8" variants={fadeInUp}>
              <Button
                size="lg"
                className="bg-zinc-800/70 hover:bg-zinc-700/70 text-white text-lg px-8 py-3 rounded-full font-semibold border border-zinc-700/70 hover:border-pink-500/50 shadow-lg hover:shadow-pink-500/10 transition-all duration-300 backdrop-blur-sm"
                onClick={() => window.open("https://github.com/seriaati/hoyo-buddy/blob/main/CONTRIBUTING.md", "_blank")}
              >
                {dict.translators.button}
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Thank You - You */}
        <section ref={thanksRef} className="py-20 px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
            </motion.div>

            <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight" variants={fadeInUp}>
              {dict.thanks.title}
            </motion.h2>

            <motion.p className="text-2xl text-zinc-300 mb-8 leading-relaxed" variants={fadeInUp}>
              {dict.thanks.message}
            </motion.p>

            <motion.p className="text-xl text-zinc-400 mb-12 leading-relaxed" variants={fadeInUp}>
              {dict.thanks.closing}
            </motion.p>
          </motion.div>
        </section>

        {/* Anniversary Giveaway */}
        <section ref={giveawayRef} className="py-20 px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Gift className="w-16 h-16 mx-auto mb-6 text-white" />
            </motion.div>

            <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" variants={fadeInUp}>
              {dict.giveaway.title}
            </motion.h2>

            <motion.p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed" variants={fadeInUp}>
              {dict.giveaway.description}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="bg-zinc-800/70 hover:bg-zinc-700/70 text-white text-lg px-8 py-3 rounded-full font-semibold border border-zinc-700/70 hover:border-pink-500/50 shadow-lg hover:shadow-pink-500/10 transition-all duration-300 backdrop-blur-sm"
                onClick={() => window.open("https://link.seria.moe/hb-dc", "_blank")}
              >
                {dict.giveaway.button}
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-zinc-800/50 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500">{dict.footer.copyright}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
