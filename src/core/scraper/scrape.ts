import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { BDO } from '@typings/namespaces'
import { DefaultLocale } from '@config/constants'
import { InvalidEntity } from '@core/errors/invalid-entity'
import { isValidPage } from '@core/scraper/utils/is-valid-page'
import { Entities, ScrapableEntity } from '@core/scraper/typings'
import { buildCodexURL } from '@helpers/utils/build-codex-url'
import { isScrapableEntity } from './utils/is-scrapable-entity'
import { Builder } from '@core/scraper/builders'

export const Scrape: {
    (type: BDO.Entities.Types.Item, itemId: string): Promise<Entities.Items.Item>
    (type: BDO.Entities.Types.Knowledge, knowledgeId: string): Promise<Entities.Knowledge>
    (type: BDO.Entities.Types.MaterialGroup, materialGroupId: string): Promise<Entities.MaterialGroup>
    (type: BDO.Entities.Types.NPC, npcId: string): Promise<Entities.NPCs.NPC>
    (type: BDO.Entities.Types.Processing, recipeId: string): Promise<Entities.Processing>
    (type: BDO.Entities.Types.Quest, questId: string): Promise<Entities.Quest>
    (type: BDO.Entities.Types.Recipe, recipeId: string): Promise<Entities.Recipe>
} = async <T extends ScrapableEntity>(
    type: T,
    id: string
): Promise<any> => {
    const locale = DefaultLocale
    const response = await fetch(
        buildCodexURL({ locale, type, id })
    )
    const body = await response.text()

    const $ = cheerio.load(body)
    if (!isScrapableEntity(type) || !isValidPage($)) {
        throw new InvalidEntity(id, type, locale)
    }
    return Builder(type, { $, id, type, locale })
}