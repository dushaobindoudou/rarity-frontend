import { useRarityGoldContract } from './useContract'
import { useCallback } from 'react'

interface GoldInterface {
    claim: (id: string) => Promise<void>
}

export default function useRarityGold(): GoldInterface {
    const gold = useRarityGoldContract()

    const claim = useCallback(
        async (id: string): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await gold?.claim(id)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [gold]
    )

    return { claim }
}
