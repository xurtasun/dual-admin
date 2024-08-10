import { authApi } from '../libs/axios'
import { IMatch } from '../types.d/match'

export const createMatch = async (match: IMatch) => {
  const newMatch = {
    ...match,
    teams: match.teams.map((team) => {
      if (!team) return null
      return team._id
    })
  }
  console.log('Creating match', newMatch)
  return await authApi.post('/matches/', newMatch)
}

export const updateMatch = async (match: IMatch) => {
  const newMatch = {
    ...match,
    teams: match.teams.map((team) => {
      if (!team) return null
      return team._id
    }),
    result: match.teams.some((team) => !team)
      ? []
      : match.result.map((result) => {
        if (!result) return [0, 0].join('-')
        return result
      }),
    winner: match.teams.some((team) => !team) && null,
    teamOneWinnerLinkMatch: match.teamOneWinnerLinkMatch || null,
    teamTwoWinnerLinkMatch: match.teamTwoWinnerLinkMatch || null
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
