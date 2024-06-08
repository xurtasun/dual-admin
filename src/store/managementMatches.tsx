/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { getGroupsMatchesByTournamentAndCategory } from '../services/groups'
import { getTeamsByTournamentAndCategory } from '../services/teams'
import { IGroup } from '../types.d/group'
import { IMatch } from '../types.d/match'
import { ITeam } from '../types.d/team'
import { createMatch, updateMatch, deleteMatch, getFinalMatchesByTournamentAndCategory } from '../services/match'
import { toast } from 'sonner'
export interface FormInputsErrors {
  courtName?: {
    message: string
  } | null
}
interface MatchInType {
  [key: string]: IMatch[]
}
interface ManagementMatchesStore {
  tournamentId: string | null
  categoryId: string | null
  groups: IGroup[]
  match: IMatch | null
  matchesLoading: boolean
  finalMatchesLoading: boolean
  teamsSelector: ITeam[]
  matchFormErrors: FormInputsErrors
  finalMatches: MatchInType | null
  manualTeams: boolean[]
  setManualTeams: (manualTeams: boolean[]) => void
  setMatchFormErrors: (matchFormErrors: FormInputsErrors) => void
  setTeamsSelector: (teamsSelector: ITeam[]) => void
  setMatch: ({ match, groupId }: { match?: any, groupId?: string }) => void
  setMatchesLoading: (matchesLoading: boolean) => void
  setTournamentId: (tournamentId: string) => void
  setCategoryId: (categoryId: string | null) => void
  getGroupsMatchesByTournamentAndCategory: () => void
  getTeamsByTournamentAndCategory: () => void
  addTeamToMatch: (teamId: string, teamIndex: number) => void
  updateTeamToMatch: (teamId: string, oldTeam: ITeam) => void
  getTeamById: (teamId: string) => ITeam | undefined
  createMatch: (match: IMatch, refreshData: () => void) => void
  updateMatch: (match: IMatch, refreshData: () => void) => void
  deleteMatch: (matchId: string, refreshData: () => void) => void
  getFinalMatchesByTournamentAndCategory: () => void
  splitMatchesInTypes: (matches: IMatch[]) => { [key: string]: IMatch[] }
}
export const useManagementMatchesStore = create<ManagementMatchesStore>((set, get) => {
  return {
    tournamentId: null,
    categoryId: null,
    groups: [],
    matchesLoading: false,
    finalMatchesLoading: false,
    match: null,
    matchFormErrors: {},
    teamsSelector: [],
    finalMatches: null,
    manualTeams: [false, false],
    setManualTeams: (manualTeams: boolean[]) => {
      set({ manualTeams })
    },
    setMatchFormErrors: (matchFormErrors: FormInputsErrors) => {
      set({ matchFormErrors })
    },
    setTeamsSelector: (teamsSelector: ITeam[]) => {
      set({ teamsSelector })
    },
    setMatch: ({ match, groupId }) => {
      if (match === null) {
        set({ match: null })
      } else {
        set({ match: { ...match, category: get().categoryId, groupId: match.groupId ? match.groupId : groupId } })
      }
    },
    setMatchesLoading: (matchesLoading: boolean) => {
      set({ matchesLoading })
    },
    setTournamentId: (tournamentId: string) => {
      set({ tournamentId })
    },
    setCategoryId: (categoryId: string | null) => {
      set({ categoryId })
    },
    getGroupsMatchesByTournamentAndCategory: () => {
      set({ matchesLoading: true })
      const tournamentId = get().tournamentId
      const categoryId = get().categoryId
      if (!tournamentId || !categoryId) return
      getGroupsMatchesByTournamentAndCategory(tournamentId, categoryId)
        .then(({ data }) => {
          set({ groups: data })
          set({ matchesLoading: false })
        })
    },
    getTeamsByTournamentAndCategory: () => {
      const tournamentId = get().tournamentId
      const categoryId = get().categoryId
      if (!tournamentId || !categoryId) return
      getTeamsByTournamentAndCategory(tournamentId, categoryId)
        .then(({ data }) => {
          set({ teamsSelector: data })
        })
    },
    getTeamById: (teamId: string) => {
      const teams = get().teamsSelector
      return teams.find((team) => team._id === teamId)
    },
    addTeamToMatch: (teamId: string, teamIndex: number) => {
      const match = get().match
      const team = get().getTeamById(teamId)
      if (!team) return
      if (match) {
        const newMatch = { ...match }
        newMatch.teams[teamIndex] = team
        set({ match: newMatch })
      }
    },
    updateTeamToMatch: (teamId, oldTeam) => {
      const match = structuredClone(get().match)
      const team = get().getTeamById(teamId)
      if (!team) {
        if (match?.teams) {
          const index = match.teams.findIndex((t: any) => t._id === oldTeam._id)
          if (index !== -1) {
            match.teams[index] = null as any
          }
        }
        get().setMatch({ match })
        return
      }
      if (match) {
        if (match.teams) {
          const index = match.teams.findIndex((t: any) => t._id === oldTeam._id)
          if (index !== -1) {
            match.teams[index] = team
          }
        } else {
          match.teams = [team]
        }
        get().setMatch({ match })
      }
    },
    createMatch: (match: IMatch, refreshData) => {
      createMatch(match)
        .then(() => {
          toast.success('Partido creado')
          set({ match: null })
          refreshData()
        })
    },
    updateMatch: (match: IMatch, refreshData) => {
      updateMatch(match)
        .then(() => {
          toast.success('Partido actualizado')
          set({ match: null })
          refreshData()
        })
    },
    deleteMatch: (matchId: string, refreshData) => {
      deleteMatch(matchId)
        .then(() => {
          toast.success('Partido eliminado')
          set({ match: null })
          refreshData()
        })
    },
    getFinalMatchesByTournamentAndCategory: () => {
      set({ finalMatchesLoading: true })
      const tournamentId = get().tournamentId
      const categoryId = get().categoryId
      if (tournamentId && categoryId) {
        getFinalMatchesByTournamentAndCategory(tournamentId, categoryId)
          .then(({ data }) => {
            const finalMatches = get().splitMatchesInTypes(data)
            set({ finalMatches })
            set({ finalMatchesLoading: false })
          })
      }
    },
    splitMatchesInTypes: (matches: IMatch[]) => {
      if (matches) {
        const matchTypes = matches.reduce<{ [key: string]: IMatch[] }>((acc, match) => {
          if (match.type) {
            if (!acc[match.type]) {
              acc[match.type] = []
            }
            acc[match.type].push(match)
          }
          return acc
        }, {})
        return matchTypes
      }
      return {}
    }
  }
})
