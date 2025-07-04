export const locales = ['en', 'zh-TW', 'zh-CN', 'ja', 'es', 'nl', 'vi', 'ru', 'pt', 'fr'] as const
export const defaultLocale = 'en' as const
export type Locale = typeof locales[number]

// Dictionary cache for performance
const dictionaryCache = new Map<Locale, any>()

const dictionaries = {
    en: () => import('./dictionaries/en.yaml').then(m => m.default),
    'zh-TW': () => import('./dictionaries/zh-TW.yaml').then(m => m.default),
    'zh-CN': () => import('./dictionaries/zh-CN.yaml').then(m => m.default),
    es: () => import('./dictionaries/es.yaml').then(m => m.default),
    nl: () => import('./dictionaries/nl.yaml').then(m => m.default),
    vi: () => import('./dictionaries/vi.yaml').then(m => m.default),
    ru: () => import('./dictionaries/ru.yaml').then(m => m.default),
    ja: () => import('./dictionaries/ja.yaml').then(m => m.default),
    pt: () => import('./dictionaries/pt.yaml').then(m => m.default),
    fr: () => import('./dictionaries/fr.yaml').then(m => m.default),
}

export const getDictionary = async (locale: Locale) => {
    // Return cached dictionary if available
    if (dictionaryCache.has(locale)) {
        return dictionaryCache.get(locale)
    }
    
    // Load and cache dictionary
    const dict = await (dictionaries[locale]?.() ?? dictionaries.en())
    dictionaryCache.set(locale, dict)
    return dict
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>