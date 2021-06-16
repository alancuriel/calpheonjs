import { BDO, BDOCodex } from '@typings/namespaces'
import { Matcher } from '@helpers/matcher'
import { ShortURL } from '@helpers/utils/short-url'
import { parseNumber } from '@helpers/utils/parse-number'
import { Getter } from './getter.type'

export const getProducts: Getter<'products'> = ({ $ }) => {
    const matcher = Matcher('Crafting Result')

    const row = $('.outer.item_info td').toArray().find(element => {
        const text = $(element).text()
        return !!matcher.findIn(text)
    })
    if (!row || !matcher.lastMatch) return []

    return $(row).find('img').toArray().map(element => {
        const parent = $(element.parent.parent)
        const shortUrl = parent.attr('href')
        const { type, id } = ShortURL.decompose(shortUrl as string)

        const material: BDO.LifeSkills.Material = {
            type: type === BDOCodex.Entities.Types.Item
                ? BDO.Entities.Types.Item
                : BDO.Entities.Types.MaterialGroup,
            id,
            name: $(row).find(`a[href="${shortUrl}"]`).last().text(),
            icon: $(element).attr('src') as string,
            amount: parseNumber(parent.text(), 1),
        }
        return material
    })
}