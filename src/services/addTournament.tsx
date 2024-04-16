import { authApi } from '../libs/axios'
import { ITournament } from '../types.d/tournament'

export const uploadTournamentPoster = async (tournamentId: string, poster: File) => {
  const formData = new FormData()
  formData.append('poster', poster)
  return await authApi.post('/tournaments/poster/' + tournamentId, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const createTournament = async (tournament: ITournament) => {
  return await authApi.post('/tournaments', tournament)
}
