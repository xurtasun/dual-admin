/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { getMyTournaments, getTournamentById, updateTournamentRestrictions, updateTournamentOpenRegistrations, updateTournamentPublicTimetable } from '../services/tournaments'
import { getCategoriesByTournamentId } from '../services/categories'
import { ITournament } from '../types.d/tournament'
import { IQuery } from '../types.d/generic'
import { toast } from 'sonner'
import { ICategory } from '../types.d/category'
import { IRestriction } from '../types.d/restriction'

interface TournamentsState {
  tournaments: ITournament[] | []
  loading: boolean
  tournamentsPage: number
  tournamentsPageSize: number
  tournamentsPageTotal: number
  tournamentsSort: { field: string, sort: string }
  tournamentDetail: ITournament | null
  tournamentCategories: ICategory[] | []
  newRestriction: IRestriction | null
  deleteRestriction: (restriction: IRestriction) => void
  saveNewRestriction: () => void
  setNewRestriction: (newRestriction: IRestriction | null) => void
  getTournaments: (queryParams: IQuery) => void
  setTournaments: (tournaments: ITournament[] | []) => void
  getTournamentById: (tournamentId: string) => void
  getCategoriesByTournamentId: (tournamentId: string) => void
  setTournamentRestrictions: (restrictions: IRestriction) => void
  updateTournamentOpenRegistrations: (openRegistrations: boolean) => void
  updateTournamentPublicTimetable: (publicTimetable: boolean) => void
}
export const useTournamentsStore = create<TournamentsState>((set, _get) => {
  return {
    tournaments: [],
    loading: false,
    tournamentsPage: 0,
    tournamentsPageSize: 0,
    tournamentsPageTotal: 0,
    tournamentsSort: { field: 'created', sort: 'desc' },
    tournamentDetail: null,
    tournamentCategories: [],
    newRestriction: null,
    updateTournamentOpenRegistrations: (openRegistrations: boolean) => {
      updateTournamentOpenRegistrations(_get().tournamentDetail?.id as string, openRegistrations)
        .then(res => {
          set({
            tournamentDetail: res.data
          })
          toast.success('Actualizadas inscripciones')
        })
        .catch(_ => {
          toast.error('Error al actualizar la restricción')
        })
    },
    updateTournamentPublicTimetable: (publicTimetable: boolean) => {
      updateTournamentPublicTimetable(_get().tournamentDetail?.id as string, publicTimetable)
        .then(res => {
          set({
            tournamentDetail: res.data
          })
          toast.success('Actualizados horarios')
        })
        .catch(_ => {
          toast.error('Error al actualizar la restricción')
        })
    },
    getTournaments: (queryParams: IQuery) => {
      set({ loading: true })
      getMyTournaments({ ...queryParams, pageSize: _get().tournamentsPageSize, page: _get().tournamentsPage, sort: _get().tournamentsSort })
        .then(res => {
          set({ tournaments: res.data.docs, tournamentsPageTotal: res.data.totalPages, loading: false })
        }).catch(_ => {
          toast.error('Error al obtener los torneos')
        })
    },
    setTournamentDetail: (tournament: ITournament | null) => {
      set({ tournamentDetail: tournament })
    },
    setTournaments: (tournaments: ITournament[] | []) => {
      set({ tournaments })
    },
    getTournamentById: (tournamentId: string) => {
      set({ loading: true })
      getTournamentById(tournamentId)
        .then(res => {
          set({ tournamentDetail: res.data, loading: false })
        }).catch(_ => {
          toast.error('Error al obtener el torneo')
        })
    },
    getCategoriesByTournamentId: (tournamentId: string) => {
      set({ loading: true })
      getCategoriesByTournamentId(tournamentId)
        .then(res => {
          set({ tournamentCategories: res.data, loading: false })
        }).catch(_ => {
          toast.error('Error al obtener el torneo')
        })
    },
    setTournamentRestrictions: (newRestriction: IRestriction) => {
      const restrictions = _get().tournamentDetail?.restrictions.map((restriction: IRestriction) => {
        if (restriction.startTime === newRestriction.startTime) {
          return { ...newRestriction, blocked: !newRestriction.blocked }
        }
        return restriction
      })
      updateTournamentRestrictions(_get().tournamentDetail?.id as string, restrictions as IRestriction[])
        .then(res => {
          set({
            tournamentDetail: res.data
          })
          toast.success('Restricción actualizada')
        })
        .catch(_ => {
          toast.error('Error al actualizar la restricción')
        })
    },
    setNewRestriction: (newRestriction: IRestriction | null) => {
      set({ newRestriction })
    },
    saveNewRestriction: () => {
      const newRestriction = _get().newRestriction
      if (newRestriction) {
        const restrictions = _get().tournamentDetail?.restrictions
        if (!restrictions) return
        const restriction = { startTime: newRestriction.startTime.toISOString(), endTime: newRestriction.endTime.toISOString(), blocked: newRestriction.blocked } as any
        updateTournamentRestrictions(_get().tournamentDetail?.id as string, [...restrictions, restriction])
          .then(res => {
            set({
              tournamentDetail: res.data,
              newRestriction: null
            })
            toast.success('Restricción creada')
          })
          .catch(_ => {
            toast.error('Error al crear la restricción')
          })
      }
    },
    deleteRestriction: (restriction: IRestriction) => {
      const restrictions = _get().tournamentDetail?.restrictions.filter(r => r.startTime !== restriction.startTime)
      updateTournamentRestrictions(_get().tournamentDetail?.id as string, restrictions as IRestriction[])
        .then(res => {
          set({
            tournamentDetail: res.data
          })
          toast.success('Restricción eliminada')
        })
        .catch(_ => {
          toast.error('Error al eliminar la restricción')
        })
    }
  }
})
