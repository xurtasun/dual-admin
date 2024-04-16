import { authApi } from '../libs/axios'
import { ICategoryParent } from '../types.d/categoryParent'

export const getCategoriesParent = async () => {
  return await authApi.get('/categoriesParent/')
}

export const createCategoryParent = async (categoryParent: ICategoryParent) => {
  return await authApi.post('/categoriesParent/', categoryParent)
}

export const updateCategoryParent = async (id: string, category: ICategoryParent) => {
  return await authApi.put(`/categoriesParent/${id}`, category)
}
