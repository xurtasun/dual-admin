import { create } from 'zustand'
import { ITeam } from '../types.d/team'
import { getTeamsByTournamentAndCategory, updateTeamPayment, deleteTeam, updateTeam, updateTeamRestrictions } from '../services/teams'
import { toast } from 'sonner'
import { IRestriction } from '../types.d/restriction'

interface ManagementTeamsState {
  teamToManage: ITeam | null
  teams: ITeam[]
  teamsLoading: boolean
  tournamentId: string | null
  categoryId: string | null
  playersNumber: number
  playersPayedNumber: number
  playersPendingNumber: number
  setTournamentId: (tournamentId: string) => void
  setCategoryId: (categoryId: string) => void
  setTeamToManage: (team: ITeam | null) => void
  updateTeamPayment: (playerId: string, teamId: string, payment: boolean) => void
  updateTeam: (team: ITeam) => void
  updateTeamRestrictions: (restrictions: IRestriction[]) => void
  getTeamsByTournamentAndCategory: () => void
  getNumbers: () => void
  deleteTeam: (teamId: string) => () => void

}
export const useManagementTeamsStore = create<ManagementTeamsState>((set, _get) => {
  return {
    teamToManage: null,
    teams: [],
    teamsLoading: true,
    tournamentId: null,
    categoryId: null,
    playersNumber: 0,
    playersPayedNumber: 0,
    playersPendingNumber: 0,
    setTournamentId: (tournamentId: string) => {
      set({ tournamentId })
    },
    setCategoryId: (categoryId: string) => {
      set({ categoryId })
    },
    setTeamToManage: (team: ITeam | null) => {
      set({ teamToManage: team })
    },
    updateTeam: (team: ITeam) => {
      updateTeam(team)
        .then((_) => {
          set({ teamToManage: null })
          toast.success('Equipo actualizado')
          _get().getTeamsByTournamentAndCategory()
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error al actualizar el equipo')
        })
    },
    updateTeamRestrictions: (restrictions: IRestriction[]) => {
      const team = _get().teamToManage
      console.log(team)
      updateTeamRestrictions(restrictions, team?._id as string)
        .then(({ data }) => {
          console.log(restrictions)
          set({ teamToManage: data })
          toast.success('Restricciones actualizadas')
          _get().getTeamsByTournamentAndCategory()
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error al actualizar las restricciones')
        })
    },
    updateTeamPayment: (playerId: string, teamId: string, payment: boolean) => {
      updateTeamPayment(playerId, teamId)
        .then((_) => {
          toast.success('Pago ' + (payment ? 'registrado' : 'eliminado'))
          _get().getTeamsByTournamentAndCategory()
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error al actualizar el pago')
        })
    },
    getTeamsByTournamentAndCategory: () => {
      const tournamentId = _get().tournamentId
      const categoryId = _get().categoryId
      set({ teams: [] })
      set({ teamsLoading: true })
      tournamentId && categoryId && getTeamsByTournamentAndCategory(tournamentId, categoryId)
        .then(({ data }) => {
          set({ teams: data })
          set({ teamsLoading: false })
          _get().getNumbers()
        })
    },
    getNumbers: () => {
      const teams = _get().teams
      const playersNumber = teams.reduce((acc, team) => acc + team.players.length, 0)
      const playersPayedNumber = teams.reduce((acc, team) => acc + team.payed.length, 0)
      const playersPendingNumber = playersNumber - playersPayedNumber
      set({ playersNumber, playersPayedNumber, playersPendingNumber })
    },
    deleteTeam: (teamId: string) => () => {
      console.log(teamId)
      deleteTeam(teamId)
        .then((_) => {
          toast.success('Equipo eliminado')
          _get().getTeamsByTournamentAndCategory()
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error al eliminar el equipo')
        })
    }
  }
})
