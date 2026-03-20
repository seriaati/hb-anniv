"use client"

import { useScroll, useTransform, motion } from "framer-motion"

export function ParallaxBackground() {
    const { scrollYProgress } = useScroll()
    const meshY1 = useTransform(scrollYProgress, [0, 1], [0, 100])
    const meshY2 = useTransform(scrollYProgress, [0, 1], [0, -75])
    const meshY3 = useTransform(scrollYProgress, [0, 1], [0, 50])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute -top-32 left-1/4 w-[40vw] h-[50vh] opacity-20"
                style={{
                    y: meshY1,
                    background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0) 70%)",
                    filter: "blur(40px)",
                }}
            />
            <motion.div
                className="absolute top-1/2 -right-32 w-[35vw] h-[40vh] opacity-15"
                style={{
                    y: meshY2,
                    background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0) 70%)",
                    filter: "blur(40px)",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 left-1/3 w-[30vw] h-[35vh] opacity-10"
                style={{
                    y: meshY3,
                    background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 70%)",
                    filter: "blur(40px)",
                }}
            />
        </div>
    )
}