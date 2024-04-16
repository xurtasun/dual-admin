import { create } from 'zustand'
import { getScoringByPlayerId } from '../services/scoring'
import { IScoring } from '../types.d/scoring'

interface ScoringState {
  scoring: IScoring[]
  getScoringByPlayerId: (playerId: string) => void
}
export const useScoringStore = create<ScoringState>((set, _get) => {
  return {
    scoring: [],
    getScoringByPlayerId: async (playerId: string) => {
      getScoringByPlayerId(playerId)
        .then(res => {
          set({ scoring: res.data })
        })
    }
  }
})
