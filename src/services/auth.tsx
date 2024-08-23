import { baseApi, authApi } from '../libs/axios'

export const login = async ({ email, password }: { email: string, password: string }) => {
  return await baseApi.post('/auth/login', { email, password })
}

export const signUp = async ({ email, password, firstName, lastName }: { email: string, password: string, firstName: string, lastName: string }) => {
  return await baseApi.post('/auth/signup', { email, password, firstName, lastName })
}

export const getMe = async () => {
  return await authApi.get('/customers/me')
}
