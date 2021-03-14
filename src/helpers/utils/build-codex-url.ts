import { App } from '@typings/namespaces'
import { BaseUrl } from '@config/constants'
import { ReverseEntityLookup } from '@config/lookups'

interface URLDescriptor {
    readonly locale: App.Locales
    readonly type: App.Entities.Types
    readonly id: string
}

export const buildCodexURL = (
    { locale, type, id }: URLDescriptor
): string => {
    return `${BaseUrl}/${locale}/${ReverseEntityLookup[type]}/${id}/`
}