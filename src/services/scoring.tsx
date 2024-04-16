import { authApi } from '../libs/axios'

export const getScoringByPlayerId = async (playerId: string) => {
  return await authApi.get('/scoring/' + playerId)
}
