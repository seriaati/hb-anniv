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

const deepMerge = (target: any, source: any): any => {
    if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) {
        return source
    }
    
    const result = { ...target }
    
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                result[key] = deepMerge(result[key] || {}, source[key])
            } else if (source[key] !== '' && source[key] !== null && source[key] !== undefined) {
                result[key] = source[key]
            }
        }
    }
    
    return result
}

export const getDictionary = async (locale: Locale) => {
    // Return cached dictionary if available
    if (dictionaryCache.has(locale)) {
        return dictionaryCache.get(locale)
    }
    
    // Load dictionary
    const dict = await (dictionaries[locale]?.() ?? dictionaries.en())
    
    // If not English, merge with English fallback for missing translations
    let mergedDict = dict
    if (locale !== 'en') {
        const englishDict = await dictionaries.en()
        mergedDict = deepMerge(englishDict, dict)
    }
    
    dictionaryCache.set(locale, mergedDict)
    return mergedDict
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>