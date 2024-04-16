import { authApi } from '../libs/axios'
import { IRestriction } from '../types.d/restriction'
import { ITeam } from '../types.d/team'

export const getTeamsByPlayerId = async (playerId: string) => {
  return await authApi.get('/teams/playerDetail/' + playerId)
}

export const getTeamsByTournamentAndCategory = async (tournamentId: string, categoryId: string) => {
  return await authApi.get('/teams/tournament/' + tournamentId + '/category/' + categoryId)
}

export const updateTeam = async (team: ITeam) => {
  const newTeam = {
    ...team,
    category: team.category._id,
    tournament: team.tournament._id,
    players: team.players.map(player => player._id)
  }
  return await authApi.put('/teams/' + team._id, newTeam)
}

export const updateTeamRestrictions = async (restrictions: IRestriction[], teamId: string) => {
  return await authApi.put('/teams/' + teamId, { restrictions })
}
export const updateTeamPayment = async (playerId: string, teamId: string) => {
  return await authApi.put('/teams/' + teamId + '/payment/' + playerId)
}

export const deleteTeam = async (teamId: string) => {
  return await authApi.delete('/teams/' + teamId)
}
