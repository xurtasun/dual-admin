import { authApi } from '../libs/axios'
import { FormInputs } from '../store/players'
import { IQuery } from '../types.d/generic'

export const getPlayers = async ({ page, pageSize, sort, filter }: IQuery) => {
  const query = {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    page: page ? page + 1 : 0,
    limit: pageSize,
    sort,
    search: filter
  }
  return await authApi.get('/players?query=' + JSON.stringify(query), { params: query })
}

export const updatePlayer = async (playerId: string, formInputs: FormInputs) => {
  return await authApi.put('/players/' + playerId, formInputs)
}

export const importPlayer = async (playerId: string, playerIdToImport: string, dataToImport: string[]) => {
  return await authApi.post('/players/import/' + playerId, { dataToImport, playerIdToImport })
}

export const deletePlayer = async (playerId: string) => {
  return await authApi.delete('/players/' + playerId)
}
