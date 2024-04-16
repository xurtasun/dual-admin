import { create } from 'zustand'
import { getTeamsByPlayerId } from '../services/teams'
import { ITeam } from '../types.d/team'

interface TeamsState {
  teamsInPlayerDetail: ITeam[] | []
  loading: boolean
  getTeamsByPlayerId: (playerId: string) => void
  setTeamsInPlayerDetail: (teams: ITeam[] | []) => void
}
export const useTeamsStore = create<TeamsState>((set, _get) => {
  return {
    teamsInPlayerDetail: [],
    loading: false,
    getTeamsByPlayerId: async (playerId: string) => {
      set({ loading: true })
      getTeamsByPlayerId(playerId)
        .then(res => {
          set({ teamsInPlayerDetail: res.data })
          set({ loading: false })
        })
    },
    setTeamsInPlayerDetail: (teams: ITeam[] | []) => {
      set({ teamsInPlayerDetail: teams })
    }
  }
})
