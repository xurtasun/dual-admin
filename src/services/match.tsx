import { authApi } from '../libs/axios'
import { IMatch } from '../types.d/match'

export const createMatch = async (match: IMatch) => {
  const newMatch = {
    ...match,
    teams: match.teams.map((team) => team._id)
  }
  return await authApi.post('/matches/', newMatch)
}

export const updateMatch = async (match: IMatch) => {
  const newMatch = {
    ...match,
    teams: match.teams.map((team) => team._id),
    result: match.result.map((result) => {
      if (!result) return [0, 0].join('-')
      return result
    })

  }
  return await authApi.put(`/matches/${match._id}`, newMatch)
}

export const deleteMatch = async (matchId: string) => {
  return await authApi.delete(`/matches/${matchId}`)
}

export const getFinalMatchesByTournamentAndCategory = async (tournamentId: string, categoryId: string) => {
  return await authApi.get(`/matches/final/${tournamentId}/${categoryId}`)
}

export const getMatchesByTournamentDate = async (tournamentId: string, date: Date) => {
  return await authApi.get(`/matches/tournament/${tournamentId}?date=${date.toISOString()}`)
}
