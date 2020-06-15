import { describe } from "mocha";
import { expect } from "chai";
import QueryMock, { Queries } from "../utils/query-mock";

describe('OBTAINED FROM', () => {
    /**
     * https://bdocodex.com/us/item/10103/
     * Axion Shield
     */
    describe('Axion Shield', () => {
        let result: Queries.Result<Queries.Entities.Item>;

        before(async () => {
            result = await QueryMock('10103',
                Queries.Types.OBTAINED_FROM
            );
        });

        it('#url', () => {
            expect(result.url).to.equal('https://bdocodex.com/query.php?a=items&type=container&id=10103&l=us');
        });

        it('#type', () => {
            expect(result.type).to.equal('item');
        });

        it('#length', () => {
            expect(result.data.length).to.equal(1);
        });

        it('#items[0]', () => {
            expect(result.data[0]).to.deep.equal({
                type: 'item',
                shortUrl: '/us/item/44931/',
                id: '44931',
                icon: 'https://bdocodex.com/items/new_icon/03_etc/00044907.png',
                name: 'Offensive Sub-weapon Box',
                lvl: 1,
            });
        });
    });
});