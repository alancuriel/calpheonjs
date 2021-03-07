import { App } from '@typings/namespaces'
import { getTestCaseData, getTestCases } from '@tests/utils'
import * as Builders from './index'

describe('Builders', () => {
    const cases = getTestCases()

    describe.each(cases)('%s', (_, data) => {
        const [expected, $] = getTestCaseData(data)

        const received = {
            [App.Entities.Types.Item]: Builders.buildItem,
        }[data.type]?.({ ...data, $ })

        it('should have all expected keys', () => {
            const hasAllKeys = Object.keys(expected).every(
                key => key in received
            )
            expect(hasAllKeys).toBeTruthy()
        })
    })
})