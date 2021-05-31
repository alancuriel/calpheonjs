import { BDO } from '@typings/namespaces'
import { GetReturnType, Types } from '@core/query/typings'

const Lookup: Record<Types, BDO.Entities.Types> = {
    [Types.QuestReward]: BDO.Entities.Types.Quest,
}
export const getReturnType = <T extends Types>(type: T) => {
    return Lookup[type] as GetReturnType<T>
}