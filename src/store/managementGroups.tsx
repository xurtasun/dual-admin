/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

import { getGroupsByTournamentAndCategory, createGroup, updateGroup, deleteGroup } from '../services/groups'
import { getTeamsByTournamentAndCategory } from '../services/teams'
import { IGroup } from '../types.d/group'
import { ITeam } from '../types.d/team'
import { toast } from 'sonner'

interface ManagementGroupState {
  groupsLoading: boolean
  groups: IGroup[]
  tournamentId: string | null
  categoryId: string | null
  newGroup: IGroup | null
  newTeam: ITeam | null
  teams: ITeam[]
  teamsSelector: ITeam[]
  setTeams: (teams: ITeam[]) => void
  setTournamentId: (tournamentId: string | null) => void
  setCategoryId: (categoryId: string | null) => void
  setGroupsLoading: (loading: boolean) => void
  getGroupsByTournamentAndCategory: () => void
  getTeamsByTournamentAndCategory: () => void
  setNewGroup: (group: any) => void
  deleteNewGroup: () => void
  addTeamToNewGroup: (team: any) => void
  updateTeamToNewGroup: (teamId: string, oldTeamId: ITeam) => void
  setNewTeam: (team: any) => void
  getTeamById: (teamId: string) => ITeam | undefined
  removeTeamFromTeams: (teamId: string) => void
  saveGroup: () => void
  deleteGroup: (groupId: string) => void
  copyTeams: (group: IGroup) => void
  copyFullTeams: () => void
}
export const useManagementGroupsStore = create<ManagementGroupState>((set, _get) => {
  return {
    teams: [],
    teamsSelector: [],
    groupsLoading: false,
    tournamentId: null,
    categoryId: null,
    groups: [],
    newGroup: null,
    newTeam: null,
    removeTeamFromTeams: (teamId: string) => {
      const teamsSelector = _get().teamsSelector
      const newTeams = teamsSelector.filter((team: any) => team._id !== teamId)
      set({ teamsSelector: newTeams })
    },
    setTeams: (teams: ITeam[]) => {
      set({ teams })
    },
    deleteNewGroup: () => {
      set({ newGroup: null })
    },
    setNewTeam: (team: any) => {
      set({ newTeam: team })
    },
    setCategoryId (categoryId) {
      set({ categoryId })
    },
    setTournamentId (tournamentId) {
      set({ tournamentId })
    },
    setGroupsLoading: (loading: boolean) => {
      set({ groupsLoading: loading })
    },
    getGroupsByTournamentAndCategory: () => {
      set({ groupsLoading: true })
      const tournamentId = _get().tournamentId
      const categoryId = _get().categoryId
      if (!tournamentId || !categoryId) return
      getGroupsByTournamentAndCategory(tournamentId, categoryId)
        .then(({ data }) => {
          set({ groupsLoading: false })
          set({ groups: data })
        })
    },
    getTeamsByTournamentAndCategory: () => {
      const tournamentId = _get().tournamentId
      const categoryId = _get().categoryId
      if (!tournamentId || !categoryId) return
      getTeamsByTournamentAndCategory(tournamentId, categoryId)
        .then(({ data }) => {
          set({ teams: data })
          set({ teamsSelector: data })
        })
    },
    setNewGroup: (group: any) => {
      set({ newGroup: { ..._get().newGroup, ...group, category: _get().categoryId, tournament: _get().tournamentId } })
    },
    addTeamToNewGroup: (teamId: string) => {
      const team = _get().getTeamById(teamId)
      if (!team) return
      const newGroup = _get().newGroup
      if (newGroup) {
        if (newGroup.teams) {
          newGroup.teams.push(team)
        } else {
          newGroup.teams = [team]
        }
        console.log(newGroup)
        set({ newGroup })
      }
      _get().removeTeamFromTeams(teamId)
    },
    updateTeamToNewGroup: (teamId: string, oldTeam: ITeam) => {
      const team = _get().getTeamById(teamId)
      if (!team) return
      const newGroup = _get().newGroup
      if (newGroup) {
        if (newGroup.teams) {
          const index = newGroup.teams.findIndex((t: any) => t._id === oldTeam._id)
          if (index !== -1) {
            newGroup.teams[index] = team
          }
        } else {
          newGroup.teams = [team]
        }
        set({ newGroup })
      }
      console.log(newGroup)
      _get().removeTeamFromTeams(teamId)
      if (_get().teamsSelector.find((t: any) => t._id === oldTeam._id)) return
      set({ teamsSelector: [..._get().teamsSelector, oldTeam] })
    },
    getTeamById: (teamId: string) => {
      const teams = _get().teams
      return teams.find((team: any) => team._id === teamId)
    },
    saveGroup: () => {
      const group = _get().newGroup
      if (!group) return
      if (group?._id) {
        updateGroup(group)
          .then((_) => {
            toast.success('Grupo actualizado')
            set({ newGroup: null })
            _get().getGroupsByTournamentAndCategory()
          })
      } else {
        createGroup(group)
          .then((_) => {
            toast.success('Grupo creado')
            set({ newGroup: null })
            _get().getGroupsByTournamentAndCategory()
          })
      }
    },
    deleteGroup: (groupId: string) => {
      console.log('delete', groupId)
      deleteGroup(groupId)
        .then((_) => {
          toast.success('Grupo eliminado')
          _get().getGroupsByTournamentAndCategory()
        })
        .catch((_) => {
          toast.error('Error eliminando grupo')
        })
    },
    copyTeams: (group: IGroup) => {
      const teams = structuredClone(_get().teams)
      // remove existing teams from teams with filter function
      const newTeams = teams.filter((team: ITeam) => !group.teams.find((t: any) => t._id === team._id))
      set({ teamsSelector: newTeams })
    },
    copyFullTeams: () => {
      const teams = structuredClone(_get().teams)
      set({ teamsSelector: teams })
    }
  }
})
