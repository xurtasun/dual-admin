import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type IClient } from '../types.d/client'

import { login, getMe, signUp } from '../services/auth'
import { toast } from '../components/Sonner'
import { useCookies } from '../hooks/cookie'

interface ClientState {
  profile: IClient | null
  isAuth: boolean
  isAdmin: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: string | null
  setIsAuth: (isAuth: boolean) => void
  login: ({ email, password }: { email: string, password: string }) => void
  signUp: ({ email, password, firstName, lastName }: { email: string, password: string, firstName: string, lastName: string }) => void
  getMe: () => Promise<string>
  logout: () => void
}

export const useAuthStore = create(persist<ClientState>((set, _get) => {
  const { remove } = useCookies()
  return {
    profile: null,
    isAuth: false,
    errors: null,
    isAdmin: false,
    registerFormErrors: null,
    setIsAuth: (isAuth: boolean) => {
      set({ isAuth })
    },
    login: async ({ email, password }: { email: string, password: string }) => {
      login({ email, password })
        .then((_) => {
          set({ isAuth: true })
        })
        .catch((err) => {
          set({ isAuth: false, profile: null })
          toast.error(err.response.data.error)
        })
    },
    signUp: async ({ email, password, firstName, lastName }: { email: string, password: string, firstName: string, lastName: string }) => {
      signUp({ email, password, firstName, lastName })
        .then((_) => {
          console.log('User created')
          set({ isAuth: true })
        })
        .catch((err) => {
          console.log('Error')
          console.log(err)
          set({ isAuth: false, profile: null })
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
            set({ isAuth: false, profile: null })
            reject(err.response.data.error)
          })
      })
    },
    logout: () => {
      remove('admin_access_token')
      set({ isAuth: false, profile: null })
    }
  }
}, { name: 'auth' }))
