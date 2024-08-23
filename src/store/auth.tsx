import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type IClient } from '../types.d/client'

import { login, getMe, signUp } from '../services/auth'
import { toast } from '../components/Sonner'

interface ClientState {
  profile: IClient | null
  accessToken: string | null
  isAuth: boolean
  isAdmin: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: string | null
  login: ({ email, password }: { email: string, password: string }) => void
  signUp: ({ email, password, firstName, lastName }: { email: string, password: string, firstName: string, lastName: string }) => void
  getMe: () => Promise<string>
  logout: () => void
}

export const useAuthStore = create(persist<ClientState>((set, _get) => {
  return {
    profile: null,
    accessToken: null,
    isAuth: false,
    errors: null,
    isAdmin: false,
    registerFormErrors: null,
    login: async ({ email, password }: { email: string, password: string }) => {
      login({ email, password })
        .then(({ data }) => {
          set({ isAuth: true, accessToken: data.accessToken })
        })
        .catch((err) => {
          set({ isAuth: false, profile: null, accessToken: null })
          toast.error(err.response.data.error)
        })
    },
    signUp: async ({ email, password, firstName, lastName }: { email: string, password: string, firstName: string, lastName: string }) => {
      signUp({ email, password, firstName, lastName })
        .then(({ data }) => {
          console.log('User created')
          set({ isAuth: true, accessToken: data.accessToken })
        })
        .catch((err) => {
          console.log('Error')
          console.log(err)
          set({ isAuth: false, profile: null, accessToken: null })
          toast.error(err.response.data.error)
        })
    },
    getMe: async () => {
      return await new Promise((_resolve, reject) => {
        getMe()
          .then(({ data }) => {
            set({ profile: data, isAdmin: data.role === 'admin' })
          })
          .catch((err) => {
            set({ isAuth: false, profile: null, accessToken: null })
            reject(err.response.data.error)
          })
      })
    },
    logout: () => {
      set({ isAuth: false, profile: null, accessToken: null })
    }
  }
}, { name: 'auth' }))
