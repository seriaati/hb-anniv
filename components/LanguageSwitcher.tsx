'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Globe, ChevronDown } from 'lucide-react'
import { locales, type Locale } from '@/lib/i18n'
import { useState } from 'react'

const languageNames = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ja: '日本語',
    'zh-TW': '繁體中文',
    'zh-CN': '简体中文',
    vi: 'Tiếng Việt',
    de: 'Deutsch',
    ru: 'Русский',
}

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const switchLanguage = (newLocale: Locale) => {
        const segments = pathname.split('/')
        segments[1] = newLocale
        router.push(segments.join('/'))
        setIsOpen(false)
    }

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-zinc-800/70 hover:bg-zinc-700/70 text-white px-4 py-2 rounded-full border border-zinc-700/70 hover:border-pink-500/50 transition-all duration-300 backdrop-blur-sm group"
            >
                <Globe className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium">
                    {languageNames[currentLocale]}
                </span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 group-hover:text-white transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute top-full mt-2 right-0 bg-zinc-800/90 backdrop-blur-md border border-zinc-700/70 rounded-lg shadow-xl z-50 min-w-[160px] overflow-hidden">
                        {locales.map(locale => (
                            <button
                                key={locale}
                                onClick={() => switchLanguage(locale)}
                                className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center gap-3 ${locale === currentLocale
                                        ? 'bg-pink-500/20 text-pink-300 border-r-2 border-pink-500'
                                        : 'text-zinc-300 hover:bg-zinc-700/50 hover:text-white'
                                    }`}
                            >
                                <span className="font-medium">
                                    {languageNames[locale]}
                                </span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}