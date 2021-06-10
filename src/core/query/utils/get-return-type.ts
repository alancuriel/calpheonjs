import { BDO } from '@typings/namespaces'
import { QueryTypes, Selectors } from '../typings'

export function getReturnType<T extends QueryTypes>(type: T) {
    return {
        [QueryTypes.QuestReward]: BDO.Entities.Types.Quest,
        [QueryTypes.RecipeMaterial]: BDO.Entities.Types.Recipe,
    }[type] as Selectors.ReturnType<T>
}