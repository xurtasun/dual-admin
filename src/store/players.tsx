/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { getPlayers, updatePlayer, importPlayer, deletePlayer } from '../services/player'
import { IQuery } from '../types.d/generic'
import { IPlayer } from '../types.d/player'
import { toast } from '../components/Sonner'
export interface FormInputs {
  phone?: string
  email?: string
  size?: string
}
export interface FormInputsErrors {
  phone?: {
    message: string
  } | null
  email?: {
    message: string
  } | null
  size?: {
    message: string
  } | null
}
interface PlayerState {
  players: IPlayer[]
  playersPage: number
  playersPageSize: number
  playersPageTotal: number
  playersSort: { field: string, sort: string }
  playerDetail: IPlayer | null
  playerDetailEditMode: boolean
  playerDetailForm: FormInputs
  playerDetailFormErrors: FormInputsErrors
  playerFilterValue: string
  playerFilter: any
  updateTeamPlayers: IPlayer[]
  setUpdateTeamPlayers: (players: IPlayer[]) => void
  setPlayerFilter: (filter: any) => void
  setPlayerFilterValue: (value: string) => void
  setPlayerDetail: (player: IPlayer | null) => void
  getPlayers: (queryParams: IQuery) => void
  setPlayersPage: (page: number) => void
  setPlayerDetailEditMode: (editMode: boolean) => void
  setPlayerDetailForm: (form: FormInputs) => void
  setPlayerDetailFormErrors: (errors: FormInputsErrors) => void
  updatePlayer: (playerId: string, formInputs: FormInputs) => void
  importPlayer: (playerId: string, playerIdToImport: string, dataToImport: string[]) => void
  deletePlayer: () => void
}
export const usePlayersStore = create<PlayerState>((set, _get) => {
  return {
    players: [],
    playersPage: 0,
    playersPageSize: 40,
    playersPageTotal: 0,
    playersSort: { field: 'created', sort: 'desc' },
    playerDetail: null,
    playerDetailEditMode: false,
    playerDetailForm: {},
    playerDetailFormErrors: {},
    playerFilterValue: '',
    playerFilter: {},
    updateTeamPlayers: [],
    setUpdateTeamPlayers: (players: IPlayer[]) => {
      set({ updateTeamPlayers: players })
    },
    deletePlayer: () => {
      const { id } = _get().playerDetail as IPlayer
      deletePlayer(id)
        .then(() => {
          set({ playerDetail: null })
          _get().getPlayers({ page: _get().playersPage, filter: _get().playerFilter })
          toast.success('Jugador eliminado')
        })
        .catch(() => {
          toast.error('Error al eliminar jugador')
        })
    },
    setPlayerFilter: (filter: any) => {
      set({ playerFilter: filter })
    },
    setPlayerFilterValue: (value: string) => {
      set({ playerFilterValue: value })
    },
    getPlayers: async (queryParams: IQuery) => {
      getPlayers({ ...queryParams, pageSize: _get().playersPageSize, page: _get().playersPage, sort: _get().playersSort })
        .then(res => {
          set({ players: res.data.docs, playersPageTotal: res.data.totalPages })
        })
    },
    setPlayersPage: (page: number) => {
      set({ playersPage: page })
    },
    setPlayerDetail: (player: IPlayer | null) => {
      set({ playerDetail: player, playerDetailForm: { phone: player?.phone, email: player?.email, size: player?.size }, playerDetailEditMode: false, playerDetailFormErrors: {} })
    },
    setPlayerDetailEditMode: (editMode: boolean) => {
      set({ playerDetailEditMode: editMode })
    },
    setPlayerDetailForm: (form: FormInputs) => {
      set({ playerDetailForm: form })
    },
    setPlayerDetailFormErrors (errors: FormInputsErrors) {
      set({ playerDetailFormErrors: errors })
    },
    updatePlayer: (playerId: string, formInputs: FormInputs) => {
      updatePlayer(playerId, formInputs)
        .then(res => {
          set({ playerDetail: res.data, playerDetailForm: { phone: res.data.phone, email: res.data.email, size: res.data.size }, playerDetailEditMode: false, playerDetailFormErrors: {} })
          toast.success('Jugador actualizado')
        })
        .catch(_err => {
          toast.error('Error al actualizar jugador')
        })
    },
    importPlayer: (playerId: string, playerIdToImport: string, dataToImport: string[]) => {
      importPlayer(playerId, playerIdToImport, dataToImport)
        .then(res => {
          console.log(res.data)
          set({ playerDetail: null, playerDetailForm: { }, playerDetailEditMode: false, playerDetailFormErrors: {} })
          _get().getPlayers({ page: _get().playersPage, filter: _get().playerFilter })
          toast.success('Jugador importado')
        })
        .catch(_err => {
          toast.error('Error al importar jugador')
        })
    }
  }
})
