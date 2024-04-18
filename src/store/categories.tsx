/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { getCategoriesByTournamentId, updateCategory, createCategory, deleteCategory } from '../services/categories'
import { ICategory } from '../types.d/category'
import { toast } from 'sonner'

interface CategoriesState {
  categories: ICategory[]
  tournamentId: string | null
  newCategory: any
  setTeamsLimit: (limit: number, categoryId: string) => void
  setNewCategory: (category: any) => void
  createCategory: (category: any) => void
  deleteCategory: (categoryId: string) => void
  setTournamentId: (tournamentId: string) => void
  setCategories: (categories: ICategory) => void
  updateCategory: (category: ICategory) => void
  getCategoriesByTournamentId: () => void
}
export const useCategoriesStore = create<CategoriesState>((set, get) => {
  return {
    categories: [],
    tournamentId: null,
    newCategory: null,
    setNewCategory: (category: ICategory) => {
      set({ newCategory: category })
    },
    createCategory: (category: ICategory) => {
      const tournamentId = get().tournamentId
      if (!tournamentId) return toast.error('No se ha seleccionado un torneo')
      createCategory({ ...category, tournament: tournamentId })
        .then(_ => {
          toast.success('Categoria creada')
          get().getCategoriesByTournamentId()
          set({ newCategory: null })
        })
        .catch(_ => {
          toast.error('Error al crear categoria')
        })
    },
    deleteCategory: (categoryId: string) => {
      deleteCategory(categoryId)
        .then(_ => {
          toast.success('Categoria eliminada')
          get().getCategoriesByTournamentId()
        })
        .catch(_ => {
          toast.error('Error al eliminar categoria')
        })
    },
    setTournamentId: (tournamentId: string) => {
      set({ tournamentId })
    },
    setTeamsLimit: (limit: number, categoryId: string) => {
      set({
        categories: get().categories.map((category: ICategory) => {
          if (category._id === categoryId) {
            return { ...category, teamsLimit: limit }
          }
          return category
        })
      })
    },
    setCategories: (category: ICategory) => {
      set({
        categories: get().categories.map((cat: ICategory) => {
          if (cat._id === category._id) {
            return { ...cat, editMode: !cat.editMode }
          }
          return cat
        })
      })
    },
    updateCategory: (category: ICategory) => {
      updateCategory(category)
        .then(_ => {
          set({
            categories: get().categories.map((cat: ICategory) => {
              if (cat._id === category._id) {
                return { ...cat, editMode: false }
              }
              return cat
            })
          })
          toast.success('Categoria actualizada')
          get().getCategoriesByTournamentId()
        })
        .catch(_ => {
          toast.error('Error al actualizar categoria')
        })
    },
    getCategoriesByTournamentId: async () => {
      getCategoriesByTournamentId(get().tournamentId as string)
        .then(res => {
          set({ categories: res.data.map((category: ICategory) => ({ ...category, editMode: false })) })
        })
    }
  }
})
