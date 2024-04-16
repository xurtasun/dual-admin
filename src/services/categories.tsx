import { authApi } from '../libs/axios'
import { ICategory } from '../types.d/category'

export const getCategoriesByTournamentId = async (tournamentId: string) => {
  return await authApi.get('/categories/tournament/' + tournamentId)
}

export const updateCategory = async (category: ICategory) => {
  return await authApi.put(`/categories/${category._id}`, category)
}

export const createCategory = async (category: ICategory) => {
  return await authApi.post('/categories', category)
}

export const deleteCategory = async (categoryId: string) => {
  return await authApi.delete('/categories/' + categoryId)
}
