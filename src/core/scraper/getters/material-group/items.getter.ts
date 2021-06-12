import { BDO } from '@typings/namespaces'
import { ShortURL } from '@helpers/utils/short-url'
import { Getter } from './getter.type'

export const getItems: Getter<'items'> = ({ $ }) => {
    const elements = $('hr.hr_long')
        .parent().children().toArray()
    const items: BDO.Refs.Item[] = []
    for (let i = 0; i < elements.length; i++) {
        const elem = elements[i]
        if (elem.type !== 'tag' || elem.tagName !== 'div')
            continue
        const node = $(elem)
        const icon = node.find('img').attr('src') as string
        const url = node.find('a').attr('href') as string
        const { id } = ShortURL.decompose(url)
        const name = $(elements[i+1]).text()
        items.push({ id, type: BDO.Entities.Types.Item, icon, name })
    }
    return items
}