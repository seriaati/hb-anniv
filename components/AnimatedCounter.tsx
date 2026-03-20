"use client"

import { useEffect, useRef } from "react"
import { useInView } from "framer-motion"

export function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
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