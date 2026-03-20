"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxBackgroundLarge() {
    const { scrollYProgress } = useScroll()
    const meshY1 = useTransform(scrollYProgress, [0, 1], [0, 200])
    const meshY2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const meshY3 = useTransform(scrollYProgress, [0, 1], [0, 100])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute -top-32 left-1/4 w-[50vw] h-[60vh] opacity-30"
                style={{
                    y: meshY1,
                    background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.6) 0%, rgba(236, 72, 153, 0) 70%)",
                    filter: "blur(60px)",
                }}
            />

            <motion.div
                className="absolute top-1/2 -right-32 w-[45vw] h-[50vh] opacity-25"
                style={{
                    y: meshY2,
                    background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.6) 0%, rgba(147, 51, 234, 0) 70%)",
                    filter: "blur(60px)",
                }}
            />

            <motion.div
                className="absolute bottom-1/4 left-1/3 w-[40vw] h-[45vh] opacity-20"
                style={{
                    y: meshY3,
                    background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)",
                    filter: "blur(60px)",
                }}
            />
        </div>
    )
}