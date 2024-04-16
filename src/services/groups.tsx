import { authApi } from '../libs/axios'
import { IGroup } from '../types.d/group'

export const getGroupsByTournamentAndCategory = async (tournamentId: string, categoryId: string) => {
  return await authApi.get('/groups/tournament/' + tournamentId + '/category/' + categoryId)
}

export const getGroupsMatchesByTournamentAndCategory = async (tournamentId: string, categoryId: string) => {
  return await authApi.get('/groups/matches/tournament/' + tournamentId + '/category/' + categoryId)
}

export const createGroup = async (group: IGroup) => {
  const newGroup = {
    ...group,
    teams: group.teams.map((team) => team._id)
  }
  return await authApi.post('/groups', newGroup)
}

export const updateGroup = async (group: IGroup) => {
  const newGroup = {
    name: group.name,
    teams: group.teams.map((team) => team._id)
  }
  return await authApi.put('/groups/' + group._id, newGroup)
}

export const deleteGroup = async (groupId: string) => {
  return await authApi.delete('/groups/' + groupId)
}
