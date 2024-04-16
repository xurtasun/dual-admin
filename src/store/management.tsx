import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ITournament } from '../types.d/tournament'
import { getTournamentById } from '../services/tournaments'
interface DayTab {
  name: string
  date: Date
}
interface ManagementState {
  tabSelected: string
  categoryTitleSelected: string | null
  categorySelected: string | null
  tournament: ITournament | null
  matchLastDatetime: Date | null
  matchLastType: string | null
  dayTabSelectedSchedule: DayTab | null
  setDayTabSelectedSchedule: (day: DayTab) => void
  setMatchLastType: (type: string) => void
  setMatchLastDatetime: (datetime: Date) => void
  getTournament: (tournamentId: string) => void
  setTournament: (tournament: ITournament) => void
  setTabSelected: (tab: string) => void
  setCategoryTitleSelected: (categoryName: string) => void
  setCategorySelected: (categoryId: string | null) => void
}
export const useManagementStore = create(persist<ManagementState>((set, _get) => {
  return {
    tabSelected: 'Inscritos',
    categorySelected: null,
    categoryTitleSelected: null,
    tournament: null,
    matchLastDatetime: null,
    matchLastType: null,
    dayTabSelectedSchedule: null,
    setDayTabSelectedSchedule: (day) => {
      set({ dayTabSelectedSchedule: day })
    },
    setMatchLastType: (type: string) => {
      set({ matchLastType: type })
    },
    setMatchLastDatetime: (datetime: Date) => {
      set({ matchLastDatetime: new Date(datetime) })
    },
    setTournament: (tournament: ITournament) => {
      set({ tournament })
    },
    setTabSelected: (tab: string) => {
      set({ tabSelected: tab })
    },
    setCategoryTitleSelected: (categoryName: string) => {
      set({ categoryTitleSelected: categoryName })
    },
    setCategorySelected: (categoryId: string | null) => {
      set({ categorySelected: categoryId })
    },
    getTournament: (tournamentId) => {
      getTournamentById(tournamentId)
        .then(({ data }) => {
          set({ tournament: data })
          console.log(data)
        })
    }
  }
}, { name: 'management' }))
