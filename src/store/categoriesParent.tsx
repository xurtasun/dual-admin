import { create } from 'zustand'
import { ICategoryParent } from '../types.d/categoryParent'
import { getCategoriesParent, createCategoryParent, updateCategoryParent } from '../services/categoriesParent'
import { toast } from 'sonner'

interface CategoriesParentState {
  categoriesParent: ICategoryParent[]
  getCategoriesParent: () => void
  createCategoryParent: (categoryParent: ICategoryParent) => void
  setCategoriesParent: (id: string | undefined) => void
  updateCategoryParent: (id: string, category: ICategoryParent) => void
}
export const useCategoriesParentStore = create<CategoriesParentState>((set, get) => {
  return {
    categoriesParent: [],
    getCategoriesParent: () => {
      getCategoriesParent()
        .then(res => {
          const categoriesParent = res.data.map((category: ICategoryParent) => {
            return { ...category, enabled: false }
          })
          set({ categoriesParent })
        })
        .catch(_ => {
          toast.error('Error al obtener las categorias')
        })
    },
    createCategoryParent: (categoryParent: ICategoryParent) => {
      createCategoryParent(categoryParent)
        .then(_res => {
          toast.success('Categoria creada')
          get().getCategoriesParent()
        })
        .catch(_ => {
          toast.error('Error al crear la categoria')
        })
    },
    setCategoriesParent: (id: string | undefined) => {
      const categoriesParent = get().categoriesParent.map((category: ICategoryParent) => {
        if (category.id === id) {
          return { ...category, enabled: !category.enabled }
        }
        return category
      })
      set({ categoriesParent })
    },
    updateCategoryParent: (id: string, category: ICategoryParent) => {
      updateCategoryParent(id, category)
        .then(_res => {
          toast.success('Categoria actualizada')
          get().getCategoriesParent()
        })
        .catch(_ => {
          toast.error('Error al actualizar la categoria')
        })
    }
  }
})
