import fs from 'fs/promises'
import path from 'path'
import fetch from 'node-fetch'
import chalk from 'chalk'

import { composeQueryURL } from '@core/query/utils/compose-query-url'
import { decomposeFileKey } from '../utils/decompose-file-key'

const logFile = (key: string, status: 'F' | 'D'): void => console.log(
    chalk.blackBright.bold('  @') +
    (status === 'F'
        ? chalk.greenBright.bold(` [${status}] `)
        : chalk.redBright.bold(` [${status}] `)) +
    chalk.whiteBright.bold(key)
);

(async function() {
    const root = path.join(__dirname, '../../../../../')
    const mocks = path.join(root, 'mocks/query')
    const cache = path.join(root, 'cache/query')

    const keys = await fs
        .readdir(mocks, { encoding: 'utf-8' })
        .then(keys => keys.map(k => k.split('.').slice(0, -1).join('.')))
    const missing = await fs
        .readdir(cache, { encoding: 'utf-8' })
        .then(arr => keys.length - arr.length)
    if (missing === 0) return
    
    console.log(chalk
        .bgBlueBright.black
        .bold(` Preparing query tests (${missing}/${keys.length}) `)
    )
    
    await Promise.all(keys.map(async key => {
        const filePath = path.join(cache, key + '.txt')
        try {
            await fs.access(filePath)
            logFile(key, 'F')
        }
        catch {
            logFile(key, 'D')

            const args = decomposeFileKey(key)
            const url = composeQueryURL(args)
            const response = await fetch(url)
            const text = await response.text()

            await fs.writeFile(filePath, text)
        }
    }))
})()