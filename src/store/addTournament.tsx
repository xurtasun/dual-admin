/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { ITournament } from '../types.d/tournament'
import { IRestriction } from '../types.d/restriction'
import { uploadTournamentPoster, createTournament } from '../services/addTournament'
import { toast } from 'sonner'
interface CategoryToCreate {
  name: string
  teamsLimit: number
  parent: string
  editMode: boolean
}
interface AddTournamentState {
  tournament: ITournament | null
  newRestriction: IRestriction | null
  categoriesToCreate: CategoryToCreate[]
  newCategory: CategoryToCreate | null
  imageFile: any | null
  imageFilePreview: any | null
  saveTournament: (tournament: ITournament) => void
  setTournament: (tournament: any) => void
  deleteRestriction: (restriction: IRestriction) => void
  setNewRestriction: (newRestriction: IRestriction | null) => void
  addNewRestriction: () => void
  setTournamentRestrictions: (newRestriction: IRestriction) => void
  setNewCategory: (category: any) => void
  addCategory: () => void
  removeCategory: (category: CategoryToCreate) => void
  setCategoriesToCreate: (category: CategoryToCreate) => void
  updateCategory: (category: CategoryToCreate) => void
  setImageFile: (imageFile: any) => void
  setImageFilePreview: (imageFile: any) => void
}
export const useAddTournament = create<AddTournamentState>((set, get) => {
  return {
    tournament: {
      restrictions: [],
      categories: []
    } as any,
    newCategory: null,
    categoriesToCreate: [],
    newRestriction: null,
    imageFile: null,
    imageFilePreview: null,
    saveTournament: (tournament: ITournament) => {
      const currentTournament = { ...get().tournament, ...tournament }
      set({ tournament: currentTournament })

      console.log(currentTournament)

      createTournament(currentTournament as ITournament)
        .then(({ data }) => {
          const tournament = data
          console.log(tournament)
          toast.success('Torneo creado correctamente')
          uploadTournamentPoster(tournament._id, get().imageFile)
            .then(_ => {
              toast.success('Imagen subida correctamente')
            })
        })
    },
    setTournament: (tournament: ITournament) => {
      const currentTournament = get().tournament
      set({ tournament: { ...currentTournament, ...tournament } })
    },
    deleteRestriction: (restriction: IRestriction) => {
      const restrictions = get().tournament?.restrictions.filter(r => r.startTime !== restriction.startTime)

      set({ tournament: { ...get().tournament as ITournament, restrictions: restrictions == null ? [] : restrictions } })
    },
    setNewRestriction: (newRestriction: IRestriction | null) => {
      set({ newRestriction })
    },
    addNewRestriction: () => {
      const currentTournament = get().tournament as any
      const newRestriction = get().newRestriction as any
      set({ tournament: { ...currentTournament, restrictions: [...currentTournament.restrictions, newRestriction] } })
      set({ newRestriction: null })
    },
    setTournamentRestrictions: (newRestriction: IRestriction) => {
      const restrictions = get().tournament?.restrictions.map((restriction: IRestriction) => {
        if (restriction.startTime === newRestriction.startTime) {
          return { ...newRestriction, blocked: !newRestriction.blocked }
        }
        return restriction
      })
      set({ tournament: { ...get().tournament as ITournament, restrictions: restrictions == null ? [] : restrictions } })
    },
    setNewCategory: (newCategory: CategoryToCreate) => {
      set({ newCategory })
    },
    addCategory: () => {
      const currentCategoriesToCreate = get().categoriesToCreate as any
      const currentNewCategory = { ...get().newCategory, editMode: !get().newCategory?.editMode }
      if (!currentNewCategory) return
      set({ categoriesToCreate: [...currentCategoriesToCreate, currentNewCategory] })
      set({ newCategory: null })
    },
    setCategoriesToCreate: (category: CategoryToCreate) => {
      set({
        categoriesToCreate: get().categoriesToCreate.map((cat: CategoryToCreate) => {
          if (cat.parent === category.parent) {
            return { ...cat, editMode: !cat.editMode }
          }
          return cat
        })
      })
    },
    updateCategory: (category: CategoryToCreate) => {
      console.log('updating category', category)
      set({
        categoriesToCreate: get().categoriesToCreate.map((cat: CategoryToCreate) => {
          if (cat.parent === category.parent) {
            return { ...cat, editMode: false, teamsLimit: category.teamsLimit }
          }
          return cat
        })
      })
    },
    removeCategory: (category: CategoryToCreate) => {
      set({ categoriesToCreate: get().categoriesToCreate.filter(cat => cat.parent !== category.parent) })
    },
    setImageFile: (imageFile: any) => {
      set({ imageFile })
    },
    setImageFilePreview: (imageFilePreview: any) => {
      set({ imageFilePreview })
    }
  }
})
