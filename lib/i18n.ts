export const locales = ['en', 'zh-TW'] as const
export const defaultLocale = 'en' as const
export type Locale = typeof locales[number]

const dictionaries = {
    en: () => import('./dictionaries/en.json').then(m => m.default),
    'zh-TW': () => import('./dictionaries/zh-TW.json').then(m => m.default),
}

export const getDictionary = async (locale: Locale) =>
    dictionaries[locale]?.() ?? dictionaries.en()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>