import { Generic } from './generic.interface'
import { SorteableField } from '../utilities'

export interface NPCSells extends Generic<SorteableField> {
    /** Level. */
    readonly 3: string

    /** HP. */
    readonly 4: string

    /** Defense (DP). */
    readonly 5: string

    /** Evasion. */
    readonly 6: string

    /** Dropped base exp. */
    readonly 7: string

    /** Dropped skill exp. */
    readonly 8: string

    /** Dropped karma. */
    readonly 9: string
}