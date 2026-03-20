export const locales = ['en', 'zh-TW', 'zh-CN', 'ja', 'es', 'nl', 'vi', 'ru', 'pt', 'fr'] as const
export const defaultLocale = 'en' as const
export type Locale = typeof locales[number]

export interface Dictionary {
    hero: {
        title: string
        subtitle: string
        badge: string
    }
    stats: {
        title: string
        commands: string
        servers: string
        users: string
        stars: string
        updates: string
        accounts: string
    }
    timeline: {
        title: string
        events: {
            project_started: string
            first_release: string
            reached_3000: string
            reached_6000: string
            anniversary: string
        }
        times: {
            project_started: string
            first_release: string
            reached_3000: string
            reached_6000: string
            anniversary: string
        }
    }
    team: {
        title: string
        roles: {
            developer: string
            designer: string
            pr: string
            documentation: string
        }
    }
    supporters: {
        title: string
        description: string
        button: string
    }
    translators: {
        title: string
        description: string
        button: string
        languages: {
            indonesian: string
            vietnamese: string
            chinese_simplified: string
            spanish: string
            chinese_traditional: string
            french: string
            dutch: string
            japanese: string
            arabic: string
            russian: string
            hindi: string
        }
    }
    thanks: {
        title: string
        message: string
        closing: string
    }
    giveaway: {
        title: string
        description: string
        button: string
    }
    footer: {
        copyright: string
    }
    thankYou: {
        badge: string
        title: string
        description: string
        gettingStarted: {
            title: string
            addAccount: {
                title: string
                description: string
            }
            generateCards: {
                title: string
                description: string
            }
            settings: {
                title: string
                description: string
            }
        }
        buttons: {
            documentation: string
            featureList: string
        }
    }
    installPage: {
        title: string
        description: string
        addToServer: string
        addToServerSubtitle: string
        addToApps: string
        addToAppsSubtitle: string
    }
}

// Dictionary cache for performance
const dictionaryCache = new Map<Locale, Dictionary>()

type DictionaryLoader = () => Promise<Dictionary>

const dictionaries: Record<Locale, DictionaryLoader> = {
    en: () => import('./dictionaries/en.yaml').then((m) => m.default as Dictionary),
    'zh-TW': () => import('./dictionaries/zh-TW.yaml').then((m) => m.default as Dictionary),
    'zh-CN': () => import('./dictionaries/zh-CN.yaml').then((m) => m.default as Dictionary),
    es: () => import('./dictionaries/es.yaml').then((m) => m.default as Dictionary),
    nl: () => import('./dictionaries/nl.yaml').then((m) => m.default as Dictionary),
    vi: () => import('./dictionaries/vi.yaml').then((m) => m.default as Dictionary),
    ru: () => import('./dictionaries/ru.yaml').then((m) => m.default as Dictionary),
    ja: () => import('./dictionaries/ja.yaml').then((m) => m.default as Dictionary),
    pt: () => import('./dictionaries/pt.yaml').then((m) => m.default as Dictionary),
    fr: () => import('./dictionaries/fr.yaml').then((m) => m.default as Dictionary),
}

const deepMerge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
    if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) {
        return source as T
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
    const dict = await dictionaries[locale]()

    // If not English, merge with English fallback for missing translations
    let mergedDict = dict
    if (locale !== 'en') {
        const englishDict = await dictionaries.en()
        mergedDict = deepMerge(englishDict, dict)
    }

    dictionaryCache.set(locale, mergedDict)
    return mergedDict
}