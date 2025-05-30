"use client"

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
        <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex-shrink-0"></div>
        {!isLast && <div className="w-0.5 h-16 bg-zinc-700/50 mt-2"></div>}
      </div>
      <div className="pb-8">
        <p className="text-zinc-400 text-sm mb-1">{date}</p>
        <p className="text-white font-medium">{event}</p>
      </div>
    </motion.div>
  )
}

export default function HoyoBuddyAnniversary() {
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
              One Year
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Celebrating one incredible year of Hoyo Buddy - the ultimate Discord companion for Hoyoverse gamers.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.8 }}>
              <Badge
                variant="outline"
                className="bg-zinc-800/70 text-white border border-zinc-700/70 hover:border-pink-500/50 text-lg px-4 py-2 backdrop-blur-sm"
              >
                🎉 Anniversary Special
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
              By the Numbers
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <StatCard icon={Zap} label="Commands/Day" value={1598} />
              <StatCard icon={Server} label="Servers" value={8293} />
              <StatCard icon={Users} label="Users" value={19252} />
              <StatCard icon={Star} label="GitHub Stars" value={123} />
              <StatCard icon={RefreshCw} label="Updates" value={3247} />
              <StatCard icon={Link} label="Linked Accounts" value={33316} />
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
              Our Journey
            </motion.h2>

            <div className="max-w-2xl mx-auto">
              <TimelineItem date="October 23, 2023" event="Project started" />
              <TimelineItem date="June 7, 2024" event="First official release" />
              <TimelineItem date="November 23, 2024" event="Reached 3,000 servers" />
              <TimelineItem date="February 12, 2025" event="Reached 6,000 servers" />
              <TimelineItem date="June 7, 2025" event="Reached 8,290 servers - One Year Anniversary!" isLast={true} />
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
              Thank You, Team Members
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/70">
                        <Image
                          src="/avatars/seria.png?height=64&width=64"
                          alt="seria"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">seria</h3>
                    <p className="text-zinc-400 text-sm">Developer</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/70">
                        <Image
                          src="/avatars/ayasaku_.png?height=64&width=64"
                          alt="ayasaku_"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Aya Saku</h3>
                    <p className="text-zinc-400 text-sm">Designer</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/70">
                        <Image
                          src="/avatars/hydrogened.png?height=64&width=64"
                          alt="hydrogened"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Hydrogened</h3>
                    <p className="text-zinc-400 text-sm">PR</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/70">
                        <Image
                          src="/avatars/charaanimates.png?height=64&width=64"
                          alt="charraanimates"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Chara Animates</h3>
                    <p className="text-zinc-400 text-sm">Documentation</p>
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
              Thank You, Supporters
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <PersonCard name="Lucas" role="50$" avatar="/avatars/nemboi.png?height=64&width=64" />
              <PersonCard name="hakatashi" role="43$" avatar="/avatars/hakatashi.png?height=64&width=64" />
              <PersonCard name="bunny" role="30$" avatar="/avatars/bunny.gg.png?height=64&width=64" />
              <PersonCard name="Syaoran" role="$21" avatar="/avatars/syaorandesu.png?height=64&width=64" />
              <PersonCard name="FichteFoll" role="10$" avatar="/avatars/fichtefoll.png?height=64&width=64" />
              <PersonCard name="Crystal Arrow" role="5$" avatar="/avatars/crystalarrow.png?height=64&width=64" />
              <PersonCard name="Chara Animates" role="5$" avatar="/avatars/charaanimates.png?height=64&width=64" />
              <PersonCard name="Wocardo" role="5$" avatar="/avatars/wocardo.png?height=64&width=64" />
              <PersonCard name="Trollerr" role="1$" avatar="/avatars/trollerr.png?height=64&width=64" />
            </div>

            <motion.p className="text-center text-zinc-300 mt-12 text-lg leading-relaxed" variants={fadeInUp}>
              Your support has been instrumental in making Hoyo Buddy what it is today.
            </motion.p>

            <motion.div className="text-center mt-8" variants={fadeInUp}>
              <Button
                size="lg"
                className="bg-zinc-800/70 hover:bg-zinc-700/70 text-white text-lg px-8 py-3 rounded-full font-semibold border border-zinc-700/70 hover:border-pink-500/50 shadow-lg hover:shadow-pink-500/10 transition-all duration-300 backdrop-blur-sm"
                onClick={() => window.open("https://github.com/seriaati#support-my-work", "_blank")}
              >
                Support Us
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
              Thank You, Translators
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <PersonCard name="Ayase" role="Indonesian" avatar="/avatars/ayase_meguri.png?height=64&width=64" />
              <PersonCard name="Chara Animates" role="Vietnamese" avatar="/avatars/charaanimates.png?height=64&width=64" />
              <PersonCard name="Dinnerbone_3rd" role="Chinese (Simplified)" avatar="/avatars/db3_lost_mind.png?height=64&width=64" />
              <PersonCard name="Ditroit" role="Spanish" avatar="/avatars/ditroit.png?height=64&width=64" />
              <PersonCard name="Aya Saku" role="Chinese (Traditional)" avatar="/avatars/ayasaku_.png?height=64&width=64" />
              <PersonCard name="Lucas" role="French" avatar="/avatars/nemboi.png?height=64&width=64" />
              <PersonCard name="Eden" role="Dutch" avatar="/avatars/perfectdelusions.png?height=64&width=64" />
              <PersonCard name="kakakaaa" role="Japanese" avatar="/avatars/ka.kaka.png?height=64&width=64" />
              <PersonCard name="Trollerr" role="Vietnamese" avatar="/avatars/trollerr.png?height=64&width=64" />
              <PersonCard name="Fuji" role="Indonesian" avatar="/avatars/monoceruse.png?height=64&width=64" />
              <PersonCard name="DarkAngel" role="Arabic" avatar="/avatars/q3yb.png?height=64&width=64" />
              <PersonCard name="DarkAssassin" role="Russian" avatar="/avatars/darkassassin.png?height=64&width=64" />
              <PersonCard name="ニャオハ" role="French" avatar="/avatars/c330x.png?height=64&width=64" />
              <PersonCard name="Ginn" role="Chinese (Traditional)" avatar="/avatars/g1nn.png?height=64&width=64" />
              <PersonCard name="Anubhav" role="Hindi" avatar="/avatars/anubhav.png?height=64&width=64" />
            </div>

            <motion.p className="text-center text-zinc-300 mt-12 text-lg leading-relaxed" variants={fadeInUp}>
              Thanks to your dedication, Hoyo Buddy speaks multiple languages and serves a global community.
            </motion.p>

            <motion.div className="text-center mt-8" variants={fadeInUp}>
              <Button
                size="lg"
                className="bg-zinc-800/70 hover:bg-zinc-700/70 text-white text-lg px-8 py-3 rounded-full font-semibold border border-zinc-700/70 hover:border-pink-500/50 shadow-lg hover:shadow-pink-500/10 transition-all duration-300 backdrop-blur-sm"
                onClick={() => window.open("https://github.com/seriaati/hoyo-buddy/blob/main/CONTRIBUTING.md", "_blank")}
              >
                Become a Translator
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
              Thank You
            </motion.h2>

            <motion.p className="text-2xl text-zinc-300 mb-8 leading-relaxed" variants={fadeInUp}>
              Most importantly, thank you for being part of the Hoyo Buddy family. Whether you're a daily user, a casual
              visitor, or someone discovering us for the first time - you make this community special.
            </motion.p>

            <motion.p className="text-xl text-zinc-400 mb-12 leading-relaxed" variants={fadeInUp}>
              Here's to many more adventures together in the worlds of Hoyoverse! 🎮✨
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
              Anniversary Giveaway
            </motion.h2>

            <motion.p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed" variants={fadeInUp}>
              Join our special anniversary celebration! We're giving away monthly passes.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="bg-zinc-800/70 hover:bg-zinc-700/70 text-white text-lg px-8 py-3 rounded-full font-semibold border border-zinc-700/70 hover:border-pink-500/50 shadow-lg hover:shadow-pink-500/10 transition-all duration-300 backdrop-blur-sm"
                onClick={() => window.open("https://link.seria.moe/hb-dc", "_blank")}
              >
                Join Discord Server & Enter Giveaway
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-zinc-800/50 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500">© 2025 Seria Ati. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
