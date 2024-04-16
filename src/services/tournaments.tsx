import { authApi } from '../libs/axios'
import { IQuery } from '../types.d/generic'
import { IRestriction } from '../types.d/restriction'

export const getMyTournaments = async ({ page, pageSize, sort, filter }: IQuery) => {
  const query = {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    page: page ? page + 1 : 0,
    limit: pageSize,
    sort,
    search: filter
  }
  return await authApi.get('/tournaments/me?query=' + JSON.stringify(query))
}

export const getTournamentById = async (tournamentId: string) => {
  return await authApi.get('/tournaments/' + tournamentId)
}

export const updateTournamentRestrictions = async (tournamentId: string, restrictions: IRestriction[]) => {
  return await authApi.put('/tournaments/' + tournamentId, { restrictions })
}

export const updateTournamentOpenRegistrations = async (tournamentId: string, openRegistrations: boolean) => {
  return await authApi.put('/tournaments/' + tournamentId, { openRegistrations })
}

export const updateTournamentPublicTimetable = async (tournamentId: string, publicTimetable: boolean) => {
  // return await authApi.get('/teams/sizes/' + tournamentId)
  return await authApi.put('/tournaments/' + tournamentId, { publicTimetable })
}
