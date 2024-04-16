import { create } from 'zustand'
import { getMatchesByTournamentDate } from '../services/match'
import { IMatch } from '../types.d/match'

interface ManagementScheduleState {
  tournamentId: string | null
  matches: IMatch[]
  setTournamentId: (tournamentId: string) => void
  getMatchesByTournamentDate: (date: Date) => void

}
export const useManagementScheduleStore = create<ManagementScheduleState>((set, get) => {
  return {
    tournamentId: null,
    matches: [],
    setTournamentId: (tournamentId: string) => {
      set({ tournamentId })
    },
    getMatchesByTournamentDate: (date) => {
      const tournamentId = get().tournamentId
      tournamentId &&
      getMatchesByTournamentDate(tournamentId, date)
        .then(({ data }) => {
          set({ matches: data })
        })
    }
  }
})
