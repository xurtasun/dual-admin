import { create } from 'zustand'
import { ITeam } from '../types.d/team'
import { getTeamsByTournamentAndCategory, updateTeamPayment, deleteTeam, updateTeam, updateTeamRestrictions } from '../services/teams'
import { toast } from 'sonner'
import { IRestriction } from '../types.d/restriction'
import { IPlayer } from '../types.d/player'
import { getPlayers } from '../services/player'

interface ManagementTeamsState {
  teamToManage: ITeam | null
  teams: ITeam[]
  players: IPlayer[]
  teamsLoading: boolean
  tournamentId: string | null
  categoryId: string | null
  playersNumber: number
  playersPayedNumber: number
  playersPendingNumber: number
  playersTeamIdToUpdate: string[]
  playersSearched: IPlayer[]
  searchPlayers: (value: string) => void
  setTournamentId: (tournamentId: string) => void
  setCategoryId: (categoryId: string) => void
  setTeamToManage: (team: ITeam | null) => void
  updateTeamPayment: (playerId: string, teamId: string | undefined, payment: boolean) => void
  updateTeam: (team: ITeam) => void
  updateTeamRestrictions: (restrictions: IRestriction[]) => void
  getTeamsByTournamentAndCategory: () => void
  getNumbers: () => void
  deleteTeam: (teamId: string) => () => void
  setPlayersSearched: (players: IPlayer[]) => void

}
export const useManagementTeamsStore = create<ManagementTeamsState>((set, _get) => {
  return {
    teamToManage: null,
    teams: [],
    players: [],
    playersSearched: [],
    teamsLoading: true,
    tournamentId: null,
    categoryId: null,
    playersNumber: 0,
    playersPayedNumber: 0,
    playersPendingNumber: 0,
    playersTeamIdToUpdate: [],
    setPlayersSearched: (players: IPlayer[]) => {
      set({ playersSearched: players })
    },
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
    searchPlayers: (value: string) => {
      const searchFilter = {
        $and: value.split(' ').map((word: string) => ({
          $or: [
            { name: { $regex: word, $options: 'i' } },
            { lastName: { $regex: word, $options: 'i' } }
          ]
        }))
      }
      getPlayers({ page: 0, filter: searchFilter })
        .then(({ data }) => {
          console.log(data)
          set({ playersSearched: data.docs })
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error al buscar jugadores')
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
    updateTeamPayment: (playerId: string, teamId: string | undefined, payment: boolean) => {
      teamId && updateTeamPayment(playerId, teamId)
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
          set({ players: data.map((team: ITeam) => team.players).flat() })
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
