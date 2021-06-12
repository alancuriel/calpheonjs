const fs = require('fs/promises')
const path = require('path')
const fetch = require('node-fetch')
const { decomposeFileKey } = require('../utils/decompose-file-key')
const { buildCodexURL } = require('../../../../helpers/utils/build-codex-url')

module.exports = async function() {
    const BASE_DIR = path.join(__dirname, '../../../../../')

    const keys = (await fs.readdir(
        path.join(BASE_DIR, 'mocks/scraper'),
        { encoding: 'utf-8' },
    )).map(key => key.split('.').slice(0, -1).join('.'))

    await Promise.all(keys.map(async key => {
        const __path = path
            .join(BASE_DIR, 'cache/scraper', key + '.txt')
        try {
            await fs.readFile(__path, { encoding: 'utf-8' })
        } catch {
            const args = decomposeFileKey(key)
            const url = buildCodexURL(args)
            console.log(`Fetching ${url}...`)
            const response = await fetch(url)
            await fs.writeFile(__path, await response.text())
        }
    }))
}