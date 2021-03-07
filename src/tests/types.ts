import { App } from '@typings/namespaces'

export type TestCase = [string, {
    readonly id: string
    readonly type: App.Entities.Types
    readonly locale: App.Locales
}]

export type TestCaseData<T = any> = [T, cheerio.Root]